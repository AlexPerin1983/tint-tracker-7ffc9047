
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { UseFormReturn } from "react-hook-form";
import { ConsumptionFormData } from "@/types/inventory";
import { Switch } from "@/components/ui/switch";

interface DimensionsFieldsProps {
  form: UseFormReturn<ConsumptionFormData>;
  label: string;
  widthName: "width" | "scrapWidth";
  lengthName: "length" | "scrapLength";
  maxWidth: number;
  maxLength: number;
  useInches: boolean;
  onUnitChange: () => void;
}

export function DimensionsFields({ 
  form, 
  label, 
  widthName, 
  lengthName,
  maxWidth,
  maxLength,
  useInches,
  onUnitChange
}: DimensionsFieldsProps) {
  const convertToInches = (meters: number) => Number((meters * 39.37).toFixed(2));
  const convertToMeters = (inches: number) => Number((inches / 39.37).toFixed(2));

  const handleNumericInput = (name: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      // Converte o valor para metros antes de salvar
      const convertedValue = useInches ? convertToMeters(numValue) : numValue;
      const maxAllowed = name.includes('width') ? maxWidth : maxLength;
      const finalValue = Math.min(convertedValue, maxAllowed);
      form.setValue(name as any, finalValue);
    }
  };

  const formatDisplayValue = (value: number | undefined) => {
    if (value === undefined || isNaN(value)) return "0.00";
    return useInches ? convertToInches(value).toFixed(2) : value.toFixed(2);
  };

  const getSliderConfig = (isWidth: boolean) => {
    const max = isWidth ? maxWidth : maxLength;
    const maxDisplayValue = useInches ? convertToInches(max) : max;
    const currentValue = isWidth ? form.getValues(widthName) : form.getValues(lengthName);
    const displayValue = useInches ? convertToInches(currentValue || 0) : (currentValue || 0);

    return {
      min: 0,
      max: maxDisplayValue,
      value: Math.min(displayValue, maxDisplayValue),
      convert: (value: number) => useInches ? convertToMeters(value) : value
    };
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Meters</span>
          <Switch
            checked={useInches}
            onCheckedChange={onUnitChange}
          />
          <span className="text-sm">Inches</span>
        </div>
      </div>

      <FormField
        control={form.control}
        name={widthName}
        render={({ field }) => {
          const config = getSliderConfig(true);
          return (
            <FormItem>
              <FormLabel>Width ({useInches ? "inches" : "meters"})</FormLabel>
              <div className="space-y-2">
                <Slider
                  min={config.min}
                  max={config.max}
                  step={0.01}
                  value={[config.value]}
                  onValueChange={(value) => {
                    const convertedValue = config.convert(value[0]);
                    field.onChange(convertedValue);
                  }}
                  className="w-full"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">0{useInches ? '"' : 'm'}</span>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder={`Ex: ${useInches ? '20' : '0.5'}`}
                      value={formatDisplayValue(field.value)}
                      onChange={(e) => handleNumericInput(widthName, e.target.value)}
                      className="w-24 text-right"
                    />
                  </FormControl>
                  <span className="text-sm text-muted-foreground">
                    {useInches ? convertToInches(maxWidth).toFixed(2) + '"' : maxWidth.toFixed(2) + 'm'}
                  </span>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name={lengthName}
        render={({ field }) => {
          const config = getSliderConfig(false);
          return (
            <FormItem>
              <FormLabel>Length ({useInches ? "inches" : "meters"})</FormLabel>
              <div className="space-y-2">
                <Slider
                  min={config.min}
                  max={config.max}
                  step={0.01}
                  value={[config.value]}
                  onValueChange={(value) => {
                    const convertedValue = config.convert(value[0]);
                    field.onChange(convertedValue);
                  }}
                  className="w-full"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">0{useInches ? '"' : 'm'}</span>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder={`Ex: ${useInches ? '48' : '1.2'}`}
                      value={formatDisplayValue(field.value)}
                      onChange={(e) => handleNumericInput(lengthName, e.target.value)}
                      className="w-24 text-right"
                    />
                  </FormControl>
                  <span className="text-sm text-muted-foreground">
                    {useInches ? convertToInches(maxLength).toFixed(2) + '"' : maxLength.toFixed(2) + 'm'}
                  </span>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
