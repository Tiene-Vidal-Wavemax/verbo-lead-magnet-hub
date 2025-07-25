
import { useState } from "react";
import { LeadForm } from "./LeadForm";
import { useToast } from "@/hooks/use-toast";

interface FormSectionProps {
  onLeadSubmit: (data: any) => void;
}

export const FormSection = ({ onLeadSubmit }: FormSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await onLeadSubmit(data);
      toast({
        title: "✅ Sucesso!",
        description: "Seus dados foram enviados. Entraremos em contato em breve!",
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-verbo-navy-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-verbo-turquoise rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-verbo-coral rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Comece sua jornada hoje!
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Preencha os dados abaixo e agende sua aula experimental gratuita
          </p>
        </div>

        <LeadForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </section>
  );
};
