import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — PROOF",
  robots: { index: false, follow: false },
};

const COLORS = {
  base: "#050505",
  textBright: "#FFFFFF",
  text: "#E8E8E8",
  subtle: "#888888",
  signal: "#C8FF00",
  rail: "#222222",
};

export default function NotFound() {
  return (
    <div
      style={{
        background: COLORS.base,
        minHeight: "100vh",
        color: COLORS.text,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 8,
          border: `2px solid ${COLORS.textBright}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 800,
          color: COLORS.textBright,
          marginBottom: 32,
        }}
      >
        P
      </div>
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 88,
          letterSpacing: "0.04em",
          color: COLORS.textBright,
          lineHeight: 1,
          marginBottom: 12,
        }}
      >
        404
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: COLORS.signal,
          marginBottom: 16,
        }}
      >
        No verified effort here
      </div>
      <p
        style={{
          fontSize: 15,
          color: COLORS.subtle,
          maxWidth: 420,
          textAlign: "center",
          lineHeight: 1.6,
          marginBottom: 32,
          marginTop: 0,
        }}
      >
        The page you're looking for doesn't exist or has moved. Head back to
        the start — every verified mile is still there.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          background: COLORS.signal,
          color: COLORS.base,
          textDecoration: "none",
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          borderRadius: 6,
        }}
      >
        Back to PROOF →
      </Link>
    </div>
  );
}
