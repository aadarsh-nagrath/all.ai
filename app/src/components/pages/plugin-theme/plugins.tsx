"use client"

import { Search, ExternalLink, Settings, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
// import Link from "next/link"
import Image from "next/image"
import React from "react"

type Category = 'Search' | 'AI' | 'Productivity' | 'Development' | 'Communication' | 'Document' | 'Data'

interface Integration {
  name: string
  description: string
  logo: string
  isActive: boolean
  category: Category
}

const integrations: Integration[] = [
  { 
    name: 'Web Search', 
    description: 'Search for information from the internet in real-time using Google Search.', 
    logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', 
    isActive: true, 
    category: 'Search' 
  },
  { 
    name: 'DALL-E 3', 
    description: 'Generate images using DALL-E 3 based on image descriptions.', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png', 
    isActive: true, 
    category: 'AI' 
  },
  { 
    name: 'Simple Calculator', 
    description: 'Calculate a math expression. For example, "2 + 2" or "2 * 2".', 
    logo: 'https://cdn-icons-png.flaticon.com/512/123/123456.png', 
    isActive: true, 
    category: 'Productivity' 
  },
  { 
    name: 'Interactive Canvas', 
    description: 'Render an interactive canvas with HTML source to the user interface.', 
    logo: 'https://cdn-icons-png.flaticon.com/512/123/123456.png', 
    isActive: true, 
    category: 'Development' 
  },
  { 
    name: 'Render Chart', 
    description: 'Generate a Chart.js chart', 
    logo: 'https://www.chartjs.org/img/logo.svg', 
    isActive: true, 
    category: 'Data' 
  },
  { 
    name: 'GPT Image Editor', 
    description: 'Generate a new image or edit an existing image as requested by the user.', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png', 
    isActive: true, 
    category: 'AI' 
  },
  { 
    name: 'Perplexity Search', 
    description: 'Search for information from the internet using Perplexity.', 
    logo: 'https://www.perplexity.ai/favicon.ico', 
    isActive: true, 
    category: 'Search' 
  },
  { 
    name: 'Stable Diffusion v2 Image', 
    description: 'Generate images using Stable Diffusion based on a text description.', 
    logo: 'https://stability.ai/favicon.ico', 
    isActive: true, 
    category: 'AI' 
  },
  { 
    name: 'Stable Diffusion v3 Image', 
    description: 'Generate images using Stable Diffusion v3 based on a text description.', 
    logo: 'https://stability.ai/favicon.ico', 
    isActive: true, 
    category: 'AI' 
  },
  { 
    name: 'Image Search', 
    description: 'Search for images from the internet in real-time using Google Search.', 
    logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', 
    isActive: true, 
    category: 'Search' 
  },
  { 
    name: 'Web Page Reader', 
    description: 'Read the content of a web page via its URL.', 
    logo: 'https://cdn-icons-png.flaticon.com/512/123/123456.png', 
    isActive: true, 
    category: 'Productivity' 
  },
  { 
    name: 'Market News', 
    description: 'Fetches market news articles from Alpha Vantage.', 
    logo: 'https://www.alphavantage.co/favicon.ico', 
    isActive: true, 
    category: 'Data' 
  },
  { 
    name: 'JavaScript Interpreter', 
    description: 'Execute a JavaScript code snippet that evaluates to a readable value or a Promise.', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png', 
    isActive: true, 
    category: 'Development' 
  },
  { 
    name: 'Mermaid Diagram', 
    description: 'Generate a diagram using Mermaid.js (version 10.x).', 
    logo: 'https://mermaid.js.org/img/logo.svg', 
    isActive: true, 
    category: 'Development' 
  },
  { 
    name: 'Azure AI Search', 
    description: 'Search the internal training data for relevant information.', 
    logo: 'https://azure.microsoft.com/favicon.ico', 
    isActive: true, 
    category: 'Search' 
  },
  { 
    name: 'Render HTML', 
    description: 'Render a HTML source to the user interface that will be shown to the users for interactive contents.', 
    logo: 'https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png', 
    isActive: true, 
    category: 'Development' 
  },
  { 
    name: 'Slack Message Notifier', 
    description: 'This function sends an authorized user\'s message to a specific Slack channel via an HTTP action.', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1200px-Slack_icon_2019.svg.png', 
    isActive: true, 
    category: 'Communication' 
  },
  { 
    name: 'Google Calendar', 
    description: 'Return the next 10 events in the current user Google\'s calendar starting from a specific time range', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/1200px-Google_Calendar_icon_%282020%29.svg.png', 
    isActive: true, 
    category: 'Productivity' 
  },
  { 
    name: 'Slack Webhook Message Notifier', 
    description: 'This function sends a message to a Slack channel via an incoming webhook', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1200px-Slack_icon_2019.svg.png', 
    isActive: true, 
    category: 'Communication' 
  },
  { 
    name: 'Firecrawl Web Page Reader', 
    description: 'Retrieves the content of a web page by scraping it using the Firecrawl API', 
    logo: 'https://cdn-icons-png.flaticon.com/512/123/123456.png', 
    isActive: true, 
    category: 'Productivity' 
  },
  { 
    name: 'Send email with Zapier', 
    description: 'Send an email to a specific email address with title and text content using Zapier webhook', 
    logo: 'https://zapier.com/favicon.ico', 
    isActive: true, 
    category: 'Communication' 
  },
  { 
    name: 'PowerPoint Generator', 
    description: 'Generate a PowerPoint file and return the URL for downloading it.', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Microsoft_Office_PowerPoint_%282019%E2%80%93present%29.svg/1200px-Microsoft_Office_PowerPoint_%282019%E2%80%93present%29.svg.png', 
    isActive: true, 
    category: 'Document' 
  },
  { 
    name: 'Word Generator', 
    description: 'Generate a Word document based on the given sections, title, header, and footer, and return the URL for downloading it.', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg/1200px-Microsoft_Office_Word_%282019%E2%80%93present%29.svg.png', 
    isActive: true, 
    category: 'Document' 
  }
] as const;

interface IntegrationCardProps {
  name: string
  description: string
  logo: string
  isActive: boolean
}

function IntegrationCard({ name, description, logo, isActive: initialIsActive }: IntegrationCardProps) {
  const [isActive, setIsActive] = React.useState(initialIsActive);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={logo || "/placeholder.svg"}
                alt={`${name} logo`}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">Open {name}</span>
          </Button>
        </div>
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Settings className="h-3.5 w-3.5" />
              Configure
            </Button>
          </div>
          <Switch 
            checked={isActive} 
            onCheckedChange={handleToggle}
            className={`data-[state=checked]:bg-green-500`}
          />
        </div>
      </div>
    </div>
  )
}

export default function Plugins() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<Category | 'All'>('All');
  const [showFilter, setShowFilter] = React.useState(false);

  const categories: (Category | 'All')[] = ['All', 'Search', 'AI', 'Productivity', 'Development', 'Communication', 'Document', 'Data'];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 pt-0 pb-2">
      <div className="flex items-center justify-between mb-0">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-foreground font-medium">Plugin</span>
          <span>/</span>
          <span className="text-foreground font-medium">Integrations</span>
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
{/* 
      <div className="mb-8">
        <nav className="flex border-b">
          <Link href="/settings/profile" className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground">
            Profile
          </Link>
          <Link href="/settings/security" className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground">
            Security & Login
          </Link>
          <Link href="/settings/integrations" className="px-4 py-3 text-sm border-b-2 border-black font-medium">
            Integrations
          </Link>
        </nav>
      </div> */}

      <h1 className="text-xl font-semibold mb-4">All Integrations</h1>

      <div className="flex justify-between mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search" 
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setShowFilter(!showFilter)}
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          {showFilter && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedCategory === category
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowFilter(false);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIntegrations.map((integration, index) => (
          <IntegrationCard
            key={index}
            name={integration.name}
            description={integration.description}
            logo={integration.logo}
            isActive={integration.isActive}
          />
        ))}
      </div>
    </div>
  );
}