import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { Filters } from "@/types/inventory";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";

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
  const [sliderLength, setSliderLength] = useState([Number(filters.minLength) || 0]);
  const [sliderWidth, setSliderWidth] = useState([Number(filters.minWidth) || 0]);
  const debouncedName = useDebounce(localName, 300);

  // Efeito para atualizar os estados locais quando os filtros são limpos
  useEffect(() => {
    setSliderLength([Number(filters.minLength) || 0]);
    setSliderWidth([Number(filters.minWidth) || 0]);
  }, [filters.minLength, filters.minWidth]);

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

  const handleNumericInput = (field: "minLength" | "minWidth", value: string) => {
    // Se o valor estiver vazio, permitimos isso temporariamente
    if (value === "") {
      handleInputChange(field, "0");
      if (field === "minLength") {
        setSliderLength([0]);
      } else {
        setSliderWidth([0]);
      }
      return;
    }

    // Validamos se é um número válido
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      if ((field === "minLength" && numValue <= 60) || 
          (field === "minWidth" && numValue <= 1.82)) {
        handleInputChange(field, numValue.toString());
        // Atualiza o slider correspondente
        if (field === "minLength") {
          setSliderLength([numValue]);
        } else {
          setSliderWidth([numValue]);
        }
      }
    }
  };

  const containerClass = variant === "vertical" 
    ? "space-y-6" 
    : "grid grid-cols-1 md:grid-cols-3 gap-4";

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <TabsContent 
        value="basic" 
        className="p-8 bg-card rounded-lg shadow-lg border border-muted/20" 
        hidden={variant !== "horizontal"}
      >
        <div className="grid gap-8">
          <FormField
            control={undefined}
            name="name"
            render={({ field }) => (
              <FormItem className="bg-background/50 p-6 rounded-lg border border-muted/10">
                <FormLabel className="text-lg font-medium mb-4 block">
                  Nome do Material
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: Window Film Classic" 
                    {...field} 
                    className="h-14 text-lg bg-background"
                  />
                </FormControl>
                <FormMessage className="mt-3" />
              </FormItem>
            )}
          />

          <FormField
            control={undefined}
            name="category"
            render={({ field }) => (
              <FormItem className="bg-background/50 p-6 rounded-lg border border-muted/10">
                <FormLabel className="text-lg font-medium mb-4 block">
                  Categoria
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-14 text-lg bg-background">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Window Tinting">Window Tinting</SelectItem>
                    <SelectItem value="PPF">PPF</SelectItem>
                    <SelectItem value="Wrap">Wrap</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="mt-3" />
              </FormItem>
            )}
          />
        </div>
      </TabsContent>

      <TabsContent 
        value="dimensions" 
        className="p-8 bg-card rounded-lg shadow-lg border border-muted/20" 
        hidden={variant !== "dimensions"}
      >
        <div className="grid gap-8">
          {variant === "vertical" && (
            <div className="space-y-8">
              <div className="bg-[#1A1F2C] p-6 rounded-xl border border-slate-700 space-y-4 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Comprimento</span>
                  <span className="text-xs text-slate-400">Máx: 60m</span>
                </div>
                <div 
                  className="relative group cursor-pointer"
                  onClick={() => setShowLengthInput(true)}
                >
                  {showLengthInput ? (
                    <Input
                      type="number"
                      value={filters.minLength || ""}
                      onChange={(e) => handleNumericInput("minLength", e.target.value)}
                      onClick={handleInputClick}
                      step="0.01"
                      min="0"
                      max="60"
                      className="text-3xl font-bold bg-transparent border-blue-500 h-12"
                      autoFocus
                      onBlur={() => setShowLengthInput(false)}
                    />
                  ) : (
                    <div className="text-3xl font-bold text-white group-hover:text-blue-500 transition-colors">
                      {sliderLength[0].toFixed(2)}
                      <span className="text-lg ml-1 text-slate-400">m</span>
                    </div>
                  )}
                </div>
                <Slider
                  value={sliderLength}
                  max={60}
                  step={0.01}
                  onValueChange={(value) => {
                    setSliderLength(value);
                    handleInputChange("minLength", value[0].toString());
                  }}
                  className="py-4"
                />
              </div>

              <div className="bg-[#1A1F2C] p-6 rounded-xl border border-slate-700 space-y-4 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Largura</span>
                  <span className="text-xs text-slate-400">Máx: 1.82m</span>
                </div>
                <div 
                  className="relative group cursor-pointer"
                  onClick={() => setShowWidthInput(true)}
                >
                  {showWidthInput ? (
                    <Input
                      type="number"
                      value={filters.minWidth || ""}
                      onChange={(e) => handleNumericInput("minWidth", e.target.value)}
                      onClick={handleInputClick}
                      step="0.01"
                      min="0"
                      max="1.82"
                      className="text-3xl font-bold bg-transparent border-blue-500 h-12"
                      autoFocus
                      onBlur={() => setShowWidthInput(false)}
                    />
                  ) : (
                    <div className="text-3xl font-bold text-white group-hover:text-blue-500 transition-colors">
                      {sliderWidth[0].toFixed(2)}
                      <span className="text-lg ml-1 text-slate-400">m</span>
                    </div>
                  )}
                </div>
                <Slider
                  value={sliderWidth}
                  max={1.82}
                  step={0.01}
                  onValueChange={(value) => {
                    setSliderWidth(value);
                    handleInputChange("minWidth", value[0].toString());
                  }}
                  className="py-4"
                />
              </div>

              <div className="bg-[#1A1F2C] p-6 rounded-xl border border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="text-blue-500 text-3xl font-bold">{itemCount || 0}</span>
                  <span className="text-slate-400 text-sm uppercase tracking-wider">itens encontrados</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </>
  );
}
