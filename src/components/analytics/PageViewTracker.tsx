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
        
        // Registra apenas o evento de compra na página de sucesso
        if (success === 'true') {
          window.fbq('track', 'Purchase', {
            value: 49,
            currency: 'USD'
          });
          
          console.log('Purchase event tracked');
          toast({
            title: "Compra Registrada",
            description: "O evento de compra foi registrado com sucesso!",
          });
        } 
        // Registra PageView APENAS se for exatamente a página /landing
        else if (isLandingPage) {
          window.fbq('track', 'PageView');
          console.log('Landing PageView event tracked');
        } 
        // Log para outras páginas (ajuda no debug)
        else {
          console.log('Página atual não registra eventos:', location.pathname);
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