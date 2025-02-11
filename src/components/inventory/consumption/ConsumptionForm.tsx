
import { UseFormReturn } from "react-hook-form";
import { ConsumptionFormData } from "@/types/inventory";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { DimensionsFields } from "./DimensionsFields";
import { ScrapFields } from "./ScrapFields";
import { useState } from "react";
import { X, Check } from "lucide-react";

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
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col min-h-0">
      <div className="px-4 py-6 space-y-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
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
      </div>

      <DialogFooter className="border-t border-slate-800/50 p-4 bg-[#111318] sticky bottom-0 mt-auto">
        <div className="flex gap-3 w-full">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1 bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-300"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button 
            type="submit"
            className="flex-1 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
          >
            <Check className="w-4 h-4 mr-2" />
            Register
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
}
