"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { createContext, useContext, useEffect, useState } from "react"

type CustomTheme = {
  name: string
  bgColor: string
  mainColor: string
  subColor: string
  textColor: string
}

type ThemeContextType = {
  customTheme: CustomTheme | null
  setCustomTheme: (theme: CustomTheme | null) => void
}

const ThemeContext = createContext<ThemeContextType>({
  customTheme: null,
  setCustomTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false)
  const [customTheme, setCustomTheme] = useState<CustomTheme | null>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (customTheme) {
      // Convert hex colors to HSL values
      const bgColor = hexToHsl(customTheme.bgColor)
      const mainColor = hexToHsl(customTheme.mainColor)
      const subColor = hexToHsl(customTheme.subColor)
      const textColor = hexToHsl(customTheme.textColor)

      // Set CSS variables for the custom theme
      document.documentElement.style.setProperty('--background', `${bgColor.h} ${bgColor.s}% ${bgColor.l}%`)
      document.documentElement.style.setProperty('--foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`)
      document.documentElement.style.setProperty('--primary', `${mainColor.h} ${mainColor.s}% ${mainColor.l}%`)
      document.documentElement.style.setProperty('--secondary', `${subColor.h} ${subColor.s}% ${subColor.l}%`)
      
      // Set additional theme variables
      document.documentElement.style.setProperty('--card', `${bgColor.h} ${bgColor.s}% ${bgColor.l}%`)
      document.documentElement.style.setProperty('--card-foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`)
      document.documentElement.style.setProperty('--popover', `${bgColor.h} ${bgColor.s}% ${bgColor.l}%`)
      document.documentElement.style.setProperty('--popover-foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`)
      document.documentElement.style.setProperty('--primary-foreground', `${bgColor.h} ${bgColor.s}% ${bgColor.l}%`)
      document.documentElement.style.setProperty('--secondary-foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`)
      document.documentElement.style.setProperty('--muted', `${subColor.h} ${subColor.s}% ${subColor.l}%`)
      document.documentElement.style.setProperty('--muted-foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`)
      document.documentElement.style.setProperty('--accent', `${subColor.h} ${subColor.s}% ${subColor.l}%`)
      document.documentElement.style.setProperty('--accent-foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`)
      document.documentElement.style.setProperty('--border', `${subColor.h} ${subColor.s}% ${subColor.l}%`)
      document.documentElement.style.setProperty('--input', `${subColor.h} ${subColor.s}% ${subColor.l}%`)
      document.documentElement.style.setProperty('--ring', `${mainColor.h} ${mainColor.s}% ${mainColor.l}%`)

      // Set sidebar theme variables
      document.documentElement.style.setProperty('--sidebar-background', `${subColor.h} ${subColor.s}% ${subColor.l}%`)
      document.documentElement.style.setProperty('--sidebar-foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`)
      document.documentElement.style.setProperty('--sidebar-primary', `${mainColor.h} ${mainColor.s}% ${mainColor.l}%`)
      document.documentElement.style.setProperty('--sidebar-primary-foreground', `${bgColor.h} ${bgColor.s}% ${bgColor.l}%`)
      document.documentElement.style.setProperty('--sidebar-accent', `${subColor.h} ${subColor.s}% ${subColor.l}%`)
      document.documentElement.style.setProperty('--sidebar-accent-foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`)
      document.documentElement.style.setProperty('--sidebar-border', `${subColor.h} ${subColor.s}% ${subColor.l}%`)
      document.documentElement.style.setProperty('--sidebar-ring', `${mainColor.h} ${mainColor.s}% ${mainColor.l}%`)
    }
  }, [customTheme])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ customTheme, setCustomTheme }}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ThemeContext.Provider>
  )
}

// Helper function to convert hex to HSL
function hexToHsl(hex: string) {
  // Remove the hash if it exists
  hex = hex.replace('#', '')
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}
