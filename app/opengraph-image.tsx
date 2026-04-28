import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PROOF — Effort Verified.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#050505",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 56,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 10,
              border: "3px solid #FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 900,
              color: "#FFFFFF",
            }}
          >
            P
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "0.18em",
            }}
          >
            PROOF
          </div>
        </div>

        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.0,
            marginBottom: 28,
          }}
        >
          Effort Verified.
        </div>

        <div
          style={{
            fontSize: 28,
            color: "#888888",
            lineHeight: 1.4,
            maxWidth: 980,
          }}
        >
          PROOF connects fitness data to loyalty programs — so brands can
          reward real athletic effort instead of just transactions.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 18px",
            background: "#FFFFFF",
            borderRadius: 999,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#C8FF00",
            }}
          />
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#050505",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Verified by PROOF
          </div>
        </div>
      </div>
    ),
    size,
  );
}
