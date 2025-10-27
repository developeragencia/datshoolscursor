import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { 
  BookOpen, 
  Play, 
  Monitor, 
  Settings, 
  Users, 
  TrendingUp, 
  Database, 
  Zap, 
  Shield, 
  Bell,
  Target,
  BarChart3,
  Globe,
  Smartphone,
  CheckCircle,
  PlayCircle,
  ArrowRight,
  Star,
  Lightbulb,
  MessageSquare,
  FileText,
  Award
} from "lucide-react";

export default function AdminTutorial() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const markCompleted = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
      toast({
        title: "Seção concluída!",
        description: "Você completou mais uma etapa do tutorial"
      });
    }
  };

  const tutorialSections = [
    {
      id: "dashboard",
      title: "Dashboard Principal",
      icon: <Monitor className="h-5 w-5" />,
      description: "Aprenda a navegar pelo dashboard principal e interpretar métricas",
      lessons: [
        "Visão geral das campanhas que venderam",
        "Métricas de ROI e conversão",
        "Gráficos de performance em tempo real",
        "Filtros por período e plataforma"
      ]
    },
    {
      id: "campaigns",
      title: "Gestão de Campanhas",
      icon: <Target className="h-5 w-5" />,
      description: "Como criar, configurar e otimizar suas campanhas",
      lessons: [
        "Criando nova campanha",
        "Configuração de UTMs",
        "Monitoramento de performance",
        "Otimização baseada em dados"
      ]
    },
    {
      id: "facebook",
      title: "Contas do Facebook",
      icon: <Globe className="h-5 w-5" />,
      description: "Integração e gerenciamento de contas do Facebook",
      lessons: [
        "Conectando conta do Facebook",
        "Configuração de tokens",
        "Sincronização de campanhas",
        "Webhook para eventos em tempo real"
      ]
    },
    {
      id: "automations",
      title: "Regras Automatizadas",
      icon: <Zap className="h-5 w-5" />,
      description: "Configure automações para otimizar campanhas",
      lessons: [
        "Criando regras de otimização",
        "Condições e ações",
        "Monitoramento de regras ativas",
        "Histórico de automações"
      ]
    },
    {
      id: "analytics",
      title: "Relatórios e Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      description: "Análises detalhadas e relatórios personalizados",
      lessons: [
        "Relatórios de performance",
        "Análise de atribuição",
        "Comparativo de campanhas",
        "Exportação de dados"
      ]
    },
    {
      id: "integrations",
      title: "Integrações",
      icon: <Database className="h-5 w-5" />,
      description: "Conecte com plataformas de pagamento e e-commerce",
      lessons: [
        "Configuração de webhooks",
        "Integração com Kiwify, Hotmart",
        "APIs de terceiros",
        "Troubleshooting de conexões"
      ]
    }
  ];

  const advancedFeatures = [
    {
      title: "Múltiplos Dashboards",
      description: "Crie dashboards personalizados para diferentes equipes",
      plan: "Avançado+",
      icon: <Monitor className="h-4 w-4" />
    },
    {
      title: "Regras Automatizadas",
      description: "Automação inteligente de campanhas",
      plan: "Premium+",
      icon: <Zap className="h-4 w-4" />
    },
    {
      title: "API Avançada",
      description: "Integração completa via API REST",
      plan: "Monster",
      icon: <Database className="h-4 w-4" />
    },
    {
      title: "Suporte Prioritário",
      description: "Atendimento 24/7 com resposta em até 1h",
      plan: "Monster",
      icon: <MessageSquare className="h-4 w-4" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold">Tutorial Completo do Painel Admin</h1>
          <p className="text-gray-600">Aprenda a dominar todas as funcionalidades da plataforma Bueiro Digital</p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Seu Progresso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-blue-600">
              {completedSections.length}/{tutorialSections.length}
            </div>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedSections.length / tutorialSections.length) * 100}%` }}
                />
              </div>
            </div>
            <Badge variant="outline">
              {Math.round((completedSections.length / tutorialSections.length) * 100)}% Concluído
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tutorial" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tutorial">Tutorial Interativo</TabsTrigger>
          <TabsTrigger value="quickstart">Início Rápido</TabsTrigger>
          <TabsTrigger value="advanced">Recursos Avançados</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="tutorial" className="space-y-6">
          <div className="grid gap-6">
            {tutorialSections.map((section, index) => (
              <Card key={section.id} className={`transition-all duration-300 ${
                completedSections.includes(section.id) ? 'border-green-500 bg-green-50' : ''
              }`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                        {section.icon}
                        <span>{section.title}</span>
                      </div>
                      {completedSections.includes(section.id) && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <Button
                      onClick={() => markCompleted(section.id)}
                      variant={completedSections.includes(section.id) ? "secondary" : "default"}
                      size="sm"
                    >
                      {completedSections.includes(section.id) ? "Concluído" : "Marcar como Concluído"}
                    </Button>
                  </CardTitle>
                  <p className="text-gray-600">{section.description}</p>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`lessons-${section.id}`}>
                      <AccordionTrigger>Ver Lições ({section.lessons.length})</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <PlayCircle className="h-4 w-4 text-blue-600" />
                              <span className="flex-1">{lesson}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  toast({
                                    title: "Lição iniciada",
                                    description: `Iniciando: ${lesson}`
                                  });
                                }}
                              >
                                <Play className="h-3 w-3 mr-1" />
                                Iniciar
                              </Button>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quickstart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Guia de Início Rápido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Configure sua primeira conta do Facebook</h3>
                    <p className="text-gray-600 text-sm">Conecte sua conta do Facebook para começar a rastrear campanhas</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => {
                        toast({
                          title: "Redirecionando...",
                          description: "Indo para Contas do Facebook"
                        });
                        setTimeout(() => setLocation('/facebook-accounts'), 1000);
                      }}
                    >
                      Ir para Facebook
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Crie sua primeira campanha</h3>
                    <p className="text-gray-600 text-sm">Configure UTMs e comece a rastrear conversões</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => {
                        toast({
                          title: "Redirecionando...",
                          description: "Indo para Campanhas"
                        });
                        setTimeout(() => setLocation('/campanhas'), 1000);
                      }}
                    >
                      Criar Campanha
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Configure integrações de pagamento</h3>
                    <p className="text-gray-600 text-sm">Conecte Kiwify, Hotmart ou outras plataformas</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => {
                        toast({
                          title: "Redirecionando...",
                          description: "Indo para Integrações"
                        });
                        setTimeout(() => setLocation('/integracoes'), 1000);
                      }}
                    >
                      Ver Integrações
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Recursos Avançados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {advancedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full text-white">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{feature.title}</h3>
                        <Badge variant="secondary">{feature.plan}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Recurso disponível",
                          description: `${feature.title} está disponível no plano ${feature.plan}`
                        });
                      }}
                    >
                      Saiba Mais
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Perguntas Frequentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="faq-1">
                  <AccordionTrigger>Como conectar minha conta do Facebook?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>Para conectar sua conta do Facebook:</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>Vá para "Contas do Facebook" no menu lateral</li>
                        <li>Clique em "Adicionar Nova Conta"</li>
                        <li>Configure App ID, App Secret e Access Token</li>
                        <li>Teste a conexão e salve</li>
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-2">
                  <AccordionTrigger>Como criar regras automatizadas?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>As regras automatizadas estão disponíveis no plano Premium+:</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>Acesse "Regras Automatizadas" no menu</li>
                        <li>Defina condições (CPC, CTR, gastos)</li>
                        <li>Configure ações (pausar, ajustar orçamento)</li>
                        <li>Ative a regra e monitore execução</li>
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-3">
                  <AccordionTrigger>Como interpretar o ROI das campanhas?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>O ROI (Return on Investment) é calculado como:</p>
                      <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                        ROI = (Receita - Investimento) / Investimento × 100
                      </div>
                      <p className="text-sm">Exemplo: Se você investiu R$ 1.000 e faturou R$ 3.000, seu ROI é 200%.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-4">
                  <AccordionTrigger>Posso exportar relatórios?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>Sim! Você pode exportar relatórios em diferentes formatos:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>CSV para análise em Excel</li>
                        <li>PDF para apresentações</li>
                        <li>JSON via API (plano Monster)</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => {
                toast({
                  title: "Redirecionando...",
                  description: "Indo para o Dashboard"
                });
                setTimeout(() => setLocation('/dashboard'), 1000);
              }}
            >
              <Monitor className="h-5 w-5" />
              Dashboard
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => {
                toast({
                  title: "Redirecionando...",
                  description: "Indo para Campanhas"
                });
                setTimeout(() => setLocation('/campanhas'), 1000);
              }}
            >
              <Target className="h-5 w-5" />
              Campanhas
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => {
                toast({
                  title: "Redirecionando...",
                  description: "Indo para Configurações"
                });
                setTimeout(() => setLocation('/configuracoes'), 1000);
              }}
            >
              <Settings className="h-5 w-5" />
              Configurações
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => {
                window.open('https://wa.me/5587999272064?text=Olá!%20Preciso%20de%20suporte%20com%20o%20Bueiro%20Digital', '_blank');
                toast({
                  title: "Suporte WhatsApp",
                  description: "Abrindo WhatsApp para contato direto"
                });
              }}
            >
              <MessageSquare className="h-5 w-5" />
              Suporte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}