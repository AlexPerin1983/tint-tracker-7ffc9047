
import { AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Item } from "@/types/inventory";

interface ItemQuantityProps {
  item: Item;
}

export function ItemQuantity({ item }: ItemQuantityProps) {
  const isLowStock = (item: Item) => {
    // If minQuantity isn't defined, don't show alert
    if (item.minQuantity === undefined || item.minQuantity === null) return false;
    
    // If current quantity is less than or equal to minimum quantity, show alert
    return item.quantity <= item.minQuantity;
  };

  if (isLowStock(item)) {
    return (
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              <span>{item.quantity}</span>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Quantidade mínima: {item.minQuantity}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }
  
  return <span>{item.quantity}</span>;
}
