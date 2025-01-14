import { Button } from "@/components/ui/button";
import { X, Filter as FilterIcon } from "lucide-react";
import { Filters } from "@/types/inventory";
import { FilterFields } from "./FilterFields";
import { FilterSheet } from "./FilterSheet";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

export function FilterBar({ filters, onFilterChange, onClearFilters }: FilterBarProps) {
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleClearFilters = () => {
    onClearFilters();
    toast({
      title: "Filtros limpos!",
      duration: 2000,
    });
  };

  const handleFilterChange = (newFilters: Filters) => {
    onFilterChange(newFilters);
  };

  const handleApplyFilters = () => {
    toast({
      title: "Filtros aplicados com sucesso!",
      duration: 2000,
    });
  };

  if (isMobile) {
    return (
      <div className="mb-6">
        <Button 
          onClick={() => setShowFilterSheet(true)}
          className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB]"
        >
          <FilterIcon className="w-4 h-4 mr-2" />
          Filtrar
        </Button>
        <FilterSheet
          open={showFilterSheet}
          onOpenChange={setShowFilterSheet}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onApplyFilters={handleApplyFilters}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-4">
          <FilterFields
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-10"
        >
          <X className="h-4 w-4 mr-2" />
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
}