"use client";

import { useLang } from "./LangProvider";
import { copy } from "@/lib/i18n";

export function TrustMarquee() {
  const { lang } = useLang();
  const items = copy.marquee.items[lang];
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-line bg-sage/60 py-4" aria-hidden="true">
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused]">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.18em] text-ink/60">
                {item}
              </span>
              {/* frangipani dot */}
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 shrink-0 text-brass" fill="currentColor">
                <circle cx="12" cy="12" r="4" />
              </svg>
            </span>
          ))}
        </div>
        {/* edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-sage to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-sage to-transparent" />
      </div>
    </div>
  );
}
