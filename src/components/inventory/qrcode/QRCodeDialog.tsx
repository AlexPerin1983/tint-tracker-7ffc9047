import { QRCodeCanvas } from "qrcode.react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer, Share2 } from "lucide-react";
import { Item } from "@/types/inventory";

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item;
}

export function QRCodeDialog({ open, onOpenChange, item }: QRCodeDialogProps) {
  const baseUrl = window.location.origin;
  const itemUrl = `${baseUrl}/${item.type === 'bobina' ? 'item' : 'scrap'}/${item.id}`;
  
  const dimensions = item.type === 'bobina' 
    ? `${item.remainingWidth?.toFixed(2)}ft x ${item.remainingLength?.toFixed(2)}ft`
    : `${item.width.toFixed(2)}ft x ${item.length.toFixed(2)}ft`;

  const qrCodeData = {
    id: item.id,
    code: item.code,
    name: item.name,
    category: item.category,
    dimensions: dimensions,
    url: itemUrl
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${item.code}-qrcode.png`;
      link.href = url;
      link.click();
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    if (printWindow) {
      const canvas = document.querySelector("canvas");
      if (canvas) {
        const url = canvas.toDataURL("image/png");
        printWindow.document.write(`
          <html>
            <head>
              <title>QR Code - ${item.name}</title>
              <style>
                body {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                  margin: 0;
                  font-family: system-ui, sans-serif;
                }
                img {
                  max-width: 300px;
                }
                h2 {
                  margin-top: 1rem;
                  color: #333;
                }
              </style>
            </head>
            <body>
              <img src="${url}" alt="QR Code" />
              <h2>${item.name}</h2>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `QR Code - ${item.name}`,
        url: itemUrl
      });
    } catch (error) {
      navigator.clipboard.writeText(itemUrl);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code - {item.type === 'retalho' ? 'Scrap from ' : ''}{item.name}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          <QRCodeCanvas
            value={itemUrl}
            size={256}
            level="H"
            includeMargin
          />

          <p className="text-sm text-muted-foreground text-center">
            Scan this QR Code to directly access the product details page in the system.
          </p>

          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between py-1 border-b">
              <span className="font-medium">SKU:</span>
              <span>{item.code}</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="font-medium">Product:</span>
              <span>{item.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="font-medium">Material:</span>
              <span>{item.category}</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="font-medium">Roll Size:</span>
              <span>{dimensions}</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="font-medium">Link:</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleDownload} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={handlePrint} variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}