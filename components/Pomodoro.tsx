"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const DURATIONS = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };

export default function Pomodoro() {
  const { t } = useLang();
  const [mode, setMode] = useState<keyof typeof DURATIONS>("focus");
  const [seconds, setSeconds] = useState(DURATIONS.focus);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!running) return;
    timer.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setRunning(false);
          new AudioContext().resume().then(() => {
            const ctx = new AudioContext();
            const o = ctx.createOscillator();
            o.frequency.value = 880;
            o.connect(ctx.destination);
            o.start();
            setTimeout(() => o.stop(), 300);
          }).catch(() => {});
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer.current);
  }, [running]);

  const switchMode = (m: keyof typeof DURATIONS) => {
    setMode(m);
    setSeconds(DURATIONS[m]);
    setRunning(false);
  };

  const mm = Math.floor(seconds / 60);
  const ss = String(seconds % 60).padStart(2, "0");
  const pct = 1 - seconds / DURATIONS[mode];

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Timer className="text-sidrah-400" size={18} />
        <h3 className="text-lg font-bold text-white">{t("pomo.title")}</h3>
      </div>

      <div className="flex gap-2 mb-5">
        {([
          ["focus", t("pomo.focus")],
          ["short", t("pomo.short")],
          ["long", t("pomo.long")],
        ] as const).map(([m, label]) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`flex-1 text-xs py-1.5 rounded-lg transition-colors ${
              mode === m ? "bg-sidrah-600 text-white" : "bg-dark-700 text-gray-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative w-32 h-32 mx-auto mb-5">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--border-color)" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="44" fill="none"
            stroke="#0ea5e9" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={`${pct * 276.5} 276.5`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white font-mono" dir="ltr">
            {mm}:{ss}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setRunning(!running)}
          className="btn-primary flex-1 flex items-center justify-center gap-2 !py-2"
        >
          {running ? <Pause size={16} /> : <Play size={16} />}
          {running ? t("pomo.pause") : t("pomo.start")}
        </button>
        <button
          onClick={() => switchMode(mode)}
          className="btn-secondary !py-2 !px-3"
          aria-label={t("pomo.reset")}
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
