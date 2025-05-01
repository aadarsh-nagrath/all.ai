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
        "bg-neutral-50 text-neutral-900",
        "font-mono text-sm",
        "border border-neutral-200",
        "w-full"
      )}
    >
      {children}
    </pre>
  ),

  code: ({ children, className, ...props }) => (
    <code
      className={cn(
        "relative rounded font-mono text-sm",
        "bg-neutral-100 text-neutral-900",
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
};

export const MarkdownRenderer: FC<MarkdownProps> = memo(
  ({ children, className, components, remarkPlugins, rehypePlugins, ...props }) => (
    <div
      className={cn(
        "prose prose-sm dark:prose-invert",
        "max-w-none break-words overflow-hidden",
        "[&_pre]:bg-neutral-50 [&_pre]:text-neutral-900", // Target pre elements specifically
        "[&_code]:text-neutral-900", // Ensure code text is always visible
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
