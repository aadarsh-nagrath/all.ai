import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export const VoiceInputSettings = () => {
    const [speechToTextProvider, setSpeechToTextProvider] = React.useState("web-api");
    const [autoStartRecording, setAutoStartRecording] = React.useState(true);
    const [autoSendMessage, setAutoSendMessage] = React.useState(true);
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Voice Input</CardTitle>
          <CardDescription>Configure voice input settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Speech-to-Text Provider</Label>
            <Select value={speechToTextProvider} onValueChange={setSpeechToTextProvider}>
              <SelectTrigger>
                <SelectValue placeholder="Select Speech-to-Text Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-api">Web API (Free)</SelectItem>
                <SelectItem value="google-cloud">Google Cloud Speech</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>Auto Start Recording</Label>
            <Switch checked={autoStartRecording} onCheckedChange={setAutoStartRecording} />
            <p className="text-sm text-muted-foreground">
              Auto start recording when open.
            </p>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>Auto Send Message</Label>
            <Switch checked={autoSendMessage} onCheckedChange={setAutoSendMessage} />
            <p className="text-sm text-muted-foreground">
              Auto send the message after speaking.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };