**Trigger:** Fires once per athlete, after their first *post-signup* verified activity clears the PROOF verification pipeline. Backfilled historical activities do not count — this is the first activity recorded while the PROOF account exists.

**Why this replaces the earlier "First 100 PM milestone" template:** backfilled veterans arrive already past 100 PM (and usually past every named tier threshold). Firing a "you crossed 100 PM!" email hours after signup would land as spam. This template works equally well for zero-state athletes and backfilled athletes — both experience a meaningful "your ledger is live now" moment.

**Subject:** First ride logged. Verified.

**Preheader:** Your PROOF ledger is moving.

---

Your first activity since connecting PROOF just cleared the verification pipeline:

- **{activity_type}** · {distance} {unit}
- **{pm} PROOF Miles** credited to your lifetime ledger
- **{brand_count}** brand program{brand_plural} credited Points

Everything from here runs automatically. Eligible verified activity updates your lifetime ledger and any brand programs where it counts.

— PROOF

---

### Template variables

- `{activity_type}` — connected-source activity type, title case (Ride, Run, Swim, etc.)
- `{distance}` + `{unit}` — as recorded by the connected source (miles / km / meters)
- `{pm}` — PROOF miles credited for this activity (after PEI conversion and 9-gate verification)
- `{brand_count}` — number of brand programs where this activity's sport was in the allowlist and Points were credited
- `{brand_plural}` — "" or "s" for grammatical agreement

### Edge cases

- If the activity was rejected by the verification pipeline (failed a gate), this email does not fire. A separate verification-failed notification may fire instead (out of scope for this sequence — spec'd separately).
- If zero brand programs credited Points (no active brand programs yet, or sport not in any allowlist), the bullet becomes "**Brand credit:** none yet — join a brand program to start earning brand rewards."
