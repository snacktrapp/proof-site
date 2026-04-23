**Trigger:** Fires immediately after an athlete completes their first Strava OAuth connection to PROOF.

**Branching:** Template selects between two variants based on Lifetime PM after backfill completes. Backfill runs async; this email fires *after* backfill finishes (or after a 5-min cap, whichever is first — for veterans with very long histories, send preliminary "your history is importing" transactional from the brand's ESP as part of their welcome bonus flow, and let PROOF's welcome land once the ledger is settled).

- **Variant A — Zero-state** (Lifetime PM < 500 after backfill): new or lightly-used Strava account. Ahead-looking framing.
- **Variant B — Backfilled** (Lifetime PM ≥ 500 after backfill): existing Strava athlete with meaningful history. Recognition-of-history framing.

---

## Variant A — Zero-state

**Subject:** Your effort now counts.

**Preheader:** One Strava connect. Every verified mile, across every brand.

---

You just connected Strava to PROOF.

From here on, every GPS-verified activity you record becomes PROOF miles — an effort score normalized across every sport. One road cycling mile = 1 PM. Running, swimming, trail, rowing all convert through the PROOF Effort Index.

Three things to know:

- **Lifetime PM never resets.** It's permanent, and it travels with you to every brand you join.
- **Rewards earn fresh per brand.** Each brand's reward clock starts at zero on the day you connect — plus whatever welcome bonus they've configured.
- **Your tier and pace are visible to every enrolled brand.** The ladder: Recruit, Contender, Rival, Elite, Legend, Myth, Apex — and Marks beyond.

Your wallet, tier, and connected brands live at **proof.verifiedeffort.com**.

— PROOF

---

## Variant B — Backfilled

**Subject:** {Tier}. {pm_total} PM. Verified.

**Preheader:** {years_of_history} years of Strava, now portable.

---

We pulled your Strava history: **{years_of_history} years, {pm_total} PROOF miles.**

That puts you in the **{Tier}** tier — visible to every brand you connect to, today and every day forward. {next_line}

Your tier, pace, and trend travel with you. Brand rewards earn fresh — most brands reward backfilled athletes with a sizable welcome bonus based on the tier you arrive with.

**Your wallet →** proof.verifiedeffort.com

— PROOF

---

### Variant B `{next_line}` variable

Renders based on arriving tier. Gives forward momentum without making the athlete feel "done."

| Arriving tier | `{next_line}` renders as |
|---|---|
| Contender | Next tier: Rival at 3,000 Lifetime PM. |
| Rival | Next tier: Elite at 10,000 Lifetime PM. |
| Elite | Next tier: Legend at 25,000 Lifetime PM. |
| Legend | Next tier: Myth at 100,000 Lifetime PM. |
| Myth | Next tier: Apex at 250,000 Lifetime PM. |
| Apex (no Mark yet) | Above Apex: Mark II at 500,000 Lifetime PM. |
| Apex · Mark II | Mark III at 1,000,000 Lifetime PM. |
| Apex · Mark III | Mark IV at 2,000,000 Lifetime PM. |
| Apex · Mark IV+ | *(omit the next-tier line entirely — the Mark pattern is self-evident at this altitude)* |

### Variant B subject-line examples

- Rival. 5,847 PM. Verified.
- Elite. 18,240 PM. Verified.
- Legend. 38,000 PM. Verified.
- Myth. 142,680 PM. Verified.
- Apex. 312,400 PM. Verified.
- Apex · Mark III. 1,240,000 PM. Verified.

### Template variables

- `{Tier}` — arriving tier name, title case (Rival, Myth, Apex, Apex · Mark II, etc.)
- `{pm_total}` — Lifetime PM after backfill, comma-formatted
- `{years_of_history}` — age of oldest verified activity in completed years (minimum 1; if <1 year of history with ≥500 PM, omit the years phrase and render as "We pulled your Strava history — {pm_total} PROOF miles.")
- `{next_line}` — see table above
