import { Badge } from "@/components/ui/badge";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-verbo-tiffany via-verbo-tiffany/90 to-verbo-navy flex items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-verbo-coral rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-verbo-tiffany rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Logo da Verbo Schools */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/ef8f14e0-0c7a-429f-bc25-39a454a0aac7.png" 
            alt="Verbo Schools Logo" 
            className="mx-auto h-20 md:h-24 lg:h-28 w-auto object-contain"
          />
        </div>
        
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge de promoção */}
          <Badge 
            variant="secondary" 
            className="bg-verbo-coral text-white px-6 py-2 text-lg font-semibold animate-pulse"
          >
            🎧 PROMOÇÃO LIMITADA - FONE DE OUVIDO GRÁTIS
          </Badge>

          {/* Título principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Aprenda Inglês com a
            <span className="block text-verbo-coral">Verbo Schools</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Faça sua <strong className="text-verbo-tiffany">aula experimental gratuita</strong> e 
            ganhe um fone de ouvido ao se matricular
          </p>


          {/* CTA adicional */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
            <p className="text-white text-lg mb-2">
              ⏰ <strong>Oferta por tempo limitado!</strong>
            </p>
            <p className="text-white/90">
              Agende sua aula experimental gratuita agora e garante seu fone de ouvido na matrícula
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};