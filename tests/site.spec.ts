import { test, expect } from "@playwright/test";

test("static build loads content, styles, fonts, images, and SEO without errors", async ({ page, request }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("requestfailed", (req) => errors.push(`Failed request: ${req.url()}`));
  page.on("response", (res) => {
    if (res.status() >= 400) errors.push(`${res.status()}: ${res.url()}`);
  });

  const response = await request.get("/");
  expect(response.ok()).toBe(true);
  const html = await response.text();
  expect(html).toContain('property="og:image"');
  expect(html).toContain('"@type":"HealthAndBeautyBusiness"');
  expect(html).toContain('"@type":"FAQPage"');
  expect(html).not.toContain("/_next/");
  expect((await request.get("/sitemap.xml")).ok()).toBe(true);
  expect((await request.get("/robots.txt")).ok()).toBe(true);
  expect((await request.get("/favicon.ico")).ok()).toBe(true);

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("#layanan button")).toHaveCount(6);
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(251, 250, 246)");
  await expect(page.locator("body")).toHaveCSS("font-family", 'Inter, sans-serif');
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images, (img) => {
      img.loading = "eager";
      return img.decode();
    }));
  });
  expect(await page.evaluate(() => document.fonts.check('16px "Inter"'))).toBe(true);
  expect(await page.evaluate(() => document.fonts.check('16px "Fraunces"'))).toBe(true);
  const hero = page.locator('img[src="/images/hero.jpg"]');
  await expect(hero).toHaveCSS("object-fit", "cover");
  const imageBox = await hero.boundingBox();
  if (!imageBox) throw new Error("Missing hero image layout");
  expect(imageBox.width / imageBox.height).toBeCloseTo(0.8, 1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("language persists across reload and navigation works on mobile", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.getByRole("button", { name: "en", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("#bk-name")).toHaveAttribute("placeholder", "Who is getting the massage?");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("button", { name: "en", exact: true })).toHaveAttribute("aria-pressed", "true");

  if (testInfo.project.name === "mobile") {
    const menu = page.getByRole("button", { name: "Buka menu", exact: true });
    await menu.click();
    await expect(page.getByRole("button", { name: "Tutup menu", exact: true })).toHaveAttribute("aria-expanded", "true");
    await page.locator('header a[href="#layanan"]').last().click();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
  } else {
    await page.locator('header a[href="#layanan"]').first().click();
  }
  await expect(page).toHaveURL(/#layanan$/);
  await expect(page.locator("#layanan")).toBeInViewport();
  await page.getByRole("button", { name: "id", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
});

test("service details, duration pricing, modal close, and FAQs work", async ({ page }) => {
  await page.goto("/");
  const service = page.locator("#layanan button").first();
  await service.click();
  const dialog = page.getByRole("dialog", { name: "Pijat Bali Tradisional", exact: true });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: /90 menit/ }).click();
  const booking = dialog.locator('a[href^="https://wa.me/"]');
  const href = await booking.getAttribute("href");
  if (!href) throw new Error("Missing service WhatsApp link");
  expect(new URL(href).searchParams.get("text")).toContain("90 menit (Rp");
  await expect(booking).toContainText("350.000");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await service.click();
  await dialog.getByRole("button", { name: "Tutup", exact: true }).last().click();
  await expect(dialog).toHaveCount(0);

  const questions = page.locator("#faq button[aria-expanded]");
  await expect(questions.first()).toHaveAttribute("aria-expanded", "true");
  await questions.nth(1).click();
  await expect(questions.first()).toHaveAttribute("aria-expanded", "false");
  await expect(questions.nth(1)).toHaveAttribute("aria-expanded", "true");
  await questions.nth(1).click();
  await expect(questions.nth(1)).toHaveAttribute("aria-expanded", "false");
});

test("booking validates input and opens the correct WhatsApp order without a backend", async ({ page }) => {
  await page.addInitScript(() => {
    window.open = (url, target, features) => {
      document.documentElement.dataset.whatsappUrl = String(url);
      document.documentElement.dataset.whatsappTarget = String(target);
      document.documentElement.dataset.whatsappFeatures = String(features);
      return null;
    };
  });
  await page.goto("/");
  const submit = page.getByRole("button", { name: "Kirim Pesanan via WhatsApp", exact: true });
  await submit.click();
  await expect(page.getByText("Mohon lengkapi kolom yang wajib diisi.", { exact: true })).toBeVisible();
  await expect(page.locator("html")).not.toHaveAttribute("data-whatsapp-url");

  await page.locator("#bk-name").fill("Test Guest");
  await page.locator("#bk-phone").fill("123");
  await page.locator("#bk-service").selectOption("bali-traditional");
  await page.locator("#bk-dur").selectOption("1");
  const today = await page.locator("#bk-date").getAttribute("min");
  if (!today) throw new Error("Missing booking minimum date");
  await page.locator("#bk-date").fill(today);
  await page.locator("#bk-time").selectOption("10:00");
  await page.locator("#bk-loc").fill("Villa Test, Canggu");
  await page.locator("#bk-notes").fill("Focus on shoulders & back");
  await page.getByRole("radio", { name: "Terapis wanita", exact: true }).click();
  await submit.click();
  await expect(page.getByText("Nomor WhatsApp tidak valid (9–15 digit).", { exact: true })).toBeVisible();
  await expect(page.locator("html")).not.toHaveAttribute("data-whatsapp-url");
  await page.locator("#bk-phone").fill("081234567890");
  await submit.click();

  const href = await page.locator("html").getAttribute("data-whatsapp-url");
  if (!href) throw new Error("Booking did not open WhatsApp");
  const url = new URL(href);
  expect(url.origin).toBe("https://wa.me");
  expect(url.pathname).toBe("/6281234567890");
  const message = url.searchParams.get("text");
  expect(message).toContain("Nama: Test Guest");
  expect(message).toContain("Pijat Bali Tradisional — 90 menit");
  expect(message).toContain("350.000");
  expect(message).toContain(`${today} · 10:00 WITA`);
  expect(message).toContain("Villa Test, Canggu");
  expect(message).toContain("Terapis wanita");
  expect(message).toContain("Focus on shoulders & back");
  await expect(page.locator("html")).toHaveAttribute("data-whatsapp-target", "_blank");
  await expect(page.locator("html")).toHaveAttribute("data-whatsapp-features", "noopener,noreferrer");
});
