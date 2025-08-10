import { useEffect } from 'react';
import { MetaPixel, useMetaPixel } from './MetaPixel';
import { GoogleAnalytics, useGoogleAnalytics } from './GoogleAnalytics';

// Configurações de tracking - busca dos IDs salvos no localStorage
const getTrackingConfig = () => ({
  metaPixelId: localStorage.getItem('verbo_meta_pixel_id') || '',
  googleAnalyticsId: localStorage.getItem('verbo_google_analytics_id') || '',
  googleAdsConversionId: localStorage.getItem('verbo_google_ads_conversion_id') || '',
});

interface ConversionTrackingProps {
  metaPixelId?: string;
  googleAnalyticsId?: string;
  googleAdsConversionId?: string;
}

export const ConversionTracking = ({ 
  metaPixelId,
  googleAnalyticsId,
  googleAdsConversionId 
}: ConversionTrackingProps) => {
  const config = getTrackingConfig();
  const finalMetaPixelId = metaPixelId || config.metaPixelId;
  const finalGoogleAnalyticsId = googleAnalyticsId || config.googleAnalyticsId;
  const finalGoogleAdsConversionId = googleAdsConversionId || config.googleAdsConversionId;
  return (
    <>
      {finalMetaPixelId && <MetaPixel pixelId={finalMetaPixelId} />}
      {finalGoogleAnalyticsId && <GoogleAnalytics measurementId={finalGoogleAnalyticsId} />}
    </>
  );
};

// Hook principal para tracking de conversões
export const useConversionTracking = () => {
  const metaPixel = useMetaPixel();
  const googleAnalytics = useGoogleAnalytics();

  const trackFormSubmission = (formData: any) => {
    // Meta Pixel
    metaPixel.trackLead();
    metaPixel.trackCustomEvent('FormSubmission', {
      content_name: 'Lead Form',
      content_category: 'Education',
      custom_data: {
        form_type: 'lead_generation',
        school: 'Verbo Schools'
      }
    });

    // Google Analytics
    googleAnalytics.trackFormSubmission('lead_form');
    googleAnalytics.trackEvent('generate_lead', 'conversion', 'verbo_schools_lead');

    // Google Ads Conversion
    const config = getTrackingConfig();
    if (config.googleAdsConversionId) {
      googleAnalytics.trackConversion(config.googleAdsConversionId);
    }

    console.log('🎯 Conversão rastreada:', formData);
  };

  const trackWhatsAppClick = () => {
    // Meta Pixel
    metaPixel.trackContact();
    metaPixel.trackCustomEvent('WhatsAppClick', {
      content_name: 'WhatsApp Contact',
      content_category: 'Communication'
    });

    // Google Analytics
    googleAnalytics.trackWhatsAppClick();

    console.log('📱 WhatsApp click rastreado');
  };

  const trackPhoneClick = () => {
    // Meta Pixel
    metaPixel.trackContact();
    metaPixel.trackCustomEvent('PhoneClick', {
      content_name: 'Phone Contact',
      content_category: 'Communication'
    });

    // Google Analytics
    googleAnalytics.trackPhoneClick();

    console.log('📞 Phone click rastreado');
  };

  const trackCourseInterest = (courseName: string) => {
    // Meta Pixel
    metaPixel.trackCustomEvent('CourseInterest', {
      content_name: courseName,
      content_category: 'Education'
    });

    // Google Analytics
    googleAnalytics.trackCourseInterest(courseName);

    console.log('📚 Interesse em curso rastreado:', courseName);
  };

  const trackPageView = () => {
    metaPixel.trackPageView();
    console.log('👁️ Page view rastreada');
  };

  return {
    trackFormSubmission,
    trackWhatsAppClick,
    trackPhoneClick,
    trackCourseInterest,
    trackPageView,
  };
};