
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { QrCode } from "lucide-react";

interface QRScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRScanner({ open, onOpenChange }: QRScannerProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    console.error("Erro na câmera:", err);
    setError('Camera error');
    toast({
      variant: "destructive",
      title: "Camera Error",
      description: "Unable to access camera. Please check permissions.",
    });
  };

  const handleScan = (result: any) => {
    console.log("Tentando ler QR Code...");
    
    if (result?.text) {
      const scannedId = result.text;
      console.log("QR Code lido:", scannedId);

      if (scannedId.includes('BOB')) {
        onOpenChange(false);
        navigate(`/item/${scannedId}`);
      } else if (scannedId.includes('RET')) {
        onOpenChange(false);
        navigate(`/scrap/${scannedId}`);
      } else {
        console.log("QR Code inválido:", scannedId);
        setError('Invalid QR Code');
        toast({
          variant: "destructive",
          title: "Invalid QR Code",
          description: "This QR code is not valid for this system.",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-xl">
            <QrCode className="h-6 w-6 text-primary" />
            QR Code Scanner
          </DialogTitle>
        </DialogHeader>
        
        <div className="w-full space-y-4">
          {error && (
            <div className="text-center p-2 bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          )}
          
          <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-lg">
            <QrReader
              onResult={handleScan}
              onError={handleError}
              constraints={{
                facingMode: "environment"
              }}
              className="w-full h-full"
              scanDelay={300}
              ViewFinder={() => (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-white/50" />
                </div>
              )}
            />
          </div>
          
          <p className="text-sm text-muted-foreground text-center px-6">
            Posicione o QR Code dentro da área marcada
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
