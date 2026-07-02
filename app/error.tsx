"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
          Xəta baş verdi
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Bir xəta baş verdi. Lütfən yenidən cəhd edin.
        </p>
        <Button onClick={reset} className="mt-8">
          Yenidən cəhd et
        </Button>
      </div>
    </div>
  );
}
