import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export const TextToSpeechSettings = () => {
    const [speechApi, setSpeechApi] = React.useState("disabled");
    const [showPlayButton, setShowPlayButton] = React.useState(true);
    const [autoPlayMessages, setAutoPlayMessages] = React.useState(false);
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Text-to-Speech</CardTitle>
          <CardDescription>Configure text-to-speech settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Speech API</Label>
            <Select value={speechApi} onValueChange={setSpeechApi}>
              <SelectTrigger>
                <SelectValue placeholder="Select Speech API" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disabled">Disabled</SelectItem>
                <SelectItem value="web-speech">Web Speech API</SelectItem>
                <SelectItem value="google-cloud">Google Cloud Speech</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>Voice Settings</Label>
            <p className="text-sm text-muted-foreground">
              Text-to-speech is disabled. Please select a Speech API above to enable.
            </p>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>Show Play Button</Label>
            <Switch checked={showPlayButton} onCheckedChange={setShowPlayButton} />
            <p className="text-sm text-muted-foreground">
              Show Play button after assistant messages.
            </p>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label>Auto Play Messages</Label>
            <Switch checked={autoPlayMessages} onCheckedChange={setAutoPlayMessages} />
            <p className="text-sm text-muted-foreground">
              Auto play assistant messages.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };