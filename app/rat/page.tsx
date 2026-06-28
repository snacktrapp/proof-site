import type { Metadata } from "next";
import RatLanding from "./RatLanding";

export const metadata: Metadata = {
  title: "Run Against Traffic | PROOF",
  description:
    "Run Against Traffic is an invite-only Proof Labs project where verified effort unlocks gear.",
  openGraph: {
    title: "Run Against Traffic | PROOF",
    description:
      "Run Against Traffic is an invite-only Proof Labs project where verified effort unlocks gear.",
    url: "https://www.verifiedeffort.com/rat",
    siteName: "PROOF",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Run Against Traffic | PROOF",
    description:
      "Run Against Traffic is an invite-only Proof Labs project where verified effort unlocks gear.",
  },
};

export default function RatPage() {
  return <RatLanding />;
}
