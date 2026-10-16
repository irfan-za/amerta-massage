import { useLang } from "./LangProvider";
import { copy } from "@/lib/i18n";
import { SectionHeader, Reveal } from "./Reveal";
import { CheckIcon } from "./icons";
import { SITE } from "@/lib/site";

export function About() {
  const { lang } = useLang();
  const t = copy.about;

  return (
    <section id="tentang" className="scroll-mt-20 border-y border-line bg-sage/50 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Image collage */}
        <Reveal className="relative mx-auto w-full max-w-[500px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-44px_rgba(16,38,31,0.5)]">
            <img
              loading="lazy"
              decoding="async"
              src="/images/about-bath.jpg"
              alt={t.imgAlt[lang]}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-4 hidden w-44 overflow-hidden rounded-2xl border-4 border-cream shadow-xl sm:block lg:-right-10 lg:w-52">
            <div className="relative aspect-square">
              <img
                loading="lazy"
                decoding="async"
                src="/images/about-ritual.jpg"
                alt="Ritual pijat kaki tradisional Bali"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <img
            loading="lazy"
            decoding="async"
            src="/assets/frangipani-emerald.png"
            alt=""
            width={56}
            height={56}
            aria-hidden="true"
            className="absolute -left-6 -top-6 opacity-90"
          />
        </Reveal>

        {/* Copy */}
        <div>
          <SectionHeader index={t.index} kicker={t.kicker[lang]} title={t.title[lang]} />
          <Reveal delay={0.1}>
            <p className="mt-6 text-[14.5px] leading-relaxed text-ink/75">{t.p1[lang]}</p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-ink/75">{t.p2[lang]}</p>
          </Reveal>

          <Reveal delay={0.16} className="mt-8 space-y-5">
            {t.values[lang].map(([title, desc]) => (
              <div key={title} className="flex gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pine/10 text-pine">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="font-display text-[16px] font-semibold text-ink">{title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-moss">{desc}</p>
                </div>
              </div>
            ))}
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.22}>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {t.stats[lang].map(([num, label]) => (
                <div key={label} className="bg-white px-4 py-5 text-center">
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-xl font-semibold text-pine sm:text-[1.35rem]">{num}</dd>
                  <p className="mt-1 text-[10.5px] font-medium uppercase tracking-wide text-moss">
                    {label}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>
          <p className="sr-only">{SITE.legalName}</p>
        </div>
      </div>
    </section>
  );
}
