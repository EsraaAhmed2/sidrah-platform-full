import { ImageResponse } from "next/og";
import { getCourseById } from "@/lib/courses-data";

export const runtime = "edge";
export const alt = "كورس على منصة Sidrah";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image({ params }: { params: { id: string } }) {
  const course = getCourseById(Number(params.id));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)",
          fontFamily: "sans-serif",
          padding: 60,
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>{course?.emoji ?? "📚"}</div>
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "center",
            marginBottom: 16,
            maxWidth: 900,
          }}
        >
          {course?.title ?? "كورس على Sidrah"}
        </div>
        <div style={{ display: "flex", gap: 30, fontSize: 22, color: "#9ca3af" }}>
          <span>⭐ {course?.rating}</span>
          <span>👥 {course?.students} طالب</span>
          <span>📖 {course?.lessonsCount} درس</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 24,
            fontWeight: "bold",
            background: "linear-gradient(90deg, #0ea5e9, #8b5cf6)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          SIDRAH — تعلم البرمجة بأسلوب احترافي
        </div>
      </div>
    ),
    size
  );
}
