"use client";
import { Trophy, Medal, Flame, TrendingUp } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

const leaders = [
  { rank: 1, name: "أحمد خالد", xp: 12450, streak: 21, courses: 8 },
  { rank: 2, name: "سارة أحمد", xp: 11800, streak: 15, courses: 7 },
  { rank: 3, name: "محمد علي", xp: 10920, streak: 18, courses: 6 },
  { rank: 4, name: "نورا سامي", xp: 9840, streak: 12, courses: 6 },
  { rank: 5, name: "خالد محمود", xp: 9210, streak: 9, courses: 5 },
  { rank: 6, name: "ليلى حسن", xp: 8650, streak: 14, courses: 5 },
  { rank: 7, name: "عمر إبراهيم", xp: 7980, streak: 7, courses: 4 },
  { rank: 8, name: "فاطمة يوسف", xp: 7420, streak: 11, courses: 4 },
  { rank: 9, name: "حسن عبدالله", xp: 6800, streak: 5, courses: 3 },
  { rank: 10, name: "مريم سعيد", xp: 6150, streak: 8, courses: 3 },
];

const medalColors = ["text-yellow-400", "text-gray-300", "text-amber-600"];

export default function LeaderboardPage() {
  const { t } = useLang();
  const top3 = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("lb.breadcrumb") }]} />
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trophy className="text-yellow-400" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{t("lb.title")}</h1>
          <p className="text-[var(--text-secondary)]">{t("lb.subtitle")}</p>
        </div>

        {/* Podium */}
        <div className="grid grid-cols-3 gap-4 mb-10 items-end">
          {[top3[1], top3[0], top3[2]].map((l, i) => {
            const actualRank = i === 0 ? 2 : i === 1 ? 1 : 3;
            return (
              <motion.div
                key={l.rank}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className={`card text-center ${actualRank === 1 ? "border-yellow-500/40 py-8" : "py-6"}`}
              >
                <Medal size={32} className={`mx-auto mb-3 ${medalColors[actualRank - 1]}`} />
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-sidrah-600 to-purple-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3 ${actualRank === 1 ? "w-16 h-16 ring-4 ring-yellow-500/30" : ""}`}>
                  {l.name[0]}
                </div>
                <h3 className="text-[var(--text-primary)] font-bold">{l.name}</h3>
                <p className="text-yellow-400 font-bold text-lg">{l.xp.toLocaleString()} XP</p>
              </motion.div>
            );
          })}
        </div>

        {/* List */}
        <div className="card !p-0 overflow-hidden">
          {rest.map((l, i) => (
            <motion.div
              key={l.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex items-center gap-4 px-6 py-4 border-b border-[var(--border-color)]/50 last:border-0 hover:bg-[var(--bg-primary)] transition-colors"
            >
              <span className="text-[var(--text-muted)] font-bold w-8 text-center">{l.rank}</span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sidrah-700 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                {l.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[var(--text-primary)] font-medium text-sm">{l.name}</p>
                <p className="text-[var(--text-muted)] text-xs">{l.courses} {t("lb.completed")}</p>
              </div>
              <span className="flex items-center gap-1 text-orange-400 text-sm">
                <Flame size={16} /> {l.streak}
              </span>
              <span className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                <TrendingUp size={16} /> {l.xp.toLocaleString()} XP
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
