// Copyright (c) 2026 Cup Compass. All rights reserved.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import linkResolver from './vite-plugin-link-resolver.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), linkResolver()],
})
