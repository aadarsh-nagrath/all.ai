"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Rocket, Stars, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Shooting Star Animation Component
function ShootingStar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100, y: -100 }}
      animate={{ opacity: [0, 1, 0], x: "100vw", y: "100vh" }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "linear",
      }}
      className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
    />
  );
}

// AI Interface Hero Section
function AIHeroSection() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* Shooting Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <ShootingStar key={i} />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
          >
            <Zap className="h-4 w-4 fill-rose-500/80" />
            <span className="text-sm text-white/60 tracking-wide">
              AI-Powered Interface
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Welcome to the Future
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
                )}
              >
                AI-Driven Solutions
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Harness the power of artificial intelligence to transform your
              digital experiences. Fast, efficient, and innovative.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

// Main Theme Component
export default function ExpTheme() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-[#030303]">
      {/* Hero Section */}
      <AIHeroSection />

      {/* Dashboard Grid */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
          <Rocket className="h-12 w-12 text-white/50" />
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
          <Stars className="h-12 w-12 text-white/50" />
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
          <Zap className="h-12 w-12 text-white/50" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-none p-6">
        <h2 className="text-2xl font-bold text-white/80 mb-4">
          AI Insights Dashboard
        </h2>
        <p className="text-white/50">
          Explore real-time data and insights powered by AI.
        </p>
      </div>
    </div>
  );
}