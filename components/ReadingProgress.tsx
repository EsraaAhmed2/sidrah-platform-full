"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setPct(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 h-1 bg-sidrah-500 z-[150] origin-right"
      style={{ scaleX: pct / 100 }}
      aria-hidden
    />
  );
}
