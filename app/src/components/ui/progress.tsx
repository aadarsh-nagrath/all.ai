"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800",
          className
        )}
        {...props}
      >
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-all duration-300 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress } 