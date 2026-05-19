import type { Metadata } from "next";
import { AthleteForwardAuthPreview } from "@/components/AthleteForwardAuthPreview";

export const metadata: Metadata = {
  title: "Log In - PROOF",
  description: "Preview of the PROOF login flow.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPreviewPage() {
  return <AthleteForwardAuthPreview variant="login" />;
}
