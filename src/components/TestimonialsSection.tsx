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

      </div>
    </section>
  );
};