import type { Metadata } from "next";
import { AthleteForwardPricing } from "@/components/AthleteForwardConceptPages";

export const metadata: Metadata = {
  title: "PROOF — Athlete-Forward Pricing Concept",
  description:
    "A preview-only pricing and plan comparison page for the athlete-forward PROOF site concept.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AthleteForwardPricingPage() {
  return <AthleteForwardPricing />;
}
