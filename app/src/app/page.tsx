"use client";
import { useState } from "react";
import { AppSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Screen } from "@/components/screen"; // Import Screen from the new file

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