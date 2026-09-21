"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function NewsletterForm() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    setEmail("");
    toast.success(t("nl.toast"));
  };

  if (done) {
    return (
      <p className="text-green-400 font-medium py-4">{t("nl.success")}</p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("nl.placeholder")}
        className="input-field flex-1"
        aria-label={t("nl.aria")}
      />
      <button type="submit" className="btn-primary whitespace-nowrap flex items-center justify-center gap-2">
        <Send size={16} /> {t("nl.button")}
      </button>
    </form>
  );
}
