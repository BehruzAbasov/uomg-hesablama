"use client";

import { AlertCircle } from "lucide-react";

interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="animate-slide-up flex gap-3 rounded-xl border border-red-200/60 bg-red-50/80 px-4 py-3.5 text-red-900 backdrop-blur-sm duration-300 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-50">
      <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
      <p className="text-sm font-medium leading-relaxed">{message}</p>
    </div>
  );
}
