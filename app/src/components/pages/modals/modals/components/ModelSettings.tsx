import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { InfoCircledIcon, ResetIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"

// Default values for settings
const defaultSettings = {
  defaultModel: "gpt-4o",
  systemMessage: "You are a helpful AI assistant. Today is {local_date}, local time is {local_time}.",
  streamResponses: false,
  contextLimit: "all",
  temperature: 0.7,
  presencePenalty: 0,
  frequencyPenalty: 0,
  topP: 1,
  topK: 0,
  maxTokens: 2048,
  safetySettings: "default",
  promptCaching: false,
  reasoningEffort: "medium"
}

export function ModelSettings() {
  // State for all settings
  const [settings, setSettings] = useState(defaultSettings)

  // Reset functions for each section
  const resetSystemInstructions = () => {
    setSettings(prev => ({
      ...prev,
      systemMessage: defaultSettings.systemMessage,
      streamResponses: defaultSettings.streamResponses
    }))
  }

  const resetGenerationSettings = () => {
    setSettings(prev => ({
      ...prev,
      contextLimit: defaultSettings.contextLimit,
      temperature: defaultSettings.temperature,
      presencePenalty: defaultSettings.presencePenalty,
      frequencyPenalty: defaultSettings.frequencyPenalty,
      topP: defaultSettings.topP,
      topK: defaultSettings.topK,
      maxTokens: defaultSettings.maxTokens
    }))
  }

  return (
    <div className="space-y-6 p-4">
      {/* Default Model Selection */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Default Model</CardTitle>
          <CardDescription>Select your preferred default model for conversations</CardDescription>
        </CardHeader>
        <CardContent>
          <Select 
            value={settings.defaultModel}
            onValueChange={(value) => setSettings(prev => ({ ...prev, defaultModel: value }))}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="claude-3">Claude 3</SelectItem>
              <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* System Instructions */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Instructions</CardTitle>
              <CardDescription>Customize the AI&apos;s behavior and context</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={resetSystemInstructions}
              className="hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <ResetIcon className="mr-2 h-4 w-4" />
              Reset to Default
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Default System Message</Label>
              <Input 
                value={settings.systemMessage}
                onChange={(e) => setSettings(prev => ({ ...prev, systemMessage: e.target.value }))}
                className="h-20 bg-background/50"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="stream" 
                checked={settings.streamResponses}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, streamResponses: checked }))}
              />
              <Label htmlFor="stream">Stream AI responses word by word</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircledIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cost estimation will be less accurate when stream response is enabled.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Context and Generation Settings */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Context & Generation Settings</CardTitle>
              <CardDescription>Configure how the AI processes and generates responses</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={resetGenerationSettings}
              className="hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <ResetIcon className="mr-2 h-4 w-4" />
              Reset to Default
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Context Limit</Label>
              <Select 
                value={settings.contextLimit}
                onValueChange={(value) => setSettings(prev => ({ ...prev, contextLimit: value }))}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select context limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Previous Messages</SelectItem>
                  <SelectItem value="1">Last Message Only</SelectItem>
                  <SelectItem value="5">Last 5 Messages</SelectItem>
                  <SelectItem value="10">Last 10 Messages</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-border/50" />

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Temperature</Label>
                  <span className="text-sm text-muted-foreground">{settings.temperature}</span>
                </div>
                <Slider 
                  value={[settings.temperature]} 
                  max={1} 
                  step={0.1}
                  onValueChange={([value]) => setSettings(prev => ({ ...prev, temperature: value }))}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:hover:bg-primary/90"
                />
                <p className="text-sm text-muted-foreground">
                  Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Presence Penalty</Label>
                  <span className="text-sm text-muted-foreground">{settings.presencePenalty}</span>
                </div>
                <Slider 
                  value={[settings.presencePenalty]} 
                  max={2} 
                  step={0.1}
                  onValueChange={([value]) => setSettings(prev => ({ ...prev, presencePenalty: value }))}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:hover:bg-primary/90"
                />
                <p className="text-sm text-muted-foreground">
                  How much to penalize new tokens based on whether they appear in the text so far.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Frequency Penalty</Label>
                  <span className="text-sm text-muted-foreground">{settings.frequencyPenalty}</span>
                </div>
                <Slider 
                  value={[settings.frequencyPenalty]} 
                  max={2} 
                  step={0.1}
                  onValueChange={([value]) => setSettings(prev => ({ ...prev, frequencyPenalty: value }))}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:hover:bg-primary/90"
                />
                <p className="text-sm text-muted-foreground">
                  How much to penalize new tokens based on their existing frequency in the text so far.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Top P</Label>
                  <span className="text-sm text-muted-foreground">{settings.topP}</span>
                </div>
                <Slider 
                  value={[settings.topP]} 
                  max={1} 
                  step={0.1}
                  onValueChange={([value]) => setSettings(prev => ({ ...prev, topP: value }))}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:hover:bg-primary/90"
                />
                <p className="text-sm text-muted-foreground">
                  An alternative to sampling with temperature, called nucleus sampling.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Top K</Label>
                  <span className="text-sm text-muted-foreground">{settings.topK}</span>
                </div>
                <Slider 
                  value={[settings.topK]} 
                  max={100} 
                  step={1}
                  onValueChange={([value]) => setSettings(prev => ({ ...prev, topK: value }))}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:hover:bg-primary/90"
                />
                <p className="text-sm text-muted-foreground">
                  Only sample from the top K options for each subsequent token.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Max Tokens</Label>
                  <span className="text-sm text-muted-foreground">{settings.maxTokens}</span>
                </div>
                <Slider 
                  value={[settings.maxTokens]} 
                  max={4096} 
                  step={128}
                  onValueChange={([value]) => setSettings(prev => ({ ...prev, maxTokens: value }))}
                  className="[&_[role=slider]]:bg-primary [&_[role=slider]]:hover:bg-primary/90"
                />
                <p className="text-sm text-muted-foreground">
                  The maximum number of tokens to generate before stopping.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
          <CardDescription>Configure additional model-specific settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Safety Settings (Gemini Only)</Label>
                <span className="text-sm text-muted-foreground">{settings.safetySettings}</span>
              </div>
              <Select 
                value={settings.safetySettings}
                onValueChange={(value) => setSettings(prev => ({ ...prev, safetySettings: value }))}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select safety level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Content is blocked based on the probability that it is harmful.
              </p>
            </div>

            <Separator className="bg-border/50" />

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="prompt-caching" 
                  checked={settings.promptCaching}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, promptCaching: checked }))}
                />
                <Label htmlFor="prompt-caching">Enable Prompt Caching</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoCircledIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[300px]">
                      <p>Prompt caching helps save token costs for long conversations. Enabling this will incur additional tokens when initiating the cache for the first time, but it can save many more tokens later, especially for long conversations.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="space-y-2">
                <Label>Reasoning Effort (Reasoning Models Only)</Label>
                <Select 
                  value={settings.reasoningEffort}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, reasoningEffort: value }))}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select reasoning effort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="low">Low (25%)</SelectItem>
                    <SelectItem value="medium">Medium (50%)</SelectItem>
                    <SelectItem value="high">High (100%)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Constrains effort on reasoning for reasoning models. Reducing reasoning effort can result in faster responses and fewer tokens used on reasoning in a response.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 