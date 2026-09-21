"use client";
import { useEffect, useState } from "react";
import { Radio, Calendar, Users, Clock, Bell } from "lucide-react";
import { toast } from "sonner";
import Breadcrumbs from "@/components/Breadcrumbs";
import { StaggerContainer, StaggerItem } from "@/components/Motion";
import { useLang } from "@/context/LanguageContext";

function Countdown({ target }: { target: number }) {
  const { t } = useLang();
  const [left, setLeft] = useState(target - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(target - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  if (left <= 0) return <span className="text-green-400 font-bold">{t("live.started")}</span>;
  const h = Math.floor(left / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const s = Math.floor((left % 60000) / 1000);
  return (
    <span className="font-mono text-sidrah-300" dir="ltr">
      {h > 0 && `${h}h `}{m}m {s}s
    </span>
  );
}

export default function LivePage() {
  const { t, lang } = useLang();
  const sessions = [
    {
      id: 1,
      title: t("live.s1.title"),
      instructor: "Ahmed Salah",
      date: Date.now() + 2 * 60 * 60 * 1000,
      attendees: 340,
      live: false,
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: 2,
      title: t("live.s2.title"),
      instructor: "Sara Ahmed",
      date: Date.now() + 24 * 60 * 60 * 1000,
      attendees: 520,
      live: false,
      color: "from-purple-500 to-pink-400",
    },
    {
      id: 3,
      title: t("live.s3.title"),
      instructor: "Mohamed Ali",
      date: Date.now() - 30 * 60 * 1000,
      attendees: 890,
      live: true,
      color: "from-green-500 to-emerald-400",
    },
  ];
  const [reminded, setReminded] = useState<Record<number, boolean>>({});

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: t("live.breadcrumb") }]} />
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Radio className="text-red-400 animate-pulse" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-3">{t("live.title")}</h1>
          <p className="text-[var(--text-secondary)]">{t("live.subtitle")}</p>
        </div>

        <StaggerContainer className="space-y-4">
          {sessions.map((s) => (
            <StaggerItem
              key={s.id}
              className={`card flex flex-col md:flex-row md:items-center gap-5 ${s.live ? "border-red-500/40" : ""}`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0`}>
                <Radio className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-[var(--text-primary)] font-bold">{s.title}</h2>
                  {s.live && (
                    <span className="flex items-center gap-1 text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" /> LIVE
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-[var(--text-muted)]">
                  <span>{s.instructor}</span>
                  <span className="flex items-center gap-1"><Users size={13} /> {s.attendees} {t("live.interested")}</span>
                  <span className="flex items-center gap-1"><Calendar size={13} /> {new Date(s.date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {new Date(s.date).toLocaleTimeString(lang === "ar" ? "ar-EG" : "en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {!s.live && <Countdown target={s.date} />}
                {s.live ? (
                  <button
                    onClick={() => {
                      window.open(`https://meet.jit.si/sidrah-live-${s.id}`, "_blank");
                      toast.success(t("live.joined"));
                    }}
                    className="btn-primary !bg-red-500 hover:!bg-red-600 flex items-center gap-2"
                  >
                    <Radio size={16} /> {t("live.join")}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setReminded((r) => ({ ...r, [s.id]: !r[s.id] }));
                      toast.success(reminded[s.id] ? t("live.remindOff") : t("live.remindOn"));
                    }}
                    className={`flex items-center gap-2 rounded-lg font-medium px-5 py-2.5 text-sm border transition-all ${
                      reminded[s.id]
                        ? "bg-sidrah-950/40 text-sidrah-400 border-sidrah-800/40"
                        : "btn-secondary"
                    }`}
                  >
                    <Bell size={16} /> {reminded[s.id] ? t("live.reminded") : t("live.remindMe")}
                  </button>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
