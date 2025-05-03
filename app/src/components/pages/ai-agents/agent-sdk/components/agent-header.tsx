import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Copy, Eraser, MoreVertical } from "lucide-react";
import { type AgentType } from "@/lib/ai-sdk/sdk-types";
import { agentSelectorVariants } from "@/lib/ai-sdk/sdk-animation";
import { useMediaQuery } from "@/hooks/use-media-query";

interface AgentHeaderProps {
  selectedAgent: string;
  onAgentChange: (agentId: string) => void;
  onCopyInput: () => void;
  onClearInput: () => void;
  hasInput: boolean;
  agentTypes: AgentType[];
}

export function AgentHeader({
  selectedAgent,
  onAgentChange,
  onCopyInput,
  onClearInput,
  hasInput,
  agentTypes,
}: AgentHeaderProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <motion.header className="flex items-center justify-between gap-4 p-4 bg-background dark:bg-background border-b border-border">
      <div className="flex items-center gap-2 ">
        <div className="p-1 bg-background dark:bg-background rounded-full hidden lg:block">
          <VercelIcon className="size-4 stroke-foreground" />
        </div>
        <span className="text-xs text-muted-foreground hidden lg:block">/</span>
        <h1 className="text-xs font-bold tracking-tight inline-flex items-center gap-1">
          <span className="hidden lg:block text-foreground">AI</span>
          <span className="hidden lg:block text-foreground">SDK</span>
          <span className="text-xs text-muted-foreground px-1 hidden lg:block">/</span>
          <div className="bg-primary text-primary-foreground font-medium px-1.5 py-0.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.15),_inset_0_1px_0.5px_rgba(255,255,255,0.2),_0_-0.5px_1px_rgba(0,0,0,0.08)_inset,_0_0_0_1px_rgba(0,0,0,0.08)_inset] relative">
            <span className="relative z-10">Agents</span>
          </div>
        </h1>
      </div>
      {isMobile ?
        <Select value={selectedAgent} onValueChange={onAgentChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {agentTypes.map((agent) => (
              <SelectItem key={agent.id} value={agent.id}>
                <motion.div
                  className="flex items-center gap-2"
                  variants={agentSelectorVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="font-medium">{agent.name}</span>
                </motion.div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      : <div className="flex items-center gap-1 rounded-full">
          {agentTypes.map((agent) => (
            <button
              key={agent.id}
              onClick={() => onAgentChange(agent.id)}
              className={`${
                selectedAgent === agent.id ? "text-foreground font-medium" : "hover:text-foreground/60 text-foreground/80"
              } relative rounded-full px-3 py-1.5 text-xs outline-primary transition focus-visible:outline-2`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {selectedAgent === agent.id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-accent mix-blend-difference shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.05),_0px_1px_1px_0px_rgba(255,_252,_240,_0.5)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset,_0px_0px_1px_0px_rgba(28,_27,_26,_0.5)]"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                ></motion.span>
              )}

              {agent.name}
            </button>
          ))}
        </div>
      }

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 md:h-9 md:w-9 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuItem
            onClick={onCopyInput}
            disabled={!hasInput}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Copy className="h-4 w-4" />
            <span>Copy Input</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onClearInput}
            disabled={!hasInput}
            className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
          >
            <Eraser className="h-4 w-4" />
            <span>Clear Input</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.header>
  );
}

export function VercelIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 256 222"
      width="256"
      height="222"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <path fill="currentColor" d="m128 0 128 221.705H0z" />
    </svg>
  );
}
