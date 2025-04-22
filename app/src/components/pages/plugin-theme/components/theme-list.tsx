"use client"

import { ChevronRight} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Theme } from "@/lib/data/theme-data"

interface ThemeListProps {
  themes: Theme[]
  onThemeSelect: (theme: Theme) => void
  selectedThemeId?: string
}

export function ThemeList({ themes, onThemeSelect, selectedThemeId }: ThemeListProps) {
  return (
    <div className="space-y-4 p-4">
      {themes.map((theme) => (
        <div
          key={theme.id}
          className={cn(
            "border border-border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors",
            selectedThemeId === theme.id && "bg-muted border-border",
          )}
          onClick={() => onThemeSelect(theme)}
        >
          <h3 className="text-lg font-semibold mb-2">{theme.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{theme.description}</p>
          <div className="flex gap-2 mb-4">
            {Object.entries(theme.colors).map(([name, color]) => (
              <div
                key={name}
                className="w-6 h-6 rounded-full border border-border"
                style={{ backgroundColor: color }}
                title={name}
              />
            ))}
          </div>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <div>Theme • {theme.createdAt}</div>
            <Button variant="secondary" size="sm" className="text-xs">
              Apply theme <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
} 