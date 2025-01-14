import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/inventory";
import { X } from "lucide-react";

export interface Filters {
  category: Category | "all" | "";
  name: string;
  minWidth: string;
  minLength: string;
}

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

export function FilterBar({ filters, onFilterChange, onClearFilters }: FilterBarProps) {
  const handleInputChange = (field: keyof Filters, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select
          value={filters.category}
          onValueChange={(value) => handleInputChange("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Window Tinting">Window Tinting</SelectItem>
            <SelectItem value="PPF">PPF</SelectItem>
            <SelectItem value="Wrap">Wrap</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Buscar por nome..."
          value={filters.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="bg-[#273347] text-white placeholder:text-gray-400"
        />

        <Input
          type="number"
          placeholder="Largura mínima (m)"
          value={filters.minWidth}
          onChange={(e) => handleInputChange("minWidth", e.target.value)}
          className="bg-[#273347] text-white placeholder:text-gray-400"
          min="0"
          step="0.01"
        />

        <Input
          type="number"
          placeholder="Comprimento mínimo (m)"
          value={filters.minLength}
          onChange={(e) => handleInputChange("minLength", e.target.value)}
          className="bg-[#273347] text-white placeholder:text-gray-400"
          min="0"
          step="0.01"
        />
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <X className="h-4 w-4 mr-2" />
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
}