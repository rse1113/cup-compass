-- Copyright (c) 2026 Cup Compass. All rights reserved.
-- Initial schema: categories, roasters, merchants, products, and a Bloom Score cache.
-- No user accounts table — Cup Compass does not require sign-in to get value.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- categories: the 5 fixed equipment/product categories
-- ---------------------------------------------------------------------------
create table categories (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  description   text,
  sort_order    smallint not null default 0
);

insert into categories (slug, name, description, sort_order) values
  ('coffee-beans-subscriptions', 'Coffee Beans & Subscriptions', 'Whole bean, ground, and subscription coffee.', 1),
  ('espresso-machines',          'Espresso Machines',            'Manual, semi-auto, and super-automatic espresso machines.', 2),
  ('drip-pour-over-brewers',     'Drip & Pour-Over Brewers',     'Drip machines, pour-over drippers, and kettles.', 3),
  ('grinders',                   'Grinders',                     'Manual and electric burr grinders.', 4),
  ('single-serve-pods-capsules', 'Single-Serve Pods & Capsules', 'K-cup and capsule-format coffee.', 5);

-- ---------------------------------------------------------------------------
-- roasters: directory of coffee roasters (for /roasters and bean matching)
-- ---------------------------------------------------------------------------
create table roasters (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  name            text not null,
  description     text,
  origin_region   text,
  specialty_tags  text[] not null default '{}',
  logo_url        text,
  website_url     text,
  created_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- merchants: affiliate network mapping. This is the table the link resolver
-- reads from at request time — resolved URLs are NEVER hardcoded in source.
-- ---------------------------------------------------------------------------
create type affiliate_network as enum (
  'skimlinks',
  'impact',
  'amazon_associates',
  'shareasale',
  'flexoffers',
  'direct'
);

create type merchant_status as enum (
  'active',      -- application approved, resolver can generate live links
  'pending',     -- applied, awaiting approval
  'deferred'     -- not yet applied (follow-up, e.g. ShareASale/direct programs)
);

create table merchants (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  name                text not null,
  network             affiliate_network not null,
  status              merchant_status not null default 'deferred',
  base_url            text not null,           -- merchant's canonical site, no tracking params
  tracking_template   text,                     -- e.g. "{base_url}?irclickid={click_id}&irgwc=1" for Impact,
                                                 -- "{base_url}?tag={affiliate_id}" for Amazon Associates
  affiliate_id        text,                     -- network-assigned publisher/tracking id for this merchant
  commission_note     text,                     -- human-readable rate, e.g. "up to 25%"
  notes               text,
  created_at          timestamptz not null default now()
);

-- Seed the merchants named in the affiliate network mapping brief.
-- affiliate_id / tracking_template are left null until applications are approved;
-- the resolver falls back to the Skimlinks catch-all when a merchant has no
-- active direct/network mapping yet.
insert into merchants (slug, name, network, status, base_url, commission_note, notes) values
  ('volcanica-coffee',   'Volcanica Coffee',   'impact',             'pending',  'https://www.volcanicacoffee.com', '~10%',    'Applied via Impact.'),
  ('coffee-bros',        'Coffee Bros',        'impact',             'pending',  'https://coffeebros.com',          'up to 25%', 'Applied via Impact.'),
  ('bodum',               'Bodum',              'direct',             'deferred', 'https://www.bodum.com',           '6%',      'Direct program — follow-up, not day-of.'),
  ('black-ink-coffee',    'Black Ink Coffee',   'direct',             'deferred', 'https://blackinkcoffee.com',      '15%',     'Direct program — follow-up, not day-of.'),
  ('myespressoshop',      'MyEspressoShop',     'direct',             'deferred', 'https://www.myespressoshop.com',  '5-7%',    'High-ticket espresso machines. Direct program — follow-up.'),
  ('tayst',                'Tayst',              'shareasale',         'deferred', 'https://tayst.com',               null,      'Follow-up, not day-of.');

-- Catch-all Skimlinks merchant row used as the resolver's fallback for any
-- product whose specific merchant has no active mapping yet.
insert into merchants (slug, name, network, status, base_url, affiliate_id, notes) values
  ('skimlinks-catchall', 'Skimlinks Catch-All', 'skimlinks', 'active', 'https://go.skimresources.com', '305387X179359', 'Catch-all fallback for all outbound retailer links.');

-- ---------------------------------------------------------------------------
-- products: individual products across the 5 categories
-- ---------------------------------------------------------------------------
create table products (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text not null unique,
  name                  text not null,
  category_id           uuid not null references categories(id),
  roaster_id            uuid references roasters(id),
  merchant_id           uuid not null references merchants(id),
  merchant_product_path text,              -- path/slug appended to merchant base_url for this specific product
  price_cents           integer,
  currency              text not null default 'USD',
  roast_level           text check (roast_level in ('light', 'medium', 'medium-dark', 'dark')),
  flavor_notes          text[] not null default '{}',
  brew_methods          text[] not null default '{}',  -- e.g. {espresso, pour-over, drip, french-press}
  subscription_available boolean not null default false,
  image_url             text,              -- launch blocker: must be real product imagery before go-live
  description           text,
  external_sku          text,
  created_at            timestamptz not null default now()
);

create index products_category_idx on products(category_id);
create index products_merchant_idx on products(merchant_id);
create index products_roaster_idx on products(roaster_id);

-- ---------------------------------------------------------------------------
-- bloom_score_cache: caches Claude API scoring results per (profile, product)
-- so identical Brew Profile submissions don't re-hit the API unnecessarily.
-- Written only by the server-side matching function (service role).
-- ---------------------------------------------------------------------------
create table bloom_score_cache (
  id              uuid primary key default gen_random_uuid(),
  profile_hash    text not null,   -- deterministic hash of the submitted Brew Profile
  product_id      uuid not null references products(id),
  bloom_score     smallint not null check (bloom_score between 0 and 100),
  flavor_match    smallint check (flavor_match between 0 and 100),
  freshness       smallint check (freshness between 0 and 100),
  brew_fit        smallint check (brew_fit between 0 and 100),
  value_score     smallint check (value_score between 0 and 100),
  rationale       text,
  created_at      timestamptz not null default now(),
  unique (profile_hash, product_id)
);

create index bloom_score_cache_profile_idx on bloom_score_cache(profile_hash);

-- ---------------------------------------------------------------------------
-- Row Level Security: public read on catalog data, no client writes.
-- The matching function writes to bloom_score_cache using the service role
-- key (server-side only), which bypasses RLS.
-- ---------------------------------------------------------------------------
alter table categories enable row level security;
alter table roasters enable row level security;
alter table merchants enable row level security;
alter table products enable row level security;
alter table bloom_score_cache enable row level security;

create policy "public read categories" on categories for select using (true);
create policy "public read roasters" on roasters for select using (true);
create policy "public read active merchants" on merchants for select using (true);
create policy "public read products" on products for select using (true);
create policy "public read bloom score cache" on bloom_score_cache for select using (true);
