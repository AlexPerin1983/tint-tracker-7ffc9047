
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { ConsumptionForm } from "./ConsumptionForm";
import { Item } from "@/types/inventory";

interface ConsumptionDialogProps {
  item: Item;
  open: boolean;
  onClose: () => void;
}

export function ConsumptionDialog({ item, open, onClose }: ConsumptionDialogProps) {
  const [useInches, setUseInches] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#111318] border-none p-0 flex flex-col h-[100dvh] sm:h-auto">
        <div className="flex items-center justify-end space-x-2 p-4 border-b border-slate-800">
          <span className="text-sm text-[#8E9196] font-medium">Meters</span>
          <Switch checked={useInches} onCheckedChange={setUseInches} />
          <span className="text-sm text-[#8E9196] font-medium">Inches</span>
        </div>
        <ConsumptionForm 
          item={item} 
          onClose={onClose} 
          useInches={useInches}
          onUnitChange={() => setUseInches(!useInches)}
        />
      </DialogContent>
    </Dialog>
  );
}
