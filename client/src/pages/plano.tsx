import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { 
  CreditCard, 
  Check, 
  X, 
  Crown, 
  Zap, 
  Shield, 
  Users, 
  BarChart3,
  Headphones,
  Globe,
  Rocket,
  Star,
  Calendar,
  Download
} from "lucide-react";

export default function PlanoPage() {
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      description: "Para começar e testar a plataforma",
      color: "from-gray-500 to-gray-600",
      popular: false,
      features: [
        { name: "Até 3 campanhas", included: true },
        { name: "1.000 visitantes/mês", included: true },
        { name: "Relatórios básicos", included: true },
        { name: "Suporte por email", included: true },
        { name: "Integrações limitadas", included: true },
        { name: "UTM tracking", included: false },
        { name: "Automações", included: false },
        { name: "API completa", included: false },
        { name: "Suporte prioritário", included: false },
        { name: "Múltiplos dashboards", included: false }
      ]
    },
    {
      name: "Premium",
      price: "R$ 97",
      period: "/mês",
      description: "Ideal para pequenas empresas e freelancers",
      color: "from-blue-500 to-blue-600",
      popular: false,
      features: [
        { name: "Até 25 campanhas", included: true },
        { name: "25.000 visitantes/mês", included: true },
        { name: "Relatórios avançados", included: true },
        { name: "UTM tracking completo", included: true },
        { name: "Todas as integrações", included: true },
        { name: "Suporte por chat", included: true },
        { name: "Automações básicas", included: true },
        { name: "API limitada", included: true },
        { name: "Suporte prioritário", included: false },
        { name: "Múltiplos dashboards", included: false }
      ]
    },
    {
      name: "Avançado",
      price: "R$ 197",
      period: "/mês",
      description: "Para agências e empresas em crescimento",
      color: "from-purple-500 to-purple-600",
      popular: true,
      features: [
        { name: "Até 100 campanhas", included: true },
        { name: "100.000 visitantes/mês", included: true },
        { name: "Relatórios personalizados", included: true },
        { name: "UTM tracking avançado", included: true },
        { name: "Todas as integrações", included: true },
        { name: "Automações completas", included: true },
        { name: "API completa", included: true },
        { name: "Suporte prioritário", included: true },
        { name: "Múltiplos dashboards", included: true },
        { name: "White label", included: false }
      ]
    },
    {
      name: "Monster",
      price: "R$ 497",
      period: "/mês",
      description: "Para grandes empresas e agências",
      color: "from-red-500 to-red-600",
      popular: false,
      features: [
        { name: "Campanhas ilimitadas", included: true },
        { name: "Visitantes ilimitados", included: true },
        { name: "Todos os recursos", included: true },
        { name: "UTM tracking enterprise", included: true },
        { name: "Integrações personalizadas", included: true },
        { name: "Automações avançadas", included: true },
        { name: "API completa + webhooks", included: true },
        { name: "Suporte 24/7", included: true },
        { name: "Dashboards ilimitados", included: true },
        { name: "White label completo", included: true }
      ]
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
              <div className="p-3 bg-purple-100 rounded-xl">
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Planos e Faturamento</h1>
                <p className="text-gray-600 mt-1">
                  Gerencie sua assinatura e histórico de pagamentos
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Histórico de Pagamentos",
                    description: "Baixando relatório completo dos seus pagamentos...",
                  });
                  // Simulação de download
                  setTimeout(() => {
                    toast({
                      title: "Download concluído!",
                      description: "Relatório salvo em Downloads/historico-pagamentos.pdf",
                    });
                  }, 2000);
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Histórico
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Próximo Pagamento",
                    description: "15 de Fevereiro de 2025 - R$ 497,00 via cartão Visa ••••4242",
                  });
                }}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Próximo Pagamento
              </Button>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Current Plan */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-700 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Crown className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Plano Atual: Monster</h2>
                    <p className="opacity-90">Ativo desde 15 de Janeiro de 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">R$ 497</p>
                  <p className="opacity-90">/mês</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <Rocket className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-semibold">Ilimitado</p>
                  <p className="text-sm opacity-80">Campanhas</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-semibold">Completo</p>
                  <p className="text-sm opacity-80">Analytics</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <Shield className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-semibold">24/7</p>
                  <p className="text-sm opacity-80">Suporte</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <Globe className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-semibold">White Label</p>
                  <p className="text-sm opacity-80">Personalização</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plans Comparison */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Escolha seu Plano</h2>
              <p className="text-gray-600">Escale seu negócio com o plano ideal para suas necessidades</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative shadow-lg border-0 ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-purple-500 text-white px-4 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        Mais Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                      {index === 0 && <Users className="h-8 w-8 text-white" />}
                      {index === 1 && <Zap className="h-8 w-8 text-white" />}
                      {index === 2 && <Crown className="h-8 w-8 text-white" />}
                      {index === 3 && <Rocket className="h-8 w-8 text-white" />}
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="my-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <CardDescription className="text-sm">{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-gray-400 shrink-0" />
                          )}
                          <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${plan.name === 'Monster' ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                      variant={plan.name === 'Monster' ? 'default' : 'outline'}
                      disabled={plan.name === 'Monster'}
                      onClick={() => {
                        if (plan.name !== 'Monster') {
                          toast({
                            title: `Selecionando ${plan.name}`,
                            description: `Redirecionando para checkout do plano ${plan.name}...`,
                          });
                          setTimeout(() => {
                            setLocation(`/checkout?plan=${plan.name.toLowerCase()}`);
                          }, 1000);
                        }
                      }}
                    >
                      {plan.name === 'Monster' ? 'Plano Atual' : 'Escolher Plano'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Billing Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Método de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-600">Expira em 12/2027</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Alterando Cartão",
                        description: "Redirecionando para página segura de pagamento...",
                      });
                    }}
                  >
                    Alterar
                  </Button>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Dados de Faturamento</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Nome:</span> João Silva</p>
                    <p><span className="font-medium">E-mail:</span> joao@empresa.com</p>
                    <p><span className="font-medium">CPF:</span> •••.•••.•••-42</p>
                    <p><span className="font-medium">Endereço:</span> São Paulo, SP</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => {
                      toast({
                        title: "Editando Dados",
                        description: "Abrindo formulário para atualizar informações de faturamento...",
                      });
                    }}
                  >
                    Editar Dados
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Próximos Pagamentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { date: "15 Fev 2025", amount: "R$ 497,00", status: "Pendente" },
                    { date: "15 Mar 2025", amount: "R$ 497,00", status: "Agendado" },
                    { date: "15 Abr 2025", amount: "R$ 497,00", status: "Agendado" }
                  ].map((payment, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{payment.date}</p>
                        <p className="text-sm text-gray-600">{payment.amount}</p>
                      </div>
                      <Badge variant={payment.status === 'Pendente' ? 'default' : 'secondary'}>
                        {payment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">Economia Anual</span>
                    <Badge className="bg-green-100 text-green-800">
                      15% OFF
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Pague anualmente e economize R$ 894,60 por ano
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Mudando para Anual",
                        description: "Processando mudança para pagamento anual. Economia de R$ 894,60!",
                      });
                      setTimeout(() => {
                        toast({
                          title: "Plano Atualizado!",
                          description: "Agora você paga anualmente e economiza 15%. Próxima cobrança: R$ 5.074,20 em 15/02/2026",
                        });
                      }, 2000);
                    }}
                  >
                    Mudar para Anual
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQs */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  question: "Posso cancelar a qualquer momento?",
                  answer: "Sim, você pode cancelar sua assinatura a qualquer momento. O acesso continuará até o final do período pago."
                },
                {
                  question: "Como funciona o upgrade de plano?",
                  answer: "O upgrade é imediato e você paga apenas a diferença proporcional até o próximo ciclo de cobrança."
                },
                {
                  question: "Há garantia de reembolso?",
                  answer: "Oferecemos garantia de 30 dias para todos os planos pagos. Sem perguntas, sem complicações."
                },
                {
                  question: "Os dados são migrados automaticamente?",
                  answer: "Sim, todos os seus dados, campanhas e configurações são mantidos durante mudanças de plano."
                }
              ].map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}