import type { Metadata } from "next";
import { AthleteForwardFooter } from "@/components/AthleteForwardFooter";
import { AthleteForwardHeader } from "@/components/AthleteForwardHeader";
import { athleteForwardChromeCss } from "@/components/athleteForwardChrome";

const CONTACT_HREF =
  "mailto:team@verifiedeffort.com?subject=PROOF%20founder%20preview";

export const metadata: Metadata = {
  title: "PROOF Founder Preview",
  description:
    "PROOF is purpose-built effort-based loyalty infrastructure for athletes and the brands that serve them.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "PROOF Founder Preview",
    description:
      "Purpose-built effort-based loyalty infrastructure for athletic brands.",
    url: "https://www.verifiedeffort.com/founder-preview",
    siteName: "PROOF",
    type: "website",
    images: [
      {
        url: "https://www.verifiedeffort.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "PROOF",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PROOF Founder Preview",
    description:
      "Purpose-built effort-based loyalty infrastructure for athletic brands.",
    images: ["https://www.verifiedeffort.com/opengraph-image"],
  },
};

const COLORS = {
  base: "#050505",
  surface: "#0A0A0A",
  surfaceRaised: "#111111",
  surfaceBorder: "#1A1A1A",
  text: "#E8E8E8",
  textBright: "#FFFFFF",
  subtle: "#888888",
  muted: "#555555",
  signal: "#C8FF00",
};

const pillars = [
  {
    title: "Verified Effort",
    body:
      "Turn eligible activity from trusted connected platforms into a loyalty signal the brand can act on.",
  },
  {
    title: "Earned Recognition",
    body:
      "Show up when recognition is deserved: after verified activity, milestones, goals, records, challenges, rewards, and consistent participation.",
  },
  {
    title: "Owned Loyalty",
    body:
      "Bring participation into the brand's ecommerce and marketing stack, so the brand can build direct relationships and drive repeat engagement.",
  },
];

const steps = [
  ["Join", "Athletes join a PROOF-powered brand program."],
  ["Connect", "Athletes connect a trusted activity source, starting with Strava."],
  ["Verify", "PROOF verifies eligible effort and applies the brand's loyalty rules."],
  [
    "Activate",
    "Brands trigger rewards, lifecycle messaging, and customer intelligence through their ecommerce and marketing stack.",
  ],
];

const questions = [
  "Who joined the brand program?",
  "Who is active?",
  "Who is progressing?",
  "Who earned rewards?",
  "Who is ready for the next message?",
  "Which achievements should the brand recognize?",
];

const css = `
  .fp-page, .fp-page * { box-sizing: border-box; }
  .fp-page {
    min-height: 100vh;
    overflow-x: hidden;
    background: ${COLORS.base};
    color: ${COLORS.text};
    font-family: 'Outfit', system-ui, sans-serif;
  }
  .fp-page a { color: inherit; text-decoration: none; }
  .fp-page ::selection { background: ${COLORS.signal}; color: ${COLORS.base}; }
  ${athleteForwardChromeCss}

  .fp-hero {
    position: relative;
    min-height: 86svh;
    overflow: hidden;
    background: ${COLORS.base};
  }
  .fp-hero-image {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(90deg, rgba(5,5,5,0.88), rgba(5,5,5,0.32) 56%, rgba(5,5,5,0.68)),
      linear-gradient(180deg, rgba(5,5,5,0.34), rgba(5,5,5,0.12) 48%, rgba(5,5,5,0.90)),
      url('/founder-preview/road-cycling-mountain-motion-01-4x3.jpg');
    background-position: center;
    background-size: cover;
    filter: grayscale(1) contrast(1.08);
  }
  .fp-hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.026) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 8px 8px;
    opacity: 0.35;
    pointer-events: none;
  }
  .fp-hero-content {
    position: relative;
    z-index: 1;
    display: grid;
    min-height: 86svh;
    align-content: end;
    width: min(1160px, calc(100% - 36px));
    margin: 0 auto;
    padding: 124px 0 64px;
  }
  .fp-label {
    margin: 0 0 18px;
    color: ${COLORS.signal};
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    line-height: 1.4;
  }
  .fp-hero h1,
  .fp-section h2,
  .fp-final h2 {
    margin: 0;
    color: ${COLORS.textBright};
    font-family: 'Bebas Neue', sans-serif;
    font-weight: 400;
    letter-spacing: 0;
  }
  .fp-hero h1 {
    max-width: 880px;
    font-size: 96px;
    line-height: 0.9;
  }
  .fp-subhead {
    max-width: 760px;
    margin: 22px 0 0;
    color: rgba(232,232,232,0.92);
    font-size: 24px;
    font-weight: 700;
    line-height: 1.28;
  }
  .fp-lead {
    max-width: 720px;
    margin: 22px 0 0;
    color: rgba(232,232,232,0.84);
    font-size: 19px;
    line-height: 1.62;
  }
  .fp-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 28px;
  }
  .fp-button {
    display: inline-flex;
    min-height: 48px;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255,255,255,0.22);
    border-radius: 8px;
    padding: 13px 17px;
    background: rgba(5,5,5,0.52);
    color: ${COLORS.text};
    font-size: 13px;
    font-weight: 800;
    text-align: center;
  }
  .fp-button-primary {
    border-color: ${COLORS.signal};
    background: ${COLORS.signal};
    color: #000000;
  }
  .fp-page a.fp-button-primary {
    color: #000000;
  }
  .fp-button-primary:hover,
  .fp-button-primary:focus-visible {
    color: #000000;
  }
  .fp-section {
    border-top: 1px solid ${COLORS.surfaceBorder};
    background: ${COLORS.base};
  }
  .fp-section.alt { background: ${COLORS.surface}; }
  .fp-section-inner {
    width: min(1160px, calc(100% - 36px));
    margin: 0 auto;
    padding: 78px 0;
  }
  .fp-section h2 {
    max-width: 760px;
    font-size: 56px;
    line-height: 0.98;
  }
  .fp-section-copy {
    max-width: 740px;
    margin: 18px 0 0;
    color: ${COLORS.text};
    font-size: 18px;
    line-height: 1.68;
  }
  .fp-pillar-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-top: 36px;
  }
  .fp-card {
    min-height: 220px;
    border: 1px solid ${COLORS.surfaceBorder};
    border-radius: 8px;
    background: ${COLORS.surfaceRaised};
    padding: 24px;
  }
  .fp-card h3,
  .fp-step strong {
    margin: 0;
    color: ${COLORS.textBright};
    font-family: 'Bebas Neue', sans-serif;
    font-size: 32px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1;
  }
  .fp-card p,
  .fp-step p,
  .fp-question-list li,
  .fp-final p {
    color: ${COLORS.text};
    font-size: 16px;
    line-height: 1.62;
  }
  .fp-step-list {
    display: grid;
    gap: 14px;
    margin-top: 36px;
  }
  .fp-step {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 24px;
    align-items: start;
    border-top: 1px solid ${COLORS.surfaceBorder};
    padding-top: 18px;
  }
  .fp-question-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin: 34px 0 0;
    padding: 0;
    list-style: none;
  }
  .fp-question-list li {
    border-left: 2px solid ${COLORS.signal};
    padding-left: 14px;
  }
  .fp-final {
    border-top: 1px solid ${COLORS.surfaceBorder};
    background: ${COLORS.base};
  }
  .fp-final-inner {
    width: min(980px, calc(100% - 36px));
    margin: 0 auto;
    padding: 82px 0;
    text-align: center;
  }
  .fp-final h2 {
    font-size: 58px;
    line-height: 0.98;
  }
  .fp-final p {
    max-width: 680px;
    margin: 18px auto 0;
  }
  .fp-final .fp-actions { justify-content: center; }

  @media (max-width: 820px) {
    .fp-hero-content { padding: 116px 0 46px; }
    .fp-hero h1 { font-size: 64px; }
    .fp-subhead { font-size: 20px; }
    .fp-lead { font-size: 17px; }
    .fp-section-inner { padding: 62px 0; }
    .fp-section h2,
    .fp-final h2 { font-size: 44px; }
    .fp-pillar-grid,
    .fp-question-list { grid-template-columns: 1fr; }
    .fp-step { grid-template-columns: 1fr; gap: 8px; }
  }
`;

export default function FounderPreviewPage() {
  return (
    <main className="fp-page">
      <style>{css}</style>
      <AthleteForwardHeader ctaHref="/contact" ctaLabel="Contact" />

      <section className="fp-hero">
        <div className="fp-hero-image" aria-hidden="true" />
        <div className="fp-hero-grid" aria-hidden="true" />
        <div className="fp-hero-content">
          <p className="fp-label">Founder preview</p>
          <h1>PROOF turns verified effort into earned loyalty.</h1>
          <p className="fp-subhead">
            Infrastructure for athletic brands to recognize, reward, and retain
            athletes.
          </p>
          <p className="fp-lead">
            PROOF is purpose-built effort-based loyalty infrastructure for
            athletes and the brands that serve them.
          </p>
          <div className="fp-actions">
            <a className="fp-button fp-button-primary" href={CONTACT_HREF}>
              Start a conversation
            </a>
          </div>
        </div>
      </section>

      <section className="fp-section">
        <div className="fp-section-inner">
          <p className="fp-label">The shift</p>
          <h2>PROOF starts when the athlete has done the work.</h2>
          <p className="fp-section-copy">
            Most promotional marketing starts when there is something to sell.
            PROOF helps athletic brands build loyalty rooted in athletic
            identity and achievement by showing up after real participation.
          </p>
        </div>
      </section>

      <section className="fp-section alt">
        <div className="fp-section-inner">
          <p className="fp-label">What PROOF enables</p>
          <h2>Verified effort, earned recognition, owned loyalty.</h2>
          <div className="fp-pillar-grid">
            {pillars.map((pillar) => (
              <article className="fp-card" key={pillar.title}>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fp-section">
        <div className="fp-section-inner">
          <p className="fp-label">How it works</p>
          <h2>A PROOF-powered brand program connects effort to action.</h2>
          <div className="fp-step-list">
            {steps.map(([title, body]) => (
              <div className="fp-step" key={title}>
                <strong>{title}</strong>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fp-section alt">
        <div className="fp-section-inner">
          <p className="fp-label">For athletic brands</p>
          <h2>Loyalty built around participation, not purchase frequency alone.</h2>
          <p className="fp-section-copy">
            Athletic brands care about more than transactions. Their strongest
            customers are the athletes who train, show up, improve, compete, and
            identify with the life the brand represents.
          </p>
          <ul className="fp-question-list">
            {questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="fp-section">
        <div className="fp-section-inner">
          <p className="fp-label">Example</p>
          <h2>An athletic apparel brand can recognize achievement as it happens.</h2>
          <p className="fp-section-copy">
            Athletes join the brand's PROOF-powered program, connect a trusted
            activity source, earn progress for eligible activity, unlock
            milestone rewards, and receive timely brand messages when they hit
            achievements worth recognizing.
          </p>
          <p className="fp-section-copy">
            PROOF is in friendly launch testing while preparing for broader
            athletic-brand conversations. It starts with Strava-verified
            activity and is built to add additional trusted effort sources over
            time.
          </p>
        </div>
      </section>

      <section className="fp-final">
        <div className="fp-final-inner">
          <h2>Building community around real athletic participation?</h2>
          <p>
            PROOF would welcome a conversation about how verified effort could
            support your loyalty, retention, and engagement strategy.
          </p>
          <div className="fp-actions">
            <a className="fp-button fp-button-primary" href={CONTACT_HREF}>
              Start a conversation
            </a>
          </div>
        </div>
      </section>

      <AthleteForwardFooter />
    </main>
  );
}
