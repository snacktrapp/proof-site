"use client";

const dropSteps = ["Join.", "Move.", "Earn credit.", "Use it."];
const ratJoinUrl = "https://proof.verifiedeffort.com/join/run-against-traffic";

export default function RatLanding() {
  return (
    <main className="rat-page">
      <section className="rat-hero">
        <img src="/rat/rat-hero-runner.png" alt="" className="rat-hero-image" />
        <div className="rat-hero-shade" aria-hidden="true" />
        <div className="rat-hero-inner">
          <header className="rat-header">
            <a href="/" aria-label="PROOF home" className="proof-mark">
              Proof Labs // field test
            </a>
            <img src="/rat/rat-main-pink.png" alt="RAT" className="rat-mark" />
          </header>

          <div className="rat-hero-content">
            <div className="rat-poster-lockup">
              <h1>Run Against Traffic</h1>
              <img
                src="/rat/rat-grouped-pink.png"
                alt="Run Against Traffic"
                className="rat-wordmark"
              />
              <div className="rat-tagline-row">
                <p className="rat-tagline">Wrong way. Right reason.</p>
                <p className="rat-meta">
                  Join the RAT Pack. Earn verified RAT credit through real effort. Use it toward
                  the First 50 Foamie.
                </p>
              </div>
              <div className="rat-action-row">
                <a href={ratJoinUrl} className="rat-button rat-button-pink">
                  Join the RAT Pack
                </a>
                <p className="rat-accent-line">Verified by PROOF. Counted for RAT.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rat-drop-section">
        <div className="rat-section-inner">
          <div className="rat-drop-sheet">
            <p className="rat-drop-stamp">Field Issue 001</p>

            <div className="rat-drop-grid">
              <div className="rat-object-stage">
                <img
                  src="/rat/rat-foamie-mockup.png"
                  alt="RAT hot pink Foamie trucker hat mockup"
                  className="rat-product-placeholder"
                />
                <p className="rat-object-tag">Field Object 001 / earned with verified miles</p>
              </div>

              <div className="rat-drop-copy">
                <h2>The First 50 Foamie</h2>
                <p className="rat-drop-lede">
                  The first RAT object is live. Stack verified effort, earn RAT credit, and use it
                  toward the Foamie.
                </p>

                <div className="rat-rule-strip">
                  {dropSteps.map((step, index) => (
                    <div className="rat-rule-row" key={step}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>

                <div className="rat-action-row rat-drop-actions">
                  <a href={ratJoinUrl} className="rat-button rat-button-pink">
                    Join the RAT Pack
                  </a>
                  <p className="rat-meta">No screenshots. No honor system.</p>
                </div>
              </div>
            </div>

            <div className="rat-drop-noise" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="rat-manifesto-strip">
        <div className="rat-manifesto-inner">
          <div className="rat-manifesto-mark">
            <img src="/rat/rat-main-pink.png" alt="RAT" className="rat-footer-wordmark" />
          </div>

          <div className="rat-manifesto-copy">
            <p>For the early, the stubborn, the half-sure, and the still-going.</p>
            <p>Maybe the wrong way. Always the right reason.</p>
            <p className="rat-house-line">Welcome to the RAT House.</p>
          </div>

          <a href={ratJoinUrl} className="rat-button rat-button-ghost">
            Join the RAT Pack
          </a>
        </div>
      </section>

      <footer className="rat-footer">
        <div className="rat-footer-inner">
          <p>Proof Labs // field test</p>
          <p>Proof verifies. RAT counts.</p>
        </div>
      </footer>

      <style jsx>{`
        .rat-page {
          --rat-pink: #ff2fa3;
          min-height: 100vh;
          overflow: hidden;
          background: #050505;
          color: white;
          font-family: "JetBrains Mono", monospace;
          font-feature-settings:
            "liga" 1,
            "kern" 1;
        }

        .rat-hero {
          position: relative;
          min-height: 96svh;
          overflow: hidden;
          padding: 20px 16px;
        }

        .rat-hero-image {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }

        .rat-hero-shade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0.36) 38%, rgba(0, 0, 0, 0.94) 100%),
            linear-gradient(90deg, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.42) 48%, rgba(0, 0, 0, 0.32) 100%);
        }

        .rat-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.028) 0 1px, transparent 1px 7px),
            radial-gradient(circle at 18% 46%, rgba(255, 47, 163, 0.18), transparent 22%),
            linear-gradient(180deg, transparent 0 68%, rgba(0, 0, 0, 0.48) 100%);
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .rat-hero-inner {
          position: relative;
          z-index: 1;
          display: flex;
          min-height: calc(96svh - 40px);
          max-width: 1280px;
          margin: 0 auto;
          flex-direction: column;
        }

        .rat-header,
        .rat-action-row,
        .rat-footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .proof-mark,
        .rat-meta,
        .rat-accent-line,
        .rat-footer p {
          color: rgba(255, 255, 255, 0.58);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0;
          text-transform: uppercase;
          text-decoration: none;
        }

        .rat-mark {
          width: 56px;
          height: 56px;
          object-fit: contain;
        }

        .rat-hero-content {
          display: flex;
          flex: 1;
          align-items: flex-end;
          padding: 80px 0 56px;
        }

        .rat-poster-lockup {
          position: relative;
          max-width: 860px;
        }

        .rat-poster-lockup h1 {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
        }

        .rat-poster-lockup::before {
          content: "";
          position: absolute;
          left: -9px;
          top: -14px;
          width: 72px;
          height: 5px;
          background: var(--rat-pink);
          transform: rotate(-3deg);
        }

        .rat-wordmark {
          display: block;
          width: 100%;
          max-height: 38svh;
          object-fit: contain;
          object-position: left bottom;
        }

        .rat-tagline-row {
          display: flex;
          flex-wrap: wrap;
          max-width: 680px;
          align-items: center;
          gap: 12px;
          margin-top: 20px;
        }

        .rat-tagline {
          margin: 0;
          border-left: 5px solid var(--rat-pink);
          padding-left: 12px;
          font-size: 16px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .rat-action-row {
          justify-content: flex-start;
          flex-wrap: wrap;
          margin-top: 28px;
        }

        .rat-button {
          display: inline-flex;
          height: 44px;
          width: fit-content;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          border: 1px solid currentColor;
          background: transparent;
          box-shadow: 3px 3px 0 rgba(255, 47, 163, 0.32);
          cursor: pointer;
          font: 900 11px "JetBrains Mono", monospace;
          letter-spacing: 0;
          line-height: 1;
          padding: 0 20px;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            background 0.18s ease,
            color 0.18s ease,
            border-color 0.18s ease;
        }

        .rat-button:hover,
        .rat-button:focus,
        .rat-button:visited {
          text-decoration: none;
        }

        .rat-button-pink {
          border-color: var(--rat-pink);
          color: var(--rat-pink);
        }

        .rat-button-pink:hover {
          background: var(--rat-pink);
          color: #050505;
        }

        .rat-button-ghost {
          border-color: rgba(255, 255, 255, 0.3);
          color: white;
        }

        .rat-button-ghost:hover {
          border-color: var(--rat-pink);
          color: var(--rat-pink);
        }

        .rat-accent-line {
          position: relative;
          margin: 0;
          padding-left: 38px;
        }

        .rat-accent-line::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          width: 23px;
          height: 2px;
          background: var(--rat-pink);
          transform: translateY(-50%);
        }

        .rat-drop-section,
        .rat-manifesto-strip,
        .rat-footer {
          position: relative;
          background: #050505;
          padding: 64px 16px;
        }

        .rat-drop-section {
          border-block: 1px solid rgba(255, 255, 255, 0.1);
        }

        .rat-drop-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.024) 0 1px, transparent 1px 8px),
            radial-gradient(circle at 82% 18%, rgba(255, 47, 163, 0.12), transparent 24%);
          pointer-events: none;
        }

        .rat-section-inner,
        .rat-footer-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        .rat-drop-sheet {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          border-block: 1px solid rgba(255, 255, 255, 0.16);
          padding: 48px 0;
        }

        .rat-drop-sheet::before {
          content: "RAT / RAT / RAT";
          position: absolute;
          right: -6px;
          top: 5px;
          z-index: -1;
          max-width: 144px;
          color: rgba(255, 47, 163, 0.22);
          font-size: 10px;
          font-weight: 900;
          line-height: 1.1;
          transform: rotate(90deg);
          transform-origin: top right;
        }

        .rat-drop-stamp {
          width: fit-content;
          margin: 0;
          border: 1px solid var(--rat-pink);
          box-shadow: 4px 4px 0 rgba(255, 47, 163, 0.22);
          color: var(--rat-pink);
          font-size: 11px;
          font-weight: 900;
          padding: 6px 8px;
          text-transform: uppercase;
        }

        .rat-drop-grid {
          display: grid;
          align-items: end;
          gap: 40px;
          grid-template-columns: minmax(0, 0.7fr) minmax(0, 1fr);
        }

        .rat-object-stage {
          position: relative;
          min-height: 360px;
          overflow: hidden;
        }

        .rat-product-placeholder {
          display: block;
          width: min(74vw, 328px);
          max-height: 368px;
          margin: 16px auto 0 0;
          object-fit: contain;
          filter: drop-shadow(14px 16px 0 rgba(255, 47, 163, 0.22));
          transform: rotate(-2deg);
        }

        .rat-object-tag {
          position: absolute;
          bottom: 0;
          left: 0;
          margin: 0;
          color: rgba(255, 255, 255, 0.5);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .rat-drop-copy h2 {
          max-width: 768px;
          margin: 0;
          font-size: clamp(48px, 7vw, 112px);
          font-weight: 900;
          line-height: 0.92;
          text-transform: uppercase;
        }

        .rat-drop-lede {
          max-width: 576px;
          margin: 20px 0 0;
          color: #d4d4d8;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.7;
          text-transform: uppercase;
        }

        .rat-rule-strip {
          margin-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.18);
        }

        .rat-rule-row {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr);
          gap: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.14);
          padding: 14px 0;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .rat-rule-row span {
          color: var(--rat-pink);
        }

        .rat-rule-row p {
          margin: 0;
        }

        .rat-drop-actions {
          margin-top: 32px;
        }

        .rat-drop-noise {
          position: absolute;
          left: 42%;
          bottom: -8px;
          width: 144px;
          height: 4px;
          background: var(--rat-pink);
          transform: rotate(-2deg);
        }

        .rat-manifesto-strip {
          overflow: hidden;
          padding-block: 80px;
          background:
            radial-gradient(circle at 8% 24%, rgba(255, 47, 163, 0.18), transparent 22%),
            linear-gradient(90deg, rgba(255, 47, 163, 0.1), transparent 28%),
            #050505;
        }

        .rat-manifesto-strip::after {
          content: "";
          position: absolute;
          right: -80px;
          top: 32px;
          width: 224px;
          height: 4px;
          background: rgba(255, 47, 163, 0.78);
          transform: rotate(-18deg);
        }

        .rat-manifesto-inner {
          display: flex;
          max-width: 1024px;
          margin: 0 auto;
          flex-direction: column;
          align-items: flex-start;
          gap: 32px;
        }

        .rat-manifesto-mark {
          position: relative;
          width: fit-content;
        }

        .rat-manifesto-mark::after {
          content: "";
          position: absolute;
          left: 2px;
          bottom: -10px;
          width: 72%;
          height: 4px;
          background: var(--rat-pink);
          transform: rotate(-2deg);
        }

        .rat-footer-wordmark {
          display: block;
          width: min(220px, 48vw);
        }

        .rat-manifesto-copy {
          max-width: 768px;
          font-size: clamp(26px, 3.8vw, 62px);
          font-weight: 900;
          line-height: 1.02;
          text-transform: uppercase;
        }

        .rat-manifesto-copy p {
          margin: 0;
        }

        .rat-manifesto-copy p + p {
          margin-top: 0.55em;
        }

        .rat-house-line {
          max-width: 13ch;
          color: var(--rat-pink);
        }

        .rat-footer {
          padding-block: 28px;
        }

        .rat-footer-inner {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 24px;
        }

        .rat-footer p {
          margin: 0;
          color: rgba(255, 255, 255, 0.36);
          font-size: 10px;
        }

        .rat-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
        }

        .rat-modal-scrim {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.84);
        }

        .rat-access-modal {
          position: relative;
          width: min(100%, 576px);
          max-height: 92svh;
          overflow-y: auto;
          border: 1px solid var(--rat-pink);
          background: #050505;
          box-shadow: 10px 10px 0 rgba(255, 47, 163, 0.32);
          color: white;
          padding: 24px;
        }

        .rat-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }

        .rat-modal-kicker,
        .rat-form span,
        .rat-modal-note {
          margin: 0;
          color: var(--rat-pink);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .rat-modal-header h2 {
          margin: 8px 0 0;
          font-size: 40px;
          font-weight: 900;
          line-height: 1;
          text-transform: uppercase;
        }

        .rat-modal-close {
          display: flex;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: transparent;
          color: white;
          cursor: pointer;
          font: 400 20px "JetBrains Mono", monospace;
        }

        .rat-modal-note {
          margin-top: 16px;
          color: #a1a1aa;
          font-size: 11px;
          line-height: 1.6;
        }

        .rat-success {
          padding: 40px 0;
        }

        .rat-success p {
          margin: 0;
          font-size: 40px;
          font-weight: 900;
          line-height: 1;
          text-transform: uppercase;
        }

        .rat-success span {
          display: block;
          max-width: 520px;
          margin-top: 20px;
          color: #d4d4d8;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.7;
          text-transform: uppercase;
        }

        .rat-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 24px;
        }

        .rat-honeypot {
          position: absolute;
          left: -100vw;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }

        .rat-form-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr 1fr;
        }

        .rat-form label {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .rat-form input,
        .rat-form select,
        .rat-form textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0;
          background: black;
          color: white;
          font: 400 14px "JetBrains Mono", monospace;
          outline: none;
          padding: 12px;
        }

        .rat-form textarea {
          resize: none;
        }

        .rat-form input:focus,
        .rat-form select:focus,
        .rat-form textarea:focus {
          border-color: var(--rat-pink);
        }

        .rat-form textarea::placeholder {
          color: #71717a;
        }

        .rat-select-wrap {
          position: relative;
        }

        .rat-select-wrap::after {
          content: "";
          position: absolute;
          right: 16px;
          top: 50%;
          width: 9px;
          height: 9px;
          border-bottom: 2px solid var(--rat-pink);
          border-right: 2px solid var(--rat-pink);
          pointer-events: none;
          transform: translateY(-65%) rotate(45deg);
        }

        .rat-form select {
          appearance: none;
          color-scheme: dark;
          cursor: pointer;
          padding-right: 44px;
        }

        .rat-form option {
          background: #050505;
          color: white;
        }

        .rat-form em {
          align-self: flex-end;
          color: #71717a;
          font-size: 10px;
          font-style: normal;
        }

        .rat-error {
          border: 1px solid var(--rat-pink);
          background: rgba(255, 47, 163, 0.12);
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 12px 16px;
          text-transform: uppercase;
        }

        .rat-submit {
          width: 100%;
        }

        @media (max-width: 760px) {
          .rat-hero {
            min-height: 92svh;
          }

          .rat-hero-image {
            object-position: 60% center;
          }

          .rat-hero-content {
            padding: 72px 0 44px;
          }

          .rat-wordmark {
            max-height: 30svh;
          }

          .rat-drop-grid,
          .rat-form-grid {
            grid-template-columns: 1fr;
          }

          .rat-product-placeholder {
            margin-inline: auto;
          }
        }

        @media (max-width: 420px) {
          .rat-hero-image {
            object-position: 66% center;
          }

          .rat-action-row,
          .rat-footer-inner {
            align-items: flex-start;
            flex-direction: column;
          }

          .rat-tagline {
            font-size: 14px;
          }
        }
      `}</style>
    </main>
  );
}
