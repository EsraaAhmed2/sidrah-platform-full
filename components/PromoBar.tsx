"use client";
import { useState, useEffect } from "react";
import { X, Tag } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function PromoBar() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("promo-dismissed")) setShow(true);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("promo-dismissed", "1");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gradient-to-r from-sidrah-600 to-purple-600 text-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 text-sm">
            <Tag size={15} />
            <span>🎉 {t("promo.text")} <strong>SIDRAH50</strong></span>
            <Link href="/courses" className="underline font-medium hover:text-white/80 whitespace-nowrap">
              {t("promo.shop")}
            </Link>
            <button onClick={dismiss} className="mr-auto text-white/70 hover:text-white" aria-label={t("promo.close")}>
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
