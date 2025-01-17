import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Filters } from "@/types/inventory";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface FilterFieldsProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  variant?: "horizontal" | "vertical";
  itemCount?: number;
}

export function FilterFields({ filters, onFilterChange, variant = "horizontal", itemCount }: FilterFieldsProps) {
  const [localName, setLocalName] = useState(filters.name);
  const debouncedName = useDebounce(localName, 300);

  useEffect(() => {
    onFilterChange({ ...filters, name: debouncedName });
  }, [debouncedName]);

  const handleInputChange = (field: keyof Filters, value: string | number) => {
    if (field === "name") {
      setLocalName(value as string);
    } else {
      onFilterChange({ ...filters, [field]: value });
    }
  };

  const containerClass = variant === "vertical" 
    ? "space-y-6" 
    : "grid grid-cols-1 md:grid-cols-3 gap-4";

  return (
    <div className={containerClass}>
      <Select
        value={filters.category}
        onValueChange={(value) => handleInputChange("category", value)}
      >
        <SelectTrigger className="bg-[#1A1F2C] border-slate-700">
          <SelectValue placeholder="Categoria">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
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

      {variant === "horizontal" ? (
        <>
          <Input
            type="number"
            placeholder="Largura mínima (m)"
            value={filters.minWidth}
            onChange={(e) => handleInputChange("minWidth", e.target.value)}
            className="bg-[#1A1F2C] border-slate-700 text-white placeholder:text-slate-400"
            min="0"
            step="0.01"
          />
          <Input
            type="number"
            placeholder="Comprimento mínimo (m)"
            value={filters.minLength}
            onChange={(e) => handleInputChange("minLength", e.target.value)}
            className="bg-[#1A1F2C] border-slate-700 text-white placeholder:text-slate-400"
            min="0"
            step="0.01"
          />
        </>
      ) : (
        <div className="space-y-8 pt-4">
          <div className="space-y-4">
            <span className="text-yellow-400 text-lg font-medium">Comprimento</span>
            <div className="text-4xl font-bold text-white">{filters.minLength || "0,00"}</div>
            <Slider
              defaultValue={[Number(filters.minLength) || 0]}
              max={2}
              step={0.01}
              onValueChange={([value]) => handleInputChange("minLength", value.toString())}
              className="py-4"
            />
          </div>

          <div className="space-y-4">
            <span className="text-yellow-400 text-lg font-medium">Largura</span>
            <div className="text-4xl font-bold text-white">{filters.minWidth || "0,00"}</div>
            <Slider
              defaultValue={[Number(filters.minWidth) || 0]}
              max={2}
              step={0.01}
              onValueChange={([value]) => handleInputChange("minWidth", value.toString())}
              className="py-4"
            />
          </div>

          {itemCount !== undefined && (
            <div className="pt-8">
              <span className="text-yellow-400 text-3xl font-bold">{itemCount}</span>
              <span className="text-slate-300 text-xl ml-2">encontrados</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}