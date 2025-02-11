
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
    <>
      <FormField
        control={form.control}
        name="createScrap"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Create Scrap</FormLabel>
            </div>
          </FormItem>
        )}
      />

      {createScrap && (
        <DimensionsFields
          form={form}
          label="Scrap"
          widthName="scrapWidth"
          lengthName="scrapLength"
          maxWidth={maxWidth}
          maxLength={maxLength}
          useInches={useInches}
          onUnitChange={onUnitChange}
        />
      )}
    </>
  );
}
