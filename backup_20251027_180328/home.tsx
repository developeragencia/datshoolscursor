import { useState, useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RocketIcon, ChevronRight, CheckCircle, Clock, Target, Zap, BarChart2, Send, Shield, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import LogoCarousel from "@/components/ui/logo-carousel";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<{ id: string; top: string; left: string; width: string; height: string; opacity: number }[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }).map((_, i) => ({
      id: `star-${i}-${Math.random()}`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      opacity: Math.random() * 0.7 + 0.3
    }));
    setStars(generatedStars);
    setMounted(true);
  }, []);

  return (
    <main className="bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section - Design from Register Page */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20 md:py-32 overflow-hidden">
        {/* Animated Stars Background */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="star absolute bg-white rounded-full"
              style={{
                top: star.top,
                left: star.left,
                width: star.width,
                height: star.height,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>

        {/* Animated Gradient Blobs */}
        <div className="absolute top-[15%] left-[10%] w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 opacity-20 blur-md" />
        <div className="absolute bottom-[10%] right-[15%] w-60 h-60 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 opacity-20 blur-md" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Plataforma #1 de UTM Tracking</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Transforme Dados em
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-200">
                  Resultados Reais
                </span>
              </h1>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto lg:mx-0">
                Rastreie, analise e otimize suas campanhas de marketing com precisão cirúrgica. 
                Aumente seu ROI em até 40% com insights acionáveis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/register" className="group bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-2xl flex items-center justify-center" data-testid="link-hero-register">
                  Começar gratuitamente
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#features" className="bg-transparent border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center" data-testid="link-hero-demo">
                  Ver demonstração
                </a>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-8 mt-10">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold">10k+</div>
                  <div className="text-sm text-purple-200">Usuários ativos</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold">50M+</div>
                  <div className="text-sm text-purple-200">UTMs rastreadas</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm text-purple-200">Satisfação</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-2xl">
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Dashboard Analytics</h3>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-2xl font-bold">R$ 125k</div>
                        <div className="text-sm text-purple-200">Receita Total</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-2xl font-bold">3.2x</div>
                        <div className="text-sm text-purple-200">ROAS Médio</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-2xl font-bold">847</div>
                        <div className="text-sm text-purple-200">Conversões</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-2xl font-bold">+18%</div>
                        <div className="text-sm text-purple-200">vs. Mês Ant.</div>
                      </div>
                    </div>
                  </div>
                </div>
                {mounted && (
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-xl animate-float">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 rounded-full p-2">
                        <RocketIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Performance</div>
                        <div className="text-2xl font-bold">+42%</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Modern Cards */}
      <div id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Recursos Poderosos
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tudo que você precisa para dominar suas campanhas de marketing digital
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-14 w-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Rastreamento Preciso</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Saiba exatamente quantas vendas cada campanha gerou. Escale com confiança e precisão cirúrgica.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 h-14 w-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Otimização Rápida</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Ajuste campanhas direto pelo dashboard. Sem perder tempo abrindo múltiplas plataformas.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 h-14 w-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Analytics Avançado</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Visualizações poderosas e insights acionáveis para tomar decisões baseadas em dados.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 h-14 w-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Automação Inteligente</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Configure regras automáticas e deixe o sistema otimizar suas campanhas 24/7.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 h-14 w-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Send className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Integração WhatsApp</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Leve seus leads direto para onde a venda acontece. Aumente conversões com atendimento ágil.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 h-14 w-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Segurança Total</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Seus dados e criativos estão 100% protegidos. Privacidade e segurança em primeiro lugar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Garantia */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-12 text-center border border-white/20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              7 Dias de Garantia Incondicional
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Teste a plataforma sem riscos. Se não estiver 100% satisfeito, devolvemos seu dinheiro. 
              Simples assim.
            </p>
            <Link href="/pricing" className="inline-flex items-center bg-white text-purple-600 hover:bg-purple-50 px-10 py-5 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-2xl" data-testid="link-cta-pricing">
              Ver planos e preços
              <ChevronRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Integration Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Integre com Tudo
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Conecte-se com as principais plataformas de pagamento e marketing do mercado
            </p>
          </div>

          <LogoCarousel
            logos={[
              { src: "/logos/eduzz.png", alt: "Eduzz" },
              { src: "/logos/hotmart.png", alt: "Hotmart" },
              { src: "/logos/kiwify.png", alt: "Kiwify" },
              { src: "/logos/monetizze.png", alt: "Monetizze" },
              { src: "/logos/perfectpay.png", alt: "PerfectPay" },
              { src: "/logos/shopify.png", alt: "Shopify" },
              { src: "/logos/meta-ads.png", alt: "Meta Ads" },
              { src: "/logos/google-ads.svg", alt: "Google Ads" },
            ]}
            className="mb-10"
            speed={25}
          />

          <div className="text-center mt-8">
            <Link href="/integrations" className="inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-700 dark:hover:text-purple-300 text-lg group" data-testid="link-view-integrations">
              Ver todas as 50+ integrações
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Tire suas dúvidas sobre a plataforma</p>
          </div>

          <div className="max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl shadow-lg">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-purple-600 dark:hover:text-purple-400">
                  Quais plataformas estão disponíveis para integração?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-2">
                  <p className="mb-2">
                    Oferecemos integração com mais de 50 plataformas, incluindo: Meta Ads, Kiwify, Hotmart, Eduzz, 
                    Monetizze, PerfectPay, Shopify, Woocommerce e muitas outras.
                  </p>
                  <p>
                    Se precisar de uma integração específica, entre em contato para priorizarmos.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-purple-600 dark:hover:text-purple-400">
                  Vendas recusadas consomem meu limite?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-2">
                  Não! Apenas vendas aprovadas contam no seu limite. Reembolsos, chargebacks e recusas não são contabilizados.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-purple-600 dark:hover:text-purple-400">
                  É difícil configurar as integrações?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-2">
                  Não! O processo é extremamente simples. Siga nosso passo a passo e você conclui em menos de 5 minutos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-purple-600 dark:hover:text-purple-400">
                  Posso cancelar quando quiser?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-2">
                  Sim! Cancele a qualquer momento, sem multas ou taxas adicionais. Sem burocracia.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-purple-600 dark:hover:text-purple-400">
                  Meus criativos ficam seguros?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-2">
                  Totalmente! Não armazenamos nem acessamos seus criativos. Usamos apenas dados de identificação para rastreamento.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-purple-600 dark:hover:text-purple-400">
                  Como funciona o suporte?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-2">
                  Oferecemos suporte via WhatsApp, email e chat. Nossa equipe está pronta para ajudar você a ter sucesso!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Pronto para Decolar?
          </h2>
          <p className="text-2xl text-purple-100 mb-10 max-w-3xl mx-auto">
            Junte-se a milhares de profissionais que já transformaram seus resultados com Dashtools
          </p>
          <Link href="/register" className="inline-flex items-center bg-white text-purple-600 hover:bg-purple-50 px-12 py-6 rounded-full font-bold text-xl transition-all transform hover:scale-105 shadow-2xl" data-testid="link-final-cta-register">
            Começar agora gratuitamente
            <RocketIcon className="ml-3 w-6 h-6" />
          </Link>
          <p className="text-purple-100 mt-6">Sem cartão de crédito • Cancele quando quiser</p>
        </div>
      </div>

      <Footer />

      {mounted && (
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }

          .star {
            animation: twinkle linear infinite;
            animation-duration: calc(5s + (var(--i, 0) * 0.5s));
          }

          @keyframes blob {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            25% {
              transform: translate(20px, -50px) scale(1.1);
            }
            50% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            75% {
              transform: translate(50px, 50px) scale(1.05);
            }
          }

          .animate-blob {
            animation: blob 7s infinite;
          }

          .animation-delay-2000 {
            animation-delay: 2s;
          }

          .animation-delay-4000 {
            animation-delay: 4s;
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      )}
    </main>
  );
}
