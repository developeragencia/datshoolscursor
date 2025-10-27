import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Target,
  DollarSign,
  BarChart3,
  FileText,
  TrendingUp,
  Link as LinkIcon,
  Eye,
  Settings,
  Webhook,
  Zap,
  Facebook,
  Globe,
  Video,
  GitBranch,
  Users,
  LogOut,
  Menu,
  X,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

interface ClientSidebarProps {
  user?: any;
  onLogout?: () => void;
}

export function ClientSidebar({ user, onLogout }: ClientSidebarProps) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [adsOpen, setAdsOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/campanhas", icon: Target, label: "Campanhas" },
    { path: "/vendas", icon: DollarSign, label: "Vendas" },
    { path: "/relatorios", icon: BarChart3, label: "Relatórios" },
    { path: "/resumo", icon: FileText, label: "Resumo" },
    { path: "/analise", icon: TrendingUp, label: "Análise" },
    { path: "/utm-links", icon: LinkIcon, label: "UTM Links" },
    { path: "/pixels", icon: Eye, label: "Pixels" },
    { path: "/funil", icon: GitBranch, label: "Funil" },
    { path: "/atribuicao", icon: Users, label: "Atribuição" },
  ];

  const adsItems = [
    { path: "/meta-ads", icon: Facebook, label: "Meta Ads" },
    { path: "/google-ads", icon: Globe, label: "Google Ads" },
    { path: "/tiktok-ads", icon: Video, label: "TikTok Ads" },
  ];

  const settingsItems = [
    { path: "/configuracoes", icon: Settings, label: "Configurações" },
    { path: "/webhooks", icon: Webhook, label: "Webhooks" },
    { path: "/regras-automatizadas", icon: Zap, label: "Regras Auto" },
    { path: "/integracoes", icon: Target, label: "Integrações" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white border-r w-64 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b">
            <Link href="/">
              <h2 className="text-xl font-bold text-blue-600">Dashtools</h2>
            </Link>
            {user && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName || user.username}
                </p>
                <Badge variant="outline" className="mt-1">
                  {user.planType || "Gratuito"}
                </Badge>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-1">
              {/* Main Items */}
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className="w-full justify-start"
                      size="sm"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}

              {/* Ads Section */}
              <div className="pt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-between"
                  size="sm"
                  onClick={() => setAdsOpen(!adsOpen)}
                >
                  <span className="flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Anúncios
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      adsOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
                {adsOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {adsItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.path} href={item.path}>
                          <Button
                            variant={isActive(item.path) ? "default" : "ghost"}
                            className="w-full justify-start"
                            size="sm"
                          >
                            <Icon className="h-4 w-4 mr-2" />
                            {item.label}
                          </Button>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Settings Section */}
              <div className="pt-4 border-t">
                <p className="text-xs font-semibold text-gray-500 px-3 mb-2">
                  CONFIGURAÇÕES
                </p>
                {settingsItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.path} href={item.path}>
                      <Button
                        variant={isActive(item.path) ? "default" : "ghost"}
                        className="w-full justify-start"
                        size="sm"
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full"
              size="sm"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

