# Pre-Launch Blockers

Built this session but **not** launch-ready. Do not point real traffic at this until these
are resolved.

## 1. Real product images (hard blocker, per brief)

`src/components/ProductCard.jsx` renders a clearly-labeled "Image pending" placeholder
whenever `product.image_url` is empty. No product currently has a real image because:

- No Amazon PA API credentials were available this session.
- No affiliate network product-feed integration exists yet.
- No brand photography has been sourced.

**Before launch:** wire up one of Amazon PA API / an affiliate network's product feed /
direct brand photography, and populate `products.image_url` for every row. Ship nothing
with the placeholder showing.

## 2. Product & roaster catalog is empty

The Supabase migration (`supabase/migrations/0001_init_schema.sql`) seeds `categories` and
`merchants` only — zero rows in `products` or `roasters`. `/matches`, `/roasters`, and
`/equipment/:category` will all render empty states until real catalog data is loaded.

## 3. Affiliate applications incomplete

See `docs/AFFILIATE_APPLICATIONS.md`. Amazon Associates and Impact (Volcanica, Coffee Bros)
need to be applied for and approved; ShareASale/FlexOffers and direct programs (Bodum,
Black Ink Coffee, MyEspressoShop, Tayst) are explicitly deferred to follow-up. Until a
merchant's `status` is `active` with a real `affiliate_id`, its links route through the
Skimlinks catch-all by design (see `src/lib/linkResolver.js`) — functionally fine, but
commission rates will be lower than the direct-network rates named in the brief.

## 4. Environment variables are placeholders

`.env.example` has no real secrets. Before deploying to Vercel, set in the Vercel project
(not committed to git):
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only, used by `/api/bloom-score.js`)
- `ANTHROPIC_API_KEY` (server-only)
- `VITE_SKIMLINKS_PUBLISHER_ID` (already known: `305387X179359`)

## 5. Supabase migration hasn't been run against a real project

`supabase/migrations/0001_init_schema.sql` exists but has not been applied to any Supabase
instance yet — no project was provisioned this session.

## 6. Legal pages are template boilerplate

Privacy Policy, Terms, and Affiliate Disclosure (`src/pages/Privacy.jsx`, `Terms.jsx`,
`AffiliateDisclosure.jsx`) are standard affiliate-site templates, not reviewed by counsel.
Have a lawyer review before real launch, especially the FTC disclosure language.

## 7. IndexNow key file must stay published

`public/200ae17ae112a88412c4b201017404d5.txt` must remain live at
`https://cupcompass.com/200ae17ae112a88412c4b201017404d5.txt` for `npm run indexnow` to
verify. Don't delete it post-deploy.

## 8. IP clearance not done

See `docs/IP_FLAGS.md` — "Bloom Score," "Find Your Bloom," and the compass/cup logo mark
have not been searched for trademark conflicts.
