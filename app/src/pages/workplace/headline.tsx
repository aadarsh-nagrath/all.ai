"use client"

import { LayoutGroup, motion } from "motion/react"
import { TextRotate } from "@/components/ui/text-rotate"
import { useState } from "react"

export default function Headline() {
  // Defineing rotating texts with their corresponding colors
  const textColors: Record<string, string> = {
    "ChatGPT": "#149880",
    "DeepSeek ✽": "#0163f8",
    "Gemini": "hsl(345, 83%, 41%)",
    "Perplexity": "#000000"
  };

  const texts = Object.keys(textColors);

  // Tracking current text for dynamic sizing & color
  const [currentText, setCurrentText] = useState(texts[0]);

  return (
    <div className="text-xl sm:text-2xl md:text-4xl flex flex-row items-center justify-center font-overusedGrotesk dark:text-muted text-foreground font-light overflow-hidden p-1 sm:p-1 md:p-1 max-w-2xl mx-auto">
      <LayoutGroup>
        <div className="flex items-center gap-2">
          <span className="pt-0.5 sm:pt-1 md:pt-2 whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            Searching using
          </span>

          {/* Dynamic block for rotating text */}
          <motion.div
            className="relative inline-flex items-center justify-center rounded-lg px-2 sm:px-2 md:px-3 overflow-hidden py-0.5 sm:py-1 md:py-2"
            style={{ backgroundColor: textColors[currentText] }}
            layout // Enables smooth width animation
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <TextRotate
              texts={texts}
              mainClassName="text-white px-1 sm:px-2 md:px-3"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
              onNext={(index) => setCurrentText(texts[index])}
            />
          </motion.div>
        </div>
      </LayoutGroup>
    </div>
  );
}
