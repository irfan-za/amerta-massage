"use client";

import Image from "next/image";
import { useLang } from "./LangProvider";
import { copy } from "@/lib/i18n";
import { SITE, WA_GREETING_EN, WA_GREETING_ID } from "@/lib/site";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./icons";

export function Footer() {
  const { lang } = useLang();
  const t = copy.footer;

  const links = [
    { href: "#layanan", label: copy.nav.services[lang] },
    { href: "#tentang", label: copy.nav.about[lang] },
    { href: "#cara-pesan", label: copy.nav.how[lang] },
    { href: "#testimoni", label: copy.nav.testimonials[lang] },
    { href: "#faq", label: copy.nav.faq[lang] },
  ];

  return (
    <footer className="mt-auto border-t border-line bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_0.7fr_1fr]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src="/assets/frangipani-emerald.png"
              alt="Logo Amerta Massage"
              width={34}
              height={34}
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.35rem] font-semibold tracking-tight text-ink">
                Amerta
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-brass">
                Massage · Bali
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-moss">{t.tagline[lang]}</p>
          <a
            href={waLink(lang === "id" ? WA_GREETING_ID : WA_GREETING_EN)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-pine/20 px-4 py-2.5 text-[12.5px] font-semibold text-pine transition-all hover:bg-pine hover:text-cream"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            {SITE.waDisplay}
          </a>
        </div>

        {/* Nav */}
        <nav aria-label="Footer">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/60">{t.nav[lang]}</p>
          <ul className="mt-4 space-y-2.5">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[13.5px] text-moss transition-colors hover:text-pine">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/60">{t.contact[lang]}</p>
          <ul className="mt-4 space-y-2.5 text-[13.5px] text-moss">
            <li>
              <a href={waLink(lang === "id" ? WA_GREETING_ID : WA_GREETING_EN)} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-pine">
                WhatsApp {SITE.waDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-pine">
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/amerta.massage"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-pine"
              >
                Instagram {SITE.instagram}
              </a>
            </li>
            <li className="pt-2">
              <span className="font-semibold text-ink">{t.hours[lang]}</span>
              <br />
              {t.daily[lang]} · {SITE.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-[11.5px] text-moss sm:flex-row sm:px-8 lg:pr-48">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. {t.rights[lang]}
          </p>
          <p className="font-display italic">{t.made[lang]}</p>
        </div>
      </div>
    </footer>
  );
}
