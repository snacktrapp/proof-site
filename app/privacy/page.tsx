import type { Metadata } from "next";
import { AthleteForwardFooter } from "@/components/AthleteForwardFooter";
import { AthleteForwardHeader } from "@/components/AthleteForwardHeader";
import { athleteForwardChromeCss } from "@/components/athleteForwardChrome";

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
  const effectiveDate = "August 6, 2026";

  return (
    <div style={{ background: COLORS.base, minHeight: "100vh", color: COLORS.text }}>
      <style>{athleteForwardChromeCss}</style>
      <AthleteForwardHeader />

      {/* Content */}
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "120px 24px 80px",
        fontFamily: "'Outfit', sans-serif", fontSize: 15, lineHeight: 1.75, color: COLORS.text }}>

        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 36,
          color: COLORS.textBright, letterSpacing: "0.04em", marginBottom: 8 }}>
          Privacy Policy
        </h1>
        <p style={{ color: COLORS.subtle, fontSize: 14, marginBottom: 48 }}>
          Effective date: {effectiveDate}
        </p>

        <style>{`
          .privacy h2 {
            font-family: 'Outfit', sans-serif;
            font-weight: 700;
            font-size: 20px;
            color: ${COLORS.textBright};
            letter-spacing: 0.03em;
            margin-top: 48px;
            margin-bottom: 16px;
          }
          .privacy h3 {
            font-family: 'Outfit', sans-serif;
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
            and the application at proof.verifiedeffort.com. PROOF is operated by PROOF Verified Effort, Inc.,
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
            When you connect a fitness platform to PROOF (currently Strava; additional integrations
            planned), we receive activity data from that platform through their authorized API.
            We limit the activity data we retain to fields used to verify eligible effort and operate
            the loyalty programs you join. These fields may include:
          </p>
          <ul>
            <li>Activity type (e.g., cycling, running, swimming, walking)</li>
            <li>Distance, moving time, and total elevation gain</li>
            <li>Date and time of activity</li>
            <li>Activity title</li>
            <li>The fitness-platform athlete and activity identifiers needed to maintain the connection and prevent duplicate credit</li>
            <li>PROOF&apos;s verification result and the Points calculated from the activity</li>
          </ul>
          <p>
            We only access data you have explicitly authorized through the OAuth consent flow provided
            by each fitness platform. You can revoke this access at any time (see Section 7).
          </p>
          <p>
            PROOF does not retain GPS routes, heart rate, power, kilojoules, Strava intensity scores,
            activity descriptions, or Strava profile photos for newly processed activities. You can
            review how eligible effort becomes Points on our{" "}
            <a href="/methodology">PROOF methodology page</a>.
          </p>
          <p>
            We retain identifiable activity detail for no more than seven days after the activity.
            After that period, the activity identifier, title, sport, distance, duration, elevation,
            and other connected-platform detail are deleted from PROOF&apos;s active systems. We retain
            only the provider-free loyalty records needed to preserve Points, rewards, and account
            history as described in Section 5.
          </p>

          <h3>2.3 Brand Program Data</h3>
          <p>
            When you join a brand's loyalty program through PROOF, we collect and generate:
          </p>
          <ul>
            <li>Your connection to specific brand programs</li>
            <li>Brand-scoped Points and reward progress for programs you join</li>
            <li>Reward thresholds reached, credits issued, and redemption/support state</li>
            <li>Limited account and communication details needed to operate the program</li>
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
            <li>Verify that athletic activities are real and recorded by the athlete&apos;s fitness device or app</li>
            <li>Convert verified activities into athlete-owned PROOF Miles and brand-scoped Points</li>
            <li>Calculate and maintain your athlete identity, program progress, and reward eligibility</li>
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
            <li>Brand-scoped Points and next-reward progress for that program</li>
            <li>Reward credits issued, available, expired, redeemed, or otherwise needing support</li>
            <li>High-level program support state, such as joined status or connection health</li>
            <li>Your email address (for program communications you have opted into)</li>
          </ul>
          <p>
            Brands do not receive your raw GPS data, raw activity feed, full activity history,
            pace, trend, or data from other brand programs you have joined. Each brand only sees
            loyalty accounting, reward, support, and aggregate program information scoped to its
            own program.
          </p>

          <h3>4.2 With Fitness Platforms</h3>
          <p>
            We do not share your data back to Strava or other connected fitness platforms
            beyond what is required for the API connection to function.
          </p>
          <p>
            Strava may collect and analyze information about your use of PROOF as permitted by
            Strava&apos;s own terms and privacy policy.
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

          <h2>5. Data Retention</h2>
          <p>
            We retain the minimized activity fields described above for no more than seven days after
            the activity. During that period, we use the detail to verify eligible effort, prevent
            duplicate credit, explain your own recent activity, and process activity updates or
            deletions. We do not store full GPS route coordinates.
          </p>
          <p>
            After seven days, PROOF deletes the identifiable activity detail and retains provider-free
            loyalty accounting such as dated Points entries, aggregate lifetime progress, reward and
            Challenge outcomes, and commerce records. Those retained records preserve value already
            earned without retaining the connected-platform athlete ID, activity ID, title, sport,
            route, distance, duration, elevation, or other activity-level performance data.
          </p>
          <p>
            If a connected platform reports an activity update or deletion during the seven-day
            period, PROOF removes the activity detail. Points or rewards already issued from that
            activity may remain so participating brands can honor earned value. To prevent duplicate
            credit, PROOF may retain only the activity identifier until the original seven-day period
            expires; that identifier is not shown to brands or used for marketing.
          </p>
          <p>
            A confirmed disconnect deletes the connected platform&apos;s authorization credentials,
            provider identifiers, and detailed activity records from PROOF&apos;s active systems. Limited
            operational and security logs may remain for their normal short retention period, and
            deleted records may remain temporarily in encrypted backups until those backups expire.
          </p>
          <p>
            Disconnecting does not delete earned loyalty value or completed commerce history. PROOF
            retains provider-free aggregate lifetime progress, brand-scoped Points, Challenge
            outcomes, earned rewards, and purchase or refund records so that brands can honor value
            already earned and maintain necessary financial and support records. These preserved
            records do not include the deleted fitness-platform athlete ID, activity ID, title, date,
            sport, route, distance, duration, elevation, or performance data.
          </p>
          <p>
            If you delete your PROOF account, we will delete personal data within 30 days, except where
            we must retain limited information for legal, fraud-prevention, financial, or security
            obligations. De-identified aggregate data that cannot reasonably identify you may be
            retained for analytics.
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
            You may disconnect any connected fitness platform at any time through the Connections
            page in your PROOF account settings. Using PROOF&apos;s disconnect control lets us confirm
            revocation with the platform and delete the authorization, provider identifiers, and
            detailed activity records described in Section 5.
          </p>
          <p>You may also revoke PROOF&apos;s access directly through the platform&apos;s own settings:</p>
          <ul>
            <li>Strava: Settings → My Apps → PROOF → Revoke Access</li>
          </ul>
          <p>
            Revoking access directly through Strava stops PROOF&apos;s authorization, but the external
            notification may not immediately complete PROOF&apos;s detailed-data cleanup. If you revoke
            through Strava instead of PROOF, contact team@verifiedeffort.com and we will complete the
            deletion. In either case, your aggregate lifetime progress, brand Points, completed
            Challenges, earned rewards, and completed purchases remain. If you reconnect later,
            PROOF starts processing eligible activity from the new authorization forward; it does
            not import activity from before that new authorization, and deleted activity detail is
            not restored.
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
            PROOF Verified Effort, Inc.<br />
            Email: <a href="mailto:team@verifiedeffort.com">team@verifiedeffort.com</a>
          </p>

          <hr className="divider" />

        </div>
      </main>

      <AthleteForwardFooter />
    </div>
  );
}
