import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "PROOF — Verified Effort Loyalty Infrastructure",
  description:
    "Turn every mile, stroke, and stride into loyalty currency. PROOF verifies athletic effort across every sport — GPS-tracked, effort-normalized — and turns it into rewards your customers earn from training they already do.",
  metadataBase: new URL("https://verifiedeffort.com"),
  openGraph: {
    title: "PROOF — Verified Effort Loyalty Infrastructure",
    description:
      "Turn every mile, stroke, and stride into loyalty currency. PROOF verifies athletic effort across every sport — GPS-tracked, effort-normalized — and turns it into rewards your customers earn from training they already do.",
    url: "https://verifiedeffort.com",
    siteName: "PROOF",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PROOF — Verified Effort Loyalty Infrastructure",
    description:
      "Turn every mile, stroke, and stride into loyalty currency. PROOF verifies athletic effort across every sport — GPS-tracked, effort-normalized — and turns it into rewards your customers earn from training they already do.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;700&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#050505",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
