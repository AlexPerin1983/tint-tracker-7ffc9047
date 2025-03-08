
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect, useRef } from "react";
import { Item, Filters } from "@/types/inventory";
import { ItemRow } from "./ItemRow";

interface ItemsTableProps {
  items: Item[];
  selectedItemId: string | null;
  filters: Filters;
  onEditClick: (item: Item) => void;
  onQRCodeClick: (item: Item) => void;
  onDeleteClick: (id: string) => void;
}

export function ItemsTable({ 
  items, 
  selectedItemId, 
  filters,
  onEditClick,
  onQRCodeClick,
  onDeleteClick
}: ItemsTableProps) {
  const highlightedRowRef = useRef<HTMLTableRowElement>(null);

  const filterItems = (items: Item[]) => {
    return items.filter((item) => {
      const matchCategory = filters.category === "all" || item.category === filters.category;
      const matchName = !filters.name || 
        item.name.toLowerCase().includes(filters.name.toLowerCase());
      
      const matchWidth = (
        (!filters.minWidth || item.width >= parseFloat(filters.minWidth)) &&
        (!filters.maxWidth || item.width <= parseFloat(filters.maxWidth))
      );
      
      const matchLength = (
        (!filters.minLength || item.length >= parseFloat(filters.minLength)) &&
        (!filters.maxLength || item.length <= parseFloat(filters.maxLength))
      );

      return matchCategory && matchName && matchWidth && matchLength;
    });
  };

  const filteredItems = filterItems(items);

  const isLowStock = (item: Item) => {
    if (item.minQuantity === undefined || item.minQuantity === null) return false;
    return item.quantity <= item.minQuantity;
  };

  useEffect(() => {
    if (selectedItemId && highlightedRowRef.current) {
      highlightedRowRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [selectedItemId]);

  return (
    <div className="rounded-md border border-muted">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead className="hidden md:table-cell">Name</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden md:table-cell">Dimensions</TableHead>
            <TableHead className="hidden md:table-cell">Quantity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              isHighlighted={selectedItemId === item.id}
              highlightedRowRef={highlightedRowRef}
              isLowStock={isLowStock(item)}
              onEditClick={onEditClick}
              onQRCodeClick={onQRCodeClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
