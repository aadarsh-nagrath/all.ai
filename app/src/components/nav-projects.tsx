"use client"

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  Plus,
} from "lucide-react"
import { useEffect, useState } from "react"
import { getUserChats, deleteChat } from "@/lib/api"
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

  const handleDeleteChat = async (chatId: string) => {
    try {
      await deleteChat(chatId)
      setChats(chats.filter(chat => chat.id !== chatId))
    } catch (error) {
      console.error('Error deleting chat:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete chat')
    }
  }

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
      <SidebarGroupLabel className="text-xl font-bold tracking-tight relative group mb-2">
        Chats
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
      </SidebarGroupLabel>
      <div className="px-2 mb-2">
        <Button
          variant="outline"
          className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-4 group-data-[collapsible=icon]:mx-[-8px]"
          onClick={() => {
            window.location.href = "/workplace"
          }}
        >
          <Plus className="h-4 w-4" />
          <span className="group-data-[collapsible=icon]:hidden">New Chat</span>
        </Button>
      </div>
      <div className="h-full overflow-y-auto">  
        <SidebarMenu className="h-[80%] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-hide hover:scrollbar-show" >
          {status === "loading" ? (
            <div className="px-4 py-2 text-sm text-muted-foreground">Loading...</div>
          ) : status !== "authenticated" ? (
            <div className="px-4 py-2 text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">Please sign in to view your chats</div>
          ) : loading ? (
            <div className="px-4 py-2 text-sm text-muted-foreground">Loading chats...</div>
          ) : error ? (
            <div className="px-4 py-2 text-sm text-red-500">{error}</div>
          ) : chats.length === 0 ? (
            <div className="px-4 py-2 text-sm text-muted-foreground">No chats yet</div>
          ) : (
            chats.map((chat, index) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton asChild>
                  <a href={`/workplace?chatId=${chat.id}`} className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">#{index + 1}</span>
                    <span className="font-medium text-base truncate">{chat.title}</span>
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
                      <span>Highlight Chat</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Forward className="text-muted-foreground" />
                      <span>Share Chats</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600 focus:bg-red-100"
                      onClick={() => handleDeleteChat(chat.id)}
                    >
                      <Trash2 className="text-red-600 mr-2 h-4 w-4" />
                      <span>Delete Chat</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))
          )}
        </SidebarMenu>
      </div>
    </SidebarGroup>
  )
}
