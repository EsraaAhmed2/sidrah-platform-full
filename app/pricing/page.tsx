"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { toast } from "sonner";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/Motion";
import { useLang } from "@/context/LanguageContext";

export default function PricingPage() {
  const { t } = useLang();
  const router = useRouter();
  const plans = [
    {
      id: "free",
      name: t("pricing.free.name"),
      icon: Rocket,
      monthly: 0,
      yearly: 0,
      features: [t("pricing.free.f1"), t("pricing.free.f2"), t("pricing.free.f3"), t("pricing.free.f4")],
      highlight: false,
    },
    {
      id: "pro",
      name: t("pricing.pro.name"),
      icon: Zap,
      monthly: 15,
      yearly: 120,
      features: [t("pricing.pro.f1"), t("pricing.pro.f2"), t("pricing.pro.f3"), t("pricing.pro.f4"), t("pricing.pro.f5"), t("pricing.pro.f6")],
      highlight: true,
    },
    {
      id: "team",
      name: t("pricing.team.name"),
      icon: Crown,
      monthly: 45,
      yearly: 420,
      features: [t("pricing.team.f1"), t("pricing.team.f2"), t("pricing.team.f3"), t("pricing.team.f4"), t("pricing.team.f5")],
      highlight: false,
    },
  ];
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("pricing.breadcrumb") }]} />
        <ScrollReveal className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-3">{t("pricing.title")}</h1>
          <p className="text-[var(--text-secondary)] mb-6">{t("pricing.subtitle")}</p>
          <div className="inline-flex items-center gap-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm transition-colors ${!yearly ? "bg-sidrah-600 text-white" : "text-[var(--text-secondary)]"}`}
            >
              {t("pricing.monthly")}
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm transition-colors ${yearly ? "bg-sidrah-600 text-white" : "text-[var(--text-secondary)]"}`}
            >
              {t("pricing.yearly")} <span className="text-green-400 text-xs">{t("pricing.save33")}</span>
            </button>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <StaggerItem
              key={plan.id}
              className={`card relative ${plan.highlight ? "border-sidrah-500 !bg-sidrah-950/20 scale-[1.02]" : ""}`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 right-1/2 translate-x-1/2 bg-sidrah-600 text-white text-xs px-3 py-1 rounded-full">
                  {t("pricing.popular")}
                </span>
              )}
              <plan.icon size={28} className={plan.highlight ? "text-sidrah-400" : "text-[var(--text-muted)]"} />
              <h2 className="text-xl font-bold text-[var(--text-primary)] mt-3 mb-1">{plan.name}</h2>
              <div className="mb-5">
                <span className="text-4xl font-bold text-[var(--text-primary)]">
                  ${yearly ? plan.yearly : plan.monthly}
                </span>
                <span className="text-[var(--text-muted)] text-sm"> / {yearly ? t("pricing.perYear") : t("pricing.perMonth")}</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Check size={15} className="text-green-400 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  toast.success(`${t("pricing.chose")} ${plan.name}! ${t("pricing.redirect")}`);
                  router.push(plan.monthly === 0 ? "/courses" : `/register?plan=${plan.id}`);
                }}
                className={`w-full ${plan.highlight ? "btn-primary" : "btn-secondary"}`}
              >
                {plan.monthly === 0 ? t("pricing.startFree") : t("pricing.subscribe")}
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
