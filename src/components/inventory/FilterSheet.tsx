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
      <SheetContent className="w-full sm:max-w-md bg-[#1A1F2C] border-none p-0">
        <SheetHeader className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-500" />
            <SheetTitle className="text-white text-xl font-semibold">Filtros</SheetTitle>
          </div>
        </SheetHeader>

        <div className="px-6 py-8 space-y-8 h-[calc(100vh-180px)] overflow-y-auto">
          <FilterFields
            filters={filters}
            onFilterChange={onFilterChange}
            variant="vertical"
            itemCount={itemCount}
          />
        </div>

        <div className="border-t border-slate-700 p-6 bg-[#1A1F2C] sticky bottom-0">
          <div className="flex gap-3 justify-between">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="flex-1 bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <X className="w-4 h-4 mr-2" />
              Limpar
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
            >
              <Filter className="w-4 h-4 mr-2" />
              Aplicar
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}