"use client";
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import RoleGuard from "@/components/RoleGuard";

const content = {
  ar: {
    title: "الإيرادات والماليات",
    subtitle: "إحصائيات الدخل، المدفوعات، والمستحقات",
    total: "إجمالي الإيرادات",
    net: "الصافي",
    payouts: "المستحقات للمدرسين",
    refunds: "الاستردادات",
    orders: "الطلبات",
    course: "الكورس",
    gateway: "بوابة الدفع",
    period: "آخر 30 يوم",
  },
  en: {
    title: "Revenue & Finance",
    subtitle: "Income, payments and payout metrics",
    total: "Total revenue",
    net: "Net income",
    payouts: "Instructor payouts",
    refunds: "Refunds",
    orders: "Orders",
    course: "Course",
    gateway: "Payment gateway",
    period: "Last 30 days",
  },
};

export default function AdminRevenue() {
  const { lang } = useLang();
  const t = content[lang];

  const stats = [
    { label: t.total, value: "$24,500", icon: DollarSign, color: "text-green-400" },
    { label: t.net, value: "$17,800", icon: TrendingUp, color: "text-sidrah-400" },
    { label: t.payouts, value: "$9,200", icon: ArrowUpRight, color: "text-purple-400" },
    { label: t.refunds, value: "$320", icon: CreditCard, color: "text-red-400" },
  ];

  const orders = [
    { id: 1, student: "Mohamed Ali", course: "React.js", amount: "$49", date: "2026-09-15" },
    { id: 2, student: "Sara Khaled", course: "Python", amount: "$39", date: "2026-09-14" },
    { id: 3, student: "Omar Farouk", course: "AI/ML", amount: "$79", date: "2026-09-13" },
  ];

  return (
    <RoleGuard roles={["admin"]}>
      <div className="min-h-screen bg-[var(--bg-primary)] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t.title}</h1>
            <p className="text-[var(--text-secondary)]">{t.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => (
              <div key={i} className="card text-center">
                <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-[var(--text-primary)]">{s.value}</div>
                <div className="text-[var(--text-secondary)] text-sm">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 className="font-bold text-[var(--text-primary)] mb-4">{t.orders} · {t.period}</h3>
            <table className="w-full text-right">
              <thead className="border-b border-[var(--border-color)] text-[var(--text-secondary)] text-sm">
                <tr>
                  <th className="pb-2">#</th>
                  <th className="pb-2">{t.orders}</th>
                  <th className="pb-2">{content.ar.course}</th>
                  <th className="pb-2">{t.total}</th>
                  <th className="pb-2">{t.period}</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-[var(--border-color)]/50">
                    <td className="py-3 px-2 text-[var(--text-muted)]">{o.id}</td>
                    <td className="py-3 px-2 text-[var(--text-primary)]">{o.student}</td>
                    <td className="py-3 px-2 text-[var(--text-secondary)]">{o.course}</td>
                    <td className="py-3 px-2 text-[var(--text-primary)]">{o.amount}</td>
                    <td className="py-3 px-2 text-[var(--text-muted)]">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
