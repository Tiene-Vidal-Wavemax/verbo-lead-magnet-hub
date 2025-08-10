import { useEffect } from 'react';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

interface MetaPixelProps {
  pixelId: string;
}

export const MetaPixel = ({ pixelId }: MetaPixelProps) => {
  useEffect(() => {
    if (!pixelId) return;

    // Initialize Meta Pixel
    const initPixel = () => {
      if (window.fbq) return;

      // fbq function
      const fbq: any = function(...args: any[]) {
        if (fbq.callMethod) {
          fbq.callMethod.apply(fbq, args);
        } else {
          fbq.queue.push(args);
        }
      };

      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];
      window.fbq = fbq;

      // Load the pixel script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);

      // Initialize pixel
      fbq('init', pixelId);
      fbq('track', 'PageView');
    };

    initPixel();
  }, [pixelId]);

  return null;
};

// Hook para usar o Meta Pixel
export const useMetaPixel = () => {
  const trackEvent = (eventName: string, parameters?: any) => {
    if (window.fbq) {
      window.fbq('track', eventName, parameters);
    }
  };

  const trackCustomEvent = (eventName: string, parameters?: any) => {
    if (window.fbq) {
      window.fbq('trackCustom', eventName, parameters);
    }
  };

  return {
    trackEvent,
    trackCustomEvent,
    // Eventos padrão do Meta Pixel
    trackPageView: () => trackEvent('PageView'),
    trackLead: (value?: number) => trackEvent('Lead', { value }),
    trackContact: () => trackEvent('Contact'),
    trackCompleteRegistration: () => trackEvent('CompleteRegistration'),
    trackSubmitApplication: () => trackEvent('SubmitApplication'),
    trackSchedule: () => trackEvent('Schedule'),
  };
};