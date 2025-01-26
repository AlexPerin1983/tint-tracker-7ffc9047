import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { sendConversionEvent } from "@/services/meta";

declare global {
  interface Window {
    fbq?: Function;
    _fbq?: any;
  }
}

export function PageViewTracker() {
  const location = useLocation();
  const { toast } = useToast();

  // Inicializa o Facebook Pixel apenas uma vez
  useEffect(() => {
    if (!window.fbq) {
      const f = window as any;
      const b = document;
      let e: any, n: any, t: any, s: any;
      
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement('script');
      t.async = true;
      t.src = 'https://connect.facebook.net/en_US/fbevents.js';
      s = b.getElementsByTagName('script')[0];
      s.parentNode?.insertBefore(t, s);
      
      window.fbq('init', '1621095305954112');

      // Desativa logs em desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        (window as any).fbq.disablePushState = true;
      }
    }

    // Obtém o IP do usuário apenas uma vez
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('client_ip', data.ip);
      })
      .catch(() => {});
  }, []);

  // Rastreia eventos de página e compra
  useEffect(() => {
    try {
      if (window.fbq) {
        const urlParams = new URLSearchParams(location.search);
        const success = urlParams.get('success');
        const isLandingPage = location.pathname === '/landing';
        
        if (success === 'true') {
          console.log('🎉 Evento de compra registrado');
          window.fbq('track', 'Purchase', {
            value: 49,
            currency: 'USD'
          });
          sendConversionEvent('Purchase', 49);
          toast({
            title: "Compra Registrada",
            description: "O evento de compra foi registrado com sucesso!",
          });
        } 
        else if (isLandingPage) {
          console.log('📝 Evento PageView registrado');
          window.fbq('track', 'PageView');
          sendConversionEvent('PageView');
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
  }, [location.pathname, location.search, toast]);

  return null;
}