"use client";

import { CheckCircle } from "lucide-react";

interface SuccessAlertProps {
  message: string;
}

export default function SuccessAlert({ message }: SuccessAlertProps) {
  return (
    <div className="flex gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 animate-in fade-in slide-in-from-top-2 duration-300 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-50">
      <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
