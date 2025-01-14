import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FilterFields } from "./FilterFields";
import { Button } from "@/components/ui/button";
import { Filters } from "@/types/inventory";

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

export function FilterSheet({
  open,
  onOpenChange,
  filters,
  onFilterChange,
  onClearFilters,
}: FilterSheetProps) {
  const handleApplyFilters = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-[#1E293B] border-none">
        <SheetHeader>
          <SheetTitle className="text-white">Filtros Avançados</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <FilterFields
            filters={filters}
            onFilterChange={onFilterChange}
            variant="vertical"
          />
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="bg-[#94A3B8] text-white hover:bg-[#64748B]"
            >
              Limpar Filtros
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="bg-[#3B82F6] text-white hover:bg-[#2563EB]"
            >
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}