import { Eye, Edit, Trash2, QrCode, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useItems } from "@/hooks/use-items";
import { Link } from "react-router-dom";
import { FilterBar } from "./FilterBar";
import { useState } from "react";
import { Item, Filters } from "@/types/inventory";
import { AddItemDialog } from "./AddItemDialog";
import { QRCodeDialog } from "./qrcode/QRCodeDialog";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import ReactDOMServer from "react-dom/server";

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

  const generateQRCodeDataURL = (item: Item): Promise<string> => {
    return new Promise((resolve) => {
      const qrCodeValue = `${window.location.origin}/${item.type === 'bobina' ? 'item' : 'scrap'}/${item.id}`;
      
      const qrCodeElement = ReactDOMServer.renderToStaticMarkup(
        <QRCodeCanvas
          value={qrCodeValue}
          size={100}
          level="H"
        />
      );
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = 100;
        canvas.height = 100;
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      
      const svg = new Blob([qrCodeElement], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svg);
      img.src = url;
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
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Selecionar todos"
                />
              </TableHead>
              <TableHead>Código</TableHead>
              <TableHead className="hidden md:table-cell">Nome</TableHead>
              <TableHead className="hidden md:table-cell">Categoria</TableHead>
              <TableHead className="hidden md:table-cell">Dimensões</TableHead>
              <TableHead className="hidden md:table-cell">Quantidade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
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
                <TableCell className="text-right space-x-2">
                  <Link to={`/${item.type === 'bobina' ? 'item' : 'scrap'}/${item.id}`}>
                    <Button variant="ghost" size="icon" title="Ver Detalhes">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Editar"
                    onClick={() => handleEditClick(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive" 
                    title="Excluir"
                    onClick={() => deleteItem(item.id)}
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