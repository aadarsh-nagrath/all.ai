import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ProxyOrgIdSettings = () => {
    const [openAiEndpoint, setOpenAiEndpoint] = React.useState("https://api.openai.com/v1/chat/completions");
    const [anthropicEndpoint, setAnthropicEndpoint] = React.useState("https://api.anthropic.com/v1/messages");
    const [openAiWhisperEndpoint, setOpenAiWhisperEndpoint] = React.useState("https://api.openai.com/v1/audio/transcriptions");
    const [openAiOrgId, setOpenAiOrgId] = React.useState("org-xxxxxx");
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Proxy & Org ID</CardTitle>
          <CardDescription>Configure proxy and organization ID settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>OpenAI Chat Completions Endpoint (V1)</Label>
            <Input
              value={openAiEndpoint}
              onChange={(e) => setOpenAiEndpoint(e.target.value)}
            />
            <Button variant="outline">Reset Default</Button>
            <Button>Save</Button>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>Anthropic Chat Completions Endpoint (V1)</Label>
            <Input
              value={anthropicEndpoint}
              onChange={(e) => setAnthropicEndpoint(e.target.value)}
            />
            <Button variant="outline">Reset Default</Button>
            <Button>Save</Button>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>OpenAI Whisper Endpoint (V1)</Label>
            <Input
              value={openAiWhisperEndpoint}
              onChange={(e) => setOpenAiWhisperEndpoint(e.target.value)}
            />
            <Button variant="outline">Reset Default</Button>
            <Button>Save</Button>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>OpenAI API Org ID</Label>
            <Input
              value={openAiOrgId}
              onChange={(e) => setOpenAiOrgId(e.target.value)}
            />
            <Button variant="outline">Reset Default</Button>
            <Button>Save</Button>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>Note</Label>
            <p className="text-sm text-muted-foreground">
              You may need to update your API key after changing the endpoint.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };