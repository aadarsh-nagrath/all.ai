"use client";

import { PlaceholdersAndVanishInput } from "./components/placeholder-vanish";
import Feature from "./components/feature-section-w-grid";
import { GitFork, Settings, Zap, Bolt } from "lucide-react";
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
import Select from "@/components/pages/modals/img-m/components/custom-select";
import { Label } from "@/components/ui/label";
import {
  Select as SelectDropdown,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const modelData = [
  {
    id: '1',
    label: 'Perchance',
    value: 'perchance',
    description: 'Fast & efficient',
    icon: <GitFork className="text-green-500" />, 
  },
  {
    id: '2',
    label: 'Flux-Schnell',
    value: 'flux_schnell',
    description: 'High quality',
    icon: <Zap className="text-blue-500" />,
  },
  {
    id: '3',
    label: 'Fast Flux',
    value: 'fast_flux',
    description: 'Quick results',
    icon: <Bolt className="text-purple-500" />,
  },
];

export default function ImgGen() {
  const [selectedModel, setSelectedModel] = React.useState('perchance');
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

  const artStyles = [
    "Casual Photo",
    "Anime",
    "Digital Art",
    "Realistic",
    "Oil Painting",
    "Watercolor"
  ];

  const artStyleMixOptions = [
    "Not Mix",
    "Mix Styles",
    "Blend Styles"
  ];

  return (
    <div className="h-[40rem] flex flex-col items-center px-4">
      <div className="absolute top-0 left-20 p-4 z-10">
        <div className="w-[250px]">
          <Select 
            data={modelData} 
            defaultValue={'perchance'} 
            onChange={(value) => setSelectedModel(value)}
          />
        </div>
      </div>
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
                  <DrawerDescription>
                    Configure settings for {modelData.find(m => m.value === selectedModel)?.label}
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0 h-[calc(100%-120px)] overflow-y-auto">
                  <div className="space-y-6">
                    {selectedModel === 'perchance' && (
                      <>
                        <div className="space-y-2">
                          <Label>Art Style</Label>
                          <SelectDropdown defaultValue={artStyles[0]}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select art style" />
                            </SelectTrigger>
                            <SelectContent>
                              {artStyles.map((style) => (
                                <SelectItem key={style} value={style}>
                                  {style}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </SelectDropdown>
                        </div>

                        <div className="space-y-2">
                          <Label>Art Style Mix</Label>
                          <SelectDropdown defaultValue={artStyleMixOptions[0]}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select mix style" />
                            </SelectTrigger>
                            <SelectContent>
                              {artStyleMixOptions.map((style) => (
                                <SelectItem key={style} value={style}>
                                  {style}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </SelectDropdown>
                        </div>

                        <div className="space-y-2">
                          <Label>Negative Prompt</Label>
                          <textarea
                            className="w-full min-h-[100px] p-2 rounded-md border border-input bg-background"
                            defaultValue="blurry, low quality, distorted, deformed, ugly, bad anatomy"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Image Shape</Label>
                          <SelectDropdown defaultValue="portrait">
                            <SelectTrigger>
                              <SelectValue placeholder="Select image shape" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="portrait">Portrait</SelectItem>
                              <SelectItem value="landscape">Landscape</SelectItem>
                              <SelectItem value="square">Square</SelectItem>
                            </SelectContent>
                          </SelectDropdown>
                        </div>

                        <div className="space-y-2">
                          <Label>Guidance Scale</Label>
                          <input
                            type="number"
                            className="w-full p-2 rounded-md border border-input bg-background"
                            defaultValue={3}
                            min={1}
                            max={20}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Number of Images</Label>
                          <input
                            type="number"
                            className="w-full p-2 rounded-md border border-input bg-background"
                            defaultValue={6}
                            min={1}
                            max={10}
                          />
                        </div>
                      </>
                    )}
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