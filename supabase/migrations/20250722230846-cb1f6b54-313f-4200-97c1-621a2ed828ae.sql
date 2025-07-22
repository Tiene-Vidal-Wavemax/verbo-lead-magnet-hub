-- Conectar a tabela leads ao realtime para updates em tempo real
ALTER TABLE public.leads REPLICA IDENTITY FULL;

-- Adicionar a tabela à publicação realtime
ALTER publication supabase_realtime ADD TABLE public.leads;