
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Filter as FilterIcon } from "lucide-react";
import { Filters } from "@/types/inventory";
import { FilterFields } from "./FilterFields";
import { FilterSheet } from "./FilterSheet";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
  itemCount?: number;
}

export function FilterBar({ filters, onFilterChange, onClearFilters, itemCount }: FilterBarProps) {
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Efeito para atualizar o filtro de nome quando o termo de busca mudar
  useEffect(() => {
    onFilterChange({
      ...filters,
      name: searchTerm
    });
  }, [searchTerm]);

  const handleClearFilters = () => {
    onClearFilters();
    setSearchTerm("");
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

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  if (isMobile) {
    return (
      <div className="mb-6 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-9"
              placeholder="Search..."
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <Button 
            onClick={() => setShowFilterSheet(true)}
            variant="outline"
            size="icon"
            className="bg-[#3B82F6] text-white hover:bg-[#2563EB]"
          >
            <FilterIcon className="h-4 w-4" />
          </Button>
        </div>
        <FilterSheet
          open={showFilterSheet}
          onOpenChange={setShowFilterSheet}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onApplyFilters={handleApplyFilters}
          itemCount={itemCount}
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
            itemCount={itemCount}
          />
        </div>
        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-10"
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
