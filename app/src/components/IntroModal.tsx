"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(1)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-[70%] max-h-[80vh] overflow-auto"
      >
        <Card className="relative border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg overflow-hidden bg-background">
          <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 z-10">
            <X size={24} />
          </button>

          <div className="p-4">
            <Progress value={(step / 3) * 100} className="h-1" />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepContent
                key="step1"
                emoji="✨"
                title="Welcome to AI Hub"
                description="Your gateway to multiple AI models in one powerful platform"
              >
                <div className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-300">
                    AI Hub brings together the best AI language models in one place, allowing you to seamlessly switch
                    between different LLMs for your projects.
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium text-lg mb-2">For new users</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Explore our extensive collection of AI models from leading providers including OpenAI, Anthropic,
                      Google, and more - all accessible through a unified interface.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="currentColor"
                          className="text-purple-600 dark:text-purple-400"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 12L11 14L15 10"
                          stroke="currentColor"
                          className="text-purple-600 dark:text-purple-400"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium">Premium Features Included</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">All advanced features unlocked</p>
                    </div>
                  </div>
                </div>
              </StepContent>
            )}

            {step === 2 && (
              <StepContent
                key="step2"
                emoji="🚀"
                title="Powerful Features"
                description="Everything you need for AI-powered creativity"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FeatureCard
                    icon="📚"
                    title="Prompt Library"
                    description="Access hundreds of pre-built prompts or save your own for quick reuse"
                  />
                  <FeatureCard
                    icon="🎨"
                    title="Custom Themes"
                    description="Personalize your workspace with beautiful themes and layouts"
                  />
                  <FeatureCard
                    icon="🔌"
                    title="Plugin Ecosystem"
                    description="Extend functionality with specialized plugins for different tasks"
                  />
                  <FeatureCard
                    icon="🖼️"
                    title="Image Generation"
                    description="Create stunning visuals with integrated image generation models"
                  />
                  <FeatureCard
                    icon="🔍"
                    title="Web Search"
                    description="Get up-to-date information with integrated web search capabilities"
                  />
                  <FeatureCard
                    icon="🤖"
                    title="Multi-Modal Support"
                    description="Work with text, images, audio, and more in a unified interface"
                  />
                </div>
              </StepContent>
            )}

            {step === 3 && (
              <StepContent
                key="step3"
                emoji="🎯"
                title="Get Started Now"
                description="Begin your AI journey with these quick steps"
              >
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Step
                      number={1}
                      title="Choose your AI model"
                      description="Select from our wide range of integrated AI models"
                    />
                    <Step
                      number={2}
                      title="Explore the prompt library"
                      description="Browse pre-built prompts or create your own"
                    />
                    <Step
                      number={3}
                      title="Customize your workspace"
                      description="Set up your perfect environment with themes and plugins"
                    />
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-medium flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                          stroke="currentColor"
                          className="text-gray-600 dark:text-gray-400"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Need help getting started?
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      Our comprehensive documentation and tutorials will guide you through every feature. You can also
                      reach out to our support team directly for assistance.
                    </p>
                    <Button variant="outline" className="mt-4 flex items-center gap-2">
                      View tutorials
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </StepContent>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dontShowAgain"
                checked={dontShowAgain}
                onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
              />
              <label
                htmlFor="dontShowAgain"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Don&apos;t show again
              </label>
            </div>
            <div className="flex gap-2">
              {step > 1 && (
                <Button onClick={handlePrevious} className="gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
              )}
              <Button onClick={handleNext} className="gap-2">
                {step === 3 ? "Get Started" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

interface StepContentProps {
  emoji: string
  title: string
  description: string
  children: React.ReactNode
}

function StepContent({ emoji, title, description, children }: StepContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 pb-0">
        <div className="text-4xl mb-2">{emoji}</div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{description}</p>
      </div>
      <div className="px-6 py-6">{children}</div>
    </motion.div>
  )
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-medium text-lg">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

interface StepProps {
  number: number
  title: string
  description: string
}

function Step({ number, title, description }: StepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 flex items-center justify-center font-medium">
        {number}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  )
} 