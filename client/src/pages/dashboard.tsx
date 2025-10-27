import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Zap,
  Calendar,
  LogOut,
  Settings,
  Bell,
  Search
} from "lucide-react";

interface DashboardStats {
  totalCampaigns: number;
  totalSales: number;
  totalRevenue: number;
  conversionRate: number;
  trends: {
    campaigns: number;
    sales: number;
    revenue: number;
    conversion: number;
  };
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch user data
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/auth/me"],
  });

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
    enabled: !!user,
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    setLocation("/login");
    return null;
  }

  const statsData = stats || {
    totalCampaigns: 0,
    totalSales: 0,
    totalRevenue: 0,
    conversionRate: 0,
    trends: { campaigns: 0, sales: 0, revenue: 0, conversion: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <h1 className="text-xl font-bold text-blue-600">Dashtools</h1>
              </Link>
              <Badge variant="outline" className="hidden sm:inline-flex">
                {user.planType || 'Gratuito'}
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/configuracoes">
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo, {user.firstName || user.username}! 👋
          </h2>
          <p className="text-gray-600">
            Aqui está um resumo das suas campanhas e resultados.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Campaigns */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total de Campanhas
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {statsData.totalCampaigns}
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                {statsData.trends.campaigns >= 0 ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-green-600">+{statsData.trends.campaigns}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                    <span className="text-red-600">{statsData.trends.campaigns}%</span>
                  </>
                )}
                <span className="ml-1">vs. mês anterior</span>
              </p>
            </CardContent>
          </Card>

          {/* Total Sales */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total de Vendas
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {statsData.totalSales}
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                {statsData.trends.sales >= 0 ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-green-600">+{statsData.trends.sales}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                    <span className="text-red-600">{statsData.trends.sales}%</span>
                  </>
                )}
                <span className="ml-1">vs. mês anterior</span>
              </p>
            </CardContent>
          </Card>

          {/* Total Revenue */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Receita Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                R$ {statsData.totalRevenue.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                {statsData.trends.revenue >= 0 ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-green-600">+{statsData.trends.revenue}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                    <span className="text-red-600">{statsData.trends.revenue}%</span>
                  </>
                )}
                <span className="ml-1">vs. mês anterior</span>
              </p>
            </CardContent>
          </Card>

          {/* Conversion Rate */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Taxa de Conversão
              </CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {statsData.conversionRate.toFixed(2)}%
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                {statsData.trends.conversion >= 0 ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-green-600">+{statsData.trends.conversion}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                    <span className="text-red-600">{statsData.trends.conversion}%</span>
                  </>
                )}
                <span className="ml-1">vs. mês anterior</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Ações Rápidas
              </CardTitle>
              <CardDescription>
                Acesse as funcionalidades principais rapidamente
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2" 
                asChild
              >
                <Link href="/campanhas">
                  <Zap className="h-5 w-5" />
                  <span>Campanhas</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                asChild
              >
                <Link href="/vendas">
                  <DollarSign className="h-5 w-5" />
                  <span>Vendas</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                asChild
              >
                <Link href="/integracoes">
                  <Target className="h-5 w-5" />
                  <span>Integrações</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                asChild
              >
                <Link href="/relatorios">
                  <BarChart3 className="h-5 w-5" />
                  <span>Relatórios</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                asChild
              >
                <Link href="/configuracoes">
                  <Settings className="h-5 w-5" />
                  <span>Configurações</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                asChild
              >
                <Link href="/suporte">
                  <Bell className="h-5 w-5" />
                  <span>Suporte</span>
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Próximos Passos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Configure suas integrações</p>
                  <p className="text-xs text-gray-600">Conecte suas plataformas favoritas</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Crie sua primeira campanha</p>
                  <p className="text-xs text-gray-600">Comece a rastrear seus resultados</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Explore os relatórios</p>
                  <p className="text-xs text-gray-600">Analise seus dados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Plan (for free users) */}
        {user.planType === 'gratuito' && (
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    🚀 Desbloqueie Recursos Premium
                  </h3>
                  <p className="text-gray-600">
                    Upgrade seu plano e tenha acesso ilimitado a todas as funcionalidades
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/precos">
                    Ver Planos
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

