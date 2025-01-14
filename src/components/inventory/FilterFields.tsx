import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Filters } from "@/types/inventory";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";

interface FilterFieldsProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  variant?: "horizontal" | "vertical";
}

export function FilterFields({ filters, onFilterChange, variant = "horizontal" }: FilterFieldsProps) {
  const [localName, setLocalName] = useState(filters.name);
  const debouncedName = useDebounce(localName, 300);

  useEffect(() => {
    onFilterChange({ ...filters, name: debouncedName });
  }, [debouncedName]);

  const handleInputChange = (field: keyof Filters, value: string) => {
    if (field === "name") {
      setLocalName(value);
    } else {
      onFilterChange({ ...filters, [field]: value });
    }
  };

  const validateDimension = (value: string) => {
    const num = parseFloat(value);
    return value === "" || (!isNaN(num) && num > 0);
  };

  const containerClass = variant === "vertical" 
    ? "space-y-4" 
    : "grid grid-cols-1 md:grid-cols-4 gap-4";

  return (
    <div className={containerClass}>
      <Select
        value={filters.category}
        onValueChange={(value) => handleInputChange("category", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Categoria">
            <div className="flex items-center gap-2">
              {filters.category === "all" && <Filter className="w-4 h-4" />}
              {filters.category === "all" ? "Todas" : filters.category}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Todas
            </div>
          </SelectItem>
          <SelectItem value="Window Tinting">Window Tinting</SelectItem>
          <SelectItem value="PPF">PPF</SelectItem>
          <SelectItem value="Wrap">Wrap</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Buscar por nome..."
        value={localName}
        onChange={(e) => handleInputChange("name", e.target.value)}
        className="bg-[#273347] text-white placeholder:text-[#94A3B8]"
      />

      <Input
        type="number"
        placeholder="Largura mínima (m)"
        value={filters.minWidth}
        onChange={(e) => {
          if (validateDimension(e.target.value)) {
            handleInputChange("minWidth", e.target.value);
          }
        }}
        className="bg-[#273347] text-white placeholder:text-[#94A3B8]"
        min="0"
        step="0.01"
      />

      <Input
        type="number"
        placeholder="Comprimento mínimo (m)"
        value={filters.minLength}
        onChange={(e) => {
          if (validateDimension(e.target.value)) {
            handleInputChange("minLength", e.target.value);
          }
        }}
        className="bg-[#273347] text-white placeholder:text-[#94A3B8]"
        min="0"
        step="0.01"
      />
    </div>
  );
}