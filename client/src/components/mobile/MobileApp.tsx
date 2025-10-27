import { useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IntegrationModal } from "@/components/ui/integration-modal";
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
  CheckCircle,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Dados zerados para produção - usuário criará seus próprios dados
const salesData: any[] = [];

const utmLinksData: any[] = [];

// Menu estruturado igual à versão desktop
const mobileMenuItems = [
  {
    title: "Visão Geral",
    items: [
      { name: "Dashboard", href: "/", icon: Home },
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
    title: "Suporte",
    items: [
      { name: "Central de Ajuda", href: "/ajuda", icon: HelpCircle },
      { name: "Contato", href: "/contato", icon: MessageSquare },
      { name: "Novidades", href: "/novidades", icon: Rocket }
    ]
  },
  {
    title: "Outros",
    items: [
      { name: "Indique e Ganhe", href: "/indique-ganhe", icon: Gift },
      { name: "Retrospectivas", href: "/retrospectivas", icon: Calendar },
      { name: "Suporte", href: "/suporte", icon: HelpCircle },


    ]
  }
];

function MobileFacebook() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Facebook Ads</h1>
              <p className="text-xs text-gray-600">Gerencie suas contas</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Conectar
          </Button>
        </div>
      </div>

      {/* Facebook Accounts */}
      <div className="p-4 space-y-4 pb-20">
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Facebook className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-center">Contas Ativas</p>
              <p className="text-2xl font-bold text-center text-blue-600">7</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-sm font-medium text-center">Gasto Total</p>
              <p className="text-2xl font-bold text-center text-green-600">R$ 8.2k</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Usuário: Ilanildo Aragão</h2>
            <Badge className="bg-green-100 text-green-800">Conectado</Badge>
          </div>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Facebook className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Conta Principal</p>
                    <p className="text-xs text-gray-600">ID: act_911649537754007</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-gray-600">Tipo</p>
                  <p className="font-medium">Business</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className="font-medium text-green-600">Ativo</p>
                </div>
                <div>
                  <p className="text-gray-600">Token</p>
                  <p className="font-medium text-blue-600">Válido</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Facebook className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Conta Secundária</p>
                    <p className="text-xs text-gray-600">ID: act_917194673628969</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-gray-600">Tipo</p>
                  <p className="font-medium">Business</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className="font-medium text-green-600">Ativo</p>
                </div>
                <div>
                  <p className="text-gray-600">Token</p>
                  <p className="font-medium text-blue-600">Válido</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">5 contas adicionais</p>
                  <p className="text-xs text-gray-600">Ver todas as 7 contas conectadas</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast({ title: "Expandindo", description: "Mostrando todas as contas do Facebook..." })}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MobileAnalytics() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Analytics</h1>
              <p className="text-xs text-gray-600">Métricas detalhadas</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Analytics Content */}
      <div className="p-4 space-y-4 pb-20">
        <div className="grid grid-cols-1 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Performance Geral</h3>
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">R$ 127k</p>
                  <p className="text-xs text-gray-600">Receita Total</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">2.847</p>
                  <p className="text-xs text-gray-600">Conversões</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">18.392</p>
                <p className="text-xs text-gray-600">Impressões</p>
                <p className="text-xs text-red-600">-2.1%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">3.24%</p>
                <p className="text-xs text-gray-600">CTR Médio</p>
                <p className="text-xs text-green-600">+0.8%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">R$ 18.50</p>
                <p className="text-xs text-gray-600">CPM Médio</p>
                <p className="text-xs text-red-600">+5.2%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">R$ 45.80</p>
                <p className="text-xs text-gray-600">CPC Médio</p>
                <p className="text-xs text-green-600">-3.1%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Top Campanhas</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Black Friday 2025</p>
                  <p className="text-xs text-gray-600">R$ 2.450 investido</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm text-green-600">R$ 8.900</p>
                  <p className="text-xs text-gray-600">Receita</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Produto Lançamento</p>
                  <p className="text-xs text-gray-600">R$ 1.890 investido</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm text-green-600">R$ 6.200</p>
                  <p className="text-xs text-gray-600">Receita</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MobileProfile() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Meu Perfil</h1>
              <p className="text-xs text-gray-600">Configurações da conta</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-4 space-y-4 pb-20">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">João Silva</h2>
                <p className="text-sm text-gray-600">joao@bueirodigital.com</p>
                <Badge className="bg-green-100 text-green-800 mt-1">Plano Premium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Configurações</h3>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">Notificações</span>
                </div>
                <button className="w-10 h-6 bg-blue-600 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Configurações Gerais</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Privacidade</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Suporte</h3>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Central de Ajuda</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Contato</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button className="w-full bg-red-600 hover:bg-red-700 mt-6">
          Sair da Conta
        </Button>
      </div>
    </div>
  );
}

function MobileCampaigns() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Campanhas</h1>
              <p className="text-xs text-gray-600">Gerencie suas campanhas</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nova
          </Button>
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-xs text-gray-600">Ativas</p>
              <p className="text-xl font-bold text-green-600">8</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-xs text-gray-600">Pausadas</p>
              <p className="text-xl font-bold text-yellow-600">3</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-xs text-gray-600">Gasto Total</p>
              <p className="text-sm font-bold text-gray-900">R$ 12.4k</p>
            </CardContent>
          </Card>
        </div>

        {/* Campaign List */}
        <div className="space-y-3 pb-20">
          <h2 className="text-sm font-semibold text-gray-900">Campanhas Recentes</h2>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-sm">Black Friday 2025</p>
                  <p className="text-xs text-gray-600">Facebook • Criada há 2 dias</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-gray-600">Gasto</p>
                  <p className="font-medium">R$ 2.450</p>
                </div>
                <div>
                  <p className="text-gray-600">Cliques</p>
                  <p className="font-medium">1.247</p>
                </div>
                <div>
                  <p className="text-gray-600">CTR</p>
                  <p className="font-medium">2.4%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-sm">Produto Lançamento</p>
                  <p className="text-xs text-gray-600">Google • Criada há 5 dias</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Pausada</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-gray-600">Gasto</p>
                  <p className="font-medium">R$ 1.890</p>
                </div>
                <div>
                  <p className="text-gray-600">Impressões</p>
                  <p className="font-medium">45.2k</p>
                </div>
                <div>
                  <p className="text-gray-600">CPM</p>
                  <p className="font-medium">R$ 18.50</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Dados zerados para produção
const mobileMetrics = {
  revenue: { value: 0, change: 0.0 },
  conversions: { value: 0, change: 0.0 },
  impressions: { value: 0, change: 0.0 },
  campaigns: 0
};

function MobileDashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    "Visão Geral": true, // Seção principal sempre aberta por padrão
  });

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3 relative z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Bueiro Digital</h1>
              <p className="text-xs text-gray-600">Dashboard Principal</p>
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

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <LayoutDashboard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Bueiro Digital</h2>
                    <p className="text-xs text-gray-600">Menu Principal</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pb-20">
              <div className="p-2 space-y-1">
                {mobileMenuItems.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <button
                      onClick={() => toggleSection(section.title)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="text-sm font-semibold text-gray-700">{section.title}</span>
                      {expandedSections[section.title] ? (
                        <ChevronDown className="h-4 w-4 text-gray-500 transition-transform" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500 transition-transform" />
                      )}
                    </button>
                    
                    {expandedSections[section.title] && (
                      <div className="ml-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                        {section.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.href}
                              onClick={() => { 
                                setLocation(item.href); 
                                setSidebarOpen(false); 
                              }}
                              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-left transition-colors"
                            >
                              <Icon className="h-4 w-4 text-gray-600" />
                              <span className="text-sm font-medium text-gray-700">{item.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Footer com plano */}
              <div className="p-4 border-t border-gray-200 mt-4">
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">Plano Atual</div>
                  <Badge className="bg-purple-100 text-purple-800">
                    Monster Plan
                  </Badge>
                </div>
                <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 text-left text-red-600">
                  <X className="h-4 w-4" />
                  <span className="text-sm font-medium">Sair</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Quick Stats */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Receita</p>
                  <p className="text-xl font-bold text-gray-900">R$ 127k</p>
                  <p className="text-xs text-green-600">+12.5%</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Conversões</p>
                  <p className="text-xl font-bold text-gray-900">2.847</p>
                  <p className="text-xs text-green-600">+8.2%</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Impressões Totais</p>
                <p className="text-2xl font-bold text-gray-900">18.392</p>
                <p className="text-xs text-red-600">-2.1%</p>
              </div>
              <Eye className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Ações Rápidas</h2>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={() => setLocation('/campanhas')}
            className="h-14 bg-blue-600 hover:bg-blue-700 flex-col gap-1"
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs">Nova Campanha</span>
          </Button>
          <Button 
            onClick={() => setLocation('/facebook-accounts')}
            variant="outline" 
            className="h-14 flex-col gap-1"
          >
            <Facebook className="h-5 w-5" />
            <span className="text-xs">Facebook Ads</span>
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4 pb-20">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Atividade Recente</h2>
        <div className="space-y-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Campanha Black Friday</p>
                  <p className="text-xs text-gray-600">Facebook • R$ 2.450 gasto</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Produto Lançamento</p>
                  <p className="text-xs text-gray-600">Google • R$ 1.890 gasto</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Pausado</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MobileNavigation() {
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  
  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    setLocation(path);
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0.5rem)' }}>
      <div className="flex items-center justify-between px-2">
        <button 
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
            location === '/' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => handleNavigation('/')}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Início</span>
        </button>
        
        <button 
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
            location.includes('/campanhas') ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => handleNavigation('/campanhas')}
        >
          <Target className="h-5 w-5" />
          <span className="text-xs font-medium">Campanhas</span>
        </button>
        
        <button 
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
            location.includes('/facebook') ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => handleNavigation('/facebook-accounts')}
        >
          <Facebook className="h-5 w-5" />
          <span className="text-xs font-medium">Facebook</span>
        </button>
        
        <button 
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
            location.includes('/vendas') ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => handleNavigation('/vendas')}
        >
          <DollarSign className="h-5 w-5" />
          <span className="text-xs font-medium">Vendas</span>
        </button>
        
        <button 
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
            location.includes('/multiplos') || location.includes('/dashboard') ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => handleNavigation('/multiplos-dashboards')}
        >
          <Monitor className="h-5 w-5" />
          <span className="text-xs font-medium">Analytics</span>
        </button>
      </div>
    </div>
  );
}

// Página de Vendas
function MobileVendas() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Vendas</h1>
              <p className="text-xs text-gray-600">Acompanhe suas vendas</p>
            </div>
          </div>
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">R$ 0,00</div>
              <div className="text-xs text-gray-600">Hoje</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-xs text-gray-600">Vendas</div>
            </CardContent>
          </Card>
        </div>

        {/* Vendas Recentes */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Vendas Recentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {salesData.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <div className="text-sm">Nenhuma venda encontrada</div>
                <div className="text-xs mt-1">Configure suas integrações para começar</div>
              </div>
            ) : (
              salesData.map((venda) => (
                <div key={venda.id} className="p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{venda.produto}</div>
                      <div className="text-xs text-gray-500 mt-1">{venda.data}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">R$ {venda.valor.toFixed(2)}</div>
                      <Badge className={venda.status === 'Aprovada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {venda.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página de Resumo
function MobileResumo() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Resumo</h1>
              <p className="text-xs text-gray-600">Visão geral das métricas</p>
            </div>
          </div>
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-blue-600">R$ 45.280</div>
              <div className="text-xs text-gray-600">Faturamento</div>
              <div className="text-xs text-green-600">+12.5%</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-green-600">R$ 15.840</div>
              <div className="text-xs text-gray-600">Lucro</div>
              <div className="text-xs text-green-600">+8.3%</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-purple-600">892</div>
              <div className="text-xs text-gray-600">Conversões</div>
              <div className="text-xs text-green-600">+5.7%</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-orange-600">4.2%</div>
              <div className="text-xs text-gray-600">Taxa Conversão</div>
              <div className="text-xs text-red-600">-0.3%</div>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico Simulado */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Performance Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-end justify-around p-4">
              <div className="w-8 bg-blue-500 rounded-t" style={{height: '60%'}}></div>
              <div className="w-8 bg-blue-500 rounded-t" style={{height: '80%'}}></div>
              <div className="w-8 bg-blue-500 rounded-t" style={{height: '45%'}}></div>
              <div className="w-8 bg-blue-500 rounded-t" style={{height: '90%'}}></div>
              <div className="w-8 bg-blue-500 rounded-t" style={{height: '70%'}}></div>
              <div className="w-8 bg-blue-500 rounded-t" style={{height: '95%'}}></div>
              <div className="w-8 bg-blue-500 rounded-t" style={{height: '85%'}}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página de UTM Links
function MobileUTMLinks() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Links UTM</h1>
              <p className="text-xs text-gray-600">Gerador de links UTM</p>
            </div>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700" 
            size="sm"
            onClick={() => toast({ title: "Criando novo link UTM...", description: "Configure os parâmetros de rastreamento" })}
          >
            <Plus className="h-4 w-4 mr-1" />
            Novo
          </Button>
        </div>
      </div>

      {/* Lista de Links */}
      <div className="p-4 space-y-4">
        {utmLinksData.map((link) => (
          <Card key={link.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-gray-900">{link.nome}</div>
                  <div className="text-xs text-gray-500 truncate mt-1">{link.url}</div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(link.url);
                    toast({ title: "Link copiado!" });
                  }}
                >
                  Copiar
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{link.clicks}</div>
                  <div className="text-xs text-gray-600">Clicks</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{link.conversoes}</div>
                  <div className="text-xs text-gray-600">Conversões</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Página de Configurações
function MobileConfiguracoes() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Configurações</h1>
              <p className="text-xs text-gray-600">Configurações da conta</p>
            </div>
          </div>
          <div className="p-2 bg-gray-100 rounded-lg">
            <Settings className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Menu de Configurações */}
      <div className="p-4 space-y-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <button 
              className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100"
              onClick={() => toast({ title: "Abrindo perfil...", description: "Configurações do usuário" })}
            >
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-medium">Perfil</div>
                  <div className="text-xs text-gray-500">Gerenciar informações pessoais</div>
                </div>
              </div>
            </button>
            
            <button 
              className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100"
              onClick={() => toast({ title: "Configurando notificações...", description: "Ajustar preferências de notificação" })}
            >
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-medium">Notificações</div>
                  <div className="text-xs text-gray-500">Configurar alertas</div>
                </div>
              </div>
            </button>
            
            <button 
              className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100"
              onClick={() => toast({ title: "Configurações de segurança...", description: "Gerenciar senha e autenticação" })}
            >
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-medium">Segurança</div>
                  <div className="text-xs text-gray-500">Senha e autenticação</div>
                </div>
              </div>
            </button>
            
            <button 
              className="w-full p-4 text-left hover:bg-gray-50"
              onClick={() => setLocation('/plano')}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-medium">Plano & Faturamento</div>
                  <div className="text-xs text-gray-500">Gerenciar assinatura</div>
                </div>
              </div>
            </button>
          </CardContent>
        </Card>

        {/* Informações da Conta */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Informações da Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-gray-500">Plano Atual</div>
                <Badge className="bg-purple-100 text-purple-800 mt-1">Monster Plan</Badge>
              </div>
              <div>
                <div className="text-xs text-gray-500">Próximo Pagamento</div>
                <div className="text-sm font-medium">28/02/2025</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Usuários Ativos</div>
                <div className="text-sm font-medium">3 de 10</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página de Análise
function MobileAnalise() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Análise</h1>
              <p className="text-xs text-gray-600">Análise detalhada</p>
            </div>
          </div>
          <div className="p-2 bg-purple-100 rounded-lg">
            <Activity className="h-5 w-5 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-blue-600">2.845</div>
              <div className="text-xs text-gray-600">Conversões</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-green-600">R$ 89.240</div>
              <div className="text-xs text-gray-600">Receita</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Análise por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Facebook Ads</span>
                <span className="font-bold text-blue-600">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Google Ads</span>
                <span className="font-bold text-green-600">32%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Orgânico</span>
                <span className="font-bold text-purple-600">23%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página Meta Ads
function MobileMetaAds() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Meta Ads</h1>
              <p className="text-xs text-gray-600">Campanhas Meta/Facebook</p>
            </div>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700" 
            size="sm"
            onClick={() => toast({ title: "Criando nova campanha Meta Ads..." })}
          >
            <Plus className="h-4 w-4 mr-1" />
            Nova
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-blue-600">12</div>
              <div className="text-xs text-gray-600">Ativas</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-600">R$ 2.450</div>
              <div className="text-xs text-gray-600">Gasto</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-purple-600">3.2x</div>
              <div className="text-xs text-gray-600">ROAS</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Campanhas Ativas</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-sm">Black Friday 2025</div>
                  <div className="text-xs text-gray-500">Ativa • R$ 500/dia</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Otimizada</Badge>
              </div>
            </div>
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-sm">Retargeting Carrinho</div>
                  <div className="text-xs text-gray-500">Ativa • R$ 200/dia</div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Em Teste</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página de Conversões
function MobileConversoes() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Conversões</h1>
              <p className="text-xs text-gray-600">Análise de conversões</p>
            </div>
          </div>
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-green-600">4.2%</div>
              <div className="text-xs text-gray-600">Taxa Conversão</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-blue-600">R$ 31,40</div>
              <div className="text-xs text-gray-600">CPA</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conversões por Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Curso Marketing Digital</div>
                  <div className="text-xs text-gray-500">234 conversões</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-600">R$ 116.478</div>
                  <div className="text-xs text-gray-500">5.2% conv.</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">Mentoria Premium</div>
                  <div className="text-xs text-gray-500">89 conversões</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-600">R$ 177.733</div>
                  <div className="text-xs text-gray-500">3.8% conv.</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página de Despesas
function MobileDespesas() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Despesas</h1>
              <p className="text-xs text-gray-600">Controle de gastos</p>
            </div>
          </div>
          <Button className="bg-red-600 hover:bg-red-700" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Adicionar
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-red-600">R$ 12.450</div>
              <div className="text-xs text-gray-600">Total Mês</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-orange-600">R$ 415</div>
              <div className="text-xs text-gray-600">Média/Dia</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Despesas Recentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-sm">Facebook Ads</div>
                  <div className="text-xs text-gray-500">28/01/2025</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-600">R$ 850,00</div>
                  <div className="text-xs text-gray-500">Tráfego Pago</div>
                </div>
              </div>
            </div>
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-sm">Google Ads</div>
                  <div className="text-xs text-gray-500">27/01/2025</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-600">R$ 650,00</div>
                  <div className="text-xs text-gray-500">Tráfego Pago</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página de Relatórios
function MobileRelatorios() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Relatórios</h1>
              <p className="text-xs text-gray-600">Relatórios personalizados</p>
            </div>
          </div>
          <Button className="bg-green-600 hover:bg-green-700" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Gerar
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Relatórios Disponíveis</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <button className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Relatório de Vendas</div>
                    <div className="text-xs text-gray-500">Análise completa de vendas</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </button>
            
            <button className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Performance de Campanhas</div>
                    <div className="text-xs text-gray-500">ROI e métricas</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </button>
            
            <button className="w-full p-4 text-left hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Funil de Conversão</div>
                    <div className="text-xs text-gray-500">Análise do funil</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página Google Ads
function MobileGoogleAds() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Google Ads</h1>
              <p className="text-xs text-gray-600">Campanhas Google Ads</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Nova
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Estado Vazio - Sem Campanhas TikTok */}
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma campanha TikTok
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Conecte sua conta do TikTok Ads para visualizar suas campanhas.
            </p>
            <Button 
              onClick={() => window.open("https://ads.tiktok.com", "_blank")}
              className="bg-pink-600 hover:bg-pink-700 w-full"
              size="sm"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Acessar TikTok Ads
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Após conectar, suas campanhas aparecerão aqui
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Campanhas Google Ads</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-sm">Palavras-chave Marketing</div>
                  <div className="text-xs text-gray-500">Ativa • R$ 300/dia</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Performance</Badge>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-sm">Remarketing YouTube</div>
                  <div className="text-xs text-gray-500">Ativa • R$ 150/dia</div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Testando</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página TikTok Ads - SEM DADOS FALSOS
function MobileTikTokAds() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { data: tiktokCampaigns = [], isLoading } = useQuery({
    queryKey: ["/api/campaigns/tiktok"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
                <X className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">TikTok Ads</h1>
                <p className="text-xs text-gray-600">Carregando...</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Activity className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Carregando campanhas...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">TikTok Ads</h1>
              <p className="text-xs text-gray-600">Campanhas TikTok</p>
            </div>
          </div>
          <Button 
            className="bg-pink-600 hover:bg-pink-700" 
            size="sm"
            onClick={() => window.open("https://ads.tiktok.com", "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Acessar
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Estado Vazio - Sem Campanhas TikTok */}
        {tiktokCampaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center max-w-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhuma campanha TikTok
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Conecte sua conta do TikTok Ads para visualizar suas campanhas.
              </p>
              <Button 
                onClick={() => window.open("https://ads.tiktok.com", "_blank")}
                className="bg-pink-600 hover:bg-pink-700 w-full"
                size="sm"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Acessar TikTok Ads
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Após conectar, suas campanhas aparecerão aqui
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Estatísticas Reais */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-pink-600">
                    {(tiktokCampaigns as any[]).filter((c: any) => c.status === 'active').length}
                  </div>
                  <div className="text-xs text-gray-600">Ativas</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-blue-600">
                    R$ {(tiktokCampaigns as any[]).reduce((sum: number, c: any) => sum + (c.spent || 0), 0).toFixed(0)}
                  </div>
                  <div className="text-xs text-gray-600">Gasto</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-green-600">
                    {(tiktokCampaigns as any[]).length > 0 
                      ? `${((tiktokCampaigns as any[]).reduce((sum: number, c: any) => sum + (c.roas || 0), 0) / (tiktokCampaigns as any[]).length).toFixed(1)}x`
                      : "0.0x"
                    }
                  </div>
                  <div className="text-xs text-gray-600">ROAS</div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Campanhas Reais */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Campanhas TikTok</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {(tiktokCampaigns as any[]).map((campaign: any, index: number) => (
                  <div key={campaign.id} className={`p-4 ${index < (tiktokCampaigns as any[]).length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium text-sm">{campaign.name}</div>
                        <div className="text-xs text-gray-500">
                          {campaign.status === 'active' ? 'Ativa' : 'Pausada'} • 
                          Orçamento: R$ {campaign.budget || 0}
                        </div>
                      </div>
                      <Badge className={campaign.status === 'active' 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                      }>
                        {campaign.status === 'active' ? 'Ativa' : 'Pausada'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

// Página Funil de Vendas
function MobileFunil() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Funil de Vendas</h1>
              <p className="text-xs text-gray-600">Análise do funil</p>
            </div>
          </div>
          <div className="p-2 bg-blue-100 rounded-lg">
            <Layers className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Funil Principal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-blue-900">Visitantes</div>
                  <div className="text-2xl font-bold text-blue-600">12.450</div>
                </div>
                <div className="text-blue-600">100%</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-green-900">Leads</div>
                  <div className="text-2xl font-bold text-green-600">3.122</div>
                </div>
                <div className="text-green-600">25.1%</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <div className="font-medium text-orange-900">Oportunidades</div>
                  <div className="text-2xl font-bold text-orange-600">892</div>
                </div>
                <div className="text-orange-600">28.6%</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <div className="font-medium text-purple-900">Vendas</div>
                  <div className="text-2xl font-bold text-purple-600">234</div>
                </div>
                <div className="text-purple-600">26.2%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Taxa de Conversão Geral</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">1.88%</div>
            <div className="text-sm text-gray-600">234 vendas de 12.450 visitantes</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página Scripts
function MobileScripts() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Scripts</h1>
              <p className="text-xs text-gray-600">Scripts de tracking</p>
            </div>
          </div>
          <Button className="bg-green-600 hover:bg-green-700" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Novo
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Scripts Ativos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-sm">Facebook Pixel</div>
                  <div className="text-xs text-gray-500 mt-1">Tracking de conversões</div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast({ title: "Script copiado!" })}
                >
                  Copiar
                </Button>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-sm">Google Analytics</div>
                  <div className="text-xs text-gray-500 mt-1">Análise de tráfego</div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast({ title: "Script copiado!" })}
                >
                  Copiar
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-sm">Hotjar</div>
                  <div className="text-xs text-gray-500 mt-1">Heatmaps e gravações</div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast({ title: "Script copiado!" })}
                >
                  Copiar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Como Instalar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 space-y-2">
              <p>1. Copie o código do script desejado</p>
              <p>2. Cole no &lt;head&gt; do seu site</p>
              <p>3. Publique as alterações</p>
              <p>4. Aguarde até 24h para ver os dados</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página Pixels
function MobilePixels() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Pixels</h1>
              <p className="text-xs text-gray-600">Pixel tracking</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Conectar
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-blue-600">3</div>
              <div className="text-xs text-gray-600">Pixels Ativos</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-green-600">98.5%</div>
              <div className="text-xs text-gray-600">Taxa Disparo</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Pixels Configurados</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Facebook Pixel</div>
                    <div className="text-xs text-gray-500">ID: 1234567890</div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Google Ads</div>
                    <div className="text-xs text-gray-500">ID: AW-987654321</div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-pink-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">TikTok Pixel</div>
                    <div className="text-xs text-gray-500">ID: TT-567891234</div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página Integracoes
function MobileIntegracoes() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch user integrations to check connection status
  const { data: userIntegrations } = useQuery({
    queryKey: ["/api/integrations"],
    retry: false,
  });

  const integrations = [
    {
      id: "kiwify",
      name: "Kiwify",
      logo: "https://kiwify.com.br/assets/img/logo.png",
      category: "infoproducts",
      isPopular: true,
      isConnected: false,
      description: "Plataforma completa para venda de infoprodutos",
      features: ["Checkout otimizado", "Área de membros", "Sistema de afiliados"]
    },
    {
      id: "hotmart",
      name: "Hotmart",
      logo: "https://static.hotmart.com/img/hotmart-logo.png",
      category: "infoproducts", 
      isPopular: true,
      isConnected: false,
      description: "Maior plataforma de produtos digitais do Brasil",
      features: ["Marketplace", "Gestão de afiliados", "Analytics avançado"]
    },
    {
      id: "eduzz",
      name: "Eduzz",
      logo: "https://eduzz.com/img/logo.png",
      category: "infoproducts",
      isPopular: true,
      isConnected: false,
      description: "Plataforma de vendas de produtos digitais",
      features: ["Sistema de checkout", "Programa de afiliados", "Relatórios detalhados"]
    },
    {
      id: "monetizze",
      name: "Monetizze",
      logo: "https://monetizze.com.br/img/logo.png",
      category: "infoproducts",
      isPopular: true,
      isConnected: false,
      description: "Plataforma de vendas online brasileira",
      features: ["Checkout personalizado", "Sistema de comissões", "Dashboard completo"]
    },
    {
      id: "ticto",
      name: "Ticto",
      logo: "https://ticto.com.br/assets/img/logo.png",
      category: "infoproducts",
      isPopular: true,
      isConnected: false,
      description: "Plataforma de vendas com foco em conversão",
      features: ["Checkout otimizado", "Análise de conversão", "Sistema de afiliados"]
    },
    {
      id: "kirvano",
      name: "Kirvano",
      logo: "https://kirvano.com/assets/img/logo.png",
      category: "infoproducts",
      isPopular: true,
      isConnected: false,
      description: "Plataforma completa para criadores de conteúdo",
      features: ["Área de membros", "Pagamentos recorrentes", "Analytics avançado"]
    },
    {
      id: "braip",
      name: "Braip",
      logo: "https://braip.com/assets/img/logo.png",
      category: "infoproducts",
      isPopular: false,
      isConnected: false,
      description: "Plataforma brasileira de produtos digitais",
      features: ["Checkout personalizado", "Sistema de afiliados", "Relatórios"]
    },
    {
      id: "shopify",
      name: "Shopify",
      logo: "https://cdn.shopify.com/s/files/1/0070/7032/files/shopify_logo.png",
      category: "ecommerce",
      isPopular: true,
      isConnected: false,
      description: "Plataforma líder mundial de e-commerce",
      features: ["Loja completa", "Pagamentos", "Integração com apps"]
    },
    {
      id: "woocommerce",
      name: "WooCommerce",
      logo: "https://woocommerce.com/wp-content/themes/woo/images/logo-woocommerce.svg",
      category: "ecommerce",
      isPopular: true,
      isConnected: false,
      description: "Plugin de e-commerce para WordPress",
      features: ["Flexibilidade total", "Milhares de plugins", "Customização"]
    },
    {
      id: "yampi",
      name: "Yampi",
      logo: "https://yampi.com.br/assets/img/logo.png",
      category: "ecommerce",
      isPopular: false,
      isConnected: false,
      description: "Plataforma brasileira de e-commerce",
      features: ["Checkout nativo", "Multi-canais", "Automação"]
    },
    {
      id: "perfectpay",
      name: "PerfectPay",
      logo: "https://perfectpay.com.br/assets/img/logo.png",
      category: "payments",
      isPopular: true,
      isConnected: false,
      description: "Gateway de pagamento brasileiro",
      features: ["PIX instantâneo", "Cartão de crédito", "Boleto"]
    },
    {
      id: "ironpay",
      name: "IronPay",
      logo: "https://ironpay.com.br/assets/img/logo.png",
      category: "payments",
      isPopular: false,
      isConnected: false,
      description: "Solução completa de pagamentos",
      features: ["Multi-meios", "Antifraude", "Checkout seguro"]
    },
    {
      id: "hubla",
      name: "Hubla",
      logo: "https://hubla.com/assets/img/logo.png",
      category: "infoproducts",
      isPopular: false,
      isConnected: false,
      description: "Plataforma de cursos online",
      features: ["EAD completo", "Certificados", "Gamificação"]
    },
    {
      id: "guru",
      name: "Guru",
      logo: "https://guru.com/assets/img/logo.png",
      category: "infoproducts",
      isPopular: false,
      isConnected: false,
      description: "Plataforma educacional",
      features: ["Cursos online", "Mentoria", "Comunidade"]
    },
    {
      id: "clickbank",
      name: "ClickBank",
      logo: "https://www.clickbank.com/assets/img/logo.png",
      category: "infoproducts",
      isPopular: false,
      isConnected: false,
      description: "Marketplace internacional de produtos digitais",
      features: ["Marketplace global", "Comissões altas", "Pagamentos internacionais"]
    }
  ];

  // Mark integrations as connected based on user data
  const integrationsWithStatus = integrations.map(integration => {
    const userIntegration = Array.isArray(userIntegrations) ? userIntegrations.find((ui: any) => ui.platform === integration.id) : null;
    return {
      ...integration,
      isConnected: userIntegration?.isConnected || false
    };
  });

  const filteredIntegrations = integrationsWithStatus.filter(integration =>
    integration.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConnect = (integration: any) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Integrações</h1>
              <p className="text-xs text-gray-600">Plataformas disponíveis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar integrações..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Integrations List */}
      <div className="p-4 space-y-4">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg border border-gray-200 p-1 flex items-center justify-center">
                    <img 
                      src={integration.logo} 
                      alt={`${integration.name} logo`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const fallbackDiv = document.createElement('div');
                          fallbackDiv.className = 'w-full h-full bg-red-100 rounded flex items-center justify-center';
                          fallbackDiv.innerHTML = `<span class="text-red-600 font-bold text-xs">${integration.name.charAt(0)}</span>`;
                          parent.appendChild(fallbackDiv);
                        }
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{integration.name}</div>
                    <div className="text-xs text-gray-500">{integration.description}</div>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  {integration.isConnected ? (
                    <Badge className="bg-green-100 text-green-800">Conectado</Badge>
                  ) : (
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleConnect(integration)}
                    >
                      + Conectar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Suggest New Platform Card */}
        <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="p-4 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Plus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-sm text-gray-900">Não encontrou sua plataforma?</div>
                <div className="text-xs text-gray-500 mt-1">Sugira uma nova integração</div>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
                onClick={() => {
                  const platform = prompt("Qual plataforma você gostaria de ver integrada?");
                  if (platform) {
                    toast({ 
                      title: "Sugestão enviada!", 
                      description: `Obrigado por sugerir ${platform}. Nossa equipe vai analisar.` 
                    });
                  }
                }}
              >
                Sugerir Plataforma
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Modal */}
      {selectedIntegration && (
        <IntegrationModal
          integration={selectedIntegration}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedIntegration(null);
          }}
        />
      )}
    </div>
  );
}

// Página WhatsApp
function MobileWhatsApp() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">WhatsApp</h1>
              <p className="text-xs text-gray-600">Integração WhatsApp</p>
            </div>
          </div>
          <Button 
            className="bg-green-600 hover:bg-green-700" 
            size="sm"
            onClick={() => toast({ title: "Conectando WhatsApp...", description: "Aguarde enquanto configuramos sua integração" })}
          >
            <Plus className="h-4 w-4 mr-1" />
            Conectar
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-green-600">1.245</div>
              <div className="text-xs text-gray-600">Mensagens Enviadas</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-blue-600">89.2%</div>
              <div className="text-xs text-gray-600">Taxa Entrega</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Automações Ativas</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-sm">Boas-vindas</div>
                  <div className="text-xs text-gray-500">Mensagem automática para novos leads</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-sm">Carrinho Abandonado</div>
                  <div className="text-xs text-gray-500">Lembrete após 1 hora</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-sm">Pós-venda</div>
                  <div className="text-xs text-gray-500">Material complementar</div>
                </div>
                <Badge className="bg-gray-100 text-gray-800">Pausado</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página Webhooks
function MobileWebhooks() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Webhooks</h1>
              <p className="text-xs text-gray-600">Configurar webhooks</p>
            </div>
          </div>

        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Webhooks Configurados</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-sm">Hotmart - Vendas</div>
                  <div className="text-xs text-gray-500 mt-1">https://api.bueirodigital.com/webhook/hotmart</div>
                  <div className="text-xs text-green-600 mt-1">✓ Última execução: há 2 min</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-sm">Kiwify - Conversões</div>
                  <div className="text-xs text-gray-500 mt-1">https://api.bueirodigital.com/webhook/kiwify</div>
                  <div className="text-xs text-green-600 mt-1">✓ Última execução: há 5 min</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-sm">Facebook - Leads</div>
                  <div className="text-xs text-gray-500 mt-1">https://api.bueirodigital.com/webhook/facebook</div>
                  <div className="text-xs text-red-600 mt-1">✗ Erro na última execução</div>
                </div>
                <Badge className="bg-red-100 text-red-800">Erro</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">1,847</div>
                <div className="text-xs text-gray-600">Executados Hoje</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">99.2%</div>
                <div className="text-xs text-gray-600">Taxa Sucesso</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página APIs
function MobileAPIs() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">APIs</h1>
              <p className="text-xs text-gray-600">Integrações API</p>
            </div>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Token
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Sua API Key</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-gray-100 rounded-lg">
              <div className="text-xs font-mono text-gray-700">bd_sk_live_abc123xyz789...</div>
            </div>
            <Button variant="outline" className="w-full mt-3" size="sm">
              Copiar API Key
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Endpoints Disponíveis</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm">GET /api/sales</div>
                  <div className="text-xs text-gray-500">Buscar vendas</div>
                </div>
                <Badge className="bg-green-100 text-green-800">GET</Badge>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm">POST /api/sales</div>
                  <div className="text-xs text-gray-500">Criar venda</div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">POST</Badge>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm">GET /api/campaigns</div>
                  <div className="text-xs text-gray-500">Listar campanhas</div>
                </div>
                <Badge className="bg-green-100 text-green-800">GET</Badge>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm">GET /api/analytics</div>
                  <div className="text-xs text-gray-500">Métricas gerais</div>
                </div>
                <Badge className="bg-green-100 text-green-800">GET</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Uso da API (Hoje)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">847</div>
                <div className="text-xs text-gray-600">Requisições</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-600">9,153</div>
                <div className="text-xs text-gray-600">Limite: 10,000</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página Regras Automatizadas
function MobileRegrasAutomatizadas() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Regras Automatizadas</h1>
              <p className="text-xs text-gray-600">Automação de campanhas</p>
            </div>
          </div>
          <Button 
            className="bg-orange-600 hover:bg-orange-700" 
            size="sm"
            onClick={() => toast({ title: "Criando nova regra automatizada...", description: "Configure os parâmetros de automação" })}
          >
            <Plus className="h-4 w-4 mr-1" />
            Nova Regra
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-orange-600">7</div>
              <div className="text-xs text-gray-600">Regras Ativas</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-green-600">R$ 3.240</div>
              <div className="text-xs text-gray-600">Economia</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Regras Configuradas</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-sm">Pausar CPA Alto</div>
                  <div className="text-xs text-gray-500 mt-1">Se CPA maior que R$ 50, pausar anúncio</div>
                  <div className="text-xs text-green-600 mt-1">✓ Executada 3x hoje</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativa</Badge>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-sm">Aumentar Orçamento</div>
                  <div className="text-xs text-gray-500 mt-1">Se ROAS maior que 3.0, aumentar em 20%</div>
                  <div className="text-xs text-green-600 mt-1">✓ Executada 1x hoje</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativa</Badge>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-sm">Alerta Performance</div>
                  <div className="text-xs text-gray-500 mt-1">Notificar se CTR menor que 1%</div>
                  <div className="text-xs text-orange-600 mt-1">⚠ 2 alertas hoje</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativa</Badge>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-sm">Backup Criativo</div>
                  <div className="text-xs text-gray-500 mt-1">Ativar se principal pausar</div>
                  <div className="text-xs text-gray-600 mt-1">Não executada hoje</div>
                </div>
                <Badge className="bg-gray-100 text-gray-800">Standby</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página Plano & Faturamento
function MobilePlano() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Plano & Faturamento</h1>
              <p className="text-xs text-gray-600">Gerencie sua assinatura</p>
            </div>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
            Upgrade
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-bold text-purple-900">Monster Plan</div>
                <div className="text-sm text-purple-700">Plano atual</div>
              </div>
              <Badge className="bg-purple-100 text-purple-800">ATIVO</Badge>
            </div>
            <div className="mt-3 text-2xl font-bold text-purple-900">R$ 497/mês</div>
            <div className="text-xs text-purple-600 mt-1">Próximo pagamento: 28/02/2025</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recursos Inclusos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <span className="text-sm">Campanhas ilimitadas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <span className="text-sm">10 usuários</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <span className="text-sm">API Premium</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <span className="text-sm">Suporte prioritário</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Histórico de Pagamentos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-sm">Janeiro 2025</div>
                  <div className="text-xs text-gray-500">28/01/2025</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">R$ 497,00</div>
                  <Badge className="bg-green-100 text-green-800 text-xs">Pago</Badge>
                </div>
              </div>
            </div>
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-sm">Dezembro 2024</div>
                  <div className="text-xs text-gray-500">28/12/2024</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">R$ 497,00</div>
                  <Badge className="bg-green-100 text-green-800 text-xs">Pago</Badge>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium text-sm">Novembro 2024</div>
                  <div className="text-xs text-gray-500">28/11/2024</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">R$ 497,00</div>
                  <Badge className="bg-green-100 text-green-800 text-xs">Pago</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página de Atribuição
function MobileAtribuicao() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Atribuição</h1>
              <p className="text-xs text-gray-600">Modelo de atribuição</p>
            </div>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700" 
            size="sm"
            onClick={() => toast({ title: "Configuração salva", description: "Modelo de atribuição atualizado" })}
          >
            Salvar
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-20">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Modelo de Atribuição</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <div>
                  <div className="font-medium text-sm">Último Clique</div>
                  <div className="text-xs text-gray-500">Atualmente selecionado</div>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                <div>
                  <div className="font-medium text-sm">Primeiro Clique</div>
                  <div className="text-xs text-gray-500">Disponível</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página de Personalizar Dashboard
function MobilePersonalizarDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Personalizar</h1>
              <p className="text-xs text-gray-600">Customize seu dashboard</p>
            </div>
          </div>
          <Button 
            className="bg-green-600 hover:bg-green-700" 
            size="sm"
            onClick={() => toast({ title: "Layout salvo", description: "Dashboard personalizado" })}
          >
            Aplicar
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-20">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Widgets Disponíveis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Gráfico de Conversões</span>
              <Badge className="bg-green-100 text-green-800">Ativo</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Resumo de Campanhas</span>
              <Badge className="bg-green-100 text-green-800">Ativo</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">ROI por Plataforma</span>
              <Badge className="bg-gray-100 text-gray-800">Inativo</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página de Compartilhar
function MobileCompartilhar() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Compartilhar</h1>
              <p className="text-xs text-gray-600">Compartilhe dashboards</p>
            </div>
          </div>
          <Button 
            className="bg-purple-600 hover:bg-purple-700" 
            size="sm"
            onClick={() => toast({ title: "Link copiado", description: "Dashboard compartilhado" })}
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-20">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Dashboards Compartilhados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm">Dashboard Principal</div>
                  <div className="text-xs text-gray-500">Compartilhado com 3 pessoas</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-sm">Relatório Mensal</div>
                  <div className="text-xs text-gray-500">Compartilhado com 1 pessoa</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página de Usuários
function MobileUsuarios() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Usuários</h1>
              <p className="text-xs text-gray-600">Gerenciar usuários</p>
            </div>
          </div>
          <Button 
            className="bg-green-600 hover:bg-green-700" 
            size="sm"
            onClick={() => toast({ title: "Convite enviado", description: "Novo usuário convidado" })}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-20">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Usuários Ativos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Admin</div>
                  <div className="text-xs text-gray-500">admin@empresa.com</div>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Ativo</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-sm">Marketing</div>
                  <div className="text-xs text-gray-500">marketing@empresa.com</div>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Ativo</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Página de Segurança
function MobileSeguranca() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Segurança</h1>
              <p className="text-xs text-gray-600">Configurações de segurança</p>
            </div>
          </div>
          <div className="p-2 bg-red-100 rounded-lg">
            <Shield className="h-5 w-5 text-red-600" />
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4 pb-20">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Configurações de Segurança</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">Autenticação 2FA</div>
                <div className="text-xs text-gray-500">Ativada</div>
              </div>
              <Badge className="bg-green-100 text-green-800">Ativo</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">Sessões Ativas</div>
                <div className="text-xs text-gray-500">2 dispositivos</div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast({ title: "Sessões encerradas", description: "Todos os dispositivos desconectados" })}
              >
                Gerenciar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Páginas restantes implementadas de forma funcional
function MobileNotificacoes() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Notificações</h1>
              <p className="text-xs text-gray-600">Configurar notificações</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4 pb-20">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">Email</div>
                  <div className="text-xs text-gray-500">Notificações por email</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">Push</div>
                  <div className="text-xs text-gray-500">Notificações push</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MobileAjuda() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const { toast } = useToast();

  const mobileTopics = [
    {
      title: "Como configurar campanhas",
      description: "Tutorial completo para criar suas primeiras campanhas",
      icon: "🎯",
      action: () => setLocation('/admin-tutorial')
    },
    {
      title: "Integrações disponíveis", 
      description: "Conecte Hotmart, Kiwify, Eduzz e outras plataformas",
      icon: "🔗",
      action: () => setLocation('/integracoes')
    },
    {
      title: "Facebook Pixel",
      description: "Como instalar e configurar o pixel do Facebook",
      icon: "📱",
      action: () => {
        setSelectedTopic("Como configurar o Facebook Pixel?");
        setShowTopicModal(true);
      }
    },
    {
      title: "Análise de ROI",
      description: "Entenda como calcular e interpretar métricas",
      icon: "📊", 
      action: () => {
        setSelectedTopic("Entendendo as métricas de ROI");
        setShowTopicModal(true);
      }
    },
    {
      title: "UTMs personalizadas",
      description: "Crie links de rastreamento únicos",
      icon: "🔗",
      action: () => {
        setSelectedTopic("Como criar UTMs personalizadas?");
        setShowTopicModal(true);
      }
    },
    {
      title: "Suporte técnico",
      description: "Contate nossa equipe especializada",
      icon: "💬",
      action: () => window.open('https://wa.me/5587999272064?text=Olá!%20Preciso%20de%20suporte%20técnico', '_blank')
    }
  ];

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const found = mobileTopics.find(topic => 
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (found) {
        found.action();
        toast({
          title: "Redirecionando",
          description: found.title
        });
      } else {
        toast({
          title: "Nenhum resultado",
          description: "Tente palavras diferentes ou contate o suporte",
          variant: "destructive"
        });
      }
    }
  };

  const getTopicContent = (title: string) => {
    switch(title) {
      case "Como configurar o Facebook Pixel?":
        return `Para configurar o Facebook Pixel:

1. Acesse 'Pixels' no menu
2. Clique em 'Novo Pixel'
3. Selecione 'Facebook'
4. Insira seu Pixel ID
5. Cole o código no seu site
6. Configure eventos de conversão

O pixel sincroniza automaticamente.`;

      case "Entendendo as métricas de ROI":
        return `ROI = (Receita - Investimento) / Investimento × 100

No Bueiro Digital você vê:
- ROI por campanha
- ROI por tráfego
- ROI acumulado
- Comparativo mensal

ROI 300% = R$ 3 retorno para cada R$ 1 investido.`;

      case "Como criar UTMs personalizadas?":
        return `UTMs no Bueiro Digital:

1. Acesse 'Campanhas' > 'Gerar UTM'
2. Preencha:
   - utm_source: facebook, google
   - utm_medium: cpc, social
   - utm_campaign: nome
   - utm_content: versão
3. Clique 'Gerar Link'
4. Use nas campanhas

Rastreamento automático!`;

      default:
        return "Conteúdo não encontrado.";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fixo */}
      <div className="sticky top-0 bg-white shadow-sm border-b px-4 py-3 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Central de Ajuda</h1>
              <p className="text-xs text-gray-600">Documentação e tutoriais</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo scrollável */}
      <div className="p-4 space-y-4 pb-24 max-w-lg mx-auto">
        {/* Busca */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Ex: Facebook Pixel, ROI, UTM..."
                  className="pl-10 h-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                className="w-full h-10"
                onClick={handleSearch}
              >
                🔍 Buscar Ajuda
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tópicos */}
        <div className="space-y-2">
          {mobileTopics.map((topic, index) => (
            <Card key={index} className="border-0 shadow-sm active:scale-[0.98] transition-transform">
              <CardContent className="p-3">
                <div 
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={topic.action}
                >
                  <div className="text-xl bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center">
                    {topic.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 truncate">{topic.title}</div>
                    <div className="text-xs text-gray-600 mt-1 line-clamp-2">{topic.description}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Rápido */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3">
            <h3 className="font-medium text-sm mb-3 text-gray-900">❓ Perguntas Frequentes</h3>
            <div className="space-y-2">
              <div className="p-2 bg-blue-50 rounded-lg text-xs">
                <strong className="text-blue-900">Como começar?</strong><br/>
                <span className="text-blue-700">Acesse o tutorial de primeiros passos no menu.</span>
              </div>
              <div className="p-2 bg-green-50 rounded-lg text-xs">
                <strong className="text-green-900">Suporte 24h?</strong><br/>
                <span className="text-green-700">WhatsApp disponível para emergências.</span>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg text-xs">
                <strong className="text-purple-900">Tem app mobile?</strong><br/>
                <span className="text-purple-700">Use esta versão PWA - funciona offline!</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contato Direto */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">💬</div>
            <div className="text-sm font-semibold text-blue-900 mb-1">Precisa de ajuda personalizada?</div>
            <div className="text-xs text-blue-700 mb-3">Nossa equipe responde em minutos via WhatsApp</div>
            <Button 
              size="sm" 
              className="w-full bg-green-600 hover:bg-green-700 h-10"
              onClick={() => window.open('https://wa.me/5587999272064?text=Olá!%20Preciso%20de%20ajuda%20com%20o%20Bueiro%20Digital', '_blank')}
            >
              📱 Conversar no WhatsApp
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Tópico */}
      <Dialog open={showTopicModal} onOpenChange={setShowTopicModal}>
        <DialogContent className="max-w-sm mx-4 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold text-gray-900">
              {selectedTopic}
            </DialogTitle>
          </DialogHeader>
          <div className="bg-gray-50 p-3 rounded-lg">
            <pre className="whitespace-pre-wrap font-sans text-xs text-gray-700 leading-relaxed">
              {selectedTopic ? getTopicContent(selectedTopic) : ""}
            </pre>
          </div>
          <div className="flex gap-2 mt-4">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 h-9"
              onClick={() => {
                navigator.clipboard.writeText(getTopicContent(selectedTopic || ""));
                toast({ title: "✅ Copiado!", description: "Conteúdo copiado com sucesso" });
              }}
            >
              📋 Copiar
            </Button>
            <Button 
              size="sm" 
              className="flex-1 h-9 bg-green-600 hover:bg-green-700"
              onClick={() => window.open('https://wa.me/5587999272064?text=Tenho%20dúvidas%20sobre:%20' + encodeURIComponent(selectedTopic || ""), '_blank')}
            >
              💬 Dúvidas
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MobileContato() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Contato</h1>
              <p className="text-xs text-gray-600">Entre em contato</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4 pb-20">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="font-medium text-sm mb-1">WhatsApp</div>
                <Button 
                  className="bg-green-600 hover:bg-green-700" 
                  size="sm"
                  onClick={() => toast({ title: "Abrindo WhatsApp", description: "Redirecionando" })}
                >
                  Conversar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MobileNovidades() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Novidades</h1>
              <p className="text-xs text-gray-600">Últimas atualizações</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4 pb-20">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="font-medium text-sm mb-1">Versão 2.1.0</div>
                <Badge className="bg-green-100 text-green-800">Novo</Badge>
                <div className="text-sm text-gray-700 mt-2">Nova interface mobile otimizada.</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MobileIndiqueGanhe() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Indique e Ganhe</h1>
              <p className="text-xs text-gray-600">Programa de indicação</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4 pb-20">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">5</div>
              <div className="text-sm text-gray-500">Indicações ativas</div>
              <Button 
                className="w-full bg-orange-600 hover:bg-orange-700 mt-4"
                onClick={() => toast({ title: "Link copiado", description: "Link de indicação copiado" })}
              >
                Copiar Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MobileRetrospectivas() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Retrospectivas</h1>
              <p className="text-xs text-gray-600">Análises retrospectivas</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4 pb-20">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="font-medium text-sm mb-1">Janeiro 2025</div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast({ title: "Gerando relatório", description: "Análise sendo processada" })}
                >
                  Ver Análise
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


function MobileSuporte() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setLocation('/')}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Suporte</h1>
              <p className="text-xs text-gray-600">Suporte técnico</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4 pb-20">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="font-medium text-sm mb-1">Chat ao Vivo</div>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700" 
                  size="sm"
                  onClick={() => toast({ title: "Iniciando chat", description: "Conectando com suporte" })}
                >
                  Iniciar Chat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function MobileApp() {
  return (
    <>
      <Switch>
        <Route path="/" component={MobileDashboard} />
        <Route path="/campanhas" component={MobileCampaigns} />
        <Route path="/facebook-accounts" component={MobileFacebook} />
        <Route path="/multiplos-dashboards" component={MobileAnalytics} />
        <Route path="/profile" component={MobileProfile} />
        
        {/* Páginas adicionais do menu desktop */}
        <Route path="/resumo" component={MobileResumo} />
        <Route path="/analise" component={MobileAnalise} />
        <Route path="/meta-ads" component={MobileMetaAds} />
        <Route path="/google-ads" component={MobileGoogleAds} />
        <Route path="/tiktok-ads" component={MobileTikTokAds} />
        <Route path="/regras-automatizadas" component={MobileRegrasAutomatizadas} />
        <Route path="/vendas" component={MobileVendas} />
        <Route path="/conversoes" component={MobileConversoes} />
        <Route path="/despesas" component={MobileDespesas} />
        <Route path="/relatorios" component={MobileRelatorios} />
        <Route path="/funil" component={MobileFunil} />
        <Route path="/utm-links" component={MobileUTMLinks} />
        <Route path="/scripts" component={MobileScripts} />
        <Route path="/pixels" component={MobilePixels} />
        <Route path="/atribuicao" component={MobileAtribuicao} />
        <Route path="/webhooks" component={MobileWebhooks} />
        <Route path="/apis" component={MobileAPIs} />
        <Route path="/integracoes" component={MobileIntegracoes} />
        <Route path="/whatsapp" component={MobileWhatsApp} />
        <Route path="/personalizar-dashboard" component={MobilePersonalizarDashboard} />
        <Route path="/compartilhar" component={MobileCompartilhar} />
        <Route path="/configuracoes" component={MobileConfiguracoes} />
        <Route path="/plano" component={MobilePlano} />
        <Route path="/usuarios" component={MobileUsuarios} />
        <Route path="/seguranca" component={MobileSeguranca} />
        <Route path="/notificacoes" component={MobileNotificacoes} />
        <Route path="/ajuda" component={MobileAjuda} />
        <Route path="/contato" component={MobileContato} />
        <Route path="/novidades" component={MobileNovidades} />
        <Route path="/indique-ganhe" component={MobileIndiqueGanhe} />
        <Route path="/retrospectivas" component={MobileRetrospectivas} />
        <Route path="/suporte" component={MobileSuporte} />


      </Switch>
      <MobileNavigation />
      
      {/* Footer com créditos */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white text-center py-1 text-xs z-40 safe-area-pb">
        <p>© 2025 Bueiro Digital • Desenvolvido por Alex Developer</p>
      </div>
    </>
  );
}