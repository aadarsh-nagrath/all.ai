"use client";
import { Routes, Route } from "react-router-dom";
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

export function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Workplace />} />
      <Route path="/workplace" element={<Workplace />} />
      <Route path="/plugins" element={<Plugins />} />
      <Route path="/theme" element={<Theme />} />
      <Route path="/text-generation" element={<TextGen />} />
      <Route path="/create-agents" element={<CreateAgents />} />
      <Route path="/browse-agents" element={<BrowseAgents />} />
      <Route path="/image-generation" element={<ImageGen />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/account" element={<Account />} />
      <Route path="/general-settings" element={<GeneralSettings />} />
      <Route path="/prompt-lib" element={<PromptLib />} />
    </Routes>
  );
}