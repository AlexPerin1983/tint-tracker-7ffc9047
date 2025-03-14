import { useEffect, useState } from "react";
import { useItems } from "@/hooks/use-items";
import { Item } from "@/types/inventory";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, PencilIcon, TrashIcon, SearchIcon, QrCode, ArrowUpDown, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QRCodeDialog } from "@/components/inventory/qrcode/QRCodeDialog";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import AddItemDialog from "@/components/inventory/AddItemDialog";
import { cn } from "@/lib/utils";

export function ItemsTable() {
  const { items, deleteItem } = useItems();
  const [searchTerm, setSearchTerm] = useState("");
  const [qrCodeDialogOpen, setQrCodeDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { t, language } = useLanguage();
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const highlight = urlParams.get('highlight');
    
    if (highlight) {
      const elem = document.getElementById(`item-${highlight}`);
      if (elem) {
        elem.classList.add('bg-blue-500/10');
        elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => {
          elem.classList.remove('bg-blue-500/10');
          elem.classList.add('bg-transparent');
          window.history.replaceState({}, document.title, window.location.pathname);
        }, 3000);
      }
    }
  }, []);
  
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };
  
  const getSortedItems = () => {
    let sortedItems = [...items];
    
    if (sortBy) {
      sortedItems.sort((a, b) => {
        let valueA: any = a[sortBy as keyof Item];
        let valueB: any = b[sortBy as keyof Item];
        
        if (sortBy === "category") {
          return sortOrder === "asc" 
            ? valueA.localeCompare(valueB) 
            : valueB.localeCompare(valueA);
        }
        
        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortOrder === "asc" 
            ? valueA.localeCompare(valueB) 
            : valueB.localeCompare(valueA);
        }
        
        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    
    return sortedItems;
  };
  
  const sortedItems = getSortedItems();
  
  const filteredItems = sortedItems.filter((item) => {
    const lowerSearchTerm = searchTerm.toLowerCase().trim();
    return (
      item.name?.toLowerCase().includes(lowerSearchTerm) ||
      item.brand?.toLowerCase().includes(lowerSearchTerm) ||
      item.category?.toLowerCase().includes(lowerSearchTerm) ||
      item.code?.toLowerCase().includes(lowerSearchTerm)
    );
  });
  
  const handleDelete = (id: string) => {
    deleteItem(id);
    toast({
      title: "Item excluído",
      description: "O item foi removido com sucesso.",
    });
  };

  const handleViewQR = (item: Item) => {
    setSelectedItem(item);
    setQrCodeDialogOpen(true);
  };
  
  const handleEditItem = (item: Item) => {
    setSelectedItem(item);
    setEditDialogOpen(true);
  };

  const handleAddItem = () => {
    setAddItemDialogOpen(true);
  };

  const getSortIcon = (column: string) => {
    if (sortBy !== column) return <ArrowUpDown className="ml-1 h-4 w-4" />;
    return sortOrder === "asc" ? (
      <ArrowUpDown className="ml-1 h-4 w-4 text-blue-500" />
    ) : (
      <ArrowUpDown className="ml-1 h-4 w-4 text-blue-500 rotate-180" />
    );
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "Window Tinting":
        switch (language) {
          case 'pt': return "Película de Janela";
          case 'es': return "Película para Ventanas";
          case 'zh': return "窗膜";
          case 'fr': return "Film pour Vitres";
          default: return "Window Tinting";
        }
      case "PPF":
        return "PPF";
      case "Wrap":
        switch (language) {
          case 'pt': return "Envelopamento";
          case 'es': return "Envoltura";
          case 'zh': return "车身改色膜";
          case 'fr': return "Emballage";
          default: return "Wrap";
        }
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Window Tinting":
        return "blue";
      case "PPF":
        return "green";
      case "Wrap":
        return "orange";
      default:
        return "slate";
    }
  };

  const formatDimensions = (item: Item) => {
    return `${item.width?.toFixed(2)}m × ${item.length?.toFixed(2)}m`;
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 text-slate-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-4 opacity-20"
        >
          <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z" />
          <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z" />
          <line x1="12" x2="12" y1="22" y2="13" />
          <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5" />
        </svg>
      </div>
      <p className="text-slate-500 mb-6">
        {t('inventory.noItems')}
      </p>
      <Button onClick={handleAddItem} className="gap-2">
        <Plus className="h-4 w-4" />
        {t('item.addItem')}
      </Button>
    </div>
  );

  return (
    <Card className="border-slate-800/60 bg-slate-900/30 backdrop-blur">
      <div className="p-4">
        <div className="text-sm font-medium text-slate-500 mb-4">
          {filteredItems.length} {t('filter.itemsFound')}
        </div>

        <div className="rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            {isMobile ? (
              <div className="space-y-2">
                {filteredItems.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 bg-slate-800/70 p-3 rounded-t-md">
                      <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        {t('item.code')}
                      </div>
                      <div className="text-xs font-medium uppercase tracking-wider text-slate-400 text-right">
                        {t('common.actions')}
                      </div>
                    </div>
                    
                    {filteredItems.map((item) => (
                      <div 
                        key={item.id}
                        id={`item-${item.id}`}
                        className={cn(
                          "p-3 rounded-md bg-slate-800/40 border-t border-slate-700/50",
                          item.quantity <= item.minQuantity ? "bg-red-900/10 border-red-500/20" : ""
                        )}
                      >
                        <div className="grid grid-cols-2">
                          <div className="space-y-1">
                            <div className="font-medium text-white">{item.code}</div>
                            <div className="text-xs text-slate-400">
                              {item.category === "Wrap" ? "Roll" : item.category} - {item.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {formatDimensions(item)}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewQR(item)}
                                className="h-8 w-8 text-slate-300 hover:bg-slate-700"
                              >
                                <QrCode className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-300 hover:bg-slate-700"
                                asChild
                              >
                                <Link to={`/item/${item.id}`}>
                                  <EyeIcon className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditItem(item)}
                                className="h-8 w-8 text-slate-300 hover:bg-slate-700"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(item.id)}
                                className="h-8 w-8 text-slate-300 hover:bg-slate-700"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : renderEmptyState()}
              </div>
            ) : (
              <Table className="w-full border-collapse">
                <TableHeader className="bg-slate-800/70">
                  <TableRow className="hover:bg-slate-800/60 border-b border-slate-700/50">
                    <TableHead 
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400 cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        {t('item.name')}
                        {getSortIcon("name")}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400 cursor-pointer"
                      onClick={() => handleSort("brand")}
                    >
                      <div className="flex items-center">
                        {t('item.brand')}
                        {getSortIcon("brand")}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400 cursor-pointer"
                      onClick={() => handleSort("category")}
                    >
                      <div className="flex items-center">
                        {t('item.category')}
                        {getSortIcon("category")}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400 cursor-pointer"
                    >
                      <div className="flex items-center">
                        {t('item.dimensions')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400 cursor-pointer"
                      onClick={() => handleSort("quantity")}
                    >
                      <div className="flex items-center">
                        {t('item.quantity')}
                        {getSortIcon("quantity")}
                      </div>
                    </TableHead>
                    <TableHead className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-400">
                      {t('common.actions')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length === 0 ? (
                    <TableRow className="hover:bg-slate-800/40 border-b border-slate-800/60">
                      <TableCell colSpan={6} className="p-0">
                        {renderEmptyState()}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredItems.map((item) => (
                      <TableRow 
                        key={item.id} 
                        id={`item-${item.id}`}
                        className={cn(
                          "hover:bg-slate-800/40 border-b border-slate-800/60 transition-colors",
                          item.quantity <= item.minQuantity ? "bg-red-900/10" : ""
                        )}
                      >
                        <TableCell className="px-4 py-2 text-white">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-slate-500">{item.code}</div>
                        </TableCell>
                        <TableCell className="px-4 py-2 text-slate-300">
                          {item.brand || "—"}
                        </TableCell>
                        <TableCell className="px-4 py-2">
                          <Badge variant="outline" className={`bg-${getCategoryColor(item.category)}-500/10 text-${getCategoryColor(item.category)}-500 border-${getCategoryColor(item.category)}-500/30`}>
                            {getCategoryLabel(item.category)}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 py-2 text-slate-400">
                          <div className="flex items-center gap-1">
                            <span>
                              {item.width.toFixed(2)}m × {item.length.toFixed(2)}m
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-2">
                          <div className={cn(
                            "px-2 py-1 rounded inline-flex items-center justify-center text-xs font-medium",
                            item.quantity <= item.minQuantity 
                              ? "bg-red-500/10 text-red-500" 
                              : "bg-green-500/10 text-green-500"
                          )}>
                            {item.quantity}
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-2 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewQR(item)}
                              className="h-8 w-8 hover:bg-blue-500/10 hover:text-blue-500"
                            >
                              <QrCode className="h-4 w-4" />
                            </Button>
                            <Link to={`/item/${item.id}`}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-slate-700"
                              >
                                <EyeIcon className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditItem(item)}
                              className="h-8 w-8 hover:bg-blue-500/10 hover:text-blue-500"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(item.id)}
                              className="h-8 w-8 hover:bg-red-500/10 hover:text-red-500"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>

      {selectedItem && (
        <>
          <QRCodeDialog
            open={qrCodeDialogOpen}
            onOpenChange={setQrCodeDialogOpen}
            item={selectedItem}
          />
          
          <AddItemDialog 
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            itemToEdit={selectedItem}
            mode="edit"
          />
        </>
      )}

      <AddItemDialog 
        open={addItemDialogOpen}
        onOpenChange={setAddItemDialogOpen}
      />
    </Card>
  );
}
