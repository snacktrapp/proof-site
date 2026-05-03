import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PROOF — Verified Effort Loyalty Infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Fetch a Google Font weight as a binary blob suitable for ImageResponse's
   `fonts` option. Google Fonts returns different CSS depending on UA;
   forcing a modern UA gets a woff2-formatted URL we can pull directly.
   Failure cases fall back to system fonts via the cascading font stack —
   layout is built to work either way. */
/* Bebas Neue via jsdelivr's google/fonts GitHub mirror — serves a
   static TTF directly. Satori (the renderer behind ImageResponse)
   accepts only TTF/OTF, not woff/woff2 (Google Fonts CSS API only
   returns those) and not variable fonts (which trip a Satori parse
   crash). Body + mono stay system-font; only the display headline gets
   the brand font, which is the high-leverage win. */
async function loadBebasNeue(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/bebasneue/BebasNeue-Regular.ttf",
    );
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OGImage() {
  const HEADLINE_LINE_1 = "Turn every mile, stroke,";
  const HEADLINE_LINE_2 = "and stride into";
  const HEADLINE_LINE_3 = "loyalty currency.";
  const EYEBROW = "VERIFIED EFFORT LOYALTY INFRASTRUCTURE";
  const SUBLINE = "Your customers are already training. PROOF turns verified athletic effort into loyalty currency for your brand.";
  const CHIP = "VERIFIED BY PROOF";
  const WORDMARK = "PROOF";
  const DOMAIN = "verifiedeffort.com";

  const bebasNeue = await loadBebasNeue();
  const fonts: Array<{ name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }> = [];
  if (bebasNeue) fonts.push({ name: "Bebas Neue", data: bebasNeue, weight: 400, style: "normal" });

  const SIGNAL = "#c8ff00";
  const VOID = "#050505";
  const TEXT = "#ffffff";
  const MUTED = "#9aa0a6";
  const SURFACE = "#0e1117";
  const SURFACE_BORDER = "rgba(255, 255, 255, 0.10)";

  // If Bebas Neue failed to fetch, the headline falls back to a heavy
  // sans-serif. Use a smaller size in the fallback path so it doesn't
  // overflow the canvas — Bebas is condensed; system sans is wide.
  const HEADLINE_SIZE = bebasNeue ? 124 : 84;
  const HEADLINE_FAMILY = bebasNeue
    ? "Bebas Neue, system-ui, sans-serif"
    : "system-ui, -apple-system, Helvetica, Arial, sans-serif";
  const HEADLINE_WEIGHT = bebasNeue ? 400 : 800;
  const HEADLINE_LETTER = bebasNeue ? "0.01em" : "-0.02em";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: VOID,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: "Outfit, system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top — wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 8,
              border: `2.5px solid ${TEXT}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: HEADLINE_FAMILY,
              fontSize: 32,
              fontWeight: HEADLINE_WEIGHT,
              color: TEXT,
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            P
          </div>
          <div
            style={{
              fontFamily: HEADLINE_FAMILY,
              fontSize: 36,
              fontWeight: HEADLINE_WEIGHT,
              color: TEXT,
              letterSpacing: "0.18em",
              lineHeight: 1,
            }}
          >
            {WORDMARK}
          </div>
        </div>

        {/* Middle — eyebrow + headline + subline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 16,
              fontWeight: 700,
              color: SIGNAL,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 22,
            }}
          >
            {EYEBROW}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: HEADLINE_FAMILY,
                fontSize: HEADLINE_SIZE,
                fontWeight: HEADLINE_WEIGHT,
                color: TEXT,
                letterSpacing: HEADLINE_LETTER,
                lineHeight: 0.95,
              }}
            >
              {HEADLINE_LINE_1}
            </div>
            <div
              style={{
                fontFamily: HEADLINE_FAMILY,
                fontSize: HEADLINE_SIZE,
                fontWeight: HEADLINE_WEIGHT,
                color: TEXT,
                letterSpacing: HEADLINE_LETTER,
                lineHeight: 0.95,
              }}
            >
              {HEADLINE_LINE_2}
            </div>
            <div
              style={{
                fontFamily: HEADLINE_FAMILY,
                fontSize: HEADLINE_SIZE,
                fontWeight: HEADLINE_WEIGHT,
                color: SIGNAL,
                letterSpacing: HEADLINE_LETTER,
                lineHeight: 0.95,
              }}
            >
              {HEADLINE_LINE_3}
            </div>
          </div>

          <div
            style={{
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Helvetica, sans-serif",
              fontSize: 22,
              color: MUTED,
              lineHeight: 1.45,
              maxWidth: 880,
              marginTop: 24,
            }}
          >
            {SUBLINE}
          </div>
        </div>

        {/* Bottom — domain + VerifiedChip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: `1px solid ${SURFACE_BORDER}`,
          }}
        >
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 16,
              fontWeight: 400,
              color: MUTED,
              letterSpacing: "0.06em",
            }}
          >
            {DOMAIN}
          </div>

          {/* VerifiedChip — dark pill, signal-lime dot, white uppercase label.
              Mirrors the inline VerifiedChip pattern used on the marketing
              site (/join hero, dashboard greeting, etc.). */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 18px",
              background: SURFACE,
              border: `1.5px solid ${SURFACE_BORDER}`,
              borderRadius: 999,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: SIGNAL,
                display: "flex",
              }}
            />
            <div
              style={{
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Helvetica, sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: TEXT,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {CHIP}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  );
}
