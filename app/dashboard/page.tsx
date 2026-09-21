"use client";
import Link from "next/link";
import { BookOpen, Award, Clock, TrendingUp, Play, Flame, Share2, Gift, Target } from "lucide-react";
import { toast } from "sonner";
import { ProgressLineChart } from "@/components/Charts";
import Pomodoro from "@/components/Pomodoro";
import { getAllCourses } from "@/lib/courses-data";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

const myCourses = [
  { id: 1, progress: 65, completedLessons: 26 },
  { id: 2, progress: 30, completedLessons: 10 },
  { id: 4, progress: 10, completedLessons: 3 },
];

const activityData = Array.from({ length: 84 }, (_, i) => {
  const seed = (i * 137) % 10;
  return seed < 4 ? 0 : seed < 6 ? 1 : seed < 8 ? 2 : 3;
});

const levelColors = ["bg-dark-700", "bg-sidrah-950", "bg-sidrah-800", "bg-sidrah-500"];

export default function DashboardPage() {
  const { t } = useLang();
  const { user } = useAuth();
  const weeklyProgress = [
    { name: t("dash.day.sat"), value: 45 },
    { name: t("dash.day.sun"), value: 60 },
    { name: t("dash.day.mon"), value: 30 },
    { name: t("dash.day.tue"), value: 80 },
    { name: t("dash.day.wed"), value: 55 },
    { name: t("dash.day.thu"), value: 95 },
    { name: t("dash.day.fri"), value: 40 },
  ];
  const stats = [
    { label: t("dash.stat.courses"), value: "5", icon: BookOpen, color: "text-blue-400" },
    { label: t("dash.stat.progress"), value: "48%", icon: TrendingUp, color: "text-green-400" },
    { label: t("dash.stat.certs"), value: "12", icon: Award, color: "text-yellow-400" },
    { label: t("dash.stat.hours"), value: "850", icon: Clock, color: "text-purple-400" },
  ];
  const badges = [
    { name: t("dash.badge1.name"), desc: t("dash.badge1.desc"), icon: "🔥" },
    { name: t("dash.badge2.name"), desc: t("dash.badge2.desc"), icon: "🎯" },
    { name: t("dash.badge3.name"), desc: t("dash.badge3.desc"), icon: "📅" },
  ];
  const allCourses = getAllCourses();
  const enrolledCourses = myCourses.map(mc => {
    const course = allCourses.find(c => c.id === mc.id);
    return course ? { ...course, ...mc } : null;
  }).filter(Boolean);

  return (
    <div className="min-h-screen bg-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">{t("dash.welcome").replace("{name}", user?.name || "Student")}</h1>
          <p className="text-gray-400">{t("dash.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="card text-center">
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">{t("dash.myCourses")}</h2>
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course!.id} className="card flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course!.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                    {course!.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold mb-1">{course!.title}</h3>
                    <div className="w-full bg-dark-700 rounded-full h-2 mb-2">
                      <div
                        className="bg-sidrah-500 h-2 rounded-full transition-all"
                        style={{ width: `${course!.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{course!.progress}% {t("dash.completed")}</span>
                      <span>{course!.completedLessons}/{course!.lessonsCount} {t("dash.lessons")}</span>
                    </div>
                  </div>
                  <Link
                    href={`/courses/${course!.id}/lesson/${course!.lessons[0]?.id || 1}`}
                    className="btn-primary flex items-center gap-2 flex-shrink-0 text-sm"
                  >
                    <Play size={16} />
                    {t("dash.continue")}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="text-orange-400" size={20} />
                <h3 className="text-lg font-bold text-white">{t("dash.weekActivity")}</h3>
                <span className="mr-auto text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">{t("dash.streak")}</span>
              </div>
              <ProgressLineChart data={weeklyProgress} />
              <p className="text-gray-500 text-xs text-center mt-2">{t("dash.minutesDaily")}</p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4">{t("dash.achievements")}</h3>
              <div className="space-y-3">
                {badges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-dark-700/50">
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <div className="text-white text-sm font-medium">{badge.name}</div>
                      <div className="text-gray-500 text-xs">{badge.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Share2 size={18} className="text-sidrah-400" /> {t("dash.shareTitle")}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{t("dash.shareDesc")}</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(t("dash.shareText"));
                  toast.success(t("dash.shareCopied"));
                }}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <Share2 size={16} /> {t("dash.copyShare")}
              </button>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="text-yellow-400" size={18} />
                <h3 className="text-lg font-bold text-white">{t("dash.level")}</h3>
                <span className="mr-auto text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">{t("dash.levelN")}</span>
              </div>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-bold text-white">4,350<span className="text-sm text-gray-400"> XP</span></span>
                <span className="text-gray-400 text-xs">{t("dash.xpRemaining")}</span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-500 to-amber-400 h-2 rounded-full" style={{ width: "87%" }} />
              </div>
              <p className="text-gray-500 text-xs mt-3">{t("dash.xpHint")}</p>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Target className="text-green-400" size={18} />
                <h3 className="text-lg font-bold text-white">{t("dash.dailyGoal")}</h3>
              </div>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-bold text-white">22<span className="text-sm text-gray-400">/30 {t("dash.min")}</span></span>
                <span className="text-green-400 text-sm">73%</span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full" style={{ width: "73%" }} />
              </div>
              <p className="text-gray-500 text-xs mt-3">{t("dash.minRemaining")}</p>
            </div>

            <Pomodoro />

            <div className="card bg-gradient-to-br from-sidrah-950/50 to-purple-950/30 border-sidrah-800/40">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Gift size={18} className="text-yellow-400" /> {t("dash.invite")}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{t("dash.inviteDesc")}</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("https://sidrah.com/join?ref=ahmed123");
                  toast.success(t("dash.inviteCopied"));
                }}
                className="btn-primary w-full flex items-center justify-center gap-2 !bg-yellow-500 hover:!bg-yellow-600 !text-dark-900"
              >
                <Gift size={16} /> {t("dash.copyInvite")}
              </button>
            </div>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="card mt-8">
          <h3 className="text-lg font-bold text-white mb-4">{t("dash.heatmap")}</h3>
          <div className="grid grid-rows-7 grid-flow-col gap-1 w-fit mx-auto" dir="ltr">
            {activityData.map((level, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm ${levelColors[level]}`}
                title={`${t("dash.activity")} ${level === 0 ? t("dash.none") : level}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 justify-center mt-4 text-xs text-gray-500">
            <span>{t("dash.less")}</span>
            {levelColors.map((c, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
            ))}
            <span>{t("dash.more")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
