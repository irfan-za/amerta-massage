"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLang } from "./LangProvider";
import { copy, services } from "@/lib/i18n";
import { formatIDR, waLink } from "@/lib/wa";
import { SectionHeader, Reveal } from "./Reveal";
import { WhatsAppIcon } from "./icons";
import { toast } from "sonner";
import { SITE, WA_GREETING_EN, WA_GREETING_ID } from "@/lib/site";

const TIME_SLOTS = Array.from({ length: 27 }, (_, i) => {
  const total = 8 * 60 + i * 30; // 08:00 → 21:00
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
});

export function BookingSection() {
  const { lang } = useLang();
  const t = copy.booking;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [slug, setSlug] = useState<string>("");
  const [durIdx, setDurIdx] = useState<string>("0");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [pref, setPref] = useState<"f" | "m" | "any">("any");
  const [notes, setNotes] = useState("");

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const svc = services.find((s) => s.slug === slug) ?? null;
  const dur = svc?.durations[Number(durIdx)] ?? null;

  const prefLabel =
    pref === "f" ? t.prefF[lang] : pref === "m" ? t.prefM[lang] : t.prefAny[lang];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug || !date || !time || !location.trim()) {
      toast.error(t.errorRequired[lang]);
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 15) {
      toast.error(t.errorPhone[lang]);
      return;
    }

    const lines = [
      t.msgHeader[lang],
      "",
      `• ${lang === "id" ? "Nama" : "Name"}: ${name.trim()}`,
      `• ${t.msgService[lang]}: ${svc!.name[lang]} — ${dur!.minutes} ${copy.servicesSection.perMin[lang]} (${formatIDR(dur!.price, lang)})`,
      `• ${t.msgDate[lang]}: ${date} · ${time} WITA`,
      `• ${t.msgLocation[lang]}: ${location.trim()}`,
      `• ${t.msgPref[lang]}: ${prefLabel}`,
      ...(notes.trim() ? [`• ${t.msgNotes[lang]}: ${notes.trim()}`] : []),
      "",
      t.msgClosing[lang],
    ];
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    toast.success(t.success[lang]);
  };

  const inputCls =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-[14px] text-ink placeholder:text-moss/60 outline-none transition-colors focus:border-pine focus:ring-2 focus:ring-pine/15";
  const labelCls = "mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-ink/70";

  return (
    <section id="pesan" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Left rail */}
        <div>
          <SectionHeader index={t.index} kicker={t.kicker[lang]} title={t.title[lang]} sub={t.sub[lang]} />

          <Reveal delay={0.12} className="mt-10 rounded-[1.75rem] border border-line bg-sage/60 p-7">
            <p className="font-display text-lg font-semibold text-ink">{t.sideTitle[lang]}</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-moss">{t.sideSub[lang]}</p>
            <a
              href={waLink(lang === "id" ? WA_GREETING_ID : WA_GREETING_EN)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-pine px-5 py-3 text-[13px] font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-pine-deep"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {SITE.waDisplay}
            </a>
            <div className="mt-6 border-t border-line pt-4 text-[12.5px] text-moss">
              <p>
                <span className="font-semibold text-ink">{t.openHours[lang]}:</span> {SITE.hours}
              </p>
              <p className="mt-1">{t.reply[lang]}</p>
            </div>
          </Reveal>

          {/* decorative image */}
          <Reveal delay={0.18} className="relative mt-8 hidden aspect-[16/9] overflow-hidden rounded-[1.75rem] lg:block">
            <Image
              src="/images/about-minimal.jpg"
              alt="Ruang tenang dengan tanaman hijau — suasana sesi pijat di tempat Anda"
              fill
              sizes="460px"
              className="object-cover"
            />
          </Reveal>
        </div>

        {/* Form card */}
        <Reveal delay={0.08}>
          <form
            onSubmit={submit}
            className="rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_30px_70px_-40px_rgba(16,38,31,0.35)] sm:p-9"
            noValidate
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="bk-name" className={labelCls}>
                  {t.name[lang]} *
                </label>
                <input
                  id="bk-name"
                  className={inputCls}
                  placeholder={t.namePh[lang]}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="bk-phone" className={labelCls}>
                  {t.phone[lang]} *
                </label>
                <input
                  id="bk-phone"
                  className={inputCls}
                  placeholder={t.phonePh[lang]}
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="bk-service" className={labelCls}>
                  {t.service[lang]} *
                </label>
                <select
                  id="bk-service"
                  className={`${inputCls} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235C6B62%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setDurIdx("0");
                  }}
                >
                  <option value="" disabled>
                    {t.servicePh[lang]}
                  </option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name[lang]} — {lang === "id" ? "mulai" : "from"}{" "}
                      {formatIDR(s.durations[0].price, lang)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="bk-dur" className={labelCls}>
                  {t.duration[lang]} *
                </label>
                <select
                  id="bk-dur"
                  className={`${inputCls} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235C6B62%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10 disabled:cursor-not-allowed disabled:bg-sage/50`}
                  value={durIdx}
                  onChange={(e) => setDurIdx(e.target.value)}
                  disabled={!svc}
                >
                  {!svc ? (
                    <option>{lang === "id" ? "Pilih layanan dulu" : "Pick a treatment first"}</option>
                  ) : (
                    svc.durations.map((d, i) => (
                      <option key={d.minutes} value={String(i)}>
                        {d.minutes} {copy.servicesSection.perMin[lang]} — {formatIDR(d.price, lang)}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label htmlFor="bk-date" className={labelCls}>
                  {t.date[lang]} *
                </label>
                <input
                  id="bk-date"
                  type="date"
                  min={today}
                  className={inputCls}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="bk-time" className={labelCls}>
                  {t.time[lang]} *
                </label>
                <select
                  id="bk-time"
                  className={`${inputCls} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235C6B62%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="" disabled>
                    WITA
                  </option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="bk-loc" className={labelCls}>
                  {t.location[lang]} *
                </label>
                <input
                  id="bk-loc"
                  className={inputCls}
                  placeholder={t.locationPh[lang]}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <span className={labelCls}>{t.pref[lang]}</span>
                <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label={t.pref[lang]}>
                  {([
                    ["f", t.prefF[lang]],
                    ["m", t.prefM[lang]],
                    ["any", t.prefAny[lang]],
                  ] as const).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      role="radio"
                      aria-checked={pref === val}
                      onClick={() => setPref(val)}
                      className={`rounded-xl border px-3 py-2.5 text-[12.5px] font-semibold transition-all ${
                        pref === val
                          ? "border-pine bg-pine text-cream"
                          : "border-line bg-white text-ink/70 hover:border-brass/60"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="bk-notes" className={labelCls}>
                  {t.notes[lang]}
                </label>
                <textarea
                  id="bk-notes"
                  rows={3}
                  className={`${inputCls} resize-none`}
                  placeholder={t.notesPh[lang]}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-pine px-6 py-4 text-[14.5px] font-semibold text-cream shadow-[0_16px_36px_-14px_rgba(12,59,46,0.6)] transition-all hover:-translate-y-0.5 hover:bg-pine-deep"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t.submit[lang]}
            </button>
            <p className="mt-3 text-center text-[11.5px] text-moss">
              {lang === "id"
                ? "Pesanan terbuka di WhatsApp Anda — cukup tekan kirim."
                : "Your order opens pre-filled in WhatsApp — just press send."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
