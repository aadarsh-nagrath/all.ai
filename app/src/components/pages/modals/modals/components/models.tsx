import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { QuickStartCell } from "./QuickStartCell"
import { Button } from "@/components/ui/button"
import { Settings2 } from "lucide-react"

export type Model = {
  id: string
  name: string
  provider: string
  status: "Active" | "Ready" | "Quick Start" | "Maintenance" | "Inactive"
  parameters: number
  contextLength: number
  lastUpdated: string
  favorite: boolean
  quickStart: boolean
  short_description?: string
  key_features?: string[]
  usecase?: string[]
  Response_Time?: string
  Success_Rate?: string
  tag?: string
}

export const dummyModels: Model[] = [
  {
    id: "1",
    name: "GPT-4",
    provider: "OpenAI",
    status: "Active",
    parameters: 175e9,
    contextLength: 32,
    lastUpdated: "2024-03-15",
    favorite: false,
    quickStart: false
  },
  {
    id: "2",
    name: "Claude 3",
    provider: "Anthropic",
    status: "Ready",
    parameters: 200e9,
    contextLength: 200,
    lastUpdated: "2024-03-14",
    favorite: false,
    quickStart: false
  },
  {
    id: "3",
    name: "Gemini Pro",
    provider: "Google",
    status: "Ready",
    parameters: 150e9,
    contextLength: 32,
    lastUpdated: "2024-03-13",
    favorite: false,
    quickStart: false
  },
  {
    id: "4",
    name: "Llama 2",
    provider: "Meta",
    status: "Maintenance",
    parameters: 70e9,
    contextLength: 4,
    lastUpdated: "2024-03-12",
    favorite: false,
    quickStart: false
  },
  {
    id: "5",
    name: "Mistral",
    provider: "Mistral AI",
    status: "Ready",
    parameters: 7e9,
    contextLength: 8,
    lastUpdated: "2024-03-11",
    favorite: false,
    quickStart: false
  },
  {
    id: "6",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    status: "Ready",
    parameters: 200e9,
    contextLength: 1000,
    lastUpdated: "2024-05-14",
    favorite: false,
    quickStart: false
  },
  {
    id: "7",
    name: "Gemini 1.5 Flash",
    provider: "Google",
    status: "Ready",
    parameters: 50e9,
    contextLength: 2000,
    lastUpdated: "2024-09-24",
    favorite: false,
    quickStart: false
  },
  {
    id: "8",
    name: "GPT-4.5",
    provider: "OpenAI",
    status: "Ready",
    parameters: 300e9,
    contextLength: 128,
    lastUpdated: "2025-03-15",
    favorite: false,
    quickStart: false
  },
  {
    id: "9",
    name: "GPT-4.1",
    provider: "OpenAI",
    status: "Ready",
    parameters: 200e9,
    contextLength: 64,
    lastUpdated: "2025-04-01",
    favorite: false,
    quickStart: false
  },
  {
    id: "10",
    name: "Llama 4 Scout",
    provider: "Meta AI",
    status: "Ready",
    parameters: 70e9,
    contextLength: 32,
    lastUpdated: "2025-03-01",
    favorite: false,
    quickStart: false
  },
  {
    id: "11",
    name: "Llama 4 Maverick",
    provider: "Meta AI",
    status: "Ready",
    parameters: 400e9,
    contextLength: 64,
    lastUpdated: "2025-03-01",
    favorite: false,
    quickStart: false
  },
  {
    id: "12",
    name: "Claude 3.7",
    provider: "Anthropic",
    status: "Ready",
    parameters: 200e9,
    contextLength: 64,
    lastUpdated: "2025-01-15",
    favorite: false,
    quickStart: false
  },
  {
    id: "13",
    name: "Grok 3",
    provider: "xAI",
    status: "Ready",
    parameters: 100e9,
    contextLength: 128,
    lastUpdated: "2025-02-15",
    favorite: false,
    quickStart: false
  },
  {
    id: "14",
    name: "Grok 3 Mini",
    provider: "xAI",
    status: "Ready",
    parameters: 30e9,
    contextLength: 32,
    lastUpdated: "2025-02-15",
    favorite: false,
    quickStart: false
  },
  {
    id: "15",
    name: "DeepSeek R1",
    provider: "DeepSeek",
    status: "Ready",
    parameters: 100e9,
    contextLength: 32,
    lastUpdated: "2025-01-01",
    favorite: false,
    quickStart: false
  },
  {
    id: "16",
    name: "GPT-4o",
    provider: "OpenAI",
    status: "Active",
    parameters: 175e9,
    contextLength: 32,
    lastUpdated: "2024-03-15",
    favorite: false,
    quickStart: false
  },
]

export const createColumns = (toast: any, onConfigureClick?: (model: Model) => void): ColumnDef<Model>[] => [
  {
    id: "quickStart",
    header: () => <span className="sr-only">Quick Start</span>,
    cell: ({ row, table }) => (
      <div className="flex justify-center">
        <QuickStartCell row={row} table={table} toast={toast} />
      </div>
    ),
    size: 48,
    enableSorting: false,
  },
  {
    header: () => <div className="text-left font-medium">Model Name</div>,
    accessorKey: "name",
    cell: ({ row }) => (
      <span className="text-left font-medium block">{row.getValue("name")}</span>
    ),
    size: 200,
  },
  {
    header: () => <div className="text-left font-medium">Provider</div>,
    accessorKey: "provider",
    cell: ({ row }) => (
      <span className="text-left block">{row.getValue("provider")}</span>
    ),
    size: 150,
  },
  {
    header: () => <div className="text-left font-medium">Status</div>,
    accessorKey: "status",
    cell: ({ row }) => (
      <span className="text-left block pl-4">
        <Badge
          className={cn(
            row.getValue("status") === "Ready" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
            row.getValue("status") === "Active" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            row.getValue("status") === "Quick Start" && "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
            row.getValue("status") === "Inactive" && "bg-muted text-muted-foreground",
            row.getValue("status") === "Maintenance" && "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
          )}
        >
          {row.getValue("status")}
        </Badge>
      </span>
    ),
    size: 120,
  },
  {
    header: () => <div className="text-left font-medium">Parameters</div>,
    accessorKey: "parameters",
    cell: ({ row }) => {
      const params = row.getValue("parameters") as number
      return <span className="text-left block pl-7">{`${(params / 1e9).toFixed(1)}B`}</span>
    },
    size: 120,
  },
  {
    header: () => <div className="text-left font-medium">Context Length</div>,
    accessorKey: "contextLength",
    cell: ({ row }) => {
      const length = row.getValue("contextLength") as number
      return <span className="text-left block pl-4">{`${length}K tokens`}</span>
    },
    size: 120,
  },
  {
    header: () => <div className="text-left font-medium">Last Updated</div>,
    accessorKey: "lastUpdated",
    cell: ({ row }) => (
      <span className="text-left block pl-4">{row.getValue("lastUpdated")}</span>
    ),
    size: 120,
  },
  {
    id: "configure",
    header: () => <span className="sr-only">Configure</span>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button 
          variant="secondary" 
          size="sm"
          className="flex items-center gap-2 bg-muted hover:bg-muted/80"
          onClick={(e) => {
            e.stopPropagation()
            onConfigureClick?.(row.original)
          }}
        >
          <Settings2 className="h-4 w-4" />
          Configure
        </Button>
      </div>
    ),
    size: 120,
    enableSorting: false,
  }
] 