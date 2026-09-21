"use client";
import { Building2, Users, Mail, Globe, Award } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const content = {
  ar: {
    title: "ملف الجهة التعليمية",
    subtitle: "نموذج عرض لملف منظمة موثّقة",
    name: "أكاديمية سدرة التقنية",
    bio: "جهة تعليمية متخصصة في التقنية والبرمجة، توفر مسارات وكورسات معتمدة للطلاب والمطورين.",
    members: "أعضاء الفريق",
    courses: "كورسات الجهة",
    contact: "تواصل",
    website: "الموقع",
    verified: "موثّقة",
  },
  en: {
    title: "Organization Profile",
    subtitle: "Example of a verified education organization",
    name: "Sidrah Tech Academy",
    bio: "An educational organization specializing in technology and programming, providing certified paths and courses for students and developers.",
    members: "Team members",
    courses: "Organization courses",
    contact: "Contact",
    website: "Website",
    verified: "Verified",
  },
};

export default function OrganizationPage() {
  const { lang } = useLang();
  const t = content[lang];

  const members = [
    { name: "Ahmed Salah", role: lang === "ar" ? "مدير المحتوى" : "Content Lead" },
    { name: "Sara Ahmed", role: lang === "ar" ? "مدرس Full Stack" : "Full Stack Instructor" },
    { name: "Omar Farouk", role: lang === "ar" ? "مدرس AI" : "AI Instructor" },
  ];

  const courses = ["React.js - Front-End", "Full Stack Web Dev", "AI & Machine Learning"];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-sidrah-600/20 flex items-center justify-center text-3xl">🏫</div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t.name}</h1>
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><Award size={12} /> {t.verified}</span>
              </div>
              <p className="text-[var(--text-secondary)] mt-2">{t.bio}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="card">
            <h3 className="font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2"><Users size={18} /> {t.members}</h3>
            <div className="space-y-3">
              {members.map((m) => (
                <div key={m.name} className="flex justify-between p-3 rounded-lg bg-[var(--bg-primary)]">
                  <span className="text-[var(--text-primary)]">{m.name}</span>
                  <span className="text-[var(--text-secondary)] text-sm">{m.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2"><Building2 size={18} /> {t.courses}</h3>
            <div className="space-y-2">
              {courses.map((c) => (
                <div key={c} className="p-3 rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm">{c}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="card flex flex-wrap gap-6">
          <div className="flex items-center gap-2 text-[var(--text-secondary)]"><Mail size={18} /> {t.contact}: academy@sidrah.com</div>
          <div className="flex items-center gap-2 text-[var(--text-secondary)]"><Globe size={18} /> {t.website}: sidrah-academy.com</div>
        </div>
      </div>
    </div>
  );
}
