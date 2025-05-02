import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CompletionIndicator } from "./completion-indicator";
import { Countdown, EmptyState, LoadingState } from "./agent-states";
import { MemoizedReactMarkdown } from "./markdown-renderer";
import { formatJSONString } from "@/lib/ai-sdk/sdk-utils";
import { slideInFromRight } from "@/lib/ai-sdk/sdk-animation";
import { type AgentType } from "@/lib/ai-sdk/sdk-types";
import { AgentOutputCards } from "./agent-output-cards";
import { TokenCounter } from "./token-counter";

interface OutputPanelProps {
  selectedAgent: AgentType;
  loading: boolean;
  output: string;
  parsedOutput: any;
}

interface TabContentProps {
  parsedOutput: any;
}

function ResponseTab({ parsedOutput }: TabContentProps) {
  return (
    <TabsContent value="response" className="mt-4 space-y-4">
      <Card className="p-4 bg-background/50 border-none shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.1),_0px_1px_1px_0px_rgba(255,_255,_255,_0.05)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset]">
        <CompletionIndicator
          status={parsedOutput.error ? "error" : "success"}
          message={parsedOutput.text || parsedOutput.response || parsedOutput.finalOutput || parsedOutput.output}
          className="mb-4"
        />
        <div className="max-w-full overflow-x-auto text-gray-100">
          <MemoizedReactMarkdown>
            {formatJSONString(
              parsedOutput.text || parsedOutput.response || parsedOutput.finalOutput || parsedOutput.output
            )}
          </MemoizedReactMarkdown>
        </div>
      </Card>
    </TabsContent>
  );
}

function StepsTab({ parsedOutput }: TabContentProps) {
  if (!parsedOutput.steps?.length) return null;
  return (
    <TabsContent value="steps" className="mt-4 space-y-4">
      {parsedOutput.steps.map((step: any, index: number) => (
        <Card key={index} className="p-4 bg-background/50 border-none shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.1),_0px_1px_1px_0px_rgba(255,_255,_255,_0.05)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset]">
          <CompletionIndicator
            status="success"
            message={`${step.step || `Step ${index + 1}`}: ${step.output ? "completed" : "success"}`}
            className="mb-2"
          />
          <MemoizedReactMarkdown className="text-gray-100">{step.output || step.result || step.text}</MemoizedReactMarkdown>
        </Card>
      ))}
    </TabsContent>
  );
}

function ClassificationTab({ parsedOutput }: TabContentProps) {
  if (!parsedOutput.classification) return null;
  return (
    <TabsContent value="classification" className="mt-4 space-y-4">
      <Card className="p-4 bg-background/50 border-none shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.1),_0px_1px_1px_0px_rgba(255,_255,_255,_0.05)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset]">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2 text-gray-200">Query Classification</h4>
            <Badge className="mb-2">{parsedOutput.classification.type}</Badge>
            <p className="text-sm text-gray-300">{parsedOutput.classification.reasoning}</p>
          </div>
          <div className="pt-4 border-t border-border/30">
            <h4 className="text-sm font-medium mb-2 text-gray-200">Routed Response</h4>
            <MemoizedReactMarkdown className="text-gray-100">{parsedOutput.response}</MemoizedReactMarkdown>
          </div>
        </div>
      </Card>
    </TabsContent>
  );
}

function ToolsTab({ parsedOutput }: TabContentProps) {
  if (!parsedOutput.toolCalls?.length) return null;
  return (
    <TabsContent value="tools" className="mt-4 space-y-4">
      {parsedOutput.toolCalls.map((tool: any, index: number) => (
        <Card key={index} className="p-4 bg-background/50 border-none shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.1),_0px_1px_1px_0px_rgba(255,_255,_255,_0.05)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset]">
          <CompletionIndicator status="success" message={`${tool.name || `Tool ${index + 1}`}`} className="mb-2" />
          <div className="space-y-2">
            <div className="text-sm text-gray-300">
              <MemoizedReactMarkdown>{tool.input || tool.args || tool.parameters}</MemoizedReactMarkdown>
            </div>
            {tool.output && (
              <div className="pt-2 border-t border-border/30">
                <h4 className="text-xs font-medium mb-1 text-gray-200">Output</h4>
                <MemoizedReactMarkdown className="text-gray-100">{tool.output}</MemoizedReactMarkdown>
              </div>
            )}
          </div>
        </Card>
      ))}
    </TabsContent>
  );
}

function IterationsTab({ parsedOutput }: TabContentProps) {
  if (!parsedOutput.iterations?.length) return null;
  return (
    <TabsContent value="iterations" className="mt-4 space-y-4">
      {parsedOutput.iterations.map((iteration: any, index: number) => (
        <Card key={index} className="p-4 bg-background/50 border-none shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.1),_0px_1px_1px_0px_rgba(255,_255,_255,_0.05)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset]">
          <CompletionIndicator status="success" message={`Iteration ${index + 1}`} className="mb-2" />
          <div className="space-y-2">
            <MemoizedReactMarkdown className="text-gray-100">{iteration.output || iteration.result || iteration.text}</MemoizedReactMarkdown>
          </div>
        </Card>
      ))}
    </TabsContent>
  );
}

export function OutputPanel({ selectedAgent, loading, output, parsedOutput }: OutputPanelProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let msTimer: NodeJS.Timeout;

    if (loading) {
      setElapsedTime(0);
      setMilliseconds(0);
      timer = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
      msTimer = setInterval(() => setMilliseconds((prev) => (prev + 10) % 1000), 10);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (msTimer) clearInterval(msTimer);
    };
  }, [loading]);

  const renderCustomOutput = () => {
    const AgentOutput = AgentOutputCards[selectedAgent.id as keyof typeof AgentOutputCards]?.renderOutput;
    if (AgentOutput && parsedOutput) {
      return (
        <div className="space-y-4 max-w-full">
          <div className="max-w-full overflow-x-auto">
            <AgentOutput {...parsedOutput} />
          </div>
        </div>
      );
    }
    return null;
  };

  const renderTabs = () => {
    if (!output) return null;

    const customOutput = renderCustomOutput();
    if (customOutput) return customOutput;

    const availableTabs = selectedAgent.resultTabs || ["response"];

    return (
      <Tabs defaultValue="response" className="w-full">
        <TabsList className="grid w-full bg-background/30 border-none shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.1),_0px_1px_1px_0px_rgba(255,_255,_255,_0.05)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset]" style={{ gridTemplateColumns: `repeat(${availableTabs.length}, 1fr)` }}>
          {availableTabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="data-[state=active]:bg-background/60 data-[state=active]:text-white data-[state=active]:shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.1),_0px_1px_1px_0px_rgba(255,_255,_255,_0.05)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.2)_inset] text-gray-400 hover:text-gray-200"
              disabled={
                (tab === "steps" && !parsedOutput.steps?.length) ||
                (tab === "tools" && !parsedOutput.toolCalls?.length) ||
                (tab === "iterations" && !parsedOutput.iterations?.length)
              }
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-4 space-y-4">
          <ResponseTab parsedOutput={parsedOutput} />
          <StepsTab parsedOutput={parsedOutput} />
          <ClassificationTab parsedOutput={parsedOutput} />
          <ToolsTab parsedOutput={parsedOutput} />
          <IterationsTab parsedOutput={parsedOutput} />
        </div>
      </Tabs>
    );
  };

  return (
    <motion.div
      variants={slideInFromRight}
      initial="initial"
      animate="animate"
      exit="exit"
      className="hidden md:flex w-full md:w-1/2 lg:w-3/5 mx-2 lg:m-2 rounded-2xl p-4 flex-col overflow-hidden h-full"
    >
      <h2 className="absolute top-4 right-4 hidden md:block text-[9px] font-medium text-muted-foreground">
        {loading ? "Processing..." : "Output"}
      </h2>
      {/* Header with Indicators */}
      <div className="flex-none flex items-center justify-between w-full px-4 py-2 border-b border-border/50">
        {!loading && parsedOutput && (
          <CompletionIndicator
            status={parsedOutput?.error ? "error" : "success"}
            message={parsedOutput?.error ? `Failed to process request ${parsedOutput?.message}` : "Tokens"}
            className="hidden md:flex items-center mb-0"
          >
            <AnimatePresence mode="wait">
              {parsedOutput?.usage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TokenCounter
                    promptTokens={parsedOutput?.usage?.promptTokens}
                    completionTokens={parsedOutput?.usage?.completionTokens}
                    totalTokens={parsedOutput?.usage?.totalTokens}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </CompletionIndicator>
        )}

        {(loading || output) && (
          <Countdown seconds={elapsedTime} milliseconds={loading ? milliseconds : 0} loading={loading} />
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {loading ?
            <div className="flex flex-col">
              <LoadingState agent={selectedAgent} elapsedTime={elapsedTime} />
            </div>
          : output ?
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-16">
              {renderTabs()}
            </motion.div>
          : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <EmptyState agent={selectedAgent} />
            </motion.div>
          }
        </div>
      </div>
    </motion.div>
  );
}
