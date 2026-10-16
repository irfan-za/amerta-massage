import { motion } from "framer-motion";
import { useLang } from "./LangProvider";
import { copy } from "@/lib/i18n";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon, StarIcon } from "./icons";
import { SITE, WA_GREETING_EN, WA_GREETING_ID } from "@/lib/site";

const fade = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  const { lang } = useLang();
  const t = copy.hero;
  const greeting = lang === "id" ? WA_GREETING_ID : WA_GREETING_EN;

  return (
    <section id="beranda" className="relative overflow-hidden pt-[72px]">
      {/* faint frangipani watermark */}
      <img
        loading="lazy"
        decoding="async"
        src="/assets/frangipani-emerald.png"
        alt=""
        width={420}
        height={420}
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-16 opacity-[0.05]"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-28 lg:pt-16">
        {/* Copy */}
        <div className="max-w-xl">
          <motion.div
            {...fade}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-brass" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brass">
              {t.kicker[lang]}
            </span>
          </motion.div>

          <motion.h1
            {...fade}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[2.6rem] leading-[1.06] font-medium text-ink sm:text-6xl lg:text-[4.15rem]"
          >
            {t.titleA[lang]}{" "}
            <em className="font-light italic text-pine">{t.titleB[lang]}</em>
          </motion.h1>

          <motion.p
            {...fade}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[15.5px] leading-relaxed text-moss"
          >
            {t.sub[lang]}
          </motion.p>

          <motion.div
            {...fade}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href={waLink(greeting)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-pine px-7 py-3.5 text-sm font-semibold text-cream shadow-[0_16px_36px_-14px_rgba(12,59,46,0.6)] transition-all hover:-translate-y-0.5 hover:bg-pine-deep"
            >
              <WhatsAppIcon className="h-[18px] w-[18px] transition-transform group-hover:scale-110" />
              {t.ctaPrimary[lang]}
            </a>
            <a
              href="#layanan"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:border-brass hover:text-pine"
            >
              {t.ctaSecondary[lang]}
            </a>
          </motion.div>

          {/* Trust row */}
          <motion.div
            {...fade}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-7"
          >
            <div>
              <div className="flex items-center gap-1 text-brass">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-3.5 w-3.5" />
                ))}
                <span className="ml-1.5 font-display text-lg font-semibold text-ink">
                  {SITE.rating.toString().replace(".", ",")}
                </span>
              </div>
              <p className="mt-0.5 text-[11.5px] text-moss">{t.trustRating[lang]}</p>
            </div>
            <div className="h-9 w-px bg-line" aria-hidden="true" />
            <div>
              <p className="font-display text-[15px] font-semibold text-ink">{t.trustCertified[lang]}</p>
              <p className="text-[11.5px] text-moss">
                {lang === "id" ? `${SITE.therapists} terapis senior` : `${SITE.therapists} senior therapists`}
              </p>
            </div>
            <div className="h-9 w-px bg-line" aria-hidden="true" />
            <div>
              <p className="font-display text-[15px] font-semibold text-ink">{t.trustFast[lang]}</p>
              <p className="text-[11.5px] text-moss">WhatsApp · {SITE.hours}</p>
            </div>
          </motion.div>
        </div>

        {/* Arch image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          {/* offset brass ring */}
          <div
            className="absolute -inset-3 rounded-b-[2.5rem] rounded-t-[999px] border border-brass/50"
            aria-hidden="true"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-b-[2rem] rounded-t-[999px] shadow-[0_40px_80px_-40px_rgba(16,38,31,0.45)]">
            <img
              loading="eager" fetchPriority="high"
              decoding="async"
              src="/images/hero.jpg"
              alt="Terapis Amerta memberikan pijat Bali di vila dengan pemandangan hutan tropis"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* floating rating card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-7 left-2 rounded-2xl border border-line bg-white/95 px-5 py-4 shadow-[0_24px_50px_-24px_rgba(16,38,31,0.4)] backdrop-blur sm:-left-8"
          >
            <div className="flex items-center gap-1 text-brass">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-3.5 w-3.5" />
              ))}
            </div>
            <p className="mt-1.5 font-display text-2xl font-semibold leading-none text-ink">
              4,9<span className="text-sm text-moss">/5</span>
            </p>
            <p className="mt-1 text-[11px] text-moss">{t.trustRating[lang]}</p>
          </motion.div>

          {/* floating arrival chip */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-4 right-4 flex items-center gap-2.5 rounded-full border border-line bg-white/95 py-2.5 pl-3.5 pr-5 shadow-[0_18px_40px_-20px_rgba(16,38,31,0.4)] backdrop-blur sm:-right-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pine opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pine" />
            </span>
            <span className="text-[12px] font-semibold text-ink">{t.floatArrive[lang]}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
