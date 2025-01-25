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
        } else if (location.pathname === '/landing') {
          // Na página de landing, registra apenas o PageView
          window.fbq('track', 'PageView');
          console.log('Landing PageView event tracked');
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