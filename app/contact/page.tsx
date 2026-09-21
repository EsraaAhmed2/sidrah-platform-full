"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { contactSchema, type ContactForm } from "@/lib/schemas";
import { ScrollReveal } from "@/components/Motion";
import { useLang } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLang();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    await new Promise((r) => setTimeout(r, 900));
    toast.success(t("contact.toastSuccess"));
    reset();
  };

  return (
    <div className="min-h-screen bg-dark-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">{t("contact.title")}</h1>
          <p className="text-gray-400">{t("contact.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-white mb-6">{t("contact.infoTitle")}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sidrah-950/50 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-sidrah-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{t("contact.emailLabel")}</h3>
                  <p className="text-gray-400 text-sm">support@sidrah.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sidrah-950/50 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-sidrah-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{t("contact.phoneLabel")}</h3>
                  <p className="text-gray-400 text-sm" dir="ltr">+20 10 27285487</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sidrah-950/50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-sidrah-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{t("contact.addressLabel")}</h3>
                  <p className="text-gray-400 text-sm">{t("contact.addressValue")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-sidrah-950/50 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-sidrah-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{t("contact.hoursLabel")}</h3>
                  <p className="text-gray-400 text-sm">{t("contact.hoursDays")}<br />{t("contact.hoursTime")}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6">{t("contact.formTitle")}</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-300 mb-2">{t("contact.name")}</label>
                  <input id="name" type="text" placeholder={t("contact.namePlaceholder")} className="input-field" aria-invalid={!!errors.name} {...register("name")} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-300 mb-2">{t("contact.email")}</label>
                  <input id="email" type="email" placeholder={t("contact.emailPlaceholder")} className="input-field" aria-invalid={!!errors.email} {...register("email")} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm text-gray-300 mb-2">{t("contact.subject")}</label>
                  <select id="subject" className="input-field" aria-invalid={!!errors.subject} {...register("subject")}>
                    <option value="">{t("contact.subjectPlaceholder")}</option>
                    <option value="استفسار عام">{t("contact.subjectGeneral")}</option>
                    <option value="مشكلة تقنية">{t("contact.subjectTech")}</option>
                    <option value="اقتراح">{t("contact.subjectSuggestion")}</option>
                    <option value="شكوى">{t("contact.subjectComplaint")}</option>
                  </select>
                  {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-300 mb-2">{t("contact.message")}</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder={t("contact.messagePlaceholder")}
                    className="input-field resize-none"
                    aria-invalid={!!errors.message}
                    {...register("message")}
                  ></textarea>
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {t("contact.submit")}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
