**Trigger:** Fires immediately after an athlete completes their first activity-source connection to PROOF.

**Branching:** Template selects between two variants based on Lifetime PM after backfill completes. Backfill runs async; this email fires *after* backfill finishes (or after a 5-min cap, whichever is first — for veterans with very long histories, send preliminary "your history is importing" transactional from the brand's ESP as part of their welcome bonus flow, and let PROOF's welcome land once the ledger is settled).

- **Variant A — Zero-state** (Lifetime PM < 500 after backfill): new or lightly-used activity account. Ahead-looking framing.
- **Variant B — Backfilled** (Lifetime PM ≥ 500 after backfill): existing athlete with meaningful recorded history. Recognition-of-history framing.

---

## Variant A — Zero-state

**Subject:** Your effort now counts.

**Preheader:** One connection. Verified effort starts here.

---

You just connected an activity source to PROOF.

From here on, every eligible device-recorded activity you log can become PROOF Miles — an athlete-owned effort score normalized across sports. One road cycling mile = 1 PM. Running, swimming, trail, rowing all convert through the PROOF Effort Index.

Three things to know:

- **Lifetime PM never resets.** It's permanent, and it stays with your PROOF account.
- **Rewards earn fresh per brand.** Each brand's Points and reward progress start when you join that program — plus whatever welcome bonus they've configured.
- **Your PROOF tier is yours.** The ladder: Recruit, Contender, Rival, Elite, Legend, Myth, Apex — and Marks beyond.

Your wallet, tier, and connected brands live at **proof.verifiedeffort.com**.

— PROOF

---

## Variant B — Backfilled

**Subject:** {Tier}. {pm_total} PM. Verified.

**Preheader:** {years_of_history} years of effort, now verified.

---

We pulled your activity history: **{years_of_history} years, {pm_total} PROOF Miles.**

That puts you in the **{Tier}** tier. {next_line}

Your Lifetime PM is athlete-owned identity. Brand rewards earn fresh through brand-scoped Points and reward progress inside each program you join.

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
- `{years_of_history}` — age of oldest verified activity in completed years (minimum 1; if <1 year of history with ≥500 PM, omit the years phrase and render as "We pulled your activity history — {pm_total} PROOF Miles.")
- `{next_line}` — see table above
