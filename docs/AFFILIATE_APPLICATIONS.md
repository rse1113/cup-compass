# Affiliate Program Applications

I can't submit these applications for you — each one needs your legal name, business/tax
info (W-9 or equivalent), and payout details, which I don't have and shouldn't fabricate.
This is the checklist for what to do manually, split per the brief: **today** vs.
**follow-up**.

## Today

- [ ] **Skimlinks** — already active (Publisher ID `305387X179359` is wired into
      `.env.example` / `merchants` seed data as the catch-all fallback). Log in at
      skimlinks.com and confirm `cupcompass.com` is added/verified as a site on the account.
- [x] **Amazon Associates** — approved. Tracking ID `cupcompass-20` is live in the
      `merchants` table (`slug = 'amazon'`, `status = 'active'`,
      `network = 'amazon_associates'`) via `supabase/migrations/0002_add_amazon_merchant.sql`.
      Covers grinders, drip machines, and K-cup products. Products sold on Amazon should
      point their `merchant_id` at this row, with the ASIN path (e.g. `dp/B0EXAMPLE`) in
      `merchant_product_path`.
- [ ] **Impact** — apply for Volcanica Coffee (~10%) and Coffee Bros (up to 25%) via
      Impact's partner marketplace. Once approved, update the `volcanica-coffee` and
      `coffee-bros` rows in `merchants`: set `status = 'active'`, fill in `affiliate_id`
      and `tracking_template`.

## Follow-up (not day-of)

- [ ] **ShareASale / FlexOffers** — Tayst and others. `merchants.tayst` row is seeded as
      `deferred`.
- [ ] **Direct programs** — Bodum (6%), Black Ink Coffee (15%), MyEspressoShop (5–7%,
      high-ticket espresso machines). Find each brand's affiliate program page (usually
      linked in their site footer) and apply directly. Rows already seeded in `merchants`
      as `deferred`.

## After each approval

Update the corresponding `merchants` row in Supabase (`status`, `affiliate_id`,
`tracking_template`) — the link resolver (`src/lib/linkResolver.js`) picks up the change
automatically on the next request. No code deploy needed.
