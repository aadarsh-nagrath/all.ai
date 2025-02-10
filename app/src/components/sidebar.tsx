"use client"
import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Brain,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Login",
    email: "anagrath1@gmail.com",
    avatar: "https://i.pinimg.com/736x/46/42/6d/46426d4d7b3f760caa2bde62dc8e8923.jpg",
  },
  teams: [
    {
      name: "Gemini",
      logo: GalleryVerticalEnd,
      version: "Enterprise",
    },
    {
      name: "ChatGPT",
      logo: AudioWaveform,
      version: "Startup",
    },
    {
      name: "DeevSeek-r1",
      logo: Command,
      version: "Free",
    },
    {
      name: "Perplexity",
      logo: PieChart,
      version: "Free",
    },
  ],
  navMain: [
    {
      title: "Plugins & Themes",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Plugins",
          url: "#",
        },
        {
          title: "Theme",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Text Generation",
          url: "#",
        },
        {
          title: "Image Generation",
          url: "#",
        },
      ],
    },
    {
      title: "AI Agents",
      url: "#",
      icon: Brain,
      items: [
        {
          title: "Browse Agents",
          url: "#",
        },
        {
          title: "Create Agents",
          url: "#",
        },
      ],
    },
    {
      title: "Prompt Library & Notes",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Prompt Library",
          url: "#",
        },
        {
          title: "Notes",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Account",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "General Settings",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
