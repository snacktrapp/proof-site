"use client";

import Link from "next/link";
import { useState } from "react";
import { APP_LOGIN_URL } from "./athleteForwardChrome";

type ChromePage = "home" | "how" | "pricing" | "start";

type AthleteForwardHeaderProps = {
  current?: ChromePage;
  ctaHref?: string;
  ctaLabel?: string;
};

const navLinks = [
  { href: "/", label: "Home", page: "home" },
  { href: "/how-it-works", label: "How it works", page: "how" },
  { href: "/pricing", label: "Pricing", page: "pricing" },
  { href: "/#brands", label: "For brands" },
  { href: "/#identity", label: "Athletes" },
] as const;

export function AthleteForwardHeader({
  current,
  ctaHref = "/start",
  ctaLabel = "Get started",
}: AthleteForwardHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkCurrent = (page?: ChromePage) => (page && current === page ? "page" : undefined);

  return (
    <>
      <nav className="proof-chrome-nav" aria-label="PROOF navigation">
        <Link className="proof-chrome-logo" href="/">
          <span className="proof-chrome-logo-mark">P</span>
          <span className="proof-chrome-logo-word">PROOF</span>
        </Link>
        <div className="proof-chrome-nav-links">
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={linkCurrent("page" in link ? link.page : undefined)}
            >
              {link.label}
            </Link>
          ))}
          <a href={APP_LOGIN_URL}>Log in</a>
          <Link
            className="proof-chrome-nav-cta"
            href={ctaHref}
            aria-current={current === "start" ? "page" : undefined}
          >
            {ctaLabel}
          </Link>
        </div>
        <button
          className="proof-chrome-nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="proof-chrome-mobile-menu"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="proof-chrome-nav-toggle-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>
      {menuOpen ? (
        <div className="proof-chrome-mobile-menu" id="proof-chrome-mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={linkCurrent("page" in link ? link.page : undefined)}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a href={APP_LOGIN_URL} onClick={() => setMenuOpen(false)}>
            Log in
          </a>
          <Link
            className="proof-chrome-mobile-menu-cta"
            href={ctaHref}
            aria-current={current === "start" ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {ctaLabel}
          </Link>
        </div>
      ) : null}
    </>
  );
}
