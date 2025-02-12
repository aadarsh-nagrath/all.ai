"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true) // This ensures the theme is only applied on the client side
  }, [])

  if (!mounted) {
    return <>{children}</> // Render nothing on the server side until mounted on the client
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
