
import { TableRow, TableCell } from "@/components/ui/table";
import { ItemActions } from "./ItemActions";
import { ItemQuantity } from "./ItemQuantity";
import { ItemDimensions } from "./ItemDimensions";
import { Item } from "@/types/inventory";

interface ItemRowProps {
  item: Item;
  isHighlighted: boolean;
  highlightedRowRef: React.RefObject<HTMLTableRowElement>;
  isLowStock: boolean;
  onEditClick: (item: Item) => void;
  onQRCodeClick: (item: Item) => void;
  onDeleteClick: (id: string) => void;
}

export function ItemRow({ 
  item, 
  isHighlighted, 
  highlightedRowRef, 
  isLowStock,
  onEditClick,
  onQRCodeClick,
  onDeleteClick
}: ItemRowProps) {
  return (
    <TableRow 
      ref={isHighlighted ? highlightedRowRef : undefined}
      className={`${
        isHighlighted ? "bg-muted/50 transition-colors duration-1000" : ""
      } ${
        isLowStock ? "bg-amber-50/10" : ""
      }`}
    >
      <TableCell className="font-medium">
        <div className="flex flex-col">
          <span>{item.code}</span>
          <span className="text-xs text-muted-foreground">
            {item.type === 'bobina' ? 'Roll' : 'Scrap'} - {item.name.replace('Retalho de ', '')}
          </span>
          <span className="text-xs text-muted-foreground">
            <ItemDimensions item={item} />
          </span>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{item.name.replace('Retalho de', 'Scrap of')}</TableCell>
      <TableCell className="hidden md:table-cell">{item.category}</TableCell>
      <TableCell className="hidden md:table-cell">
        <ItemDimensions item={item} />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <ItemQuantity item={item} />
      </TableCell>
      <TableCell className="text-right">
        <ItemActions 
          item={item} 
          onEditClick={onEditClick} 
          onQRCodeClick={onQRCodeClick} 
          onDeleteClick={onDeleteClick}
        />
      </TableCell>
    </TableRow>
  );
}
