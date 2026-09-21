"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Lock, Check } from "lucide-react";
import {
  cardPaymentSchema,
  vodafonePaymentSchema,
  type CardPaymentForm,
  type VodafonePaymentForm,
} from "@/lib/schemas";
import { useLang } from "@/context/LanguageContext";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  price: number;
}

export default function PaymentModal({ isOpen, onClose, courseTitle, price }: PaymentModalProps) {
  const { t } = useLang();
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "vodafone">("card");

  const cardForm = useForm<CardPaymentForm>({ resolver: zodResolver(cardPaymentSchema) });
  const vodafoneForm = useForm<VodafonePaymentForm>({ resolver: zodResolver(vodafonePaymentSchema) });

  const handlePay = async () => {
    const valid =
      paymentMethod === "card"
        ? await cardForm.trigger()
        : await vodafoneForm.trigger();
    if (!valid) {
      toast.error(t("payment.validateError"));
      return;
    }
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      toast.success(t("payment.success"));
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStep("form"), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={t("payment.modalLabel")}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {step === "form" && (
              <>
                <div className="p-6 border-b border-[var(--border-color)]">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[var(--text-primary)]">{t("payment.title")}</h2>
                    <button
                      onClick={handleClose}
                      className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                      aria-label={t("payment.close")}
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm mt-1">{courseTitle}</p>
                </div>

                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-[var(--text-primary)]">${price}</div>
                    <p className="text-[var(--text-secondary)] text-sm">{t("payment.total")}</p>
                  </div>

                  <div className="flex gap-3 mb-6" role="radiogroup" aria-label={t("payment.method")}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      aria-pressed={paymentMethod === "card"}
                      className={`flex-1 p-3 rounded-xl border-2 text-center transition-colors ${
                        paymentMethod === "card" ? "border-sidrah-500 bg-sidrah-950/20" : "border-[var(--border-color)]"
                      }`}
                    >
                      <CreditCard className="w-6 h-6 mx-auto mb-1 text-[var(--text-secondary)]" />
                      <span className="text-[var(--text-primary)] text-sm">{t("payment.card")}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("vodafone")}
                      aria-pressed={paymentMethod === "vodafone"}
                      className={`flex-1 p-3 rounded-xl border-2 text-center transition-colors ${
                        paymentMethod === "vodafone" ? "border-sidrah-500 bg-sidrah-950/20" : "border-[var(--border-color)]"
                      }`}
                    >
                      <span className="text-2xl">📱</span>
                      <span className="block text-[var(--text-primary)] text-sm mt-1">{t("payment.vodafone")}</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {paymentMethod === "card" ? (
                      <>
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm text-[var(--text-secondary)] mb-2">{t("payment.cardNumber")}</label>
                          <div className="relative">
                            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                            <input
                              id="cardNumber"
                              type="text"
                              inputMode="numeric"
                              placeholder="1234 5678 9012 3456"
                              className="input-field pr-10"
                              dir="ltr"
                              {...cardForm.register("cardNumber")}
                            />
                          </div>
                          {cardForm.formState.errors.cardNumber && (
                            <p className="text-red-400 text-xs mt-1">{cardForm.formState.errors.cardNumber.message}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiry" className="block text-sm text-[var(--text-secondary)] mb-2">{t("payment.expiry")}</label>
                            <input id="expiry" type="text" placeholder="MM/YY" className="input-field" dir="ltr" {...cardForm.register("expiry")} />
                            {cardForm.formState.errors.expiry && (
                              <p className="text-red-400 text-xs mt-1">{cardForm.formState.errors.expiry.message}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm text-[var(--text-secondary)] mb-2">{t("payment.cvv")}</label>
                            <div className="relative">
                              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
                              <input id="cvv" type="text" inputMode="numeric" placeholder="123" className="input-field pr-10" dir="ltr" {...cardForm.register("cvv")} />
                            </div>
                            {cardForm.formState.errors.cvv && (
                              <p className="text-red-400 text-xs mt-1">{cardForm.formState.errors.cvv.message}</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="cardName" className="block text-sm text-[var(--text-secondary)] mb-2">{t("payment.cardName")}</label>
                          <input id="cardName" type="text" placeholder="AHMED KHALED" className="input-field" dir="ltr" {...cardForm.register("cardName")} />
                          {cardForm.formState.errors.cardName && (
                            <p className="text-red-400 text-xs mt-1">{cardForm.formState.errors.cardName.message}</p>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label htmlFor="phone" className="block text-sm text-[var(--text-secondary)] mb-2">{t("payment.phone")}</label>
                          <input id="phone" type="text" inputMode="numeric" placeholder="01XXXXXXXX" className="input-field" dir="ltr" {...vodafoneForm.register("phone")} />
                          {vodafoneForm.formState.errors.phone && (
                            <p className="text-red-400 text-xs mt-1">{vodafoneForm.formState.errors.phone.message}</p>
                          )}
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                          <p className="text-yellow-400 text-sm">{t("payment.vodafoneHint")}</p>
                        </div>
                      </>
                    )}

                    <button onClick={handlePay} className="w-full btn-primary flex items-center justify-center gap-2">
                      <Lock size={16} />
                      {t("payment.pay")} ${price}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-4 text-[var(--text-muted)] text-xs">
                    <Lock size={12} />
                    <span>{t("payment.secure")}</span>
                  </div>
                </div>
              </>
            )}

            {step === "processing" && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 border-4 border-sidrah-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t("payment.processing")}</h3>
                <p className="text-[var(--text-secondary)]">{t("payment.processingHint")}</p>
              </div>
            )}

            {step === "success" && (
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-8 h-8 text-green-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t("payment.successTitle")}</h3>
                <p className="text-[var(--text-secondary)] mb-6">{t("payment.successDesc")}</p>
                <button onClick={handleClose} className="btn-primary">{t("payment.startLearning")}</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
