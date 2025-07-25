
import { HeroSection } from "@/components/HeroSection";
import { CoursesSection } from "@/components/CoursesSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { FormSection } from "@/components/FormSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { analytics, trackFormSubmission, trackWhatsAppClick } = useAnalytics();
  const { toast } = useToast();

  const handleLeadSubmit = async (data: any) => {
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          nome: data.name,
          telefone: data.phone,
          como_soube: data.source
        }]);

      if (error) throw error;
      
      trackFormSubmission();
      
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
      
      {/* Link para admin - temporário para testes */}
      <div className="fixed top-4 right-20 z-50">
        <a 
          href="/administrador"
          className="bg-gray-900 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
        >
          Admin
        </a>
      </div>
      
      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Logo */}
            <div className="flex justify-center md:justify-start">
              <img 
                src="/lovable-uploads/ef8f14e0-0c7a-429f-bc25-39a454a0aac7.png" 
                alt="Verbo Schools Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
            
            {/* Centro - Informações principais */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2" translate="no" lang="en">Verbo Schools</h3>
              <p className="text-white/80 mb-4">Transformando vidas através do inglês</p>
              
              {/* Contato */}
              <div className="space-y-2">
                <p className="text-white/90">
                  📞 (66) 99600-1077
                </p>
                <p className="text-white/90">
                  📱 <a 
                    href="https://www.instagram.com/verboschools.altafloresta/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-verbo-coral transition-colors"
                    translate="no"
                    lang="en"
                  >
                    verboschools.altafloresta
                  </a>
                </p>
              </div>
            </div>
            
            {/* Direita - Logo fixa no canto esquerdo */}
            <div className="hidden md:block">
              <img 
                src="/lovable-uploads/ef8f14e0-0c7a-429f-bc25-39a454a0aac7.png" 
                alt="Verbo Schools Logo" 
                className="h-12 w-auto object-contain opacity-30 fixed bottom-6 left-6 z-40"
              />
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-4 mt-6 text-center">
            <p className="text-white/60 text-sm">
              © 2024 <span translate="no" lang="en">Verbo Schools</span>. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
