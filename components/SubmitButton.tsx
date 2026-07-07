"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <Button
      type="submit"
      disabled={disabled || loading}
      className="w-full gap-2"
    >
      {loading && <Loader2 className="animate-spin" />}
      {loading ? loadingText : text}
    </Button>
  );
}
