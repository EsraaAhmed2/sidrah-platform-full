"use client";
import { useState } from "react";
import Link from "next/link";
import { Trash2, ShoppingCart, Tag, TicketPercent } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { getCourseById } from "@/lib/courses-data";
import Breadcrumbs from "@/components/Breadcrumbs";
import CourseCover from "@/components/CourseCover";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function CartPage() {
  const { t } = useLang();
  const { items, remove, clear } = useCart();
  const courses = items.map((id) => getCourseById(id)).filter(Boolean);
  const total = courses.reduce((sum, c) => sum + (c?.price ?? 0), 0);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<{ code: string; pct: number } | null>(null);

  const coupons: Record<string, number> = { SIDRAH50: 50, WELCOME20: 20, STUDENT10: 10 };
  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (coupons[code]) {
      setApplied({ code, pct: coupons[code] });
      toast.success(`${t("cart.couponApplied")} ${code} — ${t("cart.discount")} ${coupons[code]}% 🎉`);
    } else {
      toast.error(t("cart.couponInvalid"));
    }
  };

  const couponDiscount = applied ? Math.round(total * applied.pct / 100) : 0;
  const bundleDiscount = !applied && total > 80 ? Math.round(total * 0.1) : 0;
  const discount = couponDiscount || bundleDiscount;

  const checkout = () => {
    toast.success(t("cart.orderDone"));
    clear();
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("cart.title") }]} />
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
          <ShoppingCart size={26} className="text-sidrah-400" />
          {t("cart.title")}
        </h1>

        {courses.length === 0 ? (
          <div className="card text-center py-16">
            <ShoppingCart size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t("cart.emptyTitle")}</h2>
            <p className="text-[var(--text-secondary)] mb-6">{t("cart.emptyDesc")}</p>
            <Link href="/courses" className="btn-primary">{t("cart.browse")}</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {courses.map((course) => (
                  <motion.div
                    key={course!.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="card flex items-center gap-4 !p-4"
                  >
                    <div className="w-24 flex-shrink-0">
                      <CourseCover color={course!.color} title={course!.title} emoji={course!.emoji} className="!h-16" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/courses/${course!.id}`} className="text-[var(--text-primary)] font-semibold hover:text-sidrah-400 transition-colors line-clamp-1">
                        {course!.title}
                      </Link>
                      <p className="text-[var(--text-muted)] text-xs mt-1">{course!.instructor} • {course!.duration}</p>
                    </div>
                    <span className="text-lg font-bold text-[var(--text-primary)]">${course!.price}</span>
                    <button
                      onClick={() => remove(course!.id)}
                      className="p-2 text-[var(--text-muted)] hover:text-red-400 transition-colors"
                      aria-label={`${t("cart.remove")} ${course!.title}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="card h-fit sticky top-24">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t("cart.summary")}</h3>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>{t("cart.subtotal")} ({courses.length} {t("cart.courses")})</span>
                  <span>${total}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span className="flex items-center gap-1">
                      <Tag size={14} /> {applied ? `${t("cart.coupon")} ${applied.code} (${applied.pct}%)` : t("cart.bundle")}
                    </span>
                    <span>-${discount}</span>
                  </div>
                )}
                <div className="border-t border-[var(--border-color)] pt-3 flex justify-between font-bold text-lg text-[var(--text-primary)]">
                  <span>{t("cart.total")}</span>
                  <span>${total - discount}</span>
                </div>
              </div>
              {/* Coupon */}
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <TicketPercent size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                    placeholder={t("cart.couponPlaceholder")}
                    className="input-field !py-2 pr-9 text-sm"
                    aria-label={t("cart.couponAria")}
                  />
                </div>
                <button onClick={applyCoupon} className="btn-secondary !py-2 text-sm">{t("cart.apply")}</button>
              </div>
              <button onClick={checkout} className="w-full btn-primary mb-3">{t("cart.checkout")}</button>
              <Link href="/courses" className="block text-center text-sidrah-400 hover:text-sidrah-300 text-sm">
                {t("cart.continueShopping")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
