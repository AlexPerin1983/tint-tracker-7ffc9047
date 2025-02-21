
import { Button } from "@/components/ui/button";
import { Download, Printer, Scan } from "lucide-react";
import { Item } from "@/types/inventory";

interface QRCodeActionsProps {
  onDownload: () => void;
  onPrint: () => void;
  onScan: () => void;
}

export function QRCodeActions({ onDownload, onPrint, onScan }: QRCodeActionsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 w-full px-4">
      <Button onClick={onDownload} variant="outline" size="sm" className="flex-1 min-w-[100px]">
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
      <Button onClick={onPrint} variant="outline" size="sm" className="flex-1 min-w-[100px]">
        <Printer className="w-4 h-4 mr-2" />
        Imprimir
      </Button>
      <Button onClick={onScan} variant="outline" size="sm" className="flex-1 min-w-[100px]">
        <Scan className="w-4 h-4 mr-2" />
        Escanear
      </Button>
    </div>
  );
}
