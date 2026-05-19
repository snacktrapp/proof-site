import type { Metadata } from "next";
import { AthleteForwardAuthPreview } from "@/components/AthleteForwardAuthPreview";

export const metadata: Metadata = {
  title: "Get Started - PROOF",
  description: "Choose the right PROOF path for athletes or brands.",
};

export default function StartPage() {
  return <AthleteForwardAuthPreview variant="start" />;
}
