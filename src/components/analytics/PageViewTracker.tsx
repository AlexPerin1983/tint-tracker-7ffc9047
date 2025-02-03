import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    // Verifica se o pixel já foi inicializado
    if (typeof window.fbq === 'undefined') {
      const f: any = window;
      const b = document;
      const e = 'script';
      const v = 'https://connect.facebook.net/en_US/fbevents.js';
      let n: any;
      
      if(f.fbq) return; 
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      
      if(!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      
      const t = b.createElement(e);
      t.async = !0;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      if (s.parentNode) {
        s.parentNode.insertBefore(t, s);
      }
    }

    // Inicializa o pixel
    if (typeof window.fbq === 'function') {
      window.fbq('init', '1621095305954112');
      console.log('Facebook Pixel inicializado');
    }
  }, []);

  useEffect(() => {
    // Registra a visualização da página
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
      console.log('Página visualizada:', location.pathname);
    }
  }, [location]);

  return null;
}