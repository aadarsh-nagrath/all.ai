"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Headline from "./headline";
import SearchInput from "./searchbox";
import Subheadline from "./subheadline";
import { ThemeBadge } from "@/components/theme-badge"
import { motion} from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getChat } from "@/lib/api";
import { useRouter } from "next/navigation";

function AnimatedThemeButton() {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ThemeBadge />
      </motion.div>
    </div>
  );
}

export default function Workplace() {
  const [showHeadings, setShowHeadings] = useState(true);
  const searchParams = useSearchParams();
  const chatId = searchParams.get('chatId');
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agentCleared, setAgentCleared] = useState(false);
  const router = useRouter();

  const agentTitle = searchParams.get('title');
  const agentDescription = searchParams.get('description');
  const agentImage = searchParams.get('image');
  const agentPrompt = searchParams.get('prompt');
  const activeAgent = !agentCleared && agentTitle ? {
    title: agentTitle,
    description: agentDescription || undefined,
    image: agentImage || undefined,
    prompt: agentPrompt || undefined
  } : null;

  useEffect(() => {
    const loadChatHistory = async () => {
      if (!chatId) {
        setChatHistory([]);
        setShowHeadings(true);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      try {
        console.log('Loading chat history for chatId:', chatId);
        const data = await getChat(chatId);
        console.log('Received chat data:', data);
        
        if (data && data.messages && Array.isArray(data.messages)) {
          console.log('Setting chat history:', data.messages);
          setChatHistory(data.messages);
          setShowHeadings(false);
        } else {
          console.error('Invalid chat history format:', data);
          setChatHistory([]);
          setError('Invalid chat format');
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
        setChatHistory([]);
        setError(error instanceof Error ? error.message : 'Failed to load chat');
      } finally {
        setIsLoading(false);
      }
    };

    loadChatHistory();
  }, [chatId]);

  const handleMessageSent = () => {
    setShowHeadings(false);
  };

  const handleClearAgent = () => {
    setAgentCleared(true);
    // Remove agent info from URL
    const params = new URLSearchParams(window.location.search);
    params.delete('title');
    params.delete('description');
    params.delete('image');
    params.delete('prompt');
    router.replace(`/workplace${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 relative min-h-screen">
      <div className="sticky top-0 z-10 flex justify-end pb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <AnimatedThemeButton />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <motion.div
        animate={{ opacity: showHeadings ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Headline />
        <Subheadline />
      </motion.div>
      {error && (
        <div className="text-red-500 text-center p-4">
          {error}
        </div>
      )}
      <SearchInput 
        onMessageSent={handleMessageSent} 
        initialMessages={chatHistory}
        chatId={chatId}
        isLoading={isLoading}
        activeAgent={activeAgent}
        onClearAgent={handleClearAgent}
      />
    </div>
  );
}


// what are things in the chat ui -
// what can i help you with headline
// message input - web search , reason, voice typing
// miscellaneous task performing button templates


// gemini {hello name of person}
// no need to di1play model version as it is not much required; can be exception
// upload image feature

// perplexity better chat box and [auto button to change model close to chat]
// try pro modal pop up in corner of screen
