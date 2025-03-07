
import { useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Item } from "@/types/inventory";
import { QRCodeDisplay } from "./QRCodeDisplay";
import { QRCodeActions } from "./QRCodeActions";
import { ItemDetails } from "./ItemDetails";
import { handleQRDownload, handleQRPrint } from "./qrCodeUtils";
import { useIsMobile } from "@/hooks/use-mobile";

// Add a global variable to store the current item's brand
declare global {
  interface Window {
    currentItemBrand?: string;
  }
}

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item;
}

export function QRCodeDialog({ open, onOpenChange, item }: QRCodeDialogProps) {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Generate a QR code value that works with any scanner
  // Format: app:item:ID or app:scrap:ID
  const qrValue = `tint-tracker:${item.type === 'bobina' ? 'item' : 'scrap'}:${item.id}`;
  
  // Store brand in window object for download function to access
  useEffect(() => {
    if (open) {
      window.currentItemBrand = item.brand || "Desconhecida";
    }
  }, [open, item.brand]);
  
  const dimensions = item.type === 'bobina' 
    ? `${(item.remainingWidth * 39.37).toFixed(2)}" x ${(item.remainingLength * 39.37).toFixed(2)}" (${item.remainingWidth.toFixed(2)}m x ${item.remainingLength.toFixed(2)}m)`
    : `${(item.width * 39.37).toFixed(2)}" x ${(item.length * 39.37).toFixed(2)}" (${item.width.toFixed(2)}m x ${item.length.toFixed(2)}m)`;

  const handlePrint = () => {
    const canvas = document.querySelector("#qr-code") as HTMLCanvasElement;
    const imageUrl = canvas?.toDataURL("image/png");
    handleQRPrint(imageUrl, { 
      name: item.name, 
      code: item.code, 
      dimensions,
      brand: item.brand || "Desconhecida",
      category: item.category,
      price: item.price,
      observation: item.observation
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'w-[95%] p-3' : 'sm:max-w-md p-6'}`}>
        <DialogHeader className="space-y-0.5">
          <DialogTitle className="text-base sm:text-lg">{item.code}</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Escaneie para identificar este item
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-2 sm:space-y-4">
          <div className="w-full max-w-[180px] sm:max-w-[250px] mx-auto">
            <QRCodeDisplay item={item} qrValue={qrValue} />
          </div>

          <div className="text-center text-sm sm:text-base font-medium text-muted-foreground w-full break-words px-2">
            {item.name}
          </div>

          <div className="text-center text-xs sm:text-sm font-medium text-muted-foreground w-full break-words px-2 -mt-1">
            {item.brand || "Desconhecida"}
          </div>

          <div className="w-full">
            <ItemDetails item={item} dimensions={dimensions} />
          </div>

          <div className="w-full">
            <QRCodeActions
              onDownload={() => handleQRDownload(item.code, item.name)}
              onPrint={handlePrint}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
