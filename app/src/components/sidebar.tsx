"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarcontent } from "@/lib/data/sidebar-contents";

type OnSelectType = {
  onSelectScreen: (value: number) => void;
};

export function AppSidebar({ onSelectScreen, ...props }: OnSelectType & React.ComponentProps<typeof Sidebar>) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true); // Ensure we are on the client side
  }, []);

  // Don't render anything until the component mounts on the client
  if (!isClient) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex">
        <TeamSwitcher models={sidebarcontent.models} />
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <NavMain items={sidebarcontent.navMain} onSelectScreen={onSelectScreen} />
        <NavProjects chatmod={sidebarcontent.chatmod} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarcontent.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}