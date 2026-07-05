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
    "w-full rounded-2xl border bg-white/95 transition-all duration-300 animate-fade-in backdrop-blur-sm",
    variant === "default" && "border-slate-200/80 shadow-lg hover:shadow-xl hover:border-slate-300/80 dark:border-slate-800/80 dark:bg-slate-950/95 dark:hover:border-slate-700/80",
    variant === "accent" && "border-slate-300/80 shadow-xl hover:shadow-2xl dark:border-slate-700/80 dark:bg-slate-900/95",
    className
  );

  return (
    <div className={baseStyles}>
      {(title || subtitle) && (
        <div className="border-b border-slate-200/50 px-6 py-5 dark:border-slate-800/50">
          {title && (
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="px-6 py-5">{children}</div>
    </div>
  );
}
