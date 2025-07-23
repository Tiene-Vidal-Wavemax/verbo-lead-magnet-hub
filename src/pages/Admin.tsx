import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Phone, Calendar, Users, TrendingUp, RefreshCw, LogOut } from "lucide-react";
import type { User, Session } from '@supabase/supabase-js';

interface Lead {
  id: string;
  nome: string;
  telefone: string;
  como_soube: string;
  data_captura: string;
  created_at: string;
}

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    sources: {} as Record<string, number>
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLeads(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os leads. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (leadsData: Lead[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const todayCount = leadsData.filter(lead => 
      new Date(lead.created_at) >= today
    ).length;

    const weekCount = leadsData.filter(lead => 
      new Date(lead.created_at) >= weekAgo
    ).length;

    const sources = leadsData.reduce((acc, lead) => {
      acc[lead.como_soube] = (acc[lead.como_soube] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setStats({
      total: leadsData.length,
      today: todayCount,
      thisWeek: weekCount,
      sources
    });
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/login');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/login');
      } else {
        // Only fetch leads if user is authenticated
        fetchLeads();
        
        // Configurar realtime para updates automáticos
        const channel = supabase
          .channel('schema-db-changes')
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'leads'
            },
            (payload) => {
              console.log('Novo lead recebido:', payload);
              setLeads(prev => [payload.new as Lead, ...prev]);
              
              toast({
                title: "🎉 Novo Lead!",
                description: `${(payload.new as Lead).nome} acabou de se cadastrar!`,
              });
            }
          )
          .subscribe();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getSourceLabel = (source: string) => {
    const labels: Record<string, string> = {
      'redes-sociais': 'Redes Sociais',
      'indicacao': 'Indicação',
      'pesquisando': 'Google',
      'outros': 'Outros'
    };
    return labels[source] || source;
  };

  const getSourceColor = (source: string) => {
    const colors: Record<string, string> = {
      'redes-sociais': 'bg-blue-100 text-blue-800',
      'indicacao': 'bg-green-100 text-green-800',
      'pesquisando': 'bg-purple-100 text-purple-800',
      'outros': 'bg-gray-100 text-gray-800'
    };
    return colors[source] || 'bg-gray-100 text-gray-800';
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      
      navigate('/login');
    } catch (error) {
      toast({
        title: "Erro ao fazer logout",
        description: "Tente novamente.",
        variant: "destructive"
      });
    }
  };

  // Don't render anything if not authenticated
  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard de Leads</h1>
            
            <div className="ml-auto flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                Logado como: <span className="font-medium">{user?.email}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={fetchLeads}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hoje</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.today}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.thisWeek}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {leads.length > 0 ? '100%' : '0%'}
                </div>
                <p className="text-xs text-muted-foreground">Formulário para Lead</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Leads List */}
        <Card>
          <CardHeader>
            <CardTitle>Leads Recentes</CardTitle>
            <CardDescription>
              Lista de todos os leads capturados pelo formulário (atualizações em tempo real)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Carregando leads...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Nenhum lead capturado ainda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{lead.nome}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{lead.telefone}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Capturado em: {formatDate(lead.created_at)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getSourceColor(lead.como_soube)}>
                          {getSourceLabel(lead.como_soube)}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`https://wa.me/55${lead.telefone.replace(/\D/g, '')}`, '_blank')}
                          className="flex items-center gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          Contatar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sources Stats */}
        {Object.keys(stats.sources).length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Fontes de Leads</CardTitle>
              <CardDescription>
                Como os visitantes conheceram a Verbo Schools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(stats.sources).map(([source, count]) => (
                  <div key={source} className="flex items-center justify-between">
                    <span className="font-medium">{getSourceLabel(source)}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{count}</Badge>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(count / stats.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {Math.round((count / stats.total) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;