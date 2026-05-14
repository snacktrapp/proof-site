export const APP_LOGIN_URL = "https://proof.verifiedeffort.com/auth/login";

export const athleteForwardChromeCss = `
  .proof-chrome-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 40;
    width: 100vw;
    max-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 16px clamp(18px, 4vw, 48px);
    background: linear-gradient(180deg, rgba(5,5,5,0.88), rgba(5,5,5,0));
    color: #ffffff;
  }
  .proof-chrome-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    color: #ffffff;
    text-decoration: none;
  }
  .proof-chrome-logo-mark {
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border: 2px solid currentColor;
    border-radius: 6px;
    font-family: 'Outfit', system-ui, sans-serif;
    font-size: 12px;
    font-weight: 800;
    line-height: 1;
  }
  .proof-chrome-logo-word {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    letter-spacing: 0.12em;
    line-height: 1;
  }
  .proof-chrome-nav-links {
    display: none;
    align-items: center;
    gap: clamp(14px, 2vw, 26px);
    color: rgba(232,232,232,0.76);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .proof-chrome-nav-links a {
    color: inherit;
    text-decoration: none;
  }
  .proof-chrome-nav-links a:hover,
  .proof-chrome-nav-links a[aria-current="page"] {
    color: #C8FF00;
  }
  .proof-chrome-nav-cta {
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 999px;
    padding: 9px 12px;
    background: rgba(5,5,5,0.38);
    backdrop-filter: blur(14px);
    color: #ffffff;
    text-decoration: none;
  }
  .proof-chrome-nav-toggle {
    display: grid;
    position: relative;
    z-index: 2;
    flex: 0 0 auto;
    margin-left: auto;
    width: 42px;
    height: 42px;
    place-items: center;
    border: 1px solid rgba(255,255,255,0.34);
    border-radius: 999px;
    background: rgba(5,5,5,0.62);
    color: #ffffff;
    cursor: pointer;
    box-shadow: 0 14px 34px rgba(0,0,0,0.32);
    backdrop-filter: blur(14px);
  }
  .proof-chrome-nav-toggle-lines {
    display: grid;
    gap: 5px;
    width: 17px;
  }
  .proof-chrome-nav-toggle-lines span {
    display: block;
    height: 2px;
    border-radius: 999px;
    background: currentColor;
  }
  .proof-chrome-mobile-menu {
    position: fixed;
    top: 70px;
    right: clamp(18px, 4vw, 48px);
    z-index: 50;
    display: grid;
    gap: 4px;
    width: min(320px, calc(100vw - 36px));
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 16px;
    background: rgba(5,5,5,0.92);
    padding: 10px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.42);
    backdrop-filter: blur(18px);
  }
  .proof-chrome-mobile-menu a {
    border-radius: 10px;
    padding: 13px 12px;
    color: rgba(232,232,232,0.82);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
  }
  .proof-chrome-mobile-menu a:hover,
  .proof-chrome-mobile-menu a:focus-visible,
  .proof-chrome-mobile-menu a[aria-current="page"] {
    background: rgba(255,255,255,0.06);
    color: #C8FF00;
  }
  .proof-chrome-mobile-menu .proof-chrome-mobile-menu-cta {
    margin-top: 4px;
    background: #C8FF00;
    color: #050505;
    font-weight: 800;
    text-align: center;
  }

  @media (min-width: 940px) {
    .proof-chrome-nav-links { display: flex; }
    .proof-chrome-nav-toggle { display: none; }
  }

  @media (max-width: 640px) {
    .proof-chrome-nav { padding: 16px 18px; }
    .proof-chrome-nav-toggle {
      position: fixed;
      top: 16px;
      left: min(330px, calc(100vw - 60px));
      right: auto;
    }
    .proof-chrome-mobile-menu {
      left: 18px;
      right: 18px;
      width: auto;
    }
    .proof-chrome-logo-word { font-size: 22px; }
  }
`;
