"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DrawerRight,
  DrawerRightContent,
  DrawerRightHeader,
  DrawerRightTitle,
  DrawerRightDescription,
  DrawerRightBody,
  DrawerRightFooter,
  DrawerRightClose,
  DrawerRightOverlay,
} from "@/components/ui/drawer-right"
import { Model } from "./models"
import { X, Settings2, Zap, Shield, Code, MessageSquare } from "lucide-react"

interface ModelConfigDrawerProps {
  model: Model | null
  isOpen: boolean
  onClose: () => void
}

export function ModelConfigDrawer({ model, isOpen, onClose }: ModelConfigDrawerProps) {
  const [temperature, setTemperature] = React.useState([0.7])
  const [maxTokens, setMaxTokens] = React.useState([1000])
  const [topP, setTopP] = React.useState([0.9])

  if (!model) return null

  return (
    <DrawerRight open={isOpen} onOpenChange={onClose}>
      <DrawerRightOverlay 
        data-state={isOpen ? "open" : "closed"}
        onClick={onClose}
      />
      <DrawerRightContent data-state={isOpen ? "open" : "closed"}>
        <DrawerRightHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DrawerRightTitle>Configure {model.name}</DrawerRightTitle>
                <DrawerRightDescription>
                  Customize model parameters and settings
                </DrawerRightDescription>
              </div>
            </div>
            <DrawerRightClose>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DrawerRightClose>
          </div>
        </DrawerRightHeader>

        <DrawerRightBody>
          {/* Model Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{model.name}</h3>
                <p className="text-sm text-muted-foreground">{model.provider}</p>
              </div>
              <Badge
                className={
                  model.status === "Ready" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                  model.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                  model.status === "Quick Start" ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" :
                  model.status === "Maintenance" ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" :
                  "bg-muted text-muted-foreground"
                }
              >
                {model.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Parameters</div>
                <div className="text-lg font-semibold">{(model.parameters / 1e9).toFixed(1)}B</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Context Length</div>
                <div className="text-lg font-semibold">{model.contextLength}K tokens</div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Generation Parameters */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Generation Parameters
            </h3>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="temperature">Temperature</Label>
                  <span className="text-sm text-muted-foreground">{temperature[0]}</span>
                </div>
                <Slider
                  id="temperature"
                  value={temperature}
                  onValueChange={setTemperature}
                  max={2}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Controls randomness. Lower values are more deterministic, higher values more creative.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="max-tokens">Max Tokens</Label>
                  <span className="text-sm text-muted-foreground">{maxTokens[0]}</span>
                </div>
                <Slider
                  id="max-tokens"
                  value={maxTokens}
                  onValueChange={setMaxTokens}
                  max={4000}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Maximum number of tokens to generate in the response.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="top-p">Top P</Label>
                  <span className="text-sm text-muted-foreground">{topP[0]}</span>
                </div>
                <Slider
                  id="top-p"
                  value={topP}
                  onValueChange={setTopP}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Controls diversity via nucleus sampling. Lower values focus on high-probability tokens.
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Safety & Content */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Safety & Content
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Content Filtering</Label>
                  <p className="text-xs text-muted-foreground">
                    Filter out potentially harmful content
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Bias Detection</Label>
                  <p className="text-xs text-muted-foreground">
                    Detect and flag potential biases in responses
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Fact Checking</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable automatic fact verification
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Advanced Settings */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Advanced Settings
            </h3>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="system-prompt">System Prompt</Label>
                <textarea
                  id="system-prompt"
                  className="w-full min-h-[80px] p-3 text-sm border rounded-md resize-none"
                  placeholder="Enter a system prompt to guide the model's behavior..."
                  defaultValue="You are a helpful AI assistant. Provide accurate, helpful, and safe responses."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stop-sequences">Stop Sequences</Label>
                <Input
                  id="stop-sequences"
                  placeholder="Enter stop sequences separated by commas"
                  defaultValue="END, STOP, [END]"
                />
                <p className="text-xs text-muted-foreground">
                  Sequences that will cause the model to stop generating text.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Stream Responses</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable real-time streaming of responses
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Use Cases */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Optimized For
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Content Creation
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Code Generation
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Chat Support
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Data Analysis
              </div>
            </div>
          </div>
        </DrawerRightBody>

        <DrawerRightFooter>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1">
              Save Configuration
            </Button>
          </div>
        </DrawerRightFooter>
      </DrawerRightContent>
    </DrawerRight>
  )
} 