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

interface Theme {
  name: string;
  bgColor: string;
  mainColor: string;
  subColor: string;
  textColor: string;
}

export function ThemeBadge() {
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    fetch("/color-theme/list.json")
      .then((response) => response.json())
      .then((data) => setThemes(data))
      .catch((error) => console.error("Error loading themes:", error));
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button variant="outline" className="px-2 py-1 text-sm">theme.name</Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Select a Theme</DialogTitle>
          </DialogHeader>
        </VisuallyHidden>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search themes..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandSeparator />
            <CommandGroup heading="Themes">
              {themes.map((theme) => (
                <CommandItem
                key={theme.name}
                value={theme.name}
                className="cursor-pointer transition-colors hover:bg-[theme.subColor]"
                style={{
                  transition: "background-color 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.subColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
              >
                  <span  >{theme.name}</span>
                  <Badge variant="outline" className="ml-auto" style={{ backgroundColor: theme.bgColor }}>
                    <div className="flex space-x-1">
                      <Circle
                        className="h-3 w-3"
                        style={{ color: theme.mainColor, fill: theme.mainColor }}
                      />
                      <Circle
                        className="h-3 w-3"
                        style={{ color: theme.subColor, fill: theme.subColor }}
                      />
                      <Circle
                        className="h-3 w-3"
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
