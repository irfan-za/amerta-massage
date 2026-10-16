import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import type { Lang } from "@/lib/i18n";

const STORAGE_KEY = "amerta-lang";
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): Lang {
  return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "id";
}

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    window.localStorage.setItem(STORAGE_KEY, l);
    listeners.forEach((cb) => cb());
  };

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const context = useContext(Ctx);
  if (!context) throw new Error("useLang requires LangProvider");
  return context;
}
