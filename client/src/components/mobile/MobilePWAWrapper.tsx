import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Target, 
  Facebook, 
  BarChart3, 
  Settings, 
  User,
  Plus,
  TrendingUp,
  DollarSign,
  Eye,
  Menu,
  X,
  Home,
  Bell,
  Search,
  Activity,
  Megaphone,
  Globe,
  Smartphone,
  Users,
  Zap,
  Receipt,
  FileText,
  Layers,
  Link as LinkIcon,
  Code,
  MousePointer,
  Webhook,
  Database,
  MessageSquare,
  Monitor,
  CreditCard,
  Shield,
  HelpCircle,
  Rocket,
  Gift,
  Calendar,
  ChevronDown,
  ChevronRight,
  Share,
  Clock,
  AlertCircle,
  CheckCircle
} from "lucide-react";

// Menu estruturado igual à versão desktop
const mobileMenuItems = [
  {
    title: "Visão Geral",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: Home },
      { name: "Resumo", href: "/resumo", icon: BarChart3 },
      { name: "Análise", href: "/analise", icon: Activity }
    ]
  },
  {
    title: "Campanhas",
    items: [
      { name: "Gerenciar Campanhas", href: "/campanhas", icon: Target },
      { name: "Meta Ads", href: "/meta-ads", icon: Megaphone },
      { name: "Google Ads", href: "/google-ads", icon: Globe },
      { name: "TikTok Ads", href: "/tiktok-ads", icon: Smartphone },
      { name: "Contas Facebook", href: "/facebook-accounts", icon: Users },
      { name: "Regras Automatizadas", href: "/regras-automatizadas", icon: Zap }
    ]
  },
  {
    title: "Vendas & Conversões",
    items: [
      { name: "Vendas", href: "/vendas", icon: DollarSign },
      { name: "Conversões", href: "/conversoes", icon: TrendingUp },
      { name: "Despesas", href: "/despesas", icon: Receipt },
      { name: "Relatórios", href: "/relatorios", icon: FileText },
      { name: "Funil de Vendas", href: "/funil", icon: Layers }
    ]
  },
  {
    title: "UTM & Tracking",
    items: [
      { name: "Links UTM", href: "/utm-links", icon: LinkIcon },
      { name: "Scripts de Página", href: "/scripts", icon: Code },
      { name: "Pixel Tracking", href: "/pixels", icon: MousePointer },
      { name: "Atribuição", href: "/atribuicao", icon: Target }
    ]
  },
  {
    title: "Integrações",
    items: [
      { name: "Webhooks", href: "/webhooks", icon: Webhook },
      { name: "APIs", href: "/apis", icon: Database },
      { name: "Plataformas", href: "/integracoes", icon: Layers },
      { name: "WhatsApp", href: "/whatsapp", icon: MessageSquare }
    ]
  },
  {
    title: "Dashboards",
    items: [
      { name: "Múltiplos Dashboards", href: "/multiplos-dashboards", icon: Monitor },
      { name: "Personalizar", href: "/personalizar-dashboard", icon: Settings },
      { name: "Compartilhar", href: "/compartilhar", icon: Users }
    ]
  },
  {
    title: "Configurações",
    items: [
      { name: "Conta", href: "/configuracoes", icon: Settings },
      { name: "Plano & Faturamento", href: "/plano", icon: CreditCard },
      { name: "Usuários", href: "/usuarios", icon: Users },
      { name: "Segurança", href: "/seguranca", icon: Shield },
      { name: "Notificações", href: "/notificacoes", icon: Bell }
    ]
  },
  {
    title: "Outros",
    items: [
      { name: "Tutorial Admin", href: "/admin-tutorial", icon: FileText },
      { name: "Ajuda", href: "/ajuda", icon: HelpCircle },
      { name: "Contato", href: "/contato", icon: MessageSquare },
      { name: "Novidades", href: "/novidades", icon: Rocket },
      { name: "Indique & Ganhe", href: "/indique-ganhe", icon: Gift },
      { name: "Retrospectivas", href: "/retrospectivas", icon: Calendar },
      { name: "Suporte", href: "/suporte", icon: HelpCircle },
      { name: "Aguardando Pagamento", href: "/aguardando-pagamento", icon: Clock }
    ]
  }
];

interface MobilePWAWrapperProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
}

export default function MobilePWAWrapper({ children, title = "Dashboard", showBackButton = false }: MobilePWAWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['Visão Geral']);
  const [, setLocation] = useLocation();

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(s => s !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBackButton ? (
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <X className="h-5 w-5" />
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Bueiro Digital</h1>
                <p className="text-xs text-gray-600">{title}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content - This wraps the actual desktop page */}
      <div className="pb-20">
        {children}
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 w-80 h-full bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="h-4 w-4 text-white" />
                </div>
                <h2 className="font-bold text-gray-900">Bueiro Digital</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-4">
              {mobileMenuItems.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-6">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex items-center justify-between w-full p-2 text-left font-semibold text-gray-900 hover:bg-gray-100 rounded-lg"
                  >
                    <span>{section.title}</span>
                    {expandedSections.includes(section.title) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {expandedSections.includes(section.title) && (
                    <div className="mt-2 space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <Button
                          key={itemIndex}
                          variant="ghost"
                          className="w-full justify-start text-left"
                          onClick={() => {
                            setLocation(item.href);
                            setSidebarOpen(false);
                          }}
                        >
                          <item.icon className="h-4 w-4 mr-3" />
                          {item.name}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}