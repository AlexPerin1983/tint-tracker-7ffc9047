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
        window.fbq('track', 'PageView');
      }
    } catch (error) {
      console.error('Erro ao rastrear visualização de página:', error);
      toast({
        title: "Erro de Rastreamento",
        description: "Não foi possível registrar a visualização da página",
        variant: "destructive",
      });
    }
  }, [location, toast]);

  return null;
}