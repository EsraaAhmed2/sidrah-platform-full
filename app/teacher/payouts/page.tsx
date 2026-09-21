"use client";
import { useState } from "react";
import { DollarSign, Wallet, ArrowDown, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import RoleGuard from "@/components/RoleGuard";

const content = {
  ar: {
    title: "الإيرادات والمستحقات",
    subtitle: "تتبّع أرباحك، طلبات السحب، والمستحقات المالية",
    balance: "الرصيد المتاح",
    total: "إجمالي الأرباح",
    pending: "مستحق معلّق",
    withdrawn: "تم سحبه",
    withdraw: "طلب سحب",
    method: "طريقة الدفع",
    history: "سجل السحوبات",
    date: "التاريخ",
    amount: "المبلغ",
    status: "الحالة",
    completed: "مكتمل",
    pendingS: "قيد المعالجة",
    amountError: "أدخل مبلغ صحيح أكبر من صفر",
    balanceError: "المبلغ أكبر من الرصيد المتاح",
    requestSent: "تم إرسال طلب السحب بنجاح",
  },
  en: {
    title: "Revenue & Payouts",
    subtitle: "Track your earnings, withdrawal requests and pending balances",
    balance: "Available balance",
    total: "Total earnings",
    pending: "Pending balance",
    withdrawn: "Withdrawn",
    withdraw: "Request payout",
    method: "Payment method",
    history: "Payout history",
    date: "Date",
    amount: "Amount",
    status: "Status",
    completed: "Completed",
    pendingS: "Processing",
    amountError: "Enter a valid amount greater than zero",
    balanceError: "Amount exceeds available balance",
    requestSent: "Withdrawal request submitted successfully",
  },
};

export default function TeacherPayouts() {
  const { lang } = useLang();
  const { user } = useAuth();
  const t = content[lang];
  const [method, setMethod] = useState("Vodafone Cash");
  const [amount, setAmount] = useState(240);

  const withdraw = () => {
    const balance = 1240;
    if (!amount || amount <= 0) {
      toast.error(t.amountError);
      return;
    }
    if (amount > balance) {
      toast.error(t.balanceError);
      return;
    }
    toast.success(t.requestSent);
  };

  const stats = [
    { label: t.balance, value: "$1,240", icon: Wallet, color: "text-green-400" },
    { label: t.total, value: "$4,850", icon: TrendingUp, color: "text-sidrah-400" },
    { label: t.pending, value: "$320", icon: DollarSign, color: "text-yellow-400" },
    { label: t.withdrawn, value: "$2,930", icon: ArrowDown, color: "text-purple-400" },
  ];

  const history = [
    { id: 1, date: "2026-08-15", amount: "$300", status: "completed" },
    { id: 2, date: "2026-07-12", amount: "$450", status: "completed" },
    { id: 3, date: "2026-09-05", amount: "$320", status: "pending" },
  ];

  return (
    <RoleGuard roles={["teacher", "admin"]}>
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

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="card lg:col-span-1">
              <h3 className="font-bold text-[var(--text-primary)] mb-4">{t.withdraw}</h3>
              <div className="space-y-3">
                <input value={method} onChange={(e) => setMethod(e.target.value)} className="input-field" />
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="input-field" />
                <button className="btn-primary w-full" onClick={withdraw}>{t.withdraw}</button>
              </div>
            </div>

            <div className="card lg:col-span-2">
              <h3 className="font-bold text-[var(--text-primary)] mb-4">{t.history}</h3>
              <table className="w-full text-right">
                <thead className="border-b border-[var(--border-color)] text-[var(--text-secondary)] text-sm">
                  <tr>
                    <th className="pb-2">{t.date}</th>
                    <th className="pb-2">{t.amount}</th>
                    <th className="pb-2">{t.status}</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {history.map((h) => (
                    <tr key={h.id} className="border-b border-[var(--border-color)]/50">
                      <td className="py-3 text-[var(--text-primary)]">{h.date}</td>
                      <td className="py-3 text-[var(--text-primary)]">{h.amount}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-0.5 rounded ${h.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                          {h.status === "completed" ? t.completed : t.pendingS}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
