# PROOF Platform Emails

Transactional emails sent from `noreply@proof.verifiedeffort.com` via Resend.

**Scope:** PROOF-layer moments only (identity, cross-brand wallet, platform events). Brand-level loyalty emails (milestone rewards, pace-change nudges in brand voice) fire from the brand's own ESP via webhook — never from here. See the Locked Specs Cheat Sheet for the ESP-agnostic contract.

**Voice:** dry, terse, declarative. Short sentences. No exclamation points. Concrete numbers over adjectives. Matches verifiedeffort.com.

**Sender:** `noreply@proof.verifiedeffort.com`
**From name:** `PROOF`

## Sequence

| # | File | Trigger |
|---|---|---|
| 1 | `01-welcome.md` | First Strava connect (PROOF account created) — two variants (zero-state / backfilled) |
| 2 | `02-first-verified-activity.md` | First activity cleared by verification pipeline *after signup* (backfilled history does not count) |
| 3 | `03-tier-advancement.md` | Lifetime PM crosses a tier threshold (Contender → Apex + Marks) *after signup only* |
| 4 | `04-reward-expiry.md` | Unredeemed reward in wallet ≤ 7 days to brand-configured expiry |
| 5 | `05-return-trigger.md` | No verified activity for 30+ days |

## Handling backfilled athletes

PROOF's locked spec performs full-history Strava backfill on first connection. A serious endurance athlete can arrive at PROOF already past every named tier threshold. To avoid spamming a veteran with six tier-advancement emails in their first hour:

- **Welcome email (#1) branches** — Variant B acknowledges the arriving tier and Lifetime PM once, in the tone of "your history is portable." This is the *only* platform acknowledgment of backfilled state.
- **Subsequent triggers (#2, #3) fire only on post-signup events** — backfilled activities and backfilled tier assignments do not trigger mail. Implementation notes in each template file.
- **Tier ladder (locked 2026-04-23):** Recruit / Contender / Rival / Elite / Legend / Myth / Apex + infinite Apex Marks. See the Locked Specs Cheat Sheet in `STRATEGY-SESSION-LOG.md` for thresholds and rationale.

## Format

Each file contains:
- `Subject:` line
- `Preheader:` line (optional; inbox preview text)
- Body — plain text / markdown
- Signoff

Rendered to HTML via React Email components when Resend integration lands.
