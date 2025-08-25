"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ButtonColorful } from "@/components/ui/button-colorful";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";

type Agent = {
  title: string;
  description: string;
  image?: string;
  prompt?: string;
};

type Category = {
  title: string;
  items: Agent[];
};

export default function BrowseAgents() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/agents');
      if (!response.ok) {
        throw new Error('Failed to fetch agents');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching agents:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading agents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Button onClick={fetchAgents} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-xl w-full py-10 px-6">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight max-w-xl md:text-center md:mx-auto">
            Explore Our Agents  Ready To Assist
          </h2>
          <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <SheetTrigger asChild>
              <ButtonColorful label="Create New Agent" />
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[96vh]">
              <div className="h-full flex flex-col">
                <SheetHeader className="border-b pb-4">
                  <SheetTitle className="text-2xl">Create New Agent</SheetTitle>
                  <SheetDescription>
                    Configure your new AI agent by filling out the details below.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Left Column - Image Upload */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-base">Agent Image</Label>
                        <div
                          className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/50"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleImageDrop}
                          onClick={() => document.getElementById('image-upload')?.click()}
                        >
                          {imagePreview ? (
                            <div className="relative w-48 h-48 mx-auto">
                              <Image
                                src={imagePreview}
                                alt="Preview"
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-3 py-8">
                              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <Upload className="w-8 h-8 text-primary" />
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium">
                                  Drag and drop your image here
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  or click to browse from your computer
                                </p>
                              </div>
                            </div>
                          )}
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-base">Title</Label>
                        <Input
                          id="title"
                          placeholder="Enter agent title"
                          className="h-11"
                        />
                      </div>
                    </div>

                    {/* Right Column - Description and Instructions */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-base">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Enter agent description"
                          className="min-h-[120px] resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="prompt" className="text-base">Prompt Instructions</Label>
                        <Textarea
                          id="prompt"
                          placeholder="Enter instructions for using this agent"
                          className="min-h-[200px] resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer with Actions */}
                <div className="border-t pt-4">
                  <div className="flex justify-end gap-3 max-w-4xl mx-auto">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateOpen(false)}
                      className="h-11 px-6"
                    >
                      Cancel
                    </Button>
                    <Button className="h-11 px-6">
                      Create Agent
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {categories.map((category, index) => (
          <div key={`${category.title}-${index}`} className="mt-12">
            <h3 className="text-2xl font-bold mb-6">{category.title}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, idx) => (
                <div key={`${item.title}-${idx}`}>
                  <div className="relative flex flex-col gap-6 hover:ring rounded-lg p-4 -mx-2 sm:mx-0 max-w-lg">
                    <Button 
                      onClick={() => setSelectedAgent(item)}
                      className="absolute top-0 right-0 rounded-tl-none rounded-br-none bg-primary/90 hover:bg-primary text-primary-foreground"
                    >
                      Use
                    </Button>
                    <div className="flex gap-6 mt-8">
                      <div className="h-24 aspect-square shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={item.image || '/images/default-agent.png'}
                          alt={item.title}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold tracking-tight text-lg">
                          {item.title}
                        </span>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{selectedAgent?.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-6">
              <div className="flex gap-6">
                <div className="h-32 aspect-square shrink-0 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={selectedAgent?.image || '/images/default-agent.png'}
                    alt={selectedAgent?.title || 'Agent'}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground">{selectedAgent?.description}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Instructions</h3>
                <div className="rounded-lg border p-4 bg-muted/50">
                  <p className="text-sm text-muted-foreground">
                    {selectedAgent?.prompt || "Instructions for using this agent will appear here."}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button 
                  onClick={() => setSelectedAgent(null)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-primary/90 hover:bg-primary text-primary-foreground"
                  onClick={() => {
                    if (selectedAgent) {
                      const params = new URLSearchParams({
                        title: selectedAgent.title,
                        description: selectedAgent.description,
                        image: selectedAgent.image || '',
                        prompt: selectedAgent.prompt || ''
                      });
                      router.push(`/workplace?${params.toString()}`);
                    }
                  }}
                >
                  Start Using
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}