"use client";

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
    // Vergülü nöqtəyə çevir
    input = input.replace(",", ".");

    // Yalnız rəqəm və nöqtə
    if (!/^\d*\.?\d*$/.test(input)) return;

    // 100-dən böyük olmasın
    const number = Number(input);

    if (input !== "" && !isNaN(number) && number > 100) {
      return;
    }

    onChange(input);
  };

  return (
    <div className="mb-6 w-full">
      <label
        htmlFor="gpa"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id="gpa"
        type="text"
        inputMode="decimal"
        autoComplete="off"
        spellCheck={false}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          text-slate-800
          placeholder:text-slate-400
          outline-none
          transition
          duration-200
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          disabled:cursor-not-allowed
          disabled:bg-slate-100
        "
      />

      <p className="mt-2 text-xs text-slate-500">
        ÜOMG dəyəri 0 ilə 100 arasında olmalıdır.
      </p>
    </div>
  );
}