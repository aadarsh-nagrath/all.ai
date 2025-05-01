import { BookOpen, Star } from "lucide-react"

interface ModelNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function ModelNavigation({ activeTab, setActiveTab }: ModelNavigationProps) {
  return (
    <div className="border-b">
      <div>
        <nav className="flex border-b">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-3 text-sm ${
              activeTab === 'all' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <BookOpen className="h-4 w-4 mr-2 inline-block" />
            All Models
          </button>
          <button
            onClick={() => setActiveTab('quickstart')}
            className={`px-4 py-3 text-sm ${
              activeTab === 'quickstart' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Star className="h-4 w-4 mr-2 inline-block" />
            Quick Start
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-3 text-sm ${
              activeTab === 'settings' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Settings
          </button>
        </nav>
      </div>
    </div>
  )
} 