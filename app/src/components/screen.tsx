"use client";

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