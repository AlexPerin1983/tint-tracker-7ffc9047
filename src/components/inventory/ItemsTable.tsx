
import { useState, useEffect } from "react";
import { useItems } from "@/hooks/use-items";
import { useLocation } from "react-router-dom";
import { FilterBar } from "./FilterBar";
import { Item, Filters } from "@/types/inventory";
import AddItemDialog from "./AddItemDialog";
import { QRCodeDialog } from "./qrcode/QRCodeDialog";
import { AddScrapDialog } from "./AddScrapDialog";
import { ItemsTable as ItemsDataTable } from "./table/ItemsTable";

export function ItemsTable() {
  const location = useLocation();
  const { items, deleteItem } = useItems();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
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
      window.history.replaceState({}, document.title);
    }
  }, [location]);

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

  const handleDeleteClick = (id: string) => {
    setSelectedItemId(id);
    deleteItem(id);
  };

  return (
    <div className="space-y-4">
      <FilterBar 
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={handleClearFilters}
        itemCount={items.length}
      />

      <ItemsDataTable 
        items={items}
        selectedItemId={selectedItemId}
        filters={filters}
        onEditClick={handleEditClick}
        onQRCodeClick={handleQRCodeClick}
        onDeleteClick={handleDeleteClick}
      />

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
