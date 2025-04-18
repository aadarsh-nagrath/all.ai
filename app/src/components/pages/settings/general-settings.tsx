"use client"
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
// Pages
import { GeneralSettings } from "./components/GeneralSettings";
import { ApiKeySettings } from "./components/ApiKeySettings";
import { ProxyOrgIdSettings } from "./components/ProxyOrgIdSettings";
import { TextToSpeechSettings } from "./components/TextToSpeechSettings";
import { AppearanceSettings } from "./AppearanceSettings";
import { VoiceInputSettings } from "./components/VoiceInputSettings";
import { ExtensionsSettings } from "./components/ExtensionsSettings";
import { LicenseKeySettings } from "./components/LicenseKeySettings";

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
            This will delete all of your local data from this device, including your chat messages, prompts, agents, custom models, API keys, license key, and reset everything app setting to default. This action is irreversible. Type &quot;delete all&quot; to the textbox below to confirm.
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
