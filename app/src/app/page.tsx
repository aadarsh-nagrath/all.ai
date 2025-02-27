"use client";
import { useState } from "react";
import { AppSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Workplace from "@/pages/workplace/workplace";
import Plugins from "@/pages/plugin-theme/plugins";
import Theme from "@/pages/plugin-theme/theme";
import TextGen from "@/pages/modals/text-generation";
import CreateAgents from "@/pages/ai-agents/create-agents";
import Notes from "@/pages/promptlib-notes/notes";
import PromptLib from "@/pages/promptlib-notes/prompt-lib";
import BrowseAgents from "@/pages/ai-agents/browse-agents";
import ImageGen from "@/pages/modals/image-generation";
import GetStarted from "@/pages/promptlib-notes/get-started";
import Account from "@/pages/settings/account-billing";
import GeneralSettings from "@/pages/settings/general-settings";

interface ActiveSType {
  activeScreen: string;
}

// Define Screen outside of Home
export const Screen = ({ activeScreen }: ActiveSType) => {
  const renderScreen = () => {
    switch (activeScreen) {
      case "workplace":
        return <Workplace />;
      case "plugins":
        return <Plugins />;
      case "theme":
        return <Theme />;
      case "text-generation":
        return <TextGen />;
      case "create-agents":
        return <CreateAgents />;
      case "browse-agents":
        return <BrowseAgents />;
      case "image-generation":
        return <ImageGen />;
      case "notes":
        return <Notes />;
      case "get-started":
        return <GetStarted />;
      case "account":
        return <Account />;
      case "general-settings":
        return <GeneralSettings />;
      case "prompt-lib":
        return <PromptLib />;
      default:
        return <Workplace />;
    }
  };

  return <div>{renderScreen()}</div>;
};

export default function Home() {
  const [activeScreen, setActiveScreen] = useState("workplace"); // Default to "workplace"

  return (
    <SidebarProvider>
      <AppSidebar onSelectScreen={setActiveScreen} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <Screen activeScreen={activeScreen} />
      </SidebarInset>
    </SidebarProvider>
  );
}