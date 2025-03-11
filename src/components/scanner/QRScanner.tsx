
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { QrCode, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRScanner({ open, onOpenChange }: QRScannerProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Função para iniciar a câmera quando o diálogo é aberto
  const startCamera = async () => {
    setError(null);
    setScanning(true);
    
    if (!videoRef.current) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "environment",
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 640, ideal: 1280, max: 1920 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        scanQRCode();
      }
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
      setError("Erro ao acessar a câmera. Verifique as permissões.");
      toast({
        variant: "destructive",
        title: "Erro na câmera",
        description: "Não foi possível acessar a câmera. Verifique as permissões.",
      });
      setScanning(false);
    }
  };

  // Função para limpar recursos da câmera quando o diálogo é fechado
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setScanning(false);
  };

  // Função para processar o QR code lido
  const processQRCode = (scannedValue: string) => {
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
            stopCamera();
            onOpenChange(false);
            navigate(`/item/${id}`);
          } else if (type === 'scrap') {
            console.log("Navegando para scrap:", id);
            stopCamera();
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
        stopCamera();
        onOpenChange(false);
        navigate(`/item/${cleanValue}`);
      } else if (cleanValue.includes('RET')) {
        // Formato antigo para retalhos
        console.log("Navegando para scrap (formato antigo):", cleanValue);
        stopCamera();
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

  // Função para escanear o QR code da imagem de vídeo
  const scanQRCode = async () => {
    if (!scanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas || video.paused || video.ended) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    
    // Ajusta o tamanho do canvas para corresponder ao vídeo
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Desenha o frame do vídeo no canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    try {
      // Use a biblioteca jsQR (se estiver disponível)
      if (window.jsQR) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = window.jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        
        if (code) {
          console.log("QR Code encontrado:", code.data);
          processQRCode(code.data);
          return;
        }
      }
    } catch (e) {
      console.error("Erro ao escanear QR Code:", e);
    }
    
    // Continua escaneando a cada 500ms
    setTimeout(scanQRCode, 500);
  };

  // Iniciar câmera quando o diálogo for aberto
  if (open) {
    // Carrega a biblioteca jsQR se ainda não estiver carregada
    if (!window.jsQR) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
      script.async = true;
      script.onload = startCamera;
      document.body.appendChild(script);
    } else {
      startCamera();
    }
  }

  // Limpar câmera quando o diálogo for fechado
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      stopCamera();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
            <video 
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              muted
            />
            <canvas 
              ref={canvasRef} 
              className="absolute opacity-0 pointer-events-none"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-white animate-pulse opacity-75" />
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground text-center px-6">
            Posicione o QR Code dentro da área marcada
          </p>

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => {
                scanning ? stopCamera() : startCamera();
                setScanning(!scanning);
              }}
            >
              <Camera className="w-4 h-4 mr-2" />
              {scanning ? "Pausar Scanner" : "Iniciar Scanner"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Adicione uma declaração global para a biblioteca jsQR
declare global {
  interface Window {
    jsQR: (
      data: Uint8ClampedArray,
      width: number,
      height: number,
      options?: { inversionAttempts: string }
    ) => { data: string } | null;
  }
}
