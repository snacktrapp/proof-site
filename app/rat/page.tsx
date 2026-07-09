import type { Metadata } from "next";
import RatLanding from "./RatLanding";

export const metadata: Metadata = {
  title: "Run Against Traffic | PROOF",
  description:
    "Run Against Traffic is a Proof Labs field test where verified effort earns RAT credit toward the First 50 Foamie.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Run Against Traffic | PROOF",
    description:
      "Run Against Traffic is a Proof Labs field test where verified effort earns RAT credit toward the First 50 Foamie.",
    url: "https://www.verifiedeffort.com/rat",
    siteName: "PROOF",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Run Against Traffic | PROOF",
    description:
      "Run Against Traffic is a Proof Labs field test where verified effort earns RAT credit toward the First 50 Foamie.",
  },
};

export default function RatPage() {
  return <RatLanding />;
}
