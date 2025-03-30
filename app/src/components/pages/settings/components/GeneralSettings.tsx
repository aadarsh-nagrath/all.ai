import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const GeneralSettings = () => {
    const [streamResponses, setStreamResponses] = React.useState(true);
    const [autoGenerateTitles, setAutoGenerateTitles] = React.useState(true);
    const [soundNotifications, setSoundNotifications] = React.useState(true);
    const [reopenPreviousChat, setReopenPreviousChat] = React.useState(true);
    const [autoArchiveChats, setAutoArchiveChats] = React.useState(false);
    const [autoDeleteArchivedChats, setAutoDeleteArchivedChats] = React.useState(false);
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure general app behavior.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Stream AI Responses</Label>
              <p className="text-sm text-muted-foreground">
                Stream AI responses word by word (typing animation). Cost estimation will be less accurate when enabled.
              </p>
            </div>
            <Switch checked={streamResponses} onCheckedChange={setStreamResponses} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto Generate Titles</Label>
              <p className="text-sm text-muted-foreground">
                Ask the AI to generate a title for new chats based on the first message.
              </p>
            </div>
            <Switch checked={autoGenerateTitles} onCheckedChange={setAutoGenerateTitles} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Sound Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get sound notifications for AI responses when inactive.
              </p>
            </div>
            <Switch checked={soundNotifications} onCheckedChange={setSoundNotifications} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Reopen Previous Chat</Label>
              <p className="text-sm text-muted-foreground">
                Automatically resume your most recent chat when reopening the app.
              </p>
            </div>
            <Switch checked={reopenPreviousChat} onCheckedChange={setReopenPreviousChat} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto Archive Old Chats</Label>
              <p className="text-sm text-muted-foreground">
                Automatically archive chats older than a specific period.
              </p>
            </div>
            <Switch checked={autoArchiveChats} onCheckedChange={setAutoArchiveChats} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto Delete Archived Chats</Label>
              <p className="text-sm text-muted-foreground">
                Automatically delete archived chats after a specific period.
              </p>
            </div>
            <Switch checked={autoDeleteArchivedChats} onCheckedChange={setAutoDeleteArchivedChats} />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    );
  };