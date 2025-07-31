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

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true); 
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex">
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <NavMain items={sidebarcontent.navMain} />
        <NavProjects />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarcontent.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}