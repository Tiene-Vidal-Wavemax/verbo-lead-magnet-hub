import { Card, CardContent } from "@/components/ui/card";

const courses = [
  {
    title: "CURSO KIDS",
    subtitle: "PARA CRIANÇAS DE 07 A 10 ANOS DE IDADE",
    description: "Turma infantil com método de ensino pensado especialmente para essa faixa etária, com atividades lúdicas e interativas.",
    logo: "👶",
    bgColor: "bg-gradient-to-br from-green-100 to-green-50",
    borderColor: "border-green-200"
  },
  {
    title: "CURSO TEENS",
    subtitle: "PARA CRIANÇAS DE 11 A 14 ANOS DE IDADE",
    description: "Voltado para alunos adolescentes com professores especializados que entendem as necessidades dessa fase.",
    logo: "🧑‍🎓",
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
    borderColor: "border-blue-200"
  },
  {
    title: "CURSO CLASS",
    subtitle: "PROGRAMAS EXCLUSIVOS DE INGLÊS",
    description: "Turma de adultos com horários flexíveis, turmas pequenas e voltadas para se encaixar ao seu dia a dia.",
    logo: "👩‍💼",
    bgColor: "bg-gradient-to-br from-primary/10 to-primary/5",
    borderColor: "border-primary/20"
  },
  {
    title: "CURSO PRIME",
    subtitle: "EXCLUSIVO, PESSOAL E FLEXÍVEL",
    description: "Aulas exclusivas e personalizadas para um público seleto que busca excelência e flexibilidade total.",
    logo: "👑",
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
              <CardContent className="p-8 text-center space-y-4">
                <div className="text-4xl mb-4">{course.logo}</div>
                
                <h3 className="text-2xl font-bold text-primary">
                  {course.title}
                </h3>
                
                <h4 className="text-lg font-semibold text-muted-foreground">
                  {course.subtitle}
                </h4>
                
                <p className="text-muted-foreground leading-relaxed">
                  {course.description}
                </p>
                
                <div className="pt-4">
                  <span className="text-sm text-verbo-coral font-semibold">
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