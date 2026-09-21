"use client";
import { useLang } from "@/context/LanguageContext";

export default function T({ k }: { k: string }) {
  const { t } = useLang();
  return <>{t(k)}</>;
}
