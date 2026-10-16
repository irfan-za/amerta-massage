import { useEffect, useState } from "react";
import { useLang } from "./LangProvider";
import { copy } from "@/lib/i18n";
import { assetUrl } from "@/lib/asset";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./icons";
import { SITE, WA_GREETING_EN, WA_GREETING_ID } from "@/lib/site";

const LINKS = [
  { href: "#layanan", key: "services" as const },
  { href: "#tentang", key: "about" as const },
  { href: "#cara-pesan", key: "how" as const },
  { href: "#testimoni", key: "testimonials" as const },
  { href: "#faq", key: "faq" as const },
];

export function Navbar() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = copy.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const greeting = lang === "id" ? WA_GREETING_ID : WA_GREETING_EN;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line/80 bg-cream/90 shadow-[0_1px_24px_rgba(16,38,31,0.06)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Navigasi utama"
      >
        {/* Brand */}
        <a href="#beranda" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            loading="lazy"
            decoding="async"
            src={assetUrl("/assets/frangipani-emerald.png")}
            alt="Logo Amerta Massage"
            width={34}
            height={34}
            className={scrolled ? "" : "hidden sm:block"}
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.35rem] font-semibold tracking-tight text-ink">
              Amerta
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-brass">
              Massage · Bali
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13.5px] font-medium text-ink/80 transition-colors hover:text-pine"
              >
                {t[l.key][lang]}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div
            className="flex items-center rounded-full border border-line bg-white/70 p-0.5 text-[11px] font-semibold"
            role="group"
            aria-label="Bahasa / Language"
          >
            {(["id", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors ${
                  lang === l ? "bg-pine text-cream" : "text-ink/60 hover:text-ink"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href={waLink(greeting)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-pine px-5 py-2.5 text-[13px] font-semibold text-cream shadow-[0_10px_24px_-10px_rgba(12,59,46,0.55)] transition-all hover:-translate-y-0.5 hover:bg-pine-deep sm:flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t.book[lang]}
          </a>

          {/* Mobile burger */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/70 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Buka menu"}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-4 bg-ink transition-transform ${open ? "translate-y-[5.5px] rotate-45" : ""}`}
              />
              <span className={`absolute left-0 top-[5.5px] h-[1.5px] w-4 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`absolute left-0 top-[11px] h-[1.5px] w-4 bg-ink transition-transform ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className={`overflow-hidden border-b border-line bg-cream/95 backdrop-blur-md transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <ul className="space-y-1 px-6 py-4">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink/85 hover:bg-sage"
              >
                {t[l.key][lang]}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={waLink(greeting)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-pine px-5 py-3 text-sm font-semibold text-cream"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t.book[lang]}
            </a>
            <p className="mt-3 text-center text-[11px] text-moss">{SITE.waDisplay}</p>
          </li>
        </ul>
      </div>
    </header>
  );
}
