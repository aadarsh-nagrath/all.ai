"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sliders, ArrowLeft, ArrowRight } from "lucide-react";

// Define theme types
type Theme = {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string; 
};

// Mock themes
const themes: Theme[] = [
  // Dark Themes
  { id: "dark-moody", name: "Dark & Moody", description: "Sleek and modern.", category: "Dark", preview: "linear-gradient(135deg, #0f172a, #1e293b)" },
  { id: "midnight", name: "Midnight", description: "Deep and mysterious.", category: "Dark", preview: "linear-gradient(135deg, #1e3a8a, #0c4a6e)" },
  { id: "obsidian", name: "Obsidian", description: "Elegant and bold.", category: "Dark", preview: "linear-gradient(135deg, #1c1c1c, #3d3d3d)" },

  // Light Themes
  { id: "light-airy", name: "Light & Airy", description: "Clean and minimalist.", category: "Light", preview: "linear-gradient(135deg, #ffffff, #f3f4f6)" },
  { id: "cloudy", name: "Cloudy", description: "Soft and calming.", category: "Light", preview: "linear-gradient(135deg, #f0f4f8, #d9e2ec)" },
  { id: "sunrise", name: "Sunrise", description: "Warm and inviting.", category: "Light", preview: "linear-gradient(135deg, #ffecd2, #fcb69f)" },

  // Vibrant Themes
  { id: "sunset-vibes", name: "Sunset Vibes", description: "Warm and vibrant.", category: "Vibrant", preview: "linear-gradient(135deg, #f97316, #fb923c)" },
  { id: "neon-dreams", name: "Neon Dreams", description: "Bold and futuristic.", category: "Vibrant", preview: "linear-gradient(135deg, #a855f7, #ec4899)" },
  { id: "electric", name: "Electric", description: "Bright and energetic.", category: "Vibrant", preview: "linear-gradient(135deg, #00b4d8, #0077b6)" },

  // Soothing Themes
  { id: "ocean-breeze", name: "Ocean Breeze", description: "Calm and refreshing.", category: "Soothing", preview: "linear-gradient(135deg, #60a5fa, #3b82f6)" },
  { id: "forest", name: "Forest", description: "Natural and serene.", category: "Soothing", preview: "linear-gradient(135deg, #4ade80, #22c55e)" },
  { id: "lavender", name: "Lavender", description: "Soft and relaxing.", category: "Soothing", preview: "linear-gradient(135deg, #c4b5fd, #8b5cf6)" },

  // Animation Themes
  { id: "retro", name: "Retro", description: "Nostalgic and fun.", category: "Animation", preview: "linear-gradient(135deg, #f59e0b, #fbbf24)" },
  { id: "cyberpunk", name: "Cyberpunk", description: "Futuristic and edgy.", category: "Animation", preview: "linear-gradient(135deg, #6d28d9, #9333ea)" },
  { id: "galaxy", name: "Galaxy", description: "Cosmic and dreamy.", category: "Animation", preview: "linear-gradient(135deg, #1e40af, #1e3a8a)" },
];

// Categories
const categories = ["All", "Dark", "Light", "Vibrant", "Soothing", "Animation"];

export default function ThemeSelectionPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredThemes, setFilteredThemes] = useState(themes);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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
  const handleCarouselNext = () => {
    setCarouselIndex((prev) => (prev + 1) % 3); // 3 slides in carousel
  };

  const handleCarouselPrev = () => {
    setCarouselIndex((prev) => (prev - 1 + 3) % 3); // 3 slides in carousel
  };

  // Auto-scroll for category rows
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 1, behavior: "smooth" });
      }
    }, 20); // Adjust speed here
    return () => clearInterval(interval);
  }, []);

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
      </div>

      {/* Hero Section - Carousel */}
      <div className="relative h-[300px] overflow-hidden">
        <motion.div
          className="absolute inset-0 flex transition-transform duration-500"
          style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
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
          onClick={handleCarouselPrev}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={handleCarouselNext}
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Theme Grid */}
      <div className="container mx-auto px-4 py-8">
        {categories
          .filter((category) => category !== "All" && (selectedCategory === "All" || selectedCategory === category))
          .map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div
                ref={carouselRef}
                className="flex overflow-x-auto gap-6 scrollbar-hide"
              >
                {filteredThemes
                  .filter((theme) => theme.category === category)
                  .map((theme) => (
                    <motion.div
                      key={theme.id}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex-shrink-0 w-80"
                    >
                      <Card>
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
                        <CardFooter>
                          <Button>Apply Theme</Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}