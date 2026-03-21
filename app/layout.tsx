import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "PROOF — Effort Verified.",
  description:
    "PROOF connects fitness data to loyalty programs — so brands can reward real athletic effort instead of just transactions. The Stripe of athletic loyalty.",
  metadataBase: new URL("https://useproof.co"),
  openGraph: {
    title: "PROOF — Effort Verified.",
    description:
      "PROOF connects fitness data to loyalty programs — so brands can reward real athletic effort instead of just transactions.",
    url: "https://useproof.co",
    siteName: "PROOF",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PROOF — Effort Verified.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PROOF — Effort Verified.",
    description:
      "PROOF connects fitness data to loyalty programs — so brands can reward real athletic effort instead of just transactions.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;700&family=Outfit:wght@300;400;500;600&family=Syne:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#050505" }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
