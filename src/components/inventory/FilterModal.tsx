import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FilterFields } from "./FilterFields";
import { Button } from "@/components/ui/button";
import { Filters } from "@/types/inventory";

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

export function FilterModal({
  open,
  onOpenChange,
  filters,
  onFilterChange,
  onClearFilters,
}: FilterModalProps) {
  const handleApplyFilters = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1E293B] text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Filtros Avançados</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
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
      </DialogContent>
    </Dialog>
  );
}