"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
    ImageIcon,
    FileUp,
    Figma,
    MonitorIcon,
    CircleUserRound,
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
    Globe,
} from "lucide-react";
import { useSession } from "next-auth/react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import html from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import "../../../styles/markdown.css";
import { redirect } from "next/navigation";

// Register languages
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('shell', bash);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('md', markdown);
SyntaxHighlighter.registerLanguage('yml', yaml);

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            textarea.style.height = `${minHeight}px`;
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );
            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
    return (
        <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-full border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
        >
            {icon}
            <span className="text-xs">{label}</span>
        </button>
    );
}

export default function SearchInput() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
    const [currentStream, setCurrentStream] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const { data: session } = useSession();
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });

    // Fast typewriter effect
    useEffect(() => {
        if (!isStreaming || !currentStream) return;

        let index = 0;
        const streamingMessageIndex = messages.length;
        
        const typeNextCharacter = () => {
            if (index < currentStream.length) {
                setMessages(prev => {
                    const newMessages = [...prev];
                    if (!newMessages[streamingMessageIndex]) {
                        newMessages.push({
                            role: 'assistant',
                            content: currentStream.substring(0, index + 1)
                        });
                    } else {
                        newMessages[streamingMessageIndex] = {
                            ...newMessages[streamingMessageIndex],
                            content: currentStream.substring(0, index + 1)
                        };
                    }
                    return newMessages;
                });
                index++;
                requestAnimationFrame(typeNextCharacter);
            } else {
                setCurrentStream("");
                setIsStreaming(false);
            }
        };

        const frameId = requestAnimationFrame(typeNextCharacter);
        return () => cancelAnimationFrame(frameId);
    }, [isStreaming, currentStream, messages.length]);

    useEffect(() => {
        if (!session?.user?.email) return;
    
        const wsUrl = `ws://localhost:8000/ws/${encodeURIComponent(session.user.email)}`;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;
    
        ws.onopen = () => {
            console.log("WebSocket connection established");
        };
    
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.message) {
                    if (data.is_final) {
                        setMessages(prev => [...prev, {
                            role: 'assistant',
                            content: data.message
                        }]);
                    } else {
                        setCurrentStream(prev => prev + data.message);
                        setIsStreaming(true);
                    }
                }
            } catch (error) {
                console.error("Error parsing message:", error);
            }
        };
    
        ws.onclose = (event) => {
            console.log("WebSocket closed", event);
        };
    
        ws.onerror = (error) => {
            redirect("/workplace");
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
            adjustHeight(true);
        }
    }, [input, adjustHeight]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }, [handleSend]);

    const renderMarkdown = (content: string) => (
        <div className="prose dark:prose-invert prose-pre:p-0 prose-pre:bg-transparent max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code: ({inline, className, children, ...props}: {
                        inline?: boolean;
                        className?: string;
                        children?: React.ReactNode;
                    } & React.HTMLAttributes<HTMLElement>) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                style={oneDark as any}
                                language={match[1]}
                                PreTag="div"
                                customStyle={{
                                    borderRadius: '6px',
                                    padding: '1rem',
                                    margin: '1rem 0',
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #334155'
                                }}
                                codeTagProps={{
                                    style: {
                                        fontFamily: 'Menlo, Monaco, Courier New, monospace',
                                        fontSize: '0.9em',
                                    }
                                }}
                                showLineNumbers={match[1] !== 'bash' && match[1] !== 'shell'}
                                wrapLines={true}
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={cn("px-1.5 py-0.5 rounded-md bg-gray-200 dark:bg-gray-700", className)} {...props}>
                                {children}
                            </code>
                        );
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-8">
            <h1 className="text-4xl font-bold text-black dark:text-white">
                What can I help you with?
            </h1>

            <div className="w-full space-y-4">
                {messages.map((msg, i) => (
                    <div 
                        key={i} 
                        className={cn(
                            "p-4 rounded-lg",
                            msg.role === 'user' 
                                ? "bg-blue-100 dark:bg-blue-900 ml-auto max-w-[80%]" 
                                : "bg-gray-100 dark:bg-[#171717] mr-auto max-w-[80%]"
                        )}
                    >
                        {msg.role === 'assistant' ? (
                            <div className="markdown-content">
                                {renderMarkdown(msg.content)}
                                {i === messages.length - 1 && isStreaming && (
                                    <span className="ml-1 inline-block h-4 w-1 bg-gray-500 animate-pulse"></span>
                                )}
                            </div>
                        ) : (
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                        )}
                    </div>
                ))}
            </div>

            <div className="w-full">
                <div className="relative bg-neutral-900 rounded-xl border border-neutral-800">
                    <div className="overflow-y-auto">
                        <Textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                adjustHeight();
                            }}
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
                            style={{
                                overflow: "hidden",
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="group p-2 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1"
                            >
                                <Paperclip className="w-4 h-4 text-white" />
                                <span className="text-xs text-zinc-400 hidden group-hover:inline transition-opacity">
                                    Attach
                                </span>
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
                                <span className="sr-only">Send</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-3 mt-4">
                    <ActionButton
                        icon={<ImageIcon className="w-4 h-4" />}
                        label="Clone a Screenshot"
                    />
                    <ActionButton
                        icon={<Figma className="w-4 h-4" />}
                        label="Import from Figma"
                    />
                    <ActionButton
                        icon={<FileUp className="w-4 h-4" />}
                        label="Upload a Project"
                    />
                    <ActionButton
                        icon={<MonitorIcon className="w-4 h-4" />}
                        label="Landing Page"
                    />
                    <ActionButton
                        icon={<CircleUserRound className="w-4 h-4" />}
                        label="Sign Up Form"
                    />
                </div>
            </div>
        </div>
    );
}