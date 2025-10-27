import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Home, 
  BarChart3, 
  Target, 
  DollarSign,
  TrendingUp,
  Eye,
  Globe,
  Settings,
  Users,
  CreditCard,
  Calendar,
  Link as LinkIcon,
  Code,
  Zap,
  Share2,
  Gift,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
  Bell
} from 'lucide-react';

// Import client pages
import ClientOverview from './client/overview';
import ClientCampaigns from './client/campaigns';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  children?: MenuItem[];
  badge?: string;
}

const mainMenuItems: MenuItem[] = [
  {
    id: 'overview',
    label: 'Visão Geral',
    icon: Home,
    path: '/cliente',
  },
  {
    id: 'campaigns',
    label: 'Campanhas',
    icon: Target,
    path: '/cliente/campanhas',
    children: [
      { id: 'all-campaigns', label: 'Todas as Campanhas', icon: Target, path: '/cliente/campanhas' },
      { id: 'conversions', label: 'Conversões', icon: TrendingUp, path: '/cliente/conversoes' },
      { id: 'sales', label: 'Vendas', icon: DollarSign, path: '/cliente/vendas' },
    ]
  },
  {
    id: 'analytics',
    label: 'Análises',
    icon: BarChart3,
    path: '/cliente/analise',
    children: [
      { id: 'reports', label: 'Relatórios', icon: BarChart3, path: '/cliente/relatorios' },
      { id: 'funnel', label: 'Funil de Vendas', icon: TrendingUp, path: '/cliente/funil' },
    ]
  },
  {
    id: 'tools',
    label: 'Ferramentas',
    icon: Settings,
    path: '/cliente/ferramentas',
    children: [
      { id: 'pixels', label: 'Pixels', icon: Eye, path: '/cliente/pixels' },
      { id: 'utm-links', label: 'Links UTM', icon: LinkIcon, path: '/cliente/utm-links' },
      { id: 'scripts', label: 'Scripts', icon: Code, path: '/cliente/scripts' },
      { id: 'automation', label: 'Regras Automatizadas', icon: Zap, path: '/cliente/regras-automatizadas' },
      { id: 'webhooks', label: 'Webhooks', icon: Globe, path: '/cliente/webhooks' },
    ]
  },
  {
    id: 'management',
    label: 'Gestão',
    icon: Users,
    path: '/cliente/gestao',
    children: [
      { id: 'expenses', label: 'Despesas', icon: CreditCard, path: '/cliente/despesas' },
      { id: 'multiple-dashboards', label: 'Múltiplos Dashboards', icon: BarChart3, path: '/cliente/multiplos-dashboards' },
      { id: 'retentions', label: 'Retrospectivas', icon: Calendar, path: '/cliente/retrospectivas' },
    ]
  },
  {
    id: 'integrations',
    label: 'Integrações',
    icon: Globe,
    path: '/cliente/integracoes',
    children: [
      { id: 'whatsapp', label: 'WhatsApp', icon: Share2, path: '/cliente/whatsapp' },
    ]
  },
];

const bottomMenuItems: MenuItem[] = [
  {
    id: 'plan',
    label: 'Meu Plano',
    icon: CreditCard,
    path: '/cliente/plano',
  },
  {
    id: 'referrals',
    label: 'Indique e Ganhe',
    icon: Gift,
    path: '/cliente/indique-ganhe',
  },
  {
    id: 'support',
    label: 'Suporte',
    icon: HelpCircle,
    path: '/cliente/suporte',
  },
  {
    id: 'news',
    label: 'Novidades',
    icon: Bell,
    path: '/cliente/novidades',
    badge: '3',
  },
  {
    id: 'help',
    label: 'Central de Ajuda',
    icon: HelpCircle,
    path: '/cliente/ajuda',
  },
  {
    id: 'settings',
    label: 'Configurações',
    icon: Settings,
    path: '/cliente/configuracoes',
  },
];

export default function ClientDashboard() {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['campaigns', 'analytics']);

  // Mock user data for client dashboard
  const user = {
    id: '1',
    name: 'Cliente Demo',
    email: 'cliente@bueirodigital.com',
    plan: 'Premium'
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path: string) => location === path;
  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isItemExpanded = isExpanded(item.id);
    const active = isActive(item.path);

    return (
      <div key={item.id} className="mb-1">
        <div
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
            active
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
          } ${level > 0 ? 'ml-4' : ''}`}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            }
          }}
        >
          <item.icon className="h-5 w-5 mr-3" />
          <span className="flex-1">
            {hasChildren ? (
              <span className="select-none">{item.label}</span>
            ) : (
              <Link href={item.path} className="block w-full">
                {item.label}
              </Link>
            )}
          </span>
          {item.badge && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(item.id);
              }}
              className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {isItemExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        
        {hasChildren && isItemExpanded && (
          <div className="mt-1">
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const Sidebar = () => {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-sm"></div>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
              Bueiro Digital
            </span>
          </div>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-medium">
                {user?.name?.[0] || 'U'}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.name || 'Usuário'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Plano {user?.plan || 'Premium'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {mainMenuItems.map(item => renderMenuItem(item))}
        </nav>

        {/* Bottom Navigation */}
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            {bottomMenuItems.map(item => renderMenuItem(item))}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sair
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (location) {
      case '/cliente':
      case '/cliente/overview':
        return <ClientOverview />;
      case '/cliente/campanhas':
        return <ClientCampaigns />;
      default:
        return (
          <div className="p-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-yellow-800 mb-2">Página em desenvolvimento</h3>
              <p className="text-yellow-700">Esta funcionalidade está sendo implementada.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Mobile header com botão menu */}
          <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Bueiro Digital</h1>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-medium text-sm">
                  {user?.name?.[0] || 'U'}
                </span>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}