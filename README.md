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

**Never commit `.env.local` to git.** It's already in `.gitignore`.

---

## Deploy to Vercel

### First time

1. Push this repo to GitHub
2. Go to vercel.com → Add New Project → Import your repo
3. Vercel auto-detects Next.js — click Deploy (no config needed)
4. In your Vercel project → Settings → Environment Variables, add:
   - `KLAVIYO_PRIVATE_API_KEY`
   - `KLAVIYO_LIST_ID`
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
- [ ] Test the waitlist form end-to-end in Vercel preview
- [ ] Add `/public/og-image.png` (1200×630px) for social sharing
- [ ] Confirm domain DNS is propagated
- [ ] Submit sitemap to Google Search Console (Vercel generates `/sitemap.xml` automatically with Next.js 15)

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
│   └── ProofWebsite.tsx    # Main site component
├── public/
│   ├── favicon.svg
│   └── og-image.png        # Add this (1200×630)
├── .env.local.example      # Copy to .env.local
└── next.config.mjs
```
