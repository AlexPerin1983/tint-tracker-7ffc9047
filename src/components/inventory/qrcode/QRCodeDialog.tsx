
import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Item } from "@/types/inventory";
import { QRScanner } from "@/components/scanner/QRScanner";
import { QRCodeDisplay } from "./QRCodeDisplay";
import { QRCodeActions } from "./QRCodeActions";
import { ItemDetails } from "./ItemDetails";
import { handleQRDownload, handleQRPrint } from "./qrCodeUtils";

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item;
}

export function QRCodeDialog({ open, onOpenChange, item }: QRCodeDialogProps) {
  const [scannerOpen, setScannerOpen] = useState(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrValue = item.id;
  
  const dimensions = item.type === 'bobina' 
    ? `${(item.remainingWidth * 39.37).toFixed(2)}" x ${(item.remainingLength * 39.37).toFixed(2)}" (${item.remainingWidth.toFixed(2)}m x ${item.remainingLength.toFixed(2)}m)`
    : `${(item.width * 39.37).toFixed(2)}" x ${(item.length * 39.37).toFixed(2)}" (${item.width.toFixed(2)}m x ${item.length.toFixed(2)}m)`;

  const handlePrint = () => {
    const canvas = document.querySelector("#qr-code") as HTMLCanvasElement;
    const imageUrl = canvas?.toDataURL("image/png");
    handleQRPrint(imageUrl, { name: item.name, code: item.code, dimensions });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-1">
            <DialogTitle>{item.code}</DialogTitle>
            <DialogDescription>
              Escaneie para identificar este item
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-3 py-2">
            <QRCodeDisplay item={item} qrValue={qrValue} />

            <div className="text-center text-sm font-medium text-muted-foreground w-full break-words px-4">
              {item.name}
            </div>

            <ItemDetails item={item} dimensions={dimensions} />

            <div className="w-full pt-2">
              <QRCodeActions
                onDownload={() => handleQRDownload(item.code)}
                onPrint={handlePrint}
                onScan={() => setScannerOpen(true)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <QRScanner 
        open={scannerOpen} 
        onOpenChange={setScannerOpen}
      />
    </>
  );
}
