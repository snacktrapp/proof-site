import { NextRequest, NextResponse } from "next/server";

const INQUIRY_LABELS: Record<string, string> = {
  brand_program: "Start a brand program",
  pricing: "Pricing / plan fit",
  athlete: "Athlete question",
  partnership: "Partnership / press",
  support: "Existing customer support",
  other: "Other",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (clean(body.website, 120)) {
    return NextResponse.json({ success: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 180).toLowerCase();
  const company = clean(body.company, 160);
  const inquiryType = clean(body.inquiryType, 80);
  const message = clean(body.message, 4000);
  const inquiryLabel = INQUIRY_LABELS[inquiryType] ?? INQUIRY_LABELS.other;

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  if (!message || message.length < 10) {
    return NextResponse.json(
      { error: "Message must be at least 10 characters" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "PROOF <team@verifiedeffort.com>";
  const toEmail = "team@verifiedeffort.com";

  if (!apiKey) {
    console.error("Missing RESEND_API_KEY for contact form");
    return NextResponse.json(
      { error: "Contact form is not configured" },
      { status: 500 }
    );
  }

  const subjectParts = ["[PROOF contact]", inquiryLabel];
  if (company) subjectParts.push(company);

  const text = [
    `New public-site contact inquiry`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company / brand: ${company || "-"}`,
    `Inquiry type: ${inquiryLabel}`,
    ``,
    message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111">
      <h2 style="margin:0 0 16px">New public-site contact inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company / brand:</strong> ${escapeHtml(company || "-")}</p>
      <p><strong>Inquiry type:</strong> ${escapeHtml(inquiryLabel)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:20px 0" />
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: subjectParts.join(" - "),
        text,
        html,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    const errorBody = await response.json().catch(() => ({}));
    console.error("Resend contact error:", response.status, errorBody);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 500 }
    );
  } catch (err) {
    console.error("Contact form send error:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 500 }
    );
  }
}
