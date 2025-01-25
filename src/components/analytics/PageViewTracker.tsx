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
        const urlParams = new URLSearchParams(location.search);
        const success = urlParams.get('success');
        const isLandingPage = location.pathname === '/landing';
        const isHomePage = location.pathname === '/';
        
        if (success === 'true') {
          // Na página de sucesso, APENAS registra o evento de compra
          window.fbq('track', 'Purchase', {
            value: 49,
            currency: 'USD'
          });
          
          console.log('Purchase event tracked');
          toast({
            title: "Compra Registrada",
            description: "O evento de compra foi registrado com sucesso!",
          });
        } else if (isLandingPage) {
          // Na página de landing, registra apenas o PageView
          window.fbq('track', 'PageView');
          console.log('Landing PageView event tracked');
        }
        
        // Não registra nenhum evento para outras páginas
        if (!isLandingPage && !success && !isHomePage) {
          console.log('No events tracked for this page:', location.pathname);
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