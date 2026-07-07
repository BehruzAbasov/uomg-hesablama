"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="h-5 w-5 animate-spin rounded-full border-3 border-blue-300 border-t-blue-600 dark:border-blue-900 dark:border-t-blue-400" />
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
        Processing...
      </span>
    </div>
  );
}
