import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ApiKeySettings = () => {
    const [openAiKey, setOpenAiKey] = React.useState("sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    const [anthropicKey, setAnthropicKey] = React.useState("sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    const [googleGeminiKey, setGoogleGeminiKey] = React.useState("");
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage your API keys for integrations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>OpenAI API Key</Label>
            <Input
              placeholder="Enter your OpenAI API key"
              value={openAiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              By default, your API Key is stored locally on your browser and never sent anywhere else.
            </p>
            <Button>Save</Button>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>Anthropic API Key</Label>
            <Input
              placeholder="Enter your Anthropic API key"
              value={anthropicKey}
              onChange={(e) => setAnthropicKey(e.target.value)}
            />
            <Button>Save</Button>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>Google Gemini API Key</Label>
            <Input
              placeholder="Enter your Google Gemini API key"
              value={googleGeminiKey}
              onChange={(e) => setGoogleGeminiKey(e.target.value)}
            />
            <Button>Save</Button>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>Encrypt API Key</Label>
            <Button variant="outline">🔐 Encrypt API key with password</Button>
          </div>
        </CardContent>
      </Card>
    );
  };