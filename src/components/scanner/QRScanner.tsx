
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

  const handleResult = (result: any) => {
    if (result?.text) {
      const scannedValue = result.text;
      console.log("QR Code lido:", scannedValue);
      
      try {
        // Remove espaços em branco e quebras de linha
        const cleanValue = scannedValue.trim();
        console.log("Valor limpo:", cleanValue);

        // Processar ambos os formatos: antigo (apenas ID) e novo (prefixo:tipo:id)
        if (cleanValue.includes('tint-tracker:')) {
          // Novo formato: tint-tracker:tipo:id
          const parts = cleanValue.split(':');
          if (parts.length === 3) {
            const [_prefix, type, id] = parts;
            
            if (type === 'item') {
              console.log("Navegando para item:", id);
              onOpenChange(false);
              navigate(`/item/${id}`);
            } else if (type === 'scrap') {
              console.log("Navegando para scrap:", id);
              onOpenChange(false);
              navigate(`/scrap/${id}`);
            } else {
              setError('QR Code inválido');
              toast({
                variant: "destructive",
                title: "QR Code Inválido",
                description: "Formato de QR code não reconhecido.",
              });
            }
          } else {
            setError('QR Code inválido');
            toast({
              variant: "destructive",
              title: "QR Code Inválido",
              description: "Formato de QR code não reconhecido.",
            });
          }
        } else if (cleanValue.includes('BOB')) {
          // Formato antigo para bobinas
          console.log("Navegando para item (formato antigo):", cleanValue);
          onOpenChange(false);
          navigate(`/item/${cleanValue}`);
        } else if (cleanValue.includes('RET')) {
          // Formato antigo para retalhos
          console.log("Navegando para scrap (formato antigo):", cleanValue);
          onOpenChange(false);
          navigate(`/scrap/${cleanValue}`);
        } else {
          setError('QR Code inválido');
          toast({
            variant: "destructive",
            title: "QR Code Inválido",
            description: "Este QR code não é válido para o sistema.",
          });
        }
      } catch (error) {
        console.error("Erro ao processar QR Code:", error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Erro ao processar o QR Code.",
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
            Leitor QR Code
          </DialogTitle>
        </DialogHeader>
        
        <div className="w-full space-y-4">
          {error && (
            <div className="text-center p-2 bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          )}
          
          <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-lg bg-black">
            <QrReader
              onResult={handleResult}
              constraints={{
                facingMode: "environment",
                aspectRatio: 1,
                width: { min: 640, ideal: 1280, max: 1920 },
                height: { min: 640, ideal: 1280, max: 1920 }
              }}
              className="w-full h-full"
              scanDelay={500}
              ViewFinder={() => (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-white animate-pulse opacity-75" />
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
