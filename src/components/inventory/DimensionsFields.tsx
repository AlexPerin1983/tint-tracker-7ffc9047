
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
      const convertedValue = useInches ? convertToMeters(numValue) : numValue;
      // Garantir que o valor não exceda o máximo permitido
      const maxAllowed = name.includes('width') ? maxWidth : maxLength;
      const finalValue = Math.min(convertedValue, maxAllowed);
      form.setValue(name as any, finalValue);
    }
  };

  const formatDisplayValue = (value: number | undefined) => {
    if (value === undefined || isNaN(value)) return "0.00";
    return useInches ? convertToInches(value).toFixed(2) : value.toFixed(2);
  };

  const getSliderValue = (value: number | undefined, isWidth: boolean) => {
    if (value === undefined || isNaN(value)) return 0;
    // Manter a proporção relativa do valor ao converter entre unidades
    const max = isWidth ? maxWidth : maxLength;
    const currentValue = useInches ? convertToInches(value) : value;
    const maxValue = useInches ? convertToInches(max) : max;
    return Math.min(currentValue, maxValue);
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
        render={({ field }) => (
          <FormItem>
            <FormLabel>Width ({useInches ? "inches" : "meters"})</FormLabel>
            <div className="space-y-2">
              <Slider
                min={0}
                max={useInches ? convertToInches(maxWidth) : maxWidth}
                step={0.01}
                value={[getSliderValue(field.value, true)]}
                onValueChange={(value) => {
                  const finalValue = useInches ? convertToMeters(value[0]) : value[0];
                  field.onChange(finalValue);
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
        )}
      />

      <FormField
        control={form.control}
        name={lengthName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Length ({useInches ? "inches" : "meters"})</FormLabel>
            <div className="space-y-2">
              <Slider
                min={0}
                max={useInches ? convertToInches(maxLength) : maxLength}
                step={0.01}
                value={[getSliderValue(field.value, false)]}
                onValueChange={(value) => {
                  const finalValue = useInches ? convertToMeters(value[0]) : value[0];
                  field.onChange(finalValue);
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
        )}
      />
    </div>
  );
}
