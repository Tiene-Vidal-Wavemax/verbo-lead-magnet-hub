import { Card, CardContent } from "@/components/ui/card";
import { Headphones, BookOpen, Users, Trophy, Clock, CheckCircle } from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Aula Experimental Gratuita",
    description: "30 minutos de aula personalizada para conhecer nossa metodologia",
    highlight: true
  },
  {
    icon: Headphones,
    title: "Fone de Ouvido Grátis",
    description: "Ganhe um fone de ouvido de qualidade ao se matricular",
    highlight: true
  },
  {
    icon: Users,
    title: "Turmas Pequenas",
    description: "Máximo 8 alunos por turma para aprendizado personalizado"
  },
  {
    icon: Trophy,
    title: "Método Comprovado",
    description: "Mais de 500 alunos aprovados em exames internacionais"
  },
  {
    icon: Clock,
    title: "Horários Flexíveis",
    description: "Manhã, tarde ou noite. Escolha o melhor horário para você"
  },
  {
    icon: CheckCircle,
    title: "Certificação",
    description: "Certificado reconhecido nacionalmente ao final do curso"
  }
];

export const BenefitsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Por que escolher a Verbo Schools?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mais de 5 anos transformando vidas através do inglês
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card 
                key={index} 
                className={`h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  benefit.highlight 
                    ? 'border-accent border-2 bg-gradient-to-br from-accent/10 to-accent/5' 
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                    benefit.highlight 
                      ? 'bg-accent text-white' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-primary">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                  
                  {benefit.highlight && (
                    <div className="inline-block bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                      OFERTA ESPECIAL
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};