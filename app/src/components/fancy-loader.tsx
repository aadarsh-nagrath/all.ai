"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FancyLoaderProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export default function Component({ size = "md", className }: FancyLoaderProps = {}) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40",
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={cn("relative", sizeClasses[size], className)}>
        {/* Outer rotating gradient ring */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-80"
          style={{
            background: "conic-gradient(from 0deg, transparent, #8b5cf6, #ec4899, #06b6d4, #10b981, transparent)",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Middle counter-rotating ring */}
        <motion.div
          className="absolute inset-1 rounded-full opacity-60"
          style={{
            background: "conic-gradient(from 180deg, transparent, #f59e0b, #ef4444, #8b5cf6, transparent)",
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Inner mask to create ring effect */}
        <div className="absolute inset-3 rounded-full bg-white" />

        {/* Pulsing center core with gradient */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Orbiting dots - first layer */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={`orbit1-${i}`}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
            style={{
              background: ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981"][i],
            }}
            animate={{
              x: [0, Math.cos((i * 90 * Math.PI) / 180) * 50],
              y: [0, Math.sin((i * 90 * Math.PI) / 180) * 50],
              scale: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Orbiting dots - second layer */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`orbit2-${i}`}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
            style={{
              background: ["#f59e0b", "#ef4444", "#8b5cf6"][i],
            }}
            animate={{
              x: [0, Math.cos(((i * 120 + 60) * Math.PI) / 180) * 35],
              y: [0, Math.sin(((i * 120 + 60) * Math.PI) / 180) * 35],
              scale: [0, 1.2, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating particles */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-white opacity-60"
            animate={{
              x: [0, Math.cos((i * 45 * Math.PI) / 180) * 25, Math.cos((i * 45 * Math.PI) / 180) * 45, 0],
              y: [0, Math.sin((i * 45 * Math.PI) / 180) * 25, Math.sin((i * 45 * Math.PI) / 180) * 45, 0],
              scale: [0, 0.5, 1, 0],
              opacity: [0, 0.6, 0.3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Breathing glow layers */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-cyan-500/30 blur-xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-lg"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Spinning accent rings */}
        <motion.div
          className="absolute inset-0 rounded-full border border-purple-300/40"
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />

        <motion.div
          className="absolute inset-1 rounded-full border border-pink-300/30"
          animate={{
            rotate: -360,
            scale: [1, 1.03, 1],
          }}
          transition={{
            rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />

        {/* Morphing shapes around the loader */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={`morph-${i}`}
            className="absolute top-1/2 left-1/2 w-1 h-3 bg-gradient-to-t from-transparent via-white to-transparent opacity-40"
            style={{
              transformOrigin: "bottom center",
            }}
            animate={{
              rotate: [i * 60, i * 60 + 360],
              scaleY: [0.5, 1.5, 0.8, 1.2, 0.5],
              opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Tiny bubbles floating around the circle */}
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute top-1/2 left-1/2 w-0.5 h-0.5 rounded-full bg-white/60"
            animate={{
              x: [
                0,
                Math.cos((i * 18 * Math.PI) / 180) * (30 + Math.random() * 20),
                Math.cos((i * 18 * Math.PI) / 180) * (50 + Math.random() * 30),
                Math.cos((i * 18 * Math.PI) / 180) * (70 + Math.random() * 20),
              ],
              y: [
                0,
                Math.sin((i * 18 * Math.PI) / 180) * (30 + Math.random() * 20),
                Math.sin((i * 18 * Math.PI) / 180) * (50 + Math.random() * 30),
                Math.sin((i * 18 * Math.PI) / 180) * (70 + Math.random() * 20),
              ],
              scale: [0, 0.5, 1, 0],
              opacity: [0, 0.8, 0.4, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.1 + Math.random() * 0.5,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Medium bubbles with different colors */}
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={`medium-bubble-${i}`}
            className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full"
            style={{
              background: [
                "rgba(139, 92, 246, 0.4)",
                "rgba(236, 72, 153, 0.4)",
                "rgba(6, 182, 212, 0.4)",
                "rgba(16, 185, 129, 0.4)",
              ][i % 4],
            }}
            animate={{
              x: [
                0,
                Math.cos((i * 30 * Math.PI) / 180) * (25 + Math.random() * 15),
                Math.cos((i * 30 * Math.PI) / 180) * (45 + Math.random() * 25),
                Math.cos((i * 30 * Math.PI) / 180) * (65 + Math.random() * 15),
              ],
              y: [
                0,
                Math.sin((i * 30 * Math.PI) / 180) * (25 + Math.random() * 15),
                Math.sin((i * 30 * Math.PI) / 180) * (45 + Math.random() * 25),
                Math.sin((i * 30 * Math.PI) / 180) * (65 + Math.random() * 15),
              ],
              scale: [0, 0.8, 1.2, 0],
              opacity: [0, 0.6, 0.3, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.15 + Math.random() * 0.3,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Large floating bubbles */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`large-bubble-${i}`}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full border border-white/30 bg-white/10"
            animate={{
              x: [
                0,
                Math.cos((i * 60 * Math.PI) / 180) * (35 + Math.random() * 20),
                Math.cos((i * 60 * Math.PI) / 180) * (55 + Math.random() * 30),
              ],
              y: [
                0,
                Math.sin((i * 60 * Math.PI) / 180) * (35 + Math.random() * 20),
                Math.sin((i * 60 * Math.PI) / 180) * (55 + Math.random() * 30),
              ],
              scale: [0, 1, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3 + Math.random() * 0.8,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Loading text with enhanced animation */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="text-gray-600 font-medium tracking-wide text-sm"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            Loading
            <motion.span
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.5,
              }}
            >
              ...
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
