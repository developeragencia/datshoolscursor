import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  Target,
  Settings,
  Database,
  Shield,
  BarChart3,
  FileText,
  Bell,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

interface AdminSidebarProps {
  user?: any;
  onLogout?: () => void;
}

export function AdminSidebar({ user, onLogout }: AdminSidebarProps) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard Admin" },
    { path: "/admin/users", icon: Users, label: "Gerenciar Usuários" },
    { path: "/admin/campaigns", icon: Target, label: "Todas Campanhas" },
    { path: "/admin/reports", icon: BarChart3, label: "Relatórios Gerais" },
    { path: "/admin/logs", icon: FileText, label: "Logs do Sistema" },
    { path: "/admin/settings", icon: Settings, label: "Configurações" },
    { path: "/admin/database", icon: Database, label: "Banco de Dados" },
    { path: "/admin/notifications", icon: Bell, label: "Notificações" },
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
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-purple-900 to-indigo-900 text-white border-r border-purple-700 w-64 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-purple-700">
            <Link href="/admin">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6" />
                <div>
                  <h2 className="text-lg font-bold">Admin Panel</h2>
                  <p className="text-xs text-purple-200">Dashtools</p>
                </div>
              </div>
            </Link>
            {user && (
              <div className="mt-3">
                <p className="text-sm font-medium truncate">
                  {user.firstName || user.username}
                </p>
                <Badge variant="secondary" className="mt-1 bg-purple-700 text-white border-0">
                  Administrator
                </Badge>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={isActive(item.path) ? "secondary" : "ghost"}
                      className={`w-full justify-start ${
                        isActive(item.path)
                          ? "bg-white text-purple-900 hover:bg-white"
                          : "text-white hover:bg-purple-800"
                      }`}
                      size="sm"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-purple-700">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="w-full mb-2 text-white hover:bg-purple-800"
                size="sm"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full border-purple-300 text-white hover:bg-purple-800"
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

