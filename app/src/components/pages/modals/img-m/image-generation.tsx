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
import { useSession } from "next-auth/react";

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
  const { data: session, status } = useSession();
  const [selectedModel, setSelectedModel] = React.useState('perchance');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedImages, setGeneratedImages] = React.useState<string[]>([]);
  const [hasGeneratedImages, setHasGeneratedImages] = React.useState(false);
  
  // Fast Flux settings state
  const [fastFluxSettings, setFastFluxSettings] = React.useState({
    numImages: 2,
    style: "Photorealistic"
  });

  const placeholders = [
    "A futuristic city at sunset, with flying cars and neon lights",
    "A medieval knight fighting a dragon on top of a mountain",
    "A cozy cabin in the woods during snowfall, at night",
    "A cyberpunk girl with glowing tattoos in a rainy alley",
    "An astronaut floating in space, looking at Earth",
  ];

  // Get user email from session
  const userEmail = session?.user?.email;

  // Function to convert Python dict to valid JSON
  const convertPythonDictToJSON = (pythonDict: string): string => {
    return pythonDict
      .replace(/'/g, '"')  // Replace single quotes with double quotes
      .replace(/True/g, 'true')  // Replace Python True with JSON true
      .replace(/False/g, 'false')  // Replace Python False with JSON false
      .replace(/None/g, 'null');  // Replace Python None with JSON null
  };

  const handleChange = () => {
    // console.log(e.target.value);
  };

  const callFastFluxAPI = async (prompt: string) => {
    // Check if user is authenticated
    if (!userEmail) {
      console.error('User not authenticated');
      alert('Please log in to generate images');
      return;
    }

    setIsGenerating(true);
    setGeneratedImages([]);
    setHasGeneratedImages(false);

    try {
      const response = await fetch('/api/fast-flux', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          num: fastFluxSettings.numImages,
          style: fastFluxSettings.style
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body reader available');
      }

      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6); // Remove 'data: ' prefix
            
            if (data === '[DONE]') {
              setIsGenerating(false);
              setHasGeneratedImages(true);
              return;
            }

            try {
              const jsonString = convertPythonDictToJSON(data);
              const parsedData = JSON.parse(jsonString);
              if (parsedData.url) {
                setGeneratedImages(prev => [...prev, parsedData.url]);
                setHasGeneratedImages(true);
              }
            } catch {
              // Skip invalid JSON lines
            }
          }
        }
      }
    } catch (error) {
      console.error('Error calling Fast Flux API:', error);
      setIsGenerating(false);
      alert(error instanceof Error ? error.message : 'Error generating images. Please try again.');
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (selectedModel === 'fast_flux') {
      const formData = new FormData(e.currentTarget);
      const prompt = formData.get('prompt') as string;
      
      if (prompt) {
        await callFastFluxAPI(prompt);
      }
    } else {
      // console.log("submitted for other model");
    }
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

  const fastFluxStyles = [
    "Photorealistic",
    "Abstract Expressionism",
    "Impressionism",
    "Cubism",
    "Surrealism",
    "Minimalism",
    "Pop Art",
    "Art Nouveau",
    "Baroque",
    "Renaissance",
    "Cyberpunk",
    "Steampunk",
    "Fantasy",
    "Sci-Fi",
    "Vintage",
    "Modern"
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
      
      {/* Dynamic Image Container - Replaces Feature Section */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-[80%] max-w-5xl mb-8">
          {selectedModel === 'fast_flux' && (isGenerating || hasGeneratedImages) ? (
            <div className="bg-muted/20 backdrop-blur-sm rounded-lg p-8 my-8 w-[120%] h-full min-h-[700px] -mx-[10%]">
              <h3 className="text-xl font-semibold mb-8 dark:text-white text-black text-center">
                {isGenerating ? "Generating Images..." : "Generated Images"}
              </h3>
              <div 
                className="grid gap-8 w-full h-full"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(fastFluxSettings.numImages, 4)}, 1fr)`,
                  minHeight: '450px'
                }}
              >
                {Array.from({ length: fastFluxSettings.numImages }).map((_, index) => (
                  <div 
                    key={index} 
                    className="aspect-square rounded-xl overflow-hidden bg-background border border-border relative shadow-xl"
                  >
                    {generatedImages[index] ? (
                      <div className="w-full h-full relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={generatedImages[index]} 
                          alt={`Generated image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                          <p className="text-base text-muted-foreground font-medium">Generating...</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Feature />
          )}
        </div>
      </div>

      {/* DRAWER */}
      <div className="w-full max-w-2xl mb-8">
        <div className="relative">
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
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

                    {selectedModel === 'fast_flux' && (
                      <>
                        <div className="space-y-2">
                          <Label>Number of Images</Label>
                          <input
                            type="number"
                            className="w-full p-2 rounded-md border border-input bg-background"
                            value={fastFluxSettings.numImages}
                            onChange={(e) => setFastFluxSettings(prev => ({
                              ...prev,
                              numImages: parseInt(e.target.value) || 1
                            }))}
                            min={1}
                            max={8}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Style</Label>
                          <SelectDropdown 
                            value={fastFluxSettings.style}
                            onValueChange={(value) => setFastFluxSettings(prev => ({
                              ...prev,
                              style: value
                            }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select art style" />
                            </SelectTrigger>
                            <SelectContent>
                              {fastFluxStyles.map((style) => (
                                <SelectItem key={style} value={style}>
                                  {style}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </SelectDropdown>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <DrawerFooter className="pt-4">
                  <Button onClick={() => setDrawerOpen(false)}>Save Settings</Button>
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
            isGenerating={isGenerating}
            isAuthenticated={status === 'authenticated'}
            isLoading={status === 'loading'}
          />
        </div>
      </div>
    </div>
  );
}