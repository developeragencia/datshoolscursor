import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import {
  Users,
  DollarSign,
  Activity,
  TrendingUp,
  Server,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  totalCampaigns: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
  pendingActions: number;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch user data
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/auth/me"],
  });

  // Fetch admin stats
  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
    enabled: !!user && user.userType === 'admin',
  });

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setLocation("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando painel admin...</p>
        </div>
      </div>
    );
  }

  if (!user || user.userType !== 'admin') {
    setLocation("/dashboard");
    return null;
  }

  const statsData = stats || {
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    totalCampaigns: 0,
    systemHealth: 'healthy' as const,
    pendingActions: 0
  };

  const healthStatus = {
    healthy: { text: 'Sistema Saudável', color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle },
    warning: { text: 'Atenção Necessária', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: AlertCircle },
    critical: { text: 'Ação Urgente', color: 'text-red-600', bg: 'bg-red-100', icon: AlertCircle }
  };

  const currentHealth = healthStatus[statsData.systemHealth];
  const HealthIcon = currentHealth.icon;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar user={user} onLogout={handleLogout} />
      
      <div className="flex-1 lg:ml-64">
        <div className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo, {user.firstName || 'Admin'}! 🛡️
          </h2>
          <p className="text-gray-600">
            Visão geral do sistema e gerenciamento de usuários
          </p>
        </div>

        {/* System Health Alert */}
        <Card className={`mb-8 border-2 ${statsData.systemHealth !== 'healthy' ? 'border-yellow-300' : 'border-green-300'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${currentHealth.bg} flex items-center justify-center`}>
                  <HealthIcon className={`h-6 w-6 ${currentHealth.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Status do Sistema</h3>
                  <p className={`text-sm ${currentHealth.color} font-medium`}>
                    {currentHealth.text}
                  </p>
                </div>
              </div>
              {statsData.pendingActions > 0 && (
                <Badge variant="destructive">
                  {statsData.pendingActions} ações pendentes
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Admin Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total de Usuários
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {statsData.totalUsers}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {statsData.activeUsers} ativos hoje
              </p>
            </CardContent>
          </Card>

          {/* Total Revenue */}
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Receita Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                R$ {statsData.totalRevenue.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.5% este mês
              </p>
            </CardContent>
          </Card>

          {/* Total Campaigns */}
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Campanhas Ativas
              </CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {statsData.totalCampaigns}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Em todas as contas
              </p>
            </CardContent>
          </Card>

          {/* System Performance */}
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Performance
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                98.5%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Uptime nos últimos 30 dias
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Management Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento</CardTitle>
              <CardDescription>
                Acesso rápido às funções administrativas
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-24 flex-col gap-2"
                asChild
              >
                <Link href="/admin/users">
                  <Users className="h-6 w-6" />
                  <span>Gerenciar Usuários</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex-col gap-2"
                asChild
              >
                <Link href="/admin/campaigns">
                  <Activity className="h-6 w-6" />
                  <span>Ver Campanhas</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex-col gap-2"
                asChild
              >
                <Link href="/admin/settings">
                  <Settings className="h-6 w-6" />
                  <span>Configurações</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex-col gap-2"
                asChild
              >
                <Link href="/admin/logs">
                  <Database className="h-6 w-6" />
                  <span>Logs do Sistema</span>
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Novo usuário registrado</p>
                  <p className="text-xs text-gray-600">João Silva - Plano Premium</p>
                  <p className="text-xs text-gray-400 mt-1">Há 5 minutos</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Pagamento recebido</p>
                  <p className="text-xs text-gray-600">R$ 497,00 - Plano Monster</p>
                  <p className="text-xs text-gray-400 mt-1">Há 15 minutos</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Campanha criada</p>
                  <p className="text-xs text-gray-600">Black Friday 2025</p>
                  <p className="text-xs text-gray-400 mt-1">Há 1 hora</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Info */}
        <Card className="mt-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Server className="h-8 w-8" />
                <div>
                  <h3 className="font-semibold">Informações do Sistema</h3>
                  <p className="text-sm text-gray-300">
                    Versão 1.0.0 • Node {process.version || 'N/A'} • PostgreSQL 16
                  </p>
                </div>
              </div>
              <Button variant="secondary" asChild>
                <Link href="/admin/system">
                  Ver Detalhes
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}

