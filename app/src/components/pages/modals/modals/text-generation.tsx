"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState, useMemo, useEffect } from "react"
import { ModelTable } from "./components/ModelTable"
import { ModelHeader } from "./components/ModelHeader"
import { ModelNavigation } from "./components/ModelNavigation"
import { ModelSearch } from "./components/ModelSearch"
import { ModelSettings } from "./components/ModelSettings"
import { Model, createColumns, dummyModels } from "./components/models"

const ToggleHeader = ({ activeSection, setActiveSection }: { activeSection: 'performance' | 'info', setActiveSection: (section: 'performance' | 'info') => void }) => {
  return (
    <div className="flex border-b bg-card rounded-t-lg">
      <button
        className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
          activeSection === 'performance'
            ? 'border-b-2 border-primary text-primary bg-primary/5'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }`}
        onClick={() => setActiveSection('performance')}
      >
        <div className="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M12 20V10"/>
            <path d="M18 20V4"/>
            <path d="M6 20v-4"/>
          </svg>
          Performance
        </div>
      </button>
      <button
        className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
          activeSection === 'info'
            ? 'border-b-2 border-primary text-primary bg-primary/5'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }`}
        onClick={() => setActiveSection('info')}
      >
        <div className="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
          Info
        </div>
      </button>
    </div>
  )
}

export default function ModelSelection() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('')
  const [activeSection, setActiveSection] = useState<'performance' | 'info'>('performance')
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

  useEffect(() => {
    async function fetchModels() {
      try {
        const res = await fetch("/api/models/list");
        if (!res.ok) throw new Error("Failed to fetch models");
        const apiModels = await res.json();
        
        // Get saved quick start models from localStorage
        let savedQuickStartIds: string[] = [];
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('quick_start_models');
          if (saved) {
            try {
              savedQuickStartIds = JSON.parse(saved);
            } catch (e) {
              console.warn('Failed to parse saved quick start models:', e);
            }
          }
        }
        
        // Map API data to Model type
        const mapped = apiModels.map((m: any) => {
          let status = "Ready";
          if (m.status) {
            const s = m.status.toLowerCase();
            if (s === "active") status = "Active";
            else if (s === "inactive") status = "Inactive";
            else if (s === "maintenance") status = "Maintenance";
            else if (s === "quick_start" || s === "quick start") status = "Quick Start";
            else status = "Ready";
          }
          
          const modelId = m._id;
          const isQuickStart = status === "Quick Start" || savedQuickStartIds.includes(modelId);
          
          return {
            id: modelId,
            name: m.model_name,
            provider: Array.isArray(m.provider) && m.provider.length > 0 ? m.provider[0].name : "",
            status: isQuickStart ? "Quick Start" : status,
            parameters: Number(m.parameters?.replace(/[^\d.]/g, "")) * 1e9 || 0,
            contextLength: Number(m.context_length?.replace(/[^\d.]/g, "")) || 0,
            lastUpdated: m.last_updated ? new Date(m.last_updated).toISOString().slice(0, 10) : "",
            favorite: false,
            quickStart: isQuickStart,
          }
        })
        setData(mapped)
      } catch {
        // Optionally show a toast
        toast({ title: "Error", description: "Could not load models", variant: "destructive" })
      }
    }
    fetchModels()
  }, [toast])

  // Listen for quick start updates from other tabs
  useEffect(() => {
    const handleQuickStartUpdate = () => {
      // Refresh the data to sync with localStorage changes
      setData(prevData => {
        const saved = localStorage.getItem('quick_start_models');
        if (!saved) return prevData;
        
        try {
          const savedQuickStartIds = JSON.parse(saved);
          return prevData.map(model => ({
            ...model,
            quickStart: savedQuickStartIds.includes(model.id),
            status: savedQuickStartIds.includes(model.id) ? "Quick Start" : 
              (model.status === "Active" ? "Active" : 
               model.status === "Maintenance" ? "Maintenance" : "Ready")
          }));
        } catch (e) {
          console.warn('Failed to parse saved quick start models:', e);
          return prevData;
        }
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('quickstart-updated', handleQuickStartUpdate);
      return () => {
        window.removeEventListener('quickstart-updated', handleQuickStartUpdate);
      };
    }
  }, []);

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
          <>
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
              <div className="space-y-4">
                <ToggleHeader activeSection={activeSection} setActiveSection={setActiveSection} />
                {activeSection === 'performance' ? (
                  <div className="bg-card rounded-b-lg border border-t-0">
                    <div className="p-6 space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                            <path d="M12 20V10"/>
                            <path d="M18 20V4"/>
                            <path d="M6 20v-4"/>
                          </svg>
                          Usage & Limits
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-muted/50 rounded-lg p-4">
                            <div className="text-sm text-muted-foreground">Current Usage</div>
                            <div className="text-2xl font-semibold mt-1">2,450</div>
                            <div className="text-xs text-muted-foreground mt-1">tokens used today</div>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-4">
                            <div className="text-sm text-muted-foreground">Daily Limit</div>
                            <div className="text-2xl font-semibold mt-1">10,000</div>
                            <div className="text-xs text-muted-foreground mt-1">tokens remaining</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                          </svg>
                          Performance Metrics
                        </h3>
                        <div className="space-y-3">
                          <div className="bg-muted/50 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-muted-foreground">Response Time</div>
                              <div className="text-sm font-medium">245ms</div>
                            </div>
                            <div className="h-2 bg-muted rounded-full mt-2">
                              <div className="h-2 bg-primary rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-muted-foreground">Success Rate</div>
                              <div className="text-sm font-medium">99.8%</div>
                            </div>
                            <div className="h-2 bg-muted rounded-full mt-2">
                              <div className="h-2 bg-primary rounded-full" style={{ width: '99.8%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-card rounded-b-lg border border-t-0">
                    <div className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                              <path d="m9 12 2 2 4-4"/>
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Advanced Language Model</h4>
                            <p className="text-sm text-muted-foreground mt-1">State-of-the-art text generation model optimized for various use cases, from creative writing to technical documentation.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-muted/50 rounded-lg p-4">
                            <h4 className="text-sm font-medium mb-2">Key Features</h4>
                            <ul className="text-sm text-muted-foreground space-y-2">
                              <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                                  <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                Context-aware responses
                              </li>
                              <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                                  <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                Multi-language support
                              </li>
                              <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                                  <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                Code understanding
                              </li>
                            </ul>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-4">
                            <h4 className="text-sm font-medium mb-2">Best Practices</h4>
                            <ul className="text-sm text-muted-foreground space-y-2">
                              <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                                  <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                Clear prompt structure
                              </li>
                              <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                                  <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                Context management
                              </li>
                              <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                                  <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                Regular validation
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4">
                          <h4 className="text-sm font-medium mb-2">Use Cases</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                                <polyline points="14 2 14 8 20 8"/>
                              </svg>
                              Content Creation
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                                <path d="m18 15-6-6-6 6"/>
                              </svg>
                              Code Generation
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                              </svg>
                              Chat Support
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                              </svg>
                              Data Analysis
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="relative overflow-hidden rounded-lg border bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 dark:from-indigo-500/30 dark:via-purple-500/30 dark:to-pink-500/30 p-3">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent)]" />
                  <div className="relative flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-white/10 dark:bg-white/5 p-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-indigo-500 dark:text-indigo-400">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-indigo-950 dark:text-indigo-100">Upgrade to Premium</h3>
                        <p className="text-xs text-indigo-700/70 dark:text-indigo-300/70">Get unlimited tokens & priority support</p>
                      </div>
                    </div>
                    <button className="inline-flex items-center justify-center rounded-md bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500">
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
