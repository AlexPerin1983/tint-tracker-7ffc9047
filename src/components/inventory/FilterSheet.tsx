import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { Category, Filters } from "@/types/inventory";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { UnitSwitch } from "./filters/UnitSwitch";
import { RangeSlider } from "./filters/RangeSlider";
import { CategorySelect } from "./filters/CategorySelect";
import { ItemCounter } from "./filters/ItemCounter";

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
  
  const maxLength = useInches ? 2362.2 : 60;
  const maxWidth = useInches ? 71.65 : 1.82;

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
            <CategorySelect 
              value={filters.category} 
              onChange={(value) => onFilterChange({ ...filters, category: value as Category | "all" })} 
            />

            <UnitSwitch 
              useInches={useInches} 
              onUnitChange={handleUnitChange}
              labels={{ meters: labels.meters, inches: labels.inches }}
            />

            <RangeSlider
              title={labels.lengthRange}
              value={sliderLength}
              maxValue={maxLength}
              useInches={useInches}
              onValueChange={handleLengthChange}
              labels={{ to: labels.to, max: labels.max }}
            />

            <RangeSlider
              title={labels.widthRange}
              value={sliderWidth}
              maxValue={maxWidth}
              useInches={useInches}
              onValueChange={handleWidthChange}
              labels={{ to: labels.to, max: labels.max }}
            />

            <ItemCounter count={itemCount || 0} labels={{ itemsFound: labels.itemsFound }} />
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
