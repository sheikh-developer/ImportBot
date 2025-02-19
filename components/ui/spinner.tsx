import { cn } from "@/lib/utils"

interface SpinnerProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export function Spinner({ size = "medium", className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-t-2 border-b-2 border-gray-900",
        {
          "h-4 w-4": size === "small",
          "h-8 w-8": size === "medium",
          "h-12 w-12": size === "large",
        },
        className,
      )}
    />
  )
}

