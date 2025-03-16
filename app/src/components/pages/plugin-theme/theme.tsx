// app/theme-selection/page.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { Search, Sliders, ArrowLeft, ArrowRight, Eye, Check } from "lucide-react";

// Define theme types
type Theme = {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string; // URL or gradient
};

// Mock themes
const themes: Theme[] = [
  // Dark Themes
  { id: "dark-moody", name: "Dark & Moody", description: "Sleek and modern.", category: "Dark", preview: "linear-gradient(135deg, #0f172a, #1e293b)" },
  { id: "midnight", name: "Midnight", description: "Deep and mysterious.", category: "Dark", preview: "linear-gradient(135deg, #1e3a8a, #0c4a6e)" },
  { id: "obsidian", name: "Obsidian", description: "Elegant and bold.", category: "Dark", preview: "linear-gradient(135deg, #1c1c1c, #3d3d3d)" },
  { id: "shadow", name: "Shadow", description: "Dark and intense.", category: "Dark", preview: "linear-gradient(135deg, #2d3748, #4a5568)" },
  { id: "shadowing", name: "Shadow", description: "Dark and intense.", category: "Dark", preview: "linear-gradient(135deg, #2d3748, #4a5568)" },

  // Light Themes
  { id: "light-airy", name: "Light & Airy", description: "Clean and minimalist.", category: "Light", preview: "linear-gradient(135deg, #ffffff, #f3f4f6)" },
  { id: "cloudy", name: "Cloudy", description: "Soft and calming.", category: "Light", preview: "linear-gradient(135deg, #f0f4f8, #d9e2ec)" },
  { id: "sunrise", name: "Sunrise", description: "Warm and inviting.", category: "Light", preview: "linear-gradient(135deg, #ffecd2, #fcb69f)" },
  { id: "pastel", name: "Pastel", description: "Soft and soothing.", category: "Light", preview: "linear-gradient(135deg, #fbcfe8, #a5b4fc)" },

  // Vibrant Themes
  { id: "sunset-vibes", name: "Sunset Vibes", description: "Warm and vibrant.", category: "Vibrant", preview: "linear-gradient(135deg, #f97316, #fb923c)" },
  { id: "neon-dreams", name: "Neon Dreams", description: "Bold and futuristic.", category: "Vibrant", preview: "linear-gradient(135deg, #a855f7, #ec4899)" },
  { id: "electric", name: "Electric", description: "Bright and energetic.", category: "Vibrant", preview: "linear-gradient(135deg, #00b4d8, #0077b6)" },
  { id: "rainbow", name: "Rainbow", description: "Colorful and fun.", category: "Vibrant", preview: "linear-gradient(135deg, #f59e0b, #fbbf24, #84cc16, #10b981, #3b82f6, #6366f1, #8b5cf6)" },

  // Soothing Themes
  { id: "ocean-breeze", name: "Ocean Breeze", description: "Calm and refreshing.", category: "Soothing", preview: "linear-gradient(135deg, #60a5fa, #3b82f6)" },
  { id: "forest", name: "Forest", description: "Natural and serene.", category: "Soothing", preview: "linear-gradient(135deg, #4ade80, #22c55e)" },
  { id: "lavender", name: "Lavender", description: "Soft and relaxing.", category: "Soothing", preview: "linear-gradient(135deg, #c4b5fd, #8b5cf6)" },
  { id: "mint", name: "Mint", description: "Cool and refreshing.", category: "Soothing", preview: "linear-gradient(135deg, #6ee7b7, #34d399)" },

  // Animation Themes
  { id: "retro", name: "Retro", description: "Nostalgic and fun.", category: "Animation", preview: "linear-gradient(135deg, #f59e0b, #fbbf24)" },
  { id: "cyberpunk", name: "Cyberpunk", description: "Futuristic and edgy.", category: "Animation", preview: "linear-gradient(135deg, #6d28d9, #9333ea)" },
  { id: "galaxy", name: "Galaxy", description: "Cosmic and dreamy.", category: "Animation", preview: "linear-gradient(135deg, #1e40af, #1e3a8a)" },
  { id: "holographic", name: "Holographic", description: "Shiny and futuristic.", category: "Animation", preview: "linear-gradient(135deg, #a78bfa, #c084fc)" },
];

// Categories
const categories = ["All", "Dark", "Light", "Vibrant", "Soothing", "Animation"];

export default function ThemeSelectionPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredThemes, setFilteredThemes] = useState(themes);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [carouselIndices, setCarouselIndices] = useState<{ [key: string]: number }>({});

  // Debounced search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = themes.filter(
      (theme) =>
        theme.name.toLowerCase().includes(query.toLowerCase()) ||
        theme.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredThemes(filtered);
  };

  // Filter by category
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredThemes(themes);
    } else {
      const filtered = themes.filter((theme) => theme.category === category);
      setFilteredThemes(filtered);
    }
  };

  // Carousel navigation
  const handleCarouselNext = (category: string) => {
    setCarouselIndices((prev) => ({
      ...prev,
      [category]: (prev[category] || 0) + 1,
    }));
  };

  const handleCarouselPrev = (category: string) => {
    setCarouselIndices((prev) => ({
      ...prev,
      [category]: Math.max((prev[category] || 0) - 1, 0),
    }));
  };

  // Apply theme
  const handleApplyTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    // Add logic to apply the theme globally
  };

  // Get visible themes for a category
  const getVisibleThemes = (category: string) => {
    const themesInCategory = filteredThemes.filter((theme) => theme.category === category);
    const startIndex = (carouselIndices[category] || 0) * 3;
    return themesInCategory.slice(startIndex, startIndex + 3);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Search Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Search themes..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1"
          />
        </div>
      </div>

      {/* Hero Section - Carousel */}
      <div className="relative h-[300px] overflow-hidden">
        <motion.div
          className="absolute inset-0 flex transition-transform duration-500"
          style={{ transform: `translateX(-${carouselIndices["hero"] || 0 * 100}%)` }}
        >
          {themes.slice(0, 3).map((theme, index) => (
            <div
              key={theme.id}
              className="w-full h-full flex-shrink-0 flex items-center justify-center"
              style={{ background: theme.preview }}
            >
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">{theme.name}</h1>
                <p className="text-lg">{theme.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
        <Button
          variant="ghost"
          className="absolute left-4 top-1/2 -translate-y-1/2"
          onClick={() => handleCarouselPrev("hero")}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={() => handleCarouselNext("hero")}
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Filter Button */}
      <div className="container mx-auto px-4 py-6 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Sliders className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onSelect={() => handleCategoryFilter(category)}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Theme Grid */}
      <div className="container mx-auto px-4 py-8">
        {categories
          .filter((category) => category !== "All" && (selectedCategory === "All" || selectedCategory === category))
          .map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div className="relative flex items-center justify-center">
                <Button
                  variant="ghost"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  onClick={() => handleCarouselPrev(category)}
                  disabled={(carouselIndices[category] || 0) === 0}
                >
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className="flex gap-6">
                  {getVisibleThemes(category).map((theme) => (
                    <motion.div
                      key={theme.id}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex-shrink-0 w-80"
                    >
                      <Card
                        className={`relative ${
                          selectedTheme === theme.id ? "border-2 border-blue-500" : ""
                        }`}
                      >
                        <CardHeader>
                          <CardTitle>{theme.name}</CardTitle>
                          <CardDescription>{theme.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div
                            className="h-32 rounded-lg"
                            style={{ background: theme.preview }}
                          ></div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={selectedTheme === theme.id ? "default" : "outline"}
                            onClick={() => handleApplyTheme(theme.id)}
                          >
                            {selectedTheme === theme.id ? <Check className="mr-2 h-4 w-4" /> : null}
                            {selectedTheme === theme.id ? "Applied" : "Apply Theme"}
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={() => handleCarouselNext(category)}
                  disabled={
                    (carouselIndices[category] || 0) >=
                    Math.ceil(filteredThemes.filter((theme) => theme.category === category).length / 3) - 1
                  }
                >
                  <ArrowRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}