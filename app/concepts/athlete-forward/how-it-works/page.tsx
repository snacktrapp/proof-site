import type { Metadata } from "next";
import { AthleteForwardHowItWorks } from "@/components/AthleteForwardConceptPages";

export const metadata: Metadata = {
  title: "PROOF — How It Works",
  description:
    "See how PROOF verifies athlete activity, converts effort into brand progress, and triggers rewards when athletes qualify.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AthleteForwardHowItWorksPage() {
  return <AthleteForwardHowItWorks />;
}
