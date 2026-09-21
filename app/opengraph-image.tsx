import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sidrah — منصة تعلم البرمجة";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            background: "linear-gradient(90deg, #0ea5e9, #8b5cf6)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 20,
          }}
        >
          SIDRAH
        </div>
        <div style={{ fontSize: 36, color: "#ffffff", marginBottom: 12 }}>
          تعلم البرمجة بأسلوب احترافي
        </div>
        <div style={{ fontSize: 22, color: "#9ca3af" }}>
          من الصفر حتى الاحتراف — كورسات، اختبارات، شهادات معتمدة
        </div>
      </div>
    ),
    size
  );
}
