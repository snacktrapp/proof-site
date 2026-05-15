"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { AthleteForwardHeader } from "./AthleteForwardHeader";
import { athleteForwardChromeCss } from "./athleteForwardChrome";

const COLORS = {
  base: "#050505",
  surface: "#0A0A0A",
  surfaceRaised: "#111111",
  surfaceBorder: "#1A1A1A",
  muted: "#555555",
  subtle: "#888888",
  text: "#E8E8E8",
  textBright: "#FFFFFF",
  signal: "#C8FF00",
  signalDim: "rgba(200,255,0,0.08)",
  steel: "#8BA0B4",
  effort: "#FF3D00",
};

const APP_REGISTER_BRAND_URL = "https://proof.verifiedeffort.com/auth/register?role=brand";
const APP_REGISTER_ATHLETE_URL = "https://proof.verifiedeffort.com/auth/register?role=athlete";

const detailCss = `
  .afd-page, .afd-page * { box-sizing: border-box; }
  .afd-page {
    min-height: 100vh;
    overflow-x: hidden;
    background: ${COLORS.base};
    color: ${COLORS.text};
    font-family: 'Outfit', system-ui, sans-serif;
  }
  .afd-page a { color: inherit; text-decoration: none; }
  .afd-page ::selection { background: ${COLORS.signal}; color: ${COLORS.base}; }
  ${athleteForwardChromeCss}
  .afd-hero {
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    background: ${COLORS.surface};
  }
  .afd-hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(5,5,5,0.86), rgba(5,5,5,0.24) 54%, rgba(5,5,5,0.36)),
      linear-gradient(180deg, rgba(5,5,5,0.06), rgba(5,5,5,0.54)),
      var(--afd-hero-image);
    background-position: var(--afd-hero-position, center);
    background-size: cover;
    filter: grayscale(1) contrast(1.08) brightness(1.24);
    opacity: 0.96;
  }
  .afd-hero::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.026) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 7px 7px;
    mix-blend-mode: overlay;
    pointer-events: none;
  }
  .afd-hero-inner,
  .afd-section-inner {
    position: relative;
    z-index: 1;
    width: min(1180px, calc(100% - 36px));
    margin: 0 auto;
  }
  .afd-hero-inner {
    display: grid;
    gap: 20px;
    min-height: 68svh;
    align-content: end;
    padding: clamp(86px, 12vh, 132px) 0 clamp(58px, 9vh, 92px);
  }
  .afd-kicker,
  .afd-eyebrow,
  .afd-mono {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .afd-kicker {
    width: fit-content;
    border-left: 2px solid ${COLORS.signal};
    padding-left: 13px;
    color: ${COLORS.signal};
  }
  .afd-hero h1,
  .afd-section h2,
  .afd-final h2 {
    margin: 0;
    color: ${COLORS.textBright};
    font-family: 'Bebas Neue', sans-serif;
    font-weight: 400;
    letter-spacing: 0;
  }
  .afd-hero h1 {
    max-width: 930px;
    font-size: clamp(72px, 11vw, 166px);
    line-height: 0.84;
    text-wrap: balance;
  }
  .afd-hero p,
  .afd-lede {
    width: min(690px, 100%);
    max-width: 690px;
    margin: 0;
    color: rgba(232,232,232,0.82);
    font-size: clamp(17px, 1.8vw, 20px);
    line-height: 1.58;
  }
  .afd-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 8px;
  }
  .afd-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 10px;
    padding: 13px 17px;
    background: rgba(255,255,255,0.045);
    color: ${COLORS.text};
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-align: center;
    text-transform: uppercase;
  }
  .afd-page a.afd-button { color: ${COLORS.text}; }
  .afd-button-primary {
    border-color: ${COLORS.signal};
    background: ${COLORS.signal};
    color: ${COLORS.base};
  }
  .afd-page a.afd-button-primary { color: ${COLORS.base}; }
  .afd-section {
    border-top: 1px solid rgba(255,255,255,0.08);
    background: ${COLORS.base};
  }
  .afd-section-inner {
    padding: clamp(68px, 8vw, 108px) 0;
  }
  .afd-section-alt { background: ${COLORS.surface}; }
  .afd-eyebrow {
    margin-bottom: 13px;
    color: ${COLORS.signal};
  }
  .afd-section h2,
  .afd-final h2 {
    max-width: 840px;
    font-size: clamp(54px, 7.2vw, 104px);
    line-height: 0.88;
    text-wrap: balance;
  }
  .afd-lede {
    margin-top: 19px;
    color: ${COLORS.subtle};
    font-size: 18px;
    line-height: 1.64;
  }
  .afd-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-top: 34px;
  }
  .afd-grid-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .afd-card {
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    background:
      linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015)),
      ${COLORS.surface};
    padding: 22px;
  }
  .afd-card-highlight {
    border-color: rgba(200,255,0,0.5);
    background: ${COLORS.signalDim};
  }
  .afd-card h3 {
    margin: 0 0 10px;
    color: ${COLORS.textBright};
    font-size: 20px;
    line-height: 1.18;
  }
  .afd-card p,
  .afd-card li {
    color: ${COLORS.subtle};
    font-size: 15px;
    line-height: 1.54;
  }
  .afd-card p { margin: 0; }
  .afd-card ul {
    display: grid;
    gap: 9px;
    margin: 18px 0 0;
    padding: 0;
    list-style: none;
  }
  .afd-card li::before {
    content: "";
    display: inline-block;
    width: 7px;
    height: 7px;
    margin-right: 10px;
    border-radius: 50%;
    background: ${COLORS.signal};
    vertical-align: 1px;
  }
  .afd-plan-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
    margin-top: 36px;
  }
  .afd-plan {
    display: grid;
    gap: 18px;
    align-content: start;
    min-height: 430px;
  }
  .afd-plan-price {
    color: ${COLORS.textBright};
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(42px, 5vw, 58px);
    line-height: 0.92;
  }
  .afd-plan-note {
    color: ${COLORS.muted};
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    line-height: 1.5;
    text-transform: uppercase;
  }
  .afd-table-wrap {
    margin-top: 52px;
    overflow-x: auto;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    background: ${COLORS.surface};
  }
  .afd-table {
    width: 100%;
    min-width: 840px;
    border-collapse: collapse;
  }
  .afd-table th,
  .afd-table td {
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding: 13px 12px;
    text-align: center;
  }
  .afd-table th:first-child,
  .afd-table td:first-child {
    text-align: left;
  }
  .afd-table th {
    color: ${COLORS.muted};
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .afd-table td {
    color: ${COLORS.subtle};
    font-size: 13px;
    line-height: 1.45;
  }
  .afd-table td:first-child {
    color: ${COLORS.text};
  }
  .afd-table .afd-yes { color: ${COLORS.signal}; }
  .afd-step-list {
    display: grid;
    gap: 14px;
    margin-top: 34px;
  }
  .afd-step {
    display: grid;
    grid-template-columns: 86px minmax(0, 1fr);
    gap: 18px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    background: rgba(255,255,255,0.025);
    padding: 20px;
  }
  .afd-step-number {
    color: ${COLORS.signal};
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .afd-step h3 {
    margin: 0 0 7px;
    color: ${COLORS.textBright};
    font-size: 19px;
  }
  .afd-step p {
    max-width: 760px;
    margin: 0;
    color: ${COLORS.subtle};
    line-height: 1.58;
  }
  .afd-note {
    margin-top: 28px;
    border-left: 3px solid ${COLORS.signal};
    border-radius: 8px;
    background: rgba(255,255,255,0.04);
    padding: 18px 20px;
    color: ${COLORS.text};
    line-height: 1.56;
  }
  .afd-final {
    background:
      linear-gradient(110deg, rgba(200,255,0,0.1), transparent 42%),
      ${COLORS.surface};
  }
  .afd-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 22px clamp(18px, 4vw, 48px);
    color: ${COLORS.muted};
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .afd-footer-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 14px;
  }
  .afd-footer a:hover { color: ${COLORS.signal}; }
  @media (max-width: 1120px) {
    .afd-plan-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
  @media (max-width: 900px) {
    .afd-grid,
    .afd-grid-2,
    .afd-plan-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 640px) {
    .afd-hero h1 {
      max-width: 100%;
      font-size: clamp(44px, 12vw, 54px);
      text-wrap: auto;
      overflow-wrap: break-word;
    }
    .afd-hero::before {
      background-position: var(--afd-hero-mobile-position, var(--afd-hero-position, center));
    }
    .afd-hero-inner,
    .afd-section-inner {
      width: min(390px, 100vw);
      max-width: min(390px, 100vw);
      padding-left: 18px;
      padding-right: 18px;
    }
    .afd-hero-inner { margin: 0; }
    .afd-section-inner { margin: 0; }
    .afd-hero h1,
    .afd-section h2,
    .afd-final h2,
    .afd-hero p,
    .afd-lede {
      width: calc(100vw - 36px);
      max-width: min(354px, calc(100vw - 36px));
    }
    .afd-hero p,
    .afd-lede,
    .afd-card p,
    .afd-card li,
    .afd-step p,
    .afd-note {
      max-width: 100%;
      overflow-wrap: break-word;
    }
    .afd-hero p,
    .afd-lede {
      justify-self: start;
      width: min(318px, calc(100vw - 36px));
      max-width: min(318px, calc(100vw - 36px));
      font-size: 15px;
    }
    .afd-section h2,
    .afd-final h2 {
      font-size: clamp(46px, 13vw, 60px);
      overflow-wrap: break-word;
    }
    .afd-grid,
    .afd-grid-2,
    .afd-plan-grid { grid-template-columns: 1fr; }
    .afd-step { grid-template-columns: 1fr; }
    .afd-actions { flex-direction: column; }
    .afd-button { width: 100%; }
    .afd-footer {
      align-items: flex-start;
      flex-direction: column;
    }
    .afd-footer-links { justify-content: flex-start; }
  }
`;

function ConceptNav({ current }: { current: "home" | "how" | "pricing" }) {
  return <AthleteForwardHeader current={current} />;
}

function Hero({
  kicker,
  title,
  children,
  actions,
  image = "/concepts/athlete-forward/hero-field.jpg",
  imagePosition = "center",
  mobileImagePosition,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  image?: string;
  imagePosition?: string;
  mobileImagePosition?: string;
}) {
  const heroStyle = {
    "--afd-hero-image": `url(${image})`,
    "--afd-hero-position": imagePosition,
    "--afd-hero-mobile-position": mobileImagePosition || imagePosition,
  } as CSSProperties;

  return (
    <header className="afd-hero" style={heroStyle}>
      <div className="afd-hero-inner">
        <div className="afd-kicker">{kicker}</div>
        <h1>{title}</h1>
        <p>{children}</p>
        {actions ? <div className="afd-actions">{actions}</div> : null}
      </div>
    </header>
  );
}

function Section({
  eyebrow,
  title,
  children,
  alt = false,
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  alt?: boolean;
}) {
  return (
    <section className={`afd-section${alt ? " afd-section-alt" : ""}`}>
      <div className="afd-section-inner">
        {eyebrow ? <div className="afd-eyebrow">{eyebrow}</div> : null}
        {title ? <h2>{title}</h2> : null}
        {children}
      </div>
    </section>
  );
}

function Card({
  children,
  highlight = false,
  className = "",
}: {
  children: ReactNode;
  highlight?: boolean;
  className?: string;
}) {
  return <div className={`afd-card${highlight ? " afd-card-highlight" : ""} ${className}`}>{children}</div>;
}

function Shell({
  current,
  children,
}: {
  current: "home" | "how" | "pricing";
  children: ReactNode;
}) {
  return (
    <main className="afd-page">
      <style>{detailCss}</style>
      <ConceptNav current={current} />
      {children}
      <footer className="afd-footer">
        <span>2026 PROOF Verified Effort, Inc.</span>
        <span className="afd-footer-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/methodology">Methodology</Link>
        </span>
      </footer>
    </main>
  );
}

const plans = [
  {
    name: "Developer",
    price: "Free",
    members: "Up to 100 active members",
    bestFor: "For teams exploring verification, profile data, and the PROOF effort model.",
    features: [
      "Core verification gates",
      "PROOF tiers and public profiles",
      "Basic dashboard",
      "Strava integration",
      "Documentation",
    ],
  },
  {
    name: "Starter",
    price: "$199/mo",
    members: "Up to 1,000 active members",
    bestFor: "For a first live rewards program with milestones, challenges, and email events.",
    features: [
      "Everything in Developer",
      "Program dashboard",
      "Webhook events for ESP integration",
      "Milestone and challenge configuration",
      "Email support",
    ],
  },
  {
    name: "Scale",
    price: "$499/mo",
    members: "Up to 10,000 active members",
    bestFor: "For brands actively running earned-reward campaigns across a growing athlete base.",
    features: [
      "Everything in Starter",
      "Cohort insights and exports",
      "Multi-platform integrations on roadmap",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Growth",
    price: "$899/mo",
    members: "Up to 25,000 active members",
    bestFor: "For larger programs that need deeper reporting, exports, and campaign iteration.",
    features: [
      "Everything in Scale",
      "Cross-brand reporting on roadmap",
      "Program health insights on roadmap",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    members: "Unlimited members",
    bestFor: "Custom contracts, support, and launch needs.",
    features: [
      "Everything in Growth",
      "Custom contract and SLA",
      "Named account manager",
    ],
  },
];

const comparisonRows = [
  ["Core verification gates", "Yes", "Yes", "Yes", "Yes", "Yes"],
  ["PROOF Verified Effort badge", "Yes", "Yes", "Yes", "Yes", "Yes"],
  ["PROOF tiers and public profiles", "Yes", "Yes", "Yes", "Yes", "Yes"],
  ["Basic dashboard", "Yes", "Yes", "Yes", "Yes", "Yes"],
  ["Webhook events for ESP integration", "-", "Yes", "Yes", "Yes", "Yes"],
  ["Advanced fraud detection", "-", "Yes", "Yes", "Yes", "Yes"],
  ["Program dashboard", "-", "Yes", "Yes", "Yes", "Yes"],
  ["Milestone and challenge configuration", "-", "Yes", "Yes", "Yes", "Yes"],
  ["Fitness platform: Strava", "Yes", "Yes", "Yes", "Yes", "Yes"],
  ["Additional fitness platforms", "-", "-", "Roadmap", "Roadmap", "Roadmap"],
  ["Cohort insights and exports", "-", "-", "Yes", "Yes", "Yes"],
  ["Cross-brand reporting", "-", "-", "-", "Roadmap", "Roadmap"],
  ["Program health insights", "-", "-", "-", "Roadmap", "Roadmap"],
  ["Custom contract and SLA", "-", "-", "-", "-", "Yes"],
  ["Support", "Docs", "Email", "Priority", "Priority", "Named account manager"],
];

export function AthleteForwardPricing() {
  return (
    <Shell current="pricing">
      <Hero
        kicker="Pricing"
        title="Flat pricing. No reward tax."
        image="/concepts/athlete-forward/hero-swim.jpg"
        imagePosition="center center"
        mobileImagePosition="62% center"
        actions={
          <>
            <a className="afd-button afd-button-primary" href={APP_REGISTER_BRAND_URL}>
              Start a brand program
            </a>
            <a className="afd-button" href="mailto:brian@verifiedeffort.com">
              Talk to PROOF
            </a>
          </>
        }
      >
        PROOF is priced as a platform subscription, not a cut of the reward. No revenue share,
        no per-redemption fee, and no penalty when athletes move more.
      </Hero>

      <Section eyebrow="Plans" title="Choose the right starting point.">
        <p className="afd-lede">
          Start with the athlete volume and program complexity you need today. As your verified
          effort program grows, PROOF scales with active members, reporting needs, and support level.
        </p>
        <div className="afd-note">
          <strong style={{ color: COLORS.textBright }}>Early partner terms are available.</strong>{" "}
          If you are launching your first earned-reward program, we can tailor onboarding around
          your sport category, expected athlete volume, and first campaign.
        </div>

        <div className="afd-plan-grid">
          {plans.map((plan) => (
            <Card key={plan.name} highlight={plan.highlight} className="afd-plan">
              <div>
                <div className="afd-mono" style={{ color: plan.highlight ? COLORS.signal : COLORS.steel }}>
                  {plan.name}
                </div>
                <div className="afd-plan-price">{plan.price}</div>
                <div className="afd-plan-note">{plan.members}</div>
              </div>
              <p>{plan.bestFor}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="afd-note">
          Active members means athletes with at least one verified activity in a trailing 90-day
          window. If a brand exceeds its tier, PROOF continues verifying activity while billing
          moves to the right plan or an overage agreement.
        </div>
      </Section>

      <Section eyebrow="Comparison" title="Make evaluation easy.">
        <p className="afd-lede">
          Every plan includes the verified effort foundation. Higher tiers add program tooling,
          reporting, integrations, and support for larger athlete communities.
        </p>
        <div className="afd-table-wrap">
          <table className="afd-table">
            <thead>
              <tr>
                {["Feature", "Developer", "Starter", "Scale", "Growth", "Enterprise"].map((heading) => (
                  <th key={heading}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={`${row[0]}-${index}`} className={cell === "Yes" ? "afd-yes" : undefined}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="Packaging principle" title="Price the platform, not the athlete.">
        <div className="afd-grid afd-grid-2">
          <Card>
            <h3>No revenue share</h3>
            <p>
              Brands fund their own rewards, but PROOF does not take a cut of redemptions.
              That keeps the reward economics clean and easier to model.
            </p>
          </Card>
          <Card>
            <h3>No per-activity surprise</h3>
            <p>
              The value is the verified effort ledger and reward engine. Pricing scales by
              active member volume and support needs, not by how often athletes move.
            </p>
          </Card>
        </div>
      </Section>

      <section className="afd-section afd-final">
        <div className="afd-section-inner">
          <div className="afd-eyebrow">Next step</div>
          <h2>Build a program around verified effort.</h2>
          <p className="afd-lede">
            Tell us the sports you care about, the athletes you want to reach, and the reward
            moment you want to create first. We will help map the right plan and launch path.
          </p>
          <div className="afd-actions">
            <a className="afd-button afd-button-primary" href="mailto:brian@verifiedeffort.com">
              Talk to PROOF
            </a>
            <Link className="afd-button" href="/">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}

export function AthleteForwardHowItWorks() {
  return (
    <Shell current="how">
      <Hero
        kicker="How PROOF works"
        title="Effort becomes earned loyalty."
        image="/concepts/athlete-forward/hero-rain.jpg"
        imagePosition="center center"
        mobileImagePosition="64% center"
        actions={
          <>
            <a className="afd-button afd-button-primary" href={APP_REGISTER_BRAND_URL}>
              Build a reward program
            </a>
            <Link className="afd-button" href="/pricing">
              View pricing
            </Link>
          </>
        }
      >
        PROOF verifies athlete activity, converts it into brand-specific progress, and triggers
        rewards when real effort crosses the thresholds you set.
      </Hero>

      <Section eyebrow="The model" title="One athlete identity. Brand-specific rewards.">
        <p className="afd-lede">
          PROOF separates the universal effort ledger from each brand's reward program. The
          athlete can build a portable record of verified movement, while each brand decides
          which sports count, which thresholds matter, and what each reward unlocks.
        </p>
        <div className="afd-grid">
          <Card>
            <h3>PROOF layer</h3>
            <p>
              Device-recorded activity, verification gates, lifetime PROOF Miles, pace,
              trend, and a portable athlete identity.
            </p>
          </Card>
          <Card highlight>
            <h3>Brand layer</h3>
            <p>
              Sport allowlist, challenge windows, milestone ladders, reward values,
              Shopify discounts, and customer messaging.
            </p>
          </Card>
          <Card>
            <h3>Athlete experience</h3>
            <p>
              Athletes join through participating brands, connect Strava, and see their
              earned progress in the context of that brand.
            </p>
          </Card>
        </div>
      </Section>

      <Section eyebrow="The path" title="From brand invite to reward.">
        <p className="afd-lede">
          The flow feels simple to the athlete because PROOF handles the details behind the scenes.
        </p>
        <div className="afd-step-list">
          <div className="afd-step">
            <div className="afd-step-number">01 / join</div>
            <div>
              <h3>The brand starts the relationship</h3>
              <p>
                Athletes join through a brand page, invite, or slug. PROOF carries that brand
                context through account creation and Strava connection, then creates the brand
                relationship automatically.
              </p>
            </div>
          </div>
          <div className="afd-step">
            <div className="afd-step-number">02 / verify</div>
            <div>
              <h3>Strava makes effort measurable</h3>
              <p>
                Activities are imported and checked against sport, distance, velocity, date,
                and integrity rules before they can credit PROOF Miles or brand PM.
              </p>
            </div>
          </div>
          <div className="afd-step">
            <div className="afd-step-number">03 / qualify</div>
            <div>
              <h3>Challenge windows use athlete-local time</h3>
              <p>
                Fixed-date, monthly, and rolling windows count eligible activities in the
                athlete's local timezone. Brand managers choose plain calendar dates, and
                PROOF handles the exact technical boundaries.
              </p>
            </div>
          </div>
          <div className="afd-step">
            <div className="afd-step-number">04 / reward</div>
            <div>
              <h3>Rewards trigger with context</h3>
              <p>
                Milestones and challenges can issue bonus PM, Shopify discounts, or events
                for email flows. The athlete gets a reward because real activity crossed a
                real threshold.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Controls" title="What a brand manager configures." alt>
        <p className="afd-lede">
          PROOF gives brand teams the controls they need to shape an earned-reward program
          without turning campaign setup into engineering work.
        </p>
        <div className="afd-grid">
          <Card>
            <h3>Sports that count</h3>
            <p>Pick the activity types that match the brand category. PROOF verifies more than the brand has to reward.</p>
          </Card>
          <Card>
            <h3>Windows and thresholds</h3>
            <p>Set the date range, rolling period, monthly cadence, PM target, activity count, or improvement goal.</p>
          </Card>
          <Card>
            <h3>Reward economics</h3>
            <p>Choose reward value, expiration, Shopify discount behavior, and the customer-facing reward label.</p>
          </Card>
          <Card>
            <h3>Eligibility gates</h3>
            <p>Optional gates can use tier, pace, lifetime PM, or brand PM when a campaign is intended for a specific athlete segment.</p>
          </Card>
          <Card>
            <h3>Lifecycle moments</h3>
            <p>Send events to email and marketing tools when athletes join, qualify, earn, redeem, or approach expiration.</p>
          </Card>
          <Card>
            <h3>Brand presentation</h3>
            <p>Keep the athlete touchpoint in the brand's language, reward strategy, and visual world.</p>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Athlete experience" title="Simple for athletes. Useful for brands.">
        <p className="afd-lede">
          Athletes do not have to understand the infrastructure. They join a brand, connect
          Strava, keep moving, and see earned progress show up where the brand relationship lives.
        </p>
        <div className="afd-grid">
          <Card highlight>
            <h3>Connect once</h3>
            <p>
              A single Strava connection powers verified activity across participating brand
              relationships.
            </p>
          </Card>
          <Card>
            <h3>Earn progress</h3>
            <p>
              Eligible activities credit PROOF Miles, brand PM, challenge progress, and
              milestone status automatically.
            </p>
          </Card>
          <Card>
            <h3>Redeem rewards</h3>
            <p>
              When the athlete qualifies, PROOF can trigger the reward moment through Shopify,
              email, or the brand's owned customer experience.
            </p>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Accuracy" title="Built for precise qualification." alt>
        <div className="afd-grid">
          <Card>
            <h3>Local-time windows</h3>
            <p>
              Activity start time and timezone are preserved so challenge qualification matches
              the athlete's real calendar day.
            </p>
          </Card>
          <Card>
            <h3>Inclusive dates for teams</h3>
            <p>
              Brand managers select natural date ranges, such as May 14 through May 19. PROOF
              applies the correct underlying boundaries.
            </p>
          </Card>
          <Card>
            <h3>Auditable rewards</h3>
            <p>
              Reward records show why they fired: challenge, threshold, activity window,
              PM credited, code generation, redemption, expiration, or voiding.
            </p>
          </Card>
        </div>
      </Section>

      <section className="afd-section afd-final">
        <div className="afd-section-inner">
          <div className="afd-eyebrow">Next step</div>
          <h2>Launch the first earned-reward moment.</h2>
          <p className="afd-lede">
            Start with one brand, one sport category, and one reward athletes can earn through
            verified movement. PROOF handles the ledger, qualification, and reward trigger.
          </p>
          <div className="afd-actions">
            <Link className="afd-button afd-button-primary" href="/pricing">
              Compare plans
            </Link>
            <a className="afd-button" href={APP_REGISTER_ATHLETE_URL}>
              Join as an athlete
            </a>
            <Link className="afd-button" href="/">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
