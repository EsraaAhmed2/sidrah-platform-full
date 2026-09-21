"use client";
import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function OfflineBanner() {
  const { t } = useLang();
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    setOffline(!navigator.onLine);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return (
    <AnimatePresence>
      {offline && (
        <motion.div
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          exit={{ y: -60 }}
          className="fixed top-0 left-0 right-0 z-[200] bg-red-500 text-white text-center text-sm py-2 flex items-center justify-center gap-2"
          role="alert"
        >
          <WifiOff size={16} />
          {t("offline.text")}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
