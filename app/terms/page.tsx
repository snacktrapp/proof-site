import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — PROOF",
  description:
    "PROOF Terms of Service. Rules of the road for athletes earning verified-effort rewards and brands running PROOF loyalty programs.",
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

export default function TermsOfService() {
  const effectiveDate = "April 29, 2026";

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
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 36,
            color: COLORS.textBright,
            letterSpacing: "0.04em",
            marginBottom: 8,
          }}
        >
          Terms of Service
        </h1>
        <p style={{ color: COLORS.subtle, fontSize: 14, marginBottom: 48 }}>
          Effective date: {effectiveDate}
        </p>

        <style>{`
          .terms h2 {
            font-family: 'Outfit', sans-serif;
            font-weight: 700;
            font-size: 20px;
            color: ${COLORS.textBright};
            letter-spacing: 0.03em;
            margin-top: 48px;
            margin-bottom: 16px;
          }
          .terms h3 {
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            font-size: 16px;
            color: ${COLORS.textBright};
            margin-top: 32px;
            margin-bottom: 12px;
          }
          .terms p {
            margin-bottom: 16px;
            color: ${COLORS.text};
          }
          .terms a {
            color: ${COLORS.signal};
            text-decoration: none;
          }
          .terms a:hover {
            text-decoration: underline;
          }
          .terms ul {
            margin: 0 0 16px 0;
            padding-left: 24px;
          }
          .terms li {
            margin-bottom: 8px;
            color: ${COLORS.text};
          }
          .terms .divider {
            border: none;
            border-top: 1px solid ${COLORS.rail};
            margin: 48px 0;
          }
          .terms .callout {
            background: ${COLORS.surface};
            border: 1px solid ${COLORS.rail};
            border-left: 3px solid ${COLORS.signal};
            padding: 16px 20px;
            margin: 24px 0;
            font-size: 14px;
            color: ${COLORS.text};
          }
        `}</style>

        <div className="terms">
          <p>
            These Terms of Service ("Terms") govern your access to and use of the PROOF platform,
            website, and related services operated by PROOF Verified Effort, Inc. ("PROOF," "we,"
            "us," or "our"). By creating an account or using the Service, you agree to these Terms.
            If you do not agree, do not use the Service.
          </p>

          <div className="callout">
            PROOF serves two kinds of users: <strong>athletes</strong> who connect their fitness
            accounts to earn verified-effort rewards, and <strong>brands</strong> who configure and
            run loyalty programs that reward those athletes. Some sections apply to both; sections
            labeled "Athletes" or "Brands" apply only to that side.
          </div>

          <h2>1. Definitions</h2>
          <ul>
            <li>
              <strong>Service</strong> — the PROOF website (verifiedeffort.com), the PROOF
              application (proof.verifiedeffort.com), our APIs, and any related features we offer.
            </li>
            <li>
              <strong>Athlete</strong> — an individual who creates a PROOF account to track
              verified athletic effort and earn rewards from participating brands.
            </li>
            <li>
              <strong>Brand</strong> — an entity that creates a PROOF brand account to operate a
              verified-effort loyalty program for its customers.
            </li>
            <li>
              <strong>PROOF Miles (PM)</strong> — our effort-normalized internal unit, calculated
              from verified athletic activity using the PROOF Effort Index ("PEI").
            </li>
            <li>
              <strong>Brand Program</strong> — a brand's configured set of milestones, sport
              allowlist, welcome bonus rules, anniversary multiplier, challenges, and discount
              templates.
            </li>
            <li>
              <strong>Reward</strong> — a discount code or other benefit issued to an athlete by a
              brand on the PROOF platform, typically generated through the brand's Shopify
              integration.
            </li>
            <li>
              <strong>Connected Platform</strong> — a third-party fitness service (e.g., Strava,
              Garmin Connect) that an athlete authorizes PROOF to read activity data from.
            </li>
          </ul>

          <h2>2. Eligibility</h2>
          <p>
            You must be at least 16 years old to create a PROOF account. By creating an account you
            represent that you meet this age requirement and that the information you provide is
            accurate. Accounts are for individual athletes or for authorized representatives of a
            brand entity; you may not create an account on behalf of someone else without their
            authorization.
          </p>

          <h2>3. Accounts and Account Security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and
            for all activity that occurs under your account. Notify us at{" "}
            <a href="mailto:team@verifiedeffort.com">team@verifiedeffort.com</a> immediately if you
            suspect unauthorized access. We may suspend or terminate accounts that show signs of
            compromise, fraud, or material breach of these Terms.
          </p>
          <p>
            You may delete your account at any time through your account settings. Deletion is
            described in our{" "}
            <a href="/privacy">Privacy Policy</a> and removes your personal data within 30 days,
            subject to legal retention requirements.
          </p>

          <h2>4. Athletes — Connecting Fitness Platforms</h2>
          <p>
            To earn verified-effort rewards, you connect a fitness platform such as Strava or
            Garmin Connect through that platform's OAuth authorization flow. By connecting, you:
          </p>
          <ul>
            <li>
              Authorize PROOF to read activity data from the connected platform per the scope
              shown in the OAuth consent screen.
            </li>
            <li>
              Agree that the connected platform's own terms and privacy policy continue to govern
              your relationship with that platform.
            </li>
            <li>
              Acknowledge that you may revoke PROOF's access at any time through your PROOF account
              settings or directly through the connected platform's settings.
            </li>
          </ul>
          <p>
            PROOF does not control, modify, or store data on the connected platform. We only read
            activity data as authorized by you and as permitted by each platform's API agreement.
          </p>

          <h2>5. Athletes — How Rewards Work</h2>
          <p>
            When you join a brand's program, your verified activity in the brand's allowlisted
            sports accrues PROOF Miles toward that brand. When you cross a brand-configured
            milestone, the brand's program issues a reward — typically a single-use discount code
            generated through the brand's Shopify store and locked to your account.
          </p>
          <p>
            Important conditions:
          </p>
          <ul>
            <li>
              Rewards are issued by brands, not by PROOF. The brand sets the discount value, the
              eligible products, the expiration window, and any other restrictions.
            </li>
            <li>
              Discount codes are typically generated on first redemption attempt ("lazy
              generation") and are single-use, locked to your athlete account at the brand's
              Shopify store.
            </li>
            <li>
              PROOF Miles are an internal unit, have no cash value, are not transferable, and
              cannot be exchanged for currency. They do not constitute a financial instrument or
              security.
            </li>
            <li>
              Lifetime PROOF Miles are intended to persist across the network for as long as your
              account exists; however, we reserve the right to adjust, recompute, or remove PM
              credits that result from system errors, fraud, or duplicate activity recordings.
            </li>
          </ul>

          <h2>6. Athletes — Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              Submit, fabricate, or upload activity data that does not reflect real, GPS-verified
              physical effort by you.
            </li>
            <li>
              Use multiple devices to record the same physical activity in a way that causes
              double credit, or otherwise attempt to circumvent PROOF's fraud-screening gates.
            </li>
            <li>
              Use someone else's fitness account, share access to your PROOF account, or operate
              multiple PROOF accounts to gain rewards from a single brand.
            </li>
            <li>
              Reverse engineer, decompile, scrape, or attempt to extract source code from the
              Service.
            </li>
            <li>
              Use the Service to violate the terms of any connected platform (Strava, Garmin, or
              otherwise) or any brand's program rules.
            </li>
          </ul>
          <p>
            We screen activities for fraud signals, including but not limited to: unrealistic
            speed for the sport, manual entries, missing GPS, overlapping multi-device recordings,
            and future-dated submissions. Activities that fail these checks do not credit and may
            result in account review.
          </p>

          <h2>7. Brands — Brand Accounts and Approval</h2>
          <p>
            Brand accounts are created via the brand sign-up flow and require PROOF approval before
            activation. Approval is at our discretion. Once approved, the brand may configure its
            program and open enrollment to athletes via its <code>/join/</code> URL.
          </p>
          <p>
            By creating a brand account, the individual creating the account represents that they
            are authorized to act on behalf of the brand entity and to bind the brand to these
            Terms. The brand entity is responsible for the conduct of all users with administrative
            access to its brand account.
          </p>

          <h2>8. Brands — Program Configuration and Responsibility</h2>
          <p>
            Brands are solely responsible for the configuration of their loyalty program,
            including:
          </p>
          <ul>
            <li>
              Milestone thresholds, reward values, and the Shopify <code>price_rule_id</code>{" "}
              templates that back each milestone.
            </li>
            <li>
              The sport allowlist, welcome bonus rules, anniversary multiplier, challenges, and
              reward expiry windows for the brand's program.
            </li>
            <li>
              The accuracy of any Shopify integration credentials, ESP webhook endpoints, or other
              third-party connections supplied to PROOF.
            </li>
            <li>
              Honoring discount codes generated by PROOF on the brand's behalf at the brand's
              Shopify store, subject to the restrictions configured in the brand's price_rule
              template.
            </li>
            <li>
              Compliance with applicable laws (consumer protection, advertising, tax) governing the
              brand's loyalty program and the rewards offered.
            </li>
          </ul>
          <p>
            PROOF provides the infrastructure to verify athletic effort, accumulate brand-specific
            PROOF Miles, and trigger reward issuance. PROOF is not a party to the underlying
            transaction between the brand and the athlete and does not act as a merchant of record
            for the brand's products or discounts.
          </p>

          <h2>9. Brands — Athlete Data Provided to Brands</h2>
          <p>
            When an athlete joins a brand's program, the brand receives only the limited data
            described in our{" "}
            <a href="/privacy">Privacy Policy</a> §4.1 — tier, brand-specific PM, milestone status,
            and email for opted-in program communications. The brand does not receive raw GPS
            data, full activity history, or data from other brand programs the athlete has joined.
          </p>
          <p>
            Brands agree to use athlete data only for the operation of the brand's loyalty program
            and to handle that data in compliance with applicable privacy laws (including CCPA,
            CPRA, and GDPR where applicable). Brands may not sell, rent, or transfer athlete data
            obtained through PROOF to any third party.
          </p>

          <h2>10. Pricing and Fees</h2>
          <p>
            The Service is currently in beta. Brand pricing tiers are listed on the marketing site
            for reference, but commercial billing terms for brand accounts are individually
            confirmed in writing during onboarding. We will give brands at least 30 days' notice
            before charging or changing fees on their account.
          </p>
          <p>
            Athlete accounts are free. Athletes are not charged to use the Service or to receive
            rewards from connected brands.
          </p>

          <h2>11. Intellectual Property</h2>
          <p>
            The PROOF name, logo, the PROOF Effort Index, the PROOF Miles unit, and all
            non-user-generated content on the Service are the property of PROOF Verified Effort,
            Inc. and are protected by copyright, trademark, and other intellectual property laws.
            You may not use any of these marks or content without our prior written permission,
            except as required for the legitimate use of the Service (for example, a brand
            referring to its participation in PROOF in its own marketing materials).
          </p>
          <p>
            Athletes retain ownership of their original fitness activity data. By using the
            Service, you grant PROOF a non-exclusive, worldwide, royalty-free license to process
            that data as necessary to operate the Service and as described in our{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>

          <h2>12. Service Availability and Changes</h2>
          <p>
            We aim to keep the Service available continuously but do not guarantee uninterrupted
            availability. We may perform scheduled maintenance, deploy updates, or experience
            unplanned downtime. We may also add, modify, or remove features at any time. We will
            give brands and athletes reasonable notice of material changes that affect their use of
            the Service.
          </p>

          <h2>13. Suspension and Termination</h2>
          <p>
            You may terminate your account at any time. We may suspend or terminate your account
            without prior notice if we reasonably believe you have:
          </p>
          <ul>
            <li>Violated these Terms or any applicable law</li>
            <li>Submitted fraudulent activity data or attempted to circumvent fraud gates</li>
            <li>Misused brand or athlete data obtained through the Service</li>
            <li>Compromised the security or operation of the Service</li>
          </ul>
          <p>
            Upon termination, your right to use the Service ends immediately. Sections 11
            (Intellectual Property), 14 (Disclaimer), 15 (Limitation of Liability), 17 (Governing
            Law), and 18 (Dispute Resolution) survive termination.
          </p>

          <h2>14. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
            EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, PROOF
            DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR
            A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. PROOF DOES NOT WARRANT THAT THE SERVICE
            WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS, OR THAT VERIFIED
            EFFORT CALCULATIONS, REWARD ISSUANCE, OR DATA TRANSMISSION TO BRANDS OR FITNESS
            PLATFORMS WILL BE ACCURATE OR TIMELY IN EVERY INSTANCE.
          </p>

          <h2>15. Limitation of Liability</h2>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, PROOF AND ITS OFFICERS, EMPLOYEES, AGENTS, AND
            AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
            EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUES, DATA, BUSINESS,
            OR GOODWILL, ARISING FROM OR RELATED TO YOUR USE OF THE SERVICE.
          </p>
          <p>
            PROOF'S TOTAL CUMULATIVE LIABILITY ARISING FROM OR RELATED TO THESE TERMS OR THE
            SERVICE SHALL NOT EXCEED THE GREATER OF (a) THE AMOUNTS PAID BY YOU TO PROOF IN THE
            TWELVE MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR (b) ONE HUNDRED U.S.
            DOLLARS ($100).
          </p>
          <p>
            Some jurisdictions do not allow the exclusion or limitation of certain damages; in
            such jurisdictions, our liability is limited to the maximum extent permitted by law.
          </p>

          <h2>16. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless PROOF and its officers, employees,
            and agents from any claims, damages, liabilities, costs, or expenses (including
            reasonable attorneys' fees) arising from your use of the Service, your violation of
            these Terms, your violation of any third-party right (including any connected platform
            or brand program rules), or — for brands — claims arising from the operation of your
            loyalty program.
          </p>

          <h2>17. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of California, United States, without
            regard to its conflict of laws principles. The federal and state courts located in San
            Francisco County, California shall have exclusive jurisdiction over any dispute arising
            from these Terms or your use of the Service, except as provided in Section 18.
          </p>

          <h2>18. Dispute Resolution</h2>
          <p>
            Before filing any legal action, you agree to first contact us at{" "}
            <a href="mailto:team@verifiedeffort.com">team@verifiedeffort.com</a> to attempt
            informal resolution. Most disputes can be resolved through good-faith communication.
          </p>
          <p>
            If informal resolution fails, any dispute, claim, or controversy arising out of or
            relating to these Terms or the Service shall be resolved through binding individual
            arbitration administered by the American Arbitration Association ("AAA") under its
            Commercial Arbitration Rules, in San Francisco, California. Each party shall bear its
            own attorneys' fees and costs unless the arbitrator awards them otherwise. THE PARTIES
            WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION.
          </p>
          <p>
            Notwithstanding the above, either party may bring an individual action in small claims
            court for disputes within that court's jurisdiction, and either party may seek
            injunctive relief in court for misuse of intellectual property.
          </p>

          <h2>19. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. If we make material changes, we will
            notify you by email or by posting a notice on the Service prior to the change becoming
            effective. The "Effective date" at the top of this page indicates when the Terms were
            last revised. Your continued use of the Service after changes are posted constitutes
            your acceptance of the updated Terms.
          </p>

          <h2>20. Miscellaneous</h2>
          <p>
            These Terms, together with our{" "}
            <a href="/privacy">Privacy Policy</a>, constitute the entire agreement between you and
            PROOF concerning the Service. If any provision is held unenforceable, the remaining
            provisions remain in full force. Our failure to enforce any right or provision is not
            a waiver of that right or provision. You may not assign or transfer these Terms or
            your account without our prior written consent; we may assign them in connection with
            a merger, acquisition, or sale of assets.
          </p>

          <h2>21. Contact Us</h2>
          <p>
            Questions about these Terms? Contact us at:
          </p>
          <p>
            PROOF Verified Effort, Inc.<br />
            Email: <a href="mailto:team@verifiedeffort.com">team@verifiedeffort.com</a>
          </p>

          <hr className="divider" />

          <p style={{ color: COLORS.subtle, fontSize: 13 }}>
            These Terms are designed to comply with applicable U.S. consumer-protection,
            intellectual-property, and electronic-contracting laws, and to operate alongside the
            Strava API Agreement and Garmin Connect Developer Program Agreement that govern
            PROOF's connected-platform integrations.
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
