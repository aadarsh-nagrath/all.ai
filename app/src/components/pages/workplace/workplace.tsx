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
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadChatHistory = async () => {
      if (!chatId || !session?.user?.email) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/chats/${chatId}`);
        if (!response.ok) throw new Error('Failed to load chat history');
        const data = await response.json();
        setChatHistory(data.messages || []);
      } catch (error) {
        console.error('Error loading chat history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadChatHistory();
  }, [chatId, session]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowHeadings(prev => !prev);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);

  const handleMessageSent = () => {
    setShowHeadings(false);
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
      <SearchInput 
        onMessageSent={handleMessageSent} 
        initialMessages={chatHistory}
        chatId={chatId}
        isLoading={isLoading}
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
