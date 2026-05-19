"use client";

import { useEffect, useRef, useState } from "react";
import { AthleteForwardHeader } from "./AthleteForwardHeader";
import { athleteForwardChromeCss } from "./athleteForwardChrome";

const COLORS = {
  base: "#050505",
  surface: "#0A0A0A",
  surfaceRaised: "#111111",
  surfaceBorder: "#1A1A1A",
  muted: "#555555",
  subtle: "#888888",
  text: "#E8E8E8",
  textBright: "#FFFFFF",
  signal: "#C8FF00",
  signalDim: "rgba(200,255,0,0.08)",
  signalGlow: "rgba(200,255,0,0.25)",
  steel: "#8BA0B4",
  effort: "#FF3D00",
};

const HERO_IMAGE = "/concepts/athlete-forward/hero-field.jpg";
const HERO_VIDEO_MP4 = "/concepts/athlete-forward/hero-field-loop.mp4?v=2";
const HERO_VIDEO_WEBM = "/concepts/athlete-forward/hero-field-loop.webm";
const APP_REGISTER_BRAND_URL = "https://proof.verifiedeffort.com/auth/register?role=brand";
const APP_REGISTER_ATHLETE_URL = "https://proof.verifiedeffort.com/auth/register?role=athlete";

const css = `
  .af-page, .af-page * { box-sizing: border-box; }
  .af-page {
    min-height: 100vh;
    overflow-x: hidden;
    background: ${COLORS.base};
    color: ${COLORS.text};
    font-family: 'Outfit', system-ui, sans-serif;
  }
  .af-page a { color: inherit; text-decoration: none; }
  .af-page ::selection { background: ${COLORS.signal}; color: ${COLORS.base}; }
  ${athleteForwardChromeCss}

  .af-hero {
    position: relative;
    min-height: 100svh;
    overflow: hidden;
    background: ${COLORS.base};
  }
  .af-canvas,
  .af-panel-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .af-canvas { z-index: 0; }
  .af-hero-image {
    position: absolute;
    inset: 0;
    z-index: 1;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: 0.9;
    filter: grayscale(1) contrast(1.08);
    transform: scale(1.01);
    transition:
      background-image 220ms ease,
      opacity 220ms ease,
      filter 220ms ease;
  }
  .af-hero-video {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    clip-path: inset(50%);
    filter: grayscale(1) contrast(1.08);
    transform: scale(1.01);
    transition: opacity 220ms ease;
  }
  .af-hero-video[data-playing="true"] {
    opacity: 0.9;
    visibility: visible;
    clip-path: none;
  }
  .af-hero-video::-webkit-media-controls,
  .af-hero-video::-webkit-media-controls-panel,
  .af-hero-video::-webkit-media-controls-start-playback-button {
    display: none !important;
    -webkit-appearance: none;
  }
  .af-hero::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background:
      radial-gradient(circle at 68% 34%, rgba(5,5,5,0.04), rgba(5,5,5,0.54) 40%, rgba(5,5,5,0.93) 100%),
      linear-gradient(90deg, rgba(5,5,5,0.84), rgba(5,5,5,0.14) 50%, rgba(5,5,5,0.68)),
      linear-gradient(180deg, rgba(5,5,5,0.38), rgba(5,5,5,0.08) 52%, rgba(5,5,5,0.82));
  }
  .af-noise {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 7px 7px;
    mix-blend-mode: overlay;
    opacity: 0.4;
  }
  .af-hero-content {
    position: relative;
    z-index: 4;
    display: grid;
    min-height: 100svh;
    align-content: end;
    gap: 20px;
    max-width: 1248px;
    margin: 0 auto;
    padding: clamp(116px, 13vh, 152px) clamp(18px, 5vw, 64px) clamp(72px, 9vh, 112px);
  }
  .af-kicker,
  .af-eyebrow,
  .af-mono {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .af-kicker {
    width: fit-content;
    border-left: 2px solid ${COLORS.signal};
    padding-left: 13px;
    color: ${COLORS.signal};
  }
  .af-hero h1,
  .af-section h2,
  .af-final h2 {
    margin: 0;
    color: ${COLORS.textBright};
    font-family: 'Bebas Neue', sans-serif;
    font-weight: 400;
    letter-spacing: 0;
  }
  .af-hero h1 {
    max-width: 860px;
    font-size: clamp(88px, 14vw, 232px);
    line-height: 0.8;
    text-wrap: balance;
  }
  .af-hero-sub {
    max-width: 610px;
    margin: 0;
    color: rgba(232,232,232,0.88);
    font-size: clamp(17px, 1.8vw, 21px);
    line-height: 1.55;
  }
  .af-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 4px;
    max-width: 100%;
  }
  .af-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 10px;
    padding: 13px 17px;
    background: rgba(255,255,255,0.045);
    color: ${COLORS.text};
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-align: center;
    max-width: 100%;
  }
  .af-page a.af-button { color: ${COLORS.text}; }
  .af-button-primary {
    border-color: ${COLORS.signal};
    background: ${COLORS.signal};
    color: ${COLORS.base};
  }
  .af-page a.af-button-primary { color: ${COLORS.base}; }
  .af-button:hover { transform: translateY(-1px); }
  .af-text-link {
    display: inline-flex;
    width: fit-content;
    margin-top: 18px;
    border-bottom: 1px solid currentColor;
    padding-bottom: 3px;
    color: ${COLORS.signal};
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .af-text-link:hover { color: ${COLORS.textBright}; }

  .af-metrics {
    position: absolute;
    right: clamp(18px, 4vw, 48px);
    bottom: clamp(18px, 5vw, 56px);
    z-index: 4;
    display: grid;
    grid-template-columns: repeat(3, minmax(104px, 1fr));
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px;
    background: rgba(5,5,5,0.46);
    backdrop-filter: blur(18px);
  }
  .af-metrics div {
    padding: 16px;
    border-right: 1px solid rgba(255,255,255,0.1);
  }
  .af-metrics div:last-child { border-right: 0; }
  .af-metrics strong {
    display: block;
    color: ${COLORS.signal};
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(16px, 1.8vw, 22px);
    line-height: 1;
  }
  .af-metrics span {
    display: block;
    margin-top: 6px;
    color: ${COLORS.subtle};
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .af-section {
    position: relative;
    overflow: hidden;
    border-top: 1px solid rgba(255,255,255,0.08);
    background: ${COLORS.base};
  }
  .af-section-inner {
    width: min(1216px, calc(100% - 36px));
    margin: 0 auto;
    padding: clamp(72px, 8vw, 112px) 0;
  }
  .af-eyebrow {
    margin-bottom: 13px;
    color: ${COLORS.signal};
  }
  .af-section h2,
  .af-final h2 {
    max-width: 820px;
    font-size: clamp(58px, 8vw, 120px);
    line-height: 0.85;
    text-wrap: balance;
  }
  .af-lede {
    max-width: 680px;
    margin: 20px 0 0;
    color: ${COLORS.subtle};
    font-size: 18px;
    line-height: 1.62;
  }

  .af-strip {
    background:
      linear-gradient(90deg, rgba(200,255,0,0.06), transparent 25%, transparent 70%, rgba(139,160,180,0.09)),
      ${COLORS.surface};
  }
  .af-cred-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.08);
  }
  .af-cred-item {
    min-height: 160px;
    background: rgba(5,5,5,0.68);
    padding: clamp(18px, 3vw, 24px);
  }
  .af-cred-item strong {
    display: block;
    color: ${COLORS.textBright};
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(40px, 5vw, 70px);
    font-weight: 400;
    line-height: 0.86;
  }
  .af-cred-item span {
    display: block;
    max-width: 210px;
    margin-top: 16px;
    color: ${COLORS.subtle};
    font-size: 15px;
    line-height: 1.45;
  }

  .af-split {
    display: grid;
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
    gap: clamp(32px, 6vw, 80px);
    align-items: center;
  }
  .af-panel {
    position: relative;
    min-height: 520px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 18px;
    background: ${COLORS.surfaceRaised};
  }
  .af-panel::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(5,5,5,0.04), rgba(5,5,5,0.78)),
      linear-gradient(90deg, rgba(5,5,5,0.74), transparent 62%);
    pointer-events: none;
  }
  .af-panel-copy {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 20px;
    z-index: 2;
    display: grid;
    gap: 10px;
  }
  .af-panel-copy h3 {
    margin: 0;
    color: ${COLORS.textBright};
    font-size: clamp(22px, 2vw, 29px);
    line-height: 1.15;
  }
  .af-panel-copy p {
    max-width: 480px;
    margin: 0;
    color: ${COLORS.subtle};
    line-height: 1.48;
  }

  .af-signal-row {
    display: grid;
    gap: 14px;
    margin-top: 24px;
  }
  .af-signal-card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 16px;
    align-items: start;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    background: rgba(255,255,255,0.025);
    padding: 16px;
  }
  .af-dot {
    width: 10px;
    height: 10px;
    margin-top: 6px;
    border-radius: 50%;
    background: ${COLORS.signal};
    box-shadow: 0 0 22px rgba(200,255,0,0.22);
  }
  .af-signal-card h3 {
    margin: 0 0 4px;
    color: ${COLORS.textBright};
    font-size: 16px;
  }
  .af-signal-card p {
    margin: 0;
    color: ${COLORS.subtle};
    font-size: 15px;
    line-height: 1.45;
  }

  .af-truth {
    background:
      radial-gradient(circle at 15% 25%, rgba(255,61,0,0.12), transparent 320px),
      linear-gradient(180deg, rgba(5,5,5,0), rgba(139,160,180,0.08) 48%, rgba(5,5,5,0)),
      ${COLORS.base};
  }
  .af-shift-panel {
    position: relative;
    min-height: 390px;
    margin-top: 42px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 18px;
    background: ${COLORS.surfaceRaised};
  }
  .af-shift-panel::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(5,5,5,0.02), rgba(5,5,5,0.68)),
      linear-gradient(90deg, rgba(5,5,5,0.82), rgba(5,5,5,0.42) 50%, rgba(5,5,5,0.74));
    pointer-events: none;
  }
  .af-shift-content {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(18px, 4vw, 46px);
    align-items: end;
    min-height: 390px;
    padding: clamp(20px, 4vw, 38px);
  }
  .af-shift-lane {
    display: grid;
    gap: 13px;
    border-left: 2px solid rgba(139,160,180,0.36);
    background: rgba(5,5,5,0.42);
    padding: 18px 0 18px 18px;
    backdrop-filter: blur(14px);
  }
  .af-shift-lane-active {
    border-left-color: ${COLORS.signal};
    background: rgba(200,255,0,0.07);
  }
  .af-shift-lane .af-mono {
    color: ${COLORS.steel};
  }
  .af-shift-lane-active .af-mono {
    color: ${COLORS.signal};
  }
  .af-shift-lane strong {
    display: block;
    max-width: 360px;
    color: ${COLORS.textBright};
    font-family: 'Bebas Neue', sans-serif;
    font-size: 48px;
    font-weight: 400;
    line-height: 0.88;
  }
  .af-shift-lane p {
    max-width: 370px;
    margin: 0;
    color: ${COLORS.subtle};
    font-size: 15px;
    line-height: 1.5;
  }
  .af-shift-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 5px;
  }
  .af-shift-tags span {
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 999px;
    padding: 6px 9px;
    color: ${COLORS.muted};
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .af-shift-lane-active .af-shift-tags span {
    border-color: rgba(200,255,0,0.34);
    color: ${COLORS.signal};
    background: rgba(200,255,0,0.06);
  }
  .af-truth-grid,
  .af-use-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-top: 36px;
  }
  .af-card {
    min-height: 270px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    background:
      linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015)),
      ${COLORS.surface};
    padding: 20px;
  }
  .af-card .af-mono {
    display: block;
    margin-bottom: 64px;
    color: ${COLORS.steel};
  }
  .af-card h3 {
    margin: 0 0 10px;
    color: ${COLORS.textBright};
    font-size: 20px;
  }
  .af-card p {
    margin: 0;
    color: ${COLORS.subtle};
    line-height: 1.5;
  }

  .af-identity { background: #070707; }
  .af-identity-panel {
    position: relative;
    min-height: 600px;
    margin-top: 40px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 18px;
    background: ${COLORS.surfaceRaised};
  }
  .af-identity-panel::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(5,5,5,0.04), rgba(5,5,5,0.78)),
      linear-gradient(90deg, rgba(5,5,5,0.76), transparent 72%);
    pointer-events: none;
  }
  .af-profile-lines {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: grid;
    align-content: center;
    gap: 16px;
    padding: clamp(18px, 5vw, 64px);
  }
  .af-profile-line {
    display: grid;
    grid-template-columns: minmax(80px, 0.22fr) minmax(0, 1fr) auto;
    gap: 16px;
    align-items: center;
    width: min(760px, 100%);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px;
    background: rgba(5,5,5,0.58);
    backdrop-filter: blur(16px);
    padding: 14px;
  }
  .af-profile-line strong {
    color: ${COLORS.textBright};
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
  }
  .af-profile-line span {
    color: ${COLORS.subtle};
    font-size: 15px;
  }
  .af-profile-line em {
    color: ${COLORS.signal};
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-style: normal;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .af-use-grid .af-card { min-height: 230px; }
  .af-use-grid .af-card .af-mono { margin-bottom: 44px; color: ${COLORS.signal}; }

  .af-final { background: ${COLORS.base}; }
  .af-final-panel {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 18px;
    background: ${COLORS.surfaceRaised};
    padding: clamp(32px, 6vw, 64px);
  }
  .af-final-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(110deg, rgba(200,255,0,0.12), transparent 42%),
      linear-gradient(290deg, rgba(139,160,180,0.12), transparent 48%);
    pointer-events: none;
  }
  .af-final-content {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 32px;
    align-items: end;
  }
  .af-final p {
    max-width: 620px;
    margin: 18px 0 0;
    color: ${COLORS.subtle};
    font-size: 18px;
    line-height: 1.58;
  }

  .af-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 22px clamp(18px, 4vw, 48px);
    color: ${COLORS.muted};
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .af-footer-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 14px;
  }
  .af-footer a:hover { color: ${COLORS.signal}; }

  @media (max-width: 960px) {
    .af-hero-content { align-content: center; padding-bottom: 176px; }
    .af-metrics { left: 18px; right: 18px; grid-template-columns: 1fr 1fr 1fr; }
    .af-cred-grid, .af-truth-grid, .af-use-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .af-split, .af-final-content { grid-template-columns: 1fr; }
    .af-shift-content { grid-template-columns: 1fr; }
    .af-panel { min-height: 460px; }
    .af-identity-panel { min-height: 520px; }
  }

  @media (max-width: 640px) {
    .af-hero-image {
      background-position: 76% center;
      opacity: 0.98;
    }
    .af-hero-video {
      object-position: 76% center;
      opacity: 0.98;
    }
    .af-hero::after {
      background:
        radial-gradient(circle at 82% 40%, rgba(5,5,5,0.02), rgba(5,5,5,0.32) 35%, rgba(5,5,5,0.86) 100%),
        linear-gradient(90deg, rgba(5,5,5,0.92), rgba(5,5,5,0.44) 56%, rgba(5,5,5,0.32)),
        linear-gradient(180deg, rgba(5,5,5,0.28), rgba(5,5,5,0.08) 48%, rgba(5,5,5,0.88));
    }
    .af-hero h1 {
      max-width: 100%;
      font-size: clamp(64px, 18vw, 84px);
      overflow-wrap: break-word;
    }
    .af-hero-content {
      padding-left: 18px;
      padding-right: 18px;
      padding-bottom: 72px;
    }
    .af-hero-sub {
      max-width: 340px;
      font-size: 16px;
      overflow-wrap: break-word;
    }
    .af-actions {
      width: 100%;
      max-width: calc(100vw - 36px);
      align-items: stretch;
      flex-direction: column;
    }
    .af-button { width: 100%; }
    .af-metrics { display: none; }
    .af-cred-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1px;
    }
    .af-cred-item {
      min-height: 128px;
      padding: 14px;
    }
    .af-cred-item strong { font-size: clamp(32px, 11vw, 44px); }
    .af-cred-item span {
      margin-top: 10px;
      font-size: 13px;
      line-height: 1.38;
    }
    .af-shift-panel,
    .af-shift-content { min-height: 0; }
    .af-shift-content {
      padding: 18px;
    }
    .af-shift-lane strong { font-size: 38px; }
    .af-truth-grid, .af-use-grid { grid-template-columns: 1fr; }
    .af-metrics div {
      border-right: 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .af-metrics div:last-child { border-bottom: 0; }
    .af-profile-line { grid-template-columns: 1fr; }
    .af-strip .af-section-inner {
      padding-top: 42px;
      padding-bottom: 42px;
    }
    .af-footer {
      align-items: flex-start;
      flex-direction: column;
    }
    .af-footer-links { justify-content: flex-start; }
  }

  @media (prefers-reduced-motion: reduce) {
    .af-hero-video { display: none; }
  }
`;

function setupCanvas(canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: rect.width, h: rect.height };
}

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function drawMotionBlur(canvas: HTMLCanvasElement) {
  const setup = setupCanvas(canvas);
  if (!setup) return;
  const { ctx, w, h } = setup;
  const random = seededRandom(9631);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#C6C8BD");
  bg.addColorStop(0.32, "#5A625D");
  bg.addColorStop(0.66, "#171918");
  bg.addColorStop(1, "#030303");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.filter = "blur(18px)";
  ctx.globalAlpha = 0.78;
  for (let i = 0; i < 58; i += 1) {
    const x = -w * 0.18 + random() * w * 1.4;
    const y = h * (0.2 + random() * 0.72);
    const len = w * (0.18 + random() * 0.5);
    const weight = 18 + random() * 86;
    ctx.strokeStyle = random() > 0.58 ? "rgba(0,0,0,0.46)" : "rgba(244,241,230,0.13)";
    ctx.lineWidth = weight;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x + len * 0.22,
      y - h * (0.05 + random() * 0.2),
      x + len * 0.7,
      y + h * (0.1 - random() * 0.24),
      x + len,
      y + h * (0.15 - random() * 0.3),
    );
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.filter = "blur(12px)";
  for (let i = 0; i < 14; i += 1) {
    const x = w * (-0.04 + i * 0.085 + (random() - 0.5) * 0.04);
    const y = h * (0.34 + random() * 0.38);
    ctx.fillStyle = i % 4 === 0 ? "rgba(0,0,0,0.68)" : "rgba(10,10,10,0.44)";
    ctx.beginPath();
    ctx.ellipse(
      x,
      y,
      w * (0.025 + random() * 0.05),
      h * (0.15 + random() * 0.1),
      -0.22,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + w * 0.014, y - h * 0.16, w * 0.018, w * 0.018, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = "#F2EFE4";
  ctx.lineWidth = 1;
  for (let y = h * 0.14; y < h; y += 8) {
    ctx.beginPath();
    ctx.moveTo(0, y + Math.sin(y * 0.03) * 12);
    ctx.lineTo(w, y + Math.cos(y * 0.024) * 20);
    ctx.stroke();
  }
  ctx.restore();
}

function drawTrace(canvas: HTMLCanvasElement) {
  const setup = setupCanvas(canvas);
  if (!setup) return;
  const { ctx, w, h } = setup;
  const random = seededRandom(1177);
  ctx.fillStyle = "#070707";
  ctx.fillRect(0, 0, w, h);
  const bg = ctx.createRadialGradient(w * 0.66, h * 0.28, 0, w * 0.66, h * 0.28, w * 0.72);
  bg.addColorStop(0, "rgba(139,160,180,0.24)");
  bg.addColorStop(0.46, "rgba(18,20,20,0.9)");
  bg.addColorStop(1, "rgba(5,5,5,1)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = COLORS.steel;
  ctx.lineWidth = 1;
  for (let i = 0; i < 22; i += 1) {
    const y = h * (0.16 + i * 0.032);
    ctx.beginPath();
    for (let x = 0; x <= w; x += 16) {
      const yy = y + Math.sin(x * 0.013 + i * 0.72) * 22 + Math.cos(x * 0.026) * 8;
      if (x === 0) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.shadowColor = "rgba(200,255,0,0.5)";
  ctx.shadowBlur = 22;
  ctx.strokeStyle = COLORS.signal;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i <= 160; i += 1) {
    const t = i / 160;
    const x = w * (0.08 + t * 0.82);
    const y = h * (0.67 - Math.sin(t * Math.PI * 1.18) * 0.24 + Math.sin(t * 19) * 0.035);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();

  ctx.save();
  for (let i = 0; i < 60; i += 1) {
    ctx.fillStyle = random() > 0.62 ? "rgba(200,255,0,0.46)" : "rgba(139,160,180,0.32)";
    ctx.beginPath();
    ctx.arc(random() * w, random() * h, 1 + random() * 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawShift(canvas: HTMLCanvasElement) {
  const setup = setupCanvas(canvas);
  if (!setup) return;
  const { ctx, w, h } = setup;
  const random = seededRandom(5149);
  ctx.fillStyle = "#060606";
  ctx.fillRect(0, 0, w, h);

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#17100E");
  bg.addColorStop(0.48, "#0B0D0D");
  bg.addColorStop(1, "#141A13");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = "rgba(139,160,180,0.34)";
  ctx.lineWidth = 1;
  for (let x = -w * 0.12; x < w * 1.12; x += 28) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + w * 0.18, h);
    ctx.stroke();
  }
  for (let y = h * 0.12; y < h * 0.94; y += 30) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y + Math.sin(y * 0.02) * 18);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.filter = "blur(18px)";
  for (let i = 0; i < 22; i += 1) {
    const x = random() * w * 0.42;
    const y = h * (0.18 + random() * 0.72);
    ctx.fillStyle = "rgba(255,61,0,0.1)";
    ctx.beginPath();
    ctx.ellipse(x, y, w * (0.04 + random() * 0.1), h * (0.04 + random() * 0.11), 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  ctx.shadowColor = "rgba(200,255,0,0.42)";
  ctx.shadowBlur = 24;
  ctx.strokeStyle = COLORS.signal;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i <= 150; i += 1) {
    const t = i / 150;
    const x = w * (0.12 + t * 0.78);
    const y = h * (0.62 - t * 0.31 + Math.sin(t * Math.PI * 4) * 0.035);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();

  ctx.save();
  for (let i = 0; i < 58; i += 1) {
    const rightSide = random() > 0.35;
    ctx.fillStyle = rightSide ? "rgba(200,255,0,0.5)" : "rgba(139,160,180,0.28)";
    ctx.beginPath();
    ctx.arc(
      w * (rightSide ? 0.48 + random() * 0.45 : 0.08 + random() * 0.34),
      h * (0.12 + random() * 0.74),
      1 + random() * 2.6,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }
  ctx.restore();
}

function drawIdentity(canvas: HTMLCanvasElement) {
  const setup = setupCanvas(canvas);
  if (!setup) return;
  const { ctx, w, h } = setup;
  const random = seededRandom(8128);
  ctx.fillStyle = COLORS.base;
  ctx.fillRect(0, 0, w, h);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#202321");
  bg.addColorStop(0.42, "#0D0F0F");
  bg.addColorStop(1, "#030303");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.filter = "blur(16px)";
  for (let i = 0; i < 44; i += 1) {
    const x = random() * w;
    const y = h * (0.14 + random() * 0.78);
    const len = w * (0.1 + random() * 0.38);
    ctx.strokeStyle = random() > 0.78 ? "rgba(200,255,0,0.18)" : "rgba(232,232,232,0.09)";
    ctx.lineWidth = 16 + random() * 58;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len, y - len * (0.1 + random() * 0.2));
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.strokeStyle = COLORS.steel;
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i += 1) {
    const x = w * (0.08 + i * 0.08);
    ctx.beginPath();
    ctx.moveTo(x, h * 0.12);
    ctx.lineTo(x + w * 0.18, h * 0.92);
    ctx.stroke();
  }
  ctx.restore();
}

function redrawCanvases() {
  document.querySelectorAll<HTMLCanvasElement>("canvas[data-art]").forEach((canvas) => {
    if (canvas.dataset.art === "hero") drawMotionBlur(canvas);
    if (canvas.dataset.art === "trace") drawTrace(canvas);
    if (canvas.dataset.art === "shift") drawShift(canvas);
    if (canvas.dataset.art === "identity") drawIdentity(canvas);
  });
}

export default function AthleteForwardConcept() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(false);

  useEffect(() => {
    redrawCanvases();
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(redrawCanvases, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    let cancelled = false;

    const prepareVideo = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.controls = false;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("x-webkit-airplay", "deny");
      video.removeAttribute("controls");
    };

    const hideVideo = () => {
      if (!cancelled) setHeroVideoPlaying(false);
    };

    const showVideo = () => {
      if (!cancelled) setHeroVideoPlaying(true);
    };

    const playVideo = async () => {
      prepareVideo();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        hideVideo();
        return;
      }

      try {
        await video.play();
        if (!video.paused && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          showVideo();
        }
      } catch {
        hideVideo();
      }
    };
    const handleCanPlay = () => void playVideo();
    const handleVisibilityChange = () => void playVideo();

    prepareVideo();
    void playVideo();

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", showVideo);
    video.addEventListener("pause", hideVideo);
    video.addEventListener("error", hideVideo);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", showVideo);
      video.removeEventListener("pause", hideVideo);
      video.removeEventListener("error", hideVideo);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <main className="af-page">
      <style>{css}</style>

      <AthleteForwardHeader current="home" />

      <header className="af-hero">
        <canvas className="af-canvas" data-art="hero" aria-hidden="true" />
        <div
          className="af-hero-image"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          aria-hidden="true"
        />
        <video
          ref={heroVideoRef}
          className="af-hero-video"
          data-playing={heroVideoPlaying ? "true" : "false"}
          autoPlay
          controls={false}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={(event) => {
            void event.currentTarget.play().catch(() => undefined);
          }}
        >
          <source src={HERO_VIDEO_MP4} type="video/mp4" />
          <source src={HERO_VIDEO_WEBM} type="video/webm" />
        </video>
        <div className="af-noise" />
        <div className="af-hero-content">
          <div className="af-kicker">Verified effort rewards</div>
          <h1>Your effort is worth something.</h1>
          <p className="af-hero-sub">
            PROOF helps athletes turn verified movement into earned rewards, and gives brands
            a cleaner way to recognize the people already living their category.
          </p>
          <div className="af-actions">
            <a className="af-button af-button-primary" href={APP_REGISTER_BRAND_URL}>
              Build a reward program
            </a>
            <a className="af-button" href={APP_REGISTER_ATHLETE_URL}>
              Join as an athlete
            </a>
          </div>
        </div>
        <div className="af-metrics" aria-label="Example verified effort metrics">
          <div>
            <strong>23.4</strong>
            <span>Proof miles</span>
          </div>
          <div>
            <strong>05:42</strong>
            <span>Local start</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Device recorded</span>
          </div>
        </div>
      </header>

      <section className="af-section af-strip" aria-label="PROOF credibility pillars">
        <div className="af-section-inner">
          <div className="af-cred-grid">
            <div className="af-cred-item">
              <strong>Athlete</strong>
              <span>Connect Strava once, keep moving, and earn progress when effort qualifies.</span>
            </div>
            <div className="af-cred-item">
              <strong>Brand</strong>
              <span>Invite the athletes who already train, ride, run, hike, swim, and show up.</span>
            </div>
            <div className="af-cred-item">
              <strong>Verified</strong>
              <span>Device-recorded activities pass sport, distance, date, and integrity checks.</span>
            </div>
            <div className="af-cred-item">
              <strong>Reward</strong>
              <span>Milestones and challenges unlock offers when real effort crosses real thresholds.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="af-section af-truth">
        <div className="af-section-inner">
          <div className="af-eyebrow">The shift</div>
          <h2>The relationship can start with movement.</h2>
          <p className="af-lede">
            Athletes reveal intent before checkout: the miles, rides, swims, hikes, and training
            they already record. PROOF turns that lived behavior into an entry point brands can honor.
          </p>
          <div className="af-shift-panel" aria-label="Purchase-based loyalty compared with verified effort loyalty">
            <canvas className="af-panel-canvas" data-art="shift" aria-hidden="true" />
            <div className="af-shift-content">
              <div className="af-shift-lane">
                <span className="af-mono">Old loyalty signal</span>
                <strong>Purchase first.</strong>
                <p>
                  The relationship waits for checkout, then tries to pull the customer back
                  with points, discounts, or reminders.
                </p>
                <div className="af-shift-tags" aria-hidden="true">
                  <span>Receipt</span>
                  <span>Points</span>
                  <span>Follow-up</span>
                </div>
              </div>
              <div className="af-shift-lane af-shift-lane-active">
                <span className="af-mono">PROOF signal</span>
                <strong>Movement first.</strong>
                <p>
                  A verified activity can start the relationship earlier, with progress that
                  feels earned before a cart ever opens.
                </p>
                <div className="af-shift-tags" aria-hidden="true">
                  <span>Device recorded</span>
                  <span>23.4 PM</span>
                  <span>Brand progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="af-section" id="brands">
        <div className="af-section-inner">
          <div className="af-eyebrow">For brands</div>
          <h2>Acquire the athletes already living your category.</h2>
          <p className="af-lede">
            Traditional loyalty starts after someone buys. PROOF gives brands a way to recognize
            the activity, discipline, and identity that made the customer care in the first place.
          </p>
          <div className="af-use-grid">
            <div className="af-card">
              <span className="af-mono">Acquisition</span>
              <h3>Turn participation into audience</h3>
              <p>Brand join pages invite athletes into a relationship built around what they do.</p>
            </div>
            <div className="af-card">
              <span className="af-mono">Activation</span>
              <h3>Launch moments people can earn</h3>
              <p>Challenges and milestones create reasons to move, return, and share progress.</p>
            </div>
            <div className="af-card">
              <span className="af-mono">Retention</span>
              <h3>Message when effort creates relevance</h3>
              <p>Use PROOF events to trigger rewards, emails, and offers with earned context.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="af-section af-identity" id="identity">
        <div className="af-section-inner">
          <div className="af-eyebrow">For athletes</div>
          <h2>A reason to keep showing up.</h2>
          <p className="af-lede">
            Athletes do not need another points scheme disconnected from the work. PROOF lets
            verified training earn progress, status, and rewards with brands they care about.
          </p>
          <div className="af-identity-panel">
            <canvas className="af-panel-canvas" data-art="identity" aria-hidden="true" />
            <div className="af-profile-lines">
              <div className="af-profile-line">
                <strong>Today</strong>
                <span>Your morning run counted toward a reward you can actually earn</span>
                <em>+18 PM</em>
              </div>
              <div className="af-profile-line">
                <strong>This month</strong>
                <span>See how close you are, with every qualifying activity counted in your local time</span>
                <em>62%</em>
              </div>
              <div className="af-profile-line">
                <strong>Lifetime</strong>
                <span>Build a verified effort record that can travel with you across participating brands</span>
                <em>Earned</em>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="af-section" id="how">
        <div className="af-section-inner af-split">
          <div>
            <div className="af-eyebrow">How it works</div>
            <h2>From Strava activity to brand reward.</h2>
            <p className="af-lede">
              Athletes join through a brand, connect Strava, and PROOF credits eligible effort
              inside the sport, threshold, and local-time window that matter.
            </p>
            <div className="af-signal-row">
              <div className="af-signal-card">
                <span className="af-dot" aria-hidden="true" />
                <div>
                  <h3>Join a brand</h3>
                  <p>A brand invite starts the relationship; Strava makes the effort verifiable.</p>
                </div>
              </div>
              <div className="af-signal-card">
                <span className="af-dot" aria-hidden="true" />
                <div>
                  <h3>Qualify with activity</h3>
                  <p>Runs, rides, swims, hikes, and other sports are checked against the program rules.</p>
                </div>
              </div>
              <div className="af-signal-card">
                <span className="af-dot" aria-hidden="true" />
                <div>
                  <h3>Receive the reward</h3>
                  <p>Milestones, challenges, Shopify codes, and email moments can trigger automatically.</p>
                </div>
              </div>
            </div>
            <a className="af-text-link" href="/how-it-works">
              Read the detailed overview
            </a>
          </div>

          <div className="af-panel">
            <canvas className="af-panel-canvas" data-art="trace" aria-hidden="true" />
            <div className="af-panel-copy">
              <div className="af-mono" style={{ color: COLORS.signal }}>
                Activity processed
              </div>
              <h3>A morning run becomes verified brand progress</h3>
              <p>
                Behind every reward is an auditable record: sport, start time, eligibility, window,
                and PROOF Mile progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="af-section">
        <div className="af-section-inner">
          <div className="af-eyebrow">What brands can build</div>
          <h2>Rewards backed by real effort.</h2>
          <p className="af-lede">
            The experience can feel simple because the mechanics are specific: athlete-local
            windows, sport filters, PROOF Mile thresholds, Shopify rewards, and lifecycle events.
          </p>
          <div className="af-use-grid">
            <div className="af-card">
              <span className="af-mono">Milestones</span>
              <h3>Reward cumulative effort</h3>
              <p>Brand-specific PROOF Mile thresholds unlock progress as athletes keep moving.</p>
            </div>
            <div className="af-card">
              <span className="af-mono">Challenges</span>
              <h3>Create focused windows</h3>
              <p>Fixed, monthly, or rolling windows count the right activities in the athlete's local time.</p>
            </div>
            <div className="af-card">
              <span className="af-mono">Connected rewards</span>
              <h3>Send proof into the stack</h3>
              <p>Shopify, Klaviyo, and webhook events help brands message rewards with context.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="af-section af-final" id="waitlist">
        <div className="af-section-inner">
          <div className="af-final-panel">
            <div className="af-final-content">
              <div>
                <div className="af-eyebrow">PROOF</div>
                <h2>Build loyalty around proof, not guesswork.</h2>
                <p>
                  Invite athletes through movement. Reward them with verified context.
                  Keep the relationship alive after the first earned moment.
                </p>
              </div>
              <div className="af-actions">
                <a className="af-button af-button-primary" href={APP_REGISTER_BRAND_URL}>
                  Start a brand program
                </a>
                <a className="af-button" href="mailto:brian@verifiedeffort.com">
                  Talk to PROOF
                </a>
                <a className="af-button" href="/pricing">
                  View pricing
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="af-footer">
        <span>2026 PROOF Verified Effort, Inc.</span>
        <span className="af-footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/methodology">Methodology</a>
        </span>
      </footer>
    </main>
  );
}
