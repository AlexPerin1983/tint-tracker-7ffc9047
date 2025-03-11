
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { QrCode, Camera, ScanLine, ImagePlus } from "lucide-react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@/components/ui/button";

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
  const scannerAttempts = useRef(0);

  // Função para limpar o scanner
  const cleanupScanner = () => {
    if (scannerRef.current) {
      try {
        scannerRef.current.clear().catch(err => {
          console.error("Erro ao limpar scanner:", err);
        });
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
    scannerAttempts.current = 0;
    
    try {
      const qrElementId = "qr-reader";
      // Remove qualquer instância anterior
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
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: true,
          formatsToSupport: [0, 1], // QR_CODE e AZTEC
          rememberLastUsedCamera: true,
          // Configurações específicas para iniciar a câmera automaticamente
          showScanTypeSelector: false, // Oculta o seletor de tipo de escaneamento
          supportedScanTypes: [1], // 1 para "Escaneamento de Câmera"
        },
        true // Define como true para iniciar automaticamente
      );
      
      // Renderiza o scanner
      scannerRef.current.render(
        (qrCodeMessage) => {
          // Callback de sucesso
          handleScanSuccess(qrCodeMessage);
        }, 
        (errorMessage) => {
          // Callback de erro (não mostraremos erros de leitura)
          console.log("Erro ao ler QR code:", errorMessage);
        }
      );
      
      // Verifica se o scanner foi iniciado corretamente observando elementos do DOM
      const checkCameraInit = () => {
        const cameraElements = document.querySelectorAll('#qr-reader video, #qr-reader canvas');
        const permissionMessages = document.querySelectorAll('#qr-reader button');
        
        if (cameraElements.length > 0) {
          setCameraInitialized(true);
          scannerInitialized.current = true;
          setIsStarting(false);
          console.log("Câmera inicializada com sucesso!");
        } else if (permissionMessages.length > 0) {
          // Se houver botões de permissão, provavelmente precisamos clicar em um deles
          const startButton = Array.from(permissionMessages).find(button => 
            (button as HTMLElement).innerText.includes('Start Scanning') || 
            (button as HTMLElement).innerText.includes('Request Camera')
          );
          
          if (startButton) {
            console.log("Clicando no botão para iniciar a câmera...");
            (startButton as HTMLElement).click();
            // Verificar novamente após um tempo
            setTimeout(checkCameraInit, 1000);
          } else {
            retry();
          }
        } else {
          retry();
        }
      };
      
      const retry = () => {
        scannerAttempts.current += 1;
        if (scannerAttempts.current < 3) {
          console.log(`Tentativa ${scannerAttempts.current} de iniciar a câmera falhou. Tentando novamente...`);
          setTimeout(checkCameraInit, 1000);
        } else {
          setError("Não foi possível acessar a câmera. Verifique as permissões do navegador.");
          setIsStarting(false);
          console.error("Falha ao inicializar a câmera após múltiplas tentativas");
        }
      };
      
      // Primeira verificação após um tempo para garantir que o DOM foi atualizado
      setTimeout(checkCameraInit, 1000);
      
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

  // Inicializa o scanner imediatamente quando o modal é aberto
  useEffect(() => {
    if (open) {
      // Resetamos as tentativas quando o modal é aberto
      scannerAttempts.current = 0;
      
      // Pequeno timeout para garantir que o DOM está pronto
      const timer = setTimeout(() => {
        if (!scannerInitialized.current) {
          initScanner();
        }
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    } else {
      cleanupScanner();
    }

    return () => {
      cleanupScanner();
    };
  }, [open]);

  // Função para upload de imagem QR
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Implementação pendente para leitura de QR a partir de imagem
    // Esta funcionalidade poderá ser implementada posteriormente
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A leitura de QR Code a partir de imagens será implementada em breve.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) {
        // Limpar scanner antes de fechar
        cleanupScanner();
      }
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-xl">
            <QrCode className="h-6 w-6 text-primary" />
            Leitor QR Code
          </DialogTitle>
          <DialogDescription className="text-center">
            Posicione o QR Code dentro da área marcada para escaneamento
          </DialogDescription>
        </DialogHeader>
        
        <div className="w-full space-y-4">
          {error && (
            <div className="text-center p-2 bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          )}
          
          <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-lg bg-black">
            <div ref={containerRef} className="w-full h-full">
              {!cameraInitialized && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  {isStarting ? (
                    <>
                      <Camera className="h-12 w-12 text-white animate-pulse mb-4" />
                      <div className="text-center text-white">
                        Iniciando câmera...
                      </div>
                    </>
                  ) : (
                    <>
                      <Camera className="h-12 w-12 text-white mb-4" />
                      <Button 
                        onClick={initScanner}
                        className="mb-4"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Permitir acesso à câmera
                      </Button>
                      
                      <div className="text-xs text-white text-center">
                        ou
                      </div>
                      
                      <label htmlFor="qr-file-upload" className="cursor-pointer">
                        <div className="mt-4 flex items-center text-sm text-primary underline">
                          <ImagePlus className="mr-1 h-4 w-4" /> 
                          Escanear uma imagem
                        </div>
                        <input 
                          id="qr-file-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleFileUpload}
                        />
                      </label>
                    </>
                  )}
                </div>
              )}
              {cameraInitialized && (
                <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                  <div className="border-2 border-primary rounded-md w-64 h-64 flex items-center justify-center">
                    <ScanLine className="h-full w-full text-primary/70 animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground text-center px-6">
            Posicione o QR Code dentro da área marcada
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
