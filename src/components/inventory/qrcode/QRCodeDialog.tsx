
import { useEffect, useRef } from "react";
import QRCode from "easyqrcodejs";
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
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<any>(null);
  
  const baseUrl = window.location.origin;
  const itemUrl = `${baseUrl}/${item.type === 'bobina' ? 'item' : 'scrap'}/${item.id}`;
  
  const dimensions = item.type === 'bobina' 
    ? `${(item.remainingWidth * 39.37).toFixed(2)}" x ${(item.remainingLength * 39.37).toFixed(2)}" (${item.remainingWidth.toFixed(2)}m x ${item.remainingLength.toFixed(2)}m)`
    : `${(item.width * 39.37).toFixed(2)}" x ${(item.length * 39.37).toFixed(2)}" (${item.width.toFixed(2)}m x ${item.length.toFixed(2)}m)`;

  useEffect(() => {
    if (open && qrCodeRef.current) {
      if (qrCodeInstance.current) {
        qrCodeInstance.current.clear();
      }

      qrCodeInstance.current = new QRCode(qrCodeRef.current, {
        text: itemUrl,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
        quietZone: 15,
        quietZoneColor: "#ffffff",
        title: item.name,
        titleFont: "normal normal bold 16px Arial",
        titleColor: "#000000",
        titleBackgroundColor: "#ffffff",
        titleHeight: 40,
        titleTop: 20,
        logo: "/lovable-uploads/37a8dd46-bd6a-4cda-8907-7614c70add31.png",
        logoWidth: 80,
        logoHeight: 80,
        logoBackgroundColor: '#ffffff',
        logoBackgroundTransparent: false
      });
    }

    return () => {
      if (qrCodeInstance.current) {
        qrCodeInstance.current.clear();
      }
    };
  }, [open, itemUrl, item.name]);

  const handleDownload = () => {
    if (qrCodeInstance.current) {
      qrCodeInstance.current.download(`${item.code}-qrcode`);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    if (printWindow && qrCodeRef.current) {
      const qrCodeImage = qrCodeRef.current.querySelector('canvas')?.toDataURL("image/png");
      
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
            <img src="${qrCodeImage}" alt="QR Code" />
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
            <div ref={qrCodeRef} className="flex justify-center" />
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
