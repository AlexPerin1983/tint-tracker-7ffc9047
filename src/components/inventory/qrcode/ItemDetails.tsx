
import { Item } from "@/types/inventory";
import { formatDate } from "@/lib/utils";

interface ItemDetailsProps {
  item: Item;
  dimensions: string;
}

export function ItemDetails({ item, dimensions }: ItemDetailsProps) {
  return (
    <div className="w-full space-y-2 text-sm">
      <div className="flex justify-between py-1 border-b">
        <span className="font-medium">Marca:</span>
        <span>{item.brand}</span>
      </div>
      <div className="flex justify-between py-1 border-b">
        <span className="font-medium">Categoria:</span>
        <span>{item.category}</span>
      </div>
      <div className="flex justify-between py-1 border-b">
        <span className="font-medium">Criado em:</span>
        <span>{formatDate(item.createdAt)}</span>
      </div>
      <div className="flex justify-between py-1 border-b">
        <span className="font-medium">Dimensões:</span>
        <span>{dimensions}</span>
      </div>
      {item.price && (
        <div className="flex justify-between py-1 border-b">
          <span className="font-medium">Preço por m²:</span>
          <span>USD {item.price.toFixed(2)}</span>
        </div>
      )}
      {item.observation && (
        <div className="flex justify-between py-1 border-b">
          <span className="font-medium">Localização:</span>
          <span>{item.observation}</span>
        </div>
      )}
    </div>
  );
}
