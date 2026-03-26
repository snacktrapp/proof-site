"use client";

import { useState, useEffect, useRef } from "react";

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
};

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

const VerifiedBadge = ({ size = 48, animate = false }: { size?: number; animate?: boolean }) => {
  const [fired, setFired] = useState(false);
  useEffect(() => {
    if (animate) { const t = setTimeout(() => setFired(true), 600); return () => clearTimeout(t); }
  }, [animate]);
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {fired && (
        <div style={{ position: "absolute", inset: -8, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.signalGlow} 0%, transparent 70%)`,
          animation: "pulseGlow 2s ease-out forwards" }} />
      )}
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke={fired ? COLORS.signal : COLORS.muted} strokeWidth="2"
          fill={fired ? COLORS.signalDim : "transparent"} style={{ transition: "all 0.6s ease" }} />
        <path d="M15 24.5L21 30.5L33 18.5" stroke={fired ? COLORS.signal : COLORS.muted}
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray: 30, strokeDashoffset: fired ? 0 : 30,
            transition: "stroke-dashoffset 0.5s ease 0.3s, stroke 0.4s ease" }} />
      </svg>
    </div>
  );
};

const StatCounter = ({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) => {
  const [ref, inView] = useInView();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(value / (1200 / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); } else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 40, fontWeight: 700,
        color: COLORS.signal, letterSpacing: "-0.02em", lineHeight: 1 }}>
        {inView ? count.toLocaleString() : "0"}{suffix}
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.subtle,
        marginTop: 8, letterSpacing: "0.04em" }}>{label}</div>
    </div>
  );
};

const Section = ({ children, style = {}, id }: { children: React.ReactNode; style?: React.CSSProperties; id?: string }) => {
  const [ref, inView] = useInView(0.08);
  return (
    <section id={id} ref={ref as React.RefObject<HTMLElement>} className="proof-section"
      style={{ maxWidth: 1200, margin: "0 auto",
        opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease", ...style }}>
      {children}
    </section>
  );
};

const PricingCard = ({ name, price, period, features, highlight, cta }:
  { name: string; price: string; period?: string; features: string[]; highlight?: boolean; cta: string }) => (
  <div style={{ background: highlight ? COLORS.surfaceRaised : COLORS.surface,
    border: `1px solid ${highlight ? COLORS.signal : COLORS.surfaceBorder}`,
    borderRadius: 16, padding: "40px 32px", position: "relative", overflow: "hidden",
    flex: "1 1 280px", maxWidth: 380,
    boxShadow: highlight ? `0 0 60px ${COLORS.signalDim}` : "none" }}>
    {highlight && (
      <div style={{ position: "absolute", top: 16, right: -32, background: COLORS.signal,
        color: COLORS.base, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
        padding: "4px 40px", transform: "rotate(45deg)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        Popular
      </div>
    )}
    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: COLORS.subtle,
      textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>{name}</div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, color: COLORS.textBright, lineHeight: 1 }}>{price}</span>
      {period && <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.muted }}>{period}</span>}
    </div>
    <div style={{ width: 40, height: 2, background: highlight ? COLORS.signal : COLORS.surfaceBorder, marginBottom: 28 }} />
    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
      {features.map((f, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ color: highlight ? COLORS.signal : COLORS.subtle, fontSize: 14, lineHeight: "22px", flexShrink: 0 }}>✓</span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.text, lineHeight: "22px" }}>{f}</span>
        </div>
      ))}
    </div>
    <button style={{ width: "100%", padding: "14px 0",
      background: highlight ? COLORS.signal : "transparent",
      color: highlight ? COLORS.base : COLORS.text,
      border: highlight ? "none" : `1px solid ${COLORS.surfaceBorder}`,
      borderRadius: 8, cursor: "pointer", fontFamily: "'Syne', sans-serif",
      fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}
      onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}>
      {cta}
    </button>
  </div>
);

const Step = ({ number, title, desc, isLast }: { number: string; title: string; desc: string; isLast?: boolean }) => (
  <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
      <div style={{ width: 44, height: 44, borderRadius: "50%", border: `2px solid ${COLORS.signal}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: COLORS.signal }}>
        {number}
      </div>
      {!isLast && <div style={{ width: 1, height: 60, background: COLORS.surfaceBorder, marginTop: 8 }} />}
    </div>
    <div style={{ paddingTop: 8, paddingBottom: isLast ? 0 : 40 }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700,
        color: COLORS.textBright, marginBottom: 6 }}>{title}</div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: COLORS.subtle,
        lineHeight: 1.7, maxWidth: 440 }}>{desc}</div>
    </div>
  </div>
);


const LayerCard = ({ accent, title, subtitle, items, glow }: {
  accent: string; title: string; subtitle: string;
  items: { label: string; desc: string }[]; glow?: boolean;
}) => (
  <div style={{
    flex: "1 1 340px", maxWidth: 480,
    background: glow ? COLORS.signalDim : COLORS.surface,
    border: `1px solid ${glow ? COLORS.signal + "44" : COLORS.surfaceBorder}`,
    borderRadius: 16, padding: "36px 32px",
    position: "relative", overflow: "hidden",
  }}>
    {glow && (
      <div style={{
        position: "absolute", top: -40, right: -40, width: 120, height: 120,
        background: `radial-gradient(circle, ${COLORS.signalGlow} 0%, transparent 70%)`,
        opacity: 0.4,
      }} />
    )}
    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700,
      color: accent, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4,
      position: "relative" }}>{title}</div>
    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: COLORS.textBright,
      lineHeight: 1.1, marginBottom: 20, letterSpacing: "0.02em", position: "relative" }}>{subtitle}</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%",
            background: accent, marginTop: 7, flexShrink: 0, opacity: 0.7 }} />
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
              color: COLORS.textBright, marginBottom: 2 }}>{item.label}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.subtle,
              lineHeight: 1.6 }}>{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

type FormState = "idle" | "loading" | "success" | "error";

export default function ProofWebsite() {
  const [heroReady, setHeroReady] = useState(false);
  const [verified, setVerified] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setTimeout(() => setHeroReady(true), 100);
    setTimeout(() => setVerified(true), 1800);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleWaitlistSubmit = async () => {
    if (!email || formState === "loading" || formState === "success") return;
    setFormState("loading"); setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", { method: "POST",
        headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (res.ok && data.success) { setFormState("success"); setEmail(""); }
      else { setFormState("error"); setErrorMsg(data.error || "Something went wrong. Please try again."); }
    } catch { setFormState("error"); setErrorMsg("Network error. Please try again."); }
  };

  return (
    <div style={{ background: COLORS.base, color: COLORS.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;700&family=Outfit:wght@300;400;500;600&family=Syne:wght@500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${COLORS.signal}; color: ${COLORS.base}; }

        @keyframes pulseGlow {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: scale(2); }
        }

        .proof-section { padding: 120px 24px; }

        .nav-desktop { display: flex; gap: 32px; align-items: center; }
        .nav-hamburger { display: none; background: none; border: none; cursor: pointer;
          padding: 4px; flex-direction: column; gap: 5px; }
        .nav-hamburger span { display: block; width: 22px; height: 2px;
          background: ${COLORS.textBright}; border-radius: 2px; transition: all 0.3s ease; }
        .nav-mobile { display: none; }

        .stats-grid { display: flex; justify-content: center; gap: 80px;
          flex-wrap: wrap; max-width: 1200px; margin: 0 auto; padding: 60px 24px; }

        .badge-visual { display: flex; flex-direction: column; align-items: center; gap: 16px; flex: 0 0 auto; }

        .unit-pill { display: inline-block; padding: 6px 16px;
          border: 1px solid ${COLORS.surfaceBorder}; border-radius: 100px;
          font-family: 'JetBrains Mono', monospace; font-size: 12px; color: ${COLORS.subtle};
          letter-spacing: 0.05em; transition: all 0.3s ease; }
        .unit-pill:hover { border-color: ${COLORS.signal}; color: ${COLORS.signal}; }

        .waitlist-row { display: flex; max-width: 440px; margin: 0 auto;
          border-radius: 10px; overflow: hidden; border: 1px solid ${COLORS.surfaceBorder}; }
        .waitlist-row input { flex: 1; padding: 14px 20px; background: ${COLORS.base};
          border: none; outline: none; font-family: 'Outfit', sans-serif;
          font-size: 14px; color: ${COLORS.text}; min-width: 0; }
        .waitlist-row button { padding: 14px 28px; border: none;
          font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700;
          color: ${COLORS.base}; cursor: pointer; letter-spacing: 0.08em;
          text-transform: uppercase; white-space: nowrap; transition: background 0.2s; }

        /* ── TABLET ── */
        @media (max-width: 900px) {
          .proof-section { padding: 80px 20px; }
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .proof-section { padding: 60px 20px; }

          /* Nav */
          .nav-desktop { display: none; }
          .nav-hamburger { display: flex; }

          .nav-mobile {
            display: flex; flex-direction: column;
            position: fixed; top: 64px; left: 0; right: 0; z-index: 98;
            background: rgba(5,5,5,0.97); backdrop-filter: blur(20px);
            border-bottom: 1px solid ${COLORS.surfaceBorder};
            padding: 20px; gap: 4px;
          }
          .nav-mobile a {
            font-family: 'Outfit', sans-serif; font-size: 16px; color: ${COLORS.subtle};
            text-decoration: none; padding: 12px 0;
            border-bottom: 1px solid ${COLORS.surfaceBorder};
          }
          .nav-mobile .nav-mobile-cta {
            margin-top: 8px; padding: 14px; border-radius: 8px;
            background: ${COLORS.signal}; color: ${COLORS.base};
            font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
            text-align: center; letter-spacing: 0.08em; text-transform: uppercase;
            border: none; text-decoration: none; display: block;
          }

          /* Stats — 2 column grid */
          .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 48px 20px; }

          /* Hide the large badge visual on mobile */
          .badge-visual { display: none; }

          /* Waitlist — stack vertically */
          .waitlist-row { flex-direction: column; border-radius: 10px; }
          .waitlist-row input { border-radius: 8px 8px 0 0; padding: 16px 20px; }
          .waitlist-row button { border-radius: 0 0 8px 8px; padding: 16px; font-size: 14px; }

          /* Code block — smaller font, scrollable */
          .code-pre { font-size: 11px !important; }
        }

        @media (max-width: 480px) {
          .stats-grid { gap: 28px; padding: 40px 16px; }
          .proof-section { padding: 52px 16px; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(5,5,5,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.surfaceBorder}` : "1px solid transparent",
        transition: "all 0.3s ease" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, border: `2px solid ${COLORS.textBright}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: COLORS.textBright }}>P</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16,
              color: COLORS.textBright, letterSpacing: "0.12em", textTransform: "uppercase" }}>Proof</span>
          </div>

          {/* Desktop nav */}
          <div className="nav-desktop">
            {["How it works", "Pricing", "For brands"].map((item, i) => (
              <a key={i} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.subtle,
                  textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s" }}
                onMouseOver={e => (e.target as HTMLAnchorElement).style.color = COLORS.textBright}
                onMouseOut={e => (e.target as HTMLAnchorElement).style.color = COLORS.subtle}>
                {item}
              </a>
            ))}
            <a href="#waitlist" style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700,
              color: COLORS.base, background: COLORS.signal, padding: "8px 20px", borderRadius: 6,
              textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Get early access
            </a>
          </div>

          {/* Hamburger */}
          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Open menu">
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="nav-mobile">
            {["How it works", "Pricing", "For brands"].map((item, i) => (
              <a key={i} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
            <a href="#waitlist" className="nav-mobile-cta" onClick={() => setMenuOpen(false)}>
              Get early access
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: `linear-gradient(${COLORS.subtle} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.subtle} 1px, transparent 1px)`,
          backgroundSize: "60px 60px" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%",
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,255,0,0.03) 0%, transparent 70%)` }} />

        <div style={{ textAlign: "center", position: "relative", zIndex: 1,
          padding: "100px 20px 60px", maxWidth: 900, width: "100%" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted,
            letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 32,
            opacity: heroReady ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
            Verified effort loyalty infrastructure
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(44px, 10vw, 96px)", color: COLORS.textBright,
            lineHeight: 0.95, letterSpacing: "0.02em", marginBottom: 16,
            opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }}>
            Turn every mile, rep,<br />and session into{" "}
            <span style={{ color: verified ? COLORS.signal : COLORS.muted, transition: "color 0.6s ease" }}>
              loyalty currency.
            </span>
          </h1>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
            letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.signal,
            marginBottom: 28,
            opacity: heroReady ? 1 : 0, transition: "opacity 0.6s ease 0.9s" }}>
            Effort verified.
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28,
            opacity: heroReady ? 1 : 0, transition: "opacity 0.6s ease 1.1s" }}>
            <VerifiedBadge size={48} animate={heroReady} />
          </div>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(15px, 4vw, 17px)",
            color: COLORS.subtle, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 40px",
            opacity: heroReady ? 1 : 0, transition: "opacity 0.6s ease 1.5s" }}>
            PROOF connects fitness data to loyalty programs — GPS-verified, fraud-checked,
            and ready to reward real athletic effort instead of just transactions.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
            opacity: heroReady ? 1 : 0, transition: "opacity 0.6s ease 1.8s" }}>
            <a href="#waitlist" style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
              color: COLORS.base, background: COLORS.signal, padding: "14px 32px", borderRadius: 8,
              textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Request early access
            </a>
            <a href="#how-it-works" style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
              color: COLORS.text, background: "transparent", padding: "14px 32px", borderRadius: 8,
              textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase",
              border: `1px solid ${COLORS.surfaceBorder}` }}>
              See how it works
            </a>
          </div>
        </div>
      </div>

      {/* ── TRUST MARK ── */}
      <div style={{ borderTop: `1px solid ${COLORS.surfaceBorder}`, borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
        <Section>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48, justifyContent: "center" }}>
            <div style={{ flex: "1 1 300px", maxWidth: 500 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.signal,
                letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
                PROOF Verified Effort™
              </div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 6vw, 48px)",
                color: COLORS.textBright, lineHeight: 1, marginBottom: 20 }}>
                One badge.<br />Every sport.
              </h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: COLORS.subtle,
                lineHeight: 1.8, marginBottom: 28 }}>
                PROOF Verified Effort is a universal trust mark that confirms real athletic activity —
                verified through GPS, heart rate, and platform APIs. It works across every sport, every unit, every brand.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Miles", "Meters", "Rounds", "Sessions", "Watts", "Laps", "Reps", "Hours"].map(u => (
                  <span key={u} className="unit-pill">{u}</span>
                ))}
              </div>
            </div>
            <div className="badge-visual">
              <div style={{ width: 200, height: 200, borderRadius: 24,
                border: `1px solid ${COLORS.surfaceBorder}`, background: COLORS.surface,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 12, position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: 24,
                  background: `radial-gradient(circle at 50% 40%, ${COLORS.signalDim} 0%, transparent 70%)` }} />
                <svg width="64" height="64" viewBox="0 0 48 48" fill="none" style={{ position: "relative" }}>
                  <circle cx="24" cy="24" r="22" stroke={COLORS.signal} strokeWidth="1.5" fill={COLORS.signalDim} />
                  <path d="M15 24.5L21 30.5L33 18.5" stroke={COLORS.signal} strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div style={{ position: "relative", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14,
                    color: COLORS.textBright, letterSpacing: "0.12em", textTransform: "uppercase" }}>PROOF</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: COLORS.signal,
                    letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 2 }}>Verified Effort</div>
                </div>
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: COLORS.muted, textAlign: "center" }}>
                Your customers see this.<br />It means the effort is real.
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ── STATS ── */}
      <div style={{ background: COLORS.surface, borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
        <div className="stats-grid">
          <StatCounter value={40} suffix="+" label="YEARS · ANCHOR CUSTOMER" />
          <StatCounter value={8} suffix="" label="KLAVIYO FLOWS DESIGNED" />
          <StatCounter value={5} suffix="" label="LOYALTY TIERS" />
          <StatCounter value={30} suffix="+" label="FITNESS PLATFORMS" />
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <Section id="how-it-works">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 260px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted,
              letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Integration</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 6vw, 52px)",
              color: COLORS.textBright, lineHeight: 1, marginBottom: 16 }}>
              Verify. Track.<br />Reward.
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: COLORS.subtle,
              lineHeight: 1.7, marginBottom: 40, maxWidth: 400 }}>
              PROOF owns the effort ledger. Your athletes connect once, and every verified activity
              flows into your loyalty program automatically.
            </p>
          </div>
          <div style={{ flex: "1 1 300px" }}>
            <Step number="01" title="Connect"
              desc="Your customer connects their Strava account via OAuth. One tap. PROOF handles authentication, imports their activity history, and starts listening for new rides in real time." />
            <Step number="02" title="Verify"
              desc="Every activity runs through the PROOF verification pipeline — GPS validation, velocity checks, anomaly detection. Fraudulent data gets flagged. Clean data earns verified miles on the PROOF ledger." />
            <Step number="03" title="Reward" isLast
              desc="PROOF tracks thresholds you define. When an athlete crosses one, we generate a Shopify discount code and fire a Klaviyo event — your brand delivers the reward in your voice." />
          </div>
        </div>
      </Section>

      {/* ── ARCHITECTURE: TWO LAYERS ── */}
      <div style={{ background: COLORS.surface, borderTop: `1px solid ${COLORS.surfaceBorder}`,
        borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
        <Section style={{ padding: "80px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted,
              letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Architecture</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 5vw, 52px)",
              color: COLORS.textBright, lineHeight: 1, marginBottom: 16 }}>
              Two layers. One platform.
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: COLORS.subtle,
              maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
              PROOF separates what&apos;s universal from what&apos;s yours. Verified effort lives on the
              PROOF layer — portable, permanent, recognized everywhere. Your rewards, your thresholds,
              your customer experience live on the brand layer.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
            gap: 16, margin: "48px auto", maxWidth: 700, flexWrap: "wrap" }}>
            {[
              { label: "Strava", sub: "GPS activity", color: COLORS.steel, glow: false },
              { label: "PROOF Ledger", sub: "Verify · Track · Tier", color: COLORS.signal, glow: true },
              { label: "Your Brand", sub: "Shopify · Klaviyo", color: COLORS.textBright, glow: false },
            ].map((node, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ textAlign: "center", padding: "18px 28px",
                  border: `1px solid ${node.glow ? COLORS.signal + "55" : COLORS.surfaceBorder}`,
                  borderRadius: 12, background: node.glow ? COLORS.signalDim : "transparent",
                  minWidth: 150 }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
                    color: node.color, marginBottom: 2 }}>{node.label}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                    color: COLORS.muted, letterSpacing: "0.05em" }}>{node.sub}</div>
                </div>
                {i < 2 && (
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18,
                    color: COLORS.muted }}>→</div>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", marginBottom: 48 }}>
            <LayerCard
              accent={COLORS.signal}
              title="PROOF Layer"
              subtitle="Universal. Portable. Permanent."
              glow
              items={[
                { label: "Lifetime verified miles", desc: "Cumulative total across all activities. Never resets, never decreases." },
                { label: "PROOF tier", desc: "Sprinter → Climber → Domestique → Grand Tour → Patron. Based on lifetime miles. Recognized at every enrolled brand." },
                { label: "Active status", desc: "Trailing 6-month activity calculation. Determines whether economic benefits stay lit." },
                { label: "Portable athlete identity", desc: "One Strava connection. Effort history travels to every brand the athlete joins." },
              ]}
            />
            <LayerCard
              accent={COLORS.textBright}
              title="Brand Layer"
              subtitle="Your program. Your rules."
              items={[
                { label: "Brand miles", desc: "Miles ridden since the athlete connected to your brand. Starts at zero plus a welcome bonus." },
                { label: "Reward thresholds", desc: "You define what brand miles unlock — discount codes, free shipping, exclusive access. Your budget, your rules." },
                { label: "Welcome bonus", desc: "One-time mile credit based on the athlete's PROOF tier at connection. A 5,000-mile rider doesn't start at zero." },
                { label: "Reward delivery", desc: "Shopify discount codes generated automatically. Klaviyo events fired in real time. You build the flows in your voice." },
              ]}
            />
          </div>

          <div style={{ maxWidth: 720, margin: "0 auto", background: COLORS.base,
            border: `1px solid ${COLORS.surfaceBorder}`, borderRadius: 16, padding: "32px",
            display: "flex", flexWrap: "wrap", gap: 32 }}>
            <div style={{ flex: "1 1 280px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700,
                color: COLORS.signal, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                Identity travels
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.subtle, lineHeight: 1.7 }}>
                A 5,000-mile rider is recognized as a serious athlete at every enrolled brand. Their PROOF tier,
                badge, and lifetime record are visible everywhere. Permanent benefits can be granted on sight.
              </div>
            </div>
            <div style={{ width: 1, background: COLORS.surfaceBorder, alignSelf: "stretch", flexShrink: 0 }} />
            <div style={{ flex: "1 1 280px" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700,
                color: COLORS.textBright, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                Rewards earn fresh
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.subtle, lineHeight: 1.7 }}>
                Discount thresholds start from the connection date. You only fund effort that happens during
                the relationship. The welcome bonus bridges the gap so athletes don&apos;t start at zero.
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ── CODE BLOCK ── */}
      <div style={{ borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
        <Section style={{ padding: "80px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted,
              letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Developer-friendly</div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 5vw, 40px)",
              color: COLORS.textBright }}>Clean events, real-time</h3>
          </div>
          <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.surfaceBorder}`,
            borderRadius: 16, padding: "32px", maxWidth: 680, margin: "0 auto", overflow: "auto" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c, opacity: 0.7 }} />
              ))}
            </div>
            <pre className="code-pre" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              lineHeight: 2, color: COLORS.subtle, whiteSpace: "pre", margin: 0, overflowX: "auto", display: "block" }}>
              <span style={{ color: COLORS.muted }}>{"// PROOF fires events to your Klaviyo"}</span>{"
"}
              <span style={{ color: COLORS.muted }}>{"// You build the flows in your voice"}</span>{"

"}
              <span style={{ color: "#c678dd" }}>Event</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>proof.reward_earned</span>{"

"}
              <span style={{ color: COLORS.muted }}>{"{"}</span>{"
"}
              {"  "}<span style={{ color: COLORS.text }}>athlete_id</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>&quot;prf_ath_7x92k&quot;</span>
              <span style={{ color: COLORS.muted }}>,</span>{"
"}
              {"  "}<span style={{ color: COLORS.text }}>brand</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>&quot;voler&quot;</span>
              <span style={{ color: COLORS.muted }}>,</span>{"
"}
              {"  "}<span style={{ color: COLORS.text }}>brand_miles</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: "#d19a66" }}>500</span>
              <span style={{ color: COLORS.muted }}>,</span>{"
"}
              {"  "}<span style={{ color: COLORS.text }}>lifetime_miles</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: "#d19a66" }}>3842</span>
              <span style={{ color: COLORS.muted }}>,</span>{"
"}
              {"  "}<span style={{ color: COLORS.text }}>proof_tier</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>&quot;Domestique&quot;</span>
              <span style={{ color: COLORS.muted }}>,</span>{"
"}
              {"  "}<span style={{ color: COLORS.text }}>reward</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.muted }}>{"{"}</span>{"
"}
              {"    "}<span style={{ color: COLORS.text }}>type</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>&quot;shopify_discount&quot;</span>
              <span style={{ color: COLORS.muted }}>,</span>{"
"}
              {"    "}<span style={{ color: COLORS.text }}>code</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>&quot;PROOF-VLR-20-7X92K&quot;</span>
              <span style={{ color: COLORS.muted }}>,</span>{"
"}
              {"    "}<span style={{ color: COLORS.text }}>value</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>&quot;$20 off&quot;</span>{"
"}
              {"  "}<span style={{ color: COLORS.muted }}>{"}"}</span>{"
"}
              <span style={{ color: COLORS.muted }}>{"}"}</span>
            </pre>
          </div>
        </Section>
      </div>
      {/* ── FOR BRANDS ── */}
      <Section id="for-brands">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted,
            letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>For brands</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 6vw, 52px)",
            color: COLORS.textBright, lineHeight: 1, marginBottom: 16 }}>
            Your brand. Your program.<br />
            <span style={{ color: COLORS.subtle }}>Our verification.</span>
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: COLORS.subtle,
            lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
            PROOF is the effort layer underneath your loyalty program. You own the customer experience,
            set the thresholds, and deliver the rewards. We make sure the effort is real.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          {[
            { icon: "◎", title: "Endorsed model", desc: "\"Powered by PROOF\" sits discreetly in your experience. Customers see your brand first, verified effort second. Your voice, your design, your program." },
            { icon: "⬡", title: "Any sport, any unit", desc: "Miles, meters, watts, rounds, sessions. You define what effort means for your customers. PROOF verifies it. Starting with cycling — expanding to every sport." },
            { icon: "⚡", title: "Fraud prevention", desc: "GPS validation, velocity checks, daily mileage caps, anomaly detection. Your loyalty budget goes to real athletes who actually did the work." },
            { icon: "↗", title: "Effort-based loyalty", desc: "Rewards earned by real effort, not just spending. Customers who ride earn alongside customers who buy — your most engaged athletes become your best customers." },
            { icon: "⟁", title: "Shopify + Klaviyo native", desc: "Discount codes generated via Shopify Admin API. Events fired directly to Klaviyo. No middleware, no third-party loyalty platform required. PROOF is the engine." },
            { icon: "◈", title: "Network effect built in", desc: "One Strava connection, every enrolled brand. As the network grows, your athletes are recognized everywhere — and athletes from other brands discover you." },
          ].map((item, i) => (
            <div key={i} style={{ flex: "1 1 280px", maxWidth: 380, background: COLORS.surface,
              border: `1px solid ${COLORS.surfaceBorder}`, borderRadius: 16, padding: "28px",
              transition: "border-color 0.3s ease" }}
              onMouseOver={e => (e.currentTarget as HTMLDivElement).style.borderColor = COLORS.signal + "33"}
              onMouseOut={e => (e.currentTarget as HTMLDivElement).style.borderColor = COLORS.surfaceBorder}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, color: COLORS.signal,
                marginBottom: 12, opacity: 0.7 }}>{item.icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700,
                color: COLORS.textBright, marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.subtle,
                lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── PRICING ── */}
      <div style={{ borderTop: `1px solid ${COLORS.surfaceBorder}` }}>
        <Section id="pricing">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted,
              letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Pricing</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 6vw, 52px)",
              color: COLORS.textBright, lineHeight: 1, marginBottom: 16 }}>
              Flat pricing. No surprises.
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: COLORS.subtle,
              maxWidth: 480, margin: "0 auto" }}>
              No setup fees. No per-transaction cuts. No revenue share. Each brand funds their own rewards independently.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", alignItems: "stretch" }}>
            <PricingCard name="Starter" price="$299" period="/mo"
              features={["Up to 2,500 verified members", "Strava integration",
                "GPS fraud detection", "PROOF Verified Effort badge",
                "Shopify discount code generation", "Klaviyo event integration", "Email support"]}
              cta="Start free trial" />
            <PricingCard name="Growth" price="$799" period="/mo" highlight
              features={["Up to 25,000 verified members", "Advanced fraud + anomaly detection",
                "Custom tier configuration", "Welcome bonus controls",
                "Webhooks + API access", "Brand dashboard + analytics", "Priority support + Slack channel"]}
              cta="Start free trial" />
            <PricingCard name="Enterprise" price="Custom"
              features={["Unlimited members", "Dedicated infrastructure", "SLA + uptime guarantee",
                "White-label badge option", "Custom integrations",
                "Dedicated account manager", "SOC 2 compliance docs"]}
              cta="Talk to us" />
          </div>
        </Section>
      </div>

      {/* ── WAITLIST ── */}
      <div style={{ background: COLORS.surface, borderTop: `1px solid ${COLORS.surfaceBorder}` }}>
        <Section id="waitlist" style={{ textAlign: "center", padding: "100px 20px 80px" }}>
          <VerifiedBadge size={48} animate={false} />
          <div style={{ marginTop: 24 }} />
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(32px, 6vw, 64px)", color: COLORS.textBright, lineHeight: 1, marginBottom: 16 }}>
            Reward effort, not just spend.
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: COLORS.subtle,
            maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.7 }}>
            We&apos;re onboarding the first 50 brands now. Request early access and we&apos;ll set up
            a 15-minute walkthrough of the platform.
          </p>

          {formState === "success" ? (
            <div style={{ maxWidth: 440, margin: "0 auto", padding: "20px 28px",
              background: COLORS.signalDim, border: `1px solid ${COLORS.signal}44`,
              borderRadius: 10, display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
              <VerifiedBadge size={24} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: COLORS.signal }}>
                You&apos;re on the list. We&apos;ll be in touch.
              </span>
            </div>
          ) : (
            <>
              <div className="waitlist-row">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleWaitlistSubmit()}
                  placeholder="you@brand.com" disabled={formState === "loading"}
                  style={{ opacity: formState === "loading" ? 0.6 : 1 }} />
                <button onClick={handleWaitlistSubmit} disabled={formState === "loading"}
                  style={{ background: formState === "loading" ? COLORS.muted : COLORS.signal,
                    cursor: formState === "loading" ? "not-allowed" : "pointer" }}>
                  {formState === "loading" ? "Sending…" : "Request access"}
                </button>
              </div>
              {formState === "error" && (
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13,
                  color: "#FF6B6B", marginTop: 12 }}>{errorMsg}</div>
              )}
            </>
          )}

          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            color: COLORS.muted, marginTop: 16 }}>
            No credit card required · 14-day free trial on all plans
          </div>
        </Section>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${COLORS.surfaceBorder}`, padding: "40px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", alignItems: "center", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: 4, border: `1.5px solid ${COLORS.subtle}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: COLORS.subtle }}>P</div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13,
                color: COLORS.subtle, letterSpacing: "0.12em", textTransform: "uppercase" }}>Proof</span>
            </div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: COLORS.muted }}>
              Effort verified. Built in California.
            </div>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {["Privacy", "Terms", "Documentation", "Status"].map((link, i) => (
              <a key={i} href="#" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12,
                color: COLORS.muted, textDecoration: "none" }}
                onMouseOver={e => (e.target as HTMLAnchorElement).style.color = COLORS.text}
                onMouseOut={e => (e.target as HTMLAnchorElement).style.color = COLORS.muted}>
                {link}
              </a>
            ))}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted }}>
            © 2026 PROOF Technologies, Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}
