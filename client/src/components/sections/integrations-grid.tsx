import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function IntegrationsGrid() {
  const platforms = [
    "Hotmart",
    "Kiwify", 
    "Eduzz",
    "Monetizze",
    "Shopify",
    "Woocommerce",
    "Braip",
    "Clickbank",
    "Yampi",
    "PerfectPay",
    "Hubla",
    "Guru",
    "IronPay",
    "FortPay",
    "Logzz",
    "Pantherfy",
    "Lastlink",
    "MundPay",
    "SigmaPagamentos",
    "BearPay",
    "KlivoPay",
    "Frendz",
    "PagTrust",
    "Paradise",
    "Orbita",
    "SoutPay",
    "VittaPay",
    "AllPay",
    "NezzyPay",
    "InvictusPay",
    "AtomoPay",
    "Adoorei",
    "Ticto",
    "IExperience",
    "WolfPay",
    "Kirvano",
    "Doppus",
    "Maxweb",
    "StrivPay",
    "BuyGoods",
    "Zouti",
    "WeGate",
    "CinqPay",
    "TrivexPay",
    "Cartpanda",
    "InovaPag",
    "Wise2Pay",
    "AmandisPay",
    "Plumify",
    "FluxionPay",
    "Masterfy",
    "OctusPay",
    "Zippify",
    "Pepper",
    "DigiPag",
    "BullPay",
    "GoatPay",
    "Digistore",
    "PMHMPay",
    "Vega",
    "Unicornify",
    "Systeme",
    "Appmax",
    "Hebreus",
    "NitroPagamentos",
    "Payt",
    "Nexopayt",
    "SharkPays",
    "Disrupty",
    "GatPay",
    "Allpes",
    "Greenn",
    "TriboPay",
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden particles">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Integramos com as melhores plataformas do mercado!
          </h2>
          <p className="text-lg text-gray-600">
            <Link
              href="/integracoes"
              className="text-primary-600 hover:text-primary-700 underline hover-lift"
            >
              (mais plataformas em breve, confira a lista completa)
            </Link>
          </p>
        </div>

        {/* Platform Integration Grid */}
        <div className="max-w-7xl mx-auto animate-scale-in" style={{animationDelay: '0.3s'}}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4">
            {platforms.slice(0, 24).map((platform, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-4 card-hover transition-all duration-300 flex items-center justify-center h-20 relative overflow-hidden animate-scale-in"
                style={{animationDelay: `${0.5 + (index * 0.05)}s`}}
              >
                <div className="w-10 h-10 relative z-10">
                  <img
                    src={`https://app.utmify.com.br/icons/platforms/${platform}.png`}
                    alt={platform}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const colors = ['3B82F6', '10B981', '8B5CF6', 'F59E0B', 'EF4444', '06B6D4'];
                      const randomColor = colors[Math.floor(Math.random() * colors.length)];
                      target.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><rect width='40' height='40' fill='%23${randomColor}' rx='6'/><text x='20' y='26' text-anchor='middle' fill='white' font-size='10' font-weight='bold'>${platform.substring(0,2).toUpperCase()}</text></svg>`;
                    }}
                  />
                </div>
                
                {/* Tooltip com nome da plataforma */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                  {platform}
                </div>
                
                {/* Efeito de hover com gradiente */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>
            ))}
          </div>

          {/* Show more platforms button */}
          <div className="text-center mt-12 animate-slide-in" style={{animationDelay: '1s'}}>
            <Link
              href="/integracoes"
              className="inline-flex items-center bg-gradient-to-r from-primary-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover-glow transition-all duration-300"
            >
              Ver todas as 70+ integrações
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
