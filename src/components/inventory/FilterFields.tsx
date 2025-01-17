import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Filters } from "@/types/inventory";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";

interface FilterFieldsProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  variant?: "horizontal" | "vertical";
}

export function FilterFields({ filters, onFilterChange, variant = "horizontal" }: FilterFieldsProps) {
  const [localName, setLocalName] = useState(filters.name);
  const [localWidth, setLocalWidth] = useState(filters.minWidth ? parseFloat(filters.minWidth) : 0.91);
  const [localLength, setLocalLength] = useState(filters.minLength ? parseFloat(filters.minLength) : 0.91);
  const debouncedName = useDebounce(localName, 300);
  const debouncedWidth = useDebounce(localWidth.toString(), 300);
  const debouncedLength = useDebounce(localLength.toString(), 300);

  useEffect(() => {
    onFilterChange({ ...filters, name: debouncedName });
  }, [debouncedName]);

  useEffect(() => {
    onFilterChange({ ...filters, minWidth: debouncedWidth });
  }, [debouncedWidth]);

  useEffect(() => {
    onFilterChange({ ...filters, minLength: debouncedLength });
  }, [debouncedLength]);

  const handleInputChange = (field: keyof Filters, value: string) => {
    if (field === "name") {
      setLocalName(value);
    } else {
      onFilterChange({ ...filters, [field]: value });
    }
  };

  const containerClass = variant === "vertical" 
    ? "space-y-8" 
    : "grid grid-cols-1 md:grid-cols-4 gap-4";

  const sliderContainerClass = variant === "vertical" 
    ? "space-y-12" 
    : "grid grid-cols-1 md:grid-cols-2 gap-8";

  return (
    <div className={containerClass}>
      <Select
        value={filters.category}
        onValueChange={(value) => handleInputChange("category", value)}
      >
        <SelectTrigger className="bg-[#1E293B] border-slate-700 text-white">
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
        className="bg-[#1E293B] border-slate-700 text-white placeholder:text-slate-400"
      />

      <div className={sliderContainerClass}>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-yellow-400 font-semibold text-lg">Comprimento</label>
            <div className="text-4xl font-bold text-white">{localLength.toFixed(2)}</div>
          </div>
          <div className="px-2">
            <Slider
              value={[localLength]}
              min={0.81}
              max={1.01}
              step={0.01}
              onValueChange={([value]) => setLocalLength(value)}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-slate-400 mt-1">
              <span>0,81</span>
              <span>0,86</span>
              <span>0,91</span>
              <span>0,96</span>
              <span>1,01</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-yellow-400 font-semibold text-lg">Largura</label>
            <div className="text-4xl font-bold text-white">{localWidth.toFixed(2)}</div>
          </div>
          <div className="px-2">
            <Slider
              value={[localWidth]}
              min={0.81}
              max={1.01}
              step={0.01}
              onValueChange={([value]) => setLocalWidth(value)}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-slate-400 mt-1">
              <span>0,81</span>
              <span>0,86</span>
              <span>0,91</span>
              <span>0,96</span>
              <span>1,01</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <span className="text-yellow-400 text-xl font-bold">10</span>
        <span className="text-white text-lg ml-2">encontrados</span>
      </div>
    </div>
  );
}