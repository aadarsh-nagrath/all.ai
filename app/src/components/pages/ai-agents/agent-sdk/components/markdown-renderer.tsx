import { type FC, memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import { type Plugin } from "unified";

import { cn } from "@/lib/utils";

interface MarkdownProps {
  children: string;
  className?: string;
  components?: Components;
  remarkPlugins?: Plugin[];
  rehypePlugins?: Plugin[];
}

const defaultComponents: Components = {
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className={cn(
        "overflow-x-auto p-4 rounded-lg",
        "bg-background/50 text-gray-200",
        "font-mono text-sm",
        "border border-border/30",
        "w-full shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.1),_0px_1px_1px_0px_rgba(255,_255,_255,_0.05)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset]"
      )}
    >
      {children}
    </pre>
  ),

  code: ({ children, className, ...props }) => (
    <code
      className={cn(
        "relative rounded font-mono text-sm",
        "bg-background/60 text-gray-200",
        "py-[0.2rem] px-[0.3rem]",
        "whitespace-pre-wrap break-words",
        // If inside a pre (code block), use different styling
        "not-prose", // Disable prose styling for code blocks
        className?.includes("language-") ? "block" : "inline-block",
        className
      )}
      {...props}
    >
      {children}
    </code>
  ),
  
  // Add styling for other common markdown elements
  h1: ({ children, ...props }) => (
    <h1 {...props} className="text-white font-semibold my-4 text-2xl">{children}</h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 {...props} className="text-white font-semibold my-3 text-xl">{children}</h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props} className="text-white font-semibold my-3 text-lg">{children}</h3>
  ),
  p: ({ children, ...props }) => (
    <p {...props} className="text-gray-200 mb-4">{children}</p>
  ),
  ul: ({ children, ...props }) => (
    <ul {...props} className="text-gray-200 pl-6 list-disc mb-4">{children}</ul>
  ),
  ol: ({ children, ...props }) => (
    <ol {...props} className="text-gray-200 pl-6 list-decimal mb-4">{children}</ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="text-gray-200 mb-1">{children}</li>
  ),
  a: ({ children, ...props }) => (
    <a {...props} className="text-primary hover:text-primary/80 underline underline-offset-2">{children}</a>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote {...props} className="border-l-4 border-gray-700 pl-4 italic text-gray-300 my-4">{children}</blockquote>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-4">
      <table {...props} className="min-w-full text-gray-200 border border-gray-700/50 rounded-md">{children}</table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th {...props} className="bg-gray-800/50 text-gray-200 px-4 py-2 border-b border-gray-700/50">{children}</th>
  ),
  td: ({ children, ...props }) => (
    <td {...props} className="px-4 py-2 border-b border-t border-gray-700/30">{children}</td>
  ),
};

export const MarkdownRenderer: FC<MarkdownProps> = memo(
  ({ children, className, components, remarkPlugins, rehypePlugins, ...props }) => (
    <div
      className={cn(
        "prose prose-sm dark:prose-invert",
        "max-w-none break-words overflow-hidden",
        "[&_pre]:bg-background/50 [&_pre]:text-gray-200", // Target pre elements specifically
        "[&_code]:text-gray-200", // Ensure code text is always visible
        "text-gray-200",
        className
      )}
    >
      <ReactMarkdown 
        components={{ ...defaultComponents, ...components }} 
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        {...props}
      >
        {children}
      </ReactMarkdown>
    </div>
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children && prevProps.className === nextProps.className
);

MarkdownRenderer.displayName = "MarkdownRenderer";

// For backward compatibility
export const MemoizedReactMarkdown = MarkdownRenderer;
