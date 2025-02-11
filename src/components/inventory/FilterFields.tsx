
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search, X } from "lucide-react";
import { Filters } from "@/types/inventory";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface FilterFieldsProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  variant?: "horizontal" | "vertical";
  itemCount?: number;
}

export function FilterFields({ filters, onFilterChange, variant = "horizontal", itemCount }: FilterFieldsProps) {
  const [localName, setLocalName] = useState(filters.name);
  const [useInches, setUseInches] = useState(true);
  const [showLengthInput, setShowLengthInput] = useState(false);
  const [showWidthInput, setShowWidthInput] = useState(false);
  const [sliderLength, setSliderLength] = useState([Number(filters.minLength) || 0, Number(filters.maxLength) || 60]);
  const [sliderWidth, setSliderWidth] = useState([Number(filters.minWidth) || 0, Number(filters.maxWidth) || 1.82]);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);
  const debouncedName = useDebounce(localName, 300);

  // Convertendo metros para polegadas
  const metersToInches = (meters: number) => meters * 39.37;
  const inchesToMeters = (inches: number) => inches / 39.37;

  // Define os valores máximos com base na unidade selecionada
  const maxLength = useInches ? metersToInches(60) : 60; // 60m = ~2362.2"
  const maxWidth = useInches ? metersToInches(1.82) : 1.82; // 1.82m = ~71.65"

  useEffect(() => {
    const initialLength = [
      Number(filters.minLength) || 0,
      Number(filters.maxLength) || 60
    ];
    const initialWidth = [
      Number(filters.minWidth) || 0,
      Number(filters.maxWidth) || 1.82
    ];

    setSliderLength(useInches ? initialLength.map(metersToInches) : initialLength);
    setSliderWidth(useInches ? initialWidth.map(metersToInches) : initialWidth);
  }, [filters.minLength, filters.maxLength, filters.minWidth, filters.maxWidth, useInches]);

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

  const handleNumericRangeInput = (
    field: "length" | "width",
    values: number[]
  ) => {
    const ensureValidRange = (newValues: number[]) => {
      if (newValues[0] > newValues[1]) {
        return [newValues[0], newValues[0]];
      }
      return newValues;
    };

    const validValues = ensureValidRange(values);
    const metersValues = useInches ? validValues.map(inchesToMeters) : validValues;

    if (field === "length") {
      setSliderLength(validValues);
      onFilterChange({
        ...filters,
        minLength: metersValues[0].toString(),
        maxLength: metersValues[1].toString(),
      });
    } else {
      setSliderWidth(validValues);
      onFilterChange({
        ...filters,
        minWidth: metersValues[0].toString(),
        maxWidth: metersValues[1].toString(),
      });
    }
  };

  const handleTouchStart = (index: number) => {
    setActiveThumb(index);
  };

  const handleTouchEnd = () => {
    setActiveThumb(null);
  };

  const handleClearSearch = () => {
    setLocalName("");
  };

  const containerClass = variant === "vertical" 
    ? "space-y-6" 
    : "grid grid-cols-1 md:grid-cols-3 gap-4";

  const formatValue = (value: number) => {
    return `${value.toFixed(2)}${useInches ? '"' : 'm'}`;
  };

  return (
    <div className={containerClass}>
      <div className="bg-[#1A1F2C] p-4 rounded-xl border border-slate-800/50 hover:border-blue-500/50 transition-colors">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={localName}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="pl-9 pr-9 bg-[#111318] border-slate-700 hover:border-blue-500 transition-colors"
              placeholder="Search..."
            />
            {localName && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <Select
            value={filters.category}
            onValueChange={(value) => handleInputChange("category", value)}
          >
            <SelectTrigger className="bg-[#111318] border-slate-700 hover:border-blue-500 transition-colors min-w-[180px]">
              <SelectValue placeholder="Category">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-blue-500" />
                  {filters.category === "all" ? "All" : filters.category}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  All
                </div>
              </SelectItem>
              <SelectItem value="Window Tinting">Window Tinting</SelectItem>
              <SelectItem value="PPF">PPF</SelectItem>
              <SelectItem value="Wrap">Wrap</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {variant === "vertical" && (
        <div className="space-y-4">
          <div className="flex items-center justify-end space-x-2">
            <span className="text-sm text-slate-400">Meters</span>
            <Switch
              checked={useInches}
              onCheckedChange={setUseInches}
            />
            <span className="text-sm text-slate-400">Inches</span>
          </div>

          <div className="bg-[#1A1F2C] p-4 rounded-xl border border-slate-800/50 space-y-4 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Length Range</span>
              <span className="text-xs text-slate-400">
                Max: {formatValue(maxLength)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold text-white">
                {formatValue(sliderLength[0])}
              </div>
              <div className="text-sm text-slate-400">to</div>
              <div className="text-xl font-bold text-white">
                {formatValue(sliderLength[1])}
              </div>
            </div>
            <Slider
              value={sliderLength}
              max={maxLength}
              step={0.01}
              minStepsBetweenThumbs={0.1}
              onValueChange={values => handleNumericRangeInput("length", values)}
              onTouchStart={() => handleTouchStart(0)}
              onTouchEnd={handleTouchEnd}
              className="py-2"
            />
          </div>

          <div className="bg-[#1A1F2C] p-4 rounded-xl border border-slate-800/50 space-y-4 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Width Range</span>
              <span className="text-xs text-slate-400">
                Max: {formatValue(maxWidth)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold text-white">
                {formatValue(sliderWidth[0])}
              </div>
              <div className="text-sm text-slate-400">to</div>
              <div className="text-xl font-bold text-white">
                {formatValue(sliderWidth[1])}
              </div>
            </div>
            <Slider
              value={sliderWidth}
              max={maxWidth}
              step={0.01}
              minStepsBetweenThumbs={0.1}
              onValueChange={values => handleNumericRangeInput("width", values)}
              onTouchStart={() => handleTouchStart(1)}
              onTouchEnd={handleTouchEnd}
              className="py-2"
            />
          </div>

          <div className="bg-[#1A1F2C] p-4 rounded-xl border border-slate-800/50">
            <div className="flex items-center gap-3">
              <span className="text-blue-500 text-3xl font-bold">{itemCount || 0}</span>
              <span className="text-slate-400 text-sm uppercase tracking-wider">items found</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
