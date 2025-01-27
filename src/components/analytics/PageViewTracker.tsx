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

  // Inicializa o Facebook Pixel apenas uma vez e de forma assíncrona
  useEffect(() => {
    if (!window.fbq) {
      const loadFacebookPixel = () => {
        const f = window as any;
        const b = document;
        let e: any, n: any;
        
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        
        e = b.createElement('script');
        e.async = true;
        e.defer = true;
        e.src = 'https://connect.facebook.net/en_US/fbevents.js';
        
        const s = b.getElementsByTagName('script')[0];
        s.parentNode?.insertBefore(e, s);
        
        window.fbq('init', '1621095305954112');

        // Desativa logs em desenvolvimento
        if (process.env.NODE_ENV === 'development') {
          (window as any).fbq.disablePushState = true;
          console.log('🔧 Facebook Pixel inicializado em modo desenvolvimento');
        }
      };

      // Carrega o script com um pequeno delay para priorizar o carregamento da página
      setTimeout(loadFacebookPixel, 1000);
    }

    // Obtém o IP do usuário apenas uma vez e armazena em cache
    const cachedIp = localStorage.getItem('client_ip');
    if (!cachedIp) {
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('client_ip', data.ip);
        })
        .catch(() => {});
    }
  }, []);

  // Rastreia eventos de página e compra
  useEffect(() => {
    const handlePageView = () => {
      try {
        if (window.fbq) {
          const urlParams = new URLSearchParams(location.search);
          const success = urlParams.get('success');
          const isLandingPage = location.pathname === '/landing';
          
          // Registra PageView apenas na página de landing
          if (isLandingPage) {
            console.log('Tentando registrar PageView na landing page');
            window.fbq('track', 'PageView');
            sendConversionEvent('PageView');
            
            if (process.env.NODE_ENV === 'development') {
              console.log('📝 Evento PageView registrado na página de landing');
            }
          }

          // Registra evento de compra apenas quando success=true
          if (success === 'true') {
            if (process.env.NODE_ENV === 'development') {
              console.log('🎉 Evento de compra registrado (desenvolvimento)');
            }
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
        }
      } catch (error) {
        console.error('Erro ao rastrear evento:', error);
        toast({
          title: "Erro de Rastreamento",
          description: "Não foi possível registrar o evento",
          variant: "destructive",
        });
      }
    };

    // Executa o handlePageView quando a rota muda
    handlePageView();
  }, [location.pathname, location.search, toast]);

  return null;
}