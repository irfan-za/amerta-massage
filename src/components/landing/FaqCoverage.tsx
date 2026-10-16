import { useState } from "react";
import { useLang } from "./LangProvider";
import { copy } from "@/lib/i18n";
import { assetUrl } from "@/lib/asset";
import { SectionHeader, Reveal } from "./Reveal";
import { SITE, WA_GREETING_EN, WA_GREETING_ID } from "@/lib/site";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./icons";

export function FaqCoverage() {
  const { lang } = useLang();
  const t = copy.faq;
  const cov = copy.coverage;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* FAQ accordion */}
        <div>
          <SectionHeader index={t.index} kicker={t.kicker[lang]} title={t.title[lang]} />
          <Reveal delay={0.1} className="mt-10 divide-y divide-line border-y border-line">
            {t.items[lang].map(([q, a], i) => {
              const open = openIdx === i;
              return (
                <div key={q}>
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-display text-[16.5px] font-semibold text-ink">{q}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${
                        open ? "rotate-45 border-pine bg-pine text-cream" : "border-line text-ink/60"
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl text-[13.5px] leading-relaxed text-moss">{a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>

        {/* Coverage card */}
        <Reveal delay={0.12}>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-sage/60">
            <div className="relative h-44 sm:h-52">
              <img
                loading="lazy"
                decoding="async"
                src={assetUrl("/images/gallery-gazebo.jpg")}
                alt="Paviliun pijat di taman tropis Bali"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sage via-sage/20 to-transparent" />
            </div>
            <div className="px-8 pb-9 pt-2">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-brass" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brass">
                  {cov.kicker[lang]}
                </p>
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{cov.title[lang]}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {SITE.areas.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-2 rounded-full border border-pine/15 bg-white px-4 py-2 text-[12.5px] font-semibold text-pine"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brass" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[13px] leading-relaxed text-moss">{cov.note[lang]}</p>
              <a
                href={waLink(lang === "id" ? WA_GREETING_ID : WA_GREETING_EN)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-pine bg-transparent px-5 py-3 text-[13px] font-semibold text-pine transition-all hover:bg-pine hover:text-cream"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {lang === "id" ? "Tanya area Anda" : "Ask about your area"}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
