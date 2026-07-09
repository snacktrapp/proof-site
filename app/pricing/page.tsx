import type { Metadata } from "next";
import { AthleteForwardPricing } from "@/components/AthleteForwardConceptPages";

export const metadata: Metadata = {
  title: "PROOF - Pricing",
  description:
    "Compare PROOF pricing for effort-based loyalty programs, reward eligibility, aggregate reporting, and launch support.",
};

export default function PricingPage() {
  return <AthleteForwardPricing />;
}
