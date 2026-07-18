// Copyright (c) 2026 Cup Compass. All rights reserved.

export const ROAST_LEVELS = [
  { value: 'light', label: 'Light' },
  { value: 'medium', label: 'Medium' },
  { value: 'medium-dark', label: 'Medium-Dark' },
  { value: 'dark', label: 'Dark' },
  { value: 'no-preference', label: 'No Preference' },
]

export const BREW_METHODS = [
  { value: 'espresso', label: 'Espresso' },
  { value: 'pour-over', label: 'Pour-Over' },
  { value: 'drip', label: 'Drip' },
  { value: 'french-press', label: 'French Press' },
  { value: 'cold-brew', label: 'Cold Brew' },
  { value: 'single-serve', label: 'Single-Serve / Pods' },
]

export const FLAVOR_NOTES = [
  'Fruity',
  'Chocolatey',
  'Nutty',
  'Floral',
  'Spiced',
  'Caramel',
  'Citrus',
  'Berry',
  'Earthy',
  'Smoky',
]

export const BUDGET_RANGES = [
  { value: 'under-15', label: 'Under $15' },
  { value: '15-25', label: '$15 – $25' },
  { value: '25-40', label: '$25 – $40' },
  { value: '40-plus', label: '$40+' },
]

export const PURCHASE_TYPES = [
  { value: 'one-time', label: 'One-Time Purchase' },
  { value: 'subscription', label: 'Subscription' },
  { value: 'either', label: 'Either Works' },
]

export const CATEGORY_INTEREST = [
  { value: 'coffee-beans-subscriptions', label: 'Coffee Beans & Subscriptions' },
  { value: 'espresso-machines', label: 'Espresso Machines' },
  { value: 'drip-pour-over-brewers', label: 'Drip & Pour-Over Brewers' },
  { value: 'grinders', label: 'Grinders' },
  { value: 'single-serve-pods-capsules', label: 'Single-Serve Pods & Capsules' },
]

export const EMPTY_BREW_PROFILE = {
  roastLevel: '',
  brewMethod: '',
  flavorNotes: [],
  budget: '',
  purchaseType: '',
  categoryInterest: ['coffee-beans-subscriptions'],
}
