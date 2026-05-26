import Link from "next/link";
import type { CSSProperties } from "react";
import { AthleteForwardHeader } from "./AthleteForwardHeader";
import { athleteForwardChromeCss } from "./athleteForwardChrome";

const COLORS = {
  base: "#050505",
  surface: "#0A0A0A",
  surfaceRaised: "#111111",
  muted: "#555555",
  subtle: "#888888",
  text: "#E8E8E8",
  textBright: "#FFFFFF",
  signal: "#C8FF00",
  signalDim: "rgba(200,255,0,0.08)",
  steel: "#8BA0B4",
};

const APP_REGISTER_URL = "https://proof.verifiedeffort.com/auth/register";
const APP_REGISTER_BRAND_URL = "https://proof.verifiedeffort.com/auth/register?role=brand";
const APP_REGISTER_ATHLETE_URL = "https://proof.verifiedeffort.com/auth/register?role=athlete";
const APP_LOGIN_URL = "https://proof.verifiedeffort.com/auth/login";

export type AuthPreviewVariant = "start" | "register" | "athlete" | "brand" | "login";

const variantContent = {
  start: {
    kicker: "Get started",
    title: "Start with the right door.",
    body:
      "Athletes earn progress through verified movement. Brands build reward programs around the athletes already living their category.",
    image: "/concepts/athlete-forward/hero-field.jpg",
    panelTitle: "Choose your path",
    panelBody: "We will send you into the PROOF app with the setup path that matches how you plan to use it.",
  },
  register: {
    kicker: "Create account",
    title: "Choose how you are using PROOF.",
    body:
      "Athletes can connect activity and join rewards. Brands can build programs around verified effort.",
    image: "/concepts/athlete-forward/hero-trace.jpg",
    panelTitle: "Create your account",
    panelBody: "Select a role to continue with the right setup path.",
  },
  athlete: {
    kicker: "Athlete signup",
    title: "Turn movement into earned rewards.",
    body:
      "Create your athlete account, connect Strava, and let verified activity count toward brand progress when you qualify.",
    image: "/concepts/athlete-forward/hero-field.jpg",
    panelTitle: "Create athlete account",
    panelBody: "Strava connection comes next so your effort can be verified.",
  },
  brand: {
    kicker: "Brand signup",
    title: "Build a reward program around real effort.",
    body:
      "Create a brand account to configure sports, challenge windows, thresholds, rewards, and customer messaging moments.",
    image: "/concepts/athlete-forward/hero-rain.jpg",
    panelTitle: "Create brand account",
    panelBody: "Start with the program basics. We can help tune the first launch.",
  },
  login: {
    kicker: "Log in",
    title: "Welcome back to verified effort.",
    body:
      "Return to your athlete progress, brand dashboard, rewards, and challenge configuration from one focused entry point.",
    image: "/concepts/athlete-forward/hero-swim.jpg",
    panelTitle: "Sign in",
    panelBody: "Use the account connected to your PROOF athlete or brand profile.",
  },
} satisfies Record<
  AuthPreviewVariant,
  {
    kicker: string;
    title: string;
    body: string;
    image: string;
    panelTitle: string;
    panelBody: string;
  }
>;

const css = `
  .afa-page, .afa-page * { box-sizing: border-box; }
  .afa-page {
    min-height: 100vh;
    overflow-x: hidden;
    background: ${COLORS.base};
    color: ${COLORS.text};
    font-family: 'Outfit', system-ui, sans-serif;
  }
  .afa-page a { color: inherit; text-decoration: none; }
  .afa-page ::selection { background: ${COLORS.signal}; color: ${COLORS.base}; }
  ${athleteForwardChromeCss}
  .afa-shell {
    position: relative;
    min-height: 100svh;
    overflow: hidden;
    background: ${COLORS.base};
  }
  .afa-shell::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(5,5,5,0.9), rgba(5,5,5,0.38), rgba(5,5,5,0.82)),
      linear-gradient(180deg, rgba(5,5,5,0.32), rgba(5,5,5,0.9)),
      var(--afa-image);
    background-position: var(--afa-position, center);
    background-size: cover;
    filter: grayscale(1) contrast(1.08);
    opacity: 0.92;
  }
  .afa-shell::after {
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
  .afa-inner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(360px, 0.52fr);
    gap: clamp(32px, 6vw, 84px);
    align-items: end;
    width: min(1180px, calc(100% - 36px));
    min-height: 100svh;
    margin: 0 auto;
    padding: clamp(104px, 14vh, 152px) 0 clamp(42px, 8vh, 78px);
  }
  .afa-kicker,
  .afa-mono {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .afa-kicker {
    width: fit-content;
    border-left: 2px solid ${COLORS.signal};
    padding-left: 13px;
    color: ${COLORS.signal};
  }
  .afa-copy {
    display: grid;
    gap: 20px;
    max-width: 760px;
  }
  .afa-copy h1 {
    max-width: 780px;
    margin: 0;
    color: ${COLORS.textBright};
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(70px, 10vw, 146px);
    font-weight: 400;
    line-height: 0.86;
    letter-spacing: 0;
    text-wrap: balance;
  }
  .afa-copy p {
    max-width: 620px;
    margin: 0;
    color: rgba(232,232,232,0.84);
    font-size: clamp(17px, 1.6vw, 20px);
    line-height: 1.58;
  }
  .afa-panel {
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 18px;
    background: rgba(5,5,5,0.68);
    box-shadow: 0 28px 90px rgba(0,0,0,0.42);
    backdrop-filter: blur(18px);
  }
  .afa-panel-header {
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding: 22px;
  }
  .afa-panel-header h2 {
    margin: 0 0 8px;
    color: ${COLORS.textBright};
    font-size: 24px;
    line-height: 1.1;
  }
  .afa-panel-header p {
    margin: 0;
    color: ${COLORS.subtle};
    font-size: 15px;
    line-height: 1.5;
  }
  .afa-panel-body {
    display: grid;
    gap: 14px;
    padding: 22px;
  }
  .afa-role-grid {
    display: grid;
    gap: 12px;
  }
  .afa-role-card {
    display: grid;
    gap: 9px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px;
    background: rgba(255,255,255,0.035);
    padding: 16px;
  }
  .afa-role-card:hover {
    border-color: rgba(200,255,0,0.52);
    background: rgba(200,255,0,0.08);
  }
  .afa-role-card strong {
    color: ${COLORS.textBright};
    font-size: 18px;
  }
  .afa-role-card span {
    color: ${COLORS.subtle};
    font-size: 14px;
    line-height: 1.42;
  }
  .afa-form {
    display: grid;
    gap: 12px;
  }
  .afa-field {
    display: grid;
    gap: 8px;
  }
  .afa-field span {
    color: ${COLORS.subtle};
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .afa-input {
    width: 100%;
    min-height: 48px;
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 10px;
    background: rgba(255,255,255,0.055);
    padding: 0 13px;
    color: ${COLORS.text};
    font: inherit;
  }
  .afa-input::placeholder { color: ${COLORS.muted}; }
  .afa-button {
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
  .afa-button-primary {
    border-color: ${COLORS.signal};
    background: ${COLORS.signal};
    color: ${COLORS.base};
  }
  .afa-page a.afa-button-primary { color: ${COLORS.base}; }
  .afa-note {
    border-left: 2px solid ${COLORS.signal};
    background: rgba(255,255,255,0.04);
    border-radius: 10px;
    padding: 13px 14px;
    color: ${COLORS.subtle};
    font-size: 14px;
    line-height: 1.48;
  }
  .afa-secondary {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-between;
    color: ${COLORS.subtle};
    font-size: 14px;
  }
  .afa-secondary a {
    color: ${COLORS.signal};
  }
  .afa-signal-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    background: rgba(255,255,255,0.08);
  }
  .afa-signal {
    min-height: 112px;
    background: rgba(5,5,5,0.62);
    padding: 14px;
  }
  .afa-signal strong {
    display: block;
    color: ${COLORS.signal};
    font-family: 'JetBrains Mono', monospace;
    font-size: 18px;
  }
  .afa-signal span {
    display: block;
    margin-top: 8px;
    color: ${COLORS.subtle};
    font-size: 13px;
    line-height: 1.35;
  }
  .afa-footer {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 22px clamp(18px, 4vw, 48px);
    color: ${COLORS.muted};
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .afa-footer-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 14px;
  }
  .afa-footer a:hover { color: ${COLORS.signal}; }

  @media (max-width: 900px) {
    .afa-inner {
      grid-template-columns: 1fr;
      align-items: end;
      padding-top: 112px;
    }
    .afa-panel { max-width: 560px; }
  }

  @media (max-width: 640px) {
    .afa-shell {
      width: 100vw;
      max-width: 100vw;
    }
    .afa-inner {
      width: min(390px, 100vw);
      max-width: min(390px, 100vw);
      margin: 0;
      padding-left: 18px;
      padding-right: 18px;
    }
    .afa-copy h1 {
      width: min(354px, calc(100vw - 36px));
      max-width: min(354px, calc(100vw - 36px));
      font-size: clamp(54px, 15vw, 68px);
      overflow-wrap: break-word;
    }
    .afa-copy p {
      width: min(354px, calc(100vw - 36px));
      max-width: min(354px, calc(100vw - 36px));
      font-size: 16px;
      overflow-wrap: break-word;
    }
    .afa-panel {
      width: min(354px, calc(100vw - 36px));
      max-width: min(354px, calc(100vw - 36px));
    }
    .afa-role-card,
    .afa-panel-header p,
    .afa-note,
    .afa-secondary {
      max-width: 100%;
      overflow-wrap: break-word;
    }
    .afa-shell::before {
      background-position: var(--afa-mobile-position, var(--afa-position, center));
    }
    .afa-signal-grid { grid-template-columns: 1fr; }
    .afa-footer {
      align-items: flex-start;
      flex-direction: column;
    }
    .afa-footer-links { justify-content: flex-start; }
  }
`;

function RoleChooser() {
  return (
    <div className="afa-role-grid">
      <a className="afa-role-card" href={APP_REGISTER_ATHLETE_URL}>
        <strong>I am an athlete</strong>
        <span>Join participating brands, connect Strava, and earn rewards from verified effort.</span>
      </a>
      <a className="afa-role-card" href={APP_REGISTER_BRAND_URL}>
        <strong>I represent a brand</strong>
        <span>Launch earned-reward programs, challenges, milestones, and reward events.</span>
      </a>
      <div className="afa-secondary">
        <span>Already have an account?</span>
        <a href={APP_LOGIN_URL}>Log in</a>
      </div>
    </div>
  );
}

function AthleteForm() {
  return (
    <div className="afa-form">
      <label className="afa-field">
        <span>Email</span>
        <input className="afa-input" placeholder="you@example.com" />
      </label>
      <label className="afa-field">
        <span>Password</span>
        <input className="afa-input" placeholder="Create a password" type="password" />
      </label>
      <a className="afa-button afa-button-primary" href={APP_REGISTER_ATHLETE_URL}>
        Create athlete account
      </a>
      <div className="afa-note">After account creation, connect Strava so PROOF can verify eligible activities.</div>
      <div className="afa-signal-grid" aria-label="Athlete benefit preview">
        <div className="afa-signal">
          <strong>Today</strong>
          <span>See qualified effort count toward active rewards.</span>
        </div>
        <div className="afa-signal">
          <strong>Month</strong>
          <span>Track challenge windows in your local time.</span>
        </div>
        <div className="afa-signal">
          <strong>Life</strong>
          <span>Build a portable verified effort record.</span>
        </div>
      </div>
      <div className="afa-secondary">
        <span>Represent a brand?</span>
        <a href={APP_REGISTER_BRAND_URL}>Create a brand account</a>
      </div>
    </div>
  );
}

function BrandForm() {
  return (
    <div className="afa-form">
      <label className="afa-field">
        <span>Work email</span>
        <input className="afa-input" placeholder="you@brand.com" />
      </label>
      <label className="afa-field">
        <span>Brand name</span>
        <input className="afa-input" placeholder="Brand or organization" />
      </label>
      <label className="afa-field">
        <span>Primary sport category</span>
        <input className="afa-input" placeholder="Running, cycling, swimming..." />
      </label>
      <a className="afa-button afa-button-primary" href={APP_REGISTER_BRAND_URL}>
        Create brand account
      </a>
      <a className="afa-button" href="/contact">
        Talk to PROOF
      </a>
      <div className="afa-note">
        The first useful setup step is not a generic dashboard. It is choosing the athletes, sports,
        window, threshold, and reward moment for your first program.
      </div>
      <div className="afa-secondary">
        <span>Joining as an athlete?</span>
        <a href={APP_REGISTER_ATHLETE_URL}>Create an athlete account</a>
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <div className="afa-form">
      <label className="afa-field">
        <span>Email</span>
        <input className="afa-input" placeholder="you@example.com" />
      </label>
      <label className="afa-field">
        <span>Password</span>
        <input className="afa-input" placeholder="Password" type="password" />
      </label>
      <a className="afa-button afa-button-primary" href={APP_LOGIN_URL}>
        Log in
      </a>
      <div className="afa-secondary">
        <a href={APP_REGISTER_URL}>Create account</a>
        <a href="/contact">Need help?</a>
      </div>
    </div>
  );
}

function PanelBody({ variant }: { variant: AuthPreviewVariant }) {
  if (variant === "athlete") return <AthleteForm />;
  if (variant === "brand") return <BrandForm />;
  if (variant === "login") return <LoginForm />;
  return <RoleChooser />;
}

export function AthleteForwardAuthPreview({ variant }: { variant: AuthPreviewVariant }) {
  const content = variantContent[variant];
  const imagePosition = variant === "login" ? "58% center" : "center center";
  const mobileImagePosition = variant === "brand" ? "64% center" : "72% center";

  return (
    <main className="afa-page">
      <style>{css}</style>
      <AthleteForwardHeader current={variant === "start" ? "start" : undefined} />

      <section
        className="afa-shell"
        style={{
          "--afa-image": `url(${content.image})`,
          "--afa-position": imagePosition,
          "--afa-mobile-position": mobileImagePosition,
        } as CSSProperties}
      >
        <div className="afa-inner">
          <div className="afa-copy">
            <div className="afa-kicker">{content.kicker}</div>
            <h1>{content.title}</h1>
            <p>{content.body}</p>
          </div>

          <div className="afa-panel">
            <div className="afa-panel-header">
              <h2>{content.panelTitle}</h2>
              <p>{content.panelBody}</p>
            </div>
            <div className="afa-panel-body">
              <PanelBody variant={variant} />
            </div>
          </div>
        </div>
      </section>

      <footer className="afa-footer">
        <span>2026 PROOF Verified Effort, Inc.</span>
        <span className="afa-footer-links">
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/methodology">Methodology</Link>
        </span>
      </footer>
    </main>
  );
}
