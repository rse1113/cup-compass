// Copyright (c) 2026 Cup Compass. All rights reserved.
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  console.warn(
    'Supabase env vars are missing. Copy .env.example to .env.local and fill in VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.'
  )
}

// createClient() throws synchronously on an empty URL, which would crash the
// whole app (every page imports this module) before a Brew Profile is ever
// submitted. Fall back to a syntactically valid placeholder so the app
// renders; real requests will simply fail until real env vars are set.
export const supabase = createClient(url || 'https://placeholder.supabase.co', anonKey || 'placeholder-anon-key')
