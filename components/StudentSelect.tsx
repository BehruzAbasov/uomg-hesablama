"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
        Tələbə
      </label>

      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder="Tələbə seçin" />
        </SelectTrigger>
        <SelectContent>
          {students.length === 0 ? (
            <div className="px-2 py-1.5 text-sm text-slate-500">
              Tələbə yoxdur
            </div>
          ) : (
            students.map((student) => (
              <SelectItem key={student.id} value={student.id}>
                {student.fullname}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
