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
  steel: "#8BA0B4",
  effort: "#FF3D00",
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

const PricingCard = ({ name, price, period, members, features, highlight, cta }:
  { name: string; price: string; period?: string; members?: string; features: string[]; highlight?: boolean; cta: string }) => (
  <div style={{ background: highlight ? COLORS.surfaceRaised : COLORS.surface,
    border: `1px solid ${highlight ? COLORS.signal : COLORS.surfaceBorder}`,
    borderRadius: 16, padding: "32px 24px", position: "relative", overflow: "hidden",
    flex: "1 1 200px", maxWidth: 240, minWidth: 190,
    boxShadow: highlight ? `0 0 60px ${COLORS.signalDim}` : "none" }}>
    {highlight && (
      <div style={{ position: "absolute", top: 14, right: -34, background: COLORS.signal,
        color: COLORS.base, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700,
        padding: "3px 40px", transform: "rotate(45deg)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        Popular
      </div>
    )}
    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: COLORS.subtle,
      textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>{name}</div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 2 }}>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, color: COLORS.textBright, lineHeight: 1 }}>{price}</span>
      {period && <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.muted }}>{period}</span>}
    </div>
    {members && (
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.muted, marginBottom: 4 }}>{members}</div>
    )}
    <div style={{ width: 32, height: 2, background: highlight ? COLORS.signal : COLORS.surfaceBorder, marginBottom: 20 }} />
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
      {features.map((f, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <span style={{ color: highlight ? COLORS.signal : COLORS.subtle, fontSize: 13, lineHeight: "20px", flexShrink: 0 }}>✓</span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.text, lineHeight: "20px" }}>{f}</span>
        </div>
      ))}
    </div>
    <button style={{ width: "100%", padding: "12px 8px",
      background: highlight ? COLORS.signal : "transparent",
      color: highlight ? COLORS.base : COLORS.text,
      border: highlight ? "none" : `1px solid ${COLORS.surfaceBorder}`,
      borderRadius: 8, cursor: "pointer", fontFamily: "'Syne', sans-serif",
      fontSize: 11, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase" }}
      onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}>
      {cta}
    </button>
  </div>
);

const Step = ({ number, title, desc, detail, isLast }: { number: string; title: string; desc: string; detail?: string; isLast?: boolean }) => (
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
      {detail && (
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.steel,
          letterSpacing: "0.05em", marginTop: 8 }}>{detail}</div>
      )}
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

/* ── PEI Animated Conversion (new for Model C) ── */
const PEIConversion = () => {
  const sports = [
    { raw: "23.4 mi ridden", pm: "23.4", sport: "Road Cycling", mult: "1.0×" },
    { raw: "5.2 mi run", pm: "15.6", sport: "Running", mult: "3.0×" },
    { raw: "4.8 mi paddled", pm: "9.6", sport: "Rowing", mult: "2.0×" },
    { raw: "2.1 mi swum", pm: "16.8", sport: "Swimming", mult: "8.0×" },
    { raw: "12.8 mi hiked", pm: "12.8", sport: "Walking", mult: "1.0×" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % sports.length), 3000);
    return () => clearInterval(t);
  }, []);
  const s = sports[idx];
  return (
    <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.surfaceBorder}`,
      borderRadius: 16, padding: "28px 32px",
      display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
      <div style={{ textAlign: "center", minWidth: 140 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
          color: COLORS.muted, marginBottom: 4 }}>{s.sport}</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18,
          color: COLORS.text }}>{s.raw}</div>
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20,
        color: COLORS.muted }}>→</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        color: COLORS.steel, background: COLORS.steel + "18",
        padding: "4px 10px", borderRadius: 6 }}>{s.mult}</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20,
        color: COLORS.muted }}>→</div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36,
          color: COLORS.signal, lineHeight: 1 }}>{s.pm}</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: COLORS.signal, letterSpacing: "0.1em" }}>PROOF MILES</div>
      </div>
    </div>
  );
};

type FormState = "idle" | "loading" | "success" | "error";

export default function ProofWebsite() {
  const [heroReady, setHeroReady] = useState(false);
  const [verified, setVerified] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [annualPricing, setAnnualPricing] = useState(false);

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

        .pei-table-wrap { overflow-x: auto; overflow-y: hidden; border-radius: 16px;
          -webkit-overflow-scrolling: touch; }
        .pei-table { width: 100%; border-collapse: collapse; }
        .pei-table th { padding: 14px 20px; text-align: left;
          font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700;
          color: ${COLORS.muted}; letter-spacing: 0.08em; text-transform: uppercase;
          border-bottom: 1px solid ${COLORS.surfaceBorder}; }
        .pei-table td { padding: 12px 20px; border-bottom: 1px solid ${COLORS.surfaceBorder}; }

        .account-mockup { max-width: 400px; margin: 0 auto; }

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

          /* Account mockup — full width, tighter padding */
          .account-mockup { max-width: 100%; padding: 20px !important; }

          /* Pricing cards — horizontal scroll instead of stacking */
          .pricing-cards {
            flex-wrap: nowrap !important; justify-content: flex-start !important;
            overflow-x: auto; -webkit-overflow-scrolling: touch;
            padding-bottom: 8px; scroll-snap-type: x mandatory;
          }
          .pricing-cards > div {
            flex: 0 0 220px !important; max-width: 220px !important;
            scroll-snap-align: start;
          }

          /* Feature comparison table — smooth scroll */
          .feature-table-wrap { -webkit-overflow-scrolling: touch; }

          /* Architecture flow — stack vertically on mobile */
          .arch-flow { flex-direction: column; gap: 8px !important; }
          .arch-node { flex-direction: column; gap: 8px !important; }
          .arch-arrow { transform: rotate(90deg); }

          /* Integrations bar — stack vertically, hide dividers */
          .integrations-bar { flex-direction: column; gap: 20px !important; }
          .integrations-divider { display: none; }

          /* Dashboard — hide sidebar, stack metrics 2x2, simplify feed */
          .dash-sidebar { display: none !important; }
          .dash-metrics { grid-template-columns: 1fr 1fr !important; }
          .dash-cols { grid-template-columns: 1fr !important; }

          /* Activity feed — horizontal scroll with right fade */
          .dash-feed-wrap { position: relative; }
          .dash-feed-wrap::after {
            content: '';
            position: absolute;
            top: 0; right: 0; bottom: 0;
            width: 48px;
            background: linear-gradient(to right, transparent, ${COLORS.surface});
            pointer-events: none;
            z-index: 1;
          }
          .dash-feed-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .dash-feed-scroll::-webkit-scrollbar { height: 0; display: none; }
        }

        @media (max-width: 480px) {
          .stats-grid { gap: 28px; padding: 40px 16px; }
          .proof-section { padding: 52px 16px; }

          /* Even tighter pricing cards on very small screens */
          .pricing-cards > div {
            flex: 0 0 200px !important; max-width: 200px !important;
          }
        }

        /* Scrollbar styling for horizontal scroll areas */
        .pricing-cards::-webkit-scrollbar,
        .pei-table-wrap::-webkit-scrollbar,
        .feature-table-wrap::-webkit-scrollbar {
          height: 4px;
        }
        .pricing-cards::-webkit-scrollbar-thumb,
        .pei-table-wrap::-webkit-scrollbar-thumb,
        .feature-table-wrap::-webkit-scrollbar-thumb {
          background: ${COLORS.surfaceBorder}; border-radius: 4px;
        }
        .pricing-cards::-webkit-scrollbar-track,
        .pei-table-wrap::-webkit-scrollbar-track,
        .feature-table-wrap::-webkit-scrollbar-track {
          background: transparent;
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
            <a href="/athletes"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.subtle,
                textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s" }}
              onMouseOver={e => (e.target as HTMLAnchorElement).style.color = COLORS.textBright}
              onMouseOut={e => (e.target as HTMLAnchorElement).style.color = COLORS.subtle}>
              Athletes
            </a>
            {["How it works", "Platform", "Dashboard", "Pricing", "For brands"].map((item, i) => (
              <a key={i} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.subtle,
                  textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s" }}
                onMouseOver={e => (e.target as HTMLAnchorElement).style.color = COLORS.textBright}
                onMouseOut={e => (e.target as HTMLAnchorElement).style.color = COLORS.subtle}>
                {item}
              </a>
            ))}
            <a href="https://proof.verifiedeffort.com" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.subtle,
                textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s" }}
              onMouseOver={e => (e.target as HTMLAnchorElement).style.color = COLORS.textBright}
              onMouseOut={e => (e.target as HTMLAnchorElement).style.color = COLORS.subtle}>
              Sign up / Log in
            </a>
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
            <a href="/athletes" onClick={() => setMenuOpen(false)}>Athletes</a>
            {["How it works", "Platform", "Dashboard", "Pricing", "For brands"].map((item, i) => (
              <a key={i} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
            <a href="https://proof.verifiedeffort.com" target="_blank" rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}>Sign up / Log in</a>
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
            Turn every mile, stroke,<br />and stride into{" "}
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
            color: COLORS.subtle, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px",
            opacity: heroReady ? 1 : 0, transition: "opacity 0.6s ease 1.5s" }}>
            Your customers are already training. PROOF verifies their effort and turns it
            into loyalty currency for your brand. GPS-tracked. Effort-normalized.
            One integration. Every sport. Every unit.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
            opacity: heroReady ? 1 : 0, transition: "opacity 0.6s ease 1.8s" }}>
            <a href="#waitlist" style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
              color: COLORS.base, background: COLORS.signal, padding: "14px 32px", borderRadius: 8,
              textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Get early access
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
                verified through GPS and platform APIs. Effort-normalized across every sport
                via the PROOF Effort Index. It works across every unit, every brand.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Miles", "Meters", "Kilometers", "Laps", "Hours"].map(u => (
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
          <StatCounter value={5} suffix="" label="WEBHOOK EVENT TYPES" />
          <StatCounter value={3} suffix="" label="ATHLETE SIGNALS" />
          <StatCounter value={10} suffix="+" label="SPORTS VIA PEI" />
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
              flows into your loyalty program automatically — across every sport in your allowlist.
            </p>
          </div>
          <div style={{ flex: "1 1 300px" }}>
            <Step number="01" title="Install and configure"
              desc="Connect your Shopify store. Configure your sport allowlist — choose which activities earn in your program. Set reward thresholds and welcome bonuses. Takes minutes, not months."
              detail="Shopify Admin API · Sport allowlist" />
            <Step number="02" title="Athletes connect Strava"
              desc="Through your site, in your brand's experience. One OAuth flow. PROOF imports their entire activity history, runs every ride through the verification pipeline, and starts listening for new activities in real time."
              detail="OAuth · Historical import · Real-time webhooks" />
            <Step number="03" title="Verify and convert"
              desc="Every activity runs through PROOF's 9-gate fraud pipeline — GPS validation, sport-specific velocity ceilings, daily caps. Clean data converts to PROOF miles via the Effort Index. One cycling mile = 1 PM. One running mile = 3 PM. One swimming mile = 8 PM."
              detail="9-gate fraud pipeline · PEI conversion" />
            <Step number="04" title="Credit and reward"
              desc="PROOF credits lifetime PM (all sports) and brand PM (your allowed sports). When an athlete crosses a threshold, we generate a unique Shopify discount code and fire a webhook event to your email platform — your brand delivers the reward in your voice."
              detail="Shopify discount codes · 5 webhook event types" isLast />
          </div>
        </div>
      </Section>

      {/* ── ATHLETE EXPERIENCE (NEW) ── */}
      <div style={{ background: COLORS.surface, borderTop: `1px solid ${COLORS.surfaceBorder}`,
        borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
        <Section style={{ padding: "80px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.steel,
              letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Your customers&apos; experience</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 6vw, 52px)",
              color: COLORS.textBright, lineHeight: 1, marginBottom: 16 }}>
              What your customers see.
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: COLORS.subtle,
              maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              Your customers connect Strava once through your site. From that moment, every verified
              activity earns toward rewards at your store — automatically, in the background,
              with zero effort beyond doing the thing they already love.
            </p>
          </div>

          {/* Account page mockup */}
          <div className="account-mockup" style={{ background: COLORS.base,
            border: `1px solid ${COLORS.surfaceBorder}`, borderRadius: 20, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                  color: COLORS.muted, letterSpacing: "0.1em", marginBottom: 4 }}>YOUR BRAND · RIVAL</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42,
                  color: COLORS.signal, lineHeight: 1 }}>4,218</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                  color: COLORS.muted }}>PROOF MILES</div>
              </div>
              <VerifiedBadge size={40} />
            </div>
            {/* Milestone progress */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.text }}>Next milestone</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.muted }}>4,218 / 5,000 PM</span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.muted }}>$50 credit</span>
              </div>
              <div style={{ height: 4, background: COLORS.surfaceBorder, borderRadius: 2 }}>
                <div style={{ height: 4, background: COLORS.signal, borderRadius: 2, width: "84%",
                  transition: "width 1s ease" }} />
              </div>
            </div>
            {/* Pace indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: 8,
              padding: "10px 14px", background: COLORS.surfaceRaised,
              borderRadius: 10, marginBottom: 12 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.signal }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: COLORS.text }}>Steady</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: COLORS.muted, marginLeft: "auto" }}>215 PM/mo · ↑ Increasing</span>
            </div>
            {/* Reward available */}
            <div style={{ padding: "12px 14px", border: `1px solid ${COLORS.signal}33`,
              borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12,
                  fontWeight: 600, color: COLORS.textBright }}>$35 store credit</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                  color: COLORS.muted }}>2,500 pts available</div>
              </div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700,
                color: COLORS.base, background: COLORS.signal, padding: "6px 14px", borderRadius: 6 }}>Redeem</div>
            </div>
          </div>

          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: COLORS.subtle,
            lineHeight: 1.7, maxWidth: 520, margin: "40px auto 0", textAlign: "center" }}>
            Their PROOF identity is theirs. If they connect to another brand in the network,
            their effort profile and history travel with them — but your rewards stay yours.
            You only fund effort earned during your relationship.
          </p>
        </Section>
      </div>

      {/* ── ARCHITECTURE: TWO LAYERS ── */}
      <div id="platform" style={{ borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
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
              PROOF separates universal effort verification from per-brand reward economics.
              Identity travels. Rewards earn fresh.
            </p>
          </div>

          <div className="arch-flow" style={{ display: "flex", alignItems: "center", justifyContent: "center",
            gap: 16, margin: "48px auto", maxWidth: 700, flexWrap: "wrap" }}>
            {[
              { label: "Strava", sub: "GPS · All sports", color: COLORS.steel, glow: false },
              { label: "PROOF Ledger", sub: "Verify · PEI · Signals", color: COLORS.signal, glow: true },
              { label: "Your Brand", sub: "Shopify · Your ESP", color: COLORS.textBright, glow: false },
            ].map((node, i) => (
              <div key={i} className="arch-node" style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
                  <div className="arch-arrow" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18,
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
                { label: "PROOF Tier", desc: "Recruit, Contender, Rival, Elite, Legend — earned by lifetime PM. Recognition that travels with the athlete across every brand." },
                { label: "Lifetime PROOF miles (PM)", desc: "Effort-normalized via the PROOF Effort Index. Cumulative total across all sports. Never resets, never decreases." },
                { label: "Three-signal athlete profile", desc: "Lifetime PM (total experience), Pace (12-month rolling average, categorized), and Trend (3-month vs. 9-month direction). Visible to every enrolled brand." },
                { label: "Pace and Trend tracking", desc: "Current activity level categorized as Inactive, Light, Moderate, Steady, or High Volume. Trend shows whether the athlete is ramping up, stable, or slowing down." },
                { label: "Portable athlete identity", desc: "One Strava connection. Effort history travels to every brand the athlete joins. All PEI-supported sports verified at the PROOF layer." },
              ]}
            />
            <LayerCard
              accent={COLORS.textBright}
              title="Brand Layer"
              subtitle="Your program. Your rules."
              items={[
                { label: "Custom tier names", desc: "Map PROOF tiers to your brand's identity. Recruit becomes Sprinter. Rival becomes Domestique. Your program, your language." },
                { label: "Sport allowlist", desc: "Choose which PEI-supported sports earn in your program. A cycling brand rewards cycling. A running brand rewards running. PROOF verifies everything." },
                { label: "Brand PM", desc: "PROOF miles earned in your allowed sports since the athlete connected. Starts at zero plus a welcome bonus based on your configured rules against the athlete's three signals." },
                { label: "Milestone rewards", desc: "You define what lifetime brand PM thresholds unlock — discount codes, free shipping, exclusive access. Your budget, your economics, your rules." },
                { label: "Reward delivery", desc: "Shopify discount codes generated via Admin API. Webhook events fired to your email platform in real time. You build the flows in your voice." },
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
                A 5,000 PM athlete arrives as a Rival — recognized as serious everywhere. Their PROOF tier,
                lifetime PM, pace, and trend are visible at every enrolled brand. Benefits
                can be granted based on these signals on day one.
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

      {/* ── PROOF EFFORT INDEX (NEW) ── */}
      <Section id="effort-index">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted,
            letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>PROOF Effort Index</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 6vw, 52px)",
            color: COLORS.textBright, lineHeight: 1, marginBottom: 16 }}>
            Any sport. Any unit.<br />
            <span style={{ color: COLORS.subtle }}>One currency.</span>
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: COLORS.subtle,
            maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
            The PROOF Effort Index normalizes effort across every GPS-verified sport into a single unit: PROOF miles.
            One road cycling mile equals one PM. Every other sport converts based on physiological
            cost — MET-minutes per unit of distance.
          </p>
        </div>

        <PEIConversion />

        <div className="pei-table-wrap" style={{ marginTop: 32, background: COLORS.surface,
          border: `1px solid ${COLORS.surfaceBorder}`, borderRadius: 16 }}>
          <table className="pei-table" style={{ minWidth: 480 }}>
            <thead>
              <tr>
                <th>Sport</th>
                <th>Multiplier</th>
                <th>Unit</th>
                <th>Verification</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sport: "Road Cycling", mult: "1.0×", unit: "mile", type: "GPS", color: COLORS.signal },
                { sport: "Mountain Biking", mult: "1.5×", unit: "mile", type: "GPS", color: COLORS.signal },
                { sport: "Gravel / CX", mult: "1.2×", unit: "mile", type: "GPS", color: COLORS.signal },
                { sport: "E-Bike", mult: "0.4×", unit: "mile", type: "GPS", color: COLORS.muted },
                { sport: "Running", mult: "3.0×", unit: "mile", type: "GPS", color: COLORS.effort },
                { sport: "Trail Running", mult: "4.0×", unit: "mile", type: "GPS", color: COLORS.effort },
                { sport: "Walking / Hiking", mult: "1.0×", unit: "mile", type: "GPS", color: COLORS.steel },
                { sport: "Swimming (open water)", mult: "8.0×", unit: "mile", type: "GPS", color: COLORS.steel },
                { sport: "Swimming (pool)", mult: "6.0×", unit: "1,000m", type: "Device", color: COLORS.steel },
                { sport: "Rowing / Kayaking", mult: "2.0×", unit: "mile", type: "GPS", color: COLORS.steel },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.text }}>{row.sport}</td>
                  <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
                    color: row.color, fontWeight: 700 }}>{row.mult}</td>
                  <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                    color: COLORS.muted }}>{row.unit}</td>
                  <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                    color: COLORS.muted }}>{row.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
          color: COLORS.muted, marginTop: 12, textAlign: "center" }}>
          Anchor: 1 road cycling mile = 1 PM. All sports calibrated by MET-minutes per unit.
          Brands configure sport allowlist — not multipliers.
        </div>
      </Section>

      {/* ── CODE BLOCK ── */}
      <div style={{ borderTop: `1px solid ${COLORS.surfaceBorder}`, borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
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
              <span style={{ color: COLORS.muted }}>{"// PROOF fires events to your email platform"}</span>{"\n"}
              <span style={{ color: COLORS.muted }}>{"// proof_ = platform data, loyalty_ = brand data"}</span>{"\n\n"}
              <span style={{ color: "#c678dd" }}>Event</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>proof.milestone_reached</span>{"\n\n"}
              <span style={{ color: COLORS.muted }}>{"{"}</span>{"\n"}
              {"  "}<span style={{ color: COLORS.text }}>proof_lifetime_pm</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: "#d19a66" }}>4218</span>
              <span style={{ color: COLORS.muted }}>,</span>{"\n"}
              {"  "}<span style={{ color: COLORS.text }}>proof_pace_category</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>{'"Steady"'}</span>
              <span style={{ color: COLORS.muted }}>,</span>{"\n"}
              {"  "}<span style={{ color: COLORS.text }}>proof_trend</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>{'"Increasing"'}</span>
              <span style={{ color: COLORS.muted }}>,</span>{"\n"}
              {"  "}<span style={{ color: COLORS.text }}>loyalty_brand_pm</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: "#d19a66" }}>2500</span>
              <span style={{ color: COLORS.muted }}>,</span>{"\n"}
              {"  "}<span style={{ color: COLORS.text }}>loyalty_next_milestone_pm</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: "#d19a66" }}>5000</span>
              <span style={{ color: COLORS.muted }}>,</span>{"\n"}
              {"  "}<span style={{ color: COLORS.text }}>reward</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.muted }}>{"{"}</span>{"\n"}
              {"    "}<span style={{ color: COLORS.text }}>type</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>{'"shopify_discount"'}</span>
              <span style={{ color: COLORS.muted }}>,</span>{"\n"}
              {"    "}<span style={{ color: COLORS.text }}>code</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>{'"PROOF-A1B2C3D4"'}</span>
              <span style={{ color: COLORS.muted }}>,</span>{"\n"}
              {"    "}<span style={{ color: COLORS.text }}>value</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>{'"$35 off"'}</span>
              <span style={{ color: COLORS.muted }}>,</span>{"\n"}
              {"    "}<span style={{ color: COLORS.text }}>sport</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>{'"cycling"'}</span>{"\n"}
              {"  "}<span style={{ color: COLORS.muted }}>{"}"}</span>{"\n"}
              <span style={{ color: COLORS.muted }}>{"}"}</span>
            </pre>
          </div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.signal }}>proof_ = platform data</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.text }}>loyalty_ = brand data</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.steel }}>5 event types total</span>
          </div>
        </Section>
      </div>

      {/* ── NETWORK (NEW) ── */}
      <Section id="network">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted,
            letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>The Network</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 6vw, 52px)",
            color: COLORS.textBright, lineHeight: 1, marginBottom: 16 }}>
            One network. Every brand.
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: COLORS.subtle,
            maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Every brand on PROOF shares a growing network of verified athletes. When an athlete connects
            through any brand, they bring their verified effort history with them.
          </p>
        </div>

        <div style={{ maxWidth: 720, margin: "0 auto", background: COLORS.surface,
          border: `1px solid ${COLORS.surfaceBorder}`, borderRadius: 16, padding: "40px 32px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center",
            gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
            {["Cycling", "Running", "Training", "Swimming", "Outdoor"].map((cat, i) => (
              <div key={i} style={{ padding: "10px 20px", borderRadius: 10,
                border: `1px solid ${COLORS.surfaceBorder}`, background: COLORS.surfaceRaised }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12,
                  fontWeight: 700, color: COLORS.text }}>{cat}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                  color: COLORS.muted }}>brands</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              color: COLORS.signal, marginBottom: 12 }}>
              ← Athletes carry their PROOF identity between brands →
            </div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.subtle, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
              For brands, athletes arrive pre-qualified. A runner who connected through a footwear brand already has a PROOF profile
              when they discover your store. You recognize their effort on day one — no cold start, no re-verification.
            </p>
          </div>
        </div>
      </Section>

      {/* ── FOR BRANDS ── */}
      <div style={{ borderTop: `1px solid ${COLORS.surfaceBorder}` }}>
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
              set the thresholds, configure your sport allowlist, and deliver the rewards. We verify the effort and run the ledger.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            {[
              { icon: (
                <svg width="40" height="36" viewBox="0 0 40 36" fill="none">
                  <rect x="0" y="6" width="12" height="20" rx="2" stroke={COLORS.signal} strokeWidth="1.5" opacity={0.35} />
                  <rect x="14" y="6" width="12" height="20" rx="2" stroke={COLORS.signal} strokeWidth="1.5" opacity={0.55} />
                  <rect x="28" y="6" width="12" height="20" rx="2" stroke={COLORS.signal} strokeWidth="1.5" opacity={0.8} />
                  <line x1="12" y1="16" x2="14" y2="16" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" opacity={0.3} />
                  <line x1="26" y1="16" x2="28" y2="16" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" opacity={0.5} />
                  <circle cx="34" cy="6" r="5" fill={COLORS.surface} stroke={COLORS.signal} strokeWidth="1.5" />
                  <path d="M31.5 6L33.5 8L37 4.5" stroke={COLORS.signal} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              ), title: "Verified effort ledger", desc: "PROOF-owned PostgreSQL database. Lifetime PM, brand PM, pace and trend calculations, activity history. Yours to query, ours to maintain." },
              { icon: (
                <svg width="32" height="34" viewBox="0 0 32 34" fill="none">
                  <rect x="0" y="0" width="30" height="32" rx="3" stroke={COLORS.signal} strokeWidth="1" opacity={0.2} />
                  <line x1="6" y1="8" x2="24" y2="8" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" opacity={0.3} />
                  <circle cx="20" cy="8" r="3" fill={COLORS.signal} opacity={0.8} />
                  <line x1="6" y1="16" x2="24" y2="16" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" opacity={0.3} />
                  <circle cx="16" cy="16" r="3" fill={COLORS.signal} opacity={0.8} />
                  <line x1="6" y1="24" x2="24" y2="24" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" opacity={0.3} />
                  <circle cx="10" cy="24" r="3" fill="none" stroke={COLORS.signal} strokeWidth="1.2" opacity={0.4} />
                </svg>
              ), title: "Sport allowlist", desc: "Choose which sports earn in your program. Road cycling, MTB, running, swimming, rowing — configure once, PROOF filters automatically via the Effort Index." },
              { icon: (
                <svg width="44" height="34" viewBox="0 0 44 34" fill="none">
                  <rect x="0" y="1" width="2.5" height="32" rx="1" fill={COLORS.signal} opacity={0.15} />
                  <rect x="5" y="1" width="2.5" height="32" rx="1" fill={COLORS.signal} opacity={0.22} />
                  <rect x="10" y="1" width="2.5" height="32" rx="1" fill={COLORS.signal} opacity={0.3} />
                  <rect x="15" y="1" width="2.5" height="32" rx="1" fill={COLORS.signal} opacity={0.38} />
                  <rect x="20" y="1" width="2.5" height="32" rx="1" fill={COLORS.signal} opacity={0.48} />
                  <rect x="25" y="1" width="2.5" height="32" rx="1" fill={COLORS.signal} opacity={0.58} />
                  <rect x="30" y="1" width="2.5" height="32" rx="1" fill={COLORS.signal} opacity={0.7} />
                  <rect x="35" y="1" width="2.5" height="32" rx="1" fill={COLORS.signal} opacity={0.84} />
                  <rect x="40" y="1" width="2.5" height="32" rx="1" fill={COLORS.signal} opacity={1} />
                </svg>
              ), title: "9-gate fraud pipeline", desc: "GPS validation, sport-specific velocity ceilings, daily caps per sport, idempotency checks, anomaly detection. Your loyalty budget goes to real athletes." },
              { icon: (
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <rect x="4" y="28" width="8" height="6" rx="1.5" fill={COLORS.signal} opacity={0.9} />
                  <rect x="4" y="20" width="8" height="14" rx="1.5" stroke={COLORS.signal} strokeWidth="1" opacity={0.3} />
                  <polyline points="16,26 19,20 22,24 25,16 28,18" stroke={COLORS.signal} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={0.7} />
                  <line x1="30" y1="10" x2="30" y2="4" stroke={COLORS.signal} strokeWidth="1.8" strokeLinecap="round" opacity={0.9} />
                  <polyline points="27,7 30,4 33,7" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={0.9} />
                </svg>
              ), title: "Tier + three-signal athlete profile", desc: "Every athlete earns a PROOF tier (Recruit → Legend) for recognition, plus three signals: Lifetime PM, Pace, and Trend. Tiers provide identity. Signals drive economics. Brands can map custom tier names to match their voice." },
              { icon: (
                <svg width="36" height="34" viewBox="0 0 36 34" fill="none">
                  <circle cx="6" cy="16" r="5" stroke={COLORS.signal} strokeWidth="1.5" />
                  <circle cx="6" cy="16" r="2" fill={COLORS.signal} opacity={0.6} />
                  <line x1="11" y1="16" x2="18" y2="16" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="18" y1="16" x2="26" y2="8" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="18" y1="16" x2="26" y2="16" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="18" y1="16" x2="26" y2="24" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="28" cy="8" r="3" stroke={COLORS.signal} strokeWidth="1" opacity={0.5} />
                  <circle cx="28" cy="16" r="3" stroke={COLORS.signal} strokeWidth="1" opacity={0.5} />
                  <circle cx="28" cy="24" r="3" stroke={COLORS.signal} strokeWidth="1" opacity={0.5} />
                </svg>
              ), title: "Shopify native + any email provider", desc: "Discount codes via Admin API. 5 webhook event types fired to Klaviyo, Mailchimp, or any ESP. No middleware, no third-party loyalty platform. PROOF is the engine." },
              { icon: (
                <svg width="34" height="36" viewBox="0 0 34 36" fill="none">
                  <line x1="6" y1="6" x2="16" y2="16" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" opacity={0.3} />
                  <line x1="26" y1="6" x2="16" y2="16" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" opacity={0.3} />
                  <line x1="16" y1="16" x2="6" y2="28" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" opacity={0.3} />
                  <line x1="16" y1="16" x2="26" y2="28" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" opacity={0.3} />
                  <line x1="6" y1="6" x2="26" y2="6" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" opacity={0.2} />
                  <line x1="6" y1="28" x2="26" y2="28" stroke={COLORS.signal} strokeWidth="1.5" strokeLinecap="round" opacity={0.2} />
                  <circle cx="6" cy="6" r="4" fill={COLORS.surface} stroke={COLORS.signal} strokeWidth="1.5" />
                  <circle cx="26" cy="6" r="4" fill={COLORS.surface} stroke={COLORS.signal} strokeWidth="1.5" />
                  <circle cx="16" cy="16" r="5" fill={COLORS.signal} opacity={0.9} />
                  <circle cx="6" cy="28" r="4" fill={COLORS.surface} stroke={COLORS.signal} strokeWidth="1.5" />
                  <circle cx="26" cy="28" r="4" fill={COLORS.surface} stroke={COLORS.signal} strokeWidth="1.5" />
                </svg>
              ), title: "Network effect built in", desc: "One Strava connection, every enrolled brand. Athletes carry their PROOF identity. As the network grows, pre-qualified athletes discover your store." },
            ].map((item, i) => (
              <div key={i} style={{ flex: "1 1 280px", maxWidth: 380, background: COLORS.surface,
                border: `1px solid ${COLORS.surfaceBorder}`, borderRadius: 16, padding: "28px",
                transition: "border-color 0.3s ease" }}
                onMouseOver={e => (e.currentTarget as HTMLDivElement).style.borderColor = COLORS.signal + "33"}
                onMouseOut={e => (e.currentTarget as HTMLDivElement).style.borderColor = COLORS.surfaceBorder}>
                <div style={{ marginBottom: 16, height: 40, display: "flex", alignItems: "center" }}>{item.icon}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700,
                  color: COLORS.textBright, marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.subtle,
                  lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ── INTEGRATIONS ── */}
      <div style={{ borderTop: `1px solid ${COLORS.surfaceBorder}`, borderBottom: `1px solid ${COLORS.surfaceBorder}`,
        background: COLORS.surface }}>
        <div className="integrations-bar" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px",
          display: "flex", justifyContent: "center", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700,
              color: COLORS.signal, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Live</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.text }}>Strava</div>
          </div>
          <div className="integrations-divider" style={{ width: 1, height: 32, background: COLORS.surfaceBorder }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700,
              color: COLORS.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Commerce</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.text }}>Shopify</div>
          </div>
          <div className="integrations-divider" style={{ width: 1, height: 32, background: COLORS.surfaceBorder }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700,
              color: COLORS.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Email</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.text }}>Klaviyo · Mailchimp · Any ESP</div>
          </div>
          <div className="integrations-divider" style={{ width: 1, height: 32, background: COLORS.surfaceBorder }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700,
              color: COLORS.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>In development</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.muted }}>Garmin · Apple Health · Peloton · Whoop · Zwift · 20+ more</div>
          </div>
        </div>
      </div>

      {/* ── BRAND DASHBOARD ── */}
      <div style={{ borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
        <Section id="dashboard">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted,
              letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Brand dashboard</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 6vw, 52px)",
              color: COLORS.textBright, lineHeight: 1, marginBottom: 16 }}>
              See every verified mile.<br />
              <span style={{ color: COLORS.subtle }}>Own every insight.</span>
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: COLORS.subtle,
              lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
              Every brand on PROOF gets a dashboard from day one. Monitor verification in real time, track program health, and see exactly what your loyalty investment delivers.
            </p>
          </div>

          {/* Dashboard mockup */}
          <div style={{ background: COLORS.base, border: `1px solid ${COLORS.surfaceBorder}`, borderRadius: 16, overflow: "hidden", maxWidth: 960, margin: "0 auto" }}>
            {/* Top bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: `1px solid ${COLORS.surfaceBorder}`, background: COLORS.surface }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.06em", color: COLORS.textBright }}>PROOF</span>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, color: COLORS.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>Basecamp Athletics Effort Club</span>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: COLORS.base, background: COLORS.signal, padding: "2px 8px", borderRadius: 3, letterSpacing: "0.05em" }}>STARTER</span>
            </div>

            <div style={{ display: "flex" }}>
              {/* Sidebar */}
              <div className="dash-sidebar" style={{ width: 140, borderRight: `1px solid ${COLORS.surfaceBorder}`, padding: "16px 0", background: COLORS.surface, flexShrink: 0 }}>
                {["Overview", "Athletes", "Activity", "Rewards", "Config", "Billing"].map((item, i) => (
                  <div key={i} style={{ padding: "7px 16px", fontFamily: "'Syne', sans-serif", fontSize: 11, color: i === 0 ? COLORS.signal : COLORS.muted, borderLeft: `2px solid ${i === 0 ? COLORS.signal : "transparent"}`, cursor: "default" }}>{item}</div>
                ))}
              </div>

              {/* Main content */}
              <div style={{ flex: 1, padding: "20px 24px", minWidth: 0 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 700, color: COLORS.muted, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>Program overview · last 30 days</div>

                {/* Metrics row */}
                <div className="dash-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
                  {[
                    { label: "Active members", value: "847", color: COLORS.signal, sub: "+12% vs prior 30d", subColor: COLORS.signal },
                    { label: "Verified activities", value: "1,243", color: COLORS.textBright, sub: "+8% vs prior 30d", subColor: COLORS.signal },
                    { label: "PM credited", value: "38,491", color: COLORS.textBright, sub: "30.9 avg PM / member", subColor: COLORS.muted },
                    { label: "Rewards issued", value: "23", color: COLORS.textBright, sub: "78% redeemed", subColor: COLORS.muted },
                  ].map((m, i) => (
                    <div key={i} style={{ background: COLORS.surfaceRaised, border: `1px solid ${COLORS.surfaceBorder}`, borderRadius: 8, padding: "12px 14px" }}>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 8, color: COLORS.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{m.label}</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 700, color: m.color, lineHeight: 1 }}>{m.value}</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: m.subColor, marginTop: 4 }}>{m.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Two-column content */}
                <div className="dash-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                  {/* Activity chart */}
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 700, color: COLORS.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Daily verified activities</div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 60 }}>
                      {[45,52,38,60,72,25,18,55,65,48,78,90,35,100].map((h, i) => (
                        <div key={i} style={{ flex: 1, background: COLORS.signal, borderRadius: 2, height: `${h}%`, opacity: 0.5 + (h / 200) }} />
                      ))}
                    </div>
                  </div>

                  {/* Pace distribution */}
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 700, color: COLORS.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Pace distribution</div>
                    {[
                      { name: "Inactive", w: "8%", color: COLORS.muted, count: "68" },
                      { name: "Light", w: "22%", color: COLORS.muted, count: "186" },
                      { name: "Moderate", w: "35%", color: COLORS.steel, count: "296" },
                      { name: "Steady", w: "28%", color: COLORS.signal, count: "237" },
                      { name: "High Vol.", w: "7%", color: COLORS.effort, count: "60" },
                    ].map((t, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, color: COLORS.subtle, width: 70, flexShrink: 0 }}>{t.name}</span>
                        <div style={{ flex: 1, height: 6, background: COLORS.surfaceRaised, borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ width: t.w, height: "100%", background: t.color, borderRadius: 3 }} />
                        </div>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: COLORS.muted, width: 28, textAlign: "right", flexShrink: 0 }}>{t.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity feed */}
                <div className="dash-feed-wrap">
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 700, color: COLORS.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Recent verified activity</div>
                  <div className="dash-feed-scroll">
                {[
                  { name: "J. Matsuda", sport: "ROAD", miles: "34.2 mi", pm: "+34.2 PM", status: "VERIFIED", ok: true, time: "12m" },
                  { name: "R. Chen", sport: "MTB", miles: "18.7 mi", pm: "+28.1 PM", status: "VERIFIED", ok: true, time: "24m" },
                  { name: "A. Ramirez", sport: "GRAVEL", miles: "42.1 mi", pm: "+50.5 PM", status: "VERIFIED", ok: true, time: "1h" },
                  { name: "T. Novak", sport: "ROAD", miles: "6.1 mi", pm: "—", status: "NO GPS", ok: false, time: "2h" },
                  { name: "K. Okonkwo", sport: "ROAD", miles: "21.8 mi", pm: "+21.8 PM", status: "VERIFIED", ok: true, time: "3h" },
                ].map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${COLORS.surfaceBorder}`, minWidth: 460 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: a.ok ? COLORS.signal : COLORS.effort, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: COLORS.text, width: 80, flexShrink: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: COLORS.muted, background: COLORS.surfaceRaised, padding: "1px 6px", borderRadius: 3, flexShrink: 0 }}>{a.sport}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.steel, width: 50, textAlign: "right", flexShrink: 0 }}>{a.miles}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: a.ok ? COLORS.signal : COLORS.muted, width: 55, textAlign: "right", flexShrink: 0 }}>{a.pm}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, padding: "1px 6px", borderRadius: 3, flexShrink: 0, color: a.ok ? COLORS.base : COLORS.effort, background: a.ok ? COLORS.signal : "rgba(255,61,0,0.1)" }}>{a.status}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: COLORS.muted, marginLeft: "auto", flexShrink: 0 }}>{a.time}</span>
                  </div>
                ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Billing bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", borderTop: `1px solid ${COLORS.surfaceBorder}`, background: COLORS.surface }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 9, color: COLORS.muted, letterSpacing: "0.08em", textTransform: "uppercase", flexShrink: 0 }}>Active members</span>
              <div style={{ flex: 1, height: 4, background: COLORS.surfaceRaised, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: "84.7%", height: "100%", background: COLORS.signal, borderRadius: 2 }} />
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.subtle, flexShrink: 0 }}>847 / 1,000</span>
            </div>
          </div>

          {/* Dashboard tier callout */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 40, maxWidth: 800, margin: "40px auto 0" }}>
            {[
              { tier: "Developer", desc: "Basic monitoring — members, activities, billing cap", color: COLORS.muted },
              { tier: "Starter", desc: "Program dashboard — rewards, athlete profiles, config", color: COLORS.signal },
              { tier: "Scale", desc: "Advanced analytics — cohorts, funnels, exports, API", color: COLORS.steel },
              { tier: "Growth", desc: "Custom reporting — anomaly alerts, program health score", color: COLORS.effort },
            ].map((d, i) => (
              <div key={i} style={{ flex: "1 1 160px", maxWidth: 200, padding: "16px", background: COLORS.surface, border: `1px solid ${COLORS.surfaceBorder}`, borderRadius: 10, borderTop: `2px solid ${d.color}` }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, color: d.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{d.tier}</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: COLORS.subtle, lineHeight: 1.5 }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ── PRICING ── */}
      <div style={{ borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
        <Section id="pricing">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted,
              letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Pricing</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 6vw, 52px)",
              color: COLORS.textBright, lineHeight: 1, marginBottom: 16 }}>
              Flat pricing. No surprises.
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: COLORS.subtle,
              maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              No setup fees. No per-transaction cuts. No revenue share. Start free, upgrade as you grow.
              Each brand funds their own rewards independently.
            </p>
          </div>

          {/* Annual / Monthly toggle */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 40 }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13,
              color: annualPricing ? COLORS.muted : COLORS.text, transition: "color 0.2s" }}>Monthly</span>
            <button onClick={() => setAnnualPricing(a => !a)}
              style={{ width: 48, height: 26, borderRadius: 13, border: "none", cursor: "pointer",
                background: annualPricing ? COLORS.signal : COLORS.surfaceBorder, position: "relative",
                transition: "background 0.3s ease" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: COLORS.textBright,
                position: "absolute", top: 3,
                left: annualPricing ? 25 : 3,
                transition: "left 0.3s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }} />
            </button>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13,
              color: annualPricing ? COLORS.text : COLORS.muted, transition: "color 0.2s" }}>Annual</span>
            {annualPricing && (
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: COLORS.signal, background: COLORS.signalDim, padding: "3px 8px", borderRadius: 4 }}>
                Save 20%
              </span>
            )}
          </div>

          {/* 5-tier pricing cards */}
          <div className="pricing-cards" style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", alignItems: "stretch" }}>
            <PricingCard name="Developer" price="Free" members="Up to 100 active members"
              features={["Core GPS verification", "PROOF tiers + three-signal profiles", "Basic dashboard", "Strava integration", "Docs + community"]}
              cta="Get started free" />
            <PricingCard name="Starter"
              price={annualPricing ? "$119" : "$149"} period="/mo"
              members="Up to 1,000 active members"
              features={["Everything in Developer", "Program dashboard", "Webhook events (5 types)", "Welcome bonus rules", "Advanced fraud detection", "Email support"]}
              cta="Start free trial" />
            <PricingCard name="Scale"
              price={annualPricing ? "$359" : "$449"} period="/mo"
              members="Up to 10,000 active members" highlight
              features={["Everything in Starter", "Advanced analytics + exports", "Unlimited integrations", "Custom badge styling", "Webhooks + API access", "Priority support + Slack"]}
              cta="Start free trial" />
            <PricingCard name="Growth"
              price={annualPricing ? "$639" : "$799"} period="/mo"
              members="Up to 25,000 active members"
              features={["Everything in Scale", "Custom reporting", "Anomaly alerts + flagging", "Dedicated CSM"]}
              cta="Start free trial" />
            <PricingCard name="Enterprise" price="Custom" members="Unlimited members"
              features={["Everything in Growth", "SLA + SOC 2 docs", "White-label badge option", "Named account manager"]}
              cta="Talk to us" />
          </div>

          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            color: COLORS.muted, textAlign: "center", marginTop: 16 }}>
            Active members = at least one verified activity in a trailing 180-day window.
            {annualPricing ? " Prices shown reflect annual prepayment." : " Save 20% with annual billing."}
          </div>

          {/* Feature comparison table */}
          <div className="feature-table-wrap" style={{ marginTop: 64, overflowX: "auto" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700,
              color: COLORS.subtle, textTransform: "uppercase", letterSpacing: "0.12em",
              textAlign: "center", marginBottom: 20 }}>
              Compare plans
            </div>
            <table style={{ width: "100%", minWidth: 700, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
                  {["Feature", "Developer", "Starter", "Scale", "Growth", "Enterprise"].map((h, i) => (
                    <th key={i} style={{ padding: "12px 10px", textAlign: i === 0 ? "left" : "center",
                      fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700,
                      color: h === "Scale" ? COLORS.signal : COLORS.muted,
                      letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Core verification (GPS, fraud gates)", vals: ["✓", "✓", "✓", "✓", "✓"] },
                  { feature: "PROOF Verified Effort badge", vals: ["✓", "✓", "✓", "✓", "✓"] },
                  { feature: "PROOF tiers + three-signal profiles", vals: ["✓", "✓", "✓", "✓", "✓"] },
                  { feature: "Basic dashboard (members, activities, billing)", vals: ["✓", "✓", "✓", "✓", "✓"] },
                  { feature: "Webhook event integration (5 events)", vals: ["—", "✓", "✓", "✓", "✓"] },
                  { feature: "Advanced fraud detection + anomaly", vals: ["—", "✓", "✓", "✓", "✓"] },
                  { feature: "Program dashboard (rewards, profiles, config)", vals: ["—", "✓", "✓", "✓", "✓"] },
                  { feature: "Welcome bonus rule configuration", vals: ["—", "✓", "✓", "✓", "✓"] },
                  { feature: "Fitness platform integrations", vals: ["Strava", "Up to 3", "Unlimited", "Unlimited", "Unlimited"] },
                  { feature: "Advanced analytics + exports", vals: ["—", "—", "✓", "✓", "✓"] },
                  { feature: "Custom badge styling", vals: ["—", "—", "✓", "✓", "✓"] },
                  { feature: "Webhooks + API access", vals: ["—", "—", "✓", "✓", "✓"] },
                  { feature: "Custom reporting", vals: ["—", "—", "—", "✓", "✓"] },
                  { feature: "Anomaly alerts + flagging", vals: ["—", "—", "—", "✓", "✓"] },
                  { feature: "SLA + SOC 2 documentation", vals: ["—", "—", "—", "—", "✓"] },
                  { feature: "White-label badge option", vals: ["—", "—", "—", "—", "✓"] },
                  { feature: "Support", vals: ["Docs", "Email", "Priority + Slack", "Dedicated CSM", "Named acct mgr"] },
                ].map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
                    <td style={{ padding: "11px 10px", fontFamily: "'Outfit', sans-serif", fontSize: 13,
                      color: COLORS.text }}>{row.feature}</td>
                    {row.vals.map((val, vi) => (
                      <td key={vi} style={{ padding: "11px 10px", textAlign: "center",
                        fontFamily: val === "✓" || val === "—" ? "'Outfit', sans-serif" : "'JetBrains Mono', monospace",
                        fontSize: val === "✓" || val === "—" ? 14 : 10,
                        color: val === "✓" ? COLORS.signal : val === "—" ? COLORS.muted : COLORS.subtle }}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Overage note */}
          <div style={{ maxWidth: 600, margin: "32px auto 0", textAlign: "center",
            padding: "16px 24px", background: COLORS.surface,
            border: `1px solid ${COLORS.surfaceBorder}`, borderRadius: 12 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700,
              color: COLORS.subtle, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
              No hard caps
            </div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.muted, lineHeight: 1.6 }}>
              If you exceed your tier&apos;s active member limit, we charge a small per-member overage
              rather than cutting verification. Starter $0.15/member, Scale $0.06, Growth $0.04.
              Enterprise is unlimited.
            </p>
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
            Get early access.
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: COLORS.subtle,
            maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.7 }}>
            PROOF is onboarding brands now. Join the waitlist and we&apos;ll reach out
            when your spot is ready.
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
                  {formState === "loading" ? "Sending…" : "Get early access"}
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
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "#" },
              { label: "Documentation", href: "#" },
              { label: "Status", href: "#" },
            ].map((link, i) => (
              <a key={i} href={link.href} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12,
                color: COLORS.muted, textDecoration: "none" }}
                onMouseOver={e => (e.target as HTMLAnchorElement).style.color = COLORS.text}
                onMouseOut={e => (e.target as HTMLAnchorElement).style.color = COLORS.muted}>
                {link.label}
              </a>
            ))}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted }}>
            © 2026 Proof Technologies, Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}
