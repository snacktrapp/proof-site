**Trigger:** Lifetime PM crosses a named tier threshold (500 / 3,000 / 10,000 / 25,000 / 100,000 / 250,000) or an Apex Mark threshold (500,000 / 1,000,000 / 2,000,000 / doubling from there). Fires once per threshold crossing, ever.

**Critical rule — fires only on post-signup crossings.** Backfilled initial tier assignment does not trigger this email. The backfilled welcome (01-welcome Variant B) acknowledges the arriving tier once; subsequent tier advancements that happen after signup trigger this template. Implementation: compare the athlete's tier at `backfill_completed_at` to their tier after each post-signup activity. Email fires only if the tier at completion time is greater than the tier at backfill. Without this guard, a backfilled veteran would receive six or more tier-advancement emails in the first hour.

**One template, dynamic per tier.** Below is the Recruit → Contender transition as the rendered example; the per-tier copy table follows.

---

**Subject:** You're a Contender.

**Preheader:** 500 Lifetime PM. Tier advanced. Recognized at every brand.

---

Lifetime PM just crossed 500.

Your PROOF tier is now **Contender** — visible to every brand you're connected to, and every brand you ever join.

PROOF tier never moves backward. Brand rewards keep earning fresh. Next up:

- **Rival →** 3,000 Lifetime PM

Keep climbing.

— PROOF

---

## Tier copy reference

| Tier | Lifetime PM at crossing | Subject | Preheader | Next-up line |
|---|---|---|---|---|
| Contender | 500 | You're a Contender. | 500 Lifetime PM. Tier advanced. Recognized at every brand. | **Rival →** 3,000 Lifetime PM |
| Rival | 3,000 | You're a Rival. | 3,000 Lifetime PM. Tier advanced. | **Elite →** 10,000 Lifetime PM |
| Elite | 10,000 | You're Elite. | 10,000 Lifetime PM. Tier advanced. | **Legend →** 25,000 Lifetime PM |
| Legend | 25,000 | You're a Legend. | 25,000 Lifetime PM. Tier advanced. | **Myth →** 100,000 Lifetime PM |
| Myth | 100,000 | Myth. | 100,000 Lifetime PM. The top 1% of athletes we've seen. | **Apex →** 250,000 Lifetime PM |
| Apex | 250,000 | Apex. | 250,000 Lifetime PM. The rare air. | **Apex · Mark II →** 500,000 Lifetime PM |
| Apex · Mark II | 500,000 | Apex · Mark II. | Half a million Lifetime PM. | **Mark III →** 1,000,000 Lifetime PM |
| Apex · Mark III | 1,000,000 | Apex · Mark III. | One million Lifetime PM. | **Mark IV →** 2,000,000 Lifetime PM |
| Apex · Mark IV+ | 2,000,000+ | Apex · Mark {N}. | {pm_total} Lifetime PM. | *(omit next-up line — self-evident)* |

## Copy-tone notes by tier

- **Contender → Legend** copy stays close to the Contender template above — terse, "next up" visible, "Keep climbing." Changes per tier: subject, preheader, next-up threshold, Lifetime PM number.
- **Myth and above** drop "Keep climbing" — it reads as coaching to someone who's already climbed. Replace signoff body with: *"PROOF is built to recognize effort at every scale. Yours is now visible at every brand you'll ever connect to."*
- **Apex · Mark II and above** — no "Keep climbing," no "Next up" if Mark IV+. Body becomes: *"At this altitude, the ladder is yours to define. Every Mark doubles. Lifetime PM never moves backward."*
- **Legend-only special case:** at Legend threshold (25k) the old ceiling was reached. For legibility with athletes who've been on PROOF since before the ladder extension, include a one-line aside: *"Myth and Apex tiers added 2026-04. Your climb continues."* Remove this aside 12 months after ladder-extension date.

## Template variables

- `{pm_total}` — Lifetime PM at crossing, comma-formatted
- `{N}` — Apex Mark number (II, III, IV, V, VI, ...) in Roman numerals
