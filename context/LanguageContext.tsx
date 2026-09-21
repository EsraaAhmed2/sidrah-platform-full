"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { translations, type Lang } from "@/lib/i18n";

interface LangContextType {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LangContextType>({
  lang: "ar",
  dir: "rtl",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidrah-lang") as Lang | null;
    if (saved === "en" || saved === "ar") setLangState(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang, ready]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("sidrah-lang", l);
  };

  const t = useCallback(
    (key: string) => translations[lang][key] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
