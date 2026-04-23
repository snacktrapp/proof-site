**Trigger:** One or more unredeemed rewards in the PROOF wallet are within 7 days of their brand-configured expiry. Fires once per wallet-scan window (daily cron); one email bundles all expiring rewards across brands. Athlete receives a second reminder 24 hours before expiry if still unredeemed.

**Subject:** Rewards expiring in your PROOF wallet.

**Preheader:** {N} rewards expiring within 7 days.

---

Heads up — you have unredeemed rewards in your PROOF wallet expiring soon:

- **{Brand A}** · $10 store credit · expires **April 30**
- **{Brand B}** · Free shipping · expires **May 5**

Each one is tied to your email and single-use. Click Shop from your wallet and the discount deep-links straight into checkout — no codes to copy.

**View your wallet →** proof.verifiedeffort.com/wallet

— PROOF

---

## Variable notes

- Reward list is dynamic — may be 1 item or many. If 1 item, subject becomes "A reward is expiring in your PROOF wallet."
- Brand display name and reward format pulled from the rewards table.
- 24-hour final-reminder variant: subject changes to "Expiring tomorrow: {reward} at {Brand}." — single-reward framing only.
