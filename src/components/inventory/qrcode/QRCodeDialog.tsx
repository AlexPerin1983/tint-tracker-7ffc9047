
import { useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
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
  
  // Usando apenas o ID como valor do QR Code
  const qrValue = item.id;
  
  const dimensions = item.type === 'bobina' 
    ? `${(item.remainingWidth * 39.37).toFixed(2)}" x ${(item.remainingLength * 39.37).toFixed(2)}" (${item.remainingWidth.toFixed(2)}m x ${item.remainingLength.toFixed(2)}m)`
    : `${(item.width * 39.37).toFixed(2)}" x ${(item.length * 39.37).toFixed(2)}" (${item.width.toFixed(2)}m x ${item.length.toFixed(2)}m)`;

  const handleDownload = () => {
    // Criar um canvas temporário para combinar QR code e texto
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;

    // Obter o canvas do QR code
    const qrCanvas = document.querySelector("#qr-code") as HTMLCanvasElement;
    if (!qrCanvas) return;

    // Configurar o canvas temporário
    tempCanvas.width = qrCanvas.width;
    tempCanvas.height = qrCanvas.height + 30; // Altura extra para o texto

    // Desenhar o QR code
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    ctx.drawImage(qrCanvas, 0, 0);

    // Adicionar o texto
    ctx.fillStyle = '#000000';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(item.name, tempCanvas.width / 2, qrCanvas.height + 20);

    // Criar o link de download
    const downloadLink = document.createElement("a");
    downloadLink.href = tempCanvas.toDataURL("image/png");
    downloadLink.download = `${item.code}-qrcode.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    if (printWindow) {
      const canvas = document.querySelector("#qr-code") as HTMLCanvasElement;
      const imageUrl = canvas?.toDataURL("image/png");
      
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
                max-width: 200px;
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
            <img src="${imageUrl}" alt="QR Code" />
            <h2>${item.code}</h2>
            <div class="details">
              <div>${item.name}</div>
              <div>${dimensions}</div>
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
        text: item.id
      });
    } catch (error) {
      navigator.clipboard.writeText(item.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{item.code}</DialogTitle>
          <DialogDescription>
            Scan to quickly identify this item
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="p-4 bg-white rounded-xl">
            <QRCodeCanvas
              id="qr-code"
              value={qrValue}
              size={150}
              level="L"
              includeMargin={true}
              style={{ 
                width: '100%', 
                height: 'auto',
              }}
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
              <span className="font-medium">Size:</span>
              <span>{dimensions}</span>
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
