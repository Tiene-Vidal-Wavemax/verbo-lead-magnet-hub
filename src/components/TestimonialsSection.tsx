import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mona Lisa Dias",
    text: "Maravilhosa...profissionais excelentes...ambiente agradável...e o resultado perfeito",
    rating: 5
  },
  {
    name: "luizao",
    text: "Ensino prático e objetivo focando em conversação. Muito satisfeito com as aulas.",
    rating: 5
  },
  {
    name: "Tiene Vidal",
    text: "O ambiente é ótimo, super seguro e confortável, pra nos que trabalhamos e precisamos estudar a noite, vale muito a pena! Super indico a Verbo, as aulas são diferentes e estou me adaptando melhor do que pensei!",
    rating: 5
  }
];

const googleReviewsUrl = "https://www.google.com/search?q=Escola+Ingl%C3%AAs+Verbo+Schools+Alta+Floresta&stick=H4sIAAAAAAAA_-NgU1I1qLA0Tkw0NkwxMDQzME8ySDK3MqhITDE3MzU2SjQ0MkpJMUg0WMSq5VqcnJ-TqOCZl55zeFWxQlhqUVK-QnByRn5-TrGCY05JooJbTn5RanFJIgDexhqqVgAAAA&hl=pt-BR&mat=CZqpGst8_akBElYBYJahae-wvIoSOeQPGFX3f88CyxlfcvBugNmS0S9RDPWNBu2oDBC_K_ESA7oXhHyNdTcXAF-q8HBPXn3acHpL6oOx8JC_ji9A-Yuw-W4BjjF9v_50sQ&authuser=0#cobssid=s&mpd=~119905577527323034/customers/reviews";


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
              <Card 
                key={index} 
                className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => window.open(googleReviewsUrl, '_blank')}
              >
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
                    <p className="text-sm text-verbo-coral">⭐ Avaliação Google</p>
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