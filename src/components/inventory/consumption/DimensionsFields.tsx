import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { UseFormReturn } from "react-hook-form";
import { ConsumptionFormData } from "@/types/inventory";

interface DimensionsFieldsProps {
  form: UseFormReturn<ConsumptionFormData>;
  label: string;
  widthName: "width" | "scrapWidth";
  lengthName: "length" | "scrapLength";
  maxWidth: number;
  maxLength: number;
}

export function DimensionsFields({ 
  form, 
  label, 
  widthName, 
  lengthName,
  maxWidth,
  maxLength 
}: DimensionsFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <FormField
        control={form.control}
        name={widthName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label} Width (meters)</FormLabel>
            <div className="space-y-2">
              <Slider
                min={0}
                max={maxWidth}
                step={0.01}
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
                className="w-full"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">0m</span>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 0.5"
                    {...field}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value) && value <= maxWidth) {
                        field.onChange(value);
                      }
                    }}
                    className="w-24 text-right"
                  />
                </FormControl>
                <span className="text-sm text-muted-foreground">{maxWidth}m</span>
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
            <FormLabel>{label} Length (meters)</FormLabel>
            <div className="space-y-2">
              <Slider
                min={0}
                max={maxLength}
                step={0.01}
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
                className="w-full"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">0m</span>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 1.2"
                    {...field}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value) && value <= maxLength) {
                        field.onChange(value);
                      }
                    }}
                    className="w-24 text-right"
                  />
                </FormControl>
                <span className="text-sm text-muted-foreground">{maxLength}m</span>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}