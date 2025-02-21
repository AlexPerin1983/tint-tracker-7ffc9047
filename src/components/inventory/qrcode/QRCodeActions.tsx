
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

interface QRCodeActionsProps {
  onDownload: () => void;
  onPrint: () => void;
}

export function QRCodeActions({ onDownload, onPrint }: QRCodeActionsProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Button 
        onClick={onDownload} 
        variant="outline" 
        className="w-full bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20 hover:border-blue-500/30 text-blue-400"
      >
        <Download className="w-4 h-4 mr-2" />
        Download QR Code
      </Button>
      <Button 
        onClick={onPrint} 
        variant="outline"
        className="w-full bg-slate-500/10 hover:bg-slate-500/20 border-slate-500/20 hover:border-slate-500/30 text-slate-400"
      >
        <Printer className="w-4 h-4 mr-2" />
        Imprimir Detalhes
      </Button>
    </div>
  );
}
