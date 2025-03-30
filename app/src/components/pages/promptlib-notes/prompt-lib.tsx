'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Credenza, CredenzaBody, CredenzaContent, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/components/ui/credenza';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion} from 'framer-motion';
import { Trash2 } from 'lucide-react'; // For delete icon

interface Prompt {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  createdBy: string;
}

const TAB_CONTENT = [
  { title: 'All Prompts', key: 'all' },
  { title: 'My Prompts', key: 'user' },
  { title: 'Popular Prompts', key: 'popular' },
];

export default function PromptLibrary() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState(0);
  const [prompts, setPrompts] = useState<Prompt[]>([]); // Explicitly define the type
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Fetch prompts
  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('/api/prompts/get');
      const data = await response.json();
      setPrompts(data);
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
        alert('Prompt deleted successfully!');
      } else {
        alert('Failed to delete prompt');
      }
    } catch (error) {
      console.error('Error deleting prompt:', error);
      alert('Failed to delete prompt');
    }
  };

  // Add new prompt
  const handleAddPrompt = (newPrompt: Prompt) => {
    setPrompts((prevPrompts) => [...prevPrompts, newPrompt]);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Prompt Library</h1>
        {session && <CreatePromptModal onAddPrompt={handleAddPrompt} />}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search prompts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select onValueChange={(value) => setCategoryFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {TAB_CONTENT.map((tab, index) => (
          <Button
            key={index}
            variant={activeTab === index ? 'default' : 'outline'}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </Button>
        ))}
      </div>

      {/* Prompts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            onDelete={() => handleDeletePrompt(prompt._id)}
          />
        ))}
      </div>
    </div>
  );
}

function PromptCard({ prompt, onDelete }: { prompt: Prompt, onDelete: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-6 max-w-md mx-auto w-full">
      <div className="space-y-4">
        <div className="flex justify-between items-center gap-2">
          <h3 className="font-medium">{prompt.title}</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide Prompt' : 'Show Prompt'}
          </Button>
        </div>

        {/* Scoped Animation */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
        >
          <div className="p-4">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{prompt.content}</p>
          </div>
        </motion.div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            <code className="px-2 py-0.5 bg-muted rounded">{prompt.category}</code>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
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
    if (!session) return; // Ensure the user is logged in

    try {
      const response = await fetch('/api/prompts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          content,
          category,
          createdBy: session.user.email, // Include the logged-in user's email
        }),
      });

      if (response.ok) {
        const newPrompt = await response.json();
        onAddPrompt(newPrompt); // Add the new prompt to the state
        setIsOpen(false); // Close the modal
        alert('Prompt created successfully!');
      } else {
        const errorData = await response.json();
        console.error('Failed to create prompt:', errorData);
        alert('Failed to create prompt');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to create prompt');
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button>Create Prompt</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Create New Prompt</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[150px] p-2 border rounded-md resize-y"
            />
            <Input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}