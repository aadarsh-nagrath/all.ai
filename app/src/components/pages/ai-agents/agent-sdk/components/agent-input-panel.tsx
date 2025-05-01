import { motion, AnimatePresence } from "framer-motion";
import NumberFlow from "@number-flow/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { ArrowRight, Info, Loader2, X, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  fadeIn,
  slideInFromRight,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/ai-sdk/sdk-animation";
import { ExamplePrompt, type AgentType } from "@/lib/ai-sdk/sdk-types";

import { formatDisplayText, getDisplayTextFromHistory } from "@/lib/ai-sdk/sdk-utils";
import { GlowEffect, TextEffect } from "./effects";
import { cn } from "@/lib/utils";

interface InputPanelProps {
  selectedAgent: AgentType;
  inputs: Record<string, string>;
  onInputChange: (fieldName: string, value: string) => void;
  onExampleSelect: (example: ExamplePrompt, index: number) => void;
  examplePrompts: ExamplePrompt[];
  selectedExampleIndex: number;
  resetState: () => void;
  children?: React.ReactNode;
}

export function InputPanel({
  inputs,
  selectedAgent,
  onInputChange,
  onExampleSelect,
  examplePrompts,
  selectedExampleIndex,
  resetState,
  children,
}: InputPanelProps) {
  const hasMultipleTextAreas =
    selectedAgent.inputFields.filter((f) => f.type === "textarea").length > 1;
  const hasSingleInputField = selectedAgent.inputFields.length === 1;
  return (
    <motion.div
      variants={slideInFromRight}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full md:w-1/2 lg:w-2/5 mx-2 lg:m-2  rounded-b-2xl rounded-t-sm lg:rounded-2xl p-[1px] flex flex-col h-[calc(100dvh-6rem)] lg:h-auto md:min-h-0 shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.05),_0px_1px_1px_0px_rgba(255,_252,_240,_0.5)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset,_0px_0px_1px_0px_rgba(28,_27,_26,_0.5)]"
    >
      {/* Examples */}
      <ExampleButtons
        examplePrompts={examplePrompts}
        onExampleSelect={onExampleSelect}
        selectedExampleIndex={selectedExampleIndex}
        resetState={resetState}
        selectedAgent={selectedAgent}
      />

      {/* Input Fields */}
      <ScrollArea className="flex-1 w-full">
        <motion.div
          className="p-3 sm:p-4 space-y-5"
          variants={staggerContainerVariants}
          key={selectedAgent.name}
        >
          {selectedAgent.inputFields.map((field, index) => (
            <motion.div
              variants={staggerItemVariants}
              key={index}
              className="space-y-3"
            >
              <div className="flex items-center gap-1.5">
                <Label
                  className={cn(
                    "text-xs font-medium transition-all duration-200"
                  )}
                >
                  {field.label}
                </Label>
                <AnimatePresence>
                  {inputs[field.name]?.trim() && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6, y: 5 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 500,
                          damping: 15,
                          mass: 0.5,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.6,
                        y: 5,
                        transition: {
                          duration: 0.2,
                          ease: "easeOut",
                        },
                      }}
                      className="flex items-center justify-center h-4 w-4 rounded-full bg-green-500/10 ring-1 ring-green-500/30"
                    >
                      <Check className="h-2.5 w-2.5 text-green-500 stroke-[3]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {field.type === "textarea" ? (
                <div className="relative p-1 rounded-[9px] group shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.05),_0px_1px_1px_0px_rgba(255,_252,_240,_0.5)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset,_0px_0px_1px_0px_rgba(28,_27,_26,_0.5)]">
                  <Textarea
                    value={inputs[field.name] || ""}
                    onChange={(e) => onInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className={cn(
                      "rounded-[5px] resize-none text-[16px] leading-snug md:leading-relaxed md:text-[14px] caret-primary border-none ring-1 ring-border ring-offset-muted ring-offset-1 transition-all duration-200 shadow-[0px_1px_0px_0px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_rgba(255,_255,_255,_0.25)] focus-visible:ring-primary focus-visible:ring-[1px] focus-visible:ring-offset-primary/20 focus-visible:ring-offset-2 ease-out",
                      hasMultipleTextAreas
                        ? "min-h-[180px] lg:min-h-[170px]"
                        : "min-h-[220px] lg:min-h-[220px]",
                      hasSingleInputField && "min-h-[320px] lg:min-h-[300px]"
                    )}
                  />
                  <div className="absolute bottom-3 right-3 text-[11px] text-muted-foreground bg-background/80 px-1.5 py-0.5 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.05),_0px_1px_1px_0px_rgba(255,_252,_240,_0.5)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset,_0px_0px_1px_0px_rgba(28,_27,_26,_0.5)]">
                    {(inputs[field.name] || "").length} chars
                  </div>
                </div>
              ) : (
                <Input
                  type="text"
                  value={inputs[field.name] || ""}
                  onChange={(e) => onInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="text-[13px] border-none ring-1 ring-border ring-offset-background ring-offset-4 focus-visible:ring-primary transition-colors duration-200 shadow-[0px_1px_0px_0px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_rgba(255,_255,_255,_0.25)]"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>

      {/* Agent Info Card */}
      <motion.div
        className="flex-none border-t border-border"
        variants={fadeIn}
      >
        <div className="p-2 sm:p-4">
          <Card className="border-none rounded-lg px-2 pt-2 relative shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.05),_0px_1px_1px_0px_rgba(255,_252,_240,_0.5)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset,_0px_0px_1px_0px_rgba(28,_27,_26,_0.5)]">
            <div className="text-[10px] text-muted-foreground space-y-3">
              <div className="space-y-1.5 p-2">
                <h4 className="text-foreground flex items-center gap-1 text-[10px] py-[2px] font-medium">
                  <TextEffect>{selectedAgent.name}</TextEffect>{" "}
                  <span className="text-muted-foreground">pattern is best for</span>
                </h4>

                <div className="leading-relaxed text-[10px]">
                  {selectedAgent.context}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="min-w-[100px] flex items-center gap-1 pl-1 absolute top-1.5 right-1.5 rounded-md px-[2px] py-[1px]">
                  <p className="font-medium text-muted-foreground text-[9px]">
                    Average Processing Time
                  </p>
                  <div className="inline-block bg-muted px-1 py-0.5 text-[9px] rounded-sm text-foreground border border-border">
                    <NumberFlow value={selectedAgent.averageTime ?? 0} />s
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
      {/* Action Buttons passed as children */}
      {children}
    </motion.div>
  );
}

function ExampleButtons({
  examplePrompts,
  onExampleSelect,
  selectedExampleIndex,
  resetState,
  selectedAgent,
}: {
  examplePrompts: ExamplePrompt[];
  onExampleSelect: (example: ExamplePrompt, index: number) => void;
  selectedExampleIndex: number;
  resetState: () => void;
  selectedAgent: AgentType;
}) {
  return (
    <motion.div
      className="flex-none p-2 sm:p-3 md:p-4 border-b border-border rounded-t-2xl"
      variants={fadeIn}
      initial="initial"
      animate="animate"
    >
      <div className="space-y-2 sm:space-y-3">
        <motion.div
          className="flex items-center justify-between"
          variants={{
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
          }}
        >
          <Label className="text-[11px] sm:text-xs font-medium text-muted-foreground">
            Quick Examples
          </Label>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-accent transition-colors duration-200"
              >
                <Info className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="end"
              className="max-w-[200px] sm:max-w-[250px] text-[11px] sm:text-xs p-2 sm:p-3"
            >
              <p className="leading-relaxed">
                This is the Input Panel for the Agent. Different agents have
                different input fields. Select an example to get started.
              </p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
        <motion.div
          className="relative w-full"
          key={`${selectedAgent.id}-examples`}
          variants={{
            initial: { opacity: 0, y: 20, scale: 0.95 },
            animate: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
              },
            },
            exit: {
              opacity: 0,
              y: 20,
              scale: 0.95,
              transition: {
                duration: 0.2,
              },
            },
          }}
        >
          <ScrollArea className="whitespace-nowrap w-full bg-muted ring-border ring-[1px] rounded-[9px] shadow-[0px_1px_0px_0px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_hsla(0,_0%,_0%,_0.02)_inset,_0px_0px_0px_1px_rgba(255,_255,_255,_0.25)]">
            <div
              key={`${selectedAgent.id}-examples-container`}
              className="flex w-max space-x-2 p-1.5"
            >
              {examplePrompts.map((example, index) => (
                <motion.button
                  key={`${selectedAgent.id}-${index}`}
                  variants={{
                    initial: { opacity: 0, x: -20 },
                    animate: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: index * 0.05,
                      },
                    },
                  }}
                  type="button"
                  className={cn(
                    "min-w-fit whitespace-nowrap text-[11px] sm:text-xs py-1 px-2.5 bg-background text-foreground rounded-[6px] transition-all duration-200 hover:bg-accent active:scale-95 touch-manipulation shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.05),_0px_1px_1px_0px_rgba(255,_252,_240,_0.5)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset,_0px_0px_1px_0px_rgba(28,_27,_26,_0.5)] relative group border border-input",
                    index === selectedExampleIndex &&
                      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.2),_0px_1px_1px_0px_rgba(0,0,0,0.1)_inset,_0px_0px_0px_1px_rgba(0,0,0,0.1)_inset] hover:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15),_0px_1px_1px_0px_rgba(0,0,0,0.1)_inset,_0px_0px_0px_1px_rgba(0,0,0,0.1)_inset] pr-7"
                  )}
                  onClick={() => {
                    if (index === selectedExampleIndex) {
                      onExampleSelect(example, -1);
                      resetState();
                    } else {
                      onExampleSelect(example, index);
                    }
                  }}
                >
                  {(() => {
                    const text =
                      example.prompt ||
                      example.content ||
                      example.query ||
                      example.requirements || "";
                    return text.length > 30 ? `${text.slice(0, 30)}...` : text;
                  })()}
                  {index === selectedExampleIndex && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.6,
                        rotate: 90,
                        transition: {
                          duration: 0.2,
                          ease: "easeInOut",
                        },
                      }}
                      whileHover={{
                        scale: 1.15,
                        rotate: 180,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        },
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-1.5 top-1 -translate-y-1/2 p-0.5 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors duration-200 cursor-pointer backdrop-blur-[2px] shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.2)]"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onExampleSelect(example, -1);
                        resetState();
                      }}
                    >
                      <X className="h-3 w-3" strokeWidth={2.5} />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="bg-muted" />
          </ScrollArea>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ActionButtons({
  inputs,
  inputHistory,
  handleHistorySelect,
  handleInputSubmit,
  loading,
  isMobile,
  resetState,
  mobileReOpenOutputDrawer,
}: {
  inputs: Record<string, string>;
  inputHistory: string[];
  handleHistorySelect: (item: string) => void;
  handleInputSubmit: () => void;
  loading: boolean;
  isMobile: boolean;
  resetState: () => void;
  mobileReOpenOutputDrawer: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-4">
      <Button
        variant="ghost"
        size="sm"
        disabled={loading || !Object.values(inputs).some((v) => v.trim())}
        onClick={() => {
          if (isMobile) {
            mobileReOpenOutputDrawer();
            return;
          }
          resetState();
        }}
        className="group h-9 gap-1.5 rounded-lg"
      >
        {isMobile ? (
          <WorkHistoryIcon className="w-3.5 h-3.5" />
        ) : (
          <DeletePutBackIcon className="w-3.5 h-3.5 stroke-destructive" />
        )}
      </Button>
      {!isMobile && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={inputHistory.length === 0}
              className="group h-9 gap-1.5 rounded-lg"
            >
              <WorkHistoryIcon className="w-3.5 h-3.5" />
              <span className="text-xs hidden md:block">History</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[320px] max-h-[400px] overflow-y-auto"
          >
            {inputHistory.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground text-center">
                No history yet
              </div>
            ) : (
              inputHistory.map((item, index) => {
                try {
                  const parsedItem = JSON.parse(item) as Record<string, any>;
                  const displayText = getDisplayTextFromHistory(parsedItem);

                  return (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => handleHistorySelect(item)}
                      className="py-2.5 px-3 break-all cursor-pointer hover:bg-accent"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className="flex-1 truncate text-sm">
                          {formatDisplayText(displayText)}
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                    </DropdownMenuItem>
                  );
                } catch {
                  return null;
                }
              })
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <div className="relative w-full">
        {Object.values(inputs).some((v) => v.trim()) && (
          <GlowEffect
            colors={["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "hsl(var(--muted))"]}
            mode="colorShift"
            blur="soft"
            duration={3}
            scale={1.018}
          />
        )}
        <button
          onClick={handleInputSubmit}
          className="rounded-lg w-full h-9 relative inline-flex text-center justify-center items-center gap-1 bg-primary hover:bg-primary/90 px-2.5 py-1.5 text-sm text-primary-foreground"
        >
          {loading ? (
            <>
              <Loader2 className="size-5 animate-spin mr-1.5" />
              <span className="text-xs">Processing...</span>
            </>
          ) : (
            <>
              <ArtificialIntelligence04Icon className="group-disabled:opacity-50 size-5 transition-all duration-200 ease-in-out group-disabled:fill-primary-foreground group-hover:fill-primary-foreground/80 group-hover:rotate-12 text-primary-foreground stroke-1 fill-primary mr-1.5" />
              <span className="text-xs">
                {isMobile ? "Run & View Output" : "Run Agent"}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

const ArtificialIntelligence04Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color="currentColor"
    fill="none"
    {...props}
  >
    <path
      opacity="0.4"
      d="M4 12C4 8.22876 4 6.34315 5.17157 5.17157C6.34315 4 8.22876 4 12 4C15.7712 4 17.6569 4 18.8284 5.17157C20 6.34315 20 8.22876 20 12C20 15.7712 20 17.6569 18.8284 18.8284C17.6569 20 15.7712 20 12 20C8.22876 20 6.34315 20 5.17157 18.8284C4 17.6569 4 15.7712 4 12Z"
      fill="currentColor"
    />
    <path
      d="M4 12C4 8.22876 4 6.34315 5.17157 5.17157C6.34315 4 8.22876 4 12 4C15.7712 4 17.6569 4 18.8284 5.17157C20 6.34315 20 8.22876 20 12C20 15.7712 20 17.6569 18.8284 18.8284C17.6569 20 15.7712 20 12 20C8.22876 20 6.34315 20 5.17157 18.8284C4 17.6569 4 15.7712 4 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 15L9.34189 9.47434C9.43631 9.19107 9.7014 9 10 9C10.2986 9 10.5637 9.19107 10.6581 9.47434L12.5 15M8.5 13H11.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.5 9V15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 2V4M16 2V4M12 2V4M8 20V22M12 20V22M16 20V22M22 16H20M4 8H2M4 16H2M4 12H2M22 8H20M22 12H20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WorkHistoryIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color="currentColor"
    fill="none"
    {...props}
  >
    <path
      opacity="0.4"
      d="M9.60546 5.5H13.4082C16.9934 5.5 18.7861 5.5 19.8999 6.63496C20.7568 7.50819 20.9544 8.7909 21 11V13C21 13.6016 21 14.1551 20.9952 14.6655C20.1702 13.6493 18.9109 13 17.5 13C15.0147 13 13 15.0147 13 17.5C13 18.9109 13.6493 20.1702 14.6655 20.9952C14.1551 21 13.6015 21 13 21H9.60546C6.02021 21 4.22759 21 3.11379 19.865C2 18.7301 2 16.9034 2 13.25C2 9.59661 2 7.76992 3.11379 6.63496C4.22759 5.5 6.02021 5.5 9.60546 5.5Z"
      fill="currentColor"
    />
    <path
      d="M11.0065 21H9.60546C6.02021 21 4.22759 21 3.11379 19.865C2 18.7301 2 16.9034 2 13.25C2 9.59661 2 7.76992 3.11379 6.63496C4.22759 5.5 6.02021 5.5 9.60546 5.5H13.4082C16.9934 5.5 18.7861 5.5 19.8999 6.63496C20.7568 7.50819 20.9544 8.7909 21 11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.85 18.85L17.5 17.95V15.7M13 17.5C13 19.9853 15.0147 22 17.5 22C19.9853 22 22 19.9853 22 17.5C22 15.0147 19.9853 13 17.5 13C15.0147 13 13 15.0147 13 17.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 5.5L15.9007 5.19094C15.4056 3.65089 15.1581 2.88087 14.5689 2.44043C13.9796 2 13.197 2 11.6316 2H11.3684C9.80304 2 9.02036 2 8.43111 2.44043C7.84186 2.88087 7.59436 3.65089 7.09934 5.19094L7 5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeletePutBackIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color="currentColor"
    fill="none"
    {...props}
  >
    <path
      opacity="0.4"
      d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5H19.5Z"
      fill="currentColor"
    />
    <path
      d="M4.5 5.5L5.08671 15.1781C5.26178 18.066 5.34932 19.5099 6.14772 20.5018C6.38232 20.7932 6.65676 21.0505 6.96304 21.2662C8.00537 22 9.45801 22 12.3633 22H15.9867C17.4593 22 18.7162 20.9398 18.9583 19.4932C19.2643 17.6646 17.8483 16 15.9867 16H13.0357"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 18.5C13.9943 18.0085 12 16.7002 12 16C12 15.2998 13.9943 13.9915 14.5 13.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 5.5H3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M16.0575 5.5L15.3748 4.09173C14.9213 3.15626 14.6946 2.68852 14.3035 2.39681C14.2167 2.3321 14.1249 2.27454 14.0288 2.2247C13.5957 2 13.0759 2 12.0363 2C10.9706 2 10.4377 2 9.99745 2.23412C9.89986 2.28601 9.80675 2.3459 9.71906 2.41317C9.3234 2.7167 9.10239 3.20155 8.66037 4.17126L8.05469 5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 13.5L19.5 5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);