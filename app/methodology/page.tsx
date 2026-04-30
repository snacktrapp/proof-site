import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How PROOF Miles are Calculated — PROOF",
  description:
    "The methodology behind PROOF Miles. How we convert verified athletic effort into a single, sport-normalized unit. Open and versioned.",
};

const COLORS = {
  base: "#050505",
  surface: "#0A0A0A",
  text: "#E8E8E8",
  textBright: "#FFFFFF",
  subtle: "#888888",
  muted: "#555555",
  signal: "#C8FF00",
  rail: "#222222",
};

export default function Methodology() {
  const effectiveDate = "April 30, 2026";
  const methodVersion = "v1.0";

  return (
    <div style={{ background: COLORS.base, minHeight: "100vh", color: COLORS.text }}>
      {/* Nav bar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(5,5,5,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${COLORS.rail}`,
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                border: `2px solid ${COLORS.textBright}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                color: COLORS.textBright,
              }}
            >
              P
            </div>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 16,
                color: COLORS.textBright,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Proof
            </span>
          </a>
          <a
            href="/"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 13,
              color: COLORS.subtle,
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            Back to home
          </a>
        </div>
      </nav>

      {/* Content */}
      <main
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "120px 24px 80px",
          fontFamily: "'Outfit', sans-serif",
          fontSize: 15,
          lineHeight: 1.75,
          color: COLORS.text,
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: COLORS.signal,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Methodology · {methodVersion}
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 36,
            color: COLORS.textBright,
            letterSpacing: "0.04em",
            marginTop: 4,
            marginBottom: 8,
            lineHeight: 1.15,
          }}
        >
          How PROOF Miles are Calculated
        </h1>
        <p style={{ color: COLORS.subtle, fontSize: 14, marginBottom: 48 }}>
          Effective date: {effectiveDate}
        </p>

        <style>{`
          .meth h2 {
            font-family: 'Outfit', sans-serif;
            font-weight: 700;
            font-size: 22px;
            color: ${COLORS.textBright};
            letter-spacing: 0.03em;
            margin-top: 48px;
            margin-bottom: 16px;
            line-height: 1.25;
          }
          .meth h3 {
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            font-size: 16px;
            color: ${COLORS.textBright};
            margin-top: 32px;
            margin-bottom: 12px;
          }
          .meth p {
            margin-bottom: 16px;
            color: ${COLORS.text};
          }
          .meth a {
            color: ${COLORS.signal};
            text-decoration: none;
          }
          .meth a:hover {
            text-decoration: underline;
          }
          .meth ul, .meth ol {
            margin: 0 0 16px 0;
            padding-left: 24px;
          }
          .meth li {
            margin-bottom: 8px;
            color: ${COLORS.text};
          }
          .meth .divider {
            border: none;
            border-top: 1px solid ${COLORS.rail};
            margin: 48px 0;
          }
          .meth .callout {
            background: ${COLORS.surface};
            border: 1px solid ${COLORS.rail};
            border-left: 3px solid ${COLORS.signal};
            padding: 16px 20px;
            margin: 24px 0;
            font-size: 14px;
            color: ${COLORS.text};
          }
          .meth .formula {
            background: ${COLORS.surface};
            border: 1px solid ${COLORS.rail};
            padding: 18px 22px;
            margin: 20px 0;
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            color: ${COLORS.textBright};
            line-height: 1.7;
            overflow-x: auto;
          }
          .meth table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
            font-size: 14px;
          }
          .meth th {
            text-align: left;
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            font-size: 12px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: ${COLORS.subtle};
            padding: 10px 12px;
            border-bottom: 1px solid ${COLORS.rail};
          }
          .meth td {
            padding: 10px 12px;
            border-bottom: 1px solid ${COLORS.rail};
            color: ${COLORS.text};
          }
          .meth td.num {
            font-family: 'JetBrains Mono', monospace;
            text-align: right;
          }
          .meth .example {
            background: ${COLORS.surface};
            border: 1px solid ${COLORS.rail};
            padding: 18px 22px;
            margin: 20px 0;
            font-size: 14px;
          }
          .meth .example .head {
            font-family: 'Outfit', sans-serif;
            font-weight: 700;
            color: ${COLORS.textBright};
            margin-bottom: 12px;
            font-size: 14px;
          }
          .meth .example .row {
            font-family: 'JetBrains Mono', monospace;
            color: ${COLORS.text};
            font-size: 13px;
            margin-bottom: 4px;
          }
          .meth .example .result {
            font-family: 'JetBrains Mono', monospace;
            color: ${COLORS.signal};
            font-size: 14px;
            font-weight: 700;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid ${COLORS.rail};
          }
        `}</style>

        <div className="meth">
          <p>
            PROOF Miles (PM) are how PROOF measures verified athletic effort. They're the single
            unit that drives every athlete's tier, every brand's milestone thresholds, and every
            reward issued on the network. This document explains exactly how PM is calculated, why
            we made the choices we made, and how we plan to evolve the methodology over time.
          </p>

          <p>
            We publish this openly because the math should be inspectable. If you race, coach, or
            think hard about training, you should be able to read this and understand precisely
            what you're earning credit for.
          </p>

          <div className="callout">
            <strong>Methodology version: {methodVersion}.</strong> This is our launch
            calculation. We commit to a clear versioning policy (Section 8) — when we revise the
            math, activities credited under {methodVersion} stay at {methodVersion}. New rules
            apply forward only.
          </div>

          <h2>1. What PROOF Miles measure</h2>
          <p>
            PROOF Miles measure <strong>verified athletic effort</strong>, normalized across
            sports. The core idea: a mile of running, a mile of cycling, and a mile of swimming
            represent very different metabolic costs. PM is the unit that puts them on a common
            scale so a runner and a cyclist who train equally hard earn comparable credit.
          </p>
          <p>
            Activity data comes from connected fitness platforms (Strava today; more
            integrations planned). We read what the platform reports, run it through our calculation, and
            credit the result as PM. We don't infer effort from things you didn't actually do — if
            it isn't recorded by your fitness device or app, it doesn't count.
          </p>
          <p>
            Lifetime PROOF Miles are designed to <strong>never reset and never decrease</strong>.
            Effort accrues for life. Tiers (Recruit through Apex, with Marks beyond) are
            graduated entirely on lifetime PM.
          </p>

          <h2>2. The v1.0 calculation</h2>
          <p>For every verified activity, the formula is:</p>

          <div className="formula">
            distance_mi          = activity distance in miles<br />
            elevation_mi_equiv   = (elevation_gain_m / 100) × sport_elevation_weight<br /><br />
            distance_pm          = floor(distance_mi × sport_multiplier)<br />
            climbing_pm          = floor(elevation_mi_equiv × sport_multiplier)<br /><br />
            verified_pm          = max(1, distance_pm + climbing_pm)
          </div>

          <p>
            Two sport-specific constants drive the math: a <strong>multiplier</strong> (how a mile
            of this sport compares to a mile of cycling, the anchor) and an{" "}
            <strong>elevation weight</strong> (how much each 100m of climbing contributes in
            miles-equivalent). Both come from a per-sport reference table you can read in Sections
            3 and 4.
          </p>
          <p>
            Each component is floored to a whole number independently, then summed. The total is
            clamped to a minimum of 1 PM so any qualifying activity that passes our fraud-screening
            gates credits at least one mile of effort.
          </p>
          <p>
            On your activity dashboard, the breakdown is shown directly:{" "}
            <em>"42 from miles · 16 from climbing"</em>. You always see what each component
            contributed.
          </p>

          <h2>3. Sport multipliers (v1.0)</h2>
          <p>
            The multiplier is anchored to road cycling at 1.0. A mile run is roughly 3× the
            cardiovascular cost of a mile ridden at a moderate pace; a mile swum is roughly 8×.
            These ratios trace back to public physiology research on metabolic cost (MET-equivalents
            adapted for distance-normalized comparison).
          </p>
          <table>
            <thead>
              <tr>
                <th>Sport (Strava type)</th>
                <th style={{ textAlign: "right" }}>Multiplier</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Ride / VirtualRide</td><td className="num">1.0</td></tr>
              <tr><td>GravelRide</td><td className="num">1.2</td></tr>
              <tr><td>MountainBikeRide</td><td className="num">1.5</td></tr>
              <tr><td>EBikeRide</td><td className="num">0.4</td></tr>
              <tr><td>Run / VirtualRun</td><td className="num">3.0</td></tr>
              <tr><td>TrailRun</td><td className="num">4.0</td></tr>
              <tr><td>Hike</td><td className="num">1.0</td></tr>
              <tr><td>Walk</td><td className="num">1.0</td></tr>
              <tr><td>Swim</td><td className="num">8.0</td></tr>
              <tr><td>Rowing</td><td className="num">2.0</td></tr>
              <tr><td>Kayaking</td><td className="num">2.0</td></tr>
            </tbody>
          </table>
          <p>
            E-bikes are rated below cycling because the motor does meaningful work — we credit the
            human contribution. Mountain biking is rated above road cycling because off-road effort
            at equivalent distance is genuinely higher. Gravel sits between them.
          </p>

          <h2>4. Elevation weights (v1.0)</h2>
          <p>
            Elevation weights determine how much each 100m of climbing contributes, expressed in
            miles-equivalent. For cycling, climbing 100m roughly costs the metabolic equivalent of
            riding an additional flat mile. Running's cost-per-meter-of-climb is lower per unit
            because runners are already working hard on flat — the elevation premium is smaller as
            a fraction of total effort. Trail running runs slightly higher than road running due to
            the terrain variability.
          </p>
          <table>
            <thead>
              <tr>
                <th>Sport</th>
                <th style={{ textAlign: "right" }}>Elevation weight (per 100m)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Cycling (all variants)</td><td className="num">+1.0 mi</td></tr>
              <tr><td>TrailRun</td><td className="num">+0.6 mi</td></tr>
              <tr><td>Run / VirtualRun</td><td className="num">+0.5 mi</td></tr>
              <tr><td>Hike</td><td className="num">+0.5 mi</td></tr>
              <tr><td>Walk</td><td className="num">+0.3 mi</td></tr>
              <tr><td>NordicSki / RollerSki</td><td className="num">+0.5 mi</td></tr>
              <tr><td>Swim / Rowing / Kayaking</td><td className="num">0</td></tr>
            </tbody>
          </table>
          <p>
            We expect the running and hiking weights to be the most likely targets for revision in
            v1.1 based on coach and community feedback. The cycling weight has decades of
            consistent physiology research behind it. Where we update constants, we'll publish a
            changelog (Section 8).
          </p>

          <h2>5. Worked examples</h2>
          <p>Five activities, working through the math.</p>

          <div className="example">
            <div className="head">A. Flat 30-mile road ride</div>
            <div className="row">distance_mi = 30 · elevation_gain_m = 0 · sport = Ride</div>
            <div className="row">distance_pm = floor(30 × 1.0) = 30</div>
            <div className="row">climbing_pm = floor(0 × 1.0) = 0</div>
            <div className="result">
              verified_pm = 30 · breakdown: 30 from miles · 0 from climbing
            </div>
          </div>

          <div className="example">
            <div className="head">B. Hilly 30-mile road ride, 1,500m climb</div>
            <div className="row">distance_mi = 30 · elevation_gain_m = 1,500 · sport = Ride</div>
            <div className="row">elevation_mi_equiv = (1,500 / 100) × 1.0 = 15</div>
            <div className="row">distance_pm = floor(30 × 1.0) = 30</div>
            <div className="row">climbing_pm = floor(15 × 1.0) = 15</div>
            <div className="result">
              verified_pm = 45 · breakdown: 30 from miles · 15 from climbing
            </div>
          </div>

          <div className="example">
            <div className="head">C. Trail run, 6 miles, 400m climb</div>
            <div className="row">distance_mi = 6 · elevation_gain_m = 400 · sport = TrailRun</div>
            <div className="row">elevation_mi_equiv = (400 / 100) × 0.6 = 2.4</div>
            <div className="row">distance_pm = floor(6 × 4.0) = 24</div>
            <div className="row">climbing_pm = floor(2.4 × 4.0) = 9</div>
            <div className="result">
              verified_pm = 33 · breakdown: 24 from miles · 9 from climbing
            </div>
          </div>

          <div className="example">
            <div className="head">D. Pool swim, 1 mile</div>
            <div className="row">distance_mi = 1 · elevation_gain_m = 0 · sport = Swim</div>
            <div className="row">distance_pm = floor(1 × 8.0) = 8</div>
            <div className="row">climbing_pm = 0 (elevation_weight = 0 for swim)</div>
            <div className="result">verified_pm = 8 · no climb breakdown shown for swim</div>
          </div>

          <div className="example">
            <div className="head">E. Indoor cycling, 25 miles (Zwift)</div>
            <div className="row">distance_mi = 25 · elevation_gain_m = 0 · sport = VirtualRide</div>
            <div className="row">distance_pm = floor(25 × 1.0) = 25</div>
            <div className="row">climbing_pm = 0 (no recorded elevation)</div>
            <div className="result">
              verified_pm = 25 · breakdown: 25 from miles · 0 from climbing
            </div>
          </div>

          <h2>6. Indoor and virtual rides</h2>
          <p>
            <strong>Strava reports zero elevation gain for indoor and virtual activities</strong>{" "}
            — Zwift, Peloton, smart-trainer rides, treadmill runs. The activity data we receive
            doesn't include the simulated terrain those platforms render in their apps. As a
            result, indoor rides credit on distance alone.
          </p>
          <p>
            We know this matters to athletes who do serious work on virtual hills. A 90-minute
            Alpe du Zwift effort is real climbing — it just doesn't appear in the data Strava
            forwards to us. We're evaluating direct integrations with Zwift and Peloton in future
            releases to capture virtual-terrain effort properly. For now, your indoor rides credit
            their distance and your outdoor rides credit distance plus elevation.
          </p>
          <p>
            If you have access to a smart treadmill or trainer that reports elevation_gain to
            Strava (some do), it'll credit through the standard math automatically.
          </p>

          <h2>7. What we capture but don&apos;t yet use</h2>
          <p>
            On every activity, we record more than what v1.0 of the calculation reads. We capture
            (and store) all of the following from every Strava activity:
          </p>
          <ul>
            <li><strong>Heart rate</strong> — average and maximum</li>
            <li><strong>Power</strong> — average watts and weighted average watts (when a power meter is present)</li>
            <li><strong>Energy</strong> — kilojoules of work performed</li>
            <li><strong>Strava&apos;s native effort score</strong> (the platform&apos;s own intensity rating)</li>
            <li><strong>Elevation gain</strong> (already used in v1.0)</li>
            <li><strong>Moving time</strong> (already used for our speed-ceiling fraud check)</li>
          </ul>
          <p>
            The reason we capture now without computing now: we'll need this data to credibly
            extend the methodology in future versions. If we waited until v1.x to start capturing
            heart rate, athletes who connected before that release would have months of activities
            with no HR data on file. By capturing from launch, every activity from {methodVersion}{" "}
            forward has a complete record — so when we add intensity-aware or power-aware credit,
            it applies fairly across the network's history.
          </p>
          <p>
            Future releases may use this data for intensity-weighted PM, power-aware PM,
            recovery-context calculation, dimension-specific brand challenges, athlete
            specializations (Climbing Specialist, Power Specialist, etc.), and brand analytics.
            We&apos;ll publish those features as they ship — not on a fixed roadmap, but with the
            same versioning discipline as v1.0.
          </p>

          <h2>8. Versioning</h2>
          <p>
            We follow a <strong>version-from-now</strong> policy: when we ship a new version of
            the calculation, activities credited under the previous version stay at that version.
            New activities apply the new rules. We do not retroactively recompute lifetime PM when
            the math evolves.
          </p>
          <p>
            Why: if every methodology revision triggered a global re-score, your lifetime PM would
            be a moving target — not a credential. Version-from-now means once you've earned a
            mile, it's yours under the rules in effect at the time you earned it.
          </p>
          <p>
            Each activity row records its method version in the data layer. When we publish v1.1
            (or v2.0), this page will gain a changelog showing what changed and what the previous
            version's math was. Inspectable forever.
          </p>

          <h3>Changelog</h3>
          <ul>
            <li>
              <strong>{methodVersion}</strong> — initial release. Distance + elevation-aware
              calculation. Effective {effectiveDate}.
            </li>
          </ul>

          <h2>9. What this isn&apos;t</h2>
          <p>
            We've drawn from established physiology and training-science literature in calibrating
            the v1.0 constants — Banister&apos;s TRIMP framework for cardiovascular load, Coggan&apos;s
            Training Stress Score for power-based effort, decades of public research on metabolic
            cost across sports. Where we use ideas from those frameworks in future versions, we&apos;ll
            cite them.
          </p>
          <p>
            But PROOF Miles are not any of those metrics. Specifically:
          </p>
          <ul>
            <li>
              PM is <strong>not</strong> Strava&apos;s Suffer Score or Relative Effort. Those are
              proprietary to Strava and trademarked by them. Our calculation is independent and
              uses different inputs.
            </li>
            <li>
              PM is <strong>not</strong> WHOOP Strain. WHOOP&apos;s Strain Score is a proprietary
              measure derived from their wearable data; PM is a public, open-formula calculation
              you can verify yourself.
            </li>
            <li>
              PM is <strong>not</strong> a TSS or TRIMP score. Those metrics use different inputs
              (power-or-HR-time-in-zone curves) and serve different purposes (training-load
              tracking for performance modeling). PM is designed for cross-network loyalty
              accounting, not for prescribing your training.
            </li>
            <li>
              PM is <strong>not</strong> a fitness or readiness assessment. We don&apos;t calculate
              or display VO2 Max, recovery state, or training stress. We measure verified effort,
              not capacity.
            </li>
          </ul>

          <h2>10. Feedback</h2>
          <p>
            We expect to revise this methodology. The constants in Sections 3 and 4 are our best
            calibration today, informed by public research and our own analysis — but coaches,
            physiologists, and athletes who think hard about training will have informed opinions,
            and we want to hear them.
          </p>
          <p>
            If you have a substantive case for a different constant, a critique of our reasoning,
            or a proposed addition to the calculation, email us at{" "}
            <a href="mailto:team@verifiedeffort.com">team@verifiedeffort.com</a>. We read every
            message. Substantive proposals get genuine consideration; if they shift our math,
            you&apos;ll see them in the changelog above.
          </p>

          <h2>11. For brand admins</h2>
          <p>
            If you run a brand loyalty program on PROOF, this calibration affects how fast your
            athletes accumulate brand PM. Two things to know:
          </p>
          <ul>
            <li>
              <strong>Climbing-heavy cohorts accumulate PM faster</strong> than flat-cohort
              projections imply. A cycling brand whose customers regularly climb significant
              vertical will see milestone-crossing rates 10–25% faster than a brand whose customers
              ride mostly flat terrain. Set your milestone PM thresholds with this in mind.
            </li>
            <li>
              <strong>The shape of the milestone ladder doesn&apos;t change.</strong> A
              500/1000/2500/5000/10000/25000 PM ladder is still a graduated structure. Elevation
              awareness changes the rate, not the structure. If you've calibrated milestones to
              feel "reachable in 2-3 months for an active member" under distance-only intuition,
              that timing shifts modestly faster for climbing cohorts and matches expectations for
              flat cohorts.
            </li>
          </ul>
          <p>
            We don&apos;t recommend rebuilding your milestone ladder around elevation specifically.
            PM is the unit; the ladder is the structure. The methodology revision affects how PM
            accumulates, not how you should think about your reward strategy.
          </p>

          <h2>12. Privacy reference</h2>
          <p>
            This methodology document explains how we calculate PROOF Miles from the data we
            collect. For details on what data we collect, how we use it, who we share it with,
            your rights, and our retention practices, see our{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>
          <p>
            Short summary: we collect activity data from connected fitness platforms with your
            explicit OAuth consent, use it to calculate PM and operate brand programs you&apos;ve
            joined, and don&apos;t sell, rent, or share it for advertising. We do not train AI or
            machine-learning models on athlete activity data.
          </p>

          <hr className="divider" />

          <p style={{ color: COLORS.subtle, fontSize: 13 }}>
            This methodology applies to PROOF as operated by PROOF Verified Effort, Inc. The math
            and reasoning here are open and inspectable. The {methodVersion} calculation took
            effect on {effectiveDate} and applies forward from that date.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${COLORS.rail}`,
          padding: "32px 24px",
          textAlign: "center",
          fontFamily: "'Outfit', sans-serif",
          fontSize: 13,
          color: COLORS.muted,
        }}
      >
        &copy; {new Date().getFullYear()} PROOF Verified Effort, Inc. All rights reserved.
      </footer>
    </div>
  );
}
