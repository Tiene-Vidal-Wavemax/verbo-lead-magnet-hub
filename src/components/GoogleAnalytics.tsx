import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: any;
    dataLayer: any;
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
}

export const GoogleAnalytics = ({ measurementId }: GoogleAnalyticsProps) => {
  useEffect(() => {
    if (!measurementId) return;

    // Initialize Google Analytics
    const initGA = () => {
      // Load gtag script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script1);

      // Initialize dataLayer and gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(...args: any[]) {
        window.dataLayer.push(args);
      };

      window.gtag('js', new Date());
      window.gtag('config', measurementId);
    };

    initGA();
  }, [measurementId]);

  return null;
};

// Hook para usar o Google Analytics
export const useGoogleAnalytics = () => {
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  const trackConversion = (conversionId: string, value?: number) => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: conversionId,
        value: value,
      });
    }
  };

  return {
    trackEvent,
    trackConversion,
    // Eventos específicos para escola de inglês
    trackFormSubmission: (formType: string) => trackEvent('form_submit', 'engagement', formType),
    trackWhatsAppClick: () => trackEvent('whatsapp_click', 'engagement', 'contact'),
    trackPhoneClick: () => trackEvent('phone_click', 'engagement', 'contact'),
    trackCourseInterest: (courseName: string) => trackEvent('course_interest', 'engagement', courseName),
  };
};