import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/layout/sidebar";
import { useLocation } from "wouter";
import { 
  HelpCircle, 
  Search, 
  Book, 
  Video, 
  MessageSquare, 
  ExternalLink,
  ChevronRight,
  Star,
  Clock,
  Users,
  Target,
  TrendingUp,
  Settings,
  Zap,
  Globe,
  Shield,
  PlayCircle,
  Download,
  FileText,
  Copy,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const quickActions = [
  {
    title: "Primeiros Passos",
    description: "Configure sua conta e primeiras campanhas",
    icon: Zap,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Integrações",
    description: "Conecte suas plataformas de pagamento",
    icon: Globe,
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Relatórios",
    description: "Entenda seus dados e métricas",
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Configurações",
    description: "Personalize sua conta e preferências",
    icon: Settings,
    color: "bg-orange-100 text-orange-600"
  }
];

const popularTopics = [
  {
    title: "Como configurar o Facebook Pixel?",
    views: "2.3k",
    category: "Integrações",
    content: `
Para configurar o Facebook Pixel no Bueiro Digital:

1. Acesse 'Pixels' no menu lateral
2. Clique em 'Novo Pixel'
3. Selecione 'Facebook' como plataforma
4. Insira seu Pixel ID (encontrado no Gerenciador de Eventos do Facebook)
5. Cole o código do pixel no seu site
6. Configure os eventos de conversão

O pixel será automaticamente sincronizado com suas campanhas.
    `
  },
  {
    title: "Entendendo as métricas de ROI",
    views: "1.8k",
    category: "Relatórios",
    content: `
ROI (Return on Investment) é calculado como:
ROI = (Receita - Investimento) / Investimento × 100

No Bueiro Digital você encontra:
- ROI por campanha
- ROI por fonte de tráfego
- ROI acumulado
- Comparativo mensal

Um ROI positivo indica lucro. ROI de 300% significa R$ 3 de retorno para cada R$ 1 investido.
    `
  },
  {
    title: "Configurando Webhooks do Hotmart",
    views: "1.5k",
    category: "Integrações",
    content: `
Para configurar webhooks do Hotmart:

1. Acesse 'Integrações' > 'Hotmart'
2. Insira suas credenciais da API Hotmart
3. Configure a URL do webhook: https://api.bueirodigital.com/webhook/hotmart
4. Selecione os eventos: PURCHASE, REFUND, CHARGEBACK
5. Teste a conexão

As vendas aparecerão automaticamente no dashboard em tempo real.
    `
  },
  {
    title: "Como criar UTMs personalizadas?",
    views: "1.2k",
    category: "Campanhas",
    content: `
UTMs personalizadas no Bueiro Digital:

1. Acesse 'Campanhas' > 'Gerar UTM'
2. Preencha os campos:
   - utm_source: origem (facebook, google, email)
   - utm_medium: mídia (cpc, social, organic)
   - utm_campaign: nome da campanha
   - utm_content: versão do anúncio
3. Clique em 'Gerar Link'
4. Use o link nas suas campanhas

O rastreamento será automático quando alguém clicar.
    `
  },
  {
    title: "Automatizando regras de campanhas",
    views: "980",
    category: "Automação",
    content: `
Regras automatizadas ajudam a otimizar campanhas:

1. Acesse 'Regras Automatizadas'
2. Clique em 'Nova Regra'
3. Defina condições (ex: CPA > R$ 50)
4. Defina ações (ex: pausar campanha)
5. Configure frequência de verificação

Exemplos de regras:
- Pausar se CPA > R$ 100
- Aumentar orçamento se ROI > 200%
- Enviar alerta se conversões < 5/dia
    `
  }
];

const faqData = [
  {
    question: "Como posso integrar minha plataforma de pagamento?",
    answer: "Acesse a seção 'Integrações' no menu lateral, escolha sua plataforma (Hotmart, Kiwify, Eduzz, etc.) e siga o passo a passo de configuração. Você precisará das chaves de API fornecidas pela plataforma."
  },
  {
    question: "Quanto tempo demora para os dados aparecerem no dashboard?",
    answer: "Os dados são atualizados em tempo real através de webhooks. Para integrações via API, a sincronização ocorre a cada 15 minutos. Dados do Facebook e Google Ads são atualizados a cada hora."
  },
  {
    question: "Como funciona o sistema de atribuição?",
    answer: "Utilizamos um modelo de atribuição de último clique com janela de 30 dias. Você pode personalizar a janela de atribuição nas configurações avançadas da sua conta."
  },
  {
    question: "Posso exportar meus dados?",
    answer: "Sim! Todos os relatórios podem ser exportados em formato CSV ou PDF. Acesse qualquer relatório e clique no botão 'Exportar' no canto superior direito."
  },
  {
    question: "Como configurar alertas automatizados?",
    answer: "Vá em 'Regras Automatizadas' no menu, clique em 'Nova Regra' e defina as condições para receber notificações por email ou webhook quando métricas específicas forem atingidas."
  },
  {
    question: "Qual é o limite de campanhas que posso rastrear?",
    answer: "O limite varia por plano: Gratuito (5 campanhas), Premium (50 campanhas), Avançado (200 campanhas), Monster (ilimitado). Upgrade seu plano se necessário."
  },
  {
    question: "Como funciona a segurança dos meus dados?",
    answer: "Utilizamos criptografia SSL/TLS para todas as conexões, armazenamento seguro em nuvem com backup automático e conformidade com LGPD. Seus dados nunca são compartilhados com terceiros."
  },
  {
    question: "Posso usar a API do Bueiro Digital?",
    answer: "Sim! Oferecemos uma API REST completa para integrações customizadas. Acesse a documentação em 'APIs' no menu ou visite nossa documentação técnica online."
  }
];

// Componente de Documentação Completa
function DocumentationContent() {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copiado!", description: "Código copiado para a área de transferência" });
  };

  return (
    <Tabs defaultValue="api" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="api">API</TabsTrigger>
        <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        <TabsTrigger value="utm">UTM Tracking</TabsTrigger>
        <TabsTrigger value="pixels">Pixels</TabsTrigger>
      </TabsList>
      
      <TabsContent value="api" className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">API do Bueiro Digital</h3>
          <p className="text-gray-600">Integre o Bueiro Digital com suas aplicações usando nossa API REST.</p>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm">GET /api/campaigns</span>
              <Button size="sm" variant="outline" onClick={() => copyToClipboard('GET /api/campaigns')}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">Lista todas as campanhas do usuário</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm">POST /api/campaigns</span>
              <Button size="sm" variant="outline" onClick={() => copyToClipboard('POST /api/campaigns')}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">Cria uma nova campanha</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Autenticação</h4>
            <p className="text-blue-800 text-sm">Use sua API Key no header: Authorization: Bearer YOUR_API_KEY</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="webhooks" className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Configuração de Webhooks</h3>
          <p className="text-gray-600">Receba notificações em tempo real de vendas e eventos.</p>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">URL do Webhook</h4>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white p-2 rounded border">https://seu-site.com/webhook</code>
              <Button size="sm" variant="outline" onClick={() => copyToClipboard('https://seu-site.com/webhook')}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Exemplo de Payload</h4>
            <pre className="text-sm text-green-800 overflow-x-auto">
{`{
  "event": "sale_completed",
  "transaction_id": "TX123456",
  "amount": 97.00,
  "customer_email": "cliente@email.com",
  "utm_source": "facebook",
  "utm_campaign": "promo-janeiro"
}`}
            </pre>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="utm" className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">UTM Tracking</h3>
          <p className="text-gray-600">Como configurar e usar UTMs para rastrear suas campanhas.</p>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Estrutura UTM</h4>
            <div className="space-y-2 text-sm">
              <div><strong>utm_source:</strong> facebook, google, instagram</div>
              <div><strong>utm_medium:</strong> cpc, social, email</div>
              <div><strong>utm_campaign:</strong> promo-janeiro, black-friday</div>
              <div><strong>utm_content:</strong> botao-azul, banner-topo</div>
              <div><strong>utm_term:</strong> palavra-chave (para Google Ads)</div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Exemplo Completo</h4>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs bg-white p-2 rounded border">
                https://meusite.com/produto?utm_source=facebook&utm_medium=cpc&utm_campaign=promo-janeiro
              </code>
              <Button size="sm" variant="outline" onClick={() => copyToClipboard('https://meusite.com/produto?utm_source=facebook&utm_medium=cpc&utm_campaign=promo-janeiro')}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="pixels" className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Configuração de Pixels</h3>
          <p className="text-gray-600">Instale pixels de rastreamento para melhor atribuição.</p>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Facebook Pixel</h4>
            <pre className="text-sm overflow-x-auto bg-white p-2 rounded border">
{`<!-- Facebook Pixel Code -->
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
</script>`}
            </pre>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Google Analytics</h4>
            <pre className="text-sm overflow-x-auto bg-white p-2 rounded border">
{`<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>`}
            </pre>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

// Componente para mostrar conteúdo de tópicos específicos
function TopicContent({ topic }: { topic: { title: string; content: string; category: string } }) {
  const { toast } = useToast();
  
  const copyContent = () => {
    navigator.clipboard.writeText(topic.content);
    toast({ title: "Copiado!", description: "Conteúdo copiado para a área de transferência" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="secondary">{topic.category}</Badge>
        <Button size="sm" variant="outline" onClick={copyContent}>
          <Copy className="h-3 w-3 mr-1" />
          Copiar
        </Button>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
          {topic.content.trim()}
        </pre>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => window.open('https://wa.me/5587999272064?text=Tenho%20dúvidas%20sobre:%20' + encodeURIComponent(topic.title), '_blank')}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Tirar Dúvidas
        </Button>
        <Button 
          variant="outline"
          onClick={() => window.open('https://wa.me/5587999272064?text=Gostaria%20de%20mais%20informações%20sobre:%20' + encodeURIComponent(topic.title), '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Saiba Mais
        </Button>
      </div>
    </div>
  );
}

// Componente de Tutoriais em Vídeo
function VideoTutorials() {
  const { toast } = useToast();
  
  const videos = [
    {
      title: "Configuração Inicial",
      duration: "5:30",
      description: "Como configurar sua conta e primeiras campanhas",
      thumbnail: "🚀"
    },
    {
      title: "Integrações com Plataformas",
      duration: "8:45",
      description: "Conectar Hotmart, Kiwify, Eduzz e outras plataformas",
      thumbnail: "🔗"
    },
    {
      title: "Análise de Dados",
      duration: "12:20",
      description: "Como interpretar métricas e relatórios",
      thumbnail: "📊"
    },
    {
      title: "Automação de Regras",
      duration: "15:10",
      description: "Configurar regras automatizadas para campanhas",
      thumbnail: "⚡"
    },
    {
      title: "Facebook Pixel",
      duration: "7:25",
      description: "Instalação e configuração do Facebook Pixel",
      thumbnail: "📱"
    },
    {
      title: "API e Webhooks",
      duration: "18:30",
      description: "Integrações avançadas via API",
      thumbnail: "⚙️"
    }
  ];

  const handleWatchVideo = (title: string) => {
    toast({
      title: "Vídeo em desenvolvimento",
      description: `"${title}" estará disponível em breve`
    });
  };

  return (
    <div className="grid gap-4">
      {videos.map((video, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
                {video.thumbnail}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{video.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {video.duration}
                  </div>
                  <Badge variant="secondary">Tutorial</Badge>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleWatchVideo(video.title)}
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Assistir
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="text-center p-8 bg-blue-50 rounded-lg">
        <Video className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Mais Vídeos em Breve</h3>
        <p className="text-blue-700 text-sm mb-4">
          Novos tutoriais são adicionados semanalmente
        </p>
        <Button variant="outline" onClick={() => window.open('https://wa.me/5587999272064?text=Gostaria%20de%20sugerir%20um%20tutorial%20em%20vídeo', '_blank')}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Sugerir Tópico
        </Button>
      </div>
    </div>
  );
}

export default function AjudaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Busca em FAQs
      const foundFaq = faqData.find(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Busca em tópicos populares
      const foundTopic = popularTopics.find(topic =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (foundFaq) {
        setSelectedTopic(foundFaq.question);
        toast({
          title: "FAQ encontrada!",
          description: `"${foundFaq.question}"`
        });
        // Scroll para a seção FAQ
        setTimeout(() => {
          document.querySelector('[data-section="faq"]')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (foundTopic) {
        setSelectedTopic(foundTopic.title);
        setIsDocsOpen(true);
        toast({
          title: "Tutorial encontrado!",
          description: `"${foundTopic.title}"`
        });
      } else {
        toast({
          title: "Nenhum resultado",
          description: "Tente usar palavras-chave diferentes ou contate o suporte",
          variant: "destructive"
        });
      }
    }
  };

  const handleQuickAction = (title: string) => {
    switch(title) {
      case "Primeiros Passos":
        setLocation('/admin-tutorial');
        break;
      case "Integrações":
        setLocation('/integracoes');
        break;
      case "Relatórios":
        setLocation('/dashboard');
        break;
      case "Configurações":
        setLocation('/configuracoes');
        break;
      default:
        toast({
          title: "Redirecionando...",
          description: `Abrindo guia: ${title}`
        });
    }
  };

  const handlePopularTopic = (title: string) => {
    const topic = popularTopics.find(t => t.title === title);
    if (topic && topic.content) {
      setSelectedTopic(title);
      // Abrir modal com conteúdo específico
      setIsDocsOpen(true);
    } else {
      const foundFaq = faqData.find(faq => faq.question === title);
      if (foundFaq) {
        setSelectedTopic(foundFaq.question);
        toast({
          title: "Artigo encontrado",
          description: "Veja a resposta na seção FAQ abaixo"
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Central de Ajuda</h1>
              <p className="text-gray-600 mt-1">
                Encontre respostas, tutoriais e documentação para maximizar seus resultados
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Search */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Como podemos ajudar?</h2>
                <p className="text-gray-600">Digite sua dúvida ou procure nos tópicos abaixo</p>
              </div>
              
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Ex: Como configurar Facebook Pixel, exportar relatórios..."
                  className="pl-12 h-14 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={handleSearch}
                >
                  Buscar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleQuickAction(action.title)}>
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-3 rounded-xl ${action.color} mb-4`}>
                      <action.icon className="h-8 w-8" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Popular Topics */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tópicos Populares</h3>
            <Card className="shadow-lg border-0">
              <CardContent className="p-0">
                {popularTopics.map((topic, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handlePopularTopic(topic.title)}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{topic.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {topic.views} visualizações
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {topic.category}
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Categories Grid */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Navegue por Categoria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Dialog open={isDocsOpen} onOpenChange={setIsDocsOpen}>
                <DialogTrigger asChild>
                  <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Book className="h-6 w-6 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">Documentação</h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        Guias completos, referências de API e documentação técnica
                      </p>
                      <div className="text-sm text-blue-600 flex items-center gap-1">
                        Ver documentação <ExternalLink className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedTopic && popularTopics.find(t => t.title === selectedTopic) 
                        ? selectedTopic 
                        : "Documentação Completa"
                      }
                    </DialogTitle>
                    <DialogDescription>
                      {selectedTopic && popularTopics.find(t => t.title === selectedTopic)
                        ? "Tutorial detalhado"
                        : "Guias e referências para usar o Bueiro Digital"
                      }
                    </DialogDescription>
                  </DialogHeader>
                  {selectedTopic && popularTopics.find(t => t.title === selectedTopic) ? (
                    <TopicContent topic={popularTopics.find(t => t.title === selectedTopic)!} />
                  ) : (
                    <DocumentationContent />
                  )}
                </DialogContent>
              </Dialog>

              <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
                <DialogTrigger asChild>
                  <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Video className="h-6 w-6 text-green-600" />
                        <h4 className="font-semibold text-gray-900">Tutoriais em Vídeo</h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        Aprenda passo a passo com nossos tutoriais práticos
                      </p>
                      <div className="text-sm text-green-600 flex items-center gap-1">
                        Assistir vídeos <ExternalLink className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Tutoriais em Vídeo</DialogTitle>
                    <DialogDescription>
                      Aprenda a usar todas as funcionalidades
                    </DialogDescription>
                  </DialogHeader>
                  <VideoTutorials />
                </DialogContent>
              </Dialog>

              <Card 
                className="shadow-lg border-0 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => window.open('https://wa.me/5587999272064?text=Olá!%20Gostaria%20de%20participar%20da%20comunidade%20Bueiro%20Digital', '_blank')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                    <h4 className="font-semibold text-gray-900">Comunidade</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Participe da comunidade e tire dúvidas com outros usuários
                  </p>
                  <div className="text-sm text-purple-600 flex items-center gap-1">
                    Acessar comunidade <ExternalLink className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ */}
          <div data-section="faq">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h3>
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full" value={selectedTopic || undefined}>
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={faq.question}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Contact Support */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-2">Ainda precisa de ajuda?</h3>
              <p className="text-blue-100 mb-6">
                Nossa equipe de suporte especializada está pronta para ajudar você
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => window.open('https://wa.me/5587999272064?text=Olá!%20Preciso%20de%20suporte%20técnico%20com%20o%20Bueiro%20Digital', '_blank')}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat ao Vivo
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-white border-white hover:bg-white hover:text-blue-600 bg-white/10"
                  onClick={() => setLocation('/suporte')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}