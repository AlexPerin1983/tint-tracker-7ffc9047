import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ConsumptionFormData } from "@/types/inventory";

interface DimensionsFieldsProps {
  form: UseFormReturn<ConsumptionFormData>;
  label: string;
  widthName: "width" | "scrapWidth";
  lengthName: "length" | "scrapLength";
}

export function DimensionsFields({ form, label, widthName, lengthName }: DimensionsFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name={widthName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Largura {label} (metros)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                placeholder="Ex: 0.5"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={lengthName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Comprimento {label} (metros)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                placeholder="Ex: 1.2"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}