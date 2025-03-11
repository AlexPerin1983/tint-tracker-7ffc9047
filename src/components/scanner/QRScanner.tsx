
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { QrCode } from "lucide-react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QRScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRScanner({ open, onOpenChange }: QRScannerProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannerInitialized = useRef(false);

  useEffect(() => {
    // Limpeza do scanner anterior
    const cleanupScanner = () => {
      if (scannerRef.current) {
        try {
          scannerRef.current.clear().catch(err => {
            console.error("Erro ao limpar scanner:", err);
          });
          scannerRef.current = null;
          scannerInitialized.current = false;
        } catch (error) {
          console.error("Erro ao desmontar scanner:", error);
        }
      }
    };

    // Só inicializa quando o modal estiver aberto
    if (open) {
      // Pequeno timeout para garantir que o DOM está pronto
      const timer = setTimeout(() => {
        if (!scannerInitialized.current) {
          try {
            const qrElement = document.getElementById("qr-reader");
            if (!qrElement) {
              console.error("Elemento qr-reader não encontrado!");
              setError("Erro ao inicializar a câmera");
              return;
            }

            scannerRef.current = new Html5QrcodeScanner(
              "qr-reader",
              { 
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1,
              },
              false
            );

            scannerRef.current.render((qrCodeMessage) => {
              // Processar o QR code lido
              try {
                const cleanValue = qrCodeMessage.trim();
                console.log("QR Code lido:", cleanValue);

                if (cleanValue.includes('tint-tracker:')) {
                  const parts = cleanValue.split(':');
                  if (parts.length === 3) {
                    const [_prefix, type, id] = parts;
                    if (type === 'item') {
                      cleanupScanner();
                      onOpenChange(false);
                      navigate(`/item/${id}`);
                    } else if (type === 'scrap') {
                      cleanupScanner();
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
                  }
                } else if (cleanValue.includes('BOB')) {
                  cleanupScanner();
                  onOpenChange(false);
                  navigate(`/item/${cleanValue}`);
                } else if (cleanValue.includes('RET')) {
                  cleanupScanner();
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
            }, (error) => {
              console.error("Erro no scanner:", error);
            });

            scannerInitialized.current = true;
          } catch (error) {
            console.error("Erro ao inicializar scanner:", error);
            setError('Erro ao inicializar a câmera');
            toast({
              variant: "destructive",
              title: "Erro na Câmera",
              description: "Não foi possível inicializar a câmera. Verifique as permissões.",
            });
          }
        }
      }, 300); // Pequeno atraso para garantir que o DOM está pronto

      return () => {
        clearTimeout(timer);
      };
    } else {
      cleanupScanner();
    }

    return () => {
      cleanupScanner();
    };
  }, [open, navigate, onOpenChange, toast]);

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) {
        // Limpar scanner antes de fechar
        if (scannerRef.current) {
          scannerRef.current.clear().catch(console.error);
          scannerRef.current = null;
          scannerInitialized.current = false;
        }
      }
      onOpenChange(newOpen);
    }}>
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
          
          <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-lg">
            <div id="qr-reader" className="w-full h-full" />
          </div>
          
          <p className="text-sm text-muted-foreground text-center px-6">
            Posicione o QR Code dentro da área marcada
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
