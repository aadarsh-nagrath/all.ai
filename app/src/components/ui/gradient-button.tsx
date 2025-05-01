"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const gradientButtonVariants = cva(
  [
    "gradient-button",
    "inline-flex items-center justify-center",
    "rounded-md px-4 py-2 h-10",
    "text-sm font-medium text-white",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "",
        variant: "gradient-button-variant",
      },
      size: {
        default: "",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(gradientButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
GradientButton.displayName = "GradientButton"

interface SplitGradientButtonProps {
  icon: React.ReactNode
  children: React.ReactNode
  variant?: "default" | "variant"
  className?: string
  onClick?: () => void
}

const SplitGradientButton = React.forwardRef<HTMLDivElement, SplitGradientButtonProps>(
  ({ icon, children, variant = "default", className, onClick, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "gradient-button inline-flex rounded-md overflow-hidden text-white",
          variant === "variant" && "gradient-button-variant",
          className
        )}
        onClick={onClick}
        {...props}
      >
        <div className="flex items-center justify-center h-10 w-10 border-r border-white/20 text-white">
          {icon}
        </div>
        <div className="flex items-center justify-center px-4 py-2 h-10 text-sm font-medium text-white">
          {children}
        </div>
      </div>
    )
  }
)
SplitGradientButton.displayName = "SplitGradientButton"

export { GradientButton, SplitGradientButton, gradientButtonVariants }