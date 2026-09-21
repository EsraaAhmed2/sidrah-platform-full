"use client";
import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward, Gauge, Moon } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const DEMO_SRC =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export interface Chapter {
  time: number;
  label: string;
}

interface VideoPlayerProps {
  src?: string;
  title?: string;
  chapters?: Chapter[];
  onEnded?: () => void;
  onCinemaToggle?: (on: boolean) => void;
}

function fmt(sec: number) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function VideoPlayer({ src = DEMO_SRC, title, chapters = [], onEnded, onCinemaToggle }: VideoPlayerProps) {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [cinema, setCinema] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  const v = () => videoRef.current!;

  const togglePlay = () => {
    playing ? v().pause() : v().play();
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v().currentTime = pct * duration;
  };

  const cycleSpeed = () => {
    const speeds = [0.5, 1, 1.25, 1.5, 2];
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);
    v().playbackRate = next;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) wrapRef.current?.requestFullscreen();
    else document.exitFullscreen();
  };

  const toggleCinema = () => {
    const next = !cinema;
    setCinema(next);
    onCinemaToggle?.(next);
    document.body.style.backgroundColor = next ? "#000" : "";
  };

  const wake = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => playing && setShowControls(false), 2500);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return;
      if (e.code === "Space") { e.preventDefault(); togglePlay(); }
      if (e.key === "ArrowLeft") v().currentTime += 10;
      if (e.key === "ArrowRight") v().currentTime -= 10;
      if (e.key === "f") toggleFullscreen();
      if (e.key === "m") { const m = !muted; setMuted(m); v().muted = m; }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.backgroundColor = "";
    };
  }, [playing, muted]);

  useEffect(() => {
    const onFs = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative bg-black rounded-2xl overflow-hidden border border-dark-700 group"
      onMouseMove={wake}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full aspect-video"
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={onEnded}
      />

      {/* Center play button */}
      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity"
          aria-label={t("video.play")}
        >
          <div className="w-20 h-20 rounded-full bg-sidrah-600/90 flex items-center justify-center hover:scale-110 transition-transform">
            <Play size={32} className="text-white mr-1" />
          </div>
        </button>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Seek bar */}
        <div
          className="w-full bg-white/20 rounded-full h-1.5 mb-3 cursor-pointer group/seek"
          onClick={seek}
          role="slider"
          aria-label={t("video.progressBar")}
          aria-valuenow={Math.round((current / duration) * 100) || 0}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="bg-sidrah-500 h-1.5 rounded-full relative"
            style={{ width: `${(current / duration) * 100 || 0}%` }}
          >
            <span className="absolute -left-1.5 -top-1 w-3.5 h-3.5 bg-white rounded-full opacity-0 group-hover/seek:opacity-100 transition-opacity" />
          </div>
          {/* Chapter markers */}
          {chapters.map((ch) => (
            <button
              key={ch.time}
              onClick={(e) => { e.stopPropagation(); v().currentTime = ch.time; }}
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-3 bg-white/70 rounded-sm hover:bg-yellow-400 transition-colors"
              style={{ left: `${(ch.time / (duration || 1)) * 100}%` }}
              title={ch.label}
              aria-label={`${t("video.chapter")}: ${ch.label} ${t("video.at")} ${fmt(ch.time)}`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} aria-label={playing ? t("video.pause") : t("video.play")}>
              {playing ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={() => (v().currentTime -= 10)} aria-label={t("video.rewind10")}>
              <SkipForward size={18} />
            </button>
            <button onClick={() => (v().currentTime += 10)} aria-label={t("video.forward10")}>
              <SkipBack size={18} />
            </button>
            <span className="text-xs" dir="ltr">
              {fmt(current)} / {fmt(duration)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={cycleSpeed} className="flex items-center gap-1 text-xs hover:text-sidrah-300" aria-label={t("video.playbackSpeed")}>
              <Gauge size={16} /> {speed}x
            </button>
            <button onClick={toggleCinema} className="hover:text-sidrah-300" aria-label={t("video.cinemaMode")}>
              <Moon size={18} />
            </button>
            <div className="flex items-center gap-2 group/vol">
              <button
                onClick={() => { const m = !muted; setMuted(m); v().muted = m; }}
                aria-label={muted ? t("video.unmute") : t("video.mute")}
              >
                {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setVolume(val);
                  v().volume = val;
                  setMuted(val === 0);
                }}
                className="w-0 group-hover/vol:w-16 transition-all accent-sidrah-500"
                aria-label={t("video.volume")}
              />
            </div>
            <button onClick={toggleFullscreen} aria-label={t("video.fullscreen")}>
              {fullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Title overlay */}
      {title && !playing && (
        <div className="absolute top-4 right-4 text-white/90 text-sm bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg pointer-events-none">
          {title}
        </div>
      )}

      {/* Chapters list */}
      {chapters.length > 0 && (
        <div className="bg-dark-800 border-t border-dark-700 px-4 py-2 flex flex-wrap gap-2">
          {chapters.map((ch) => (
            <button
              key={ch.time}
              onClick={() => { v().currentTime = ch.time; v().play(); }}
              className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${
                current >= ch.time ? "bg-sidrah-950/50 text-sidrah-300" : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="font-mono" dir="ltr">{fmt(ch.time)}</span> {ch.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
