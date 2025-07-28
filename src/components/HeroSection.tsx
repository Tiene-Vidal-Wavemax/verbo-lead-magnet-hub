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
          {/* Título principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Aprenda Inglês com a
            <span className="block text-verbo-coral">Verbo Schools</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-verbo-navy max-w-3xl mx-auto leading-relaxed font-semibold">
            A <strong className="text-verbo-navy">única escola de inglês em Alta Floresta</strong> com 
            Sistema de Aquisição de Línguas que <strong className="text-verbo-navy">realmente funciona</strong>
          </p>

          {/* CTA com destaque melhorado - Oferta por tempo limitado */}
          <div 
            className="bg-gradient-to-r from-verbo-coral to-verbo-coral/80 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto border-2 border-white/30 cursor-pointer hover:scale-105 transition-all duration-300 shadow-2xl"
            onClick={() => window.open('https://wa.me/5566996001077?text=Saber%20mais%20aula%20experimental', '_blank')}
          >
            <p className="text-white text-2xl font-bold mb-4 flex items-center justify-center gap-3">
              🎧 <span>OFERTA POR TEMPO LIMITADO!</span> 🎧
            </p>
            <p className="text-white text-lg leading-relaxed">
              Agende sua aula experimental gratuita agora e <strong className="text-white">GANHE UM FONE DE OUVIDO NA MATRÍCULA</strong>
            </p>
            <p className="text-white/90 text-sm mt-3 italic">
              Clique aqui para garantir sua vaga
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