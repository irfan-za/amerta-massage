"use client";

import Image from "next/image";
import { useLang } from "./LangProvider";
import { copy, services } from "@/lib/i18n";
import { formatIDR } from "@/lib/wa";
import { useServiceModal } from "@/store/modal";
import { SectionHeader, Reveal } from "./Reveal";
import { ArrowRightIcon } from "./icons";

export function Services() {
  const { lang } = useLang();
  const t = copy.servicesSection;
  const openModal = useServiceModal((s) => s.openModal);

  return (
    <section id="layanan" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader index={t.index} kicker={t.kicker[lang]} title={t.title[lang]} sub={t.sub[lang]} />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, i) => (
            <Reveal key={svc.slug} delay={(i % 3) * 0.08}>
              <button
                type="button"
                onClick={() => openModal(svc)}
                className="group block w-full text-left"
                aria-label={`${svc.name[lang]} — ${t.viewDetail[lang]}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-sage">
                  <Image
                    src={svc.img}
                    alt={svc.imgAlt[lang]}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  {svc.popular ? (
                    <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-pine shadow-sm backdrop-blur">
                      {t.popular[lang]}
                    </span>
                  ) : null}
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-[1.35rem] font-semibold leading-snug text-ink transition-colors group-hover:text-pine">
                      {svc.name[lang]}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-moss">
                      {svc.tagline[lang]}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                  <p className="text-[13px] text-moss">
                    <span className="font-semibold text-ink">
                      {formatIDR(svc.durations[0].price, lang)}
                    </span>{" "}
                    · {svc.durations[0].minutes} {t.perMin[lang]}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brass transition-all group-hover:gap-2.5 group-hover:text-pine">
                    {t.viewDetail[lang]}
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
