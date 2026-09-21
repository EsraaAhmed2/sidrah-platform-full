"use client";
import { useState } from "react";
import { Bell, CheckCheck, BookOpen, Award, Tag, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import Breadcrumbs from "@/components/Breadcrumbs";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

const iconMap = {
  course: BookOpen,
  achievement: Award,
  offer: Tag,
  comment: MessageSquare,
};

export default function NotificationsPage() {
  const { t } = useLang();
  const initialNotifs = [
    { id: 1, type: "course" as const, text: t("notifs.n1"), time: t("notifs.t1"), unread: true },
    { id: 2, type: "achievement" as const, text: t("notifs.n2"), time: t("notifs.t2"), unread: true },
    { id: 3, type: "comment" as const, text: t("notifs.n3"), time: t("notifs.t3"), unread: true },
    { id: 4, type: "offer" as const, text: t("notifs.n4"), time: t("notifs.t4"), unread: false },
    { id: 5, type: "course" as const, text: t("notifs.n5"), time: t("notifs.t5"), unread: false },
    { id: 6, type: "achievement" as const, text: t("notifs.n6"), time: t("notifs.t6"), unread: false },
  ];
  const [notifs, setNotifs] = useState(initialNotifs);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const shown = filter === "unread" ? notifs.filter((n) => n.unread) : notifs;
  const unreadCount = notifs.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifs((n) => n.map((x) => ({ ...x, unread: false })));
    toast.success(t("notifs.marked"));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("notifs.title") }]} />
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3">
            <Bell className="text-sidrah-400" size={26} />
            {t("notifs.title")}
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount} {t("notifs.new")}</span>
            )}
          </h1>
          <button onClick={markAllRead} className="text-sidrah-400 hover:text-sidrah-300 text-sm flex items-center gap-1">
            <CheckCheck size={16} /> {t("notifs.markAll")}
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === f
                  ? "bg-sidrah-600 text-white"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
              }`}
            >
              {f === "all" ? t("notifs.all") : t("notifs.unread")}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {shown.map((n, i) => {
            const Icon = iconMap[n.type];
            return (
              <motion.button
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * i }}
                onClick={() => setNotifs((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))}
                className={`w-full flex items-start gap-4 p-4 rounded-xl border text-right transition-colors ${
                  n.unread
                    ? "bg-sidrah-950/20 border-sidrah-800/40"
                    : "bg-[var(--bg-secondary)] border-[var(--border-color)]"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  n.unread ? "bg-sidrah-600/30 text-sidrah-300" : "bg-[var(--bg-primary)] text-[var(--text-muted)]"
                }`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${n.unread ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-secondary)]"}`}>
                    {n.text}
                  </p>
                  <p className="text-[var(--text-muted)] text-xs mt-1">{n.time}</p>
                </div>
                {n.unread && <span className="w-2 h-2 bg-sidrah-400 rounded-full mt-2 flex-shrink-0" />}
              </motion.button>
            );
          })}
          {shown.length === 0 && (
            <div className="card text-center py-12">
              <Bell size={40} className="text-[var(--text-muted)] mx-auto mb-3" />
              <p className="text-[var(--text-secondary)]">{t("notifs.empty")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
