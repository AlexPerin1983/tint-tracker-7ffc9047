import { UseFormReturn } from "react-hook-form";
import { ConsumptionFormData } from "@/types/inventory";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { DimensionsFields } from "./DimensionsFields";
import { ScrapFields } from "./ScrapFields";

interface ConsumptionFormProps {
  form: UseFormReturn<ConsumptionFormData>;
  onSubmit: (data: ConsumptionFormData) => void;
  onCancel: () => void;
}

export function ConsumptionForm({ form, onSubmit, onCancel }: ConsumptionFormProps) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <DimensionsFields
        form={form}
        label="Consumida"
        widthName="width"
        lengthName="length"
      />

      <ScrapFields form={form} />

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button type="submit">Registrar Consumo</Button>
      </DialogFooter>
    </form>
  );
}