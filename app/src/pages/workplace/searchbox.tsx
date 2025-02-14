import { ChevronDown, Globe, Paperclip, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

export default function SearchInput() {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    const textarea = textareaRef.current;
    if (!textarea) return; // Prevent null access

    textarea.style.height = "auto";
    // Max height before scrolling
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; 
  };

  return (
    <div className="w-[50%] max-w-6xl mx-auto p-4">
      <div className="relative flex flex-col gap-2 rounded-xl bg-zinc-900 p-2 border border-zinc-700 focus-within:border-zinc-500 transition-all w-full">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder="Type here to ask anything..."
          className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-400 outline-none resize-none overflow-y-auto max-h-[200px] p-2"
        />

        <div className="flex justify-between items-center mt-2 w-full">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 flex items-center gap-1 rounded-md px-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
            >
              <span>Auto</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 flex items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
            >
              <Globe className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 flex items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
