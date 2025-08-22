import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
    </div>
  );
};

export const LoadingSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("animate-pulse bg-muted rounded", className)} />
  );
};

export const BlogCardSkeleton = () => {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="h-48 bg-muted animate-pulse" />
      <div className="p-6">
        <div className="h-4 bg-muted rounded w-3/4 mb-3 animate-pulse" />
        <div className="h-3 bg-muted rounded w-full mb-2 animate-pulse" />
        <div className="h-3 bg-muted rounded w-2/3 mb-4 animate-pulse" />
        <div className="flex justify-between items-center">
          <div className="h-8 w-8 bg-muted rounded-full animate-pulse" />
          <div className="h-8 w-20 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

