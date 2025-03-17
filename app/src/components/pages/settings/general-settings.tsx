import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  const [activeCategory, setActiveCategory] = React.useState("General");

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case "General":
        return <GeneralSettings />;
      case "Account & Data":
        return <AccountDataSettings />;
      case "App Data & Storage":
        return <AppDataStorageSettings />;
      case "Cloud Sync & Backup":
        return <CloudSyncBackupSettings />;
      case "API Keys":
        return <ApiKeySettings />;
      case "License Key":
        return <LicenseKeySettings />;
      case "Preferences":
      //   return <PreferencesSettings />;
      // case "Appearance":
      //   return <AppearanceSettings />;
      // case "Keyboard Shortcuts":
      //   return <KeyboardShortcutsSettings />;
      // case "Text-to-Speech":
      //   return <TextToSpeechSettings />;
      // case "Voice Input":
      //   return <VoiceInputSettings />;
      // case "Advanced Settings":
      //   return <AdvancedSettings />;
      // case "Extensions":
      //   return <ExtensionsSettings />;
      // case "Proxy & Org ID":
      //   return <ProxyOrgIdSettings />;
      // default:
      //   return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="bg-muted/40 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="text-muted-foreground grid gap-4 text-sm">
            {[
              "General",
              "Account & Data",
              "App Data & Storage",
              "Cloud Sync & Backup",
              "API Keys",
              "License Key",
              "Preferences",
              "Appearance",
              "Keyboard Shortcuts",
              "Text-to-Speech",
              "Voice Input",
              "Advanced Settings",
              "Extensions",
              "Proxy & Org ID",
            ].map((category) => (
              <a
                key={category}
                href="#"
                className={`cursor-pointer ${activeCategory === category ? "text-primary font-semibold" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </a>
            ))}
          </nav>
          <div className="grid gap-6">{renderCategoryContent()}</div>
        </div>
      </main>
    </div>
  );
}

// Components for each category
const GeneralSettings = () => {
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

const AccountDataSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Account & Data</CardTitle>
      <CardDescription>Manage your account and data settings.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <Label>Export Data</Label>
        <Button variant="outline">Export All Data</Button>
      </div>
    </CardContent>
  </Card>
);

const AppDataStorageSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>App Data & Storage</CardTitle>
      <CardDescription>Configure app data and storage settings.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <Label>Clear Cache</Label>
        <Button variant="outline">Clear Cache</Button>
      </div>
    </CardContent>
  </Card>
);

const CloudSyncBackupSettings: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Cloud Sync & Backup</CardTitle>
      <CardDescription>Sync and backup your data to the cloud.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <Label>Enable Cloud Sync</Label>
        <Switch />
      </div>
    </CardContent>
  </Card>
);
const ApiKeySettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>API Keys</CardTitle>
      <CardDescription>Manage your API keys for integrations.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <Label>API Key</Label>
        <Input placeholder="Enter your API key" />
        <p className="text-sm text-muted-foreground">
          By default, your API Key is stored locally on your browser and never sent anywhere else.
        </p>
      </div>
    </CardContent>
    <CardFooter className="border-t px-6 py-4">
      <Button>Save</Button>
    </CardFooter>
  </Card>
);

const LicenseKeySettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>License Key</CardTitle>
      <CardDescription>Activate or recover your license key.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <Label>License Status</Label>
        <p className="text-sm text-muted-foreground">Your license is currently activated.</p>
        <div className="flex gap-2">
          <Button variant="outline">Buy License</Button>
          <Button variant="outline">Recover License</Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Add more components for other categories as needed...