import type { Metadata } from "next";
import AthleteForwardConcept from "@/components/AthleteForwardConcept";

export const metadata: Metadata = {
  title: "PROOF - Effort-Based Loyalty for Athletic Brands",
  description:
    "PROOF helps athletic brands turn verified movement into Points, milestones, challenges, and earned rewards.",
};

export default function Home() {
  return <AthleteForwardConcept />;
}
