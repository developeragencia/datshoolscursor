import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageCircle, 
  Shield,
  Zap,
  Trophy,
  ArrowLeft,
  ExternalLink,
  Phone,
  Code,
  DollarSign,
  Globe,
  Settings,
  HeadphonesIcon,
  Rocket
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AguardandoPagamento() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(2);

  // Page is accessible on all domains now
  useEffect(() => {
    // Página aguardando pagamento carregada
  }, []);

  const handleWhatsAppContact = () => {
    const phoneNumber = "5587999272064";
    const message = encodeURIComponent(
      "Olá Alex! Preciso acertar o pagamento do projeto Bueiro Digital. Pode me passar os dados para transferência? Quero que publique no domínio alexdesenvolvedor.com.br assim que possível."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    
    toast({
      title: "WhatsApp aberto",
      description: "Converse diretamente com Alex Developer",
    });
  };

  const projectSteps = [
    { 
      id: 1, 
      title: "Desenvolvimento", 
      status: "completed", 
      description: "Sistema completo desenvolvido",
      details: "Todas as funcionalidades implementadas com sucesso",
      icon: "code"
    },
    { 
      id: 2, 
      title: "Pagamento", 
      status: "current", 
      description: "Aguardando pagamento do desenvolvedor",
      details: "Processamento do pagamento pendente - contate Alex Developer",
      icon: "dollar"
    },
    { 
      id: 3, 
      title: "Publicação no Domínio", 
      status: "pending", 
      description: "Configuração do domínio oficial",
      details: "Aguardando confirmação do pagamento para iniciar",
      icon: "globe"
    },
    { 
      id: 4, 
      title: "Configurações Finais", 
      status: "pending", 
      description: "SSL, DNS e otimizações",
      details: "Certificados de segurança e configurações de performance",
      icon: "settings"
    },
    { 
      id: 5, 
      title: "Suporte 30 Dias", 
      status: "pending", 
      description: "Ajustes e alterações inclusos",
      details: "Suporte técnico completo por 30 dias após publicação",
      icon: "support"
    },
    { 
      id: 6, 
      title: "Go Live", 
      status: "pending", 
      description: "Sistema no ar para produção",
      details: "Plataforma totalmente operacional para usuários finais",
      icon: "rocket"
    }
  ];

  const features = [
    "✅ Sistema de rastreamento UTM completo",
    "✅ Integração com 80+ plataformas brasileiras",
    "✅ Dashboard de vendas em tempo real",
    "✅ Sistema de pagamento PIX automático",
    "✅ Webhooks funcionais para todas as plataformas",
    "✅ Área administrativa completa",
    "✅ Sistema PWA mobile otimizado",
    "✅ Autenticação e controle de acesso"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setLocation("/")}
                className="flex-shrink-0"
              >
                <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                Voltar
              </Button>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Aguardando Publicação</h1>
                <p className="text-xs sm:text-sm text-gray-600 truncate">alexdesenvolvedor.com.br</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 self-start sm:self-auto flex-shrink-0">
              <Clock className="h-3 w-3 mr-1" />
              Em Andamento
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
        {/* Status Principal */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-10 w-10 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl text-gray-900 px-2">
              Sistema Pronto - Aguardando Pagamento do Desenvolvedor
            </CardTitle>
            <CardDescription className="text-sm sm:text-base px-4">
              O Bueiro Digital está 100% funcional. Entre em contato com Alex Developer para acertar o pagamento e iniciar a publicação
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Progresso do Projeto */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Progresso do Projeto</h3>
                <span className="text-sm text-gray-600">33% Concluído</span>
              </div>
              <Progress value={33} className="h-3" />
              
              {/* Grid de Etapas Detalhadas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                {projectSteps.map((step) => {
                  const getIcon = (iconType: string) => {
                    switch(iconType) {
                      case 'code': return <Code className="h-6 w-6" />;
                      case 'dollar': return <DollarSign className="h-6 w-6" />;
                      case 'globe': return <Globe className="h-6 w-6" />;
                      case 'settings': return <Settings className="h-6 w-6" />;
                      case 'support': return <HeadphonesIcon className="h-6 w-6" />;
                      case 'rocket': return <Rocket className="h-6 w-6" />;
                      default: return <CheckCircle className="h-6 w-6" />;
                    }
                  };

                  return (
                    <Card key={step.id} className={`relative border-2 transition-all duration-200 ${
                      step.status === 'completed' ? 'border-green-200 bg-green-50' :
                      step.status === 'current' ? 'border-blue-200 bg-blue-50 shadow-md' :
                      'border-gray-200 bg-gray-50'
                    }`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            step.status === 'completed' ? 'bg-green-500 text-white' :
                            step.status === 'current' ? 'bg-blue-500 text-white' :
                            'bg-gray-300 text-gray-600'
                          }`}>
                            {step.status === 'completed' ? <CheckCircle className="h-4 w-4" /> : getIcon(step.icon)}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-sm font-semibold">
                              {step.title}
                            </CardTitle>
                            <Badge 
                              variant={
                                step.status === 'completed' ? 'default' :
                                step.status === 'current' ? 'default' : 'secondary'
                              }
                              className={`text-xs mt-1 ${
                                step.status === 'completed' ? 'bg-green-100 text-green-800' :
                                step.status === 'current' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {step.status === 'completed' ? 'Concluído' :
                               step.status === 'current' ? 'Em Andamento' : 'Aguardando'}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-700 mb-2">{step.description}</p>
                        <p className="text-xs text-gray-600">{step.details}</p>
                      </CardContent>
                      
                      {/* Status Indicator */}
                      <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
                        step.status === 'completed' ? 'bg-green-500' :
                        step.status === 'current' ? 'bg-blue-500 animate-pulse' :
                        'bg-gray-300'
                      }`} />
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Contato WhatsApp */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <h3 className="font-semibold text-green-800 text-sm sm:text-base">Acertar Pagamento</h3>
              </div>
              <p className="text-green-700 mb-3 sm:mb-4 text-sm sm:text-base">
                Entre em contato diretamente com Alex Developer para acertar o pagamento do projeto e iniciar a publicação no domínio oficial:
              </p>
              <Button 
                onClick={handleWhatsAppContact}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm py-2 sm:py-3"
              >
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="truncate">Acertar Pagamento - WhatsApp: (87) 99927-2064</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Funcionalidades Implementadas */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Funcionalidades Implementadas
            </CardTitle>
            <CardDescription>
              Sistema completo com todas as funcionalidades solicitadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="text-green-500 flex-shrink-0">{feature.split(' ')[0]}</span>
                  <span className="text-gray-700">{feature.substring(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Informações Técnicas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span>SSL/HTTPS</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Autenticação</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Dados Criptografados</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span>Carregamento Rápido</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>PWA Mobile</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Otimização SEO</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                Integrações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span>80+ Plataformas</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>APIs Conectadas</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Webhooks Ativos</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center py-4 sm:py-6 px-4">
          <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
            Desenvolvido por <strong>Alex Developer</strong>
          </p>
          <p className="text-xs text-gray-500">
            WhatsApp: (87) 99927-2064 | alexdesenvolvedor.com.br
          </p>
        </div>
      </div>
    </div>
  );
}