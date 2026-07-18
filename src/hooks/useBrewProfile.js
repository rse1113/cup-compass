// Copyright (c) 2026 Cup Compass. All rights reserved.
//
// Brew Profile state lives in sessionStorage, not a user account — Cup
// Compass returns value with zero sign-up.

import { useCallback, useEffect, useState } from 'react'
import { EMPTY_BREW_PROFILE } from '../data/brewQuizConfig.js'

const STORAGE_KEY = 'cup-compass:brew-profile'

function readStoredProfile() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? { ...EMPTY_BREW_PROFILE, ...JSON.parse(raw) } : EMPTY_BREW_PROFILE
  } catch {
    return EMPTY_BREW_PROFILE
  }
}

export function useBrewProfile() {
  const [profile, setProfile] = useState(readStoredProfile)

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  }, [profile])

  const updateField = useCallback((field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }, [])

  const toggleFlavorNote = useCallback((note) => {
    setProfile((prev) => ({
      ...prev,
      flavorNotes: prev.flavorNotes.includes(note)
        ? prev.flavorNotes.filter((n) => n !== note)
        : [...prev.flavorNotes, note],
    }))
  }, [])

  const toggleCategoryInterest = useCallback((slug) => {
    setProfile((prev) => ({
      ...prev,
      categoryInterest: prev.categoryInterest.includes(slug)
        ? prev.categoryInterest.filter((c) => c !== slug)
        : [...prev.categoryInterest, slug],
    }))
  }, [])

  const reset = useCallback(() => setProfile(EMPTY_BREW_PROFILE), [])

  const isComplete = Boolean(
    profile.roastLevel && profile.brewMethod && profile.budget && profile.purchaseType
  )

  return { profile, updateField, toggleFlavorNote, toggleCategoryInterest, reset, isComplete }
}
