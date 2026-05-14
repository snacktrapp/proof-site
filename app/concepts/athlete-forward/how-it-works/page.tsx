import type { Metadata } from "next";
import { AthleteForwardHowItWorks } from "@/components/AthleteForwardConceptPages";

export const metadata: Metadata = {
  title: "PROOF — Athlete-Forward How It Works Concept",
  description:
    "A preview-only detailed product overview page for the athlete-forward PROOF site concept.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AthleteForwardHowItWorksPage() {
  return <AthleteForwardHowItWorks />;
}
