"use client";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { Mail } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

const fill = (str: string, vars: Record<string, string>) => {
  let out = str;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replace(`{${k}}`, v);
  }
  return out;
};

const templates = [
  { id: "welcome", nameKey: "emails.welcome.name", subjectKey: "emails.welcome.subject", bodyKey: "emails.welcome.body", ctaKey: "emails.welcome.cta" },
  { id: "certificate", nameKey: "emails.certificate.name", subjectKey: "emails.certificate.subject", bodyKey: "emails.certificate.body", ctaKey: "emails.certificate.cta" },
  { id: "reset", nameKey: "emails.reset.name", subjectKey: "emails.reset.subject", bodyKey: "emails.reset.body", ctaKey: "emails.reset.cta" },
  { id: "streak", nameKey: "emails.streak.name", subjectKey: "emails.streak.subject", bodyKey: "emails.streak.body", ctaKey: "emails.streak.cta" },
] as const;

export default function EmailsPage() {
  const { t, lang } = useLang();
  const [activeId, setActiveId] = useState<typeof templates[number]["id"]>("welcome");

  const sample = {
    name: lang === "ar" ? "أحمد" : "Ahmed",
    course: "React.js",
    certId: "CERT-2026-001",
    days: "7",
  };

  const active = templates.find((t2) => t2.id === activeId)!;
  const subject = fill(t(active.subjectKey), sample);
  const body = fill(t(active.bodyKey), sample);
  const cta = t(active.ctaKey);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("emails.title") }]} />
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2 flex items-center gap-3">
          <Mail className="text-sidrah-400" size={26} />
          {t("emails.title")}
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">{t("emails.subtitle")}</p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => setActiveId(tpl.id)}
                className={`w-full text-right px-4 py-3 rounded-xl border text-sm transition-colors ${
                  activeId === tpl.id
                    ? "bg-sidrah-950/40 border-sidrah-800/40 text-sidrah-300"
                    : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-sidrah-700"
                }`}
              >
                {t(tpl.nameKey)}
              </button>
            ))}
          </div>

          <div className="md:col-span-2">
            {/* Email preview */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl" dir={lang === "ar" ? "rtl" : "ltr"}>
              <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-6 text-center">
                <div className="inline-flex items-center gap-2 text-white font-bold text-xl">
                  <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">س</span>
                  Sidrah
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-gray-900 font-bold text-lg mb-4">{subject}</h2>
                <p className="text-gray-600 text-sm leading-loose whitespace-pre-line mb-6">{body}</p>
                <a href="/courses" className="inline-block bg-sky-600 text-white font-medium px-6 py-3 rounded-lg text-sm">
                  {cta}
                </a>
              </div>
              <div className="bg-gray-50 px-8 py-4 text-center text-gray-400 text-xs border-t">
                © 2026 Sidrah — {t("emails.footer.platform")} • {t("emails.footer.unsubscribe")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
