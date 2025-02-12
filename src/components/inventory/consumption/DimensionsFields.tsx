
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
  widthName, 
  lengthName,
  maxWidth,
  maxLength,
  useInches,
  onUnitChange
}: DimensionsFieldsProps) {
  const handleNumericInput = (name: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const maxAllowed = name.includes('width') ? maxWidth : maxLength;
      const finalValue = Math.min(numValue, maxAllowed);
      form.setValue(name as any, finalValue);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex items-center justify-end space-x-2">
        <span className="text-sm text-slate-400">Meters</span>
        <Switch
          checked={useInches}
          onCheckedChange={onUnitChange}
          className="data-[state=checked]:bg-blue-500"
        />
        <span className="text-sm text-slate-400">Inches</span>
      </div>

      <FormField
        control={form.control}
        name={widthName}
        render={({ field }) => (
          <FormItem>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-medium text-slate-200">Width</FormLabel>
                <span className="text-xs text-slate-400">{maxWidth}"</span>
              </div>
              <div className="space-y-4">
                <Slider
                  min={0}
                  max={maxWidth}
                  step={0.01}
                  value={[field.value || 0]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="w-full"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">0"</span>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      value={field.value || ""}
                      onChange={(e) => handleNumericInput(widthName, e.target.value)}
                      className="w-24 text-right bg-slate-800/50 border-slate-700"
                    />
                  </FormControl>
                </div>
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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-medium text-slate-200">Length</FormLabel>
                <span className="text-xs text-slate-400">{maxLength}"</span>
              </div>
              <div className="space-y-4">
                <Slider
                  min={0}
                  max={maxLength}
                  step={0.01}
                  value={[field.value || 0]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="w-full"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">0"</span>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      value={field.value || ""}
                      onChange={(e) => handleNumericInput(lengthName, e.target.value)}
                      className="w-24 text-right bg-slate-800/50 border-slate-700"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
