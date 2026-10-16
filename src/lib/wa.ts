import { SITE } from "@/lib/site";

export function waLink(message: string): string {
  return `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(message)}`;
}

export function formatIDR(value: number, lang: "id" | "en" = "id"): string {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
  return lang === "en" ? formatted.replace("Rp", "IDR") : formatted;
}
