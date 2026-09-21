"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, HelpCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ScrollReveal } from "@/components/Motion";
import { useLang } from "@/context/LanguageContext";

export default function FAQPage() {
  const { t } = useLang();

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
    { q: t("faq.q7"), a: t("faq.a7") },
    { q: t("faq.q8"), a: t("faq.a8") },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("faq.title") }]} />
        <ScrollReveal className="text-center mb-12">
          <div className="w-16 h-16 bg-sidrah-950/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="text-sidrah-400" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">{t("faq.title")}</h1>
          <p className="text-[var(--text-secondary)]">{t("faq.subtitle")}</p>
        </ScrollReveal>

        <Accordion.Root type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <Accordion.Item
              key={i}
              value={`item-${i}`}
              className="card !p-0 overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between px-6 py-4 text-right text-[var(--text-primary)] font-medium hover:bg-[var(--bg-primary)] transition-colors group">
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="text-[var(--text-muted)] transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0 mr-4"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <p className="px-6 pb-5 text-[var(--text-secondary)] text-sm leading-relaxed">
                  {faq.a}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
}
