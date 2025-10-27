import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  Code, 
  Copy, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle, 
  XCircle,
  Globe,
  Zap,
  Activity,
  Clock,
  AlertTriangle,
  Download,
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ScriptsPage() {
  const [showCode, setShowCode] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const toggleCodeVisibility = (scriptId: string) => {
    setShowCode(prev => ({ ...prev, [scriptId]: !prev[scriptId] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Código copiado para a área de transferência.",
    });
  };

  const trackingScripts = [
    {
      id: "fb_pixel",
      name: "Facebook Pixel",
      description: "Rastreamento de conversões e eventos do Facebook",
      status: "active",
      type: "Tracking",
      lastUpdated: "Há 2 horas",
      code: `<!-- Facebook Pixel -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>`,
      events: ["PageView", "Purchase", "AddToCart", "Lead"]
    },
    {
      id: "ga4",
      name: "Google Analytics 4",
      description: "Análise de tráfego e comportamento do usuário",
      status: "active",
      type: "Analytics",
      lastUpdated: "Há 1 dia",
      code: `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>`,
      events: ["page_view", "purchase", "add_to_cart", "begin_checkout"]
    },
    {
      id: "gtm",
      name: "Google Tag Manager",
      description: "Gerenciamento centralizado de tags",
      status: "active",
      type: "Tag Management",
      lastUpdated: "Há 3 dias",
      code: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXX');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`,
      events: ["Custom Events", "E-commerce", "Conversions"]
    },
    {
      id: "hotjar",
      name: "Hotjar",
      description: "Heatmaps e gravações de sessão",
      status: "inactive",
      type: "User Behavior",
      lastUpdated: "Há 1 semana",
      code: `<!-- Hotjar Tracking -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:YOUR_HJID,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`,
      events: ["Heatmaps", "Recordings", "Polls", "Surveys"]
    }
  ];

  const customScripts = [
    {
      id: "custom_1",
      name: "Conversão Personalizada",
      description: "Script para rastreamento de evento personalizado",
      status: "active",
      code: `<script>
function trackCustomConversion(eventName, value) {
  // Facebook Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Purchase', {value: value, currency: 'BRL'});
  }
  
  // Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'purchase', {
      transaction_id: Date.now(),
      value: value,
      currency: 'BRL'
    });
  }
  
  // Bueiro Digital API
  fetch('/api/conversions', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      event: eventName,
      value: value,
      timestamp: new Date().toISOString()
    })
  });
}
</script>`
    },
    {
      id: "custom_2",
      name: "UTM Tracker",
      description: "Captura automática de parâmetros UTM",
      status: "active",
      code: `<script>
(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmData = {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_term: urlParams.get('utm_term'),
    utm_content: urlParams.get('utm_content')
  };
  
  if (Object.values(utmData).some(v => v !== null)) {
    localStorage.setItem('bueiro_utm_data', JSON.stringify(utmData));
    
    // Enviar para API
    fetch('/api/utm-tracking', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(utmData)
    });
  }
})();
</script>`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <Code className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Scripts de Rastreamento</h1>
                <p className="text-gray-600 mt-1">
                  Gerencie códigos de tracking e pixels de conversão
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Importar
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Criando novo script",
                  description: "Configurando script de rastreamento personalizado"
                });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Script
              </Button>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Tracking Scripts */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Scripts de Tracking</h2>
            <div className="grid gap-6">
              {trackingScripts.map((script) => (
                <Card key={script.id} className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          <Code className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{script.name}</h3>
                          <p className="text-sm text-gray-600">{script.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={script.status === 'active' ? 'default' : 'secondary'}>
                          {script.status === 'active' ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Ativo
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1" />
                              Inativo
                            </>
                          )}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {script.type}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm font-medium">Código do Script</Label>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleCodeVisibility(script.id)}
                            >
                              {showCode[script.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(script.code)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Textarea
                          value={showCode[script.id] ? script.code : script.code.replace(/./g, '•')}
                          readOnly
                          className="font-mono text-xs h-32 resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Eventos Suportados</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {script.events.map((event) => (
                              <Badge key={event} variant="outline" className="text-xs">
                                {event}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Última Atualização</Label>
                          <p className="text-sm text-gray-600 mt-1">{script.lastUpdated}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remover
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Custom Scripts */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Scripts Personalizados</h2>
            <div className="grid gap-6">
              {customScripts.map((script) => (
                <Card key={script.id} className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Zap className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{script.name}</h3>
                          <p className="text-sm text-gray-600">{script.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={script.status === 'active' ? 'default' : 'secondary'}>
                          {script.status === 'active' ? (
                            <>
                              <Activity className="h-3 w-3 mr-1" />
                              Ativo
                            </>
                          ) : (
                            'Inativo'
                          )}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Personalizado
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm font-medium">Código JavaScript</Label>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleCodeVisibility(script.id)}
                            >
                              {showCode[script.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(script.code)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Textarea
                          value={showCode[script.id] ? script.code : script.code.replace(/./g, '•')}
                          readOnly
                          className="font-mono text-xs h-40 resize-none"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Globe className="h-4 w-4 mr-1" />
                          Testar
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Script Installation Guide */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Guia de Instalação</CardTitle>
              <CardDescription>
                Como instalar os scripts em seu site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">1. Posicionamento dos Scripts</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Scripts de tracking: No `&lt;head&gt;` do site</p>
                    <p>• Scripts de conversão: Antes do `&lt;/body&gt;`</p>
                    <p>• Scripts condicionais: Em páginas específicas</p>
                    <p>• Scripts de performance: Com lazy loading</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">2. Configuração</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Substitua YOUR_PIXEL_ID pelo ID real</p>
                    <p>• Configure eventos personalizados</p>
                    <p>• Teste em ambiente de desenvolvimento</p>
                    <p>• Monitore erros no console</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Importante</h4>
                    <p className="text-sm text-yellow-800 mt-1">
                      Sempre teste os scripts em um ambiente de desenvolvimento antes de implementar em produção. 
                      Verifique se não há conflitos entre diferentes scripts de tracking.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Script Performance */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Performance dos Scripts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { metric: "Tempo de Carregamento", value: "2.3s", status: "good" },
                  { metric: "Scripts Ativos", value: "4", status: "normal" },
                  { metric: "Erros Detectados", value: "0", status: "good" }
                ].map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-sm text-gray-600">{metric.metric}</p>
                    <Badge 
                      variant={metric.status === 'good' ? 'default' : 'secondary'}
                      className="mt-2"
                    >
                      {metric.status === 'good' ? 'Bom' : 'Normal'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}