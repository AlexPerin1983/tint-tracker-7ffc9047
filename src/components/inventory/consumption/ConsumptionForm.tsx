
import { useForm } from "react-hook-form";
import { ConsumptionFormData } from "@/types/inventory";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { DimensionsFields } from "./DimensionsFields";
import { ScrapFields } from "./ScrapFields";
import { X, Check } from "lucide-react";
import { Item } from "@/types/inventory";

interface ConsumptionFormProps {
  item: Item;
  onClose: () => void;
  useInches: boolean;
  onUnitChange: () => void;
}

export function ConsumptionForm({ item, onClose, useInches, onUnitChange }: ConsumptionFormProps) {
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
    console.log("Consumption data:", data);
    onClose();
  };

  const maxWidth = item.width;
  const maxLength = item.length;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-[#111318] max-h-[calc(100vh-12rem)] sm:max-h-[460px]">
        <div className="bg-[#1A1F2C] p-6 rounded-xl border border-slate-700 space-y-4 hover:border-blue-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Consumed Material</span>
            <span className="text-xs text-slate-400">
              Max: {useInches ? `${(item.width * 39.37).toFixed(2)}" x ${(item.length * 39.37).toFixed(2)}"` : `${item.width}m x ${item.length}m`}
            </span>
          </div>
          <DimensionsFields
            form={form}
            label="Dimensions"
            widthName="width"
            lengthName="length"
            maxWidth={item.width}
            maxLength={item.length}
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
            maxWidth={item.width}
            maxLength={item.length}
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
