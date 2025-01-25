import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

declare global {
  interface Window {
    fbq?: Function;
    _fbq?: any;
  }
}

export function PageViewTracker() {
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    try {
      if (window.fbq) {
        // Sempre rastreia a visualização da página
        window.fbq('track', 'PageView');

        // Se estiver na página de sucesso após o pagamento, rastreia a compra
        if (location.pathname === '/') {
          const urlParams = new URLSearchParams(location.search);
          const success = urlParams.get('success');
          
          if (success === 'true') {
            window.fbq('track', 'Purchase', {
              value: 49,
              currency: 'USD'
            });
            
            console.log('Purchase event tracked');
          }
        }
      }
    } catch (error) {
      console.error('Erro ao rastrear evento:', error);
      toast({
        title: "Erro de Rastreamento",
        description: "Não foi possível registrar o evento",
        variant: "destructive",
      });
    }
  }, [location, toast]);

  return null;
}