"use client";

import { useSyncExternalStore } from "react";
import type { Lang } from "@/lib/i18n";
import { createContext, useContext, type ReactNode } from "react";

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

function getServerSnapshot(): Lang {
  return "id";
}

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const Ctx = createContext<LangCtx>({ lang: "id", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  // SSR renders Indonesian; useSyncExternalStore re-renders with the saved choice
  // after hydration without causing a mismatch.
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = (l: Lang) => {
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
    listeners.forEach((cb) => cb());
  };

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}
