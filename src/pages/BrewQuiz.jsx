// Copyright (c) 2026 Cup Compass. All rights reserved.
import { useNavigate } from 'react-router-dom'
import { SEOHead } from '../components/seo/SEOHead.jsx'
import { useBrewProfile } from '../hooks/useBrewProfile.js'
import {
  ROAST_LEVELS,
  BREW_METHODS,
  FLAVOR_NOTES,
  BUDGET_RANGES,
  PURCHASE_TYPES,
  CATEGORY_INTEREST,
} from '../data/brewQuizConfig.js'

function PillGroup({ options, selected, onSelect, multi = false }) {
  const isSelected = (value) => (multi ? selected.includes(value) : selected === value)

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const value = typeof opt === 'string' ? opt : opt.value
        const label = typeof opt === 'string' ? opt : opt.label
        const active = isSelected(value)
        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            aria-pressed={active}
            className={`font-body text-sm px-4 py-2 rounded-full border transition-colors ${
              active
                ? 'bg-copper border-copper text-cream'
                : 'border-cream/20 text-cream/80 hover:border-copper/60'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

function QuizSection({ step, title, children }) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-sm text-copper mb-3">
        {step}. {title}
      </h2>
      {children}
    </section>
  )
}

export function BrewQuiz() {
  const navigate = useNavigate()
  const { profile, updateField, toggleFlavorNote, toggleCategoryInterest, isComplete } =
    useBrewProfile()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isComplete) return
    navigate('/matches')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <SEOHead
        title="Brew Profile Quiz"
        description="Answer a few questions about roast, brew method, flavor notes, and budget — Cup Compass matches you to coffee and gear scored by Bloom Score."
        path="/brew-quiz"
      />
      <p className="font-body text-xs uppercase tracking-[0.2em] text-moss-light mb-2">
        Brew Profile
      </p>
      <h1 className="font-display text-3xl mb-8">Tell us how you brew</h1>

      <form onSubmit={handleSubmit}>
        <QuizSection step={1} title="Roast Level">
          <PillGroup
            options={ROAST_LEVELS}
            selected={profile.roastLevel}
            onSelect={(v) => updateField('roastLevel', v)}
          />
        </QuizSection>

        <QuizSection step={2} title="Brew Method">
          <PillGroup
            options={BREW_METHODS}
            selected={profile.brewMethod}
            onSelect={(v) => updateField('brewMethod', v)}
          />
        </QuizSection>

        <QuizSection step={3} title="Flavor Notes (pick a few)">
          <PillGroup
            options={FLAVOR_NOTES}
            selected={profile.flavorNotes}
            onSelect={toggleFlavorNote}
            multi
          />
        </QuizSection>

        <QuizSection step={4} title="Budget">
          <PillGroup
            options={BUDGET_RANGES}
            selected={profile.budget}
            onSelect={(v) => updateField('budget', v)}
          />
        </QuizSection>

        <QuizSection step={5} title="Purchase Type">
          <PillGroup
            options={PURCHASE_TYPES}
            selected={profile.purchaseType}
            onSelect={(v) => updateField('purchaseType', v)}
          />
        </QuizSection>

        <QuizSection step={6} title="What are you shopping for?">
          <PillGroup
            options={CATEGORY_INTEREST}
            selected={profile.categoryInterest}
            onSelect={toggleCategoryInterest}
            multi
          />
        </QuizSection>

        <button
          type="submit"
          disabled={!isComplete}
          className="font-display uppercase tracking-wide text-sm bg-copper hover:bg-copper-light disabled:opacity-40 disabled:cursor-not-allowed text-cream px-6 py-3 rounded-full transition-colors"
        >
          See My Matches
        </button>
        {!isComplete && (
          <p className="font-body text-xs text-cream/50 mt-3">
            Pick a roast level, brew method, budget, and purchase type to continue.
          </p>
        )}
      </form>
    </div>
  )
}

export default BrewQuiz
