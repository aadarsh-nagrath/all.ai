"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState, useMemo } from "react"
import { ModelTable } from "./components/ModelTable"
import { ModelHeader } from "./components/ModelHeader"
import { ModelNavigation } from "./components/ModelNavigation"
import { ModelSidebar } from "./components/ModelSidebar"
import { ModelSearch } from "./components/ModelSearch"
import { ModelSettings } from "./components/ModelSettings"
import { Model, createColumns, dummyModels } from "./components/models"

export default function ModelSelection() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('')
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ])

  const [data, setData] = useState<Model[]>(dummyModels)
  const columns = useMemo(() => createColumns(toast), [toast])
  
  // Extract unique providers for the filter dropdown
  const availableProviders = useMemo(() => {
    const providers = new Set<string>()
    data.forEach(model => providers.add(model.provider))
    return Array.from(providers)
  }, [data])

  const filteredData = useMemo(() => {
    let filtered = data

    // Filter by tab
    if (activeTab === 'quickstart') {
      filtered = filtered.filter((model: Model) => model.quickStart)
    }
    
    // Filter by search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase()
      filtered = filtered.filter((model: Model) => 
        model.name.toLowerCase().includes(lowerSearchTerm) ||
        model.provider.toLowerCase().includes(lowerSearchTerm)
      )
    }
    
    // Filter by provider
    if (selectedProvider) {
      filtered = filtered.filter((model: Model) => model.provider === selectedProvider)
    }
    
    return filtered
  }, [data, activeTab, searchTerm, selectedProvider])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    state: {
      sorting,
    },
    meta: {
      updateData: (newData: Model[]) => {
        setData(newData)
      }
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <div className="container mx-auto px-4 pt-0 pb-2">
        <div className="flex items-center justify-between mb-0">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-foreground font-medium">Models</span>
            <span>/</span>
            <span className="text-foreground font-medium">Text Modal</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon">
              <span className="sr-only">More options</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <ModelHeader />
      <ModelNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content Sections */}
      <div className="p-4">
        {activeTab === 'settings' ? (
          <ModelSettings />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            <div className="space-y-4">
              <ModelSearch 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedProvider={selectedProvider}
                setSelectedProvider={setSelectedProvider}
                availableProviders={availableProviders}
              />
              <ModelTable table={table} columns={columns} />
            </div>
            <ModelSidebar />
          </div>
        )}
      </div>
    </div>
  )
}
