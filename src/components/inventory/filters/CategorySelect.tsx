
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Category } from "@/types/inventory";

interface CategorySelectProps {
  value: Category | "all";
  onChange: (value: string) => void;
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div className="bg-[#1A1F2C] p-3 sm:p-4 rounded-xl border border-slate-800/50">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-[#111318] border-slate-700 hover:border-blue-500 transition-colors text-sm">
          <SelectValue placeholder="Category">
            <div className="flex items-center gap-2">
              <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
              {value === "all" ? "All" : value}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <div className="flex items-center gap-2">
              <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
              All
            </div>
          </SelectItem>
          <SelectItem value="Window Tinting">Window Tinting</SelectItem>
          <SelectItem value="PPF">PPF</SelectItem>
          <SelectItem value="Wrap">Wrap</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
