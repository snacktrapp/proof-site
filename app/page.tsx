import type { Metadata } from "next";
import AthleteForwardConcept from "@/components/AthleteForwardConcept";

export const metadata: Metadata = {
  title: "PROOF - Verified Effort Rewards",
  description:
    "PROOF helps athletes turn verified movement into earned rewards and gives brands a cleaner way to recognize real effort.",
};

export default function Home() {
  return <AthleteForwardConcept />;
}
