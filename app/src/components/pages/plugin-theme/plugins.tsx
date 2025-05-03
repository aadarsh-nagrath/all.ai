"use client"

import { Search, ExternalLink, Settings, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import React from "react"

type Category = 'Marketing' | 'Development' | 'Productivity' | 'E-commerce' | 'Analytics' | 'Communication'

interface Integration {
  name: string
  description: string
  logo: string
  isActive: boolean
  category: Category
}

const integrations: Integration[] = [
  { 
    name: 'Google Adwords', 
    description: 'Manage and optimize your Google Ads campaigns with real-time analytics and performance tracking.', 
    logo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMHBhMTBxITEhUVGBcXEBIYGBUYGBsVFx0aFxUXGhYdHigsGBslHRYXLTEiMSkwLi4uFyEzODM4OigtLi8BCgoKDg0OGxAQGy0mHyYrKy8xNS0tLS8tLjAyLS0vLS8tLS0tLS0tLS0yNS0tLS0tLS0tLTU1LS0tLTUtLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcBBAUCA//EADsQAAIBAQUEBQkIAgMAAAAAAAABAgMEBREhMQZBUWESEyJxgQcUMkKRobHB0RUjUmJygpLwJDNDc8L/xAAbAQEAAgMBAQAAAAAAAAAAAAAABAUCAwYBB//EADERAQACAQIDBQYGAwEAAAAAAAABAgMEEQUhMRITQZHRIjJhgaGxFFFxweHwBkJD8f/aAAwDAQACEQMRAD8AvEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHLvvaCz3HTTvGoot+jBYub7orPDnobMWG+Sdqw1Zc1MUb2lDbX5U4xn/hWWUlxnNQf8UpfEn14bb/a37+iBbidf9a/36vFn8qmM/8AKsjS4xqYv+LiviLcNnws8rxON/ar9f8AxLrh2qs1+vCxVMJ6ulNdGfPBet3pshZdPkxe9Cfi1GPL7su2aW4AAAAAAAAAAAAAAAAAAAAAAAAAACM7cbULZ6wJUMJVqmKpReiS1nJcFuW9+JJ0unnNb4R1RdVqYw1+M9FMWq0ztdolO1Sc5yeMpN4tv+7txf1pWkbVjkoLXtee1aeb5GTEAzCThNODaaeMWm001o01o+Z5MRaNpexMxO8Lc8nu1rvmm6F4v76CxjPJdZBav9S38deOFFrNN3U716SvdHqu9ja3WPqmpDTQAAAAAAAAAAAAAAAAAAAAAAAA81JqnBubwSWLfJankzERvJEb8lC7VXq76v6rVnpj0aa4QjlH25vvkzodHSK4a/GN/NzusyTfNb4cvJySUjAAABs3ZbpXZeFOtZvSpyUlzw1i+TWKfJmvLjjJSay2Ysk47xaPBf8AdluhedghVsrxjOKlH5p808U+aObvSaWms9YdLS8XrFo6S2jFkAAAAAAAAAAAAAAAAAAAAAAAODtNbcIKlS1ec+71V4v4cyo4rqexWMUdZ6/p/KdosPantz4fdRUPQR9ArttGzhp335snoAAAACwfJVf3UWmVktL7M8Z0OU/Xj4pYrmnxKviGDl3kfNacOz7T3c/JaJUrcAAAAAAAAAAAAAAAAAAAAAA+NrtCstnlOpol7eC728PaYZMlcdJvbpDKtZtaKwhVaq69Zyq6yeL+ncvkcXny2zXm9vFf4scY6xWFaXvZXYrzqQenSbj+mWcfc/cfUOFaqNTpKX8dtp/WOU+rgOI4Jwam9PjvH6Tz/hplihAAAAA90asqFaM6DcZRalCS1Uk8U/aY2rFomJ6Pa2msxMdV9bMXzG/bmhWhgm8qkfw1F6S7t65NHOZsU4rzWXS4MsZaRaHVNTaAAAAAAAAAAAAAAAAAAAAAjO0dt66uqcHlHOX6uHgvjyOf4vqt5jDX9Z/aFnocP/Sfk45RrJH9rru85snW0l2qfpc4b/Zr7TpP8b4h+Hz9zefZv9J8PPp5KLjmi77F3tfer9Y8fVCz6E4wAAAAACXeTe/vsm+eqrvClXwi+EanqS5Y44PvXAga/B26duOsfZO0GfsX7E9J+65CkXoAAAAAAAAAAAAAAAAAAAGpels8ysjlv0guMnp834GjU54wY5vP9lsw45yXisIY3i8ZZt5t8W9WcZa02tNrdZX9axWNoDFkw1isxE7PFeX7d32beDjH0X2qf6Xu8NPZxPp/BuIfjNNFre9HKfX5+rgeKaP8LnmI92eceny9HPLdXAAAAAAXbsFf325ci6541aWEK3F5dmf7kvamc9qsHdZNvCejodJn73HvPWOqSkZKAAAAAAAAAAAAAAAAAABEb8tvndswg+zDFR5v1n7vdzOX4pqu8ydivSv3/vJcaLD2Kdqes/Zzys25bpm4ePQDlbRXd9o3e+rWM4dqnz4x8V78C34LxD8HqYtM+zPKfX5K3iui/FYJiPejnHp80APpzgQ9HuC+8XWaZewxmeXJ7Ec+b610lDPBPdp8jGu+7K22zXNjAA7mx1+O4b7jUk/u5diuvyP1u+Lwfdit5F1eHvce0dY6JOkz91k3npPVesZKUcY5p6M590TIAAAAAAAAAAAAAAAABx9p72jdV3tylhKWUcNebS4/UiazNOPH7PvTyj1+TKtqV9vJO1Y/u3zVpaL3nWlhS+7jwWvLP6FHi0tK87c5Q9TxrNknbF7Nfr/f0acpuf8AsbefFv3kqIiFZbNkt71p85e6NonSn93OSw5vDDPVaGM46W6w2YtZnxz7N58/V1bDfPSl0bXguE1p48O8h5dLt7VF9ouMxknsZuU/n4fw7BD2/Ne7oXtLd/mtu6UF2KmL7pZdJeOb9vA73/H+Id/g7q0+1T6x4eXTycfxnR91m7dfdt9/56uJHsQx/u7D5nQ9ZUnSHt+j+3+5YnkPWGsH4fX6AJZrwx+P0BI8FTy/vMeJ4Pk1hqZxLCYWz5L7+8/ux2e0P7yiuxzpaR/i8u7olJrsHYv2o6T915oM/bp2J6x9k4IKeAAAAAAAAAAAAAAAYbwWYFQbS3s74vaU0+wuzSX5Fv728/FLcU+oyd5ffwUepzzlt8I6OUaEZnEPQPBvF5gd64LZ1kHTqaxWMX+Xh4fPkV+rx7T24dZwTWzlpOG/WOn6fw3L1sSt9glCWTecZcJLR/Xk2OH6y2k1FctfDrH5x4wtNbpq6jDbHPj0+E+Cuq1OVGq4V04yi3GUXqmsmj6vS0WrFo6S+d2rNZms9YeMcj1iYgZxAY5AYA3rjvSdzXrTrWfWD7UfxReUo+K9+D3GvNijLSay24cs4rxeF/WO0xtllhUs7xjOKlF8VJYr4nNzExO0ulrMWjeH2PHoAAAAAAAAAAAAADkbXWnzTZuvKOTcein+tqH/AKNWe3ZxzLTqLdnFafgqEpVAAAAADauyp1V4U2vxJfy7PzNWeu+OYT+F5JpqqT+c7eafXFYvO7ZjNdmGDfN+qvn4czDhWm7zJ3lulfv/AA63W5uzXsx1n7I55Vbh6m0RtdmXZnhCvynpCfilg+ajxO84fn/5z8nI8Rwf9I+f7K9LVVgAAAAAXJ5LbW7Tsqoyz6qpOn4ZTXumih11Ozmn4819oL9rDHw5JcQ00AAAAAAAAAAAAABxNtKLr7MV1Hcoy8ISjN+6Jp1Eb4paNVXfFaFSlMoQAAAAbN3U3VvCkoLFuccFxweOHuMb1m1ZrHWeXmmaCN9TTfwnfy5rhuyyKxWRR36zfGT1/vBIutNgjDjikL3LknJebS9XlYYXlYJ0rUsYTi4y8d64NPNPiiTW01mLR1ab1i1ZrPSVA3td87qvKpRtXpQeGPFaxkuTTT8TpMWSMlItDmsuOcd5pPg1DY1gAAAAt/yT2d0dl3J/8lWcl3JRp/GDKLiFt8235RC94fXbDv8AnMpmQk4AAAAAAAAAAAAAB4rU1WpONRYqSakuKeTQmN3kxvyU1fF2yum8Z0q2PZ9GX4oP0Zf3emiky45x2mFBmxTjvNZaRragAAAmvk8ubrK7tNdZRxjR5y0lLwWXi+BP0eL/AHn5LPQYpjfJP6QsAsFkAQLypXB55YlarKsZ0lhVS30tcf2vHwb4FhoM/Yt2J6T91dxDB269uOsfZVRdKUAAANiwWOd4W2FKyLpTm+jFfN8ksW+SZhkvFKzaekMsdJvaK16yv66LBG67sp0aOlOKjjxa1k+beL8Tm73m9ptPi6bHSKViseDcMGYAAAAAAAAAAAAAAByNorhhflmwqdmcf9dRLNcmt8XwNWXDXJG0tOfBXLXaVZXtcta6KjVsg1HdUWcH+7d3PBlVkwXp1hT5dPfH1jk5xqaGVnLBavRB7HPklGz2xtS3zU7yTpU/wvKcuWHqrm8+C3kzDpLW535QnYNFa3O/KPqsihRjZ6KhQioxikoxWSSWiLKIiI2haxERG0PoevQDDWKzArDa7yezpVZVbgXSi85UMk48ehxj+XVbsdFa6bXxt2cnn6qnU6Cd+1j8vRX9am6FVxrxcZLWMk013p6FnW0WjeFXaJrO08nkyeN+6Lnr3zW6N205T4y0gv1TeS+Jpy56Yo9qfVtxYL5Z9mPRbmxuyENnaXSqtVK8lhOe6K/DDlxerw8Cl1Oqtmn4LvTaWuGN+spORUsAAAAAAAAAAAAAAAAAMNYrMDn1bistaWNSz0W+PQj9DCcVJ6xDXOLHPOax5PvZbuo2N/4lKnT5xjGL9qR7Wla9IZVpWvSNm0ZMgAAAAANa2WClboYW2lTqLhOMZfFGVbTXnEsbVraNpjdp09mrHTnjCyWdP/rh9DOc+SeU2nzYRgxRziseTpwgqcEqaSS0SyXsNTa9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/Z', 
    isActive: true, 
    category: 'Marketing' 
  },
  { 
    name: 'Facebook', 
    description: 'Connect your Facebook business account to manage ads, pages, and audience insights.', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png', 
    isActive: false, 
    category: 'Marketing' 
  },
  { 
    name: 'Dropbox', 
    description: 'Sync and share files seamlessly with cloud storage integration.', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/1200px-Dropbox_Icon.svg.png', 
    isActive: true, 
    category: 'Productivity' 
  },
  { 
    name: 'Github', 
    description: 'Integrate with your GitHub repositories for version control and collaboration.', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png', 
    isActive: false, 
    category: 'Development' 
  },
  { 
    name: 'Google Analytics', 
    description: 'Track website traffic, user behavior, and conversion metrics in real-time.', 
    logo: 'https://www.gstatic.com/images/branding/product/2x/analytics_48dp.png', 
    isActive: true, 
    category: 'Analytics' 
  },
  { 
    name: 'Mailchimp', 
    description: 'Sync your email marketing campaigns and subscriber lists for better engagement.', 
    logo: 'data:image/png;base64,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', 
    isActive: false, 
    category: 'Marketing' 
  },
  { 
    name: 'Slack', 
    description: 'Connect your workspace to streamline team communication and notifications.', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1200px-Slack_icon_2019.svg.png', 
    isActive: false, 
    category: 'Communication' 
  },
  { 
    name: 'Shopify', 
    description: 'Integrate your e-commerce store to manage products, orders, and customer data.', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/1200px-Shopify_logo_2018.svg.png', 
    isActive: false, 
    category: 'E-commerce' 
  },
  { 
    name: 'Instagram', 
    description: 'Connect your Instagram business account to manage posts and track engagement.', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png', 
    isActive: true, 
    category: 'Marketing' 
  },
  { 
    name: 'Google Calendar', 
    description: 'Sync your calendar events and schedule meetings across platforms.', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/1200px-Google_Calendar_icon_%282020%29.svg.png', 
    isActive: false, 
    category: 'Productivity' 
  },
  { 
    name: 'Asana', 
    description: 'Manage projects and tasks with seamless integration to your workspace.', 
    logo: 'https://cdn.worldvectorlogo.com/logos/asana-1.svg', 
    isActive: false, 
    category: 'Productivity' 
  },
  { 
    name: 'Stripe', 
    description: 'Process payments and manage subscriptions with secure payment integration.', 
    logo: 'https://cdn.worldvectorlogo.com/logos/stripe-2.svg', 
    isActive: true, 
    category: 'E-commerce' 
  },
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
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:bg-red-400 dark:text-white dark:border-red-400 dark:hover:bg-red-500"
            >
              Remove
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

  const categories: (Category | 'All')[] = ['All', 'Marketing', 'Development', 'Productivity', 'E-commerce', 'Analytics', 'Communication'];

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
      </div>

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