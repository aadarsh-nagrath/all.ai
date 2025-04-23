"use client"
import { CircleCheck, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Theme } from "@/lib/data/theme-data"

interface ThemeDetailProps {
  theme: Theme
}

export function ThemeDetail({ theme }: ThemeDetailProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Theme Library</h2>
        <Tabs defaultValue="about">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="about">
              About
            </TabsTrigger>
            <TabsTrigger value="features">
              Features
            </TabsTrigger>
            <TabsTrigger value="customize">
              Customize
            </TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="mt-4">
            <p className="text-muted-foreground">
              Theme Library is a collection of beautiful and customizable themes for your application.
              Browse, preview, and apply themes with just a few clicks.
            </p>
          </TabsContent>
          <TabsContent value="features" className="mt-4">
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center">
                <CircleCheck className="h-4 w-4 mr-2 text-primary" />
                Preview themes in real-time
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-4 w-4 mr-2 text-primary" />
                Customize color schemes
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-4 w-4 mr-2 text-primary" />
                Save and share themes
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="customize" className="mt-4">
            <p className="text-muted-foreground">Customize your theme by adjusting colors, typography, and more.</p>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{theme.title}</h3>
          <p className="text-muted-foreground mb-4">{theme.description}</p>
          <div className="bg-muted rounded-lg p-4 border border-border">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(theme.colors).map(([name, color]) => (
                <div key={name} className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground block mb-1">{name}</label>
                    <Input value={color} className="h-8" readOnly />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Theme Settings</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Dark Mode</span>
              <Switch />
            </div>
          </div>
          <div className="bg-muted rounded-lg p-4 border border-border">
            <h4 className="text-sm font-medium mb-2">Customization Options</h4>
            <p className="text-xs text-muted-foreground mb-4">Adjust theme settings to match your preferences</p>
            <div className="bg-muted/50 rounded p-4 mb-4">
              <div className="flex items-center mb-2">
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                  <Plus className="h-3 w-3" />
                </Button>
                <span className="text-sm ml-2">
                  Add custom color variables
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 