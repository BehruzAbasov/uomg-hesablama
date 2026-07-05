"use client";

import { Input } from "@/components/ui/input";

interface GPAInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
}

export default function GPAInput({
  value,
  onChange,
  disabled = false,
  label = "ÜOMG",
  placeholder = "Məsələn: 87.45",
}: GPAInputProps) {
  const handleChange = (input: string) => {
    input = input.replace(",", ".");

    if (!/^\d*\.?\d*$/.test(input)) return;

    const number = Number(input);

    if (input !== "" && !isNaN(number) && number > 100) {
      return;
    }

    onChange(input);
  };

  return (
    <div className="space-y-3">
      <label
        htmlFor="gpa"
        className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>

      <Input
        id="gpa"
        type="text"
        inputMode="decimal"
        autoComplete="off"
        spellCheck={false}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        className="input-elegant"
      />

      <p className="text-xs text-slate-500 dark:text-slate-400">
        ÜOMG dəyəri 0 ilə 100 arasında olmalıdır.
      </p>
    </div>
  );
}
