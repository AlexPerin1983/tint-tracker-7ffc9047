
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

  const handleScan = (result: any) => {
    console.log("QR Code resultado:", result); // Debug log
    
    if (result) {
      try {
        const scannedId = result?.text;
        console.log("ID escaneado:", scannedId); // Debug log
        
        if (!scannedId) {
          console.log("ID não encontrado"); // Debug log
          return;
        }

        // Verifica se o ID começa com BOB ou RET para determinar o tipo
        if (scannedId.includes('BOB')) {
          console.log("Navegando para bobina:", scannedId); // Debug log
          onOpenChange(false);
          navigate(`/item/${scannedId}`);
        } else if (scannedId.includes('RET')) {
          console.log("Navegando para retalho:", scannedId); // Debug log
          onOpenChange(false);
          navigate(`/scrap/${scannedId}`);
        } else {
          console.log("QR Code inválido:", scannedId); // Debug log
          setError('Invalid QR Code');
          toast({
            variant: "destructive",
            title: "QR Code Error",
            description: "This QR code doesn't match any item in the system.",
          });
        }
      } catch (err) {
        console.error("Erro ao processar QR Code:", err); // Debug log
        setError('Invalid QR Code');
        toast({
          variant: "destructive",
          title: "QR Code Error",
          description: "Unable to read QR code. Please try again.",
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
          {error ? (
            <div className="text-center p-2 bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          ) : null}
          
          <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-lg border-2 border-primary/20">
            <QrReader
              constraints={{ 
                facingMode: "environment",
                aspectRatio: 1,
                width: { ideal: 1280 },
                height: { ideal: 720 }
              }}
              onResult={handleScan}
              className="w-full h-full"
              videoStyle={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              scanDelay={500}
              ViewFinder={() => (
                <div className="absolute inset-0 border-[3rem] sm:border-[4rem] border-black/50">
                  <div className="absolute inset-0 border-2 border-white/50"></div>
                </div>
              )}
            />
          </div>
          
          <p className="text-sm text-muted-foreground text-center px-6">
            Position the inventory QR code within the marked area for automatic scanning
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
