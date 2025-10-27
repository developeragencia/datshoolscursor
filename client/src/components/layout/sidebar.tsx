import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Target, 
  BarChart3, 
  Settings, 
  Users, 
  FileText, 
  HelpCircle, 
  MessageSquare,
  Rocket,
  Gift,
  Calendar,
  CreditCard,
  Shield,
  Bell,
  Globe,
  Facebook,
  Megaphone,
  Smartphone,
  Zap,
  DollarSign,
  TrendingUp,
  Receipt,
  Layers,
  Link as LinkIcon,
  Code,
  MousePointer,
  Webhook,
  Database,
  Share2
} from "lucide-react";
import { Link, useLocation } from "wouter";

interface SidebarProps {
  className?: string;
}

interface MenuItem {
  name: string;
  href: string;
  icon: any;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuItems: MenuSection[] = [
  {
    title: "Visão Geral",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Resumo", href: "/resumo", icon: BarChart3 },
      { name: "Análise", href: "/analise", icon: BarChart3 }
    ]
  },
  {
    title: "Campanhas",
    items: [
      { name: "Gerenciar Campanhas", href: "/campanhas", icon: Target },
      { name: "Meta Ads", href: "/meta-ads", icon: Megaphone },
      { name: "Google Ads", href: "/google-ads", icon: Globe },
      { name: "TikTok Ads", href: "/tiktok-ads", icon: Smartphone },
      { name: "Contas Facebook", href: "/facebook-accounts", icon: Facebook },
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
      { name: "APIs Externas", href: "/apis", icon: Database },
      { name: "Integrações", href: "/integracoes", icon: Globe },
      { name: "WhatsApp", href: "/whatsapp", icon: Share2 }
    ]
  },
  {
    title: "Configurações",
    items: [
      { name: "Múltiplos Dashboards", href: "/multiplos-dashboards", icon: LayoutDashboard },
      { name: "Personalizar Dashboard", href: "/personalizar-dashboard", icon: Settings },
      { name: "Compartilhar Dashboard", href: "/compartilhar", icon: Share2 },
      { name: "Configurações", href: "/configuracoes", icon: Settings }
    ]
  },
  {
    title: "Administração",
    items: [
      { name: "Plano & Faturamento", href: "/plano", icon: CreditCard },
      { name: "Usuários", href: "/usuarios", icon: Users },
      { name: "Segurança", href: "/seguranca", icon: Shield },
      { name: "Notificações", href: "/notificacoes", icon: Bell }
    ]
  },
  {
    title: "Suporte",
    items: [
      { name: "Tutorial Admin", href: "/admin-tutorial", icon: FileText },
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
      { name: "Suporte", href: "/suporte", icon: HelpCircle }
    ]
  }
];

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [location] = useLocation();

  return (
    <div className={cn(
      "flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-gray-100">Bueiro Digital</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-6">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {!collapsed && (
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 mb-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const isActive = location === item.href;
                  return (
                    <Link key={itemIndex} href={item.href}>
                      <div className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                        isActive 
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100" 
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                        collapsed && "justify-center px-2"
                      )}>
                        <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "")} />
                        {!collapsed && <span>{item.name}</span>}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}