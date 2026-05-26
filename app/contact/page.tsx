import type { Metadata } from "next";
import { ContactPageContent } from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact PROOF",
  description:
    "Contact PROOF about verified effort rewards, brand loyalty programs, pricing, partnerships, or athlete questions.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
