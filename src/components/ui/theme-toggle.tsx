"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Ensure component is mounted to avoid hydration issues
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Apply animated gradient class to body when in dark mode
  React.useEffect(() => {
    if (mounted) {
      const body = document.body
      const isDarkMode = (theme || resolvedTheme) === "dark"
      
      if (isDarkMode) {
        body.classList.add('animated-gradient')
      } else {
        body.classList.remove('animated-gradient')
      }
    }
  }, [theme, resolvedTheme, mounted])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    )
  }

  const toggleTheme = () => {
    const currentTheme = theme || resolvedTheme || "light"
    const nextTheme = currentTheme === "light" ? "dark" : "light"
    console.log(`Theme changed: ${currentTheme} → ${nextTheme}`)
    setTheme(nextTheme)
  }

  const getIcon = () => {
    const currentTheme = theme || resolvedTheme || "light"
    if (currentTheme === "dark") {
      return <Moon className="h-[1.2rem] w-[1.2rem]" />
    }
    return <Sun className="h-[1.2rem] w-[1.2rem]" />
  }

  const getTooltip = () => {
    const currentTheme = theme || resolvedTheme || "light"
    return currentTheme === "light" ? "Switch to dark mode" : "Switch to light mode"
  }

  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={toggleTheme}
      className="relative transition-transform hover:scale-105"
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      {getIcon()}
      <span className="sr-only">{getTooltip()}</span>
    </Button>
  )
} 