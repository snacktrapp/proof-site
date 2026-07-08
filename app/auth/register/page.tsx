import { redirect } from "next/navigation";

const APP_REGISTER_URL = "https://proof.verifiedeffort.com/auth/register";

type RegisterPageProps = {
  searchParams?: Promise<{
    role?: string | string[];
  }>;
};

function registerUrl(role: string | string[] | undefined) {
  const value = Array.isArray(role) ? role[0] : role;
  if (value !== "athlete" && value !== "brand") return APP_REGISTER_URL;

  const url = new URL(APP_REGISTER_URL);
  url.searchParams.set("role", value);
  return url.toString();
}

export default async function RegisterPreviewPage({ searchParams }: RegisterPageProps) {
  const params = searchParams ? await searchParams : undefined;
  redirect(registerUrl(params?.role));
}
