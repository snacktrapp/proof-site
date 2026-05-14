import type { Metadata } from "next";
import { AthleteForwardHeader } from "@/components/AthleteForwardHeader";
import { athleteForwardChromeCss } from "@/components/athleteForwardChrome";

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
  const effectiveDate = "May 6, 2026";
  const methodVersion = "v1.6";
  const v1EffectiveDate = "April 30, 2026";

  return (
    <div style={{ background: COLORS.base, minHeight: "100vh", color: COLORS.text }}>
      <style>{athleteForwardChromeCss}</style>
      <AthleteForwardHeader />

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
            PROOF Miles are the unit of verified athletic effort. Every mile traces to a
            device-recorded activity confirmed through Strava — not self-reported, not inferred.
            Constants are derived from published metabolic-cost data (the Compendium of Physical
            Activities — Ainsworth et al. 2011 foundation, with values verified against the
            current 2024 Adult Compendium tables at pacompendium.com) and the work-energy
            theorem for elevation. The math is open, every multiplier is inspectable, and your
            lifetime total is preserved under the rules in effect when each mile was earned.
          </p>

          <p>
            This document explains exactly how PM is calculated, where each constant comes from,
            and how we plan to evolve the methodology over time. If you race, coach, or think hard
            about training, you should be able to read this and reproduce every multiplier with
            the Compendium open on a second tab.
          </p>

          <div className="callout">
            <strong>Methodology version: {methodVersion}.</strong> Effective {effectiveDate}.
            We commit to a clear versioning policy (Section 9) — when we revise the math,
            activities credited under any prior version stay at that version. New rules apply
            forward only. v1.0 launched {v1EffectiveDate}; {methodVersion} supersedes it from
            the date above. The full changelog is in Section 9.
          </div>

          <h2>1. What PROOF Miles measure</h2>
          <p>
            PROOF Miles measure <strong>verified athletic effort</strong>, normalized across
            sports. The core idea: a mile of running, a mile of cycling, and a mile of swimming
            represent very different metabolic costs. PM is the unit that puts them on a common
            scale so a runner and a cyclist who train equally hard earn comparable credit.
          </p>
          <p>
            <strong>"Verified" refers to the activity itself</strong> — that it was recorded by a
            device, uploaded through a third-party platform, and confirms when, where, and how
            far you moved. PROOF Miles is not a training-load metric or a fitness assessment.
            For training-load precision, see TSS (cycling, power-based), TRIMP (heart-rate
            based), or your platform's own training-load tool. PM is calibrated for cross-sport
            equity using published metabolic-cost data — intentionally simpler than those metrics
            because it is built to be inspectable, sport-agnostic, and stable across years of an
            athlete's record.
          </p>
          <p>
            Activity data comes from Strava today. Additional platforms (Garmin Connect, Apple
            Health) come later. We read what the platform reports, run it through our calculation,
            and credit the result as PM. We don't infer effort from things you didn't actually
            do — if it isn't recorded by your fitness device or app, it doesn't count.
          </p>
          <p>
            Lifetime PROOF Miles are designed to <strong>never reset and never decrease</strong>.
            Effort accrues for life. Tiers (Recruit through Apex, with Marks beyond) are
            graduated entirely on lifetime PM.
          </p>

          <h2>2. Which activities count</h2>
          <p>
            Strava records many things. PROOF only credits activities that pass a small set of
            inclusion gates — designed to keep the system honest without being precious about it.
          </p>
          <p>
            These gates run on PROOF&apos;s side, against the activity data Strava sends us.
            We don&apos;t consume Strava&apos;s own moderation signals (their flagged-activity
            status, segment-leaderboard reviews, etc.) — those are post-hoc community processes
            that operate on a different timeline than reward issuance. More on that at the
            bottom of this section.
          </p>
          <p>
            <strong>Sports we credit.</strong> Anything in Sections 4 and 5 of this page
            (cycling and its variants, running, trail running, hiking, walking, swimming).
            Sports outside that table — yoga, weight training, surfing, etc. — don&apos;t
            credit. We add new sports to the table as they make sense for the network.
          </p>
          <p>
            <strong>Recorded by a device, not typed in.</strong> Manual entries — where you
            type "I ran 5 miles" into Strava without a watch or phone actually tracking it —
            don&apos;t credit. We need device-verified data to honor the &quot;verified
            effort&quot; promise; a typed entry isn&apos;t verified.
          </p>
          <p>
            <strong>Indoor and virtual activities.</strong> They count. Strava forwards indoor
            rides without elevation data, so they credit on distance alone — Section 7 covers
            the detail. Treadmills, smart trainers, Zwift sessions are all eligible.
          </p>
          <p>
            <strong>Elevation, when reported.</strong> When the recording device captures
            elevation gain, it credits per the Section 5 weights. When it doesn&apos;t, the
            activity credits on distance only. We don&apos;t infer elevation from terrain
            databases or course data — only what the device measured.
          </p>
          <p>
            <strong>Sport-specific speed ceilings.</strong> A &quot;run&quot; averaging 25
            mph or a &quot;ride&quot; averaging 50 mph drops through the speed-ceiling
            screen. Each sport has its own ceiling tuned to what real athletes actually
            achieve at the elite end (Tour de France average pace ≈ 25 mph; world-class
            marathon pace ≈ 13 mph). Activities below a small distance minimum also don&apos;t
            credit — guards against accidental partial recordings.
          </p>
          <p>
            <strong>Multi-device duplicate detection.</strong> Recording the same effort on
            two devices at once (head unit + phone, watch + bike computer) creates two
            separate Strava activities. PROOF detects duplicates across the same sport, start
            time within ±10 minutes, and matching distance + duration; one credits, the other
            is recognized as a duplicate and ignored.
          </p>
          <p>
            <strong>Daily cap.</strong> A single athlete can earn up to 250 miles of
            distance-based PROOF Miles per UTC day. The activity that crosses the cap credits
            its remaining headroom on distance and full elevation on top — once the day&apos;s
            distance total reaches 250, further activities that day are rejected entirely
            (no distance credit, no elevation credit). The cap sits well above what almost
            any athlete logs in a day, but exists so a single anomalous activity can&apos;t
            inflate the system.
          </p>
          <p>
            <strong>What we don&apos;t currently do.</strong> Strava&apos;s flagged-activity
            status, leaderboard moderation, and segment review are processes that run on
            Strava&apos;s timeline (sometimes days or weeks after upload, often via community
            reports). PROOF credits at activity-create time and doesn&apos;t re-check or roll
            back later. We may add Strava-flag awareness in a future release; today, the
            integrity guarantees are the gates listed above. If something gets through that
            shouldn&apos;t have, the brand admin can reach out and we&apos;ll review.
          </p>

          <h2>3. The {methodVersion} calculation</h2>
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

          <h2>4. Sport multipliers ({methodVersion})</h2>
          <p>
            The multiplier is anchored to road cycling at 14 mph (Compendium entry 01040,
            10.0 MET — present in both the 2011 paper and the 2024 update). For each other
            sport, the pure-MET multiplier is derived as
            <em> (sport MET / sport pace_mph) ÷ (10.0 / 14)</em>. This produces the per-mile
            metabolic cost ratio against the cycling anchor. Where we adjust above the pure-MET
            number — for impact load, on-water cardiovascular premium, whole-body engagement,
            level-trail metabolic cost — the adjustment is named explicitly with its rationale.
          </p>
          <table>
            <thead>
              <tr>
                <th>Sport (Strava type)</th>
                <th>Compendium code · MET · pace</th>
                <th style={{ textAlign: "right" }}>Multiplier</th>
                <th style={{ textAlign: "right" }}>Adjustment</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Ride / VirtualRide</td><td>01040 · 10.0 MET · 14 mph (anchor)</td><td className="num">1.00</td><td className="num">—</td></tr>
              <tr><td>GravelRide</td><td>01030 · 8.0 MET · 12 mph</td><td className="num">0.95</td><td className="num">—</td></tr>
              <tr><td>MountainBikeRide</td><td>01009 · 8.5 MET · 9 mph</td><td className="num">1.30</td><td className="num">—</td></tr>
              <tr><td>EBikeRide</td><td>01084 · 6.0 MET · 14 mph (light electronic support)</td><td className="num">0.60</td><td className="num">—</td></tr>
              <tr><td>Run / VirtualRun</td><td>12070 · 11.0 MET · 7 mph</td><td className="num">2.50</td><td className="num">+14% †</td></tr>
              <tr><td>TrailRun</td><td>Run + level-trail premium</td><td className="num">2.70</td><td className="num">+0.20 ‡</td></tr>
              <tr><td>Hike</td><td>17080 · 6.0 MET · 3 mph</td><td className="num">2.80</td><td className="num">—</td></tr>
              <tr><td>Walk</td><td>17200 · 4.8 MET · 3.5 mph</td><td className="num">1.90</td><td className="num">—</td></tr>
              <tr><td>Swim</td><td>18240–18290 · 5.8–8.0 MET · 1.7 mph (midpoint)</td><td className="num">6.00</td><td className="num">—</td></tr>
              <tr><td>Rowing (water)</td><td>18050 · 5.8 MET · 6 mph</td><td className="num">1.40</td><td className="num">+5% §</td></tr>
              <tr><td>Kayaking</td><td>18100 · 5.0 MET · 4 mph</td><td className="num">1.75</td><td className="num">—</td></tr>
              <tr><td>NordicSki / RollerSki</td><td>19090 · 8.5 MET · 4.5 mph</td><td className="num">2.90</td><td className="num">+10% ¶</td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: 13, color: COLORS.subtle }}>
            <strong>†</strong> Run: pure-MET derivation gives 2.20. The +14% above pure-MET is a
            cross-modality balancing factor reflecting running's higher impact load, EPOC
            premium, and athlete-perceived effort relative to cycling at the anchor pace. This
            adjustment is editorial — labeled as such rather than presented as additional
            physiology — and is a live calibration we will revisit in v2.1 against accumulated
            cohort data.
            <br /><br />
            <strong>‡</strong> TrailRun: Run baseline plus a +0.20 level-trail metabolic premium
            consistent with published comparative studies of trail vs road running on level
            terrain. Uphill premium is captured separately by the elevation weight (Section 5).
            <br /><br />
            <strong>§</strong> Rowing (water): Compendium 18050 gives 1.35 pure-MET. The +5% is
            an on-water premium reflecting balance, wind, and steering — published literature
            shows water rowing produces meaningfully higher HR and lactate at matched-power vs
            ergometer rowing.
            <br /><br />
            <strong>¶</strong> NordicSki: Compendium 19090 gives 2.64 pure-MET. The +10% reflects
            whole-body engagement — XC skiing has the highest measured VO₂max among Olympic
            sports (sustained ~96 ml/kg/min in elite), driven by upper-body work that is not
            fully captured in lower-body-dominant Compendium derivations. Pure-MET 2.64 + 10%
            = 2.90.
          </p>
          <p>
            E-bikes are rated below cycling because the motor does meaningful work — we credit the
            human contribution. Mountain biking is rated above road cycling because off-road
            effort at equivalent distance is genuinely higher. Gravel sits between them.
          </p>
          <p>
            All Compendium codes refer to entries in the Compendium of Physical Activities
            (Ainsworth et al. 2011 foundation, <em>Med Sci Sports Exerc</em> 43(8):1575-81;
            Herrmann SD et al. 2024 Adult Compendium update, <em>J Sport Health Sci</em>).
            The canonical searchable table — and the version this calibration was verified
            against on 2026-05-11 — is the 2024 update at{" "}
            <a href="https://pacompendium.com" target="_blank" rel="noopener noreferrer">pacompendium.com</a>.
          </p>

          <h2>5. Elevation weights ({methodVersion})</h2>
          <p>
            Elevation weights determine how much each 100m of climbing contributes, expressed in
            miles-equivalent. The cycling weight is derived from the work-energy theorem
            (gravity is exact); other sports' weights are derived from Minetti et al. 2002
            (<em>J Appl Physiol</em> 93:1039-46), the canonical reference for the energy cost of
            walking and running on extreme uphill and downhill slopes.
          </p>
          <table>
            <thead>
              <tr>
                <th>Sport</th>
                <th style={{ textAlign: "right" }}>Elevation weight (per 100m)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Cycling (all variants)</td><td className="num">+1.75 mi</td></tr>
              <tr><td>Hike</td><td className="num">+0.95 mi</td></tr>
              <tr><td>TrailRun</td><td className="num">+0.70 mi</td></tr>
              <tr><td>Run / VirtualRun</td><td className="num">+0.60 mi</td></tr>
              <tr><td>NordicSki / RollerSki</td><td className="num">+0.60 mi</td></tr>
              <tr><td>Walk</td><td className="num">+0.40 mi</td></tr>
              <tr><td>Swim / Rowing / Kayaking</td><td className="num">0</td></tr>
            </tbody>
          </table>
          <p>
            <strong>Cycling elevation derivation.</strong> Lifting an 85kg system (75kg rider +
            10kg gear) by 100m requires <em>mgh = 85 × 9.81 × 100 = 83.3 kJ of mechanical work</em>.
            At 23% gross cycling efficiency (a well-validated mid-range value), the metabolic
            cost is 83.3 / 0.23 ≈ <em>362 kJ metabolic</em>. A flat mile at 14 mph requires
            roughly 165W × 257s = 42.4 kJ mechanical, or ≈ 184 kJ metabolic. The ratio is 1.97;
            the +1.75 weight is a conservative round-down for the median rider. Per-athlete
            weight normalization is deferred to v3.0.
          </p>
          <p>
            <strong>Hike weight (+0.95) higher than Run weight (+0.60).</strong> Per Minetti, the
            energy cost gradient for walking is steeper than for running on uphill terrain
            because walking has less elastic recoil to recover energy on each step. Running's
            biomechanics favor rebound; walking's do not. Hikers climbing 100m do meaningfully
            more work per vertical meter than runners; the elevation weight reflects this.
          </p>

          <h2>6. Worked examples</h2>
          <p>Five activities, working through the {methodVersion} math.</p>

          <div className="example">
            <div className="head">A. Flat 30-mile road ride</div>
            <div className="row">distance_mi = 30 · elevation_gain_m = 0 · sport = Ride</div>
            <div className="row">distance_pm = floor(30 × 1.00) = 30</div>
            <div className="row">climbing_pm = floor(0 × 1.75) = 0</div>
            <div className="result">
              verified_pm = 30 · breakdown: 30 from miles · 0 from climbing
            </div>
          </div>

          <div className="example">
            <div className="head">B. Hilly 30-mile road ride, 1,500m climb</div>
            <div className="row">distance_mi = 30 · elevation_gain_m = 1,500 · sport = Ride</div>
            <div className="row">elevation_mi_equiv = (1,500 / 100) × 1.75 = 26.25</div>
            <div className="row">distance_pm = floor(30 × 1.00) = 30</div>
            <div className="row">climbing_pm = floor(26.25 × 1.00) = 26</div>
            <div className="result">
              verified_pm = 56 · breakdown: 30 from miles · 26 from climbing
            </div>
          </div>

          <div className="example">
            <div className="head">C. Trail run, 6 miles, 400m climb</div>
            <div className="row">distance_mi = 6 · elevation_gain_m = 400 · sport = TrailRun</div>
            <div className="row">elevation_mi_equiv = (400 / 100) × 0.70 = 2.80</div>
            <div className="row">distance_pm = floor(6 × 2.70) = 16</div>
            <div className="row">climbing_pm = floor(2.80 × 2.70) = 7</div>
            <div className="result">
              verified_pm = 23 · breakdown: 16 from miles · 7 from climbing
            </div>
          </div>

          <div className="example">
            <div className="head">D. Pool swim, 1 mile</div>
            <div className="row">distance_mi = 1 · elevation_gain_m = 0 · sport = Swim</div>
            <div className="row">distance_pm = floor(1 × 6.00) = 6</div>
            <div className="row">climbing_pm = 0 (elevation_weight = 0 for swim)</div>
            <div className="result">verified_pm = 6 · no climb breakdown shown for swim</div>
          </div>

          <div className="example">
            <div className="head">E. Indoor cycling, 25 miles (Zwift)</div>
            <div className="row">distance_mi = 25 · elevation_gain_m = 0 · sport = VirtualRide</div>
            <div className="row">distance_pm = floor(25 × 1.00) = 25</div>
            <div className="row">climbing_pm = 0 (no recorded elevation)</div>
            <div className="result">
              verified_pm = 25 · breakdown: 25 from miles · 0 from climbing
            </div>
          </div>

          <h2>7. Indoor and virtual rides</h2>
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

          <h2>8. What we capture but don&apos;t yet use</h2>
          <p>
            On every activity, we record more than what {methodVersion} of the calculation reads. We capture
            (and store) all of the following from every Strava activity:
          </p>
          <ul>
            <li><strong>Heart rate</strong> — average and maximum</li>
            <li><strong>Power</strong> — average watts and weighted average watts (when a power meter is present)</li>
            <li><strong>Energy</strong> — kilojoules of work performed</li>
            <li><strong>Strava&apos;s native effort score</strong> (the platform&apos;s own intensity rating)</li>
            <li><strong>Elevation gain</strong> (used since v1.0; current value calibration is {methodVersion})</li>
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

          <h2>9. Versioning</h2>
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
              <strong>{methodVersion}</strong> — sport multiplier and elevation weight
              recalibration. Anchored to the published Compendium of Physical Activities
              (Ainsworth et al. 2011 foundation, <em>Med Sci Sports Exerc</em> 43(8):1575-81;
              Herrmann SD et al. 2024 Adult Compendium update via pacompendium.com) with
              documented cross-modality
              balancing factors and physics-derived elevation weights. Per-sport changes vs v1.0:
              GravelRide 1.20→0.95, MountainBikeRide 1.50→1.30, EBikeRide 0.40→0.60 (corrected
              MET basis), Run 3.00→2.50, TrailRun 4.00→2.70, Hike 1.00→2.80 (major correction),
              Walk 1.00→1.90, Swim 8.00→6.00, Rowing 2.00→1.40, Kayaking 2.00→1.75, NordicSki
              added at 2.90. Cycling elevation weight 1.00→1.75 (physics-derived). Methodology
              page rewritten with explicit Compendium codes, derivation appendix, and limitations
              acknowledgment. Effective {effectiveDate}.
              <br /><br />
              <em>Within-v1.6 citation corrections (2026-05-11):</em> independent verification
              against the live Compendium source caught three citation errors in the original
              v1.6 ship. MountainBikeRide cited 01015 (which is actually "Bicycling, self-selected
              easy pace" at 4.3 MET); the intended entry is <strong>01009 "Bicycling, mountain,
              general" at 8.5 MET</strong>. The shipped 1.30 multiplier is correct under the
              corrected code (citation-only fix). Walk cited 4.3 MET; Compendium 17200 publishes
              <strong> 4.8 MET</strong> — multiplier corrected 1.70 → <strong>1.90</strong>.
              NordicSki / RollerSki cited 9.0 MET; Compendium 19090 publishes <strong>8.5 MET</strong>
              — multiplier corrected 3.00 → <strong>2.90</strong> (preserving the +10% upper-body
              engagement premium). The cycling anchor (01040 = 10.0 MET / 14 mph) was verified
              and holds. Version stays v1.6 because the math shape is unchanged; activities
              credited before 2026-05-11 retain their original multiplier (version-from-now).
            </li>
            <li>
              <strong>v1.0</strong> — initial release. Distance + elevation-aware calculation
              with first-pass sport multipliers. Effective {v1EffectiveDate}. Activities credited
              under v1.0 retain v1.0 totals; v1.6 applies forward only.
            </li>
          </ul>

          <h2>10. What this isn&apos;t</h2>
          <p>
            v1.6 calibration draws directly from the published Compendium of Physical Activities
            (Ainsworth et al. 2011 foundation, <em>Med Sci Sports Exerc</em> 43(8):1575-81;
            Herrmann SD et al. 2024 Adult Compendium update via pacompendium.com) for sport
            multipliers and Minetti et al. 2002 (<em>J Appl Physiol</em> 93:1039-46) for elevation
            weights.
            Future versions may incorporate additional published frameworks — Banister's TRIMP for
            cardiovascular load, Coggan's TSS for power-based effort — and we'll cite each in the
            changelog when they ship.
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
              tracking for performance modeling). PM is a cross-sport effort unit, not a
              training prescription.
            </li>
            <li>
              PM is <strong>not</strong> a fitness or readiness assessment. We don&apos;t calculate
              or display VO2 Max, recovery state, or training stress. We measure verified effort,
              not capacity.
            </li>
          </ul>

          <h2>11. Known limitations</h2>
          <p>
            We&apos;d rather state these openly than pretend we capture them. PM&apos;s precision
            is bounded by what device-recorded activity data can tell us. Specifically:
          </p>
          <ul>
            <li>
              <strong>Body mass.</strong> A 90kg rider does meaningfully more mechanical work
              than a 60kg rider on the same climb, but earns the same PM. Per-athlete weight
              normalization is deferred to v3.0 (will be optional, opt-in via athlete profile).
            </li>
            <li>
              <strong>Intensity within a sport.</strong> A leisurely 50-mile ride and a hard
              50-mile race earn the same PM despite different metabolic costs. Heart-rate-zone
              and power-based intensity refinements are deferred to v2.x; v1.6 captures the data
              (every activity stores HR, watts, kilojoules) but does not compute on it.
            </li>
            <li>
              <strong>Environmental factors.</strong> Heat, altitude, humidity, and wind all
              meaningfully affect metabolic cost. None are recorded by Strava in a form we can
              use. Activities completed in adverse conditions earn the same PM as those in ideal
              conditions.
            </li>
            <li>
              <strong>Indoor / virtual elevation.</strong> Strava reports zero elevation gain
              for indoor and virtual rides (Section 7). Zwift's simulated climbing is real
              effort but isn&apos;t in the data we receive. Direct integrations are on the
              roadmap.
            </li>
            <li>
              <strong>Pace variance within a sport.</strong> Walk and Run multipliers assume a
              representative recreational pace (3.5 mph and 7 mph respectively). Faster or
              slower athletes are credited at the same per-mile rate. Pace-aware multipliers are
              deferred to v2.x.
            </li>
          </ul>
          <p>
            These limitations are visible to us. We don&apos;t engineer around them with hidden
            adjustments or proprietary smoothing. Where the data is not there, we credit what
            the data does say and document the gap.
          </p>

          <h2>12. Brand-layer modifiers (not part of PM)</h2>
          <p>
            PROOF Miles, as defined in Sections 3-6, are the methodology-canonical number.
            Brand partners can layer two configurable behaviors on top of PM <em>at the brand
            layer</em> — these affect what the athlete accumulates <em>in that brand&apos;s
            program</em>, not the athlete&apos;s lifetime PM, tier, or public-profile total.
          </p>
          <p>
            <strong>Anniversary multiplier.</strong> Each brand can configure an unconditional
            multiplier (1.0–3.0) that applies for a window of days following each yearly
            rollover of the athlete&apos;s connection-with-that-brand date. The default
            multiplier is 1.0 (off); the default window is 7 days. A brand running a 2× / 7-day
            anniversary kicker means an athlete who rides during their connection-anniversary
            week earns 2× brand PM for those activities, which can advance brand-side milestones
            and rewards faster. The first window opens on the <em>first</em> anniversary
            (year+1 of connect day), not on connect day itself — connect-day is covered
            separately by welcome bonuses where the brand has them. February 29 connections
            roll to February 28 in non-leap years.
          </p>
          <p>
            <strong>Forward-only brand PM.</strong> Brand PM only credits activities dated on or
            after the athlete connected to that brand. Lifetime PM accumulates everything
            (including activities dated before the brand connection); brand PM does not.
            Reasoning: brand-side rewards have to mean &quot;what this athlete did <em>for this
            brand, while connected</em>&quot; — retroactive credit on bulk-uploaded historical
            rides would let an athlete cross the 500-PM brand milestone within minutes of
            enrollment, breaking the audit story for brand admins.
          </p>
          <p>
            Lifetime PM, the tier ladder, and the public profile are unaffected by either
            mechanism. The methodology-canonical PM stamped on each activity row is unaffected.
            Both modifiers are visible to the athlete in brand-side reward emails and in the
            brand&apos;s storefront loyalty section when implemented.
          </p>

          <h2>13. For coaches and physiologists</h2>
          <p>
            Three questions we expect from anyone who reads this page closely.
          </p>
          <p>
            <strong>Why doesn&apos;t PM use heart rate?</strong> Heart rate data is widely
            available and would let us refine intensity. Two reasons it&apos;s deferred:
            (a) optical-HR (wrist-strap) data is meaningfully noisier than chest-strap HR,
            especially at intensity, so a HR-derived multiplier would amplify measurement
            noise; (b) HR-zone calibration requires a per-athlete HR_max input, and the
            standard age-predicted estimate (220-age, or Tanaka 208 - 0.7×age) has standard
            error of 7-12 bpm — large enough to put zone boundaries fully inside the error
            bar. v2.x ships with athlete-provided HR_max and a bounded intensity multiplier.
          </p>
          <p>
            <strong>Why doesn&apos;t PM use body mass?</strong> Cycling at 14 mph and climbing
            100m both depend on body mass, and PM doesn&apos;t correct for it. The reason:
            requiring weight input creates a barrier to participation, and any default we use
            (75kg system in our cycling derivation) is wrong for individual athletes by up to
            ±30%. v3.0 ships an opt-in athlete-profile weight input that adjusts climbing PM;
            athletes who don&apos;t provide weight are credited at the median assumption.
          </p>
          <p>
            <strong>Why isn&apos;t running pace-aware when walking will be?</strong> Running
            and walking both vary by pace, but walking varies more in <em>kind</em> — a 2.5 mph
            stroll and a 4.5 mph fitness walk are qualitatively different exercise — while a
            6 min/mile tempo and a 12 min/mile recovery jog are both still running. v1.6 ships
            a fixed Walk multiplier with a documented pace assumption. Pace-aware multipliers
            (for walking and running) are a v2.x decision pending field data on whether the
            added complexity earns its keep.
          </p>

          <h2>14. Annual methodology audit</h2>
          <p>
            We commit to publishing a yearly methodology audit. Each audit reports per-sport PM
            distributions across the network, correlations against published training-load
            metrics where the underlying data exists (TSS for cyclists with power, TRIMP for
            athletes with HR), any constants under review, and any changes shipping in the next
            version. The first audit lands in 2027; preliminary cohort analysis from {effectiveDate}{" "}
            forward will inform v2.x calibrations.
          </p>
          <p>
            The methodology page is the audit trail. Every change shows up in the changelog
            (Section 9). Every constant traces to a citation. If a published exercise
            physiologist reads this and finds an error or a stronger calibration, we want to
            know — see Section 15 below.
          </p>

          <h2>15. Feedback</h2>
          <p>
            We expect to revise this methodology. The constants in Sections 4 and 5 are our best
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

          <h2>16. For brand admins</h2>
          <p>
            If you run a brand loyalty program on PROOF, this calibration affects how fast your
            athletes accumulate brand PM. Two things to know:
          </p>
          <ul>
            <li>
              <strong>Climbing-heavy cohorts accumulate PM faster</strong> than flat-cohort
              projections imply. The v1.6 cycling elevation weight (1.75 mi-equivalent per 100m)
              is up from v1.0&apos;s 1.0, so a brand whose customers regularly climb significant
              vertical will see milestone-crossing rates 25–50% faster than a brand whose
              customers ride mostly flat terrain. Set milestone PM thresholds with this in mind.
            </li>
            <li>
              <strong>Multi-sport cohorts will see different rates than v1.0 implied.</strong>
              The v1.6 recalibration shifted Run multiplier 3.0→2.5, Swim 8.0→6.0, Hike
              1.0→2.8, Walk 1.0→1.9. Brands with significant non-cycling exposure should expect
              accumulation rates to reflect the new constants from the effective date forward.
              Existing PM accumulated under v1.0 is preserved.
            </li>
            <li>
              <strong>The shape of the milestone ladder doesn&apos;t change.</strong> A
              500/1000/2500/5000/10000/25000 PM ladder is still a graduated structure.
              Calibration changes the rate, not the structure. If you've calibrated milestones
              to feel "reachable in 2-3 months for an active member" under v1.0 intuition, that
              timing shifts modestly faster for cycling-with-climbing cohorts and shifts
              meaningfully for hike/walk-heavy cohorts.
            </li>
          </ul>
          <p>
            We don&apos;t recommend rebuilding your milestone ladder around elevation specifically.
            PM is the unit; the ladder is the structure. The methodology revision affects how PM
            accumulates, not how you should think about your reward strategy.
          </p>

          <h2>17. Privacy reference</h2>
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
