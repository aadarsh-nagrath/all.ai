"use client";
import { useState } from "react";
import { AppSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import  Workplace  from "@/pages/workplace/workplace";
import Plugins from "@/pages/plugins";
import Theme from "@/pages/theme";
import TextGen from "@/pages/text-generation";

interface ActiveSType {
  activeScreen: number;
}

// Define Screen outside of Home
export const Screen = ({ activeScreen }: ActiveSType) => {
  const renderScreen = () => {
    switch (activeScreen) {
      case 0:
        return <Workplace />;
      case 1:
        return <Plugins />;
      case 2:
        return <Theme />;
      case 3:
        return <TextGen />;
      default:
        return <Workplace />;
    }
  };

  return <div>{renderScreen()}</div>;
};

export default function Home() {
  const [activeScreen, setActiveScreen] = useState(0);

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
