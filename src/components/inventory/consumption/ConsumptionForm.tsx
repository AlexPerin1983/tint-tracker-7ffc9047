
import { UseFormReturn } from "react-hook-form";
import { ConsumptionFormData } from "@/types/inventory";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { DimensionsFields } from "./DimensionsFields";
import { ScrapFields } from "./ScrapFields";
import { useState } from "react";

interface ConsumptionFormProps {
  form: UseFormReturn<ConsumptionFormData>;
  onSubmit: (data: ConsumptionFormData) => void;
  onCancel: () => void;
  maxWidth: number;
  maxLength: number;
}

export function ConsumptionForm({ form, onSubmit, onCancel, maxWidth, maxLength }: ConsumptionFormProps) {
  const [useInches, setUseInches] = useState(false);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <DimensionsFields
        form={form}
        label="Consumed"
        widthName="width"
        lengthName="length"
        maxWidth={maxWidth}
        maxLength={maxLength}
        useInches={useInches}
        onUnitChange={() => setUseInches(!useInches)}
      />

      <ScrapFields 
        form={form} 
        maxWidth={maxWidth} 
        maxLength={maxLength}
        useInches={useInches}
        onUnitChange={() => setUseInches(!useInches)}
      />

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit">Register Consumption</Button>
      </DialogFooter>
    </form>
  );
}
