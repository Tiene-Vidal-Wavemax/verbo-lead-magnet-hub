import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  onClick?: () => void;
}

export const WhatsAppButton = ({ onClick }: WhatsAppButtonProps) => {
  const handleClick = () => {
    const phone = "5566996001077";
    const message = "Olá! Gostaria de saber mais sobre a aula experimental da Verbo Schools.";
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    // Track WhatsApp click
    if (onClick) onClick();
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      variant="whatsapp"
      size="lg"
      className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-2xl hover:scale-110 transition-all duration-300 z-50 md:h-auto md:w-auto md:rounded-lg md:px-6"
    >
      <MessageCircle className="h-6 w-6 md:mr-2" />
      <span className="hidden md:inline">Falar no WhatsApp</span>
    </Button>
  );
};