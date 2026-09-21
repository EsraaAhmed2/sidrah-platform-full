"use client";
import { useState } from "react";
import { QrCode, Search, CheckCircle, XCircle } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const content = {
  ar: {
    title: "التحقق من الشهادة",
    subtitle: "أدخل رقم الشهادة أو امسح الـ QR للتحقق",
    placeholder: "أدخل رقم الشهادة (مثلاً: SID-2026-...)",
    verify: "تحقق",
    valid: "شهادة صحيحة ومفعّلة",
    invalid: "رقم غير صحيح",
    holder: "الحاصل عليها",
    course: "الكورس",
    issued: "تاريخ الإصدار",
    status: "الحالة",
  },
  en: {
    title: "Certificate Verification",
    subtitle: "Enter the certificate ID or scan QR to verify",
    placeholder: "Enter certificate ID (e.g. SID-2026-...)",
    verify: "Verify",
    valid: "Certificate is valid and active",
    invalid: "Invalid certificate number",
    holder: "Recipient",
    course: "Course",
    issued: "Issue date",
    status: "Status",
  },
};

const data: Record<string, any> = {
  "SID-2026-001-REACT-AHMED": {
    holder: "Ahmed Mohamed",
    course: "React.js - تطوير واجهات المستخدم",
    issued: "2026-09-01",
    status: "Active",
  },
};

export default function VerifyPage() {
  const { lang } = useLang();
  const t = content[lang];
  const [id, setId] = useState("");
  const [result, setResult] = useState<null | { valid: boolean; data?: any }>(null);

  const verify = () => {
    const found = data[id.toUpperCase().trim()];
    setResult(found ? { valid: true, data: found } : { valid: false });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card text-center mb-6">
          <div className="w-16 h-16 bg-sidrah-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-8 h-8 text-sidrah-400" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t.title}</h1>
          <p className="text-[var(--text-secondary)]">{t.subtitle}</p>
        </div>

        <div className="card flex gap-2 mb-6">
          <input value={id} onChange={(e) => setId(e.target.value)} className="input-field flex-1" placeholder={t.placeholder} />
          <button onClick={verify} className="btn-primary flex items-center gap-2"><Search size={18} /> {t.verify}</button>
        </div>

        {result && (
          <div className={`card ${result.valid ? "border-green-500/30" : "border-red-500/30"}`}>
            <div className="flex items-center gap-2 mb-4">
              {result.valid ? <CheckCircle className="text-green-400" /> : <XCircle className="text-red-400" />}
              <h2 className="text-lg font-bold text-[var(--text-primary)]">{result.valid ? t.valid : t.invalid}</h2>
            </div>
            {result.valid && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">{t.holder}</span><span className="text-[var(--text-primary)]">{result.data.holder}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">{t.course}</span><span className="text-[var(--text-primary)]">{result.data.course}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">{t.issued}</span><span className="text-[var(--text-primary)]">{result.data.issued}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">{t.status}</span><span className="text-green-400">{result.data.status}</span></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
