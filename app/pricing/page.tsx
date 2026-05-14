import type { Metadata } from "next";
import { AthleteForwardPricing } from "@/components/AthleteForwardConceptPages";

export const metadata: Metadata = {
  title: "PROOF - Pricing",
  description:
    "Compare PROOF pricing and plan options for verified effort rewards, brand challenges, athlete progress, and earned loyalty programs.",
};

export default function PricingPage() {
  return <AthleteForwardPricing />;
}
