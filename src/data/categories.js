// Copyright (c) 2026 Cup Compass. All rights reserved.
//
// Mirrors the `categories` seed data in supabase/migrations/0001_init_schema.sql.
// Kept as a static module so nav/routing doesn't need a network round trip.

export const CATEGORIES = [
  {
    slug: 'coffee-beans-subscriptions',
    name: 'Coffee Beans & Subscriptions',
    description: 'Whole bean, ground, and subscription coffee.',
  },
  {
    slug: 'espresso-machines',
    name: 'Espresso Machines',
    description: 'Manual, semi-auto, and super-automatic espresso machines.',
  },
  {
    slug: 'drip-pour-over-brewers',
    name: 'Drip & Pour-Over Brewers',
    description: 'Drip machines, pour-over drippers, and kettles.',
  },
  {
    slug: 'grinders',
    name: 'Grinders',
    description: 'Manual and electric burr grinders.',
  },
  {
    slug: 'single-serve-pods-capsules',
    name: 'Single-Serve Pods & Capsules',
    description: 'K-cup and capsule-format coffee.',
  },
]
