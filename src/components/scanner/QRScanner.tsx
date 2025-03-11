
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { QrCode, Camera } from "lucide-react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QRScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRScanner({ open, onOpenChange }: QRScannerProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [cameraInitialized, setCameraInitialized] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannerInitialized = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Função para limpar o scanner
  const cleanupScanner = () => {
    if (scannerRef.current) {
      try {
        scannerRef.current.clear();
        scannerRef.current = null;
        scannerInitialized.current = false;
        setCameraInitialized(false);
      } catch (error) {
        console.error("Erro ao desmontar scanner:", error);
      }
    }
  };

  // Função para inicializar o scanner
  const initScanner = () => {
    if (!containerRef.current || scannerInitialized.current) return;
    
    setIsStarting(true);
    setError(null);
    
    try {
      const qrElementId = "qr-reader";
      const oldElement = document.getElementById(qrElementId);
      if (oldElement) {
        oldElement.remove();
      }
      
      // Cria o elemento para o scanner
      const qrElement = document.createElement("div");
      qrElement.id = qrElementId;
      qrElement.style.width = "100%";
      qrElement.style.height = "100%";
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(qrElement);
      
      // Configurações do scanner
      scannerRef.current = new Html5QrcodeScanner(
        qrElementId,
        { 
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
          formatsToSupport: [0, 1], // QR_CODE e AZTEC
          showTorchButtonIfSupported: false,
          showZoomSliderIfSupported: false,
        },
        false
      );
      
      // Renderiza o scanner
      scannerRef.current.render(
        (qrCodeMessage) => {
          handleScanSuccess(qrCodeMessage);
        }, 
        (errorMessage) => {
          console.log("Erro ao ler QR code:", errorMessage);
        }
      );

      // Inicia o scanner manualmente após renderizar
      scannerRef.current.start();
      
      scannerInitialized.current = true;
      setCameraInitialized(true);
      setIsStarting(false);
      
    } catch (error) {
      console.error("Erro ao inicializar scanner:", error);
      setError('Erro ao inicializar a câmera');
      setIsStarting(false);
      toast({
        variant: "destructive",
        title: "Erro na Câmera",
        description: "Não foi possível inicializar a câmera. Verifique as permissões.",
      });
    }
  };

  // Tratamento de QR code lido com sucesso
  const handleScanSuccess = (qrCodeMessage: string) => {
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
  };

  // Inicializa o scanner quando o modal é aberto
  useEffect(() => {
    if (open) {
      const timer = setTimeout(initScanner, 100);
      return () => clearTimeout(timer);
    } else {
      cleanupScanner();
    }
    return () => {
      cleanupScanner();
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) {
        cleanupScanner();
      }
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-md">
        <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-lg bg-black">
          <div ref={containerRef} className="w-full h-full">
            {!cameraInitialized && (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                {isStarting ? (
                  <>
                    <Camera className="h-12 w-12 text-white animate-pulse" />
                    <span className="ml-2 text-white">Iniciando câmera...</span>
                  </>
                ) : (
                  <div className="text-white text-center">
                    <Camera className="h-12 w-12 mx-auto mb-4" />
                    <p>Aguarde, inicializando a câmera...</p>
                  </div>
                )}
              </div>
            )}
            {cameraInitialized && (
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-primary rounded-md w-64 h-64" />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
