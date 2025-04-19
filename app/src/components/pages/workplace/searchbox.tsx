"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
    Globe,
    ImageIcon,
    Figma,
    FileUp,
    MonitorIcon,
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
import { motion, AnimatePresence } from "framer-motion";

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

interface SearchInputProps {
    onMessageSent?: () => void;
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
    return (
        <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-accent rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
        >
            {icon}
            <span className="text-xs">{label}</span>
        </button>
    );
}

export default function SearchInput({ onMessageSent }: SearchInputProps) {
    const [showHeading, setShowHeading] = useState(true);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
    const [currentStream, setCurrentStream] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
    const [shouldStopStream, setShouldStopStream] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const reconnectAttemptsRef = useRef(0);
    const maxReconnectAttempts = 5;
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { data: session } = useSession();
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });
    const animationFrameRef = useRef<number | null>(null);

    const connectWebSocket = useCallback(() => {
        if (!session?.user?.email) return;

        const wsUrl = `ws://localhost:8000/ws/${encodeURIComponent(session.user.email)}`;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket connection established");
            reconnectAttemptsRef.current = 0; // Reset reconnection attempts on successful connection
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message) {
                setIsStreaming(true);
                setCurrentStream(data.message);
            }
        };

        ws.onclose = (event) => {
            console.log("WebSocket closed", event);
            if (event.code === 1000) {
                console.log("Normal closure");
            } else {
                console.log("Abnormal closure - attempting to reconnect");
                if (reconnectAttemptsRef.current < maxReconnectAttempts) {
                    const backoffTime = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
                    reconnectTimeoutRef.current = setTimeout(() => {
                        reconnectAttemptsRef.current += 1;
                        connectWebSocket();
                    }, backoffTime);
                } else {
                    console.log("Max reconnection attempts reached");
                }
            }
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }, [session?.user?.email]);

    useEffect(() => {
        connectWebSocket();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, [connectWebSocket]);

    const messagesRef = useRef(messages);
    messagesRef.current = messages;

    // Fast typewriter effect
    useEffect(() => {
        if (!isStreaming || !currentStream) return;

        let index = 0;
        const streamingMessageIndex = messagesRef.current.length;
        
        const typeNextCharacter = () => {
            if (index < currentStream.length && !shouldStopStream) {
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
                animationFrameRef.current = requestAnimationFrame(typeNextCharacter);
            } else if (shouldStopStream) {
                // When stopped, keep the current message but stop the animation
                setMessages(prev => {
                    const newMessages = [...prev];
                    if (!newMessages[streamingMessageIndex]) {
                        newMessages.push({
                            role: 'assistant',
                            content: currentStream.substring(0, index)
                        });
                    } else {
                        newMessages[streamingMessageIndex] = {
                            ...newMessages[streamingMessageIndex],
                            content: currentStream.substring(0, index)
                        };
                    }
                    return newMessages;
                });
                setIsStreaming(false);
                setShouldStopStream(false);
            } else {
                setCurrentStream("");
                setIsStreaming(false);
            }
        };

        animationFrameRef.current = requestAnimationFrame(typeNextCharacter);
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isStreaming, currentStream, shouldStopStream]);

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
            setShowHeading(false);
            setIsFixed(true);
            if (onMessageSent) {
                onMessageSent();
            }
        } else {
            console.error("WebSocket is not open");
        }
    }, [input, adjustHeight, onMessageSent]);

    const handleStopStream = useCallback(() => {
        setShouldStopStream(true);
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    }, []);

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

    // Handle user scrolling
    const handleScroll = useCallback(() => {
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        
        if (chatContainerRef.current) {
            const container = chatContainerRef.current;
            const isNearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight * 1.1;
            setIsAtBottom(isNearBottom);
            
            // If user scrolls up during streaming, disable auto-scroll
            if (isStreaming && !isNearBottom) {
                setShouldAutoScroll(false);
            }
        }
        
        scrollTimeoutRef.current = setTimeout(() => {
            // Reset auto-scroll after user stops scrolling
            if (isAtBottom) {
                setShouldAutoScroll(true);
            }
        }, 1000);
    }, [isStreaming, isAtBottom]);

    // Auto-scroll to bottom when messages change or streaming updates
    useEffect(() => {
        if (messagesEndRef.current && chatContainerRef.current && shouldAutoScroll && isAtBottom) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, currentStream, shouldAutoScroll, isAtBottom]);

    // Reset auto-scroll when streaming stops
    useEffect(() => {
        if (!isStreaming) {
            setShouldAutoScroll(true);
        }
    }, [isStreaming]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-8">
            <AnimatePresence>
                {showHeading && (
                    <motion.h1
                        initial={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-4xl font-bold text-foreground"
                    >
                        What can I help you with?
                    </motion.h1>
                )}
            </AnimatePresence>

            <div className="w-full space-y-4 flex-1 overflow-y-auto pb-32" ref={chatContainerRef} onScroll={handleScroll}>
                {messages.map((msg, i) => (
                    <div 
                        key={i} 
                        className={cn(
                            "p-4 rounded-lg",
                            msg.role === 'user' 
                                ? "bg-primary/10 ml-auto w-fit max-w-[80%]" 
                                : "bg-transparent mr-auto w-full max-w-[80%]"
                        )}
                    >
                        {msg.role === 'assistant' ? (
                            <div className="markdown-content">
                                {renderMarkdown(msg.content)}
                                {i === messages.length - 1 && isStreaming && (
                                    <span className="ml-1 inline-block h-4 w-1 bg-muted-foreground animate-pulse"></span>
                                )}
                            </div>
                        ) : (
                            <p className="whitespace-pre-wrap text-foreground text-right">{msg.content}</p>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <motion.div 
                className={cn(
                    "w-full",
                    isFixed ? "fixed bottom-0 left-0 right-0 bg-transparent border-border" : ""
                )}
                initial={false}
                animate={{ y: isFixed ? 0 : "auto" }}
                transition={{ duration: 0.3 }}
            >
                <div className="max-w-4xl mx-auto p-4">
                    <div className="relative bg-secondary rounded-xl border border-border">
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
                                    "text-foreground text-sm",
                                    "focus:outline-none",
                                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                                    "placeholder:text-muted-foreground placeholder:text-sm",
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
                                    className="group p-2 hover:bg-accent rounded-lg transition-colors flex items-center gap-1"
                                >
                                    <Paperclip className="w-4 h-4 text-foreground" />
                                    <span className="text-xs text-muted-foreground hidden group-hover:inline transition-opacity">
                                        Attach
                                    </span>
                                </button>
                                <button
                                    className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                                >
                                    <Globe className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="px-2 py-1 rounded-lg text-sm text-muted-foreground transition-colors border border-dashed border-border hover:border-accent hover:bg-accent flex items-center justify-between gap-1"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    Project
                                </button>
                                <button
                                    type="button"
                                    onClick={isStreaming ? handleStopStream : handleSend}
                                    disabled={!input.trim() && !isStreaming}
                                    className={cn(
                                        "px-1.5 py-1.5 rounded-lg text-sm transition-colors border border-border hover:border-accent hover:bg-accent flex items-center justify-center",
                                        isStreaming 
                                            ? "w-8 h-8"
                                            : input.trim()
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground"
                                    )}
                                >
                                    {isStreaming ? (
                                        <div className="w-3 h-3 bg-destructive animate-pulse" />
                                    ) : (
                                        <ArrowUpIcon
                                            className={cn(
                                                "w-4 h-4",
                                                input.trim()
                                                    ? "text-primary-foreground"
                                                    : "text-muted-foreground"
                                            )}
                                        />
                                    )}
                                    <span className="sr-only">{isStreaming ? "Stop" : "Send"}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {!isFixed && (
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
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}