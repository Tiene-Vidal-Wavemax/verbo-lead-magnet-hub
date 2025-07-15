import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    text: "Excelente escola! Minha filha aprendeu inglês de forma divertida e eficaz. Os professores são muito dedicados e atenciosos.",
    rating: 5,
    course: "Curso Kids"
  },
  {
    name: "João Santos",
    text: "A metodologia da Verbo Schools é incrível. Consegui aprender inglês mesmo com a agenda corrida. Horários flexíveis e professores excelentes!",
    rating: 5,
    course: "Curso Class"
  },
  {
    name: "Ana Costa",
    text: "Recomendo demais! Meu filho adolescente estava desmotivado com inglês, mas aqui ele recuperou o interesse. Professores especializados fazem toda diferença.",
    rating: 5,
    course: "Curso Teens"
  }
];

const successStories = [
  {
    name: "Empresário Duda Arpini",
    story: "Consegui fechar negócios internacionais após completar o curso Prime. A fluência em inglês abriu portas que eu nem imaginava!",
    result: "Aumento de 40% no faturamento da empresa",
    videoUrl: "" // Adicione a URL do vídeo aqui
  },
  {
    name: "Pastor Lucas Dardengo",
    story: "Conquistei uma promoção para gerente regional depois de me tornar fluente. O investimento na Verbo Schools mudou minha carreira!",
    result: "Promoção internacional conquistada",
    videoUrl: "" // Adicione a URL do vídeo aqui
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-verbo-navy/5">
      <div className="container mx-auto px-4">
        {/* Depoimentos Google */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              O que nossos alunos dizem
            </h2>
            <p className="text-xl text-muted-foreground">
              Avaliações reais do Google Meu Negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <Quote className="h-8 w-8 text-verbo-coral/30" />
                  
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-verbo-coral">{testimonial.course}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cases de Sucesso */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Cases de Sucesso
            </h3>
            <p className="text-lg text-muted-foreground">
              Histórias reais de transformação profissional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {successStories.map((story, index) => (
              <Card key={index} className="h-full bg-gradient-to-br from-verbo-coral/10 to-verbo-coral/5 border-verbo-coral/20 border-2 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="text-center">
                    {story.videoUrl ? (
                      <div className="w-full max-w-sm mx-auto mb-4 aspect-video rounded-lg overflow-hidden">
                        <video 
                          controls 
                          className="w-full h-full object-cover"
                          poster=""
                        >
                          <source src={story.videoUrl} type="video/mp4" />
                          Seu navegador não suporta o elemento de vídeo.
                        </video>
                      </div>
                    ) : (
                      <div className="w-16 h-16 mx-auto mb-4 bg-verbo-coral text-white rounded-full flex items-center justify-center text-2xl font-bold">
                        {story.name.charAt(0)}
                      </div>
                    )}
                    
                    <h4 className="text-xl font-bold text-primary mb-2">{story.name}</h4>
                    
                    <p className="text-muted-foreground italic mb-4">
                      "{story.story}"
                    </p>
                    
                    <div className="bg-verbo-coral text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {story.result}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};