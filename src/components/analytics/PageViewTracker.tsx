import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

declare global {
  interface Window {
    fbq?: Function;
  }
}

export const PageViewTracker = () => {
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Função para inicializar o Facebook Pixel
    const initFacebookPixel = () => {
      if (typeof window.fbq === 'undefined') {
        // Adiciona o código do Facebook Pixel
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
      }
    };

    // Inicializa o pixel
    try {
      initFacebookPixel();
      
      // Aqui você deve substituir 'YOUR-PIXEL-ID' pelo seu ID do Facebook Pixel
      if (window.fbq) {
        window.fbq('init', 'YOUR-PIXEL-ID');
        window.fbq('track', 'PageView');
        
        console.log('Facebook Pixel: PageView tracked');
      }
    } catch (error) {
      console.error('Error initializing Facebook Pixel:', error);
      toast({
        title: "Analytics Error",
        description: "Failed to initialize tracking. This won't affect the app functionality.",
        variant: "destructive",
      });
    }
  }, [location.pathname]); // Rastreia mudanças na rota

  return null;
};