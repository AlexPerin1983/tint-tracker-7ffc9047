import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface QRScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRScanner({ open, onOpenChange }: QRScannerProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const handleScan = (result: any, error: any) => {
    if (error) {
      console.error(error);
      setError('Erro ao acessar a câmera');
      toast({
        variant: "destructive",
        title: "Erro ao acessar a câmera",
        description: "Verifique se você permitiu o acesso à câmera.",
      });
      return;
    }

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
        <div className="w-full space-y-4">
          {error ? (
            <div className="text-center text-destructive">{error}</div>
          ) : null}
          
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={handleScan}
            className="w-full"
            videoStyle={{ width: '100%' }}
          />
          
          <p className="text-sm text-muted-foreground text-center">
            Posicione o QR Code no centro da tela para escaneá-lo
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}