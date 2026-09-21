"use client";
import { useState } from "react";
import { Gem, Check, Users, Building } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/context/LanguageContext";
import RoleGuard from "@/components/RoleGuard";

const content = {
  ar: {
    title: "خطط الاشتراك",
    subtitle: "إدارة خطط الطلاب والمدرسين والجهات",
    name: "اسم الخطة",
    price: "السعر",
    audience: "الجمهور",
    save: "حفظ الخطط",
    saved: "تم حفظ الخطط (محاكاة)",
    features: "المميزات",
    add: "إضافة خطة",
  },
  en: {
    title: "Subscription Plans",
    subtitle: "Manage plans for students, instructors and organizations",
    name: "Plan name",
    price: "Price",
    audience: "Audience",
    save: "Save plans",
    saved: "Plans saved (simulation)",
    features: "Features",
    add: "Add plan",
  },
};

const defaultPlans = [
  { id: 1, name: "Student Free", price: "$0", audience: "student", features: "Free courses" },
  { id: 2, name: "Pro Monthly", price: "$19/mo", audience: "student", features: "All courses" },
  { id: 3, name: "Teacher Basic", price: "$49/mo", audience: "teacher", features: "5 courses" },
];

export default function AdminPlans() {
  const { lang } = useLang();
  const t = content[lang];
  const [plans, setPlans] = useState(defaultPlans);

  const save = () => {
    localStorage.setItem("sidrah-plans", JSON.stringify(plans));
    toast.success(t.saved);
  };

  const add = () => {
    setPlans([...plans, { id: plans.length + 1, name: t.name + " " + (plans.length + 1), price: "$0", audience: "student", features: "" }]);
  };

  return (
    <RoleGuard roles={["admin"]}>
      <div className="min-h-screen bg-[var(--bg-primary)] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t.title}</h1>
            <p className="text-[var(--text-secondary)]">{t.subtitle}</p>
          </div>

          <div className="card space-y-4">
            {plans.map((p, i) => (
              <div key={p.id} className="grid md:grid-cols-4 gap-3 p-3 rounded-lg bg-[var(--bg-primary)] items-center">
                <input value={p.name} onChange={(e) => { const np = [...plans]; np[i].name = e.target.value; setPlans(np); }} className="input-field" />
                <input value={p.price} onChange={(e) => { const np = [...plans]; np[i].price = e.target.value; setPlans(np); }} className="input-field" />
                <select value={p.audience} onChange={(e) => { const np = [...plans]; np[i].audience = e.target.value; setPlans(np); }} className="input-field">
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="organization">Organization</option>
                </select>
                <input value={p.features} onChange={(e) => { const np = [...plans]; np[i].features = e.target.value; setPlans(np); }} className="input-field" placeholder={t.features} />
              </div>
            ))}
            <div className="flex gap-3">
              <button onClick={add} className="btn-secondary flex items-center gap-2"><Gem size={18} /> {t.add}</button>
              <button onClick={save} className="btn-primary flex items-center gap-2"><Check size={18} /> {t.save}</button>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
