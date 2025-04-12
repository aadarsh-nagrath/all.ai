"use client"

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  Plus,
} from "lucide-react"
import { useEffect, useState } from "react"
import { getUserChats } from "@/lib/api"
import { useSession } from "next-auth/react"

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

interface ChatSession {
  id: string
  title: string
  created_at: string
  updated_at: string
}

export function NavProjects() {
  const { isMobile } = useSidebar()
  const { data: session, status } = useSession()
  const [chats, setChats] = useState<ChatSession[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChats = async () => {
      if (status !== "authenticated" || !session?.user?.email) {
        setChats([])
        return
      }

      try {
        setError(null)
        setLoading(true)
        const userChats = await getUserChats(session.user.email)
        setChats(userChats)
      } catch (error) {
        console.error('Error fetching chats:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch chats')
      } finally {
        setLoading(false)
      }
    }

    fetchChats()
  }, [session, status])

  return (
    <SidebarGroup className="group-data-[collapsible=icon] h-full flex-2 ">
      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <div className="px-2 mb-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => {
            window.location.href = "/workplace"
          }}
        >
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </Button>
      </div>
      <div className="h-full overflow-y-auto">  
        <SidebarMenu className="h-[80%] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-hide hover:scrollbar-show" >
          {status === "loading" ? (
            <div className="px-4 py-2 text-sm text-muted-foreground">Loading...</div>
          ) : status !== "authenticated" ? (
            <div className="px-4 py-2 text-sm text-muted-foreground">Please sign in to view your chats</div>
          ) : loading ? (
            <div className="px-4 py-2 text-sm text-muted-foreground">Loading chats...</div>
          ) : error ? (
            <div className="px-4 py-2 text-sm text-red-500">{error}</div>
          ) : chats.length === 0 ? (
            <div className="px-4 py-2 text-sm text-muted-foreground">No chats yet</div>
          ) : (
            chats.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton asChild>
                  <a href={`/chat/${chat.id}`}>
                    <span>{chat.title}</span>
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
            ))
          )}
          <ModeToggle />
        </SidebarMenu>
      </div>
    </SidebarGroup>
  )
}
