"use client"

import { useState, useEffect } from "react"
import { Palette, Search, Settings, Sun, Boxes } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ThemeList } from "./theme-list"
import { ThemeDetail } from "./theme-detail"
import { mockThemes, mockThemeStyles, Theme, ThemeStyle } from "@/lib/data/theme-data"
import { cn } from "@/lib/utils"

function ThemeTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (value: string) => void }) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="mb-3 h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse">
        <TabsTrigger
          value="themestyle"
          className="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
        >
          <Boxes
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          ThemeStyle
        </TabsTrigger>
        <TabsTrigger
          value="themes"
          className="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
        >
          <Palette
            className="-ms-0.5 me-1.5 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Themes
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

function FilterTabs() {
  return (
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
  )
}

export default function ThemeStash() {
  const [mounted, setMounted] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [selectedThemeStyle, setSelectedThemeStyle] = useState<ThemeStyle | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("themestyle")

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredThemes = mockThemes.filter((theme) => {
    return searchQuery === "" ||
      theme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.description.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const filteredThemeStyles = mockThemeStyles.filter((style) => {
    return searchQuery === "" ||
      style.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      style.description.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme)
  }

  const handleThemeStyleSelect = (style: ThemeStyle) => {
    setSelectedThemeStyle(style)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Left Sidebar - ThemeStyle/Themes List */}
      <div className="w-64 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <ScrollArea>
            <ThemeTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <ScrollBar orientation="horizontal" />

            {activeTab === "themestyle" ? (
              <div className="space-y-2 mt-4">
                {mockThemeStyles.map((style) => (
                  <div
                    key={style.id}
                    className={cn(
                      "p-2 rounded cursor-pointer hover:bg-muted/50 transition-colors",
                      selectedThemeStyle?.id === style.id && "bg-muted"
                    )}
                    onClick={() => handleThemeStyleSelect(style)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div
                          className="w-3 h-3 rounded-full border border-border"
                          style={{ 
                            borderRadius: style.styles.borderRadius,
                            boxShadow: style.styles.boxShadow
                          }}
                        />
                      </div>
                      <span className="text-sm truncate">{style.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 mt-4">
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
            )}
          </ScrollArea>
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

      {/* Middle Section - ThemeStyle/Themes List */}
      <div className="flex-1 flex flex-col border-r border-border">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h1 className="text-xl font-semibold">{activeTab === "themestyle" ? "ThemeStyle" : "Themes"}</h1>
          <div className="flex space-x-2">
            <FilterTabs />
            <Button variant="outline" className="ml-2">
              Presets
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${activeTab}`}
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {activeTab === "themestyle" ? (
            <div className="h-full p-6">
              {selectedThemeStyle ? (
                <div className="h-full flex flex-col">
                  <div className="h-[60vh] relative rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-border/20 to-border/10 rounded-lg" />
                    <div className="absolute inset-[1px] rounded-lg overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"
                        style={{ 
                          borderRadius: selectedThemeStyle.styles.borderRadius,
                          boxShadow: selectedThemeStyle.styles.boxShadow
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-sm">
                        <div className="text-center p-8 max-w-3xl">
                          <h2 className="text-2xl font-semibold mb-2">{selectedThemeStyle.title}</h2>
                          <p className="text-muted-foreground mb-4">{selectedThemeStyle.description}</p>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {selectedThemeStyle.tags.map((tag) => (
                              <span key={tag} className="text-xs bg-muted px-3 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-border mt-6">
                    <h3 className="text-sm font-medium mb-2">Extra</h3>
                    <div className="p-4 rounded-lg border border-border bg-muted/50">
                      <p className="text-sm text-muted-foreground text-center">Additional features coming soon</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Select a ThemeStyle to view details
                </div>
              )}
            </div>
          ) : (
            <ThemeList
              themes={filteredThemes}
              onThemeSelect={handleThemeSelect}
              selectedThemeId={selectedTheme?.id}
            />
          )}
        </div>
      </div>

      {/* Right Section - ThemeStyle/Themes Details */}
      <div className="w-96 flex flex-col">
        {activeTab === "themestyle" ? (
          selectedThemeStyle ? (
            <div className="p-4">
              <h2 className="text-lg font-semibold">{selectedThemeStyle.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{selectedThemeStyle.description}</p>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Styles</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Border Radius</span>
                      <span className="text-sm">{selectedThemeStyle.styles.borderRadius}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Box Shadow</span>
                      <span>{selectedThemeStyle.styles.boxShadow}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Spacing</span>
                      <span>{selectedThemeStyle.styles.spacing}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Typography</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Font Family</span>
                      <span className="text-sm">{selectedThemeStyle.styles.typography.fontFamily}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Font Size</span>
                      <span className="text-sm">{selectedThemeStyle.styles.typography.fontSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Line Height</span>
                      <span className="text-sm">{selectedThemeStyle.styles.typography.lineHeight}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">Select a ThemeStyle to view details</div>
          )
        ) : (
          selectedTheme ? (
            <ThemeDetail theme={selectedTheme} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">Select a theme to view details</div>
          )
        )}
      </div>
    </div>
  )
} 