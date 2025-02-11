
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FilterFields } from "./FilterFields";
import { Button } from "@/components/ui/button";
import { Filters } from "@/types/inventory";
import { Filter, X } from "lucide-react";

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
          <FilterFields
            filters={filters}
            onFilterChange={onFilterChange}
            variant="vertical"
            itemCount={itemCount}
          />
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
