"use client";

import { type FormEvent, useState } from "react";
import { AthleteForwardFooter } from "./AthleteForwardFooter";
import { AthleteForwardHeader } from "./AthleteForwardHeader";
import { athleteForwardChromeCss } from "./athleteForwardChrome";

const inquiryTypes = [
  { value: "brand_program", label: "Start a brand program" },
  { value: "pricing", label: "Pricing / plan fit" },
  { value: "athlete", label: "Athlete question" },
  { value: "partnership", label: "Partnership / press" },
  { value: "support", label: "Existing customer support" },
  { value: "other", label: "Other" },
];

const faqs = [
  {
    q: "Who should use this form?",
    a: "Brands evaluating PROOF, athletes with general questions, partners, press, and anyone who is not sure where to start.",
  },
  {
    q: "Is PROOF for brands or athletes?",
    a: "Both. Brands use PROOF to build loyalty programs around verified effort. Athletes connect their activity account and earn progress or rewards when a brand program includes them.",
  },
  {
    q: "What platforms does PROOF support today?",
    a: "Strava is live today. Shopify discount-code generation and Klaviyo or webhook-based messaging are part of the brand program stack.",
  },
  {
    q: "How does pricing work?",
    a: "PROOF is priced as a platform subscription for brands, with included billable-member thresholds. Pricing is not a revenue share or per-redemption fee.",
  },
  {
    q: "I already use PROOF. Should I contact support here?",
    a: "You can, but the app help center is better for account-specific support because it includes your signed-in context and routes the request into the support queue.",
  },
];

const contactCss = `
  .contact-page, .contact-page * { box-sizing: border-box; }
  .contact-page {
    min-height: 100vh;
    overflow-x: hidden;
    background: #050505;
    color: #e8e8e8;
    font-family: 'Outfit', system-ui, sans-serif;
  }
  .contact-page a { color: inherit; text-decoration: none; }
  .contact-page ::selection { background: #c8ff00; color: #050505; }
  ${athleteForwardChromeCss}
  .contact-main {
    width: min(1180px, calc(100% - 36px));
    margin: 0 auto;
    padding: clamp(110px, 14vh, 150px) 0 clamp(68px, 8vw, 108px);
  }
  .contact-hero {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(360px, 0.62fr);
    gap: clamp(32px, 6vw, 80px);
    align-items: start;
  }
  .contact-kicker {
    width: fit-content;
    border-left: 2px solid #c8ff00;
    padding-left: 13px;
    color: #c8ff00;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .contact-title {
    max-width: 790px;
    margin: 18px 0 0;
    color: #ffffff;
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(64px, 10vw, 150px);
    font-weight: 400;
    letter-spacing: 0;
    line-height: 0.84;
    text-wrap: balance;
  }
  .contact-lede {
    max-width: 660px;
    margin: 24px 0 0;
    color: rgba(232,232,232,0.82);
    font-size: clamp(17px, 1.8vw, 20px);
    line-height: 1.58;
  }
  .contact-support-note {
    display: grid;
    gap: 10px;
    max-width: 620px;
    margin-top: 34px;
    border: 1px solid rgba(255,255,255,0.1);
    border-left: 3px solid #c8ff00;
    border-radius: 10px;
    background: rgba(255,255,255,0.035);
    padding: 18px 20px;
  }
  .contact-support-note strong {
    color: #ffffff;
    font-size: 15px;
  }
  .contact-support-note p {
    margin: 0;
    color: #888888;
    font-size: 14px;
    line-height: 1.55;
  }
  .contact-support-note a {
    color: #c8ff00;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .contact-form {
    display: grid;
    gap: 14px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    background:
      linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015)),
      #0a0a0a;
    padding: clamp(18px, 3vw, 26px);
  }
  .contact-form h2 {
    margin: 0 0 4px;
    color: #ffffff;
    font-size: 22px;
    line-height: 1.15;
  }
  .contact-field {
    display: grid;
    gap: 7px;
  }
  .contact-field span {
    color: #888888;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .contact-input,
  .contact-select,
  .contact-textarea {
    width: 100%;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px;
    background:
      linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0)),
      #050505;
    color: #e8e8e8;
    font: 500 15px/1.45 'Outfit', system-ui, sans-serif;
    outline: none;
  }
  .contact-input,
  .contact-select {
    min-height: 46px;
    padding: 11px 12px;
  }
  .contact-select-wrap {
    position: relative;
    display: block;
  }
  .contact-select {
    appearance: none;
    -webkit-appearance: none;
    padding-right: 42px;
  }
  .contact-select::-ms-expand {
    display: none;
  }
  .contact-select-wrap::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 15px;
    width: 8px;
    height: 8px;
    border-right: 2px solid rgba(232,232,232,0.72);
    border-bottom: 2px solid rgba(232,232,232,0.72);
    pointer-events: none;
    transform: translateY(-62%) rotate(45deg);
  }
  .contact-select option {
    background: #111111;
    color: #ffffff;
  }
  .contact-textarea {
    min-height: 150px;
    resize: vertical;
    padding: 12px;
  }
  .contact-input:focus,
  .contact-select:focus,
  .contact-textarea:focus {
    border-color: rgba(200,255,0,0.72);
    box-shadow: 0 0 0 3px rgba(200,255,0,0.09);
  }
  .contact-honeypot { display: none; }
  .contact-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    border: 0;
    border-radius: 10px;
    background: #c8ff00;
    color: #050505;
    cursor: pointer;
    font-family: 'Outfit', system-ui, sans-serif;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .contact-submit:disabled {
    cursor: default;
    opacity: 0.58;
  }
  .contact-status {
    margin: 0;
    border-radius: 8px;
    padding: 12px;
    font-size: 14px;
    line-height: 1.45;
  }
  .contact-status-success {
    border: 1px solid rgba(200,255,0,0.24);
    border-left: 3px solid #c8ff00;
    background:
      linear-gradient(180deg, rgba(200,255,0,0.12), rgba(200,255,0,0.055)),
      rgba(200,255,0,0.04);
    color: #e8e8e8;
    padding: 15px 16px;
  }
  .contact-status-success strong {
    display: block;
    color: #ffffff;
    font-size: 16px;
    line-height: 1.25;
  }
  .contact-status-success span {
    display: block;
    margin-top: 5px;
    color: rgba(232,232,232,0.76);
  }
  .contact-status-error {
    background: rgba(255,61,0,0.11);
    color: #ffffff;
  }
  .contact-faq {
    border-top: 1px solid rgba(255,255,255,0.08);
    margin-top: clamp(64px, 8vw, 104px);
    padding-top: clamp(54px, 7vw, 84px);
  }
  .contact-faq h2 {
    max-width: 760px;
    margin: 14px 0 0;
    color: #ffffff;
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 7vw, 96px);
    font-weight: 400;
    line-height: 0.88;
  }
  .contact-faq-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    margin-top: 34px;
  }
  .contact-faq-card {
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    background: rgba(255,255,255,0.025);
    padding: 20px;
  }
  .contact-faq-card h3 {
    margin: 0 0 8px;
    color: #ffffff;
    font-size: 18px;
  }
  .contact-faq-card p {
    margin: 0;
    color: #888888;
    font-size: 15px;
    line-height: 1.55;
  }
  @media (max-width: 880px) {
    .contact-hero,
    .contact-faq-grid {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 640px) {
    .contact-main {
      width: min(390px, 100vw);
      padding-right: 18px;
      padding-left: 18px;
    }
    .contact-title {
      font-size: clamp(54px, 15vw, 68px);
      text-wrap: auto;
    }
    .contact-lede {
      font-size: 16px;
    }
  }
`;

export function ContactPageContent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "brand_program",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Could not send your message.");
      }

      setStatus("success");
      setForm({
        name: "",
        email: "",
        company: "",
        inquiryType: "brand_program",
        message: "",
        website: "",
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send your message.");
    }
  };

  return (
    <main className="contact-page">
      <style>{contactCss}</style>
      <AthleteForwardHeader />
      <div className="contact-main">
        <section className="contact-hero">
          <div>
            <div className="contact-kicker">Contact</div>
            <h1 className="contact-title">Tell us what you are building.</h1>
            <p className="contact-lede">
              Use this form for brand programs, pricing questions, partnerships, athlete questions,
              or anything that does not fit neatly into a checkbox. We route every message to the
              PROOF team.
            </p>
            <div className="contact-support-note">
              <strong>Already using PROOF?</strong>
              <p>
                You can send your question here, but signed-in customers get the best support path
                through <a href="https://proof.verifiedeffort.com/help">proof.verifiedeffort.com/help</a>.
              </p>
            </div>
          </div>

          <form className="contact-form" onSubmit={submit}>
            <h2>Send a message</h2>
            <label className="contact-field">
              <span>Name</span>
              <input
                className="contact-input"
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                required
              />
            </label>
            <label className="contact-field">
              <span>Email</span>
              <input
                className="contact-input"
                type="email"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                required
              />
            </label>
            <label className="contact-field">
              <span>Company / brand</span>
              <input
                className="contact-input"
                value={form.company}
                onChange={(event) => update("company", event.target.value)}
              />
            </label>
            <label className="contact-field">
              <span>Inquiry type</span>
              <div className="contact-select-wrap">
                <select
                  className="contact-select"
                  value={form.inquiryType}
                  onChange={(event) => update("inquiryType", event.target.value)}
                >
                  {inquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label className="contact-field contact-honeypot" aria-hidden="true">
              <span>Website</span>
              <input
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(event) => update("website", event.target.value)}
              />
            </label>
            <label className="contact-field">
              <span>Message</span>
              <textarea
                className="contact-textarea"
                value={form.message}
                onChange={(event) => update("message", event.target.value)}
                placeholder="What are you trying to launch, evaluate, or solve?"
                required
              />
            </label>
            {status === "success" ? (
              <div className="contact-status contact-status-success" role="status">
                <strong>Message sent.</strong>
                <span>
                  Thanks for reaching out. We will review your note and reply from the PROOF team
                  inbox.
                </span>
              </div>
            ) : null}
            {status === "error" ? (
              <p className="contact-status contact-status-error">{error}</p>
            ) : null}
            <button className="contact-submit" type="submit" disabled={status === "sending"}>
              {status === "sending"
                ? "Sending..."
                : status === "success"
                  ? "Send another message"
                  : "Send message"}
            </button>
          </form>
        </section>

        <section className="contact-faq" aria-labelledby="contact-faq-heading">
          <div className="contact-kicker">FAQ</div>
          <h2 id="contact-faq-heading">Quick answers before you write.</h2>
          <div className="contact-faq-grid">
            {faqs.map((faq) => (
              <article className="contact-faq-card" key={faq.q}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
      <AthleteForwardFooter />
    </main>
  );
}
