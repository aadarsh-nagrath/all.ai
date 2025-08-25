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

  export interface ThemeStyle {
    id: string
    title: string
    description: string
    styles: {
      borderRadius: string
      boxShadow: string
      spacing: string
      typography: {
        fontFamily: string
        fontSize: string
        lineHeight: string
      }
    }
    tags: string[]
    createdAt: string
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

export const mockThemeStyles: ThemeStyle[] = [
  {
    id: "1",
    title: "Modern Minimal",
    description: "Clean and contemporary design system with subtle shadows and rounded corners.",
    styles: {
      borderRadius: "0.5rem",
      boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      spacing: "1rem",
      typography: {
        fontFamily: "Inter, sans-serif",
        fontSize: "1rem",
        lineHeight: "1.5",
      }
    },
    tags: ["Modern", "Minimal", "Professional"],
    createdAt: "last week",
  },
  {
    id: "gradient",
    title: "Gradient",
    description: "Animated multi-color gradient background for the workspace.",
    styles: {
      borderRadius: "0.5rem",
      boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.25)",
      spacing: "1rem",
      typography: {
        fontFamily: "Inter, sans-serif",
        fontSize: "1rem",
        lineHeight: "1.5",
      }
    },
    tags: ["Creative", "Vivid", "Animated"],
    createdAt: "today",
  },
  {
    id: "2",
    title: "Bold & Playful",
    description: "Energetic design system with dramatic shadows and dynamic spacing.",
    styles: {
      borderRadius: "1rem",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      spacing: "1.5rem",
      typography: {
        fontFamily: "Poppins, sans-serif",
        fontSize: "1.125rem",
        lineHeight: "1.75",
      }
    },
    tags: ["Creative", "Bold", "Playful"],
    createdAt: "2 days ago",
  },
  {
    id: "3",
    title: "Classic Elegance",
    description: "Timeless design system with refined proportions and subtle details.",
    styles: {
      borderRadius: "0.25rem",
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      spacing: "0.75rem",
      typography: {
        fontFamily: "Merriweather, serif",
        fontSize: "1rem",
        lineHeight: "1.6",
      }
    },
    tags: ["Classic", "Elegant", "Professional"],
    createdAt: "yesterday",
  },
  {
    id: "4",
    title: "Tech Futuristic",
    description: "Cutting-edge design system with sharp edges and modern typography.",
    styles: {
      borderRadius: "0.375rem",
      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      spacing: "1.25rem",
      typography: {
        fontFamily: "Space Grotesk, sans-serif",
        fontSize: "1rem",
        lineHeight: "1.4",
      }
    },
    tags: ["Modern", "Tech", "Futuristic"],
    createdAt: "3 days ago",
  },
  {
    id: "5",
    title: "Organic Flow",
    description: "Natural design system with fluid shapes and comfortable spacing.",
    styles: {
      borderRadius: "0.75rem",
      boxShadow: "0 2px 4px 0 rgb(0 0 0 / 0.05)",
      spacing: "1.25rem",
      typography: {
        fontFamily: "Outfit, sans-serif",
        fontSize: "1.125rem",
        lineHeight: "1.6",
      }
    },
    tags: ["Organic", "Natural", "Comfortable"],
    createdAt: "last week",
  },
]
