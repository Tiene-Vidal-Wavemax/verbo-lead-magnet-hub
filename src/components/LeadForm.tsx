import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
interface LeadFormData {
  name: string;
  phone: string;
  source: string;
}
interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void;
  isLoading?: boolean;
}
export const LeadForm = ({
  onSubmit,
  isLoading = false
}: LeadFormProps) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    phone: "",
    source: ""
  });
  const {
    toast
  } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.source) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos para continuar.",
        variant: "destructive"
      });
      return;
    }
    onSubmit(formData);
  };
  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <Card className="w-full max-w-lg mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Gift className="h-6 w-6 text-accent" />
          <Badge variant="secondary" className="bg-accent text-accent-foreground px-3 py-1">
            PROMOÇÃO LIMITADA
          </Badge>
        </div>
        <CardTitle className="text-2xl font-bold text-primary">
          Aula Experimental GRÁTIS
        </CardTitle>
        <CardDescription className="text-lg">
          <span className="font-semibold text-accent">+ Fone de Ouvido de BRINDE</span> na matrícula
        </CardDescription>
        
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            
            <span>
          </span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            <span>Sem compromisso</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" type="text" placeholder="Digite seu nome completo" value={formData.name} onChange={e => handleInputChange("name", e.target.value)} required className="h-12" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp</Label>
            <Input id="phone" type="tel" placeholder="(65) 9 9999-9999" value={formData.phone} onChange={e => handleInputChange("phone", e.target.value)} required className="h-12" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Como conheceu a Verbo Schools?</Label>
            <Select value={formData.source} onValueChange={value => handleInputChange("source", value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="redes-sociais">Redes Sociais</SelectItem>
                <SelectItem value="indicacao">Indicação de amigos</SelectItem>
                <SelectItem value="pesquisando">Pesquisando no Google</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full h-14 text-lg font-semibold" disabled={isLoading}>
            {isLoading ? "Enviando..." : "GARANTIR MINHA AULA GRÁTIS"}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Ao enviar, você concorda com nossos termos e que entraremos em contato via WhatsApp
          </p>
        </form>
      </CardContent>
    </Card>;
};