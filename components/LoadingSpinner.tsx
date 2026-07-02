"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900 dark:border-slate-700 dark:border-t-slate-50" />
      <span className="text-sm text-slate-600 dark:text-slate-400">
        Processing...
      </span>
    </div>
  );
}
