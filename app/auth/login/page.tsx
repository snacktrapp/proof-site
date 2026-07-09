import { redirect } from "next/navigation";

const APP_LOGIN_URL = "https://proof.verifiedeffort.com/auth/login";

export default function LoginPreviewPage() {
  redirect(APP_LOGIN_URL);
}
