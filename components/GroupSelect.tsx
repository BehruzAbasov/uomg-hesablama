"use client";

interface GroupSelectProps {
  groups: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function GroupSelect({
  groups,
  value,
  onChange,
  disabled = false,
}: GroupSelectProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="group"
        className="block text-sm font-medium text-slate-700"
      >
        Qrup
      </label>

      <select
        id="group"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          text-slate-800
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          disabled:cursor-not-allowed
          disabled:bg-slate-100
        "
      >
        <option value="">
          Qrup seçin
        </option>

        {groups.map((group) => (
          <option
            key={group}
            value={group}
          >
            {group}
          </option>
        ))}
      </select>
    </div>
  );
}