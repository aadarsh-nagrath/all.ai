import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      case "Appearance":
        return <AppearanceSettings />;
      case "Text-to-Speech":
        return <TextToSpeechSettings />;
      case "Voice Input":
        return <VoiceInputSettings />;
      case "Extensions":
        return <ExtensionsSettings />;
      case "Proxy & Org ID":
        return <ProxyOrgIdSettings />;
      default:
        return null;
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
              "Appearance",
              "Text-to-Speech",
              "Voice Input",
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

const AppDataStorageSettings = () => {
  const [deleteConfirmation, setDeleteConfirmation] = React.useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>App Data & Storage</CardTitle>
        <CardDescription>
          You have 5 plugins, 6 characters, 9 chats with 47 messages on this device.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Export</Label>
          <Button variant="outline">Export Data</Button>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Import</Label>
          <Button variant="outline">Import Data</Button>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Delete All Local Data</Label>
          <p className="text-sm text-muted-foreground">
            This will delete all of your local data from this device, including your chat messages, prompts, agents, custom models, API keys, license key, and reset everything app setting to default. This action is irreversible. Type "delete all" to the textbox below to confirm.
          </p>
          <Input
            placeholder="Type 'delete all' to confirm"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
          />
          <Button variant="destructive" disabled={deleteConfirmation !== "delete all"}>
            Delete Everything
          </Button>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Storage Stats</Label>
          <p className="text-sm text-muted-foreground">
            All of your data is stored locally in your browser. Each browser has a different limit of how much data you can store. If you are running out of space, you can delete some of your old chats.
          </p>
          <div className="space-y-2">
            <p className="text-sm">Metadata & User Data: (View Report)</p>
            <p className="text-sm">Local Storage: 0.00 MB (0.02%)</p>
            <p className="text-sm">Limit: 5.00 MB</p>
            <p className="text-sm">Local Chat Data:</p>
            <p className="text-sm">IndexedDB: 112.36 KB</p>
            <p className="text-sm">Limit: 187.33 GB</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Please export and backup your chats regularly to avoid data lost! Learn how to protect your data.
          </p>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Archived Chats</Label>
          <p className="text-sm text-muted-foreground">You have 0 archived chats.</p>
        </div>
      </CardContent>
    </Card>
  );
};

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

const ApiKeySettings = () => {
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

const LicenseKeySettings = () => {
  const [licenseKey, setLicenseKey] = React.useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>License Key</CardTitle>
        <CardDescription>Activate or recover your license key.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Enter License Key</Label>
          <Input
            placeholder="Enter your license key"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
          />
          <Button>Activate License</Button>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Buy / Upgrade License</Label>
          <Button variant="outline">Buy License</Button>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Recover License Key</Label>
          <Button variant="outline">Recover License Key</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const AppearanceSettings = () => {
  const [theme, setTheme] = React.useState("system");
  const [sidebarColor, setSidebarColor] = React.useState("default");
  const [sidebarStyle, setSidebarStyle] = React.useState("compact");
  const [fontSize, setFontSize] = React.useState("medium");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize the appearance of the app.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Theme</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Sidebar Color</Label>
          <Select value={sidebarColor} onValueChange={setSidebarColor}>
            <SelectTrigger>
              <SelectValue placeholder="Select sidebar color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="light">Light</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Sidebar Style</Label>
          <Select value={sidebarStyle} onValueChange={setSidebarStyle}>
            <SelectTrigger>
              <SelectValue placeholder="Select sidebar style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="expanded">Expanded</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Font Size</Label>
          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger>
              <SelectValue placeholder="Select font size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

const TextToSpeechSettings = () => {
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

const VoiceInputSettings = () => {
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

const ExtensionsSettings = () => {
  const [extensionUrl, setExtensionUrl] = React.useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Extensions</CardTitle>
        <CardDescription>
          Extensions allow you to load custom JavaScript into the application. This can be useful for adding custom functionality or integrating with other services.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Enter Extension URL</Label>
          <Input
            placeholder="Enter extension URL"
            value={extensionUrl}
            onChange={(e) => setExtensionUrl(e.target.value)}
          />
          <Button>Install</Button>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label>Note</Label>
          <p className="text-sm text-muted-foreground">
            Extensions have full access to the application and can read and modify any data. Only install extensions from sources you trust.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const ProxyOrgIdSettings = () => {
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