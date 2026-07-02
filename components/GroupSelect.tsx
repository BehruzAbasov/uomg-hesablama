"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Qrup
      </label>

      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder="Qrup seçin" />
        </SelectTrigger>
        <SelectContent>
          {groups.length === 0 ? (
            <div className="px-2 py-1.5 text-sm text-slate-500">
              Qrup yoxdur
            </div>
          ) : (
            groups.map((group) => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
