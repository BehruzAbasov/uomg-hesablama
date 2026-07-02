"use client";

import { Student } from "@/types/student";

interface StudentSelectProps {
  students: Student[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function StudentSelect({
  students,
  value,
  onChange,
  disabled = false,
}: StudentSelectProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="student"
        className="block text-sm font-medium text-slate-700"
      >
        Tələbə
      </label>

      <select
        id="student"
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
          Tələbə seçin
        </option>

        {students.map((student) => (
          <option
            key={student.id}
            value={student.id}
          >
            {student.fullname}
          </option>
        ))}
      </select>
    </div>
  );
}