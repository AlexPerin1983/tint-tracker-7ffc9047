import { Eye, Edit, Trash2, QrCode, AlertTriangle } from "lucide-react";
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
import { useState, useEffect, useRef } from "react";
import { Item, Filters } from "@/types/inventory";
import AddItemDialog from "./AddItemDialog";
import { QRCodeDialog } from "./qrcode/QRCodeDialog";
import { AddScrapDialog } from "./AddScrapDialog";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";

interface ItemsTableProps {
  filters?: Filters;
  onFilterChange?: (filters: Filters) => void;
}

export function ItemsTable({ filters = {
  category: "all",
  name: "",
  minWidth: "",
  maxWidth: "",
  minLength: "",
  maxLength: "",
}, onFilterChange }: ItemsTableProps) {
  const location = useLocation();
  const { items, deleteItem } = useItems();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const highlightedRowRef = useRef<HTMLTableRowElement>(null);
  const [localFilters, setLocalFilters] = useState<Filters>(filters);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editScrapDialogOpen, setEditScrapDialogOpen] = useState(false);
  const [qrCodeDialogOpen, setQrCodeDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const { t } = useLanguage();

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

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
    const metersToInches = (meters: number) => (meters * 39.37).toFixed(2);
    
    if (item.type === 'bobina') {
      const widthInches = metersToInches(item.remainingWidth);
      const lengthInches = metersToInches(item.remainingLength);
      return `${widthInches}" x ${lengthInches}" (${item.remainingWidth.toFixed(2)}m x ${item.remainingLength.toFixed(2)}m)`;
    }
    const widthInches = metersToInches(item.width);
    const lengthInches = metersToInches(item.length);
    return `${widthInches}" x ${lengthInches}" (${item.width.toFixed(2)}m x ${item.length.toFixed(2)}m)`;
  };

  const handleFilterChange = (newFilters: Filters) => {
    setLocalFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleClearFilters = () => {
    const clearedFilters: Filters = {
      category: "all",
      name: "",
      minWidth: "",
      maxWidth: "",
      minLength: "",
      maxLength: "",
    };
    setLocalFilters(clearedFilters);
    if (onFilterChange) {
      onFilterChange(clearedFilters);
    }
  };

  const filterItems = (items: Item[]) => {
    return items.filter((item) => {
      const matchCategory = localFilters.category === "all" || item.category === localFilters.category;
      const matchName = !localFilters.name || 
        item.name.toLowerCase().includes(localFilters.name.toLowerCase());
      
      const matchWidth = (
        (!localFilters.minWidth || item.width >= parseFloat(localFilters.minWidth)) &&
        (!localFilters.maxWidth || item.width <= parseFloat(localFilters.maxWidth))
      );
      
      const matchLength = (
        (!localFilters.minLength || item.length >= parseFloat(localFilters.minLength)) &&
        (!localFilters.maxLength || item.length <= parseFloat(localFilters.maxLength))
      );

      return matchCategory && matchName && matchWidth && matchLength;
    });
  };

  const filteredItems = filterItems(items);

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

  const isLowStock = (item: Item) => {
    if (item.minQuantity === undefined || item.minQuantity === null) return false;
    return item.quantity <= item.minQuantity;
  };

  const renderQuantityCell = (item: Item) => {
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
              <p>{t('item.minQuantityWarning', { minQuantity: item.minQuantity })}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    }
    return item.quantity;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-muted">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('item.code')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('item.name')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('item.category')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('item.dimensions')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('item.quantity')}</TableHead>
              <TableHead className="text-right">{t('common.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow 
                key={item.id}
                ref={item.id === selectedItemId ? highlightedRowRef : undefined}
                className={`${
                  selectedItemId === item.id ? "bg-muted/50 transition-colors duration-1000" : ""
                } ${
                  isLowStock(item) ? "bg-amber-50/10" : ""
                }`}
              >
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{item.code}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.type === 'bobina' ? t('item.roll') : t('item.scrap')} - {item.name.replace('Retalho de ', '')}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDimensions(item)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{item.name.replace('Retalho de', t('item.scrapOf'))}</TableCell>
                <TableCell className="hidden md:table-cell">{item.category}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDimensions(item)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {renderQuantityCell(item)}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Link to={`/${item.type === 'bobina' ? 'item' : 'scrap'}/${item.id}`} onClick={() => setSelectedItemId(item.id)}>
                    <Button variant="ghost" size="icon" title={t('common.viewDetails')}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title={t('common.edit')}
                    onClick={() => handleEditClick(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive" 
                    title={t('common.delete')}
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
                    title={t('common.qrCode')}
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
          editingScrap={selectedItem}
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
