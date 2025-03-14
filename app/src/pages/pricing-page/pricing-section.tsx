"use client"

import * as React from "react"
import PricingCard from "./pricing-card"
import Tab from "./pricing-tab"
import confetti from "canvas-confetti"
import { PricingTier } from "./pricing-card"

interface PricingSectionProps {
  title: string
  subtitle: string
  tiers?: PricingTier[] // Make tiers optional
  frequencies?: string[] // Make frequencies optional
}

export default function PricingSection({
  title,
  subtitle,
  tiers = [], // Default value for tiers
  frequencies = ["monthly", "yearly"], // Default value for frequencies
}: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = React.useState(
    frequencies[0] || "monthly" // Fallback if frequencies[0] is undefined
  )
  const switchRef = React.useRef<HTMLDivElement>(null)

  const handleToggle = (freq: string) => {
    setSelectedFrequency(freq)
    if (freq === "yearly" && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
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
    }
  }

  // If tiers or frequencies are empty, show a fallback UI
  if (!tiers.length || !frequencies.length) {
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
        <div ref={switchRef} className="mx-auto flex w-fit rounded-full bg-muted p-1">
          {frequencies.map((freq) => (
            <Tab
              key={freq}
              text={freq}
              selected={selectedFrequency === freq}
              setSelected={handleToggle}
              discount={freq === "yearly"}
            />
          ))}
        </div>
      </div>

      <div className="grid w-full max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {tiers.map((tier) => (
          <PricingCard
            key={tier.name}
            tier={tier}
            paymentFrequency={selectedFrequency}
          />
        ))}
      </div>
    </section>
  )
}