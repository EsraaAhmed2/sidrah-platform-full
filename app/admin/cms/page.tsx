"use client";
import { useState } from "react";
import { FileText, HelpCircle, Megaphone, Globe } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/context/LanguageContext";
import RoleGuard from "@/components/RoleGuard";

const content = {
  ar: {
    title: "إدارة المحتوى (CMS)",
    subtitle: "صفحات ثابتة، FAQ، إعلان، وروابط التواصل",
    faq: "أسئلة شائعة",
    promo: "نص شريط الإعلان",
    links: "روابط التواصل",
    save: "حفظ التغييرات",
    saved: "تم حفظ الإعدادات (محاكاة)",
    sections: "القسم",
    contacts: "روابط التواصل",
  },
  en: {
    title: "Content Management (CMS)",
    subtitle: "Static pages, FAQ, promo bar and contact links",
    faq: "FAQ content",
    promo: "Promo bar text",
    links: "Contact links",
    save: "Save changes",
    saved: "Settings saved (simulation)",
    sections: "Section",
    contacts: "Contact links",
  },
};

export default function CMSPage() {
  const { lang } = useLang();
  const t = content[lang];
  const [faq, setFaq] = useState("");
  const [promo, setPromo] = useState("");
  const [contact, setContact] = useState("");

  const save = () => {
    localStorage.setItem("sidrah-cms", JSON.stringify({ faq, promo, contact }));
    toast.success(t.saved);
  };

  return (
    <RoleGuard roles={["admin"]}>
      <div className="min-h-screen bg-[var(--bg-primary)] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t.title}</h1>
            <p className="text-[var(--text-secondary)]">{t.subtitle}</p>
          </div>

          <div className="card space-y-6">
            <div>
              <label className="flex items-center gap-2 text-[var(--text-primary)] font-medium mb-2"><HelpCircle size={18} /> {t.faq}</label>
              <textarea className="input-field min-h-[120px]" value={faq} onChange={(e) => setFaq(e.target.value)} placeholder="JSON / markdown" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-[var(--text-primary)] font-medium mb-2"><Megaphone size={18} /> {t.promo}</label>
              <input className="input-field" value={promo} onChange={(e) => setPromo(e.target.value)} />
            </div>
            <div>
              <label className="flex items-center gap-2 text-[var(--text-primary)] font-medium mb-2"><Globe size={18} /> {t.links}</label>
              <input className="input-field" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="https://..." />
            </div>
            <button onClick={save} className="btn-primary flex items-center gap-2">
              <FileText size={18} />
              {t.save}
            </button>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
