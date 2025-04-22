export interface Tag {
    id: string
    name: string
    count: number
  }
  
  export interface Theme {
    id: string
    title: string
    description: string
    colors: {
      primary: string
      secondary: string
      accent: string
      background: string
      foreground: string
    }
    tags: string[]
    createdAt: string
    variables?: {
      [key: string]: string
    }
  }
  

export const mockTags: Tag[] = [
  { id: "1", name: "Dark", count: 3 },
  { id: "2", name: "Light", count: 2 },
  { id: "3", name: "Modern", count: 4 },
  { id: "4", name: "Minimal", count: 2 },
  { id: "5", name: "Professional", count: 3 },
  { id: "6", name: "Creative", count: 2 },
  { id: "7", name: "Warm", count: 1 },
  { id: "8", name: "Cool", count: 1 },
  { id: "9", name: "High Contrast", count: 2 },
  { id: "10", name: "Pastel", count: 1 },
]

export const mockThemes: Theme[] = [
  {
    id: "1",
    title: "Midnight Blue",
    description: "A sleek dark theme with deep blue accents. Perfect for professional applications.",
    colors: {
      primary: "#3b82f6",
      secondary: "#1e40af",
      accent: "#60a5fa",
      background: "#0f172a",
      foreground: "#f8fafc",
    },
    tags: ["Dark", "Professional", "Modern"],
    createdAt: "last week",
  },
  {
    id: "2",
    title: "Sunrise",
    description: "A warm and inviting light theme with orange accents. Great for creative applications.",
    colors: {
      primary: "#f97316",
      secondary: "#c2410c",
      accent: "#fb923c",
      background: "#f8fafc",
      foreground: "#0f172a",
    },
    tags: ["Light", "Creative", "Warm"],
    createdAt: "2 days ago",
  },
  {
    id: "3",
    title: "Forest Green",
    description: "A nature-inspired theme with green tones. Ideal for environmental and health applications.",
    colors: {
      primary: "#22c55e",
      secondary: "#15803d",
      accent: "#4ade80",
      background: "#0f172a",
      foreground: "#f8fafc",
    },
    tags: ["Dark", "Professional", "High Contrast"],
    createdAt: "yesterday",
  },
  {
    id: "4",
    title: "Ocean Breeze",
    description: "A refreshing light theme with cool blue tones. Perfect for productivity applications.",
    colors: {
      primary: "#06b6d4",
      secondary: "#0891b2",
      accent: "#22d3ee",
      background: "#f8fafc",
      foreground: "#0f172a",
    },
    tags: ["Light", "Modern", "Cool"],
    createdAt: "3 days ago",
  },
  {
    id: "5",
    title: "Neon Dreams",
    description: "A vibrant theme with neon accents. Great for gaming and entertainment applications.",
    colors: {
      primary: "#a855f7",
      secondary: "#7e22ce",
      accent: "#c084fc",
      background: "#0f172a",
      foreground: "#f8fafc",
    },
    tags: ["Dark", "Creative", "High Contrast"],
    createdAt: "last week",
  },
]
