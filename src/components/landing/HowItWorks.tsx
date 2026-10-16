"use client";

import { useLang } from "./LangProvider";
import { copy } from "@/lib/i18n";
import { SectionHeader, Reveal } from "./Reveal";
import { WA_GREETING_EN, WA_GREETING_ID } from "@/lib/site";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./icons";

export function HowItWorks() {
  const { lang } = useLang();
  const t = copy.how;

  return (
    <section id="cara-pesan" className="scroll-mt-20 bg-pine-deep py-24 text-cream lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader index={t.index} kicker={t.kicker[lang]} title={t.title[lang]} dark />

        <ol className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps[lang].map(([title, desc], i) => (
            <Reveal key={title} delay={i * 0.09}>
              <li className="relative border-t border-cream/15 pt-7">
                <span
                  className="absolute -top-[1.1rem] left-0 bg-pine-deep pr-4 font-display text-5xl font-light italic text-brasslight"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-[1.3rem] font-semibold leading-snug text-cream">
                  {title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-cream/65">{desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.2} className="mt-16 flex flex-col items-center gap-5 rounded-[1.75rem] border border-cream/12 bg-cream/[0.045] px-8 py-9 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-xl font-medium text-cream">
              {lang === "id" ? "Siap mencoba pijatan pertama Anda?" : "Ready for your first session?"}
            </p>
            <p className="mt-1 text-[13px] text-cream/60">{t.note[lang]}</p>
          </div>
          <a
            href={waLink(lang === "id" ? WA_GREETING_ID : WA_GREETING_EN)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-cream px-6 py-3.5 text-[13.5px] font-semibold text-pine-deep transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            <WhatsAppIcon className="h-4.5 w-4.5 text-pine" />
            {copy.nav.book[lang]}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
