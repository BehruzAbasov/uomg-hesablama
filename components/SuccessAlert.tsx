"use client";

import { CheckCircle } from "lucide-react";

interface SuccessAlertProps {
  message: string;
}

export default function SuccessAlert({ message }: SuccessAlertProps) {
  return (
    <div className="animate-slide-up flex gap-3 rounded-xl border border-emerald-200/60 bg-emerald-50/80 px-4 py-3.5 text-emerald-900 backdrop-blur-sm duration-300 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-50">
      <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
      <p className="text-sm font-medium leading-relaxed">{message}</p>
    </div>
  );
}
