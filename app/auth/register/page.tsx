import type { Metadata } from "next";
import { AthleteForwardAuthPreview, type AuthPreviewVariant } from "@/components/AthleteForwardAuthPreview";

export const metadata: Metadata = {
  title: "Create Account - PROOF",
  description: "Preview of the PROOF signup flow for athletes and brands.",
  robots: {
    index: false,
    follow: false,
  },
};

type RegisterPageProps = {
  searchParams?: Promise<{
    role?: string | string[];
  }>;
};

function roleToVariant(role: string | string[] | undefined): AuthPreviewVariant {
  const value = Array.isArray(role) ? role[0] : role;
  if (value === "athlete" || value === "brand") return value;
  return "register";
}

export default async function RegisterPreviewPage({ searchParams }: RegisterPageProps) {
  const params = searchParams ? await searchParams : undefined;
  return <AthleteForwardAuthPreview variant={roleToVariant(params?.role)} />;
}
