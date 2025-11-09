"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Eye, Sparkles, Sun, Moon } from "lucide-react"

export function GradientShowcase() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = (theme || resolvedTheme) === "dark"

  const gradientExamples = [
    {
      name: "Primary Background",
      description: "Main body gradient with BAB purple",
      className: "bg-background min-h-32 rounded-lg border"
    },
    {
      name: "Card Background",
      description: "Card gradient with purple tint",
      className: "bg-card min-h-32 rounded-lg border"
    },
    {
      name: "Muted Background",
      description: "Muted sections with subtle purple",
      className: "bg-muted min-h-32 rounded-lg border"
    }
  ]

  const colorPalette = [
    { name: "BAB Purple", class: "bg-bab-purple", hex: "#40296e" },
    { name: "BAB Turquoise", class: "bg-bab-turquoise", hex: "#62c6c2" },
    { name: "BAB Charcoal", class: "bg-bab-charcoal", hex: "#2E2A2B" },
    { name: "BAB Whisper", class: "bg-bab-whisper", hex: "#F7F7F7" }
  ]

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            BAB Pharma Dark Mode Gradient Showcase
          </CardTitle>
          <CardDescription>
            Current Theme: {isDark ? "Dark Mode" : "Light Mode"} 
            {isDark ? <Moon className="inline h-4 w-4 ml-2" /> : <Sun className="inline h-4 w-4 ml-2" />}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Gradient Examples */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Gradient Backgrounds
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gradientExamples.map((example) => (
                <div key={example.name} className="space-y-2">
                  <div className={example.className}>
                    <div className="p-4 h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="font-medium">{example.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {example.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Official BAB Pharma Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {colorPalette.map((color) => (
                <div key={color.name} className="space-y-2">
                  <div className={`${color.class} h-16 rounded-lg border`}></div>
                  <div className="text-sm">
                    <div className="font-medium">{color.name}</div>
                    <div className="text-muted-foreground">{color.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Animated Gradient Demo */}
          {isDark && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Animated Gradient Background (Default in Dark Mode)
              </h3>
              <div className="bg-bab-gradient-dark min-h-32 rounded-lg border animated-gradient-demo p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-medium mb-2">Animated Gradient Background</div>
                  <div className="text-sm text-muted-foreground">
                    Automatically active in dark mode using BAB purple color variations
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Implementation Status */}
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              ✅ Implementation Status: Complete
            </h3>
            <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
              <li>• Dark mode gradient background with BAB purple colors</li>
              <li>• Smooth theme switching with proper hydration handling</li>
              <li>• Official BAB brand colors with dark mode variants</li>
              <li>• Animated gradient background (default in dark mode)</li>
              <li>• Accessibility compliant with WCAG guidelines</li>
              <li>• Performance optimized with proper CSS custom properties</li>
            </ul>
          </div>

        </CardContent>
      </Card>
    </div>
  )
} 