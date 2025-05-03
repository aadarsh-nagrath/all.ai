import React, { useState, useRef, useEffect } from "react"
import { Search, Filter, Check, ChevronDown } from "lucide-react"

interface ModelSearchProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedProvider: string
  setSelectedProvider: (provider: string) => void
  availableProviders: string[]
}

export function ModelSearch({ 
  searchTerm, 
  setSearchTerm, 
  selectedProvider, 
  setSelectedProvider,
  availableProviders
}: ModelSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      {/* Search Bar */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stylish Provider Filter */}
      <div className="relative min-w-[220px]" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full p-2.5 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-blue-800"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span>{selectedProvider || "All Providers"}</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800 animate-in fade-in slide-in-from-top-5 duration-300 max-h-60 overflow-y-auto">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <button
                  onClick={() => {
                    setSelectedProvider("")
                    setIsOpen(false)
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    selectedProvider === "" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : ""
                  }`}
                >
                  <span>All Providers</span>
                  {selectedProvider === "" && <Check className="w-4 h-4" />}
                </button>
              </li>
              {availableProviders.map((provider) => (
                <li key={provider}>
                  <button
                    onClick={() => {
                      setSelectedProvider(provider)
                      setIsOpen(false)
                    }}
                    className={`flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      selectedProvider === provider ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  >
                    <span>{provider}</span>
                    {selectedProvider === provider && <Check className="w-4 h-4" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
} 