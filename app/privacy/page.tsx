import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — PROOF",
  description: "PROOF privacy policy. How we collect, use, and protect your data.",
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

export default function PrivacyPolicy() {
  const effectiveDate = "March 29, 2026";

  return (
    <div style={{ background: COLORS.base, minHeight: "100vh", color: COLORS.text }}>
      {/* Nav bar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(5,5,5,0.92)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${COLORS.rail}` }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, border: `2px solid ${COLORS.textBright}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: COLORS.textBright }}>P</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16,
              color: COLORS.textBright, letterSpacing: "0.12em", textTransform: "uppercase" }}>Proof</span>
          </a>
          <a href="/" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.subtle,
            textDecoration: "none", letterSpacing: "0.02em" }}>
            Back to home
          </a>
        </div>
      </nav>

      {/* Content */}
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "120px 24px 80px",
        fontFamily: "'Outfit', sans-serif", fontSize: 15, lineHeight: 1.75, color: COLORS.text }}>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36,
          color: COLORS.textBright, letterSpacing: "0.04em", marginBottom: 8 }}>
          Privacy Policy
        </h1>
        <p style={{ color: COLORS.subtle, fontSize: 14, marginBottom: 48 }}>
          Effective date: {effectiveDate}
        </p>

        <style>{`
          .privacy h2 {
            font-family: 'Syne', sans-serif;
            font-weight: 700;
            font-size: 20px;
            color: ${COLORS.textBright};
            letter-spacing: 0.03em;
            margin-top: 48px;
            margin-bottom: 16px;
          }
          .privacy h3 {
            font-family: 'Syne', sans-serif;
            font-weight: 600;
            font-size: 16px;
            color: ${COLORS.textBright};
            margin-top: 32px;
            margin-bottom: 12px;
          }
          .privacy p {
            margin-bottom: 16px;
            color: ${COLORS.text};
          }
          .privacy a {
            color: ${COLORS.signal};
            text-decoration: none;
          }
          .privacy a:hover {
            text-decoration: underline;
          }
          .privacy ul {
            margin: 0 0 16px 0;
            padding-left: 24px;
          }
          .privacy li {
            margin-bottom: 8px;
            color: ${COLORS.text};
          }
          .privacy .divider {
            border: none;
            border-top: 1px solid ${COLORS.rail};
            margin: 48px 0;
          }
        `}</style>

        <div className="privacy">

          <h2>1. Who We Are</h2>
          <p>
            PROOF ("we," "us," or "our") operates the verified effort loyalty platform at verifiedeffort.com
            and the application at proof.verifiedeffort.com. PROOF is operated by Proof Technologies, Inc.,
            based in California, United States.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, store, share, and protect your personal
            information when you use our website, platform, and related services (collectively, the "Service").
          </p>

          <h2>2. Information We Collect</h2>

          <h3>2.1 Account Information</h3>
          <p>When you create a PROOF account, we collect:</p>
          <ul>
            <li>Email address</li>
            <li>Name (as provided by you or your connected fitness platform)</li>
            <li>Password (stored in hashed form only)</li>
          </ul>

          <h3>2.2 Fitness Platform Data</h3>
          <p>
            When you connect a fitness platform (such as Strava or Garmin Connect) to PROOF, we receive
            activity data from that platform through their authorized API. This data may include:
          </p>
          <ul>
            <li>Activity type (e.g., cycling, running, swimming, walking)</li>
            <li>Distance, duration, and pace/speed</li>
            <li>GPS route data (used for verification, then discarded — see Section 5)</li>
            <li>Date and time of activity</li>
            <li>Activity title and description</li>
            <li>Heart rate data (if available and relevant to activity verification)</li>
            <li>Your fitness platform profile information (athlete ID, profile name, profile photo URL)</li>
          </ul>
          <p>
            We only access data you have explicitly authorized through the OAuth consent flow provided
            by each fitness platform. You can revoke this access at any time (see Section 7).
          </p>

          <h3>2.3 Brand Program Data</h3>
          <p>
            When you join a brand's loyalty program through PROOF, we collect and generate:
          </p>
          <ul>
            <li>Your connection to specific brand programs</li>
            <li>PROOF miles (PM) earned — our effort-normalized unit</li>
            <li>Your PROOF tier and brand-specific tier</li>
            <li>Reward thresholds reached and discount codes issued</li>
          </ul>

          <h3>2.4 Usage Data</h3>
          <p>
            We automatically collect standard usage data when you interact with the Service, including
            IP address, browser type, device information, pages visited, and referring URL. We use
            Vercel Analytics for aggregated, privacy-friendly website analytics.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Verify that athletic activities are real and GPS-confirmed</li>
            <li>Convert verified activities into PROOF miles using our PROOF Effort Index (PEI)</li>
            <li>Calculate and maintain your PROOF tier and active status</li>
            <li>Credit your effort to brand loyalty programs you have joined</li>
            <li>Generate and deliver rewards (e.g., discount codes) on behalf of brands</li>
            <li>Send you transactional notifications about your account and earned rewards</li>
            <li>Detect and prevent fraudulent activity submissions</li>
            <li>Improve and maintain the Service</li>
          </ul>
          <p>
            We do not use your data for advertising. We do not sell your data. We do not use your
            fitness data to train artificial intelligence or machine learning models.
          </p>

          <h2>4. How We Share Your Information</h2>

          <h3>4.1 With Brands You Join</h3>
          <p>
            When you join a brand's loyalty program through PROOF, that brand receives limited data
            necessary to operate their program:
          </p>
          <ul>
            <li>Your PROOF tier and active status</li>
            <li>Brand-specific PROOF miles earned (only for sports in that brand's allowlist)</li>
            <li>Reward milestones reached</li>
            <li>Your email address (for program communications you have opted into)</li>
          </ul>
          <p>
            Brands do not receive your raw GPS data, your full activity history, or data from other
            brand programs you have joined. Each brand only sees effort relevant to their own program.
          </p>

          <h3>4.2 With Fitness Platforms</h3>
          <p>
            We do not share your data back to Strava, Garmin, or other connected fitness platforms
            beyond what is required for the API connection to function.
          </p>

          <h3>4.3 With Third Parties</h3>
          <p>
            We do not sell, rent, lease, or license your personal data to any third party, including
            advertisers or data brokers. We may share data with service providers who help us operate
            the Service (e.g., hosting, email delivery), but only under strict contractual obligations
            to protect your data and use it solely for providing services to PROOF.
          </p>

          <h3>4.4 Legal Requirements</h3>
          <p>
            We may disclose your information if required to do so by law, court order, or governmental
            regulation, or if we believe in good faith that disclosure is necessary to protect our
            rights, your safety, or the safety of others.
          </p>

          <h2>5. Data Retention and GPS Data</h2>
          <p>
            We retain your account information and PROOF miles history for as long as your account is
            active. Activity records (type, distance, date, verified PM) are retained as part of your
            effort ledger.
          </p>
          <p>
            GPS route data is used during the verification process to confirm that an activity is
            real and GPS-tracked. We do not store full GPS route coordinates long-term. Once
            verification is complete, we retain only the verification result (verified or not) and
            aggregate activity data (distance, sport type, duration).
          </p>
          <p>
            If you delete your account, we will delete your personal data within 30 days, except where
            we are required by law to retain it. Anonymized and aggregated data that cannot be used to
            identify you may be retained for analytics purposes.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information,
            including encryption in transit (TLS/SSL), encrypted storage of sensitive credentials,
            and access controls limiting who can access personal data within our organization. OAuth
            tokens used to connect fitness platforms are stored securely and refreshed according to
            each platform's requirements.
          </p>
          <p>
            No method of transmission over the Internet or electronic storage is 100% secure. While
            we strive to protect your personal information, we cannot guarantee absolute security.
          </p>

          <h2>7. Your Rights and Choices</h2>

          <h3>7.1 Access and Portability</h3>
          <p>
            You may request a copy of the personal data we hold about you by contacting us at
            team@verifiedeffort.com.
          </p>

          <h3>7.2 Correction</h3>
          <p>
            You may update your account information at any time through the Service. If you believe
            any data we hold is inaccurate, contact us and we will correct it.
          </p>

          <h3>7.3 Deletion</h3>
          <p>
            You may delete your PROOF account at any time. Upon deletion, we will remove your personal
            data within 30 days. You may also request deletion of specific data by contacting us at
            team@verifiedeffort.com.
          </p>

          <h3>7.4 Disconnect Fitness Platforms</h3>
          <p>
            You may disconnect Strava, Garmin Connect, or any other connected fitness platform at any
            time through your PROOF account settings. You may also revoke PROOF's access directly
            through your fitness platform's settings:
          </p>
          <ul>
            <li>Strava: Settings → My Apps → PROOF → Revoke Access</li>
            <li>Garmin Connect: Account Settings → Connected Apps → PROOF → Remove</li>
          </ul>
          <p>
            Disconnecting a fitness platform stops new activity data from being sent to PROOF. Activity
            data already verified and credited to your account remains part of your effort history
            unless you request its deletion.
          </p>

          <h3>7.5 Communication Preferences</h3>
          <p>
            You may opt out of promotional emails at any time by clicking the unsubscribe link in any
            email or updating your preferences in your account settings. Transactional emails related
            to your account and earned rewards may still be sent as necessary for the operation of
            the Service.
          </p>

          <h2>8. California Privacy Rights (CCPA/CPRA)</h2>
          <p>
            If you are a California resident, you have the right to:
          </p>
          <ul>
            <li>Know what personal information we collect, use, and disclose about you</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of the sale or sharing of your personal information (we do not sell your data)</li>
            <li>Non-discrimination for exercising your privacy rights</li>
            <li>Correct inaccurate personal information</li>
            <li>Limit use and disclosure of sensitive personal information</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at team@verifiedeffort.com. We will respond
            to verifiable requests within 45 days as required by California law.
          </p>

          <h2>9. International Data Transfers</h2>
          <p>
            PROOF is based in the United States. If you access the Service from outside the United
            States, your data will be transferred to and processed in the United States. By using the
            Service, you consent to this transfer. We take appropriate measures to ensure your data is
            treated securely and in accordance with this Privacy Policy regardless of where it is processed.
          </p>
          <p>
            For users in the European Economic Area (EEA) or United Kingdom, we process data in
            compliance with GDPR requirements, including maintaining appropriate legal bases for
            processing and providing data subject rights as required by Articles 15–22 of the GDPR.
          </p>

          <h2>10. Children's Privacy</h2>
          <p>
            The Service is not directed to individuals under the age of 16. We do not knowingly
            collect personal information from children under 16. If we become aware that we have
            collected personal information from a child under 16, we will take steps to delete that
            information promptly. If you believe a child under 16 has provided us with personal
            information, please contact us at team@verifiedeffort.com.
          </p>

          <h2>11. Third-Party Fitness Platform Terms</h2>
          <p>
            Your use of connected fitness platforms is governed by their respective terms and privacy
            policies. We encourage you to review these:
          </p>
          <ul>
            <li>
              Strava: <a href="https://www.strava.com/legal/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy</a> · <a href="https://www.strava.com/legal/api" target="_blank" rel="noopener noreferrer">
              API Agreement</a>
            </li>
            <li>
              Garmin: <a href="https://www.garmin.com/en-US/privacy/connect/policy/" target="_blank" rel="noopener noreferrer">
              Garmin Connect Privacy Policy</a>
            </li>
          </ul>
          <p>
            PROOF's access to your fitness data is subject to the terms of each platform's API
            agreement. We do not access data beyond the scope of the permissions you grant during
            the OAuth authorization process.
          </p>

          <h2>12. Cookies and Tracking</h2>
          <p>
            The PROOF website uses minimal cookies necessary for the Service to function (such as
            session cookies for authentication). We use Vercel Analytics for aggregated website
            analytics, which does not use cookies or track individual users. We do not use third-party
            advertising cookies or trackers.
          </p>

          <h2>13. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If we make material changes, we will
            notify you by email or by posting a notice on the Service prior to the change becoming
            effective. The "Effective date" at the top of this page indicates when the policy was last
            revised. Your continued use of the Service after changes are posted constitutes your
            acceptance of the updated policy.
          </p>

          <h2>14. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, contact us at:
          </p>
          <p>
            Proof Technologies, Inc.<br />
            Email: <a href="mailto:team@verifiedeffort.com">team@verifiedeffort.com</a>
          </p>

          <hr className="divider" />

          <p style={{ color: COLORS.subtle, fontSize: 13 }}>
            This policy is designed to meet the requirements of the Strava API Agreement, the Garmin
            Connect Developer Program Agreement, the California Consumer Privacy Act (CCPA/CPRA),
            and the General Data Protection Regulation (GDPR).
          </p>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${COLORS.rail}`, padding: "32px 24px",
        textAlign: "center", fontFamily: "'Outfit', sans-serif", fontSize: 13, color: COLORS.muted }}>
        &copy; {new Date().getFullYear()} Proof Technologies, Inc. All rights reserved.
      </footer>
    </div>
  );
}
