
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
  const qrValue = item.id;
  
  const dimensions = item.type === 'bobina' 
    ? `${(item.remainingWidth * 39.37).toFixed(2)}" x ${(item.remainingLength * 39.37).toFixed(2)}" (${item.remainingWidth.toFixed(2)}m x ${item.remainingLength.toFixed(2)}m)`
    : `${(item.width * 39.37).toFixed(2)}" x ${(item.length * 39.37).toFixed(2)}" (${item.width.toFixed(2)}m x ${item.length.toFixed(2)}m)`;

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar tamanho do canvas para acomodar QR code e texto
    canvas.width = 200;
    canvas.height = 240;

    // Fundo branco
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar QR Code
    const qrCanvas = document.querySelector("#qr-code") as HTMLCanvasElement;
    if (!qrCanvas) return;

    // Centralizar QR Code
    const qrX = (canvas.width - qrCanvas.width) / 2;
    ctx.drawImage(qrCanvas, qrX, 10);

    // Adicionar texto abaixo do QR Code
    ctx.fillStyle = '#000000';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(item.name, canvas.width / 2, qrCanvas.height + 30);

    // Download
    const downloadLink = document.createElement("a");
    downloadLink.href = canvas.toDataURL("image/png");
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
            Escaneie para identificar este item
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="p-4 bg-white rounded-xl">
            <QRCodeCanvas
              id="qr-code"
              value={qrValue}
              size={200}
              level="H"
              includeMargin={true}
              style={{ 
                width: '100%', 
                height: 'auto',
              }}
            />
          </div>

          <div className="text-center text-sm font-medium text-muted-foreground">
            {item.name}
          </div>

          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between py-1 border-b">
              <span className="font-medium">SKU:</span>
              <span>{item.code}</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="font-medium">Produto:</span>
              <span>{item.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b">
              <span className="font-medium">Dimensões:</span>
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
              Imprimir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
