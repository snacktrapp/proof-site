"use client";

import { useState, useEffect, useRef } from "react";
import type { Metadata } from "next";

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
  signalDim: "rgba(200,255,0,0.08)",
  signalGlow: "rgba(200,255,0,0.25)",
  steel: "#8BA0B4",
  effort: "#FF3D00",
  rail: "#222222",
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

const FadeIn = ({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) => {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style
    }}>
      {children}
    </div>
  );
};

const sports = [
  { name: "Road Cycling", multiplier: "1.0×", icon: "🚴" },
  { name: "Mountain Biking", multiplier: "1.5×", icon: "🚵" },
  { name: "Gravel / CX", multiplier: "1.2×", icon: "🚴" },
  { name: "E-Bike", multiplier: "0.4×", icon: "⚡" },
  { name: "Running", multiplier: "3.0×", icon: "🏃" },
  { name: "Trail Running", multiplier: "4.0×", icon: "🥾" },
  { name: "Walking / Hiking", multiplier: "1.0×", icon: "🚶" },
  { name: "Swimming (Open Water)", multiplier: "8.0×", icon: "🏊" },
  { name: "Swimming (Pool)", multiplier: "6.0×", icon: "🏊" },
  { name: "Rowing / Kayaking", multiplier: "2.0×", icon: "🚣" },
];

const steps = [
  {
    number: "01",
    title: "Connect your fitness account",
    description: "Link your Strava account in one tap. Your activities sync automatically. More platforms coming soon.",
  },
  {
    number: "02",
    title: "Train like you already do",
    description: "Every GPS-verified activity earns PROOF miles. Cycle, run, swim, hike — all your effort counts.",
  },
  {
    number: "03",
    title: "Earn rewards from brands you love",
    description: "Brands on the PROOF network reward real effort with real discounts. Your verified miles unlock rewards automatically.",
  },
];

export default function AthletesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: COLORS.base, minHeight: "100vh", color: COLORS.text, overflowX: "hidden", fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @keyframes pulseGlow {
          0% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0; transform: scale(1.2); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .sport-card {
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .sport-card:hover {
          transform: translateY(-2px);
          border-color: ${COLORS.signal} !important;
        }
        .cta-button {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .cta-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 24px rgba(200,255,0,0.3);
        }

        .nav-desktop { display: flex; gap: 32px; align-items: center; }
        .nav-hamburger { display: none; background: none; border: none; cursor: pointer;
          padding: 4px; flex-direction: column; gap: 5px; }
        .nav-hamburger span { display: block; width: 22px; height: 2px;
          background: ${COLORS.textBright}; border-radius: 2px; transition: all 0.3s ease; }
        .nav-mobile { display: none; }

        @media (max-width: 768px) {
          .hero-title { font-size: 40px !important; }
          .hero-sub { font-size: 16px !important; max-width: 100% !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .sports-grid { grid-template-columns: 1fr 1fr !important; }
          .profile-card { padding: 24px !important; }
          .profile-signals { flex-direction: column !important; gap: 16px !important; }
          .section-title { font-size: 28px !important; }
          .final-cta-title { font-size: 32px !important; }

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
            font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
            text-align: center; letter-spacing: 0.08em; text-transform: uppercase;
            border: none; text-decoration: none; display: block;
          }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 32px !important; }
          .sports-grid { grid-template-columns: 1fr !important; }
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
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, border: `2px solid ${COLORS.textBright}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: COLORS.textBright }}>P</div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 16,
              color: COLORS.textBright, letterSpacing: "0.12em", textTransform: "uppercase" }}>Proof</span>
          </a>

          {/* Desktop nav */}
          <div className="nav-desktop">
            <a href="/"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.subtle,
                textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s" }}
              onMouseOver={e => (e.target as HTMLAnchorElement).style.color = COLORS.textBright}
              onMouseOut={e => (e.target as HTMLAnchorElement).style.color = COLORS.subtle}>
              For brands
            </a>
            {[{ label: "How it works", href: "#how-it-works" },
              { label: "Your profile", href: "#your-profile" },
              { label: "Sports", href: "#sports" }].map((item, i) => (
              <a key={i} href={item.href}
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.subtle,
                  textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s" }}
                onMouseOver={e => (e.target as HTMLAnchorElement).style.color = COLORS.textBright}
                onMouseOut={e => (e.target as HTMLAnchorElement).style.color = COLORS.subtle}>
                {item.label}
              </a>
            ))}
            <a href="https://proof.verifiedeffort.com/auth/login" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.subtle,
                textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s" }}
              onMouseOver={e => (e.target as HTMLAnchorElement).style.color = COLORS.textBright}
              onMouseOut={e => (e.target as HTMLAnchorElement).style.color = COLORS.subtle}>
              Sign up / Log in
            </a>
            <a href="https://proof.verifiedeffort.com/auth/register?role=athlete" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700,
              color: COLORS.base, background: COLORS.signal, padding: "8px 20px", borderRadius: 6,
              textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Sign up free
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
            <a href="/" onClick={() => setMenuOpen(false)}>For brands</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#your-profile" onClick={() => setMenuOpen(false)}>Your profile</a>
            <a href="#sports" onClick={() => setMenuOpen(false)}>Sports</a>
            <a href="https://proof.verifiedeffort.com/auth/login" target="_blank" rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}>Sign up / Log in</a>
            <a href="https://proof.verifiedeffort.com/auth/register?role=athlete" target="_blank" rel="noopener noreferrer"
              className="nav-mobile-cta" onClick={() => setMenuOpen(false)}>
              Sign up free
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", padding: "120px 24px 80px", textAlign: "center"
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%)`,
          pointerEvents: "none"
        }} />

        <div style={{ position: "relative", maxWidth: 700 }}>
          <FadeIn>
            <div style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700,
              color: COLORS.signal, letterSpacing: "0.15em", textTransform: "uppercase",
              marginBottom: 24
            }}>
              Your effort. Verified. Rewarded.
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="hero-title" style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, fontWeight: 400,
              color: COLORS.textBright, lineHeight: 1.05, margin: "0 0 24px",
              letterSpacing: "0.02em"
            }}>
              TRAIN. EARN PROOF MILES.<br />GET REWARDED.
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="hero-sub" style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 18, color: COLORS.subtle,
              lineHeight: 1.7, maxWidth: 520, margin: "0 auto 40px"
            }}>
              Connect your Strava. Every GPS-verified mile, stroke, and stride earns PROOF miles —
              effort-normalized, fraud-protected, and recognized by brands across the network.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <a href="https://proof.verifiedeffort.com/auth/register?role=athlete" target="_blank" rel="noopener noreferrer"
              className="cta-button"
              style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700,
                color: COLORS.base, background: COLORS.signal, padding: "14px 36px", borderRadius: 8,
                textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase",
                display: "inline-block"
              }}>
              Sign up free
            </a>
          </FadeIn>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto", scrollMarginTop: 80 }}>
        <FadeIn>
          <h2 className="section-title" style={{
            fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: 40,
            color: COLORS.textBright, textAlign: "center", marginBottom: 56,
            letterSpacing: "0.02em"
          }}>
            HOW IT WORKS
          </h2>
        </FadeIn>

        <div className="steps-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32
        }}>
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 120}>
              <div style={{
                background: COLORS.surface, border: `1px solid ${COLORS.surfaceBorder}`,
                borderRadius: 12, padding: 32, height: "100%"
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700,
                  color: COLORS.signal, marginBottom: 16, letterSpacing: "0.05em"
                }}>
                  {step.number}
                </div>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 18,
                  color: COLORS.textBright, marginBottom: 12, lineHeight: 1.3
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.subtle,
                  lineHeight: 1.65, margin: 0
                }}>
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Your Athlete Profile */}
      <section id="your-profile" style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto", scrollMarginTop: 80 }}>
        <FadeIn>
          <h2 className="section-title" style={{
            fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: 40,
            color: COLORS.textBright, textAlign: "center", marginBottom: 16,
            letterSpacing: "0.02em"
          }}>
            YOUR EFFORT. YOUR RANK.
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 15, color: COLORS.subtle,
            textAlign: "center", maxWidth: 500, margin: "0 auto 48px", lineHeight: 1.65
          }}>
            A tier you earned. Three signals that tell your story.
            Recognized at every brand on the network.
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="profile-card" style={{
            background: COLORS.surface, border: `1px solid ${COLORS.surfaceBorder}`,
            borderRadius: 16, padding: 40, position: "relative", overflow: "hidden"
          }}>
            {/* Subtle verified glow */}
            <div style={{
              position: "absolute", top: -40, right: -40, width: 160, height: 160,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)`,
              pointerEvents: "none"
            }} />

            <div style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700,
              color: COLORS.signal, letterSpacing: "0.15em", textTransform: "uppercase",
              marginBottom: 16
            }}>
              Example athlete profile
            </div>

            {/* Tier headline */}
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, fontWeight: 400,
              color: COLORS.textBright, letterSpacing: "0.04em", lineHeight: 1,
              marginBottom: 6
            }}>
              RIVAL
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              color: COLORS.steel, marginBottom: 24
            }}>
              Rival &middot; 8,420 lifetime PM &middot; Steady pace &middot; &uarr; Increasing
            </div>

            <div className="profile-signals" style={{
              display: "flex", gap: 40, justifyContent: "space-between"
            }}>
              {/* Lifetime PM */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 32, fontWeight: 700,
                  color: COLORS.textBright, lineHeight: 1, marginBottom: 6
                }}>
                  8,420
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 12, color: COLORS.subtle,
                  letterSpacing: "0.02em", marginBottom: 4
                }}>
                  lifetime PROOF miles
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 12, color: COLORS.muted
                }}>
                  Total verified effort, ever
                </div>
              </div>

              {/* Pace */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 32, fontWeight: 700,
                    color: COLORS.textBright, lineHeight: 1
                  }}>
                    Steady
                  </span>
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                  color: COLORS.steel, marginTop: 4, marginBottom: 4
                }}>
                  215 PM/month
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 12, color: COLORS.muted
                }}>
                  12-month rolling average
                </div>
              </div>

              {/* Trend */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 32, fontWeight: 700,
                    color: COLORS.signal, lineHeight: 1
                  }}>
                    ↑
                  </span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 32, fontWeight: 700,
                    color: COLORS.signal, lineHeight: 1
                  }}>
                    Increasing
                  </span>
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 12, color: COLORS.subtle,
                  marginTop: 6, marginBottom: 4
                }}>
                  Training more than last year
                </div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 12, color: COLORS.muted
                }}>
                  3-month vs. 9-month trend
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Supported Sports */}
      <section id="sports" style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto", scrollMarginTop: 80 }}>
        <FadeIn>
          <h2 className="section-title" style={{
            fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: 40,
            color: COLORS.textBright, textAlign: "center", marginBottom: 16,
            letterSpacing: "0.02em"
          }}>
            EVERY MILE COUNTS. EVERY SPORT.
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 15, color: COLORS.subtle,
            textAlign: "center", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.65
          }}>
            The PROOF Effort Index normalizes effort across sports.
            A running mile earns more than a cycling mile — because it costs more.
          </p>
        </FadeIn>

        <div className="sports-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12
        }}>
          {sports.map((sport, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="sport-card" style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.surfaceBorder}`,
                borderRadius: 10, padding: "16px 20px",
                display: "flex", alignItems: "center", justifyContent: "space-between"
              }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 14, color: COLORS.text
                }}>
                  {sport.name}
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700,
                  color: COLORS.signal
                }}>
                  {sport.multiplier}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={700}>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.muted,
            textAlign: "center", marginTop: 24
          }}>
            Anchor: 1 road cycling mile = 1 PM. All sports calibrated by physiological cost (MET-minutes).
          </p>
        </FadeIn>
      </section>

      {/* Trust / Verification */}
      <section style={{ padding: "80px 24px", maxWidth: 700, margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            background: COLORS.surface, border: `1px solid ${COLORS.surfaceBorder}`,
            borderRadius: 16, padding: "48px 40px", textAlign: "center"
          }}>
            <div style={{
              width: 48, height: 48, margin: "0 auto 24px", borderRadius: "50%",
              border: `2px solid ${COLORS.signal}`, display: "flex", alignItems: "center",
              justifyContent: "center", background: COLORS.signalDim
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 12.5L10.5 16L17 9.5" stroke={COLORS.signal} strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, fontSize: 28,
              color: COLORS.textBright, marginBottom: 16,
              letterSpacing: "0.02em"
            }}>
              EARNED. NOT BOUGHT.
            </h3>

            <p style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 15, color: COLORS.subtle,
              lineHeight: 1.7, maxWidth: 480, margin: "0 auto"
            }}>
              Every activity runs through a 9-gate fraud pipeline. GPS-tracked only.
              No manual entries. Sport-specific daily caps and velocity checks.
              Your PROOF miles are earned, not gamed.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: "100px 24px 120px", textAlign: "center"
      }}>
        <FadeIn>
          <h2 className="final-cta-title" style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, fontWeight: 400,
            color: COLORS.textBright, lineHeight: 1.1, marginBottom: 16,
            letterSpacing: "0.02em"
          }}>
            YOUR EFFORT IS WORTH SOMETHING.
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 16, color: COLORS.subtle,
            marginBottom: 40, lineHeight: 1.6
          }}>
            Connect your Strava. Start earning PROOF miles. It's free.
          </p>
          <a href="https://proof.verifiedeffort.com/auth/register?role=athlete" target="_blank" rel="noopener noreferrer"
            className="cta-button"
            style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700,
              color: COLORS.base, background: COLORS.signal, padding: "16px 40px", borderRadius: 8,
              textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase",
              display: "inline-block"
            }}>
            Sign up free
          </a>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: `1px solid ${COLORS.rail}`, padding: "32px 24px",
        textAlign: "center", fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.muted
      }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 16, flexWrap: "wrap" }}>
          <a href="/" style={{ color: COLORS.muted, textDecoration: "none" }}>For brands</a>
          <a href="/privacy" style={{ color: COLORS.muted, textDecoration: "none" }}>Privacy</a>
        </div>
        &copy; {new Date().getFullYear()} Proof Technologies, Inc.
      </footer>
    </div>
  );
}
