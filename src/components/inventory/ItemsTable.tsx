import { Eye, Edit, Trash2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useItems } from "@/hooks/use-items";
import { Link, useLocation } from "react-router-dom";
import { FilterBar } from "./FilterBar";
import { useState, useEffect, useRef } from "react";
import { Item, Filters } from "@/types/inventory";
import { AddItemDialog } from "./AddItemDialog";
import { QRCodeDialog } from "./qrcode/QRCodeDialog";
import { AddScrapDialog } from "./AddScrapDialog";

export function ItemsTable() {
  const location = useLocation();
  const { items, deleteItem } = useItems();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const highlightedRowRef = useRef<HTMLTableRowElement>(null);
  const [filters, setFilters] = useState<Filters>({
    category: "all",
    name: "",
    minWidth: "",
    maxWidth: "",
    minLength: "",
    maxLength: "",
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editScrapDialogOpen, setEditScrapDialogOpen] = useState(false);
  const [qrCodeDialogOpen, setQrCodeDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();

  useEffect(() => {
    const state = location.state as { highlightedItemId?: string };
    if (state?.highlightedItemId) {
      setSelectedItemId(state.highlightedItemId);
      
      setTimeout(() => {
        highlightedRowRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);

      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const formatDimensions = (item: Item) => {
    if (item.type === 'bobina') {
      return `${item.remainingWidth.toFixed(2)}m x ${item.remainingLength.toFixed(2)}m`;
    }
    return `${item.width.toFixed(2)}m x ${item.length.toFixed(2)}m`;
  };

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

  const handleClearFilters = () => {
    setFilters({
      category: "all",
      name: "",
      minWidth: "",
      maxWidth: "",
      minLength: "",
      maxLength: "",
    });
  };

  const handleEditClick = (item: Item) => {
    setSelectedItemId(item.id);
    setSelectedItem(item);
    if (item.type === 'scrap') {
      setEditScrapDialogOpen(true);
    } else {
      setEditDialogOpen(true);
    }
  };

  const handleQRCodeClick = (item: Item) => {
    setSelectedItemId(item.id);
    setSelectedItem(item);
    setQrCodeDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <FilterBar 
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={handleClearFilters}
        itemCount={filteredItems.length}
      />

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
              <TableRow 
                key={item.id}
                ref={item.id === selectedItemId ? highlightedRowRef : undefined}
                className={`${selectedItemId === item.id ? "bg-muted/50 transition-colors duration-1000" : ""}`}
              >
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{item.code}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.type === 'bobina' ? 'Roll' : 'Scrap'} - {item.name.replace('Retalho de ', '')}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{item.name.replace('Retalho de', 'Scrap of')}</TableCell>
                <TableCell className="hidden md:table-cell">{item.category}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDimensions(item)}
                </TableCell>
                <TableCell className="hidden md:table-cell">{item.quantity}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link to={`/${item.type === 'bobina' ? 'item' : 'scrap'}/${item.id}`} onClick={() => setSelectedItemId(item.id)}>
                    <Button variant="ghost" size="icon" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Edit"
                    onClick={() => handleEditClick(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive" 
                    title="Delete"
                    onClick={() => {
                      setSelectedItemId(item.id);
                      deleteItem(item.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="QR Code"
                    onClick={() => handleQRCodeClick(item)}
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddItemDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        mode="edit"
        itemToEdit={selectedItem}
      />

      {selectedItem?.originId && (
        <AddScrapDialog
          open={editScrapDialogOpen}
          onOpenChange={setEditScrapDialogOpen}
          parentItemId={selectedItem.originId}
        />
      )}

      {selectedItem && (
        <QRCodeDialog
          open={qrCodeDialogOpen}
          onOpenChange={setQrCodeDialogOpen}
          item={selectedItem}
        />
      )}
    </div>
  );
}