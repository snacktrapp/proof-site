import type { Metadata } from "next";
import AthleteForwardConcept from "@/components/AthleteForwardConcept";

export const metadata: Metadata = {
  title: "PROOF — Athlete-Forward Homepage Concept",
  description:
    "A preview-only alternate homepage direction for PROOF, leading with athlete effort and motion before explaining the verified-effort loyalty platform.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AthleteForwardConceptPage() {
  return <AthleteForwardConcept />;
}
