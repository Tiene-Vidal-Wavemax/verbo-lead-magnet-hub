import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

export const TrackingSetup = () => {
  const [metaPixelId, setMetaPixelId] = useState(
    localStorage.getItem('verbo_meta_pixel_id') || ''
  );
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState(
    localStorage.getItem('verbo_google_analytics_id') || ''
  );
  const [googleAdsConversionId, setGoogleAdsConversionId] = useState(
    localStorage.getItem('verbo_google_ads_conversion_id') || ''
  );

  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem('verbo_meta_pixel_id', metaPixelId);
    localStorage.setItem('verbo_google_analytics_id', googleAnalyticsId);
    localStorage.setItem('verbo_google_ads_conversion_id', googleAdsConversionId);

    toast({
      title: "Configurações salvas!",
      description: "IDs de rastreamento foram salvos. Recarregue a página para aplicar as mudanças.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>🎯 Configuração de Rastreamento</CardTitle>
        <CardDescription>
          Configure os IDs para conectar com Meta Ads e Google Analytics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="meta-pixel">Meta Pixel ID</Label>
          <Input
            id="meta-pixel"
            value={metaPixelId}
            onChange={(e) => setMetaPixelId(e.target.value)}
            placeholder="Ex: 1234567890123456"
          />
          <p className="text-sm text-muted-foreground">
            Encontre em: Meta Business Manager → Eventos → Pixels
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="google-analytics">Google Analytics 4 ID</Label>
          <Input
            id="google-analytics"
            value={googleAnalyticsId}
            onChange={(e) => setGoogleAnalyticsId(e.target.value)}
            placeholder="Ex: G-XXXXXXXXXX"
          />
          <p className="text-sm text-muted-foreground">
            Encontre em: Google Analytics → Administrador → Propriedade → Fluxos de dados
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="google-ads">Google Ads Conversion ID</Label>
          <Input
            id="google-ads"
            value={googleAdsConversionId}
            onChange={(e) => setGoogleAdsConversionId(e.target.value)}
            placeholder="Ex: AW-123456789/AbCdEfGhIjKlMnOp"
          />
          <p className="text-sm text-muted-foreground">
            Encontre em: Google Ads → Ferramentas → Conversões → Ação de conversão
          </p>
        </div>

        <Button onClick={handleSave} className="w-full">
          Salvar Configurações
        </Button>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">📋 Para conectar com Meta Ads:</h4>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Acesse o Meta Business Manager</li>
            <li>Vá em "Eventos" → "Pixels"</li>
            <li>Copie o ID do Pixel e cole acima</li>
            <li>No Gerenciador de Anúncios, crie campanhas usando esse pixel</li>
            <li>Configure eventos de conversão (Lead, Contact, etc.)</li>
          </ol>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">📊 Para Google Analytics/Ads:</h4>
          <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
            <li>Acesse o Google Analytics 4</li>
            <li>Configure metas de conversão</li>
            <li>Vincule com Google Ads</li>
            <li>Use as conversões em suas campanhas</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};