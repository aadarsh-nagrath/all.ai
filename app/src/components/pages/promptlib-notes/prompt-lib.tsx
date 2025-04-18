'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/components/ui/credenza';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, BookOpen, Plus, Search, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface Prompt {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  createdBy: string;
}

const TAB_CONTENT = [
  { title: 'All Prompts', key: 'all', icon: <BookOpen className="h-4 w-4 mr-2" /> },
  { title: 'My Prompts', key: 'user', icon: <BookOpen className="h-4 w-4 mr-2" /> },
  { title: 'Popular Prompts', key: 'popular', icon: <BookOpen className="h-4 w-4 mr-2" /> },
];

// Color palette for categories
const CATEGORY_COLORS = [
  'bg-blue-100 text-blue-800 border-blue-200',
  'bg-green-100 text-green-800 border-green-200',
  'bg-red-100 text-red-800 border-red-200',
  'bg-yellow-100 text-yellow-800 border-yellow-200',
  'bg-purple-100 text-purple-800 border-purple-200',
  'bg-pink-100 text-pink-800 border-pink-200',
  'bg-indigo-100 text-indigo-800 border-indigo-200',
  'bg-teal-100 text-teal-800 border-teal-200',
  'bg-orange-100 text-orange-800 border-orange-200',
  'bg-cyan-100 text-cyan-800 border-cyan-200',
];

// Helper function to get a consistent color for a category
const getCategoryColor = (category: string) => {
  const index = Math.abs(category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % CATEGORY_COLORS.length;
  return CATEGORY_COLORS[index];
};

export default function PromptLibrary() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState(0);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categoryColors, setCategoryColors] = useState<Record<string, string>>({});

  // Fetch prompts and set up category colors
  useEffect(() => {
    const fetchPrompts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/prompts/get');
        const data: Prompt[] = await response.json(); // Explicitly type the response data
        setPrompts(data);
        
        // Create a mapping of categories to their colors
        const colors: Record<string, string> = {};
        const uniqueCategories = [...new Set(data.map((prompt) => prompt.category))] as string[]; // Type assertion here
        uniqueCategories.forEach((category: string) => {
          colors[category] = getCategoryColor(category);
        });
        setCategoryColors(colors);
      } catch (error) {
        console.error('Error fetching prompts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrompts();
  }, []);

  // Extract unique categories from prompts
  const categories = [...new Set(prompts.map((prompt) => prompt.category))];

  // Filter prompts based on active tab, search, and category
  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || !categoryFilter ? true : prompt.category === categoryFilter;

    if (activeTab === 1 && session) {
      // Show only user's prompts in "My Prompts" tab
      return matchesSearch && matchesCategory && prompt.createdBy === session.user.email;
    } else if (activeTab === 0) {
      // Show all prompts in "All Prompts" tab
      return matchesSearch && matchesCategory;
    } else {
      // Show no prompts in "Popular Prompts" tab (or implement popularity logic)
      return false;
    }
  });

  // Delete prompt
  const handleDeletePrompt = async (id: string) => {
    try {
      const response = await fetch(`/api/prompts/delete?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted prompt from the state
        setPrompts((prevPrompts) => prevPrompts.filter((prompt) => prompt._id !== id));
        toast({
          title: "Prompt successfully deleted",
          description: "Deleted",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Failed to delete prompt",
          description: "Opps! Something went wrong",
        })
      }
    } catch (error) {
      console.error('Error deleting prompt:', error);
      toast({
        title: "Failed to delete prompt",
        description: "Opps! Something went wrong",
      })
    }
  };

  // Add new prompt
  const handleAddPrompt = (newPrompt: Prompt) => {
    setPrompts((prevPrompts) => [...prevPrompts, newPrompt]);
    // Update category colors if this is a new category
    if (!categoryColors[newPrompt.category]) {
      setCategoryColors(prev => ({
        ...prev,
        [newPrompt.category]: getCategoryColor(newPrompt.category)
      }));
    }
  };

  return (
    <div className="w-full p-4 sm:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-[#7C3AED]">
          Prompt Library
        </h1>
        {session && <CreatePromptModal onAddPrompt={handleAddPrompt} />}
      </div>

      {/* Search and Filter - Fixed Width Regardless of Content */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Select onValueChange={(value) => setCategoryFilter(value)}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <div className="flex items-center">
              <Tag className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by category" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                <div className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${categoryColors[category]?.split(' ')[0]}`} />
                  {category}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TAB_CONTENT.map((tab, index) => (
          <Button
            key={index}
            variant={activeTab === index ? 'default' : 'outline'}
            onClick={() => setActiveTab(index)}
            className="flex items-center"
          >
            {tab.icon}
            {tab.title}
          </Button>
        ))}
      </div>

      {/* Prompts List - Grid Layout Fixed */}
      <div className="min-h-[300px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            {filteredPrompts.length > 0 ? (
              filteredPrompts.map((prompt) => (
                <PromptCard
                  key={prompt._id}
                  prompt={prompt}
                  onDelete={() => handleDeletePrompt(prompt._id)}
                  categoryColor={categoryColors[prompt.category]}
                  showDelete={session?.user?.email === prompt.createdBy}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No prompts found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PromptCard({ 
  prompt, 
  onDelete, 
  categoryColor,
  showDelete
}: { 
  prompt: Prompt, 
  onDelete: () => void,
  categoryColor: string,
  showDelete: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ height: 'fit-content', display: 'flex' }}>
      <Card className="overflow-hidden border-2 hover:border-[#7C3AED] transition-all duration-300 shadow-md hover:shadow-xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-start gap-2 mb-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{prompt.title}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-medium hover:bg-[#7C3AED] hover:text-white"
            >
              {isExpanded ? 'Hide Prompt' : 'Show Prompt'}
            </Button>
          </div>
          
          <p className="text-sm text-slate-600 mb-4 line-clamp-2">{prompt.description}</p>

          <div className="relative">
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-slate-50 rounded-md mb-4 border">
                    <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono">{prompt.content}</pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Badge variant="outline" className={`${categoryColor} hover:${categoryColor.split(' ')[0]}/20`}>
              {prompt.category}
            </Badge>
            {showDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

function CreatePromptModal({ onAddPrompt }: { onAddPrompt: (newPrompt: Prompt) => void }) {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    try {
      const response = await fetch('/api/prompts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          content,
          category,
          createdBy: session.user.email,
        }),
      });

      if (response.ok) {
        const newPrompt = await response.json();
        onAddPrompt(newPrompt);
        
        setTitle('');
        setDescription('');
        setContent('');
        setCategory('');
        
        setIsOpen(false);
        toast({
          variant: "success",
          title: "Prompt created successfully!",
          description: "Your new prompt has been added to the library.",
          action: <ToastAction altText="Use">Use</ToastAction>,
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to create prompt:', errorData);
        toast({
          title: "Failed to create prompt",
          description: errorData.message || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error creating prompt",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button className="bg-[#7C3AED] hover:bg-[#6D28D9]">
          <Plus className="h-4 w-4 mr-2" />
          Create Prompt
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[550px]">
        <CredenzaHeader>
          <CredenzaTitle>Create New Prompt</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <Input id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <Input id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">Content</label>
              <textarea
                id="content"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[200px] p-3 border rounded-md resize-y font-mono text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <Input
                id="category"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#7C3AED] hover:bg-[#6D28D9]">Submit</Button>
            </div>
          </form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}