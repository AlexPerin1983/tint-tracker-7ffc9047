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
    if (result) {
      try {
        const url = new URL(result?.text);
        const path = url.pathname;
        
        if (path.startsWith('/item/') || path.startsWith('/scrap/')) {
          onOpenChange(false);
          navigate(path);
        } else {
          setError('QR Code inválido');
          toast({
            variant: "destructive",
            title: "Erro ao ler QR Code",
            description: "Este QR Code não corresponde a nenhum item do sistema.",
          });
        }
      } catch (err) {
        setError('QR Code inválido');
        toast({
          variant: "destructive",
          title: "Erro ao ler QR Code",
          description: "Não foi possível ler o QR Code. Tente novamente.",
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
            Leitor de QR Code
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
              constraints={{ facingMode: "environment" }}
              onResult={handleScan}
              className="w-full h-full"
              videoStyle={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div className="absolute inset-0 border-[3rem] sm:border-[4rem] border-black/50">
              <div className="absolute inset-0 border-2 border-white/50"></div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground text-center px-6">
            Posicione o QR Code dentro da área demarcada para escaneá-lo automaticamente
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}