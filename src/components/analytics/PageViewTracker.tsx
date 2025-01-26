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

  // Inicializa o Facebook Pixel apenas quando o componente é montado
  useEffect(() => {
    // Verifica se o pixel já foi inicializado
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
      console.log('Facebook Pixel inicializado');
    }

    // Obtém o IP do cliente (apenas para demonstração)
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('client_ip', data.ip);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    try {
      if (window.fbq) {
        const urlParams = new URLSearchParams(location.search);
        const success = urlParams.get('success');
        
        // Verifica se é exatamente a página /landing
        const isExactlyLandingPage = location.pathname === '/landing' && !location.search;
        
        // Registra apenas o evento de compra na página de sucesso
        if (success === 'true') {
          window.fbq('track', 'Purchase', {
            value: 49,
            currency: 'USD'
          });
          
          // Envia o evento também pela API de Conversões
          sendConversionEvent('Purchase', 49);
          
          console.log('Purchase event tracked');
          toast({
            title: "Compra Registrada",
            description: "O evento de compra foi registrado com sucesso!",
          });
        } 
        // Registra PageView APENAS se for exatamente a página /landing sem parâmetros
        else if (isExactlyLandingPage) {
          window.fbq('track', 'PageView');
          sendConversionEvent('PageView');
          console.log('Landing PageView event tracked - Exact match for /landing');
        } 
        // Log para outras páginas (ajuda no debug)
        else {
          console.log('Página atual não registra eventos:', {
            pathname: location.pathname,
            search: location.search,
            isExactlyLandingPage
          });
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