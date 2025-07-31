"use client"

import * as React from "react"
import Image from "next/image";
import { ChevronsUpDown, Plus } from "lucide-react"
import { useEffect, useState, createContext, useContext } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

// Create context for active model
interface ActiveModelContextType {
  activeModel: any | null;
  setActiveModel: (model: any | null) => void;
}

const ActiveModelContext = createContext<ActiveModelContextType | undefined>(undefined);

export const useActiveModel = () => {
  const context = useContext(ActiveModelContext);
  if (!context) {
    throw new Error('useActiveModel must be used within an ActiveModelProvider');
  }
  return context;
};

export function ActiveModelProvider({ children }: { children: React.ReactNode }) {
  const [activeModel, setActiveModel] = useState<any | null>(null);
  
  return (
    <ActiveModelContext.Provider value={{ activeModel, setActiveModel }}>
      {children}
    </ActiveModelContext.Provider>
  );
}

export function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const [models, setModels] = useState<any[]>([])
  const [activeTeam, setActiveTeam] = useState<any | null>(null)
  const { setActiveModel } = useActiveModel()

  useEffect(() => {
    function updateModels() {
      let ids: string[] = []
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('quick_start_models')
        if (stored) ids = JSON.parse(stored)
      }
      fetch('/api/models/list')
        .then(res => res.json())
        .then((allModels: any[]) => {
          let filtered: any[] = []
          if (ids.length > 0) {
            filtered = allModels.filter(m => ids.includes(m._id))
          } else {
            filtered = allModels.filter(m => (m.status && (m.status.toLowerCase() === 'quick_start' || m.status.toLowerCase() === 'quick start')))
          }
          const mapped = filtered.map(m => ({
            id: m._id,
            name: m.model_name,
            logo: m.model_icon,
            version: m.tag || '',
            type: m.type || '',
            api_model: m.api_model || '',
          }))
          console.log("Mapped models:", mapped)
          setModels(mapped)
          const firstModel = mapped[0] || null
          console.log("Setting first model as active:", firstModel)
          setActiveTeam(firstModel)
          setActiveModel(firstModel)
        })
    }
    updateModels()
    window.addEventListener('storage', updateModels)
    window.addEventListener('quickstart-updated', updateModels)
    return () => {
      window.removeEventListener('storage', updateModels)
      window.removeEventListener('quickstart-updated', updateModels)
    }
  }, [setActiveModel])

  const handleModelChange = (model: any) => {
    console.log("Model changed to:", model)
    setActiveTeam(model)
    setActiveModel(model)
  }

  if (!models.length || !activeTeam) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="opacity-60 cursor-not-allowed">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <span className="text-xs">No Quick Start Models</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {/* Image with object-fit cover */}
                <Image
                  src={activeTeam.logo}
                  alt={activeTeam.name}
                  width={32}
                  height={32}
                  unoptimized
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.version}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              AI models
            </DropdownMenuLabel>
            {models.map((m, index) => (
              <DropdownMenuItem
                key={m.id}
                onClick={() => handleModelChange(m)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {/* Image with object-fit cover */}
                  <Image
                    src={m.logo}
                    alt={m.name}
                    width={32}
                    height={32}
                    unoptimized
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
                {m.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add Model</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
