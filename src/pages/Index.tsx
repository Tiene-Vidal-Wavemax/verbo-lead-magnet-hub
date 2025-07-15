import { HeroSection } from "@/components/HeroSection";
import { CoursesSection } from "@/components/CoursesSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { FormSection } from "@/components/FormSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { analytics, trackFormSubmission, trackWhatsAppClick } = useAnalytics();
  const { toast } = useToast();

  const handleLeadSubmit = async (data: any) => {
    try {
      // Here you would normally send to Supabase
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Track the submission
      trackFormSubmission();
      
      // Save to localStorage as backup (replace with Supabase integration)
      const leads = JSON.parse(localStorage.getItem('verbo_leads') || '[]');
      const newLead = {
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      leads.push(newLead);
      localStorage.setItem('verbo_leads', JSON.stringify(leads));
      
      console.log('Lead captured:', newLead);
      console.log('Analytics:', analytics);
      
    } catch (error) {
      console.error('Error submitting lead:', error);
      throw error;
    }
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
    toast({
      title: "Redirecionando para WhatsApp",
      description: "Você será direcionado para o WhatsApp da Verbo Schools",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hidden analytics display for debugging */}
      <div className="hidden">
        <p>Page Views: {analytics.pageViews}</p>
        <p>Form Submissions: {analytics.formSubmissions}</p>
        <p>WhatsApp Clicks: {analytics.whatsappClicks}</p>
        <p>Conversion Rate: {analytics.conversionRate.toFixed(2)}%</p>
      </div>

      <HeroSection />
      <CoursesSection />
      <BenefitsSection />
      <FormSection onLeadSubmit={handleLeadSubmit} />
      <TestimonialsSection />
      <WhatsAppButton onClick={handleWhatsAppClick} />
      
      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-2xl font-bold mb-2">Verbo Schools</h3>
            <p className="text-white/80">Transformando vidas através do inglês</p>
          </div>
          
          <div className="border-t border-white/20 pt-4">
            <p className="text-white/60 text-sm">
              © 2024 Verbo Schools. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
