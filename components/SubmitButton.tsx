"use client";

import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  loadingText?: string;
}

export default function SubmitButton({
  loading = false,
  disabled = false,
  text = "Təsdiqlə",
  loadingText = "Göndərilir...",
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-blue-600
        px-4
        py-3
        text-base
        font-semibold
        text-white
        transition-all
        duration-200
        hover:bg-blue-700
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:bg-slate-400
        disabled:opacity-80
      "
    >
      {loading && (
        <Loader2
          size={18}
          className="animate-spin"
        />
      )}

      {loading ? loadingText : text}
    </button>
  );
}