# PROOF Website

## Local Development

```bash
npm install
cp .env.local.example .env.local
# Fill in your Klaviyo credentials in .env.local
npm run dev
```

Open http://localhost:3000

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Where to find it |
|---|---|
| `KLAVIYO_PRIVATE_API_KEY` | Klaviyo → Account → Settings → API Keys → Create Private API Key (scopes: Lists Read/Write, Profiles Read/Write, Subscriptions Write) |
| `KLAVIYO_LIST_ID` | Klaviyo → Lists & Segments → your list → the alphanumeric ID in the URL |
| `RESEND_API_KEY` | Resend → API Keys → Create API Key |
| `CONTACT_FROM_EMAIL` | A Resend-verified sender, e.g. `PROOF <team@proof.verifiedeffort.com>` |

**Never commit `.env.local` to git.** It's already in `.gitignore`.

---

## Deploy to Vercel

Production public-site deploys are managed from the `proof-site` project in the
**Proof HQ** Vercel organization. The production domains are
`verifiedeffort.com` and `www.verifiedeffort.com`.

### First time

1. Push this repo to GitHub
2. Go to vercel.com → Add New Project → Import your repo
3. Vercel auto-detects Next.js — click Deploy (no config needed)
4. In your Vercel project → Settings → Environment Variables, add:
   - `KLAVIYO_PRIVATE_API_KEY`
   - `KLAVIYO_LIST_ID`
   - `RESEND_API_KEY`
   - `CONTACT_FROM_EMAIL`
5. Go to Settings → Domains → Add your domain (`useproof.co`)
6. Follow Vercel's DNS instructions (add two records at your registrar)

Done. SSL is automatic.

### Subsequent deploys

```bash
git push origin main
```

Vercel deploys automatically on every push to `main`.

---

## Before launch checklist

- [ ] Add `KLAVIYO_PRIVATE_API_KEY` and `KLAVIYO_LIST_ID` to Vercel env vars
- [ ] Add `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` to Vercel env vars for Preview and Production
- [ ] Test the waitlist form end-to-end in Vercel preview
- [ ] Test the contact form end-to-end in Vercel preview
- [ ] Add `/public/og-image.png` (1200×630px) for social sharing
- [ ] Confirm domain DNS is propagated
- [ ] Submit sitemap to Google Search Console (Vercel generates `/sitemap.xml` automatically with Next.js 15)

---

## Operational Notes

- 2026-05-27: `proof-site` was transferred into the **Proof HQ** Vercel organization.
- 2026-05-27: The public `/contact` form was verified in production after adding `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` to Vercel for Production and Preview.
- Resend currently has `proof.verifiedeffort.com` verified, so `CONTACT_FROM_EMAIL` should use that domain. Inquiry emails still deliver to `team@verifiedeffort.com`.
- After changing contact-form environment variables, redeploy Production before testing; existing Vercel deployments do not pick up new env values retroactively.

---

## Project structure

```
proof-site/
├── app/
│   ├── layout.tsx          # Root layout: fonts, OG meta, Analytics
│   ├── page.tsx            # Home page
│   └── api/
│       └── waitlist/
│           └── route.ts    # POST /api/waitlist → Klaviyo
├── components/
│   ├── AthleteForwardConcept.tsx
│   ├── AthleteForwardConceptPages.tsx
│   ├── AthleteForwardFooter.tsx
│   ├── AthleteForwardHeader.tsx
│   └── ContactPage.tsx
├── public/
│   ├── favicon.svg
│   └── og-image.png        # Add this (1200×630)
├── .env.local.example      # Copy to .env.local
└── next.config.mjs
```
