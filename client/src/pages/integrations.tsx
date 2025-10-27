import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { 
  Search, 
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Zap,
  Sparkles,
  Globe
} from "lucide-react";

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stars, setStars] = useState<{ id: string; top: string; left: string; width: string; height: string; opacity: number }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const generatedStars = Array.from({ length: 80 }).map((_, i) => ({
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

  const integrations = [
    // Plataformas de Infoprodutos
    { name: "Hotmart", category: "infoproducts", popular: true, logo: "/logos/hotmart.png" },
    { name: "Kiwify", category: "infoproducts", popular: true, logo: "/logos/kiwify.png" },
    { name: "Eduzz", category: "infoproducts", popular: true, logo: "/logos/eduzz.png" },
    { name: "Monetizze", category: "infoproducts", popular: true, logo: "/logos/monetizze.png" },
    { name: "Braip", category: "infoproducts", logo: null },
    { name: "Guru", category: "infoproducts", logo: null },
    { name: "Hubla", category: "infoproducts", logo: null },
    { name: "Adoorei", category: "infoproducts", logo: null },
    { name: "Ticto", category: "infoproducts", logo: null },
    { name: "IExperience", category: "infoproducts", logo: null },
    { name: "Masterfy", category: "infoproducts", logo: null },
    { name: "Systeme", category: "infoproducts", logo: null },
    { name: "Hebreus", category: "infoproducts", logo: null },
    
    // E-commerce
    { name: "Shopify", category: "ecommerce", popular: true, logo: "/logos/shopify.png" },
    { name: "Woocommerce", category: "ecommerce", popular: true, logo: null },
    { name: "Yampi", category: "ecommerce", logo: null },
    { name: "Cartpanda", category: "ecommerce", logo: null },
    { name: "Doppus", category: "ecommerce", logo: null },
    { name: "Maxweb", category: "ecommerce", logo: null },
    { name: "Zouti", category: "ecommerce", logo: null },
    { name: "Appmax", category: "ecommerce", logo: null },
    
    // Pagamentos
    { name: "PerfectPay", category: "payments", popular: true, logo: "/logos/perfectpay.png" },
    { name: "Clickbank", category: "payments", logo: null },
    { name: "IronPay", category: "payments", logo: null },
    { name: "FortPay", category: "payments", logo: null },
    { name: "Logzz", category: "payments", logo: null },
    { name: "Pantherfy", category: "payments", logo: null },
    { name: "Lastlink", category: "payments", logo: null },
    { name: "MundPay", category: "payments", logo: null },
    { name: "SigmaPagamentos", category: "payments", logo: null },
    { name: "BearPay", category: "payments", logo: null },
    { name: "KlivoPay", category: "payments", logo: null },
    { name: "Frendz", category: "payments", logo: null },
    { name: "PagTrust", category: "payments", logo: null },
    { name: "Paradise", category: "payments", logo: null },
    { name: "Orbita", category: "payments", logo: null },
    { name: "SoutPay", category: "payments", logo: null },
    { name: "VittaPay", category: "payments", logo: null },
    { name: "AllPay", category: "payments", logo: null },
    { name: "NezzyPay", category: "payments", logo: null },
    { name: "InvictusPay", category: "payments", logo: null },
    { name: "AtomoPay", category: "payments", logo: null },
    { name: "WolfPay", category: "payments", logo: null },
    { name: "Kirvano", category: "payments", logo: null },
    { name: "StrivPay", category: "payments", logo: null },
    { name: "BuyGoods", category: "payments", logo: null },
    { name: "WeGate", category: "payments", logo: null },
    { name: "CinqPay", category: "payments", logo: null },
    { name: "TrivexPay", category: "payments", logo: null },
    { name: "InovaPag", category: "payments", logo: null },
    { name: "Wise2Pay", category: "payments", logo: null },
    { name: "AmandisPay", category: "payments", logo: null },
    { name: "Plumify", category: "payments", logo: null },
    { name: "FluxionPay", category: "payments", logo: null },
    { name: "OctusPay", category: "payments", logo: null },
    { name: "Zippify", category: "payments", logo: null },
    { name: "Pepper", category: "payments", logo: null },
    { name: "DigiPag", category: "payments", logo: null },
    { name: "BullPay", category: "payments", logo: null },
    { name: "GoatPay", category: "payments", logo: null },
    { name: "Digistore", category: "payments", logo: null },
    { name: "PMHMPay", category: "payments", logo: null },
    { name: "Vega", category: "payments", logo: null },
    { name: "Unicornify", category: "payments", logo: null },
    { name: "NitroPagamentos", category: "payments", logo: null },
    { name: "Payt", category: "payments", logo: null },
    { name: "Nexopayt", category: "payments", logo: null },
    { name: "SharkPays", category: "payments", logo: null },
    { name: "Disrupty", category: "payments", logo: null },
    { name: "GatPay", category: "payments", logo: null },
    { name: "Allpes", category: "payments", logo: null },
    { name: "Greenn", category: "payments", logo: null },
    { name: "TriboPay", category: "payments", logo: null },
    
    // Marketing & Analytics
    { name: "Meta Ads", category: "marketing", popular: true, logo: "/logos/meta-ads.png" },
    { name: "Google Ads", category: "marketing", popular: true, logo: "/logos/google-ads.svg" },
    { name: "TikTok Ads", category: "marketing", popular: true, logo: null },
  ];

  const categories = [
    { id: "all", label: "Todas", icon: Globe },
    { id: "infoproducts", label: "Infoprodutos", icon: Sparkles },
    { id: "ecommerce", label: "E-commerce", icon: Zap },
    { id: "payments", label: "Pagamentos", icon: CheckCircle },
    { id: "marketing", label: "Marketing", icon: ExternalLink },
  ];

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularCount = integrations.filter(i => i.popular).length;
  const totalCount = integrations.length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section com design da página de Register */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-16 md:py-24 overflow-hidden">
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

        {/* Gradient Blobs */}
        <div className="absolute top-[15%] left-[10%] w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 opacity-20 blur-md" />
        <div className="absolute bottom-[10%] right-[15%] w-60 h-60 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 opacity-20 blur-md" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para a página inicial
              </Button>
            </Link>
            
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">70+ Integrações Disponíveis</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Integre com Todas as Principais Plataformas
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Conecte-se com as melhores ferramentas de infoprodutos, e-commerce, pagamentos e marketing digital
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">{popularCount}</span>
                </div>
                <span>Mais Populares</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">{totalCount}</span>
                </div>
                <span>Total de Integrações</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-gray-50 dark:bg-gray-800 py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="w-full lg:w-96 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Buscar integração..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`h-10 ${selectedCategory === category.id ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {category.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {filteredIntegrations.length === 0 ? (
              <div className="text-center py-20">
                <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Nenhuma integração encontrada
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tente ajustar seus filtros de busca
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {filteredIntegrations.length} {filteredIntegrations.length === 1 ? 'Integração Encontrada' : 'Integrações Encontradas'}
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {filteredIntegrations.map((integration, index) => (
                    <div
                      key={integration.name}
                      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 dark:border-gray-700"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {integration.popular && (
                        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                          Popular
                        </Badge>
                      )}

                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          {integration.logo ? (
                            <img 
                              src={integration.logo} 
                              alt={integration.name}
                              className="w-12 h-12 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <span className={`text-2xl font-bold text-blue-600 dark:text-blue-400 ${integration.logo ? 'hidden' : ''}`}>
                            {integration.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>

                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white text-center mb-2">
                          {integration.name}
                        </h3>

                        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize mb-3">
                          {integration.category === 'infoproducts' ? 'Infoprodutos' : 
                           integration.category === 'ecommerce' ? 'E-commerce' :
                           integration.category === 'payments' ? 'Pagamentos' : 
                           integration.category === 'marketing' ? 'Marketing' : integration.category}
                        </span>

                        <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          <span>Disponível</span>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Não encontrou sua plataforma?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e solicite a integração que você precisa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg">
                Começar Agora Grátis
              </Button>
            </Link>
            <a
              href="https://wa.me/5587999272064"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                <ExternalLink className="mr-2 h-5 w-5" />
                Solicitar Integração
              </Button>
            </a>
          </div>
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
        `}</style>
      )}
    </div>
  );
}
