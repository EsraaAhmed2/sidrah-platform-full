"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Upload, FileText, Briefcase, GraduationCap } from "lucide-react";

const content = {
  ar: {
    title: "طلب الانضمام كمدرس",
    subtitle: "قدّم ملفك المهني للمراجعة والاعتماد",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    bio: "نبذة مهنية",
    experience: "سنوات الخبرة",
    expertise: "مجالات الخبرة",
    sample: "رابط نموذج عمل أو فيديو",
    plan: "خطة النشر المختارة",
    submit: "إرسال الطلب",
    saved: "تم استلام الطلب. سيتم المراجعة خلال 3-5 أيام عمل.",
  },
  en: {
    title: "Apply as Instructor",
    subtitle: "Submit your professional profile for review and approval",
    name: "Full name",
    email: "Email",
    phone: "Phone number",
    bio: "Professional bio",
    experience: "Years of experience",
    expertise: "Areas of expertise",
    sample: "Sample work or video URL",
    plan: "Selected publishing plan",
    submit: "Submit application",
    saved: "Application received. Review takes 3-5 business days.",
  },
};

export default function ApplyTeacherPage() {
  const { lang } = useLang();
  const { user } = useAuth();
  const router = useRouter();
  const t = content[lang];
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    bio: "",
    experience: "",
    expertise: "",
    sample: "",
    plan: "basic",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("sidrah-instructor-application", JSON.stringify({ ...form, status: "Under Review", submittedAt: new Date().toISOString() }));
    toast.success(t.saved);
    router.push("/teacher");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-sidrah-600/20 rounded-lg">
              <GraduationCap className="w-6 h-6 text-sidrah-400" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t.title}</h1>
          </div>
          <p className="text-[var(--text-secondary)]">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">{t.name}</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">{t.email}</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">{t.phone}</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">{t.experience}</label>
              <input type="number" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="input-field" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">{t.bio}</label>
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="input-field min-h-[100px]" required />
          </div>

          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">{t.expertise}</label>
            <input value={form.expertise} onChange={(e) => setForm({ ...form, expertise: e.target.value })} className="input-field" placeholder="React, Python, UI/UX" />
          </div>

          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">{t.sample}</label>
            <input value={form.sample} onChange={(e) => setForm({ ...form, sample: e.target.value })} className="input-field" />
          </div>

          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">{t.plan}</label>
            <select value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })} className="input-field">
              <option value="basic">Basic</option>
              <option value="pro">Pro</option>
              <option value="organization">Organization</option>
            </select>
          </div>

          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            <Upload size={18} />
            {t.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
