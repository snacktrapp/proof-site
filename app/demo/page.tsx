"use client";

import Link from "next/link";

/*
 * PROOF demo / platform-review page.
 *
 * Purpose: single URL that serves three audiences —
 *  1. Strava API review team (evaluating PROOF for API access)
 *  2. Garmin Connect review team (future — same evaluation framework)
 *  3. Brand prospects and sales conversations
 *
 * Live OAuth integration is deployed at https://proof.verifiedeffort.com
 * Reviewers can request credentialed access to test the flow end-to-end.
 *
 * CONFIGURE BEFORE SENDING TO REVIEWERS:
 *  - The REVIEWER_EMAIL constant below must resolve to a monitored inbox
 *    (Brian's inbox is fine — just confirm the alias is forwarding).
 *  - OAuth scope list in the "How PROOF uses Strava data" section must match
 *    what Noah's deployed app actually requests. Verify against the live
 *    integration before sharing this URL.
 */

const REVIEWER_EMAIL = "brian@verifiedeffort.com";
const LIVE_APP_URL = "https://proof.verifiedeffort.com";

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
  stravaOrange: "#FC4C02",
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

function Section({
  id,
  children,
  background = "transparent",
  style,
}: {
  id?: string;
  children: React.ReactNode;
  background?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      id={id}
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

function Surface({
  route,
  title,
  description,
  imageSrc,
  imageAlt,
}: {
  route: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <div
      style={{
        marginBottom: 28,
        paddingBottom: 28,
        borderBottom: `1px solid ${COLORS.surfaceBorder}`,
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: COLORS.signal,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        {route}
      </div>
      <h3
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 28,
          color: COLORS.textBright,
          lineHeight: 1.1,
          letterSpacing: "-0.005em",
          margin: "0 0 14px 0",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 15,
          color: COLORS.text,
          lineHeight: 1.7,
          margin: imageSrc ? "0 0 20px 0" : 0,
          maxWidth: 860,
        }}
      >
        {description}
      </p>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt ?? title}
          style={{
            width: "100%",
            borderRadius: 12,
            border: `1px solid ${COLORS.surfaceBorder}`,
            display: "block",
          }}
        />
      )}
    </div>
  );
}

function AudienceLink({
  label,
  href,
  sub,
}: {
  label: string;
  href: string;
  sub: string;
}) {
  return (
    <a
      href={href}
      style={{
        display: "block",
        padding: "18px 22px",
        border: `1px solid ${COLORS.surfaceBorder}`,
        borderRadius: 12,
        background: COLORS.surface,
        textDecoration: "none",
        transition: "all 0.2s ease",
      }}
    >
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: COLORS.textBright,
          marginBottom: 4,
          letterSpacing: "-0.005em",
        }}
      >
        {label} →
      </div>
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 13,
          color: COLORS.subtle,
        }}
      >
        {sub}
      </div>
    </a>
  );
}

/* ─── Page ────────────────────────────────────────────────────────── */

export default function DemoPage() {
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
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 18,
            letterSpacing: "0.08em",
            color: COLORS.text,
            textDecoration: "none",
          }}
        >
          ← PROOF
        </Link>
        <a
          href={LIVE_APP_URL}
          target="_blank"
          rel="noopener noreferrer"
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
          Try the live OAuth
        </a>
      </nav>

      {/* Hero + orientation */}
      <section style={{ padding: "80px 24px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Kicker>Platform demo · Reviewer orientation</Kicker>
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 10vw, 88px)",
              color: COLORS.textBright,
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              margin: "0 0 24px 0",
              maxWidth: 1000,
            }}
          >
            PROOF is verified-effort<br />
            loyalty infrastructure.
          </h1>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 18,
              color: COLORS.subtle,
              lineHeight: 1.65,
              maxWidth: 720,
              marginBottom: 40,
            }}
          >
            Brands reward their athletic customers for real, GPS-verified activity.
            Athletes connect Strava once. Every verified mile, stroke, or stride earns
            loyalty currency at every enrolled brand. This page orients platform
            reviewers and sales prospects to what PROOF does and how it uses Strava
            and Garmin data.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 12,
              marginBottom: 40,
            }}
          >
            <AudienceLink
              label="Strava reviewer"
              href="#data-handling"
              sub="OAuth scopes, data handling, brand compliance"
            />
            <AudienceLink
              label="Garmin reviewer"
              href="#data-handling"
              sub="Same data-handling framework — Garmin integration Q3"
            />
            <AudienceLink
              label="Brand evaluating PROOF"
              href="#athlete-experience"
              sub="Athlete + brand experience walkthrough"
            />
          </div>

          {/* Live OAuth CTA block */}
          <div
            style={{
              background: COLORS.signalDim,
              border: `1px solid ${COLORS.signal}44`,
              borderRadius: 12,
              padding: "24px 28px",
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: "1 1 400px" }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: COLORS.signal,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Live OAuth integration
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 15,
                  color: COLORS.text,
                  lineHeight: 1.6,
                }}
              >
                A deployed build of PROOF with working Strava OAuth is available at{" "}
                <a
                  href={LIVE_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: COLORS.signal, textDecoration: "none", borderBottom: `1px solid ${COLORS.signal}` }}
                >
                  proof.verifiedeffort.com
                </a>
                . Credentialed access for review available on request — email{" "}
                <a href={`mailto:${REVIEWER_EMAIL}`} style={{ color: COLORS.signal, textDecoration: "none" }}>
                  {REVIEWER_EMAIL}
                </a>
                .
              </div>
            </div>
            <a
              href={LIVE_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: COLORS.base,
                background: COLORS.signal,
                padding: "12px 24px",
                borderRadius: 8,
                textDecoration: "none",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Open live app →
            </a>
          </div>
        </div>
      </section>

      {/* What PROOF is (plain-language overview) */}
      <Section id="what-proof-is">
        <Kicker>What PROOF does</Kicker>
        <H2>Effort becomes loyalty currency.</H2>
        <Lead>
          Athletic brands (apparel, nutrition, gear) want to reward their best
          customers for being athletes — not just for buying things. PROOF makes
          that practical.
        </Lead>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
          <Card>
            <Kicker>The athlete</Kicker>
            <Body>
              Connects their Strava account once — through the storefront of any
              enrolled brand. PROOF reads their verified activities, normalizes
              effort across sports (the PROOF Effort Index — PEI), and credits
              their lifetime profile plus every brand&apos;s loyalty ledger the
              sport qualifies for. Thresholds crossed = rewards earned at the
              brand, redeemable on the brand&apos;s own storefront.
            </Body>
          </Card>
          <Card>
            <Kicker>The brand</Kicker>
            <Body>
              Installs PROOF into their Shopify storefront. Configures sport
              allowlist, reward thresholds, welcome bonus rules. Athletes who
              connect via their site see a loyalty section on their account page
              rendered in the brand&apos;s theme. When an athlete crosses a
              threshold, PROOF issues a single-use Shopify discount code and
              fires a webhook to the brand&apos;s email platform so the brand can
              notify the athlete in their own voice.
            </Body>
          </Card>
          <Card>
            <Kicker>PROOF&apos;s role</Kicker>
            <Body>
              Infrastructure. We verify the effort, maintain the cross-brand
              identity ledger, and fire webhook events. We don&apos;t send
              brand-voiced emails. We don&apos;t own the athlete&apos;s
              storefront experience. We don&apos;t sell data — the athlete&apos;s
              activity data is used only to compute PROOF miles and credit brand
              ledgers for brands the athlete has explicitly enrolled with.
            </Body>
          </Card>
        </div>
      </Section>

      {/* Athlete experience walkthrough */}
      <Section id="athlete-experience">
        <Kicker>01 · Athlete experience</Kicker>
        <H2>One connection. Every verified activity. Every enrolled brand.</H2>
        <Lead>
          What an athlete sees from sign-up through redemption. Every surface
          described below is live at{" "}
          <a
            href={LIVE_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: COLORS.signal, textDecoration: "none", borderBottom: `1px solid ${COLORS.signal}` }}
          >
            proof.verifiedeffort.com
          </a>
          .
        </Lead>

        <Surface
          route="Brand storefront · Connect Strava"
          title="Strava OAuth, inside the brand's experience"
          description="The athlete is on the brand's Shopify storefront, signed into their customer account. They click 'Connect Strava' on the loyalty section. Strava's standard consent screen loads with the scopes PROOF requests and the PROOF brand clearly identified. On approval, Strava returns the access token to PROOF, which kicks off a background historical backfill and fires the brand's welcome bonus immediately — before the backfill completes, so there's no blank-state waiting period for the athlete."
        />
        <Surface
          route="proof.verifiedeffort.com/dashboard"
          title="Athlete dashboard — the cross-brand home"
          description="After connecting, the athlete's PROOF home is a utility surface: a compact status strip (tier, Lifetime PM, pace category, trend direction) sits at the top, followed by connected brands with per-brand progress to next milestone, available rewards, recent verified activities through the 9-gate pipeline, and identity controls. The athlete manages their Strava connection and can revoke it from here at any time. Lifetime PM never resets — the permanent ledger is anchored to this surface."
        />
        <Surface
          route="proof.verifiedeffort.com/athlete/[handle]"
          title="Public profile — portable identity across the network"
          description="Opt-in public profile with a trophy-treatment tier display, verified-effort narrative, multi-sport breakdown, and enrolled brands. This is the athlete's identity that travels with them: every brand in the PROOF network sees this profile when the athlete connects. Never shows individual activity details, routes, or photos — only the aggregated signal (tier, Lifetime PM, pace, trend, sport mix)."
        />
        <Surface
          route="Brand storefront · Account page"
          title="Loyalty section rendered in the brand's theme"
          description="What an athlete sees on the brand's Shopify customer account page. The loyalty section is a Liquid template reading from Shopify customer metafields that PROOF writes — not an embedded PROOF iframe. The brand owns the rendering: typography, color, voice. PROOF passes the data (brand PM, progress to next milestone, active rewards with restrictions, pace category as 'member status') and the brand styles it. When the athlete clicks 'Shop' on a reward, PROOF lazy-generates a single-use Shopify discount code tied to their email and deep-links them into checkout with the discount pre-applied. No codes to copy, no codes to leak."
        />
      </Section>

      {/* Brand experience walkthrough */}
      <Section id="brand-experience" background={COLORS.surface}>
        <Kicker>02 · Brand experience</Kicker>
        <H2>Configure once. Operate continuously.</H2>
        <Lead>
          What a brand sees in the PROOF operator dashboard. Brand operators
          configure the program, monitor member health, and iterate on
          thresholds without writing code.
        </Lead>

        <Surface
          route="/brand/overview"
          title="Program health at a glance"
          description="Top-level operator view: active members on a 90-day window (the billing metric), verification success rate across the fraud pipeline, rewards issued, redemption rate, activity volume by sport. Brands get real-time visibility into whether the loyalty investment is delivering — and a case-study-ready view of revenue attributed to redeemed rewards."
        />
        <Surface
          route="/brand/members"
          title="Segmented member list"
          description="Filterable by tier (Recruit through Apex), pace category, trend direction, connection date, and brand PM. Click through to an individual member for their full activity and reward history with this brand. Brands never see an athlete's Strava credentials or raw activity data — only the aggregated PROOF miles credited to their program."
        />
        <Surface
          route="/brand/rewards"
          title="Threshold-to-reward ladder"
          description="Brand configures the milestone ladder (e.g., 500 brand PM → $10 credit; 1,000 → $20; 2,500 → $35 + free shipping; 5,000 → $50 + free shipping). Brand's budget, brand's economics. PROOF executes against the configuration — fires a webhook when an athlete crosses a threshold, generates the Shopify discount code on redemption. Thresholds iterate without code changes."
        />
        <Surface
          route="/brand/integrations"
          title="ESP-agnostic webhook delivery"
          description="Brand pastes their ESP webhook endpoint and API key (Klaviyo, Mailchimp, Sendgrid, Customer.io, or any HTTP endpoint), tests the connection with a sample payload, then builds reward-delivery email flows in their own ESP in their own brand voice. PROOF fires 5 canonical webhook events (athlete_connected, activity_verified, milestone_reached, pace_changed, tier_advanced) signed with HMAC. Brand authors the emails; PROOF authors the data."
        />
      </Section>

      {/* Data handling / technical transparency */}
      <Section id="data-handling">
        <Kicker>03 · How PROOF uses Strava &amp; Garmin data</Kicker>
        <H2>Verification rail, not identity surface.</H2>
        <Lead>
          Transparency on the scopes we request, what we do with the data, how
          long we retain it, and how an athlete revokes access. This section is
          the primary subject of platform-review evaluations.
        </Lead>

        {/* OAuth scopes */}
        <Card style={{ marginBottom: 20 }}>
          <Kicker>OAuth scopes requested</Kicker>
          <Body style={{ marginBottom: 16 }}>
            PROOF requests the minimum scopes necessary to compute verified
            effort. Scopes requested from Strava:
          </Body>
          <ul
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 15,
              color: COLORS.text,
              lineHeight: 1.7,
              margin: 0,
              paddingLeft: 20,
            }}
          >
            <li style={{ marginBottom: 10 }}>
              <Mono>read</Mono> — basic profile information (athlete name, ID) required
              to associate verified activities with a PROOF account.
            </li>
            <li style={{ marginBottom: 10 }}>
              <Mono>activity:read_all</Mono> — read all activities including private
              ones, required to compute lifetime PROOF miles and pace accurately.
              Private activities are used for computation only; they are never
              displayed publicly and never shared with brands.
            </li>
            <li style={{ marginBottom: 0 }}>
              <Mono>profile:read_all</Mono> — full profile, including multi-sport
              preferences, used to correctly apply the PROOF Effort Index across
              sports the athlete actively records.
            </li>
          </ul>
          <Body style={{ marginTop: 16, fontSize: 13, color: COLORS.subtle }}>
            We do not request <Mono>activity:write</Mono> or <Mono>profile:write</Mono>{" "}
            scopes. PROOF never modifies Strava activities or profile data.
          </Body>
        </Card>

        {/* Data usage */}
        <Card style={{ marginBottom: 20 }}>
          <Kicker>What we do with activity data</Kicker>
          <Body style={{ marginBottom: 10 }}>
            Each verified activity from a connected athlete is processed through
            a 9-gate fraud-and-validity pipeline (GPS sanity, sport-specific
            velocity ceilings, daily cap enforcement, duplicate detection,
            geographic plausibility). Activities that clear the pipeline are
            converted into PROOF miles via the PROOF Effort Index — a
            sport-normalization table calibrated on MET-minutes per unit of
            distance.
          </Body>
          <Body>
            Credited PROOF miles update two ledgers: the athlete&apos;s lifetime
            profile (visible to them on proof.verifiedeffort.com and to brands
            they&apos;ve enrolled with) and the brand-specific ledger for every
            active brand connection where the sport is in the brand&apos;s
            allowlist. Brands never see raw Strava activity data — only aggregated
            PROOF miles credited to their program.
          </Body>
        </Card>

        {/* Data retention */}
        <Card style={{ marginBottom: 20 }}>
          <Kicker>Data retention</Kicker>
          <Body style={{ marginBottom: 10 }}>
            Activity metadata (activity ID, start time, sport, distance,
            computed PROOF miles, verification status) is retained indefinitely
            while the athlete&apos;s PROOF account is active — this data
            constitutes the athlete&apos;s permanent effort ledger, which is a
            core feature of the platform.
          </Body>
          <Body style={{ marginBottom: 10 }}>
            Raw Strava API response bodies are retained for 90 days for
            debugging and fraud-pipeline audit, then pruned. Only the computed
            results (normalized PROOF miles, verification status) persist beyond
            that window.
          </Body>
          <Body>
            PROOF does not store, process, or index third-party user content
            such as photos, route GPX traces, or comments attached to Strava
            activities. We read only the metadata needed to verify and normalize
            the effort.
          </Body>
        </Card>

        {/* Disconnect behavior */}
        <Card style={{ marginBottom: 20 }}>
          <Kicker>Revocation &amp; deletion</Kicker>
          <Body style={{ marginBottom: 10 }}>
            Athletes can revoke PROOF&apos;s Strava access from two places: the
            PROOF athlete dashboard at proof.verifiedeffort.com, and Strava&apos;s
            own authorized-apps settings. Both revoke the OAuth token
            immediately.
          </Body>
          <Body style={{ marginBottom: 10 }}>
            On revocation: no further activities are ingested. The
            athlete&apos;s historical ledger is preserved (so that past verified
            effort remains recognized at enrolled brands) but marked as{" "}
            <Mono>rail_disconnected</Mono>. If the athlete separately requests
            account deletion via proof.verifiedeffort.com (distinct from
            revoking Strava access), all personal data and activity records are
            deleted within 30 days, per standard GDPR/CCPA handling.
          </Body>
          <Body>
            Brand operators never see the athlete&apos;s Strava credentials,
            tokens, or raw activity data at any point in the integration.
          </Body>
        </Card>

        {/* No resale, no ads */}
        <Card>
          <Kicker>What PROOF does not do with the data</Kicker>
          <ul
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 15,
              color: COLORS.text,
              lineHeight: 1.7,
              margin: 0,
              paddingLeft: 20,
            }}
          >
            <li style={{ marginBottom: 8 }}>
              We do not sell or share activity data with advertisers, data
              brokers, or any third party outside the athlete&apos;s explicitly
              enrolled brand connections.
            </li>
            <li style={{ marginBottom: 8 }}>
              We do not train machine-learning models on athlete activity data.
            </li>
            <li style={{ marginBottom: 8 }}>
              We do not build social features, leaderboards, or public feeds on
              top of Strava activity data. The public athlete profile is
              opt-in and shows only aggregated stats — never individual activity
              details.
            </li>
            <li style={{ marginBottom: 0 }}>
              We do not modify, write to, or delete anything in the
              athlete&apos;s Strava account.
            </li>
          </ul>
        </Card>
      </Section>

      {/* Strava brand attribution + compliance */}
      <Section id="brand-compliance" background={COLORS.surface}>
        <Kicker>04 · Platform attribution &amp; compliance</Kicker>
        <H2>Powered by Strava. Powered by Garmin Connect.</H2>
        <Lead>
          PROOF complies with the Strava Brand Guidelines and the Garmin Connect
          Developer Program terms. Verification-rail attribution is shown
          wherever activity data is displayed.
        </Lead>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 16,
          }}
        >
          <Card>
            <Kicker>Attribution placement</Kicker>
            <Body style={{ marginBottom: 12 }}>
              On every athlete-facing surface where activity data is rendered,
              PROOF displays a &quot;Powered by Strava&quot; attribution with the
              correct trademark styling. On the brand account page (rendered on
              the brand&apos;s storefront), the attribution appears in the
              loyalty section footer.
            </Body>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: COLORS.muted,
                padding: "12px 16px",
                background: COLORS.base,
                border: `1px solid ${COLORS.surfaceBorder}`,
                borderRadius: 8,
              }}
            >
              Activity data verified via{" "}
              <span style={{ color: COLORS.stravaOrange, fontWeight: 700 }}>STRAVA</span>
              {" · "}
              <span style={{ color: COLORS.subtle }}>Powered by Strava</span>
            </div>
          </Card>

          <Card>
            <Kicker>No implied endorsement</Kicker>
            <Body>
              PROOF marketing materials, dashboards, and athlete-facing copy
              never imply that Strava or Garmin endorses, sponsors, or
              partners with PROOF. The integration is described as a
              verification rail — a technical data source — never as a
              partnership or co-brand relationship.
            </Body>
          </Card>

          <Card>
            <Kicker>Logo usage</Kicker>
            <Body>
              PROOF uses the Strava wordmark in its official trademark form
              (Strava orange, unmodified) wherever required. We do not use the
              Strava arc/S mark on marketing materials. Usage is confined to
              attribution contexts and &quot;Connect Strava&quot; OAuth buttons.
            </Body>
          </Card>

          <Card>
            <Kicker>Data handling compliance</Kicker>
            <Body>
              PROOF&apos;s data handling complies with the Strava API Agreement,
              Strava&apos;s data handling requirements, and Garmin Connect Developer
              Program terms. Athlete data is stored in encrypted databases, access
              is role-limited within PROOF, and audit logging covers all data reads.
            </Body>
          </Card>
        </div>
      </Section>

      {/* Contact + next steps */}
      <Section id="contact">
        <Kicker>05 · Reviewer contact</Kicker>
        <H2>Questions, credentials, or clarifications.</H2>
        <Lead>
          If you&apos;re reviewing PROOF for API access or a brand partnership and
          need more detail on anything on this page, or want credentialed access
          to touch the live OAuth flow, reach out directly. Response within 24
          hours on weekdays.
        </Lead>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          <Card>
            <Kicker>Email</Kicker>
            <a
              href={`mailto:${REVIEWER_EMAIL}`}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: COLORS.signal,
                textDecoration: "none",
              }}
            >
              {REVIEWER_EMAIL}
            </a>
          </Card>
          <Card>
            <Kicker>Live app</Kicker>
            <a
              href={LIVE_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: COLORS.signal,
                textDecoration: "none",
                wordBreak: "break-all",
              }}
            >
              proof.verifiedeffort.com
            </a>
          </Card>
          <Card>
            <Kicker>Marketing site</Kicker>
            <Link
              href="/"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: COLORS.signal,
                textDecoration: "none",
              }}
            >
              verifiedeffort.com
            </Link>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer
        style={{
          padding: "32px 24px",
          borderTop: `1px solid ${COLORS.surfaceBorder}`,
          textAlign: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: COLORS.muted,
          letterSpacing: "0.1em",
        }}
      >
        PROOF · Verified effort loyalty infrastructure · Activity data powered by{" "}
        <span style={{ color: COLORS.stravaOrange, fontWeight: 700 }}>STRAVA</span>
      </footer>
    </main>
  );
}
