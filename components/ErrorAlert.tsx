"use client";

import { AlertCircle } from "lucide-react";

interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-900 animate-in fade-in slide-in-from-top-2 duration-300 dark:border-red-900 dark:bg-red-950 dark:text-red-50">
      <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
