"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const StickyScroll = ({
  content,
  contentClassName,
  activeTheme,
  onApplyTheme,
  activeCard,
  setActiveCard,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
  activeTheme: number | null;
  onApplyTheme: (index: number) => void;
  activeCard: number;
  setActiveCard: (index: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "rgb(15 23 42)", // slate-900
    "rgb(0 0 0)", // black
    "rgb(23 23 23)", // neutral-900
    "rgb(30 41 59)", // slate-800
    "rgb(17 24 39)", // gray-900
  ];

  const linearGradients = useMemo(() => [
    "linear-gradient(to bottom right, rgb(15 23 42), rgb(0 0 0))", // Dark & Moody
    "linear-gradient(to bottom right, rgb(255 255 255), rgb(243 244 246))", // Light & Airy
    "linear-gradient(to bottom right, rgb(249 115 22), rgb(251 146 60))", // Sunset Vibes
    "linear-gradient(to bottom right, rgb(96 165 250), rgb(59 130 246))", // Ocean Breeze
    "linear-gradient(to bottom right, rgb(168 85 247), rgb(236 72 153))", // Neon Dreams
  ], []);

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard, linearGradients]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-screen overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 hide-scrollbar"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div
              key={item.title + index}
              className="my-20"
              style={{ height: "100vh" }}
            >
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
              <div className="mt-6 flex gap-4">
                <Button variant="outline">Preview</Button>
                <Button
                  variant={activeTheme === index ? "default" : "outline"}
                  onClick={() => onApplyTheme(index)}
                >
                  {activeTheme === index ? "Applied" : "Apply Theme"}
                </Button>
              </div>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};