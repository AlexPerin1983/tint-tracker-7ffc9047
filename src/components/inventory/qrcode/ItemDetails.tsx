
import { Item } from "@/types/inventory";

interface ItemDetailsProps {
  item: Item;
  dimensions: string;
}

export function ItemDetails({ item, dimensions }: ItemDetailsProps) {
  return (
    <div className="w-full space-y-2 text-sm">
      <div className="flex justify-between py-1 border-b">
        <span className="font-medium">SKU:</span>
        <span>{item.code}</span>
      </div>
      <div className="flex justify-between py-1 border-b">
        <span className="font-medium">Produto:</span>
        <span>{item.name}</span>
      </div>
      <div className="flex justify-between py-1 border-b">
        <span className="font-medium">Dimensões:</span>
        <span>{dimensions}</span>
      </div>
    </div>
  );
}
