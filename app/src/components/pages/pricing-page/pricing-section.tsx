"use client"

import * as React from "react"
import PricingCard from "./pricing-card"
import confetti from "canvas-confetti"
import { PricingTier } from "./pricing-card"

interface PricingSectionProps {
  title: string
  subtitle: string
  tiers?: PricingTier[]
}

export default function PricingSection({
  title,
  subtitle,
  tiers = [],
}: PricingSectionProps) {
  React.useEffect(() => {
    // Trigger confetti on page load
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors: [
        "hsl(var(--primary))",
        "hsl(var(--accent))",
        "hsl(var(--secondary))",
        "hsl(var(--muted))",
      ],
      ticks: 200,
      gravity: 1.2,
      decay: 0.94,
      startVelocity: 30,
      shapes: ["circle"],
    })
  }, [])

  // If tiers are empty, show a fallback UI
  if (!tiers.length) {
    return (
      <section className="flex flex-col items-center gap-10 py-10">
        <div className="space-y-7 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-medium md:text-5xl">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          <p className="text-muted-foreground">No pricing plans available.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col items-center gap-10 py-10">
      <div className="space-y-7 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-medium md:text-5xl">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="grid w-full max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {tiers.map((tier) => (
          <PricingCard
            key={tier.name}
            tier={tier}
          />
        ))}
      </div>
    </section>
  )
}