"use client";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";

interface Theme {
  name: string;
  bgColor: string;
  mainColor: string;
  subColor: string;
  textColor: string;
}

export function ThemeBadge() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const { setCustomTheme } = useTheme();

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("colored_theme");
    if (storedTheme) {
      try {
        const parsedTheme = JSON.parse(storedTheme);
        setSelectedTheme(parsedTheme.name);
        setCustomTheme(parsedTheme);
      } catch {
        // fallback: clear invalid localStorage
        localStorage.removeItem("colored_theme");
      }
    }
  }, [setCustomTheme]);

  useEffect(() => {
    fetch("/color-theme/list.json")
      .then((response) => response.json())
      .then((data) => setThemes(data))
      .catch((error) => console.error("Error loading themes:", error));
  }, []);

  const handleThemeClick = (theme: Theme) => {
    setSelectedTheme(theme.name);
    setCustomTheme(theme);
    setIsOpen(false);
    // Persist theme in localStorage
    localStorage.setItem("colored_theme", JSON.stringify(theme));
  };

  const handleThemeHover = (theme: Theme) => {
    // Convert hex colors to HSL values
    const bgColor = hexToHsl(theme.bgColor);
    const mainColor = hexToHsl(theme.mainColor);
    const subColor = hexToHsl(theme.subColor);
    const textColor = hexToHsl(theme.textColor);

    // Set CSS variables for the preview theme
    document.documentElement.style.setProperty('--preview-background', `${bgColor.h} ${bgColor.s}% ${bgColor.l}%`);
    document.documentElement.style.setProperty('--preview-foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`);
    document.documentElement.style.setProperty('--preview-primary', `${mainColor.h} ${mainColor.s}% ${mainColor.l}%`);
    document.documentElement.style.setProperty('--preview-secondary', `${subColor.h} ${subColor.s}% ${subColor.l}%`);
    
    // Set additional preview theme variables
    document.documentElement.style.setProperty('--preview-card', `${bgColor.h} ${bgColor.s}% ${bgColor.l}%`);
    document.documentElement.style.setProperty('--preview-card-foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`);
    document.documentElement.style.setProperty('--preview-popover', `${bgColor.h} ${bgColor.s}% ${bgColor.l}%`);
    document.documentElement.style.setProperty('--preview-popover-foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`);
    document.documentElement.style.setProperty('--preview-primary-foreground', `${bgColor.h} ${bgColor.s}% ${bgColor.l}%`);
    document.documentElement.style.setProperty('--preview-secondary-foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`);
    document.documentElement.style.setProperty('--preview-muted', `${subColor.h} ${subColor.s}% ${subColor.l}%`);
    document.documentElement.style.setProperty('--preview-muted-foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`);
    document.documentElement.style.setProperty('--preview-accent', `${subColor.h} ${subColor.s}% ${subColor.l}%`);
    document.documentElement.style.setProperty('--preview-accent-foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`);
    document.documentElement.style.setProperty('--preview-border', `${subColor.h} ${subColor.s}% ${subColor.l}%`);
    document.documentElement.style.setProperty('--preview-input', `${subColor.h} ${subColor.s}% ${subColor.l}%`);
    document.documentElement.style.setProperty('--preview-ring', `${mainColor.h} ${mainColor.s}% ${mainColor.l}%`);

    // Set sidebar preview theme variables
    document.documentElement.style.setProperty('--preview-sidebar-background', `${subColor.h} ${subColor.s}% ${subColor.l}%`);
    document.documentElement.style.setProperty('--preview-sidebar-foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`);
    document.documentElement.style.setProperty('--preview-sidebar-primary', `${mainColor.h} ${mainColor.s}% ${mainColor.l}%`);
    document.documentElement.style.setProperty('--preview-sidebar-primary-foreground', `${bgColor.h} ${bgColor.s}% ${bgColor.l}%`);
    document.documentElement.style.setProperty('--preview-sidebar-accent', `${subColor.h} ${subColor.s}% ${subColor.l}%`);
    document.documentElement.style.setProperty('--preview-sidebar-accent-foreground', `${textColor.h} ${textColor.s}% ${textColor.l}%`);
    document.documentElement.style.setProperty('--preview-sidebar-border', `${mainColor.h} ${mainColor.s}% ${mainColor.l}%`);
    document.documentElement.style.setProperty('--preview-sidebar-ring', `${mainColor.h} ${mainColor.s}% ${mainColor.l}%`);

    // Add preview class to body
    document.body.classList.add('preview-theme');
  };

  const handleThemeLeave = () => {
    // Remove preview class and reset preview variables
    document.body.classList.remove('preview-theme');
    // Reset all preview variables
    const previewVars = [
      'background', 'foreground', 'primary', 'secondary', 'card', 'card-foreground',
      'popover', 'popover-foreground', 'primary-foreground', 'secondary-foreground',
      'muted', 'muted-foreground', 'accent', 'accent-foreground', 'border', 'input',
      'ring', 'sidebar-background', 'sidebar-foreground', 'sidebar-primary',
      'sidebar-primary-foreground', 'sidebar-accent', 'sidebar-accent-foreground',
      'sidebar-border', 'sidebar-ring'
    ];
    previewVars.forEach(varName => {
      document.documentElement.style.removeProperty(`--preview-${varName}`);
    });
  };

  // Prepend Light and Dark themes to the list
  const lightTheme = {
    name: "Light",
    bgColor: "#ffffff",
    mainColor: "#e5e7eb",
    subColor: "#f2f2f2",
    textColor: "#111827"
  };
  const darkTheme = {
    name: "Dark",
    bgColor: "#0d0d0d",
    mainColor: "#27272a",
    subColor: "#262626",
    textColor: "#f4f4f5"
  };
  const allThemes = [darkTheme, lightTheme, ...themes];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-2 py-1 text-sm">
          {selectedTheme || "Select Theme"}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 w-[600px] max-h-[80vh]">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Select a Theme</DialogTitle>
          </DialogHeader>
        </VisuallyHidden>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search themes..." />
          <CommandList className="max-h-[60vh]">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandSeparator />
            <CommandGroup heading="Themes">
              {allThemes.map((theme) => (
                <CommandItem
                  key={theme.name}
                  value={theme.name}
                  className="cursor-pointer transition-colors hover:bg-[theme.subColor] py-3"
                  style={{
                    transition: "background-color 0.2s ease-in-out",
                  }}
                  onMouseEnter={() => handleThemeHover(theme)}
                  onMouseLeave={handleThemeLeave}
                  onSelect={() => handleThemeClick(theme)}
                >
                  <span className="text-base">{theme.name}</span>
                  <Badge variant="outline" className="ml-auto" style={{ backgroundColor: theme.bgColor }}>
                    <div className="flex space-x-1">
                      <Circle
                        className="h-4 w-4"
                        style={{ color: theme.mainColor, fill: theme.mainColor }}
                      />
                      <Circle
                        className="h-4 w-4"
                        style={{ color: theme.subColor, fill: theme.subColor }}
                      />
                      <Circle
                        className="h-4 w-4"
                        style={{ color: theme.textColor, fill: theme.textColor }}
                      />
                    </div>
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to convert hex to HSL
function hexToHsl(hex: string) {
  // Remove the hash if it exists
  hex = hex.replace('#', '')
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}
