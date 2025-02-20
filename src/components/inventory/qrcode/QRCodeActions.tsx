
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
    <div className="flex gap-4">
      <Button onClick={onDownload} variant="outline">
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
      <Button onClick={onPrint} variant="outline">
        <Printer className="w-4 h-4 mr-2" />
        Imprimir
      </Button>
      <Button onClick={onScan} variant="outline">
        <Scan className="w-4 h-4 mr-2" />
        Escanear
      </Button>
    </div>
  );
}
