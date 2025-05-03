"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertCircle, Clock } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { Separator } from "@/components/ui/separator";

const completionVariants = cva(
  "flex items-center gap-2 rounded-lg p-3 text-sm transition-all duration-200 rounded-full border-[.75px] px-2.5 w-fit h-7 flex items-center text-xs font-medium mb-2 shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.1),_0px_1px_1px_0px_rgba(255,_255,_255,_0.05)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset]",
  {
    variants: {
      variant: {
        success: "border-border/50 text-gray-200 bg-background/60",
        error: "border border-destructive/30 text-destructive/90 bg-destructive/20",
        warning: "border border-warning/30 text-warning/90 bg-warning/20",
        pending: "border border-primary/30 text-primary/90 bg-primary/20",
      },
      size: {
        sm: "text-xs p-2",
        default: "text-sm p-3",
        lg: "text-base p-4",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        spin: "[&>svg]:animate-spin",
      },
    },
    defaultVariants: {
      variant: "success",
      size: "default",
      animation: "none",
    },
  }
);

export interface CompletionIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof completionVariants> {
  status?: "success" | "error" | "warning" | "pending";
  message?: string;
  showIcon?: boolean;
  progress?: number;
  children?: React.ReactNode;
}

export function CompletionIndicator({
  className,
  variant,
  size,
  animation,
  status = "success",
  message,
  showIcon = true,
  progress,
  children,
  ...props
}: CompletionIndicatorProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 shrink-0 fill-green-500/30 stroke-green-400" />,
    error: <XCircle className="h-4 w-4 shrink-0 fill-destructive/30 stroke-destructive/90" />,
    warning: <AlertCircle className="h-4 w-4 shrink-0 fill-warning/30 stroke-warning/90" />,
    pending: <Clock className="h-4 w-4 shrink-0 fill-primary/30 stroke-primary/90" />,
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        completionVariants({
          variant: variant || status,
          size,
          animation: status === "pending" ? "spin" : animation,
        }),
        className
      )}
      {...props}
    >
      {showIcon && icons[status]}
      <div className="flex-1 truncate">
        {message || (
          <>
            {status === "success" && "Completed successfully"}
            {status === "error" && "Failed to complete"}
            {status === "warning" && "Completed with warnings"}
            {status === "pending" && "Processing..."}
          </>
        )}
      </div>
      {typeof progress === "number" && <div className="ml-2 text-xs font-medium">{progress}%</div>}
      {status === "pending" && typeof progress === "number" && (
        <div className="relative h-1 w-20 overflow-hidden rounded-full bg-primary/20">
          <div
            className="absolute inset-y-0 left-0 bg-primary/80 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {children && <Separator orientation="vertical" className="h-full bg-gray-700/50" />}

      {children}
    </div>
  );
}

// Example usage:
// <CompletionIndicator status="success" message="Task completed!" />
// <CompletionIndicator status="pending" progress={75} />
// <CompletionIndicator status="error" message="Failed to process" size="lg" />
// <CompletionIndicator status="warning" animation="pulse" />
