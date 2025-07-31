"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DrawerRightProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

const DrawerRight = ({ open, children }: DrawerRightProps) => {
  return (
    <div className={cn(
      "fixed inset-0 z-50",
      open ? "pointer-events-auto" : "pointer-events-none"
    )}>
      {children}
    </div>
  )
}

const DrawerRightOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 transition-opacity duration-300",
      "opacity-0",
      "data-[state=open]:opacity-100",
      className
    )}
    {...props}
  />
))
DrawerRightOverlay.displayName = "DrawerRightOverlay"

const DrawerRightContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed right-0 top-0 z-50 h-full w-[800px] border-l bg-background shadow-lg",
      "transform transition-transform duration-300 ease-in-out",
      "translate-x-full",
      "data-[state=open]:translate-x-0",
      "flex flex-col",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
DrawerRightContent.displayName = "DrawerRightContent"

const DrawerRightHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex-shrink-0 flex flex-col space-y-1.5 p-6 border-b", className)}
    {...props}
  />
)
DrawerRightHeader.displayName = "DrawerRightHeader"

const DrawerRightBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex-1 overflow-y-auto p-6", className)}
    {...props}
  />
)
DrawerRightBody.displayName = "DrawerRightBody"

const DrawerRightFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex-shrink-0 flex flex-col gap-2 p-6 border-t", className)}
    {...props}
  />
)
DrawerRightFooter.displayName = "DrawerRightFooter"

const DrawerRightTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerRightTitle.displayName = "DrawerRightTitle"

const DrawerRightDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerRightDescription.displayName = "DrawerRightDescription"

const DrawerRightClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
      className
    )}
    {...props}
  />
))
DrawerRightClose.displayName = "DrawerRightClose"

export {
  DrawerRight,
  DrawerRightOverlay,
  DrawerRightContent,
  DrawerRightHeader,
  DrawerRightBody,
  DrawerRightFooter,
  DrawerRightTitle,
  DrawerRightDescription,
  DrawerRightClose,
} 