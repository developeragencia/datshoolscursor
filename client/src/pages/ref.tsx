import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Gift, 
  Users, 
  DollarSign, 
  Trophy,
  Copy,
  Check,
  Star,
  ArrowRight,
  Zap,
  TrendingUp,
  Target,
  Calendar,
  Share2,
  Link as LinkIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Página de Landing para Links de Referência
export default function RefPage() {
  const [match, params] = useRoute("/ref/:code");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [referralCode] = useState(params?.code || "BD123456");
  
  // Dados do indicador (simulado - em produção viria da API)
  const referrer = {
    name: "João Silva",
    avatar: "/placeholder-avatar.jpg",
    level: "Especialista",
    totalReferrals: 47,
    earnings: 8540.50,
    joinDate: "Janeiro 2024"
  };

  // Benefícios para novos usuários
  const benefits = [
    {
      icon: Gift,
      title: "30 dias grátis Premium",
      description: "Acesso completo a todas as funcionalidades premium por 1 mês",
      value: "R$ 97",
      color: "purple"
    },
    {
      icon: Zap,
      title: "Setup Personalizado",
      description: "Configuração completa do seu dashboard por especialista",
      value: "R$ 297",
      color: "blue"
    },
    {
      icon: Target,
      title: "Consultoria Gratuita",
      description: "1 hora de consultoria para otimizar suas campanhas",
      value: "R$ 197",
      color: "green"
    },
    {
      icon: TrendingUp,
      title: "Templates Exclusivos",
      description: "Acesso a templates de alta performance já testados",
      value: "R$ 147",
      color: "orange"
    }
  ];

  const features = [
    "Rastreamento preciso de UTMs",
    "Integração com 70+ plataformas",
    "Dashboard em tempo real",
    "Automação inteligente",
    "Suporte prioritário 24/7",
    "Relatórios avançados"
  ];

  const plans = [
    {
      name: "Premium",
      price: "97",
      originalPrice: "147",
      discount: "34% OFF",
      period: "/mês",
      features: [
        "Até 50 campanhas",
        "10 UTM links por campanha",
        "Integrações básicas",
        "Dashboard padrão",
        "Suporte por email"
      ],
      recommended: false
    },
    {
      name: "Avançado",
      price: "197",
      originalPrice: "297",
      discount: "34% OFF",
      period: "/mês",
      features: [
        "Campanhas ilimitadas",
        "UTM links ilimitados",
        "Todas as integrações",
        "Dashboard personalizado",
        "Automação avançada",
        "Suporte prioritário"
      ],
      recommended: true
    },
    {
      name: "Monster",
      price: "497",
      originalPrice: "747",
      discount: "34% OFF",
      period: "/mês",
      features: [
        "Tudo do Avançado",
        "Multi-usuários (até 10)",
        "API personalizada",
        "Gerente dedicado",
        "Treinamento exclusivo",
        "White-label"
      ],
      recommended: false
    }
  ];

  const testimonials = [
    {
      name: "Maria Santos",
      role: "Digital Marketer",
      avatar: "/placeholder-avatar.jpg",
      text: "Consegui aumentar meu ROAS em 40% nas primeiras semanas usando o Bueiro Digital. A precisão no rastreamento é incrível!",
      rating: 5
    },
    {
      name: "Carlos Oliveira",
      role: "E-commerce Owner",
      avatar: "/placeholder-avatar.jpg", 
      text: "Finalmente consigo saber exatamente de onde vêm minhas vendas. O ROI da ferramenta se pagou em menos de 1 mês.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Agência Digital",
      avatar: "/placeholder-avatar.jpg",
      text: "Uso para todos os meus clientes. A integração com Hotmart e Kiwify é perfeita. Recomendo muito!",
      rating: 5
    }
  ];

  const copyReferralLink = () => {
    const link = `https://app.bueirodigital.com.br/ref/${referralCode}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      toast({
        title: "Link copiado!",
        description: "Link de indicação copiado para área de transferência"
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSignUp = (planName: string) => {
    // Redirecionar para registro com código de referência e plano
    setLocation(`/register?ref=${referralCode}&plan=${planName.toLowerCase()}`);
  };

  if (!match) {
    setLocation("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BD</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Bueiro Digital</span>
            </div>
            <Button onClick={() => setLocation("/login")} variant="outline">
              Já tenho conta
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Referrer Info */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Avatar className="w-16 h-16">
                <AvatarImage src={referrer.avatar} alt={referrer.name} />
                <AvatarFallback className="bg-blue-600 text-white text-lg font-bold">
                  {referrer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-900">{referrer.name}</h3>
                  <Badge className="bg-gold-100 text-gold-800">
                    <Trophy className="w-3 h-3 mr-1" />
                    {referrer.level}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {referrer.totalReferrals} indicações • Membro desde {referrer.joinDate}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-8">
              <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                Oferta Especial para Você! 🎯
              </h1>
              <p className="text-xl lg:text-2xl opacity-90 mb-6">
                Comece com <span className="font-bold">R$ 738 em bônus</span> e rastreie suas vendas com precisão
              </p>
              <div className="flex items-center justify-center gap-2 text-lg">
                <Calendar className="w-5 h-5" />
                <span>Oferta válida por tempo limitado</span>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                      benefit.color === 'purple' ? 'bg-purple-100' :
                      benefit.color === 'blue' ? 'bg-blue-100' :
                      benefit.color === 'green' ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      <benefit.icon className={`w-6 h-6 ${
                        benefit.color === 'purple' ? 'text-purple-600' :
                        benefit.color === 'blue' ? 'text-blue-600' :
                        benefit.color === 'green' ? 'text-green-600' : 'text-orange-600'
                      }`} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{benefit.description}</p>
                    <Badge variant="secondary" className="font-bold">
                      Valor: {benefit.value}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Escolha seu Plano com Desconto Exclusivo
            </h2>
            <p className="text-xl text-gray-600">
              Desconto especial de 34% por ser indicação de {referrer.name}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.recommended ? 'ring-2 ring-blue-500 shadow-xl scale-105' : 'shadow-lg'}`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-6 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <Badge variant="secondary" className="text-green-700 bg-green-100 mb-4">
                      {plan.discount}
                    </Badge>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold text-gray-900">R$ {plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      De R$ {plan.originalPrice}{plan.period}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.recommended ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    size="lg"
                    onClick={() => handleSignUp(plan.name)}
                  >
                    Começar Agora
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o Bueiro Digital?
            </h2>
            <p className="text-xl text-gray-600">
              A plataforma mais completa para rastreamento de vendas no Brasil
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              O que nossos clientes dizem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Pronto para escalar suas vendas?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Junte-se a mais de 10.000 empreendedores que já aumentaram suas vendas com o Bueiro Digital
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => handleSignUp("avançado")}
            >
              Começar Teste Grátis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={copyReferralLink}
            >
              {copied ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
              {copied ? "Link Copiado!" : "Compartilhar Oferta"}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BD</span>
            </div>
            <span className="text-lg font-bold">Bueiro Digital</span>
          </div>
          <p className="text-gray-400">
            © 2025 Bueiro Digital. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Desenvolvido por Alex Developer
          </p>
        </div>
      </footer>
    </div>
  );
}