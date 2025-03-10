
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FilterFields } from "./FilterFields";
import { Button } from "@/components/ui/button";
import { Category, Filters } from "@/types/inventory";
import { Filter, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
  itemCount?: number;
}

export function FilterSheet({
  open,
  onOpenChange,
  filters,
  onFilterChange,
  onClearFilters,
  onApplyFilters,
  itemCount,
}: FilterSheetProps) {
  const { language } = useLanguage();
  
  const getLabels = () => {
    switch (language) {
      case 'pt':
        return {
          title: "Filtros",
          meters: "Metros",
          inches: "Polegadas",
          lengthRange: "Intervalo de Comprimento",
          widthRange: "Intervalo de Largura",
          clear: "Limpar",
          apply: "Aplicar",
          to: "até",
          itemsFound: "itens encontrados",
          max: "Máx"
        };
      case 'es':
        return {
          title: "Filtros",
          meters: "Metros",
          inches: "Pulgadas",
          lengthRange: "Rango de Longitud",
          widthRange: "Rango de Ancho",
          clear: "Limpiar",
          apply: "Aplicar",
          to: "hasta",
          itemsFound: "elementos encontrados",
          max: "Máx"
        };
      case 'zh':
        return {
          title: "筛选",
          meters: "米",
          inches: "英寸",
          lengthRange: "长度范围",
          widthRange: "宽度范围",
          clear: "清除",
          apply: "应用",
          to: "至",
          itemsFound: "找到的项目",
          max: "最大"
        };
      case 'fr':
        return {
          title: "Filtres",
          meters: "Mètres",
          inches: "Pouces",
          lengthRange: "Plage de Longueur",
          widthRange: "Plage de Largeur",
          clear: "Effacer",
          apply: "Appliquer",
          to: "à",
          itemsFound: "éléments trouvés",
          max: "Max"
        };
      default:
        return {
          title: "Filters",
          meters: "Meters",
          inches: "Inches", 
          lengthRange: "Length Range",
          widthRange: "Width Range",
          clear: "Clear",
          apply: "Apply",
          to: "to",
          itemsFound: "items found",
          max: "Max"
        };
    }
  };

  const labels = getLabels();
  
  const [useInches, setUseInches] = useState(() => {
    const savedPreference = localStorage.getItem('dimensionUnit');
    return savedPreference ? savedPreference === 'inches' : true;
  });
  
  const [sliderLength, setSliderLength] = useState([0, useInches ? 2362.2 : 60]);
  const [sliderWidth, setSliderWidth] = useState([0, useInches ? 71.65 : 1.82]);
  
  const maxLength = useInches ? 2362.2 : 60; // 60m = ~2362.2"
  const maxWidth = useInches ? 71.65 : 1.82; // 1.82m = ~71.65"

  const convertToInches = (meters: number) => Number((meters * 39.37).toFixed(2));
  const convertToMeters = (inches: number) => Number((inches / 39.37).toFixed(4));

  useEffect(() => {
    const minLength = Number(filters.minLength) || 0;
    const maxLength = Number(filters.maxLength) || (useInches ? 2362.2 : 60);
    const minWidth = Number(filters.minWidth) || 0;
    const maxWidth = Number(filters.maxWidth) || (useInches ? 71.65 : 1.82);

    const lengthValues = [minLength, maxLength].map(value => 
      useInches ? convertToInches(value) : value
    );
    const widthValues = [minWidth, maxWidth].map(value => 
      useInches ? convertToInches(value) : value
    );

    setSliderLength(lengthValues);
    setSliderWidth(widthValues);
  }, [useInches, filters.minLength, filters.maxLength, filters.minWidth, filters.maxWidth]);

  const handleUnitChange = (value: boolean) => {
    setUseInches(value);
    localStorage.setItem('dimensionUnit', value ? 'inches' : 'meters');
  };

  const handleApplyFilters = () => {
    onApplyFilters();
    onOpenChange(false);
  };

  const handleCategoryChange = (value: string) => {
    const categoryValue = value as Category | "all";
    onFilterChange({ ...filters, category: categoryValue });
  };

  const formatValue = (value: string) => {
    const numValue = parseFloat(value);
    return !isNaN(numValue) 
      ? useInches 
        ? `${(numValue * 39.37).toFixed(2)}"`
        : `${numValue.toFixed(2)}m`
      : "0";
  };

  const handleLengthChange = (values: number[]) => {
    const [min, max] = values;
    const minMeters = useInches ? convertToMeters(min) : min;
    const maxMeters = useInches ? convertToMeters(max) : max;
    
    setSliderLength(values);
    onFilterChange({
      ...filters,
      minLength: minMeters.toString(),
      maxLength: maxMeters.toString(),
    });
  };

  const handleWidthChange = (values: number[]) => {
    const [min, max] = values;
    const minMeters = useInches ? convertToMeters(min) : min;
    const maxMeters = useInches ? convertToMeters(max) : max;
    
    setSliderWidth(values);
    onFilterChange({
      ...filters,
      minWidth: minMeters.toString(),
      maxWidth: maxMeters.toString(),
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-[#111318] border-none p-0 flex flex-col h-[100dvh]">
        <SheetHeader className="p-3 sm:p-4 border-b border-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="p-1 sm:p-1.5 rounded-full bg-blue-500/10">
              <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            </div>
            <SheetTitle className="text-white text-sm sm:text-base font-medium">{labels.title}</SheetTitle>
          </div>
        </SheetHeader>

        <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-[#1A1F2C] p-3 sm:p-4 rounded-xl border border-slate-800/50">
              <Select
                value={filters.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="bg-[#111318] border-slate-700 hover:border-blue-500 transition-colors text-sm">
                  <SelectValue placeholder="Category">
                    <div className="flex items-center gap-2">
                      <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                      {filters.category === "all" ? "All" : filters.category}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
                      All
                    </div>
                  </SelectItem>
                  <SelectItem value="Window Tinting">Window Tinting</SelectItem>
                  <SelectItem value="PPF">PPF</SelectItem>
                  <SelectItem value="Wrap">Wrap</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-end space-x-2 text-xs sm:text-sm">
              <span className="text-slate-400">{labels.meters}</span>
              <Switch
                checked={useInches}
                onCheckedChange={handleUnitChange}
                className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-slate-700"
              />
              <span className="text-slate-400">{labels.inches}</span>
            </div>

            <div className="bg-[#1A1F2C] p-3 sm:p-4 rounded-xl border border-slate-800/50 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-500 text-xs sm:text-sm font-medium uppercase tracking-wider">{labels.lengthRange}</span>
                <span className="text-[10px] sm:text-xs text-slate-400">
                  {labels.max}: {maxLength}{useInches ? '"' : 'm'}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
                <span>{formatValue(filters.minLength || "0")}</span>
                <span className="text-xs sm:text-sm text-slate-400">{labels.to}</span>
                <span>{formatValue(filters.maxLength || maxLength.toString())}</span>
              </div>
              <Slider
                value={sliderLength}
                max={maxLength}
                step={0.01}
                onValueChange={handleLengthChange}
                className="py-2"
              />
            </div>

            <div className="bg-[#1A1F2C] p-3 sm:p-4 rounded-xl border border-slate-800/50 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-500 text-xs sm:text-sm font-medium uppercase tracking-wider">{labels.widthRange}</span>
                <span className="text-[10px] sm:text-xs text-slate-400">
                  {labels.max}: {maxWidth}{useInches ? '"' : 'm'}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
                <span>{formatValue(filters.minWidth || "0")}</span>
                <span className="text-xs sm:text-sm text-slate-400">{labels.to}</span>
                <span>{formatValue(filters.maxWidth || maxWidth.toString())}</span>
              </div>
              <Slider
                value={sliderWidth}
                max={maxWidth}
                step={0.01}
                onValueChange={handleWidthChange}
                className="py-2"
              />
            </div>

            <div className="bg-[#1A1F2C] p-3 sm:p-4 rounded-xl border border-slate-800/50">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-blue-500 text-2xl sm:text-3xl font-bold">{itemCount || 0}</span>
                <span className="text-slate-400 text-xs sm:text-sm uppercase tracking-wider">{labels.itemsFound}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/50 p-3 sm:p-4 bg-[#111318] sticky bottom-0 mt-auto">
          <div className="flex gap-2 sm:gap-3 justify-between">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="flex-1 bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-300 h-9 sm:h-10 text-xs sm:text-sm"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              {labels.clear}
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 h-9 sm:h-10 text-xs sm:text-sm"
            >
              <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              {labels.apply}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
