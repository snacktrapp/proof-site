"use client";

import Link from "next/link";

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
  signalGlow: "rgba(200,255,0,0.25)",
  steel: "#8BA0B4",
  effort: "#FF3D00",
};

/* ─── Small components ────────────────────────────────────────────── */

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: COLORS.muted,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(32px, 5vw, 48px)",
        color: COLORS.textBright,
        lineHeight: 1,
        letterSpacing: "-0.005em",
        margin: "0 0 24px 0",
      }}
    >
      {children}
    </h2>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 17,
        color: COLORS.subtle,
        lineHeight: 1.7,
        maxWidth: 680,
        margin: "0 0 40px 0",
      }}
    >
      {children}
    </p>
  );
}

function Body({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 15,
        color: COLORS.text,
        lineHeight: 1.7,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.9em",
        color: COLORS.signal,
        background: COLORS.signalDim,
        padding: "1px 6px",
        borderRadius: 4,
      }}
    >
      {children}
    </span>
  );
}

function SmallLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 11,
        fontWeight: 700,
        color: COLORS.subtle,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );
}

function Section({
  children,
  background = "transparent",
  style,
}: {
  children: React.ReactNode;
  background?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      style={{
        background,
        borderTop: `1px solid ${COLORS.surfaceBorder}`,
        ...style,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "88px 24px" }}>{children}</div>
    </section>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.surfaceBorder}`,
        borderRadius: 12,
        padding: 28,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Step({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "56px 1fr",
        gap: 20,
        paddingBottom: 28,
        borderBottom: `1px solid ${COLORS.surfaceBorder}`,
        marginBottom: 28,
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14,
          color: COLORS.signal,
          letterSpacing: "0.1em",
          paddingTop: 4,
        }}
      >
        {num}
      </div>
      <div>
        <h3
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.textBright,
            margin: "0 0 10px 0",
            letterSpacing: "-0.005em",
          }}
        >
          {title}
        </h3>
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15,
            color: COLORS.text,
            lineHeight: 1.7,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────── */

export default function HowItWorksPage() {
  return (
    <main style={{ background: COLORS.base, color: COLORS.text, minHeight: "100vh" }}>
      {/* Top nav (minimal) */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: COLORS.base,
          borderBottom: `1px solid ${COLORS.surfaceBorder}`,
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: COLORS.text,
            textDecoration: "none",
          }}
        >
          ← PROOF
        </Link>
        <Link
          href="/#waitlist"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: COLORS.base,
            background: COLORS.signal,
            padding: "8px 18px",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          Get early access
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 24px 56px", borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Kicker>How PROOF works</Kicker>
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 10vw, 96px)",
              color: COLORS.textBright,
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              margin: "0 0 24px 0",
              maxWidth: 1000,
            }}
          >
            PROOF is infrastructure.<br />
            Your storefront is the destination.
          </h1>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 18,
              color: COLORS.subtle,
              lineHeight: 1.65,
              maxWidth: 680,
            }}
          >
            Athletes connect Strava once. Every verified activity credits their lifetime profile
            and your brand&apos;s program. When they cross a threshold, they&apos;re rewarded on
            your storefront, in your voice — not ours. Here&apos;s the full story, from install
            to first redemption.
          </p>
        </div>
      </section>

      {/* 1. The integration pattern */}
      <Section>
        <Kicker>01 · The integration pattern</Kicker>
        <H2>Earn globally. Redeem per-brand.</H2>
        <Lead>
          An athlete&apos;s lifetime effort and identity travel with them across every brand
          program on PROOF. Their reward balance at your brand starts at zero the day they
          connect — and every subsequent mile at any sport you allow credits your program.
          Each brand funds their own rewards out of their own margin.
        </Lead>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginTop: 20,
          }}
        >
          <Card>
            <SmallLabel>PROOF layer</SmallLabel>
            <Body>
              Universal. GPS-verified. Effort-normalized. One athlete, one lifetime PROOF-miles
              count across every sport and every brand they&apos;ve ever connected to.
            </Body>
          </Card>
          <Card style={{ borderColor: COLORS.signal, background: COLORS.signalDim }}>
            <SmallLabel>Brand layer — yours</SmallLabel>
            <Body>
              Your sport allowlist, your milestone ladder, your welcome bonus rules, your
              rewards, your email voice. PROOF provides the verified data; you decide
              what it unlocks.
            </Body>
          </Card>
          <Card>
            <SmallLabel>The athlete</SmallLabel>
            <Body>
              One Strava connection powers every brand they care about. Their PROOF tier and
              three-signal profile travel. Their brand-specific rewards don&apos;t — each
              relationship earns fresh.
            </Body>
          </Card>
        </div>
      </Section>

      {/* 2. On your storefront */}
      <Section background={COLORS.surface}>
        <Kicker>02 · On your storefront</Kicker>
        <H2>No PROOF-branded page. Ever.</H2>
        <Lead>
          Your athletes live inside your storefront. PROOF writes their tier, brand PM, rewards,
          and progress directly into Shopify customer metafields. A small Liquid section
          renders that data in your theme&apos;s voice — same typography, same colors, same
          design language as the rest of your site.
        </Lead>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <Card>
            <SmallLabel>Install footprint</SmallLabel>
            <Body>
              Brand&apos;s developer downloads a bundle from the PROOF portal:{" "}
              <Mono>proof-loyalty-account.liquid</Mono>,{" "}
              <Mono>proof-loyalty.css</Mono>,{" "}
              <Mono>proof-loyalty.js</Mono>. Drop into theme&apos;s{" "}
              <Mono>sections/</Mono> folder. Add one reference to the customer account template.
              Publish.
            </Body>
          </Card>
          <Card>
            <SmallLabel>Time to install</SmallLabel>
            <Body>
              Two to four hours for an experienced Shopify developer. We provide step-by-step
              install docs per theme. Not an App Block, not a JavaScript widget — native Liquid
              rendering metafield data.
            </Body>
          </Card>
          <Card>
            <SmallLabel>Brand-themed by default</SmallLabel>
            <Body>
              CSS scoped to the loyalty section with variable overrides — your theme&apos;s
              colors, fonts, spacing all inherited. We ship sensible defaults; override
              anything you want.
            </Body>
          </Card>
        </div>

        <Body style={{ color: COLORS.muted, fontSize: 14 }}>
          Post month 9–12: one-click install via Shopify App Store. Hand-install until then.
        </Body>
      </Section>

      {/* 3. Athlete experience */}
      <Section>
        <Kicker>03 · The athlete experience</Kicker>
        <H2>From connection to redemption.</H2>
        <Lead>
          Four moments define the experience. Each one happens on your storefront, in your voice.
          PROOF is invisible — the athlete sees your brand, your tier names (if you&apos;ve
          customized), your emails, your discount at checkout.
        </Lead>

        <div style={{ marginTop: 32 }}>
          <Step num="01" title="Signup — from your site">
            Athlete clicks <strong>Connect Strava</strong> on your Riders Club landing page.
            Strava OAuth runs. PROOF matches or creates the athlete record, creates your brand
            connection, fires the welcome bonus immediately, and starts importing ride history
            asynchronously. They land back on your account page with their loyalty section
            populated. They never see a PROOF signup step.
          </Step>
          <Step num="02" title="Daily — while they ride">
            Every Strava-verified activity flows through PROOF&apos;s 9-gate fraud pipeline.
            Clean activities convert to PROOF miles via the Effort Index and credit two ledgers:
            lifetime PM (all sports, forever) and your brand PM (only the sports you allow,
            only during your active relationship). Invisible background work.
          </Step>
          <Step num="03" title="Milestone — when they cross a threshold">
            Your ladder fires. PROOF sends a webhook to your ESP with the milestone details
            and a signed <Mono>loyalty_redeem_url</Mono>. Your flow sends the athlete an email
            in your brand voice. Their account-page loyalty section updates in real time with
            the new active reward.
          </Step>
          <Step num="04" title="Redemption — when they're ready to shop">
            Athlete clicks <strong>Shop with your reward</strong> — from wallet or email. At
            that moment, PROOF creates a single-use Shopify discount code locked to their
            customer email, then deep-links them into your storefront with the code
            pre-applied. No code to copy. No code to leak. One click to checkout.
          </Step>
        </div>
      </Section>

      {/* 4. Rewards toolkit */}
      <Section>
        <Kicker>04 · The rewards toolkit</Kicker>
        <H2>Three ways to reward effort.</H2>
        <Lead>
          Milestones build long-term engagement. Challenges drive campaign-scale activity.
          Anniversary bonuses celebrate retention. Three primitives — all running through the
          same credit pipeline, all surfacing on the athlete&apos;s account page in your
          theme&apos;s voice.
        </Lead>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
            marginTop: 20,
          }}
        >
          <Card style={{ padding: 36 }}>
            <div style={{ color: COLORS.signal, marginBottom: 20 }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="4" y="26" width="8" height="10" />
                <rect x="16" y="18" width="8" height="18" />
                <rect x="28" y="10" width="8" height="26" />
              </svg>
            </div>
            <SmallLabel>Milestones</SmallLabel>
            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 28,
              color: COLORS.textBright, lineHeight: 1.05, margin: "0 0 16px 0",
            }}>
              Permanent thresholds. Lifetime value.
            </h3>
            <Body style={{ fontSize: 14, marginBottom: 14 }}>
              Set a ladder of brand PM thresholds — 500, 1,000, 2,500, 5,000, and beyond. Each
              crossing issues a reward the athlete keeps. The backbone of your program.
            </Body>
            <Body style={{ fontSize: 13, color: COLORS.subtle, marginBottom: 14 }}>
              <strong style={{ color: COLORS.text }}>Reward types:</strong> store credit (Shopify
              discount), free shipping, early drop access, or custom Shopify tag for your own
              theme / Klaviyo logic.<br />
              <strong style={{ color: COLORS.text }}>Immutable:</strong> once issued, a reward
              stays — even if you later change the ladder. Config changes are forward-only by
              default, with a per-change &quot;apply retroactively?&quot; toggle.<br />
              <strong style={{ color: COLORS.text }}>Expiry per milestone:</strong> you set how
              long an earned reward stays active. Expired rewards don&apos;t auto-rollover.
            </Body>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.muted,
              letterSpacing: "0.08em",
            }}>
              Permanent · Per-brand PM threshold · Issued on crossing
            </div>
          </Card>

          <Card style={{ padding: 36 }}>
            <div style={{ color: COLORS.signal, marginBottom: 20 }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="20" cy="24" r="12" />
                <line x1="20" y1="24" x2="20" y2="16" />
                <line x1="20" y1="24" x2="26" y2="20" />
                <line x1="16" y1="6" x2="24" y2="6" />
                <line x1="20" y1="6" x2="20" y2="12" />
              </svg>
            </div>
            <SmallLabel>Challenges</SmallLabel>
            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 28,
              color: COLORS.textBright, lineHeight: 1.05, margin: "0 0 16px 0",
            }}>
              Time-bound, window-scoped goals.
            </h3>
            <Body style={{ fontSize: 14, marginBottom: 14 }}>
              Launch a December Miles campaign, a &quot;beat your March&quot; challenge, or a
              first-30-days-after-join improvement goal. Conditions built on total PM, total
              miles (optionally filtered by sport), ride count, unique days, or improvement
              vs. prior period.
            </Body>
            <Body style={{ fontSize: 13, color: COLORS.subtle, marginBottom: 14 }}>
              <strong style={{ color: COLORS.text }}>Window types:</strong> calendar month,
              fixed date range, or rolling N days from enrollment.<br />
              <strong style={{ color: COLORS.text }}>Eligibility:</strong> optional gates on
              minimum pace, tier, or lifetime PM. Athletes below the gate never see the
              challenge — no tempting unreachable rewards.<br />
              <strong style={{ color: COLORS.text }}>Rewards:</strong> same three types as
              milestones — credit, bonus PM, or perk tag. No new reward plumbing.
            </Body>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.muted,
              letterSpacing: "0.08em",
            }}>
              draft → scheduled → active → ended → archived
            </div>
          </Card>

          <Card style={{ padding: 36 }}>
            <div style={{ color: COLORS.signal, marginBottom: 20 }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="20" cy="20" r="14" />
                <line x1="20" y1="6" x2="20" y2="8" />
                <line x1="34" y1="20" x2="32" y2="20" />
                <line x1="20" y1="34" x2="20" y2="32" />
                <line x1="6" y1="20" x2="8" y2="20" />
                <circle cx="20" cy="6" r="3" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <SmallLabel>Anniversary bonus</SmallLabel>
            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 28,
              color: COLORS.textBright, lineHeight: 1.05, margin: "0 0 16px 0",
            }}>
              One month a year, unconditional.
            </h3>
            <Body style={{ fontSize: 14, marginBottom: 14 }}>
              During each athlete&apos;s connection-anniversary month with your brand, every
              brand PM they earn is multiplied by the value you set. No pace gate. No tier
              gate. A celebration of the year they&apos;ve been with you.
            </Body>
            <Body style={{ fontSize: 13, color: COLORS.subtle, marginBottom: 14 }}>
              <strong style={{ color: COLORS.text }}>Configurable:</strong> 1.5× / 2× / 2.5× /
              3×, default 2×.<br />
              <strong style={{ color: COLORS.text }}>Per-brand, per-athlete:</strong> athletes
              connected to multiple brands get a separate anniversary month for each, naturally
              spread across the calendar.<br />
              <strong style={{ color: COLORS.text }}>Win-back moment:</strong> a lapsed athlete
              who returns during their anniversary month is precisely the outcome the bonus is
              designed to encourage — the multiplier makes their return feel rewarded.
            </Body>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.muted,
              letterSpacing: "0.08em",
            }}>
              Month 12 · Month 24 · Month 36 · forever
            </div>
          </Card>
        </div>

        <Body style={{ marginTop: 28, fontSize: 14, color: COLORS.muted }}>
          All three primitives live in the same brand dashboard. All reuse the same credit
          pipeline. All surface on the athlete&apos;s account page in your theme&apos;s voice —
          no PROOF-branded interruption between the earn and the reward.
        </Body>
      </Section>

      {/* 5. Webhook events */}
      <Section background={COLORS.surface}>
        <Kicker>05 · The data flow</Kicker>
        <H2>Five events. One canonical interface.</H2>
        <Lead>
          PROOF fires HMAC-signed webhooks to the ESP endpoint you configure in the portal.
          ESP-agnostic — Klaviyo, Mailchimp, Sendgrid, Customer.io, or a generic webhook into
          Zapier/Make. You build the flows in your ESP, author the copy in your voice.
          PROOF is the signal layer; delivery is yours.
        </Lead>

        <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
          {[
            {
              name: "proof.athlete_connected",
              desc: "Fires the moment an athlete connects your program. Welcome bonus already credited. Perfect for your welcome email flow.",
            },
            {
              name: "proof.activity_verified",
              desc: "Every verified activity that credits your brand. Optional — most brands subscribe for weekly-digest flows but not per-activity email.",
            },
            {
              name: "proof.milestone_reached",
              desc: "Threshold crossing. Payload includes reward value, expiry, restrictions, and the signed redemption URL. The primary reward email trigger.",
            },
            {
              name: "proof.pace_changed",
              desc: "Athlete moves into or out of a pace category (Steady, Moderate, etc.). Use for engagement flows without writing your own pace logic.",
            },
            {
              name: "proof.tier_advanced",
              desc: "Athlete crosses a PROOF tier threshold (Recruit → Contender → Rival → Elite → Legend → Myth → Apex, plus infinite Marks above Apex). Recognition moment. No economic unlock required.",
            },
          ].map((e) => (
            <Card key={e.name} style={{ padding: "20px 24px" }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  color: COLORS.signal,
                  marginBottom: 6,
                }}
              >
                {e.name}
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  color: COLORS.text,
                  lineHeight: 1.6,
                }}
              >
                {e.desc}
              </div>
            </Card>
          ))}
        </div>

        <Body style={{ marginTop: 24, fontSize: 14, color: COLORS.muted }}>
          Every event carries an HMAC signature verifiable with your secret. Your webhook
          delivery dashboard shows every event, success/failure, retry status, and lets you
          inspect payloads.
        </Body>
      </Section>

      {/* 6. Verification */}
      <Section>
        <Kicker>06 · Verification</Kicker>
        <H2>Every activity, 9 gates.</H2>
        <Lead>
          Every Strava activity PROOF ingests passes through 9 independent fraud checks before
          crediting an athlete. GPS-only at launch — session sports without GPS (strength,
          yoga) aren&apos;t verifiable and aren&apos;t accepted. The PROOF Effort Index (PEI)
          normalizes effort across sports so every brand program uses a single comparable unit.
        </Lead>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          <Card>
            <SmallLabel>9 fraud gates</SmallLabel>
            <Body style={{ fontSize: 14 }}>
              Ownership · GPS presence · Not manual · Sport allowlist · Minimum distance ·
              Maximum speed ceiling · Daily activity cap · Velocity anomaly · Idempotency.
              Silent drops — athlete sees nothing; brand isn&apos;t charged.
            </Body>
          </Card>
          <Card>
            <SmallLabel>PEI — multi-sport</SmallLabel>
            <Body style={{ fontSize: 14 }}>
              1 road cycling mile = 1 PM. Running, swimming, rowing, hiking, trail running,
              MTB, gravel — all convert via sport-specific multipliers. Your brand picks which
              sports credit your program.
            </Body>
          </Card>
          <Card>
            <SmallLabel>Identity rails</SmallLabel>
            <Body style={{ fontSize: 14 }}>
              Strava at launch. Garmin Connect around month 5–6 post-launch. Apple Health,
              Peloton, Whoop, Zwift on the roadmap. Athletes can layer multiple rails to the
              same identity.
            </Body>
          </Card>
        </div>
      </Section>

      {/* 7. Security & privacy */}
      <Section background={COLORS.surface}>
        <Kicker>07 · Security &amp; privacy</Kicker>
        <H2>Scoped by default.</H2>

        <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
          <Card style={{ padding: "20px 24px" }}>
            <SmallLabel>Brand isolation</SmallLabel>
            <Body style={{ fontSize: 14 }}>
              Your portal session can only read and write data scoped to your brand. Database
              row-level security enforces it at the query layer — not a UI convention. Your
              athletes&apos; data stays yours. Other brands&apos; data stays theirs.
            </Body>
          </Card>
          <Card style={{ padding: "20px 24px" }}>
            <SmallLabel>Discount code security</SmallLabel>
            <Body style={{ fontSize: 14 }}>
              Every code is single-use and locked to the athlete&apos;s email at Shopify via{" "}
              <Mono>prerequisite_customer_ids</Mono>. If someone forwards a code, it won&apos;t
              apply — only the earning athlete can redeem it.
            </Body>
          </Card>
          <Card style={{ padding: "20px 24px" }}>
            <SmallLabel>Webhook integrity</SmallLabel>
            <Body style={{ fontSize: 14 }}>
              Every outgoing webhook carries an HMAC signature. Reject anything unsigned. Your
              ESP endpoint verifies with a secret you set at integration time.
            </Body>
          </Card>
          <Card style={{ padding: "20px 24px" }}>
            <SmallLabel>Audit log</SmallLabel>
            <Body style={{ fontSize: 14 }}>
              Every admin action in the brand portal is logged with actor, timestamp, and
              reason. Config changes, manual refunds, suspensions — full history available
              for compliance.
            </Body>
          </Card>
        </div>
      </Section>

      {/* 8. Getting started / timeline */}
      <Section>
        <Kicker>08 · Getting started</Kicker>
        <H2>Two to three weeks, concierge.</H2>
        <Lead>
          We&apos;re onboarding a small number of founding brands. Every wave-2 brand gets
          hands-on setup from the PROOF team — not self-serve onboarding. Here&apos;s the
          shape.
        </Lead>

        <div style={{ marginTop: 32 }}>
          <Step num="Day 1–3" title="Discovery">
            Short call to understand your brand, your customers, your current loyalty motion,
            your sports mix. We co-design your milestone ladder, welcome bonus rules, and sport
            allowlist. You get portal access to review.
          </Step>
          <Step num="Week 1" title="Setup">
            Shopify OAuth connection, Liquid template install on your customer account page,
            ESP webhook configuration. PROOF admin reviews your program design. You author
            your email flows in your ESP, using our cookbook for event-by-event starter copy.
          </Step>
          <Step num="Week 2" title="Test mode">
            Inject synthetic activities through your full pipeline via the portal&apos;s test
            button. Verify webhook delivery, email flows, metafield rendering, discount
            generation, and deep-link redemption end-to-end. Iterate until you&apos;re happy.
          </Step>
          <Step num="Go live" title="Launch day">
            PROOF approves the <Mono>active</Mono> transition. Your Riders Club is live.
            Athletes can connect from your site. Every verified ride earns your program. You
            see members, activities, and rewards flow in real time from the brand dashboard.
          </Step>
        </div>
      </Section>

      {/* CTA */}
      <section
        style={{
          borderTop: `1px solid ${COLORS.surfaceBorder}`,
          padding: "88px 24px",
          textAlign: "center",
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${COLORS.signalDim} 0%, transparent 70%)`,
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Kicker>Ready?</Kicker>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(40px, 7vw, 64px)",
              color: COLORS.textBright,
              lineHeight: 1,
              letterSpacing: "-0.005em",
              margin: "0 0 20px 0",
            }}
          >
            Get early access program.
          </h2>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 16,
              color: COLORS.subtle,
              lineHeight: 1.65,
              margin: "0 0 32px 0",
            }}
          >
            Tell us about your brand and we&apos;ll be in touch within two business days.
          </p>
          <Link
            href="/#waitlist"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.base,
              background: COLORS.signal,
              padding: "14px 32px",
              borderRadius: 8,
              textDecoration: "none",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "inline-block",
            }}
          >
            Get early access →
          </Link>
        </div>
      </section>
    </main>
  );
}
