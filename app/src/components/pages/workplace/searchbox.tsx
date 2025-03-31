"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, Paperclip, Globe, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export default function SearchInput() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const { data: session } = useSession();
  

  useEffect(() => {
      if (!session?.user?.email) return;
  
      const wsUrl = `ws://localhost:8000/ws/${encodeURIComponent(session.user.email)}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;
  
      ws.onopen = () => {
          console.log("Persistent WebSocket connection established");
      };
  
      ws.onmessage = (event) => {
          try {
              const data = JSON.parse(event.data);
              if (data.message) {  // Ignore ping messages
                  setMessages(prev => [...prev, {
                      role: 'assistant',
                      content: data.message
                  }]);
              }
          } catch (error) {
              console.error("Error parsing message:", error);
          }
      };
  
      ws.onclose = (event) => {
          console.log("WebSocket closed unexpectedly", event);
      };
  
      ws.onerror = (error) => {
          console.error("WebSocket error:", error);
      };
  
      return () => {
          if (wsRef.current) {
              wsRef.current.close();
          }
      };
  }, [session?.user?.email]);
  
  const handleSend = useCallback(() => {
      if (!input.trim() || !wsRef.current) return;
  
      const message = {
          message: input,
          conversation_id: null
      };
  
      if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify(message));
          setMessages(prev => [...prev, {role: 'user', content: input}]);
          setInput("");
      }
  }, [input]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold text-black dark:text-white">
        What can I help you with?
      </h1>

      {/* Messages Display */}
      <div className="w-full space-y-4">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={cn(
              "p-4 rounded-lg",
              msg.role === 'user' 
                ? "bg-blue-100 dark:bg-blue-900 ml-auto max-w-[80%]" 
                : "bg-gray-100 dark:bg-gray-800 mr-auto max-w-[80%]"
            )}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="w-full">
        <div className="relative bg-neutral-900 rounded-xl border border-neutral-800">
          <div className="overflow-y-auto">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me a question..."
              className={cn(
                "w-full px-4 py-3",
                "resize-none",
                "bg-transparent",
                "border-none",
                "text-white text-sm",
                "focus:outline-none",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "placeholder:text-neutral-500 placeholder:text-sm",
                "min-h-[60px]"
              )}
            />
          </div>

          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="group p-2 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1"
              >
                <Paperclip className="w-4 h-4 text-white" />
              </button>
              <button
                className="h-8 w-8 flex items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
              >
                <Globe className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-2 py-1 rounded-lg text-sm text-zinc-400 transition-colors border border-dashed border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 flex items-center justify-between gap-1"
              >
                <PlusIcon className="w-4 h-4" />
                Project
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim()}
                className={cn(
                  "px-1.5 py-1.5 rounded-lg text-sm transition-colors border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 flex items-center justify-between gap-1",
                  input.trim()
                    ? "bg-white text-black"
                    : "text-zinc-400"
                )}
              >
                <ArrowUpIcon
                  className={cn(
                    "w-4 h-4",
                    input.trim()
                      ? "text-black"
                      : "text-zinc-400"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}