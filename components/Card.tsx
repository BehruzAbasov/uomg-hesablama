import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: "default" | "accent";
}

export default function Card({
  children,
  title,
  subtitle,
  className = "",
  variant = "default",
}: CardProps) {
  const baseStyles = cn(
    "w-full rounded-xl border bg-white transition-all duration-300",
    variant === "default" && "border-slate-200 shadow-sm hover:shadow-lg dark:border-slate-800 dark:bg-slate-950",
    variant === "accent" && "border-slate-300 shadow-md hover:shadow-xl dark:border-slate-700 dark:bg-slate-900",
    className
  );

  return (
    <div className={baseStyles}>
      {(title || subtitle) && (
        <div className="border-b border-slate-200 p-6 dark:border-slate-800">
          {title && (
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="p-6">{children}</div>
    </div>
  );
}
