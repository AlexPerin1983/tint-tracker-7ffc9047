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

  // Inicializa o Facebook Pixel apenas quando o componente é montado
  useEffect(() => {
    // Verifica se o pixel já foi inicializado
    if (!window.fbq) {
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', '1621095305954112');
      console.log('Facebook Pixel inicializado');
    }
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
          
          console.log('Purchase event tracked');
          toast({
            title: "Compra Registrada",
            description: "O evento de compra foi registrado com sucesso!",
          });
        } 
        // Registra PageView APENAS se for exatamente a página /landing sem parâmetros
        else if (isExactlyLandingPage) {
          window.fbq('track', 'PageView');
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

  // Função para rastrear cliques nos botões
  const trackButtonClick = (buttonLocation: string) => {
    if (window.fbq) {
      window.fbq('trackCustom', 'ButtonClick', {
        location: buttonLocation,
        page: 'landing'
      });
      console.log(`Button click tracked: ${buttonLocation}`);
    }
  };

  // Adiciona os event listeners quando o componente é montado
  useEffect(() => {
    const topButton = document.querySelector('[data-fb-track="top-button"]');
    const bottomButton = document.querySelector('[data-fb-track="bottom-button"]');

    const handleTopButtonClick = () => trackButtonClick('top');
    const handleBottomButtonClick = () => trackButtonClick('bottom');

    topButton?.addEventListener('click', handleTopButtonClick);
    bottomButton?.addEventListener('click', handleBottomButtonClick);

    // Cleanup
    return () => {
      topButton?.removeEventListener('click', handleTopButtonClick);
      bottomButton?.removeEventListener('click', handleBottomButtonClick);
    };
  }, []);

  return null;
}