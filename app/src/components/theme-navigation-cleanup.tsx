"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { removeAllThemes, applyThemeStyle } from "@/themes/styles/registry"

export default function ThemeNavigationCleanup() {
  const pathname = usePathname()

  useEffect(() => {
    const isWorkplace = pathname.includes('/workplace')
    
    if (isWorkplace) {
      // Apply stored theme when on workplace
      try {
        const storedTheme = localStorage.getItem('pluginThemeStyle')
        if (storedTheme && storedTheme !== '1') {
          applyThemeStyle(storedTheme)
        }
      } catch (error) {
        console.error('Error applying stored theme:', error)
      }
    } else {
      // Remove all themes when not on workplace
      removeAllThemes()
    }
  }, [pathname])

  return null // This component doesn't render anything
}
