
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
  const [useInches, setUseInches] = useState(true);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
      <div className="px-4 py-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
        <div className="bg-[#1A1F2C] p-6 rounded-xl border border-slate-700 space-y-4 hover:border-blue-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Consumed Material</span>
            <span className="text-xs text-slate-400">
              Max: {useInches ? `${(maxWidth * 39.37).toFixed(2)}" x ${(maxLength * 39.37).toFixed(2)}"` : `${maxWidth}m x ${maxLength}m`}
            </span>
          </div>
          <DimensionsFields
            form={form}
            label="Dimensions"
            widthName="width"
            lengthName="length"
            maxWidth={maxWidth}
            maxLength={maxLength}
            useInches={useInches}
            onUnitChange={() => setUseInches(!useInches)}
          />
        </div>

        <div className="bg-[#1A1F2C] p-6 rounded-xl border border-slate-700 space-y-4 hover:border-blue-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Scrap Material</span>
            <span className="text-xs text-slate-400">Optional</span>
          </div>
          <ScrapFields 
            form={form} 
            maxWidth={maxWidth} 
            maxLength={maxLength}
            useInches={useInches}
            onUnitChange={() => setUseInches(!useInches)}
          />
        </div>
      </div>

      <DialogFooter className="border-t border-slate-800/50 p-4 bg-[#111318] mt-auto shrink-0">
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
