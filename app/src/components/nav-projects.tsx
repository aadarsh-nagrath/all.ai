"use client"

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  Plus,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-change"
import { Button } from "@/components/ui/button"

export function NavProjects({
  chatmod,
}: {
  chatmod: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon] h-full flex-2 ">
      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <div className="px-2 mb-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => {
            // Add your new chat creation logic here
            window.location.href = "/workplace"
          }}
        >
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </Button>
      </div>
      {/* Ensure only this section scrolls */}
      <div className="h-full overflow-y-auto">  
        <SidebarMenu className="h-[80%] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-hide hover:scrollbar-show" >
          {chatmod.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <Folder className="text-muted-foreground" />
                    <span>View Chats</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="text-muted-foreground" />
                    <span>Share Chats</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete Chats</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <MoreHorizontal className="text-sidebar-foreground/70" />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <ModeToggle />
        </SidebarMenu>
      </div>
    </SidebarGroup>
  )
}
