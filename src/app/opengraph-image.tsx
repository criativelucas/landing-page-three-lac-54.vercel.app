import { ImageResponse } from "next/og";

export const alt = "Websites That Think: Your Site Live in 72 Hours";
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
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="40" height="40" viewBox="0 0 32 32">
            <path d="M11 4 L18 4 L11 15 L4 15 Z" fill="#e3ff3d" />
            <path d="M28 4 L28 9 L22 9 L22 4 Z" fill="#e3ff3d" />
            <path d="M21 12 L28 12 L14 28 L7 28 Z" fill="#e3ff3d" />
          </svg>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>think.studio</div>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, marginTop: 48, lineHeight: 1.1 }}>
          Websites that think.
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#e3ff3d", marginTop: 24 }}>
          Custom websites, shipped in 72 hours.
        </div>
      </div>
    ),
    { ...size }
  );
}
