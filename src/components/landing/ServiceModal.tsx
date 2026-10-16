import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "./LangProvider";
import { copy } from "@/lib/i18n";
import { assetUrl } from "@/lib/asset";
import { formatIDR, waLink } from "@/lib/wa";
import { useServiceModal } from "@/store/modal";
import { WhatsAppIcon, CheckIcon, StarIcon } from "./icons";
import { SITE, WA_GREETING_EN, WA_GREETING_ID } from "@/lib/site";

export function ServiceModal() {
  const { lang } = useLang();
  const { open, service, selIdx, setSelIdx, closeModal } = useServiceModal();
  const sel = selIdx;

  // lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);

  const waHref = useMemo(() => {
    if (!service) return waLink(lang === "id" ? WA_GREETING_ID : WA_GREETING_EN);
    const d = service.durations[sel] ?? service.durations[0];
    const lines =
      lang === "id"
        ? [
            copy.modal.msgIntro.id,
            "",
            `• ${copy.booking.msgService.id}: ${service.name.id} — ${d.minutes} menit (${formatIDR(d.price, "id")})`,
            "",
            copy.modal.ask.id,
          ]
        : [
            copy.modal.msgIntro.en,
            "",
            `• ${copy.booking.msgService.en}: ${service.name.en} — ${d.minutes} minutes (${formatIDR(d.price, "en")})`,
            "",
            copy.modal.ask.en,
          ];
    return waLink(lines.join("\n"));
  }, [service, sel, lang]);

  const t = copy.modal;

  return (
    <AnimatePresence>
      {open && service ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={service.name[lang]}
        >
          {/* backdrop */}
          <motion.button
            type="button"
            aria-label="Tutup"
            onClick={closeModal}
            className="absolute inset-0 cursor-default bg-pine-deep/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[92svh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[1.75rem] bg-cream shadow-2xl sm:rounded-[1.75rem]"
          >
            {/* image header */}
            <div className="relative h-52 shrink-0 sm:h-60">
              <img
                loading="lazy"
                decoding="async"
                src={assetUrl(service.img)}
                alt={service.imgAlt[lang]}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <button
                type="button"
                onClick={closeModal}
                aria-label="Tutup"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink shadow transition hover:bg-cream"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <div className="mb-2 flex items-center gap-1 text-brasslight">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-3 w-3" />
                  ))}
                </div>
                <h3 className="font-display text-[1.7rem] font-semibold leading-tight text-cream sm:text-3xl">
                  {service.name[lang]}
                </h3>
                <p className="mt-1 text-[12.5px] text-cream/85">{service.tagline[lang]}</p>
              </div>
            </div>

            {/* scrollable body */}
            <div className="overflow-y-auto px-6 py-6 sm:px-8">
              <p className="text-[14px] leading-relaxed text-ink/80">{service.desc[lang]}</p>

              {/* benefits */}
              <div className="mt-6">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-brass">
                  {t.benefits[lang]}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {service.benefits[lang].map((b) => (
                    <span
                      key={b}
                      className="rounded-full border border-pine/15 bg-pine/[0.06] px-3.5 py-1.5 text-[12px] font-medium text-pine"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* duration picker */}
              <div className="mt-7">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-brass">
                  {t.duration[lang]}
                </p>
                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {service.durations.map((d, i) => {
                    const active = sel === i;
                    return (
                      <button
                        key={d.minutes}
                        type="button"
                        onClick={() => setSelIdx(i)}
                        aria-pressed={active}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all ${
                          active
                            ? "border-pine bg-pine text-cream shadow-[0_10px_24px_-12px_rgba(12,59,46,0.5)]"
                            : "border-line bg-white text-ink hover:border-brass/60"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`flex h-4.5 w-4.5 items-center justify-center rounded-full border ${
                              active ? "border-cream/70" : "border-ink/25"
                            }`}
                          >
                            {active ? <span className="h-2 w-2 rounded-full bg-cream" /> : null}
                          </span>
                          <span className="text-[13.5px] font-semibold">
                            {d.minutes} {copy.servicesSection.perMin[lang]}
                          </span>
                        </span>
                        <span className={`text-[13.5px] font-bold ${active ? "text-brasslight" : "text-pine"}`}>
                          {formatIDR(d.price, lang)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* includes */}
              <div className="mt-7">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-brass">
                  {t.includes[lang]}
                </p>
                <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {service.includes[lang].map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-[13px] text-ink/75">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-pine/10 text-pine">
                        <CheckIcon className="h-2.5 w-2.5" />
                      </span>
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 text-[12px] leading-relaxed text-moss">{t.note[lang]}</p>
            </div>

            {/* sticky CTA */}
            <div className="shrink-0 border-t border-line bg-cream px-6 py-4 sm:px-8">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-pine px-6 py-4 text-[14.5px] font-semibold text-cream shadow-[0_16px_36px_-14px_rgba(12,59,46,0.6)] transition-all hover:-translate-y-0.5 hover:bg-pine-deep"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t.book[lang]}
                {service.durations[sel] ? (
                  <span className="font-normal text-cream/80">
                    · {service.durations[sel].minutes}&apos; · {formatIDR(service.durations[sel].price, lang)}
                  </span>
                ) : null}
              </a>
              <p className="mt-2.5 text-center text-[11px] text-moss">
                {SITE.waDisplay} · {lang === "id" ? "Bayar di tempat setelah sesi" : "Pay on-site after the session"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
