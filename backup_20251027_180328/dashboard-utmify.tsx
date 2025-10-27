import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  BarChart3, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Settings,
  Plus,
  Eye,
  Filter,
  Target,
  Activity,
  Zap,
  Globe,
  Smartphone,
  PlayCircle,
  PauseCircle,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  Megaphone,
  RefreshCw,
  Copy,
  ExternalLink,
  Edit,
  Trash2,
  MoreHorizontal,
  Search
} from "lucide-react";
import { useLocation } from "wouter";

// Mock data replicando o UTMify real
const mockDashboardStats = {
  totalRevenue: 89247.50,
  totalSales: 342,
  avgOrderValue: 261.24,
  conversionRate: 4.7,
  activeAds: 23,
  totalClicks: 15642,
  ctr: 2.3,
  cpm: 12.45
};

const mockRecentSales = [
  {
    id: 1,
    orderId: "HM-2025001",
    productName: "Curso Completo de Marketing Digital",
    customerEmail: "cliente1@email.com",
    amount: 497.00,
    status: "approved",
    platform: "Hotmart",
    utmSource: "facebook",
    utmMedium: "cpc",
    utmCampaign: "curso-marketing-2025",
    createdAt: "2025-01-27T14:30:00Z"
  },
  {
    id: 2,
    orderId: "KW-2025002",
    productName: "Mentoria Individual 1:1",
    customerEmail: "cliente2@email.com",
    amount: 1997.00,
    status: "approved",
    platform: "Kiwify",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "mentoria-premium",
    createdAt: "2025-01-27T13:45:00Z"
  },
  {
    id: 3,
    orderId: "ED-2025003",
    productName: "Ebook - Estratégias de Vendas",
    customerEmail: "cliente3@email.com",
    amount: 97.00,
    status: "approved",
    platform: "Eduzz",
    utmSource: "instagram",
    utmMedium: "social",
    utmCampaign: "ebook-vendas",
    createdAt: "2025-01-27T12:15:00Z"
  }
];

const mockActiveCampaigns = [
  {
    id: 1,
    name: "Curso Marketing - Lookalike 1%",
    platform: "Meta Ads",
    adAccountName: "Conta Principal",
    status: "active",
    budget: 500.00,
    spent: 287.45,
    sales: 12,
    revenue: 5964.00,
    roas: 20.75,
    cpm: 15.30,
    ctr: 3.2,
    costPerSale: 23.95,
    impressions: 45320,
    clicks: 1450,
    utmCampaign: "curso-marketing-lookalike"
  },
  {
    id: 2,
    name: "Mentoria - Interesse Marketing",
    platform: "Meta Ads", 
    adAccountName: "Conta Escalação",
    status: "active",
    budget: 800.00,
    spent: 623.80,
    sales: 8,
    revenue: 15976.00,
    roas: 25.61,
    cpm: 18.90,
    ctr: 2.8,
    costPerSale: 77.98,
    impressions: 32980,
    clicks: 923,
    utmCampaign: "mentoria-interesse"
  },
  {
    id: 3,
    name: "Google Ads - [Marketing Digital]",
    platform: "Google Ads",
    adAccountName: "Google Principal",
    status: "active",
    budget: 300.00,
    spent: 234.67,
    sales: 5,
    revenue: 2485.00,
    roas: 10.59,
    cpm: 22.15,
    ctr: 4.1,
    costPerSale: 46.93,
    impressions: 18760,
    clicks: 769,
    utmCampaign: "google-marketing-digital"
  }
];

export default function DashboardUTMify() {
  const [location, setLocation] = useLocation();
  const [dateRange, setDateRange] = useState("7");
  const [selectedView, setSelectedView] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCampaignAction = (campaignId: number, action: string) => {
    // Action executed: ${action} campanha ${campaignId}
    // Implementar integração real com APIs do Facebook/Google
  };

  const handleDuplicateCampaign = (campaignId: number) => {
    // Action executed: Duplicar campanha ${campaignId}
    // Implementar duplicação de campanha
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header do Dashboard */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Inteligente</h1>
              <p className="text-gray-600">Visão completa e intuitiva de todas as métricas da sua operação</p>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="1">Hoje</option>
                <option value="7">Últimos 7 dias</option>
                <option value="30">Últimos 30 dias</option>
                <option value="90">Últimos 90 dias</option>
              </select>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                Nova Campanha
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Banner de Destaque - Otimização Rápida */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Otimização Rápida</h3>
                    <p className="text-red-100">
                      Escale ou desative suas campanhas direto pelo relatório, sem precisar abrir o Facebook Manager
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="border-white text-red-600 bg-white hover:bg-red-50">
                  Acessar Ferramenta
                </Button>
              </div>
            </div>
          </div>

          {/* Cards de Estatísticas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Receita Total</CardTitle>
                <DollarSign className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700">
                  {formatCurrency(mockDashboardStats.totalRevenue)}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                  <p className="text-xs text-green-600 font-medium">+18.2% vs período anterior</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total de Vendas</CardTitle>
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-700">{mockDashboardStats.totalSales}</div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-blue-600" />
                  <p className="text-xs text-blue-600 font-medium">+12.5% vs período anterior</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Ticket Médio</CardTitle>
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-700">
                  {formatCurrency(mockDashboardStats.avgOrderValue)}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-purple-600" />
                  <p className="text-xs text-purple-600 font-medium">+5.1% vs período anterior</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Taxa de Conversão</CardTitle>
                <Target className="h-5 w-5 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-700">
                  {formatPercent(mockDashboardStats.conversionRate)}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-orange-600" />
                  <p className="text-xs text-orange-600 font-medium">+2.3% vs período anterior</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs de Conteúdo Principal */}
          <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="campaigns">Gerenciar Campanhas</TabsTrigger>
              <TabsTrigger value="sales">Vendas em Tempo Real</TabsTrigger>
              <TabsTrigger value="analytics">Análise Avançada</TabsTrigger>
            </TabsList>

            {/* Visão Geral */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Vendas Recentes */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Vendas em Tempo Real</CardTitle>
                        <CardDescription>
                          Rastreamento preciso de vendas por campanha - atualização a cada 30 segundos
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-700 border-green-300">
                          <Activity className="h-3 w-3 mr-1" />
                          Ao vivo
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRecentSales.map((sale) => (
                        <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                              <DollarSign className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">{sale.productName}</p>
                              <p className="text-sm text-gray-500">{sale.customerEmail}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {sale.utmCampaign}
                                </Badge>
                                <span className="text-xs text-gray-400">
                                  {new Date(sale.createdAt).toLocaleString('pt-BR')}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">
                              {formatCurrency(sale.amount)}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Aprovada
                              </Badge>
                              <span className="text-sm text-gray-500">{sale.platform}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="outline" className="w-full">
                        Ver Todas as Vendas
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance de Campanhas */}
                <Card>
                  <CardHeader>
                    <CardTitle>Campanhas Top Performance</CardTitle>
                    <CardDescription>
                      Suas campanhas com melhor ROAS
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockActiveCampaigns.slice(0, 3).map((campaign) => (
                        <div key={campaign.id} className="p-4 border rounded-lg space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${campaign.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                              <div>
                                <p className="font-medium text-sm">{campaign.name}</p>
                                <p className="text-xs text-gray-500">{campaign.platform}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCampaignAction(campaign.id, campaign.status === 'active' ? 'pause' : 'play')}
                              className="h-7 w-7 p-0"
                            >
                              {campaign.status === 'active' ? 
                                <PauseCircle className="h-4 w-4" /> : 
                                <PlayCircle className="h-4 w-4" />
                              }
                            </Button>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Gasto</span>
                              <span className="font-medium">{formatCurrency(campaign.spent)}</span>
                            </div>
                            <Progress 
                              value={(campaign.spent / campaign.budget) * 100} 
                              className="h-2"
                            />
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Orçamento</span>
                              <span>{formatCurrency(campaign.budget)}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 pt-2 border-t text-center">
                            <div>
                              <div className="text-sm font-bold text-green-600">{campaign.sales}</div>
                              <div className="text-xs text-gray-500">Vendas</div>
                            </div>
                            <div>
                              <div className="text-sm font-bold text-blue-600">
                                {formatPercent(campaign.roas)}
                              </div>
                              <div className="text-xs text-gray-500">ROAS</div>
                            </div>
                            <div>
                              <div className="text-sm font-bold text-purple-600">
                                {formatPercent(campaign.ctr)}
                              </div>
                              <div className="text-xs text-gray-500">CTR</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Gerenciar Campanhas */}
            <TabsContent value="campaigns" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Gerenciar Campanhas</CardTitle>
                      <CardDescription>
                        Escale ou desative campanhas direto pelo relatório
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          placeholder="Buscar campanhas..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <Button className="bg-red-600 hover:bg-red-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Nova Campanha
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockActiveCampaigns.map((campaign) => (
                      <div key={campaign.id} className="p-6 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${campaign.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                            <div>
                              <h3 className="font-semibold text-lg">{campaign.name}</h3>
                              <p className="text-sm text-gray-500">{campaign.platform} • {campaign.adAccountName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDuplicateCampaign(campaign.id)}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicar
                            </Button>
                            <Button
                              variant={campaign.status === 'active' ? 'destructive' : 'default'}
                              size="sm"
                              onClick={() => handleCampaignAction(campaign.id, campaign.status === 'active' ? 'pause' : 'play')}
                            >
                              {campaign.status === 'active' ? 
                                <>
                                  <PauseCircle className="h-4 w-4 mr-2" />
                                  Pausar
                                </> : 
                                <>
                                  <PlayCircle className="h-4 w-4 mr-2" />
                                  Ativar
                                </>
                              }
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{campaign.sales}</div>
                            <div className="text-xs text-gray-500">Vendas</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{formatCurrency(campaign.revenue)}</div>
                            <div className="text-xs text-gray-500">Receita</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{formatPercent(campaign.roas)}</div>
                            <div className="text-xs text-gray-500">ROAS</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-orange-600">{formatCurrency(campaign.spent)}</div>
                            <div className="text-xs text-gray-500">Gasto</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-indigo-600">{formatCurrency(campaign.cpm)}</div>
                            <div className="text-xs text-gray-500">CPM</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-pink-600">{formatPercent(campaign.ctr)}</div>
                            <div className="text-xs text-gray-500">CTR</div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Orçamento utilizado:</span>
                            <span className="font-medium">
                              {formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)} 
                              ({((campaign.spent / campaign.budget) * 100).toFixed(1)}%)
                            </span>
                          </div>
                          <Progress 
                            value={(campaign.spent / campaign.budget) * 100} 
                            className="h-2 mt-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vendas em Tempo Real */}
            <TabsContent value="sales">
              <Card>
                <CardHeader>
                  <CardTitle>Vendas em Tempo Real</CardTitle>
                  <CardDescription>
                    Monitoramento completo de todas as conversões
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Sistema de vendas em tempo real será implementado</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Análise Avançada */}
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Análise Avançada</CardTitle>
                  <CardDescription>
                    Relatórios detalhados e insights avançados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Sistema de análise avançada será implementado</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}