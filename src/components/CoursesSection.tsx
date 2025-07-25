
import { Card, CardContent } from "@/components/ui/card";

const courses = [
  {
    title: "CURSO KIDS",
    subtitle: "Para Crianças de 07 a 10 anos",
    description: "Aulas divertidas, dinâmicas e personalizadas, pensadas para crianças em fase de alfabetização e desenvolvimento cognitivo. O conteúdo é lúdico e contextualizado, com foco na construção de vocabulário e compreensão natural do inglês, respeitando o tempo e estilo de aprendizagem de cada criança.",
    logo: "/lovable-uploads/4dd9d94e-2558-44f8-a3c4-39056456f72a.png",
    bgColor: "bg-gradient-to-br from-green-100 to-green-50",
    borderColor: "border-green-200"
  },
  {
    title: "CURSO TEENS",
    subtitle: "Para adolescentes de 11 a 14 anos",
    description: "Curso especialmente desenvolvido para pré-adolescentes, com foco em comunicação prática, estímulo à autonomia e aplicação do inglês no dia a dia escolar e digital. As aulas são interativas, individuais e adaptadas ao ritmo e interesses dos alunos, usando a abordagem lexical como base.",
    logo: "/lovable-uploads/043c9215-4e90-4815-a4b3-d26a0f41eb49.png",
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
    borderColor: "border-blue-200"
  },
  {
    title: "CURSO CLASS",
    subtitle: "Programas Exclusivos de Inglês",
    description: "Soluções personalizadas para diferentes perfis de alunos, com aulas individuais, horários flexíveis e conteúdo sob medida. Ideal para quem deseja um curso de inglês eficaz, com atenção total do professor e foco nas necessidades específicas de comunicação em contextos pessoais ou profissionais.",
    logo: "/lovable-uploads/9b1f77b7-81fb-4102-955c-bad49c9d2c8e.png",
    bgColor: "bg-gradient-to-br from-primary/10 to-primary/5",
    borderColor: "border-primary/20"
  },
  {
    title: "CURSO PRIME",
    subtitle: "Exclusivo, Pessoal e Flexível",
    description: "Voltado para adultos e profissionais que buscam flexibilidade e rapidez. O curso é individual e moldado conforme os objetivos e rotina de cada aluno. O conteúdo é personalizado, com foco em situações reais do dia a dia profissional, utilizando a abordagem lexical para acelerar o aprendizado prático do idioma.",
    logo: "/lovable-uploads/2b49c396-d2a7-4349-97b2-72ab24860bd3.png",
    bgColor: "bg-gradient-to-br from-verbo-coral/10 to-verbo-coral/5",
    borderColor: "border-verbo-coral/30"
  }
];

export const CoursesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Nossos Programas de Inglês
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Metodologia especializada para cada faixa etária e necessidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <Card 
              key={index} 
              className={`h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${course.bgColor} ${course.borderColor} border-2`}
            >
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <img src={course.logo} alt={course.title} className="w-full h-full object-contain" />
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-muted-foreground">
                    {course.subtitle}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>
                </div>
                
                <div className="pt-6">
                  <span className="text-sm text-verbo-coral font-semibold" translate="no" lang="en">
                    Verbo Schools
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
