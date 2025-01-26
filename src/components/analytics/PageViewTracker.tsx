import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { sendConversionEvent } from "@/services/meta";
import { useDebounce } from "@/hooks/use-debounce";

declare global {
  interface Window {
    fbq?: Function;
    _fbq?: any;
  }
}

export function PageViewTracker() {
  const location = useLocation();
  const { toast } = useToast();
  
  // Objeto para rastrear seções já visualizadas
  const viewedSections = new Set();
  
  // Debounce para evitar múltiplos disparos do mesmo evento
  const debouncedTrackViewContent = useDebounce((section: string) => {
    if (!viewedSections.has(section) && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: section,
        content_type: 'product_section'
      });
      sendConversionEvent('ViewContent');
      viewedSections.add(section);
    }
  }, 1000);

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
    }

    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('client_ip', data.ip);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    try {
      if (window.fbq) {
        const urlParams = new URLSearchParams(location.search);
        const success = urlParams.get('success');
        const isExactlyLandingPage = location.pathname === '/landing' && !location.search;
        
        if (success === 'true') {
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
        else if (isExactlyLandingPage) {
          window.fbq('track', 'PageView');
          sendConversionEvent('PageView');
          
          // Observar seções importantes com debounce
          const handleViewContent = (section: string) => {
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  debouncedTrackViewContent(section);
                }
              });
            }, { threshold: 0.5 });

            const element = document.getElementById(section);
            if (element) observer.observe(element);

            return () => observer.disconnect();
          };

          handleViewContent('benefits');
          handleViewContent('testimonials');
          handleViewContent('faq');
        }
      }
    } catch (error) {
      toast({
        title: "Erro de Rastreamento",
        description: "Não foi possível registrar o evento",
        variant: "destructive",
      });
    }
  }, [location, toast, debouncedTrackViewContent]);

  return null;
}