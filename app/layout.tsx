import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "PROOF - Verified Effort Rewards",
  description:
    "PROOF helps athletes turn verified movement into earned rewards and gives brands a cleaner way to recognize real effort.",
  metadataBase: new URL("https://verifiedeffort.com"),
  openGraph: {
    title: "PROOF - Verified Effort Rewards",
    description:
      "PROOF helps athletes turn verified movement into earned rewards and gives brands a cleaner way to recognize real effort.",
    url: "https://verifiedeffort.com",
    siteName: "PROOF",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PROOF - Verified Effort Rewards",
    description:
      "PROOF helps athletes turn verified movement into earned rewards and gives brands a cleaner way to recognize real effort.",
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
