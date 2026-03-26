import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   PROOF — Verified Effort Loyalty Infrastructure
   Model C: "Earn Globally, Redeem Per-Brand"
   Brand: Near-monochrome black + Signal Green
   Signal Green (#C8FF00) fires ONLY on verification
   Motion means something happened. Idle UI is still.
   ───────────────────────────────────────────── */

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
  effortRed: "#FF3D00",
  steel: "#8BA0B4",
  dust: "#888888",
  rail: "#222222",
};

/* ── Intersection Observer hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
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
  return [ref, inView];
}

/* ── Verified badge (the core trust mark) ── */
const VerifiedBadge = ({ size = 48, animate = false }) => {
  const [fired, setFired] = useState(false);
  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setFired(true), 600);
      return () => clearTimeout(t);
    }
  }, [animate]);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {fired && (
        <div style={{
          position: "absolute", inset: -8,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.signalGlow} 0%, transparent 70%)`,
          animation: "pulseGlow 2s ease-out forwards",
        }} />
      )}
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke={fired ? COLORS.signal : COLORS.muted} strokeWidth="2" fill={fired ? COLORS.signalDim : "transparent"} style={{ transition: "all 0.6s ease" }} />
        <path
          d="M15 24.5L21 30.5L33 18.5"
          stroke={fired ? COLORS.signal : COLORS.muted}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 30,
            strokeDashoffset: fired ? 0 : 30,
            transition: "stroke-dashoffset 0.5s ease 0.3s, stroke 0.4s ease",
          }}
        />
      </svg>
    </div>
  );
};

/* ── Section wrapper ── */
const Section = ({ children, style = {}, id }) => {
  const [ref, inView] = useInView(0.08);
  return (
    <section
      id={id}
      ref={ref}
      style={{
        padding: "120px 24px",
        maxWidth: 1200,
        margin: "0 auto",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </section>
  );
};

/* ── Pricing Card ── */
const PricingCard = ({ name, price, period, features, highlight, cta }) => (
  <div style={{
    background: highlight ? COLORS.surfaceRaised : COLORS.surface,
    border: `1px solid ${highlight ? COLORS.signal : COLORS.surfaceBorder}`,
    borderRadius: 16,
    padding: "40px 32px",
    position: "relative",
    overflow: "hidden",
    flex: "1 1 320px",
    maxWidth: 380,
    boxShadow: highlight ? `0 0 60px ${COLORS.signalDim}` : "none",
  }}>
    {highlight && (
      <div style={{
        position: "absolute", top: 16, right: -32,
        background: COLORS.signal, color: COLORS.base,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
        padding: "4px 40px", transform: "rotate(45deg)",
        letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        Popular
      </div>
    )}
    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: COLORS.subtle, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>{name}</div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, color: COLORS.textBright, lineHeight: 1 }}>{price}</span>
      {period && <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.muted }}>{period}</span>}
    </div>
    <div style={{ width: 40, height: 2, background: highlight ? COLORS.signal : COLORS.surfaceBorder, marginBottom: 28, transition: "background 0.3s" }} />
    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
      {features.map((f, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ color: highlight ? COLORS.signal : COLORS.subtle, fontSize: 14, lineHeight: "22px", flexShrink: 0 }}>✓</span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.text, lineHeight: "22px" }}>{f}</span>
        </div>
      ))}
    </div>
    <button style={{
      width: "100%", padding: "14px 0",
      background: highlight ? COLORS.signal : "transparent",
      color: highlight ? COLORS.base : COLORS.text,
      border: highlight ? "none" : `1px solid ${COLORS.surfaceBorder}`,
      borderRadius: 8, cursor: "pointer",
      fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700,
      letterSpacing: "0.05em", textTransform: "uppercase",
      transition: "all 0.2s ease",
    }}
      onMouseOver={e => {
        if (!highlight) { e.target.style.borderColor = COLORS.signal; e.target.style.color = COLORS.signal; }
      }}
      onMouseOut={e => {
        if (!highlight) { e.target.style.borderColor = COLORS.surfaceBorder; e.target.style.color = COLORS.text; }
      }}
    >
      {cta}
    </button>
  </div>
);

/* ── How-it-works step ── */
const Step = ({ number, title, desc, isLast }) => (
  <div style={{ display: "flex", gap: 24, alignItems: "flex-start", position: "relative" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        border: `2px solid ${COLORS.signal}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: COLORS.signal,
      }}>
        {number}
      </div>
      {!isLast && <div style={{ width: 1, height: 60, background: COLORS.surfaceBorder, marginTop: 8 }} />}
    </div>
    <div style={{ paddingTop: 8, paddingBottom: isLast ? 0 : 40 }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: COLORS.textBright, marginBottom: 6 }}>{title}</div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: COLORS.subtle, lineHeight: 1.7, maxWidth: 440 }}>{desc}</div>
    </div>
  </div>
);

/* ── Sport unit pills ── */
const UnitPill = ({ text }) => (
  <span style={{
    display: "inline-block",
    padding: "6px 16px",
    border: `1px solid ${COLORS.surfaceBorder}`,
    borderRadius: 100,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    color: COLORS.subtle,
    letterSpacing: "0.05em",
    transition: "all 0.3s ease",
  }}
    onMouseOver={e => { e.target.style.borderColor = COLORS.signal; e.target.style.color = COLORS.signal; }}
    onMouseOut={e => { e.target.style.borderColor = COLORS.surfaceBorder; e.target.style.color = COLORS.subtle; }}
  >
    {text}
  </span>
);

/* ── Architecture flow diagram ── */
const ArchitectureFlow = () => {
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref} style={{
      background: COLORS.surface,
      border: `1px solid ${COLORS.surfaceBorder}`,
      borderRadius: 16,
      padding: "40px 32px",
      maxWidth: 720,
      margin: "0 auto",
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        color: COLORS.muted, letterSpacing: "0.15em", textTransform: "uppercase",
        marginBottom: 28, textAlign: "center",
      }}>
        Model C — Earn Globally, Redeem Per-Brand
      </div>

      {/* Flow nodes */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap" }}>
        {[
          { label: "Strava", sub: "GPS-verified activity", color: COLORS.steel },
          null, // arrow
          { label: "PROOF", sub: "Verify · Ledger · Tiers", color: COLORS.signal },
          null, // arrow
          { label: "Your Brand", sub: "Shopify · Klaviyo · Rewards", color: COLORS.text },
        ].map((item, i) => {
          if (!item) {
            return (
              <div key={i} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 18, color: COLORS.muted, padding: "0 12px",
                opacity: inView ? 1 : 0,
                transition: `opacity 0.4s ease ${0.3 + i * 0.15}s`,
              }}>→</div>
            );
          }
          return (
            <div key={i} style={{
              textAlign: "center",
              padding: "20px 24px",
              border: `1px solid ${item.color === COLORS.signal ? COLORS.signal + "44" : COLORS.surfaceBorder}`,
              borderRadius: 12,
              background: item.color === COLORS.signal ? COLORS.signalDim : "transparent",
              minWidth: 160,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(12px)",
              transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.15}s`,
            }}>
              <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15,
                color: item.color, marginBottom: 4,
              }}>{item.label}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: COLORS.muted, letterSpacing: "0.05em",
              }}>{item.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Two-layer callout */}
      <div style={{
        display: "flex", gap: 16, marginTop: 28, justifyContent: "center", flexWrap: "wrap",
        opacity: inView ? 1 : 0,
        transition: "opacity 0.5s ease 0.8s",
      }}>
        <div style={{
          flex: "1 1 200px", maxWidth: 300,
          padding: "16px 20px",
          border: `1px solid ${COLORS.signal}33`,
          borderRadius: 10,
          background: COLORS.signalDim,
        }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: COLORS.signal, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            PROOF Layer
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.subtle, lineHeight: 1.6 }}>
            Lifetime miles, verified tiers, athlete identity. Portable across every brand.
          </div>
        </div>
        <div style={{
          flex: "1 1 200px", maxWidth: 300,
          padding: "16px 20px",
          border: `1px solid ${COLORS.surfaceBorder}`,
          borderRadius: 10,
        }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: COLORS.text, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Brand Layer
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.subtle, lineHeight: 1.6 }}>
            Your thresholds, your rewards, your voice. Brand miles start fresh per-relationship.
          </div>
        </div>
      </div>
    </div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN APP
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function ProofWebsite() {
  const [heroReady, setHeroReady] = useState(false);
  const [verified, setVerified] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setTimeout(() => setHeroReady(true), 100);
    setTimeout(() => setVerified(true), 1800);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hero-headline { font-size: clamp(48px, 10vw, 100px) !important; }
          .flow-container { flex-direction: column !important; }
          .flow-arrow { transform: rotate(90deg) !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(5,5,5,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.surfaceBorder}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              border: `2px solid ${COLORS.textBright}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: COLORS.textBright,
            }}>P</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: COLORS.textBright, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Proof
            </span>
          </div>
          <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {["How it works", "For brands", "Pricing"].map((item, i) => (
              <a key={i} href={`#${item.toLowerCase().replace(/ /g, "-")}`} style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.subtle,
                textDecoration: "none", letterSpacing: "0.02em",
                transition: "color 0.2s",
              }}
                onMouseOver={e => e.target.style.color = COLORS.textBright}
                onMouseOut={e => e.target.style.color = COLORS.subtle}
              >
                {item}
              </a>
            ))}
            <a href="#waitlist" style={{
              fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700,
              color: COLORS.base, background: COLORS.signal,
              padding: "8px 20px", borderRadius: 6,
              textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase",
              transition: "opacity 0.2s",
            }}
              onMouseOver={e => e.target.style.opacity = 0.85}
              onMouseOut={e => e.target.style.opacity = 1}
            >
              Get early access
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {/* Subtle grid background */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: `linear-gradient(${COLORS.subtle} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.subtle} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        {/* Top gradient */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "40%",
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,255,0,0.03) 0%, transparent 70%)`,
        }} />

        <div style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "0 24px", maxWidth: 900 }}>
          {/* Eyebrow */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted,
            letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 32,
            opacity: heroReady ? 1 : 0, transition: "opacity 0.6s ease 0.2s",
          }}>
            Verified effort loyalty infrastructure
          </div>

          {/* Main headline */}
          <h1 className="hero-headline" style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 9vw, 110px)",
            color: COLORS.textBright, lineHeight: 0.95, letterSpacing: "0.01em",
            marginBottom: 24,
            opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}>
            Turn every mile, rep,<br />and session into{" "}
            <span style={{ color: verified ? COLORS.signal : COLORS.muted, transition: "color 0.6s ease" }}>
              loyalty currency.
            </span>
          </h1>

          {/* Badge fires after headline */}
          <div style={{
            display: "flex", justifyContent: "center", marginBottom: 24,
            opacity: heroReady ? 1 : 0, transition: "opacity 0.6s ease 1s",
          }}>
            <VerifiedBadge size={48} animate={heroReady} />
          </div>

          {/* Subline */}
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 18, color: COLORS.subtle,
            lineHeight: 1.7, maxWidth: 560, margin: "0 auto 12px",
            opacity: heroReady ? 1 : 0, transition: "opacity 0.6s ease 1.4s",
          }}>
            PROOF verifies real athletic effort and turns it into loyalty currency that works across every brand in the network. One connection, every enrolled brand.
          </p>

          {/* Tagline */}
          <div style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
            color: COLORS.signal, letterSpacing: "0.15em", textTransform: "uppercase",
            marginBottom: 40,
            opacity: heroReady ? 1 : 0, transition: "opacity 0.6s ease 1.6s",
          }}>
            Effort verified.
          </div>

          {/* CTA */}
          <div style={{
            display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
            opacity: heroReady ? 1 : 0, transition: "opacity 0.6s ease 1.8s",
          }}>
            <a href="#waitlist" style={{
              fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
              color: COLORS.base, background: COLORS.signal,
              padding: "14px 32px", borderRadius: 8, textDecoration: "none",
              letterSpacing: "0.08em", textTransform: "uppercase",
              transition: "opacity 0.2s",
            }}>
              Request early access
            </a>
            <a href="#how-it-works" style={{
              fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
              color: COLORS.text, background: "transparent",
              padding: "14px 32px", borderRadius: 8, textDecoration: "none",
              letterSpacing: "0.08em", textTransform: "uppercase",
              border: `1px solid ${COLORS.surfaceBorder}`,
              transition: "border-color 0.2s",
            }}
              onMouseOver={e => e.target.style.borderColor = COLORS.subtle}
              onMouseOut={e => e.target.style.borderColor = COLORS.surfaceBorder}
            >
              See how it works
            </a>
          </div>
        </div>
      </div>

      {/* ── TRUST MARK / BADGE SECTION ── */}
      <div style={{ borderTop: `1px solid ${COLORS.surfaceBorder}`, borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
        <Section>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 80, justifyContent: "center" }}>
            <div style={{ flex: "1 1 400px", maxWidth: 500 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.signal, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
                PROOF Verified Effort™
              </div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: COLORS.textBright, lineHeight: 1, marginBottom: 20 }}>
                One badge.<br />Every sport.
              </h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: COLORS.subtle, lineHeight: 1.8, marginBottom: 28 }}>
                PROOF Verified Effort is a universal trust mark that confirms real athletic activity — verified through GPS, heart rate, and platform APIs. Any sport, any unit, any brand in the network.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Miles", "Meters", "Rounds", "Sessions", "Watts", "Laps", "Reps", "Hours"].map(u => <UnitPill key={u} text={u} />)}
              </div>
            </div>
            <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              {/* Large badge display */}
              <div style={{
                width: 200, height: 200, borderRadius: 24,
                border: `1px solid ${COLORS.surfaceBorder}`,
                background: COLORS.surface,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 12, position: "relative",
              }}>
                <div style={{
                  position: "absolute", inset: 0, borderRadius: 24,
                  background: `radial-gradient(circle at 50% 40%, ${COLORS.signalDim} 0%, transparent 70%)`,
                }} />
                <svg width="64" height="64" viewBox="0 0 48 48" fill="none" style={{ position: "relative" }}>
                  <circle cx="24" cy="24" r="22" stroke={COLORS.signal} strokeWidth="1.5" fill={COLORS.signalDim} />
                  <path d="M15 24.5L21 30.5L33 18.5" stroke={COLORS.signal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div style={{ position: "relative", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14, color: COLORS.textBright, letterSpacing: "0.12em", textTransform: "uppercase" }}>PROOF</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: COLORS.signal, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 2 }}>Verified Effort</div>
                </div>
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: COLORS.muted, textAlign: "center" }}>
                Your customers see this.<br />It means the effort is real.
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ── HOW IT WORKS ── */}
      <Section id="how-it-works">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 80, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 350px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              How it works
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: COLORS.textBright, lineHeight: 1, marginBottom: 16 }}>
              Verify. Track.<br />Reward.
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: COLORS.subtle, lineHeight: 1.7, marginBottom: 40, maxWidth: 400 }}>
              PROOF owns the effort ledger. Your athletes connect once, and every verified activity flows into your loyalty program automatically.
            </p>
          </div>
          <div style={{ flex: "1 1 400px" }}>
            <Step number="01" title="Connect" desc="Your customer connects their Strava account via OAuth. One tap. PROOF handles authentication, imports their activity history, and starts listening for new rides in real time." />
            <Step number="02" title="Verify" desc="Every activity runs through the PROOF verification pipeline — GPS validation, velocity checks, anomaly detection. Fraudulent data gets flagged. Clean data earns verified miles on the PROOF ledger." />
            <Step number="03" title="Reward" isLast desc="PROOF tracks thresholds you define. When an athlete crosses one, we generate a Shopify discount code and fire a Klaviyo event — your brand delivers the reward in your voice." />
          </div>
        </div>
      </Section>

      {/* ── ARCHITECTURE DIAGRAM ── */}
      <div style={{ background: COLORS.surface, borderTop: `1px solid ${COLORS.surfaceBorder}`, borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
        <Section style={{ padding: "80px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Architecture</div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: COLORS.textBright, marginBottom: 8 }}>Two layers. One platform.</h3>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: COLORS.subtle, maxWidth: 520, margin: "0 auto" }}>
              PROOF handles verification, the ledger, and tier calculations. Your brand controls thresholds, rewards, and the customer experience.
            </p>
          </div>
          <ArchitectureFlow />
        </Section>
      </div>

      {/* ── CODE BLOCK ── */}
      <div style={{ borderBottom: `1px solid ${COLORS.surfaceBorder}` }}>
        <Section style={{ padding: "80px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Developer-friendly</div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: COLORS.textBright }}>Clean events, real-time</h3>
          </div>
          <div style={{
            background: COLORS.surface, border: `1px solid ${COLORS.surfaceBorder}`, borderRadius: 16,
            padding: "32px", maxWidth: 680, margin: "0 auto", overflow: "auto",
          }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c, opacity: 0.7 }} />
              ))}
            </div>
            <pre style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 2,
              color: COLORS.subtle, whiteSpace: "pre-wrap", margin: 0,
            }}>
              <span style={{ color: COLORS.muted }}>{"// PROOF fires events to your Klaviyo"}</span>{"\n"}
              <span style={{ color: COLORS.muted }}>{"// You build the flows in your voice"}</span>{"\n\n"}
              <span style={{ color: "#c678dd" }}>Event</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>proof.reward_earned</span>{"\n\n"}
              <span style={{ color: COLORS.muted }}>{"{"}</span>{"\n"}
              {"  "}
              <span style={{ color: COLORS.text }}>athlete_id</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>"prf_ath_7x92k"</span>
              <span style={{ color: COLORS.muted }}>,</span>{"\n"}
              {"  "}
              <span style={{ color: COLORS.text }}>brand</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>"voler"</span>
              <span style={{ color: COLORS.muted }}>,</span>{"\n"}
              {"  "}
              <span style={{ color: COLORS.text }}>brand_miles</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: "#d19a66" }}>500</span>
              <span style={{ color: COLORS.muted }}>,</span>{"\n"}
              {"  "}
              <span style={{ color: COLORS.text }}>lifetime_miles</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: "#d19a66" }}>3842</span>
              <span style={{ color: COLORS.muted }}>,</span>{"\n"}
              {"  "}
              <span style={{ color: COLORS.text }}>proof_tier</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>"Domestique"</span>
              <span style={{ color: COLORS.muted }}>,</span>{"\n"}
              {"  "}
              <span style={{ color: COLORS.text }}>reward</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.muted }}>{"{"}</span>{"\n"}
              {"    "}
              <span style={{ color: COLORS.text }}>type</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>"shopify_discount"</span>
              <span style={{ color: COLORS.muted }}>,</span>{"\n"}
              {"    "}
              <span style={{ color: COLORS.text }}>code</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>"PROOF-VLR-20-7X92K"</span>
              <span style={{ color: COLORS.muted }}>,</span>{"\n"}
              {"    "}
              <span style={{ color: COLORS.text }}>value</span>
              <span style={{ color: COLORS.muted }}>:</span>{" "}
              <span style={{ color: COLORS.signal }}>"$20 off"</span>{"\n"}
              {"  "}
              <span style={{ color: COLORS.muted }}>{"}"}</span>{"\n"}
              <span style={{ color: COLORS.muted }}>{"}"}</span>
            </pre>
          </div>
        </Section>
      </div>

      {/* ── FOR BRANDS ── */}
      <Section id="for-brands">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>For brands</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: COLORS.textBright, lineHeight: 1, marginBottom: 16 }}>
            Your brand. Your program.<br />
            <span style={{ color: COLORS.subtle }}>Our verification.</span>
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: COLORS.subtle, lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
            PROOF is the effort layer underneath your loyalty program. You own the customer experience, set the thresholds, and deliver the rewards. We make sure the effort is real.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
          {[
            { icon: "◎", title: "Endorsed model", desc: "\"Powered by PROOF\" sits discreetly in your experience. Customers see your brand first, verified effort second. Your voice, your design, your program." },
            { icon: "⬡", title: "Any sport, any unit", desc: "Miles, meters, watts, rounds, sessions. You define what effort means for your customers. PROOF verifies it. Starting with cycling — expanding to every sport." },
            { icon: "⚡", title: "Fraud prevention", desc: "GPS validation, velocity checks, daily mileage caps, anomaly detection. Your loyalty budget goes to real athletes who actually did the work." },
            { icon: "↗", title: "Effort-based loyalty", desc: "Rewards earned by real effort, not just spending. Customers who ride earn alongside customers who buy — your most engaged athletes become your best customers." },
            { icon: "⟁", title: "Shopify + Klaviyo native", desc: "Discount codes generated via Shopify Admin API. Events fired directly to Klaviyo. No middleware, no third-party loyalty platform required. PROOF is the engine." },
            { icon: "◈", title: "Network effect built in", desc: "One Strava connection, every enrolled brand. As the network grows, your athletes are recognized everywhere — and athletes from other brands discover you." },
          ].map((item, i) => (
            <div key={i} style={{
              flex: "1 1 320px", maxWidth: 380,
              background: COLORS.surface, border: `1px solid ${COLORS.surfaceBorder}`,
              borderRadius: 16, padding: "32px",
              transition: "border-color 0.3s ease",
            }}
              onMouseOver={e => e.currentTarget.style.borderColor = COLORS.signal + "33"}
              onMouseOut={e => e.currentTarget.style.borderColor = COLORS.surfaceBorder}
            >
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, color: COLORS.signal, marginBottom: 16, opacity: 0.7 }}>{item.icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: COLORS.textBright, marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.subtle, lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── PRICING ── */}
      <div style={{ borderTop: `1px solid ${COLORS.surfaceBorder}` }}>
        <Section id="pricing">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Pricing</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: COLORS.textBright, lineHeight: 1, marginBottom: 16 }}>
              Flat pricing. No surprises.
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: COLORS.subtle, maxWidth: 480, margin: "0 auto" }}>
              No setup fees. No per-transaction cuts. No revenue share. Each brand funds their own rewards independently.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", alignItems: "stretch" }}>
            <PricingCard
              name="Starter"
              price="$299"
              period="/mo"
              features={[
                "Up to 2,500 verified members",
                "Strava integration",
                "GPS fraud detection",
                "PROOF Verified Effort badge",
                "Shopify discount code generation",
                "Klaviyo event integration",
                "Email support",
              ]}
              cta="Start free trial"
            />
            <PricingCard
              name="Growth"
              price="$799"
              period="/mo"
              highlight
              features={[
                "Up to 25,000 verified members",
                "Advanced fraud + anomaly detection",
                "Custom tier configuration",
                "Welcome bonus controls",
                "Webhooks + API access",
                "Brand dashboard + analytics",
                "Priority support + Slack channel",
              ]}
              cta="Start free trial"
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              features={[
                "Unlimited members",
                "Dedicated infrastructure",
                "SLA + uptime guarantee",
                "White-label badge option",
                "Custom integrations",
                "Dedicated account manager",
                "SOC 2 compliance docs",
              ]}
              cta="Talk to us"
            />
          </div>
        </Section>
      </div>

      {/* ── WAITLIST / CTA ── */}
      <div style={{ background: COLORS.surface, borderTop: `1px solid ${COLORS.surfaceBorder}` }}>
        <Section id="waitlist" style={{ textAlign: "center", padding: "120px 24px 100px" }}>
          <VerifiedBadge size={48} animate={false} />
          <div style={{ marginTop: 24 }} />
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 6vw, 64px)", color: COLORS.textBright, lineHeight: 1, marginBottom: 16 }}>
            Reward effort, not just spend.
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: COLORS.subtle, maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.7 }}>
            We're onboarding the first 50 brands now. Request early access and we'll set up a 15-minute walkthrough of the platform.
          </p>
          <div style={{ display: "flex", gap: 0, maxWidth: 440, margin: "0 auto", borderRadius: 10, overflow: "hidden", border: `1px solid ${COLORS.surfaceBorder}` }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@brand.com"
              style={{
                flex: 1, padding: "14px 20px",
                background: COLORS.base, border: "none", outline: "none",
                fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.text,
              }}
            />
            <button style={{
              padding: "14px 28px", background: COLORS.signal, border: "none",
              fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700,
              color: COLORS.base, cursor: "pointer", letterSpacing: "0.08em",
              textTransform: "uppercase", whiteSpace: "nowrap",
            }}>
              Request access
            </button>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted, marginTop: 16 }}>
            No credit card required · 14-day free trial on all plans
          </div>
        </Section>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${COLORS.surfaceBorder}`, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 22, height: 22, borderRadius: 4,
                border: `1.5px solid ${COLORS.subtle}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: COLORS.subtle,
              }}>P</div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, color: COLORS.subtle, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Proof
              </span>
            </div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: COLORS.muted }}>
              Effort verified. Built in California.
            </div>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy", "Terms", "Documentation", "Status"].map((link, i) => (
              <a key={i} href="#" style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 12, color: COLORS.muted,
                textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseOver={e => e.target.style.color = COLORS.text}
                onMouseOut={e => e.target.style.color = COLORS.muted}
              >
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
