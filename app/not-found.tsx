import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-50">
          404
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Səhifə tapılmadı
        </p>
        <Link href="/" className="mt-8 inline-block">
          <Button>Ana Səhifəyə Qayıt</Button>
        </Link>
      </div>
    </div>
  );
}
