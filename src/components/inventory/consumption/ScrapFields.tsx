
import { FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { ConsumptionFormData } from "@/types/inventory";
import { DimensionsFields } from "./DimensionsFields";

interface ScrapFieldsProps {
  form: UseFormReturn<ConsumptionFormData>;
  maxWidth: number;
  maxLength: number;
  useInches: boolean;
  onUnitChange: () => void;
}

export function ScrapFields({ form, maxWidth, maxLength, useInches, onUnitChange }: ScrapFieldsProps) {
  const createScrap = form.watch("createScrap");

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="createScrap"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm font-medium text-slate-200">Create Scrap</FormLabel>
            </div>
          </FormItem>
        )}
      />

      {createScrap && (
        <div className="pt-4 border-t border-slate-700/50">
          <DimensionsFields
            form={form}
            label="Scrap Dimensions"
            widthName="scrapWidth"
            lengthName="scrapLength"
            maxWidth={maxWidth}
            maxLength={maxLength}
            useInches={useInches}
            onUnitChange={onUnitChange}
          />
        </div>
      )}
    </div>
  );
}
