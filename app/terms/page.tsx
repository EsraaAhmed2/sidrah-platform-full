import Breadcrumbs from "@/components/Breadcrumbs";
import T from "@/components/T";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "شروط الاستخدام" };

const sections = [
  { titleKey: "terms.s1title", textKey: "terms.s1text" },
  { titleKey: "terms.s2title", textKey: "terms.s2text" },
  { titleKey: "terms.s3title", textKey: "terms.s3text" },
  { titleKey: "terms.s4title", textKey: "terms.s4text" },
  { titleKey: "terms.s5title", textKey: "terms.s5text" },
  { titleKey: "terms.s6title", textKey: "terms.s6text" },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: <T k="terms.title" /> }]} />
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2"><T k="terms.title" /></h1>
        <p className="text-[var(--text-muted)] text-sm mb-10"><T k="terms.updated" /></p>
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
