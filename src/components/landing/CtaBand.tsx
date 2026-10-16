import { useLang } from "./LangProvider";
import { copy } from "@/lib/i18n";
import { assetUrl } from "@/lib/asset";
import { Reveal } from "./Reveal";
import { WA_GREETING_EN, WA_GREETING_ID } from "@/lib/site";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./icons";

export function CtaBand() {
  const { lang } = useLang();
  const t = copy.cta;

  return (
    <section className="px-5 pb-24 sm:px-8 lg:pb-32">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-pine-deep px-8 py-16 text-center sm:px-12 lg:py-20">
        <img
          loading="lazy"
          decoding="async"
          src={assetUrl("/assets/frangipani-cream.png")}
          alt=""
          width={340}
          height={340}
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 opacity-[0.06]"
        />
        <img
          loading="lazy"
          decoding="async"
          src={assetUrl("/assets/frangipani-cream.png")}
          alt=""
          width={260}
          height={260}
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -right-14 rotate-45 opacity-[0.07]"
        />
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium leading-tight text-balance text-cream sm:text-4xl lg:text-[2.9rem]">
          {t.title[lang]}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-cream/70">
          {t.sub[lang]}
        </p>
        <div className="mt-9 flex flex-col items-center gap-4">
          <a
            href={waLink(lang === "id" ? WA_GREETING_ID : WA_GREETING_EN)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-cream px-8 py-4 text-[14.5px] font-semibold text-pine-deep shadow-[0_20px_44px_-16px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            <WhatsAppIcon className="h-5 w-5 text-pine" />
            {t.button[lang]}
          </a>
          <p className="text-[12px] text-cream/55">{t.note[lang]}</p>
        </div>
      </Reveal>
    </section>
  );
}
