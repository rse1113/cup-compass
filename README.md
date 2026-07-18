# Cup Compass — Find Your Bloom

AI coffee discovery platform. Users complete a Brew Profile intake and get a ranked
shortlist scored by **Bloom Score** (0–100): flavor match, freshness, brew-method fit, and
value. Affiliate-only — not a retailer, no accounts required.

## Stack

- React 19 + Vite, React Router
- Tailwind CSS v4
- Supabase (product/merchant catalog)
- Claude API via a Vercel serverless function (`api/bloom-score.js`) — key stays server-side
- Vercel (deploy)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values, see below
npm run dev
```

## Environment variables

See `.env.example`. `VITE_*` vars are exposed to the client; `ANTHROPIC_API_KEY` and
`SUPABASE_SERVICE_ROLE_KEY` are server-only and must be set as Vercel project env vars
(never committed).

## Database

Run `supabase/migrations/0001_init_schema.sql` against your Supabase project. It creates
`categories`, `roasters`, `merchants`, `products`, and `bloom_score_cache`, and seeds
`categories` + `merchants` (see `docs/AFFILIATE_APPLICATIONS.md` for the merchant list).
`products` and `roasters` still need real catalog data — see `docs/LAUNCH_BLOCKERS.md`.

## Affiliate links

Every outbound link is resolved at request time by `src/lib/linkResolver.js` /
`src/hooks/useLinkResolver.js` from the `merchants` table — never hardcoded. A build-time
Vite plugin (`vite-plugin-link-resolver.js`) fails the build if a retailer domain shows up
literally in source.

## Before you launch

Read `docs/LAUNCH_BLOCKERS.md` first — real product images, catalog data, affiliate
approvals, and env vars are all still outstanding.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run indexnow` — ping IndexNow-participating search engines after a content update
