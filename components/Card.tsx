import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function Card({
  children,
  title,
  subtitle,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        w-full
        max-w-md
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-lg
        transition-all
        duration-300
        hover:shadow-xl
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h1 className="text-2xl font-bold text-slate-800">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}
    </div>
  );
}