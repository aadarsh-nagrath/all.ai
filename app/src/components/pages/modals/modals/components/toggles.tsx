"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const MinimalToggle = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          ref={ref}
          className="peer sr-only"
          {...props}
        />
        <div className={cn(
          "h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px]",
          "after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-md",
          "after:transition-all after:content-[''] peer-checked:bg-green-500",
          "peer-checked:after:translate-x-full peer-checked:after:border-white",
          "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300",
          "dark:bg-gray-700 dark:peer-focus:ring-green-800",
          "transition-colors duration-200 ease-in-out",
          className
        )} />
      </label>
    )
  }
)
MinimalToggle.displayName = "MinimalToggle"

const OrangeToggle = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          "ease before:ease relative h-6 w-12 appearance-none rounded-full bg-stone-300",
          "transition duration-300",
          "before:absolute before:left-[calc(1.5em_-_1.6em)] before:top-[calc(1.5em_-_1.6em)]",
          "before:block before:h-[1.7em] before:w-[1.6em] before:cursor-pointer",
          "before:rounded-full before:border before:border-solid before:border-stone-400",
          "before:bg-white before:transition-all before:duration-300 before:content-['']",
          "checked:bg-orange-600 checked:before:translate-x-full checked:before:border-orange-500",
          "hover:before:shadow-[0_0_0px_8px_rgba(0,0,0,0.15)]",
          "checked:hover:before:shadow-[0_0_0px_8px_rgba(236,72,72,0.15)]",
          className
        )}
        {...props}
      />
    )
  }
)
OrangeToggle.displayName = "OrangeToggle"

export { MinimalToggle, OrangeToggle } 