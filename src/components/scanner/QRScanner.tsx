
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { QrCode, Camera } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";

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
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Função para limpar o scanner
  const cleanupScanner = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        scannerRef.current.stop().then(() => {
          scannerRef.current = null;
          setCameraInitialized(false);
        }).catch(error => {
          console.error("Erro ao parar scanner:", error);
        });
      } catch (error) {
        console.error("Erro ao desmontar scanner:", error);
      }
    }
  };

  // Função para inicializar o scanner
  const initScanner = async () => {
    if (!containerRef.current || scannerRef.current) return;
    
    setIsStarting(true);
    setError(null);
    
    try {
      // Cria uma nova instância do scanner
      scannerRef.current = new Html5Qrcode("qr-reader");
      
      // Configurações da câmera
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
        formatsToSupport: [0, 1] // QR_CODE e AZTEC
      };
      
      // Recupera câmeras disponíveis
      const devices = await Html5Qrcode.getCameras();
      
      if (devices && devices.length > 0) {
        // Seleciona a câmera traseira, se disponível
        const rearCamera = devices.find(device => 
          device.label.toLowerCase().includes("back") || 
          device.label.toLowerCase().includes("traseira") ||
          device.label.toLowerCase().includes("rear")
        );
        
        const cameraId = rearCamera ? rearCamera.id : devices[0].id;
        
        // Inicia o scanner
        scannerRef.current.start(
          cameraId,
          config,
          (qrCodeMessage) => {
            handleScanSuccess(qrCodeMessage);
          },
          (errorMessage) => {
            // Ignora erros de leitura, que são normais durante o escaneamento
            if (errorMessage.includes("No QR code found")) {
              return;
            }
            console.log("Erro ao ler QR code:", errorMessage);
          }
        ).then(() => {
          setCameraInitialized(true);
          setIsStarting(false);
        }).catch((err) => {
          console.error("Erro ao iniciar câmera:", err);
          setError('Erro ao inicializar a câmera');
          setIsStarting(false);
          toast({
            variant: "destructive",
            title: "Erro na Câmera",
            description: "Não foi possível inicializar a câmera. Verifique as permissões.",
          });
        });
      } else {
        setError('Nenhuma câmera encontrada');
        setIsStarting(false);
        toast({
          variant: "destructive",
          title: "Câmera não encontrada",
          description: "Nenhuma câmera foi detectada no seu dispositivo.",
        });
      }
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
        <DialogTitle className="sr-only">Scanner de QR Code</DialogTitle>
        <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-lg bg-black">
          <div id="qr-reader" className="w-full h-full"></div>
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
      </DialogContent>
    </Dialog>
  );
}
