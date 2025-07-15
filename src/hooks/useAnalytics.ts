import { useState, useEffect } from "react";

interface AnalyticsData {
  pageViews: number;
  formSubmissions: number;
  whatsappClicks: number;
  conversionRate: number;
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    pageViews: 0,
    formSubmissions: 0,
    whatsappClicks: 0,
    conversionRate: 0
  });

  useEffect(() => {
    // Track page view
    trackPageView();
  }, []);

  const trackPageView = () => {
    const currentViews = parseInt(localStorage.getItem('verbo_page_views') || '0');
    const newViews = currentViews + 1;
    localStorage.setItem('verbo_page_views', newViews.toString());
    
    setAnalytics(prev => ({
      ...prev,
      pageViews: newViews,
      conversionRate: prev.formSubmissions > 0 ? (prev.formSubmissions / newViews) * 100 : 0
    }));
  };

  const trackFormSubmission = () => {
    const currentSubmissions = parseInt(localStorage.getItem('verbo_form_submissions') || '0');
    const newSubmissions = currentSubmissions + 1;
    localStorage.setItem('verbo_form_submissions', newSubmissions.toString());
    
    setAnalytics(prev => {
      const newData = {
        ...prev,
        formSubmissions: newSubmissions,
        conversionRate: (newSubmissions / prev.pageViews) * 100
      };
      return newData;
    });
  };

  const trackWhatsAppClick = () => {
    const currentClicks = parseInt(localStorage.getItem('verbo_whatsapp_clicks') || '0');
    const newClicks = currentClicks + 1;
    localStorage.setItem('verbo_whatsapp_clicks', newClicks.toString());
    
    setAnalytics(prev => ({
      ...prev,
      whatsappClicks: newClicks
    }));
  };

  return {
    analytics,
    trackFormSubmission,
    trackWhatsAppClick
  };
};