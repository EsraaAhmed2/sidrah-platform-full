import Breadcrumbs from "@/components/Breadcrumbs";
import T from "@/components/T";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "سياسة الخصوصية" };

const sections = [
  { titleKey: "privacy.s1title", textKey: "privacy.s1text" },
  { titleKey: "privacy.s2title", textKey: "privacy.s2text" },
  { titleKey: "privacy.s3title", textKey: "privacy.s3text" },
  { titleKey: "privacy.s4title", textKey: "privacy.s4text" },
  { titleKey: "privacy.s5title", textKey: "privacy.s5text" },
  { titleKey: "privacy.s6title", textKey: "privacy.s6text" },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: <T k="privacy.title" /> }]} />
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2"><T k="privacy.title" /></h1>
        <p className="text-[var(--text-muted)] text-sm mb-10"><T k="privacy.updated" /></p>
        <div className="space-y-6">
          {sections.map((s, i) => (
            <div key={i} className="card">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                {i + 1}. <T k={s.titleKey} />
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed"><T k={s.textKey} /></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
