
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FilterFields } from "./FilterFields";
import { Button } from "@/components/ui/button";
import { Filters } from "@/types/inventory";
import { Filter, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
  itemCount?: number;
}

export function FilterSheet({
  open,
  onOpenChange,
  filters,
  onFilterChange,
  onClearFilters,
  onApplyFilters,
  itemCount,
}: FilterSheetProps) {
  const [useInches, setUseInches] = useState(true);
  const maxLength = useInches ? 2362.2 : 60; // 60m = ~2362.2"
  const maxWidth = useInches ? 71.65 : 1.82; // 1.82m = ~71.65"

  const handleApplyFilters = () => {
    onApplyFilters();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-[#111318] border-none p-0 flex flex-col h-[100dvh]">
        <SheetHeader className="p-4 border-b border-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-blue-500/10">
              <Filter className="w-4 h-4 text-blue-500" />
            </div>
            <SheetTitle className="text-white text-base font-medium">Filters</SheetTitle>
          </div>
        </SheetHeader>

        <div className="px-4 py-6 space-y-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
          <div className="space-y-6">
            <div className="bg-[#1A1F2C] p-4 rounded-xl border border-slate-800/50">
              <Select
                value={filters.category || "all"}
                onValueChange={(value: "Window Tinting" | "PPF" | "Wrap" | "all") => 
                  onFilterChange({ ...filters, category: value })}
              >
                <SelectTrigger className="bg-[#111318] border-slate-700 hover:border-blue-500 transition-colors">
                  <SelectValue placeholder="Category">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-blue-500" />
                      {filters.category === "all" ? "All" : filters.category}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      All
                    </div>
                  </SelectItem>
                  <SelectItem value="Window Tinting">Window Tinting</SelectItem>
                  <SelectItem value="PPF">PPF</SelectItem>
                  <SelectItem value="Wrap">Wrap</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-end space-x-2">
              <span className="text-sm text-slate-400">Meters</span>
              <Switch
                checked={useInches}
                onCheckedChange={setUseInches}
              />
              <span className="text-sm text-slate-400">Inches</span>
            </div>

            <div className="bg-[#1A1F2C] p-4 rounded-xl border border-slate-800/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Length Range</span>
                <span className="text-xs text-slate-400">
                  Max: {maxLength}{useInches ? '"' : 'm'}
                </span>
              </div>
              <Slider
                defaultValue={[0, maxLength]}
                max={maxLength}
                step={0.01}
                onValueChange={(values) => {
                  onFilterChange({
                    ...filters,
                    minLength: values[0].toString(),
                    maxLength: values[1].toString(),
                  });
                }}
                className="py-2"
              />
            </div>

            <div className="bg-[#1A1F2C] p-4 rounded-xl border border-slate-800/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Width Range</span>
                <span className="text-xs text-slate-400">
                  Max: {maxWidth}{useInches ? '"' : 'm'}
                </span>
              </div>
              <Slider
                defaultValue={[0, maxWidth]}
                max={maxWidth}
                step={0.01}
                onValueChange={(values) => {
                  onFilterChange({
                    ...filters,
                    minWidth: values[0].toString(),
                    maxWidth: values[1].toString(),
                  });
                }}
                className="py-2"
              />
            </div>

            <div className="bg-[#1A1F2C] p-4 rounded-xl border border-slate-800/50">
              <div className="flex items-center gap-3">
                <span className="text-blue-500 text-3xl font-bold">{itemCount || 0}</span>
                <span className="text-slate-400 text-sm uppercase tracking-wider">items found</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/50 p-4 bg-[#111318] sticky bottom-0 mt-auto">
          <div className="flex gap-3 justify-between">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="flex-1 bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-300"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
            >
              <Filter className="w-4 h-4 mr-2" />
              Apply
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
