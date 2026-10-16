"use client";

import { useLang } from "./LangProvider";
import { copy } from "@/lib/i18n";
import { SectionHeader, Reveal } from "./Reveal";
import { StarIcon } from "./icons";
import { SITE } from "@/lib/site";

const AVATAR_BG = ["bg-pine/90", "bg-brass/90", "bg-pine-deep/90", "bg-moss/90", "bg-pine/80", "bg-brass/80"];

export function Testimonials() {
  const { lang } = useLang();
  const t = copy.testimonials;

  return (
    <section id="testimoni" className="scroll-mt-20 border-y border-line bg-sage/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader index={t.index} kicker={t.kicker[lang]} title={t.title[lang]} />
          <Reveal delay={0.1} className="flex items-center gap-4 rounded-2xl border border-line bg-white px-6 py-4">
            <p className="font-display text-4xl font-semibold text-pine">
              {lang === "id" ? "4,9" : "4.9"}
            </p>
            <div>
              <div className="flex items-center gap-0.5 text-brass">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-3.5 w-3.5" />
                ))}
              </div>
              <p className="mt-1 text-[11.5px] text-moss">
                {SITE.reviewCount}+ {t.summary[lang]}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.items[lang].map(([quote, name, area], i) => (
            <Reveal key={`${name}-${i}`} delay={(i % 3) * 0.08}>
              <figure className="flex h-full flex-col justify-between rounded-[1.5rem] border border-line bg-white p-7 shadow-[0_18px_40px_-30px_rgba(16,38,31,0.3)] transition-transform duration-300 hover:-translate-y-1">
                <div>
                  <div className="flex items-center gap-0.5 text-brass" aria-label="5 dari 5 bintang">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <StarIcon key={s} className="h-3.5 w-3.5" />
                    ))}
                  </div>
                  <blockquote className="mt-4 font-display text-[16.5px] leading-relaxed text-ink/85">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-[15px] font-semibold text-cream ${AVATAR_BG[i % AVATAR_BG.length]}`}
                    aria-hidden="true"
                  >
                    {name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-[13.5px] font-semibold text-ink">{name}</p>
                    <p className="text-[11.5px] text-moss">{area}, Bali</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
