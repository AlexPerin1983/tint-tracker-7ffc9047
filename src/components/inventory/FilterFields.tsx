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
  const [showLengthInput, setShowLengthInput] = useState(false);
  const [showWidthInput, setShowWidthInput] = useState(false);
  const [sliderLength, setSliderLength] = useState([Number(filters.minLength) || 0, Number(filters.maxLength) || 60]);
  const [sliderWidth, setSliderWidth] = useState([Number(filters.minWidth) || 0, Number(filters.maxWidth) || 1.82]);
  const debouncedName = useDebounce(localName, 300);

  useEffect(() => {
    setSliderLength([Number(filters.minLength) || 0, Number(filters.maxLength) || 60]);
    setSliderWidth([Number(filters.minWidth) || 0, Number(filters.maxWidth) || 1.82]);
  }, [filters.minLength, filters.maxLength, filters.minWidth, filters.maxWidth]);

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
    // Garante que o valor mínimo não ultrapasse o máximo
    const ensureValidRange = (newValues: number[]) => {
      if (newValues[0] > newValues[1]) {
        return [newValues[0], newValues[0]];
      }
      return newValues;
    };

    if (field === "length") {
      const validValues = ensureValidRange(values);
      setSliderLength(validValues);
      onFilterChange({
        ...filters,
        minLength: validValues[0].toString(),
        maxLength: validValues[1].toString(),
      });
    } else {
      const validValues = ensureValidRange(values);
      setSliderWidth(validValues);
      onFilterChange({
        ...filters,
        minWidth: validValues[0].toString(),
        maxWidth: validValues[1].toString(),
      });
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
        <SelectTrigger className="bg-[#1A1F2C] border-slate-700 hover:border-blue-500 transition-colors">
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

      {variant === "vertical" && (
        <div className="space-y-8 pt-4">
          <div className="bg-[#1A1F2C] p-6 rounded-xl border border-slate-700 space-y-4 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Length Range</span>
              <span className="text-xs text-slate-400">Max: 60m</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-white">
                {sliderLength[0].toFixed(2)}
                <span className="text-base ml-1 text-slate-400">m</span>
              </div>
              <div className="text-sm text-slate-400">to</div>
              <div className="text-2xl font-bold text-white">
                {sliderLength[1].toFixed(2)}
                <span className="text-base ml-1 text-slate-400">m</span>
              </div>
            </div>
            <Slider
              value={sliderLength}
              max={60}
              step={0.01}
              minStepsBetweenThumbs={0.1}
              onValueChange={values => handleNumericRangeInput("length", values)}
              className="py-4"
            />
          </div>

          <div className="bg-[#1A1F2C] p-6 rounded-xl border border-slate-700 space-y-4 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Width Range</span>
              <span className="text-xs text-slate-400">Max: 1.82m</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-white">
                {sliderWidth[0].toFixed(2)}
                <span className="text-base ml-1 text-slate-400">m</span>
              </div>
              <div className="text-sm text-slate-400">to</div>
              <div className="text-2xl font-bold text-white">
                {sliderWidth[1].toFixed(2)}
                <span className="text-base ml-1 text-slate-400">m</span>
              </div>
            </div>
            <Slider
              value={sliderWidth}
              max={1.82}
              step={0.01}
              minStepsBetweenThumbs={0.1}
              onValueChange={values => handleNumericRangeInput("width", values)}
              className="py-4"
            />
          </div>

          <div className="bg-[#1A1F2C] p-6 rounded-xl border border-slate-700">
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