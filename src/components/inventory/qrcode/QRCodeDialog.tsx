
import { QRCodeSVG } from "qrcode.react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
    ? `${(item.remainingWidth * 39.37).toFixed(2)}" x ${(item.remainingLength * 39.37).toFixed(2)}" (${item.remainingWidth.toFixed(2)}m x ${item.remainingLength.toFixed(2)}m)`
    : `${(item.width * 39.37).toFixed(2)}" x ${(item.length * 39.37).toFixed(2)}" (${item.width.toFixed(2)}m x ${item.length.toFixed(2)}m)`;

  const qrCodeData = {
    id: item.id,
    code: item.code,
    name: item.name,
    category: item.category,
    dimensions: dimensions,
    url: itemUrl
  };

  const handleDownload = () => {
    const svg = document.querySelector("#qr-code-svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.fillStyle = '#FFFFFF';
        ctx?.fillRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(img, 0, 0);
        
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `${item.code}-qrcode.png`;
        link.href = pngUrl;
        link.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    if (printWindow) {
      const svg = document.querySelector("#qr-code-svg");
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const imgData = 'data:image/svg+xml;base64,' + btoa(svgData);
        
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
                  background: white;
                }
                img {
                  max-width: 300px;
                  margin-bottom: 1rem;
                }
                h2 {
                  margin: 0;
                  color: #333;
                  font-size: 1.2rem;
                }
                .details {
                  margin-top: 1rem;
                  font-size: 0.9rem;
                  color: #666;
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" alt="QR Code" />
              <h2>${item.name}</h2>
              <div class="details">
                <div>SKU: ${item.code}</div>
                <div>Material: ${item.category}</div>
                <div>Size: ${dimensions}</div>
              </div>
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
          <DialogTitle>{item.type === 'scrap' ? 'Scrap from ' : ''}{item.name}</DialogTitle>
          <DialogDescription>
            Scan this QR Code to directly access the product details page in the system.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="p-3 bg-white rounded-xl">
            <QRCodeSVG
              id="qr-code-svg"
              value={itemUrl}
              size={256}
              level="H"
              includeMargin={true}
              bgColor="#FFFFFF"
              fgColor="#000000"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

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
