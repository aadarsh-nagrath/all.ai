import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { QuickStartCell } from "./QuickStartCell"

export type Model = {
  id: string
  name: string
  provider: string
  version: string
  status: "Active" | "Ready" | "Quick Start" | "Maintenance" | "Inactive"
  parameters: number
  contextLength: number
  lastUpdated: string
  favorite: boolean
  quickStart: boolean
}

export const dummyModels: Model[] = [
  {
    id: "1",
    name: "GPT-4",
    provider: "OpenAI",
    version: "4.0",
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
    version: "3.0",
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
    version: "1.0",
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
    version: "2.0",
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
    version: "7B",
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
    version: "1.5",
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
    version: "1.5",
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
    version: "4.5",
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
    version: "4.1",
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
    version: "4.0",
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
    version: "4.0",
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
    version: "3.7",
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
    version: "3.0",
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
    version: "3.0",
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
    version: "1.0",
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
    version: "4.0",
    status: "Active",
    parameters: 175e9,
    contextLength: 32,
    lastUpdated: "2024-03-15",
    favorite: false,
    quickStart: false
  },
]

export const createColumns = (toast: any): ColumnDef<Model>[] => [
  {
    id: "quickStart",
    header: "",
    cell: ({ row, table }) => <QuickStartCell row={row} table={table} toast={toast} />,
    size: 50,
    enableSorting: false,
  },
  {
    header: "Model Name",
    accessorKey: "name",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    size: 200,
  },
  {
    header: "Provider",
    accessorKey: "provider",
    size: 150,
  },
  {
    header: "Version",
    accessorKey: "version",
    size: 100,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
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
    ),
    size: 120,
  },
  {
    header: "Parameters",
    accessorKey: "parameters",
    cell: ({ row }) => {
      const params = row.getValue("parameters") as number
      return `${(params / 1e9).toFixed(1)}B`
    },
    size: 120,
  },
  {
    header: "Context Length",
    accessorKey: "contextLength",
    cell: ({ row }) => {
      const length = row.getValue("contextLength") as number
      return `${length}K tokens`
    },
    size: 120,
  },
  {
    header: "Last Updated",
    accessorKey: "lastUpdated",
    size: 120,
  }
] 