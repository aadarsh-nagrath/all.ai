// app/theme-selection/page.tsx
"use client";

import React, { useRef, useState } from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Stepper, StepperItem, StepperTrigger, StepperIndicator, StepperTitle } from "@/components/ui/stepper";
import { cn } from "@/lib/utils";

// Theme data
const themes = [
  {
    title: "Dark & Moody",
    description:
      "A sleek, modern theme with dark tones. Perfect for a professional and elegant look.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--slate-900),var(--black)] flex items-center justify-center text-white">
        Dark & Moody
      </div>
    ),
  },
  {
    title: "Light & Airy",
    description:
      "A clean, minimalist theme with light tones. Ideal for a fresh and modern design.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--white),var(--gray-100)] flex items-center justify-center text-black">
        Light & Airy
      </div>
    ),
  },
  {
    title: "Sunset Vibes",
    description:
      "A warm, vibrant theme inspired by sunsets. Great for a lively and energetic vibe.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Sunset Vibes
      </div>
    ),
  },
  {
    title: "Ocean Breeze",
    description:
      "A calming theme inspired by the ocean. Perfect for a serene and refreshing feel.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--blue-500))] flex items-center justify-center text-white">
        Ocean Breeze
      </div>
    ),
  },
  {
    title: "Neon Dreams",
    description:
      "A bold, futuristic theme with neon colors. Ideal for a cutting-edge and edgy look.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--purple-500),var(--pink-500))] flex items-center justify-center text-white">
        Neon Dreams
      </div>
    ),
  },
];

export default function ThemeSelectionPage() {
  const stickyScrollRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState(0);

  const handleStepClick = (index: number) => {
    setActiveCard(index);
  };

  const handleApplyTheme = (index: number) => {
    setActiveTheme(index);
    // Add logic to apply the theme globally
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Stepper */}
      <div className="w-64 border-r p-6 bg-muted/50">
        <Stepper orientation="vertical">
          {themes.map((theme, index) => (
            <StepperItem key={index} step={index}>
              <StepperTrigger
                onClick={() => handleStepClick(index)}
                className="w-full justify-start mb-4" // Add space between stepper items
              >
                <StepperIndicator
                  className={cn(
                    "border-2 flex items-center justify-center",
                    activeCard === index && index !== 0 // Only apply white background if activeCard matches and it's not the first stepper
                      ? "bg-white text-black" // Active theme: white background, black text
                      : activeTheme === index
                      ? "bg-orange-500 text-white" // Applied theme: orange background, white text
                      : "bg-muted text-muted-foreground" // Inactive theme: muted background
                  )}
                >
                  {index + 1}
                </StepperIndicator>
                <StepperTitle>{theme.title}</StepperTitle>
              </StepperTrigger>
            </StepperItem>
          ))}
        </Stepper>
      </div>

      {/* Sticky Scroll */}
      <div
        className="flex-1 overflow-y-auto hide-scrollbar"
        ref={stickyScrollRef}
      >
        <StickyScroll
          content={themes}
          activeTheme={activeTheme}
          onApplyTheme={handleApplyTheme}
          activeCard={activeCard}
          setActiveCard={setActiveCard}
        />
      </div>
    </div>
  );
}