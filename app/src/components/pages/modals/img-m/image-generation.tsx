"use client";

import { PlaceholdersAndVanishInput } from "./components/placeholder-vanish";
import Feature from "./components/feature-section-w-grid";
import { Settings } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function ImgGen() {
  const placeholders = [
    "A futuristic city at sunset, with flying cars and neon lights",
    "A medieval knight fighting a dragon on top of a mountain",
    "A cozy cabin in the woods during snowfall, at night",
    "A cyberpunk girl with glowing tattoos in a rainy alley",
    "An astronaut floating in space, looking at Earth",
  ];
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="h-[40rem] flex flex-col items-center px-4">
      <h2 className="text-xl text-center sm:text-5xl dark:text-white text-black mt-4">
        What would you like to create today?
      </h2>
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-[80%] max-w-5xl mb-8">
          <Feature />
        </div>
      </div>

      {/* DRAWER */}
      <div className="w-full max-w-2xl mb-8">
        <div className="relative">
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon" className="h-12 w-12 z-2 rounded-full absolute left-10 top-1/2 -translate-y-1/2 z-[100]">
                <Settings className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-full top-0 right-0 left-auto mt-0 w-[35%] rounded-none">
              <div className="mx-auto w-full p-4 h-full">
                <DrawerHeader>
                  <DrawerTitle>Image Generation Settings</DrawerTitle>
                  <DrawerDescription>Configure your image generation preferences.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0 h-[calc(100%-120px)] overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Image Size
                      </label>
                      {/* Add your form elements here */}
                    </div>
                    {/* Add more settings as needed */}
                  </div>
                </div>
                <DrawerFooter className="pt-4">
                  <Button>Save Settings</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}