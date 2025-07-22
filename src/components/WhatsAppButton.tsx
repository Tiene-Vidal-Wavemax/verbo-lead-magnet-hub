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
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Pulse ring animation */}
      <div className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75"></div>
      
      {/* Main button with enhanced styling */}
      <Button
        onClick={handleClick}
        variant="whatsapp"
        size="lg"
        className="relative rounded-full h-20 w-20 shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce hover:animate-none group-hover:shadow-green-500/50 md:h-auto md:w-auto md:rounded-lg md:px-6 md:animate-none"
      >
        <MessageCircle className="h-8 w-8 md:mr-2 md:h-6 md:w-6" />
        <span className="hidden md:inline font-bold">💬 Falar no WhatsApp</span>
      </Button>
      
      {/* Tooltip for mobile */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-verbo-navy text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-semibold md:hidden">
        💬 Aula experimental grátis!
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-verbo-navy"></div>
      </div>
    </div>
  );
};