"use client";
import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export interface Crumb {
  label: React.ReactNode;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { t } = useLang();

  return (
    <nav aria-label={t("common.breadcrumb")} className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-sidrah-400 transition-colors"
          >
            <Home size={14} />
            {t("common.home")}
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <ChevronLeft size={14} className="text-[var(--text-muted)]" />
            {item.href && i < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-[var(--text-secondary)] hover:text-sidrah-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--text-primary)] font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
