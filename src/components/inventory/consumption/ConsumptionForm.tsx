
import { useForm } from "react-hook-form";
import { ConsumptionFormData, Item } from "@/types/inventory";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { DimensionsFields } from "./DimensionsFields";
import { ScrapFields } from "./ScrapFields";
import { X, Check } from "lucide-react";
import { useConsumption } from "@/hooks/use-consumption";
import { useState } from "react";

interface ConsumptionFormProps {
  item: Item;
  onClose: () => void;
  useInches: boolean;
  onUnitChange: () => void;
}

export function ConsumptionForm({ item, onClose, useInches, onUnitChange }: ConsumptionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerConsumption } = useConsumption();
  
  const form = useForm<ConsumptionFormData>({
    defaultValues: {
      width: 0,
      length: 0,
      createScrap: false,
      scrapWidth: 0,
      scrapLength: 0,
    }
  });

  const onSubmit = (data: ConsumptionFormData) => {
    setIsSubmitting(true);
    
    // Calculate remaining dimensions
    const newRemainingWidth = Math.max(0, item.remainingWidth - data.width);
    const newRemainingLength = Math.max(0, item.remainingLength - data.length);
    
    // Register consumption using the hook
    registerConsumption({
      id: item.id,
      data,
      newDimensions: {
        remainingWidth: newRemainingWidth,
        remainingLength: newRemainingLength
      }
    }, {
      onSuccess: () => {
        setIsSubmitting(false);
        onClose();
      },
      onError: (error) => {
        console.error("Error registering consumption:", error);
        setIsSubmitting(false);
      }
    });
  };

  const maxWidth = item.remainingWidth || item.width;
  const maxLength = item.remainingLength || item.length;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-[#111318] max-h-[calc(100vh-12rem)] sm:max-h-[460px]">
        <div className="bg-[#1A1F2C] p-6 rounded-xl border border-slate-700 space-y-4 hover:border-blue-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Consumed Material</span>
            <span className="text-xs text-slate-400">
              Max: {useInches ? `${(maxWidth * 39.37).toFixed(2)}" x ${(maxLength * 39.37).toFixed(2)}"` : `${maxWidth.toFixed(2)}m x ${maxLength.toFixed(2)}m`}
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
            onUnitChange={onUnitChange}
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
            onUnitChange={onUnitChange}
          />
        </div>
      </div>

      <DialogFooter className="border-t border-slate-800/50 p-4 bg-gradient-to-b from-[#111318] to-slate-800 mt-auto shrink-0">
        <div className="flex gap-3 justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-300"
            disabled={isSubmitting}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button 
            type="submit"
            className="flex-1 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
            disabled={isSubmitting}
          >
            <Check className="w-4 h-4 mr-2" />
            {isSubmitting ? "Processing..." : "Register"}
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
}
