
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Camera } from "lucide-react";
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
  const qrBoxSize = 250;

  // Função para limpar o scanner
  const cleanupScanner = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop()
        .then(() => {
          console.log("Scanner parado com sucesso");
          if (scannerRef.current) {
            scannerRef.current.clear();
            scannerRef.current = null;
          }
          setCameraInitialized(false);
        })
        .catch(err => {
          console.error("Erro ao parar scanner:", err);
        });
    }
  };

  // Função para inicializar o scanner
  const initScanner = async () => {
    setIsStarting(true);
    setError(null);
    
    try {
      // Limpa qualquer instância anterior
      if (scannerRef.current) {
        await cleanupScanner();
      }
      
      // Cria uma nova instância do scanner
      const htmlScanner = new Html5Qrcode("qr-reader");
      scannerRef.current = htmlScanner;
      
      // Tenta obter as câmeras disponíveis
      const devices = await Html5Qrcode.getCameras();
      
      if (devices && devices.length > 0) {
        // Seleciona a câmera traseira, se disponível
        const rearCamera = devices.find(device => 
          device.label.toLowerCase().includes("back") || 
          device.label.toLowerCase().includes("traseira") ||
          device.label.toLowerCase().includes("rear")
        );
        
        const cameraId = rearCamera ? rearCamera.id : devices[0].id;
        console.log("Usando câmera:", cameraId);
        
        // Configurações da câmera
        const config = {
          fps: 10,
          qrbox: { width: qrBoxSize, height: qrBoxSize },
          aspectRatio: 1.0,
          formatsToSupport: [0, 1] // QR_CODE e AZTEC
        };
        
        // Inicia o scanner
        await htmlScanner.start(
          cameraId,
          config,
          (decodedText) => handleScanSuccess(decodedText),
          (errorMessage) => {
            // Ignora erros comuns durante o escaneamento
            if (
              typeof errorMessage === 'string' && 
              errorMessage.includes("No QR code found")
            ) {
              return;
            }
            console.log("QR Error:", errorMessage);
          }
        );
        
        console.log("Câmera inicializada com sucesso");
        setCameraInitialized(true);
        setIsStarting(false);
      } else {
        throw new Error("Nenhuma câmera encontrada");
      }
    } catch (err) {
      console.error("Erro ao inicializar câmera:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      setIsStarting(false);
      toast({
        variant: "destructive",
        title: "Erro na Câmera",
        description: "Verifique se você permitiu o acesso à câmera.",
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
      // Pequeno delay para garantir que o DOM esteja pronto
      const timer = setTimeout(() => {
        initScanner();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      cleanupScanner();
    }
  }, [open]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      cleanupScanner();
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) {
        cleanupScanner();
      }
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Scanner de QR Code</DialogTitle>
        <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-lg bg-black">
          <div id="qr-reader" className="w-full h-full"></div>
          
          {!cameraInitialized && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black">
              <Camera className="h-12 w-12 text-white mb-4" />
              <p className="text-white text-center">
                {isStarting ? "Aguarde, inicializando a câmera..." : "Preparando acesso à câmera..."}
              </p>
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
              )}
            </div>
          )}
          
          {cameraInitialized && (
            <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
              <div className="border-2 border-primary rounded-md" style={{ width: qrBoxSize, height: qrBoxSize }} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
