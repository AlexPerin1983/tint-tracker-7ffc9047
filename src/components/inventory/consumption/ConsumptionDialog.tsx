
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { ConsumptionForm } from "./ConsumptionForm";
import { Item } from "@/types/inventory";

interface ConsumptionDialogProps {
  item: Item;
  open: boolean;
  onClose: () => void;
}

export function ConsumptionDialog({ item, open, onClose }: ConsumptionDialogProps) {
  // Load saved preference, default to true (inches) if not found
  const [useInches, setUseInches] = useState(() => {
    const savedPreference = localStorage.getItem('dimensionUnit');
    return savedPreference ? savedPreference === 'inches' : true;
  });

  // Update preference in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dimensionUnit', useInches ? 'inches' : 'meters');
  }, [useInches]);

  const handleUnitChange = (value: boolean) => {
    setUseInches(value);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}>
      <DialogContent className="sm:max-w-[600px] bg-[#111318] border-none p-0 flex flex-col h-[100dvh] sm:h-auto">
        <div className="flex items-center justify-end space-x-2 p-4 border-b border-slate-800">
          <span className={`text-sm font-medium ${!useInches ? "text-blue-400" : "text-[#8E9196]"}`}>Meters</span>
          <Switch checked={useInches} onCheckedChange={handleUnitChange} />
          <span className={`text-sm font-medium ${useInches ? "text-blue-400" : "text-[#8E9196]"}`}>Inches</span>
        </div>
        <ConsumptionForm 
          item={item} 
          onClose={onClose} 
          useInches={useInches}
          onUnitChange={() => handleUnitChange(!useInches)}
        />
      </DialogContent>
    </Dialog>
  );
}
