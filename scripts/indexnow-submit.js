// Copyright (c) 2026 Cup Compass. All rights reserved.
//
// Run after each deploy (`npm run indexnow`) to notify Bing/IndexNow-
// participating search engines that URLs have changed. Requires the key
// file at public/200ae17ae112a88412c4b201017404d5.txt to remain published
// at that exact path on the live site for verification.

const HOST = 'cupcompass.com'
const KEY = '200ae17ae112a88412c4b201017404d5'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`

const URLS = [
  '/',
  '/brew-quiz',
  '/roasters',
  '/equipment',
  '/equipment/coffee-beans-subscriptions',
  '/equipment/espresso-machines',
  '/equipment/drip-pour-over-brewers',
  '/equipment/grinders',
  '/equipment/single-serve-pods-capsules',
  '/guides',
  '/about',
  '/privacy',
  '/terms',
  '/affiliate-disclosure',
].map((path) => `https://${HOST}${path}`)

async function submit() {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: URLS }),
  })

  if (!response.ok) {
    console.error(`IndexNow submission failed: ${response.status} ${await response.text()}`)
    process.exitCode = 1
    return
  }

  console.log(`IndexNow: submitted ${URLS.length} URLs (status ${response.status}).`)
}

submit()
