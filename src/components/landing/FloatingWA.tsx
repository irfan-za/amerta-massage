import { useEffect, useState } from "react";
import { useLang } from "./LangProvider";
import { copy } from "@/lib/i18n";
import { WA_GREETING_EN, WA_GREETING_ID } from "@/lib/site";
import { waLink } from "@/lib/wa";
import { WhatsAppIcon } from "./icons";

export function FloatingWA() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waLink(lang === "id" ? WA_GREETING_ID : WA_GREETING_EN)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy.floating.label[lang]}
      className={`group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-pine py-3.5 pl-4 pr-4 text-cream shadow-[0_18px_44px_-14px_rgba(12,59,46,0.65)] transition-all duration-300 hover:bg-pine-deep sm:bottom-7 sm:right-7 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-pine/30 [animation-duration:2.6s]" aria-hidden="true" />
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden text-[13px] font-semibold sm:block">
        {copy.floating.label[lang]}
      </span>
    </a>
  );
}
