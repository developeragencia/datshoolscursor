import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "wouter";

export default function Pricing() {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      description: "Recomendado para quem está começando agora.",
      features: [
        "100% Gratuito",
        "Até 50 Vendas Aprovadas / mês*",
        "1 Conta de Anúncio",
        "1 Webhook",
        "1 Dashboard",
        "1 Pixel de Otimização",
        "Trackeamento para WhatsApp**",
        "Regras Programadas",
        "Suporte VIP"
      ],
      note: "* Sem cobranças adicionais\n** Disponível apenas em planos pagos",
      popular: false
    },
    {
      name: "Premium", 
      price: "R$ 99,90",
      period: "/mês",
      description: "Recomendado para quem já possui uma operação.",
      features: [
        "Tudo do plano Gratuito",
        "Até 1,000 Vendas Aprovadas / mês*",
        "3 Contas de Anúncio",
        "3 Webhooks",
        "3 Dashboards",
        "3 Pixels de Otimização",
        "1 Número de WhatsApp**",
        "3 Regras Programadas",
        "Suporte VIP"
      ],
      note: "* R$ 0,18 por venda extra aprovada\n** R$ 49,90 por WhatsApp adicional",
      popular: true
    },
    {
      name: "Avançado",
      price: "R$ 199,90", 
      period: "/mês",
      description: "Recomendado para quem possui alta escala.",
      features: [
        "Tudo do plano Premium",
        "Até 2,500 Vendas Aprovadas / mês*",
        "7 Contas de Anúncio",
        "7 Webhooks",
        "7 Dashboards",
        "7 Pixels de Otimização",
        "2 Números de WhatsApp**",
        "7 Regras Programadas",
        "Suporte VIP"
      ],
      note: "* R$ 0,15 por venda extra aprovada\n** R$ 49,90 por WhatsApp adicional",
      popular: false
    },
    {
      name: "Monster",
      price: "R$ 299,90", 
      period: "/mês",
      description: "Recomendado para quem já é um monstro da escala.",
      features: [
        "Tudo do plano Avançado",
        "Até 5,000 Vendas Aprovadas / mês*",
        "Contas de Anúncio ILIMITADAS",
        "Webhooks ILIMITADOS",
        "Dashboards ILIMITADOS",
        "Pixels de Otimização ILIMITADOS",
        "3 Números de WhatsApp**",
        "Regras Programadas ILIMITADAS",
        "Suporte VIP"
      ],
      note: "* R$ 0,10 por venda extra aprovada\n** R$ 49,90 por WhatsApp adicional",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Quatro opções para aumentar suas vendas
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Todos os planos incluem rastreio das vendas em tempo real.<br/>
              Escolha o plano que é melhor para você!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto animate-slide-in">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative card-hover ${plan.popular ? 'border-primary-600 shadow-lg scale-105 animate-pulse-glow' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Mais vendido
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600 text-sm">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.note && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 whitespace-pre-line">{plan.note}</p>
                    </div>
                  )}
                </CardContent>

                <CardFooter>
                  <Link href="/register" className="w-full">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-primary-600 hover:bg-primary-700' : plan.name === 'Gratuito' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-gray-900 hover:bg-gray-800'}`}
                    >
                      Escolher plano
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Guarantee Section */}
          <div className="mt-16 bg-gradient-to-r from-emerald-50 to-primary-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ainda na dúvida? Você tem 7 dias de garantia!
            </h3>
            <p className="text-gray-600 mb-6">
              Se não estiver satisfeito com a plataforma você pode pedir reembolso em até 7 dias, entrando em contato conosco via WhatsApp.
            </p>
            <Link href="/register">
              <Button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 text-lg">
                Escolher plano
              </Button>
            </Link>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Ficou com alguma dúvida?
            </h3>
            <p className="text-center text-gray-600 mb-12">
              Dê uma olhada nas perguntas mais frequentes abaixo:
            </p>

            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-white rounded-lg border p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Quais plataformas estão disponíveis para integração?
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Atualmente oferecemos integração com o Meta Ads, Kiwify, IExperience, PerfectPay, Doppus, Orbita, Hotmart, Eduzz, 
                  Kirvano, Vega, Pepper, Ticto, Monetizze, Payt, Zippify, Guru, Greenn, Yampi, Adoorei, Braip, BuyGoods, OctusPay, 
                  Appmax, Cartpanda, TriboPay, Woocommerce, Lastlink, Hubla, Digistore, Logzz, MundPay, Clickbank, StrivPay, Systeme, 
                  Disrupty, Pantherfy, CinqPay, Zouti, NitroPagamentos, SoutPay, Maxweb, Frendz, FortPay, Shopify, PagTrust, WolfPay, 
                  BullPay, FluxionPay, Hebreus, VittaPay, InovaPag, WeGate, PMHMPay, GoatPay, KlivoPay, SigmaPagamentos, InvictusPay, 
                  Paradise, Plumify, Masterfy, NezzyPay, Allpes, TrivexPay, GatPay, DigiPag, BearPay, AtomoPay, Wise2Pay, Unicornify, 
                  AmandisPay, SharkPays, Nexopayt, AllPay e IronPay.
                </p>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Vendas recusadas ou reembolsadas também consomem limite?
                </h4>
                <p className="text-gray-600 text-sm">
                  Não. Se uma venda for recusada, reembolsada ou sofrer chargeback no período de cobrança, ela não será contabilizada 
                  no limite de vendas do seu plano. Contamos apenas as vendas aprovadas.
                </p>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  É muito difícil configurar a integração?
                </h4>
                <p className="text-gray-600 text-sm">
                  Não, é muito fácil! O processo de integração foi projetado para ser extremamente simples e fácil. Basta seguir 
                  o passo a passo disponibilizado que você irá terminar em menos de 5 minutos.
                </p>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  E se um dia eu não precisar mais da plataforma?
                </h4>
                <p className="text-gray-600 text-sm">
                  Sem problemas! Se um dia nossa plataforma não fizer mais sentido para a sua situação, você pode cancelar a 
                  qualquer momento, sem multas ou taxas adicionais.
                </p>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  A plataforma terá acesso aos meus criativos?
                </h4>
                <p className="text-gray-600 text-sm">
                  Não. A plataforma não usa os criativos para nada, apenas os dados de identificação da campanha necessários 
                  para rastrear as vendas. Pode ficar tranquilo que seus criativos estão seguros.
                </p>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Não encontrei minha dúvida aqui, o que fazer?
                </h4>
                <p className="text-gray-600 text-sm">
                  Sem problemas, estamos aqui para te ajudar! Entre em contato conosco pelo WhatsApp (24) 99310-5374 e iremos 
                  te ajudar com qualquer dúvida que você tenha.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
