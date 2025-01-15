import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useItems } from "@/hooks/use-items";
import { FilterBar } from "./FilterBar";
import { useState } from "react";
import { Item, Filters } from "@/types/inventory";
import { AddItemDialog } from "./AddItemDialog";
import { QRCodeDialog } from "./qrcode/QRCodeDialog";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import { generateQRCodeDataURL } from "./qrcode/QRCodeGenerator";
import { TableActions } from "./TableActions";
import { InventoryTableHeader } from "./TableHeader";

export function ItemsTable() {
  const { items, deleteItem } = useItems();
  const { toast } = useToast();
  const [filters, setFilters] = useState<Filters>({
    category: "all",
    name: "",
    minWidth: "",
    minLength: "",
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [qrCodeDialogOpen, setQrCodeDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const formatDimensions = (width: number, length: number) => 
    `${width.toFixed(2)}m x ${length.toFixed(2)}m`;

  const filterItems = (items: Item[]) => {
    return items.filter((item) => {
      const matchCategory = filters.category === "all" || item.category === filters.category;
      const matchName = !filters.name || 
        item.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchWidth = !filters.minWidth || 
        item.width >= parseFloat(filters.minWidth);
      const matchLength = !filters.minLength || 
        item.length >= parseFloat(filters.minLength);

      return matchCategory && matchName && matchWidth && matchLength;
    });
  };

  const filteredItems = filterItems(items);

  const handleClearFilters = () => {
    setFilters({
      category: "all",
      name: "",
      minWidth: "",
      minLength: "",
    });
  };

  const handleEditClick = (item: Item) => {
    setSelectedItem(item);
    setEditDialogOpen(true);
  };

  const handleQRCodeClick = (item: Item) => {
    setSelectedItem(item);
    setQrCodeDialogOpen(true);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const toggleSelectItem = (itemId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  const handleDownloadPDF = async () => {
    if (selectedItems.length === 0) {
      toast({
        title: "Nenhum item selecionado",
        description: "Selecione pelo menos um item para gerar o PDF.",
        variant: "destructive",
      });
      return;
    }

    const pdf = new jsPDF();
    const selectedItemsData = filteredItems.filter(item => selectedItems.includes(item.id));
    const margin = 20;
    const qrSize = 50;
    const itemsPerPage = 6;
    let currentY = margin;

    for (let i = 0; i < selectedItemsData.length; i++) {
      const item = selectedItemsData[i];
      
      if (i > 0 && i % itemsPerPage === 0) {
        pdf.addPage();
        currentY = margin;
      }

      const qrDataUrl = await generateQRCodeDataURL(item);
      
      pdf.addImage(qrDataUrl, 'PNG', margin, currentY, qrSize, qrSize);
      pdf.setFontSize(12);
      pdf.text(item.name, margin + qrSize + 10, currentY + 15);
      pdf.setFontSize(10);
      pdf.text(`Código: ${item.code}`, margin + qrSize + 10, currentY + 25);
      pdf.text(formatDimensions(item.width, item.length), margin + qrSize + 10, currentY + 35);

      currentY += qrSize + margin;
    }

    pdf.save('qrcodes.pdf');
    
    toast({
      title: "PDF gerado com sucesso!",
      description: `${selectedItems.length} QR Code${selectedItems.length > 1 ? 's' : ''} exportado${selectedItems.length > 1 ? 's' : ''}.`,
    });
  };

  return (
    <div className="space-y-4">
      <FilterBar 
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      <div className="flex justify-end">
        {selectedItems.length > 0 && (
          <Button onClick={handleDownloadPDF} className="mb-4">
            <Download className="w-4 h-4 mr-2" />
            Baixar {selectedItems.length} QR Code{selectedItems.length > 1 ? 's' : ''}
          </Button>
        )}
      </div>

      <div className="rounded-md border border-muted">
        <Table>
          <InventoryTableHeader 
            onSelectAll={handleSelectAll}
            allSelected={selectedItems.length === filteredItems.length}
            hasItems={filteredItems.length > 0}
          />
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleSelectItem(item.id)}
                    aria-label={`Selecionar ${item.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{item.code}</TableCell>
                <TableCell className="hidden md:table-cell">{item.name}</TableCell>
                <TableCell className="hidden md:table-cell">{item.category}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDimensions(item.width, item.length)}
                </TableCell>
                <TableCell className="hidden md:table-cell">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  <TableActions
                    item={item}
                    onEdit={handleEditClick}
                    onDelete={deleteItem}
                    onQRCode={handleQRCodeClick}
                  />
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