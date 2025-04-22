"use client"

import { useState } from "react"
import { Palette, Search, Settings, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeList } from "./theme-list"
import { ThemeDetail } from "./theme-detail"
import { mockThemes } from "@/lib/data/theme-data"
import { cn } from "@/lib/utils"

export interface Theme {
    id: string
    title: string
    description: string
    colors: {
      primary: string
      secondary: string
      accent: string
      background: string
      foreground: string
    }
    tags: string[]
    createdAt: string
    variables?: {
      [key: string]: string
    }
}

export default function ThemeStash() {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredThemes = mockThemes.filter((theme) => {
    return searchQuery === "" ||
      theme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.description.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme)
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Left Sidebar - Theme List */}
      <div className="w-64 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold mb-4">Theme List</h2>
          <div className="space-y-2">
            {mockThemes.map((theme) => (
              <div
                key={theme.id}
                className={cn(
                  "p-2 rounded cursor-pointer hover:bg-muted/50 transition-colors",
                  selectedTheme?.id === theme.id && "bg-muted"
                )}
                onClick={() => handleThemeSelect(theme)}
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {Object.entries(theme.colors).slice(0, 2).map(([name, color]) => (
                      <div
                        key={name}
                        className="w-3 h-3 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-sm truncate">{theme.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Sun className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Middle Section - Theme List */}
      <div className="flex-1 flex flex-col border-r border-border">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h1 className="text-xl font-semibold">Themes</h1>
          <div className="flex space-x-2">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">
                  All
                </TabsTrigger>
                <TabsTrigger value="saved">
                  <Palette className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" className="ml-2">
              Presets
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search themes"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <ThemeList
            themes={filteredThemes}
            onThemeSelect={handleThemeSelect}
            selectedThemeId={selectedTheme?.id}
          />
        </div>
      </div>

      {/* Right Section - Theme Details */}
      <div className="w-96 flex flex-col">
        {selectedTheme ? (
          <ThemeDetail theme={selectedTheme} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">Select a theme to view details</div>
        )}
      </div>
    </div>
  )
} 