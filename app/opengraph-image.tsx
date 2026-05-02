import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Ffure – Sala per eventi & conferenze";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = readFileSync(join(process.cwd(), "public", "logo.png"));
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1C1917",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        {/* Decorative gold line top */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          background: "linear-gradient(90deg, #C9A465, #E2C27D, #A07C3A)",
          display: "flex",
        }} />

        <img
          src={logoBase64}
          style={{ height: "180px", width: "auto", objectFit: "contain" }}
        />

        <p
          style={{
            color: "#C9A465",
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            margin: 0,
            fontFamily: "sans-serif",
          }}
        >
          SALA PER EVENTI &amp; CONFERENZE
        </p>

        {/* Decorative gold line bottom */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "6px",
          background: "linear-gradient(90deg, #C9A465, #E2C27D, #A07C3A)",
          display: "flex",
        }} />
      </div>
    ),
    { ...size }
  );
}
