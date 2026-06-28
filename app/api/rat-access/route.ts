import { NextResponse } from "next/server";

const PROOF_RAT_ACTION = "https://proof.verifiedeffort.com/rat?/requestAccess";

export async function POST(request: Request) {
  const form = await request.formData();
  const forwarded = new FormData();

  for (const key of ["firstName", "email", "movementType", "runningAgainst", "company"]) {
    const value = form.get(key);
    if (typeof value === "string") {
      forwarded.set(key, value);
    }
  }

  try {
    const response = await fetch(PROOF_RAT_ACTION, {
      method: "POST",
      body: forwarded,
      redirect: "manual",
      headers: {
        accept: "application/json, text/plain, */*",
      },
    });

    if (response.ok || response.status === 303) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { ok: false, error: "That did not land. Check the required fields and try again." },
      { status: response.status >= 400 && response.status < 500 ? 400 : 502 },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "That did not land. Try again in a minute." },
      { status: 502 },
    );
  }
}
