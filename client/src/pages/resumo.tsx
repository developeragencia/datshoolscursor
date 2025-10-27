import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/layout/sidebar";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  BarChart3,
  Users,
  Eye,
  MousePointer,
  Target,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];

export default function Resumo() {
  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/sales/stats"],
    queryFn: () => fetch("/api/sales/stats?userId=3").then(res => res.json())
  });

  // Fetch recent sales
  const { data: sales, isLoading: salesLoading } = useQuery({
    queryKey: ["/api/sales"],
    queryFn: () => fetch("/api/sales?userId=3").then(res => res.json())
  });

  // Mock data for charts (in a real app, this would come from APIs)
  const revenueData = [
    { name: 'Jan', revenue: 4000, sales: 24 },
    { name: 'Fev', revenue: 3000, sales: 18 },
    { name: 'Mar', revenue: 5000, sales: 32 },
    { name: 'Abr', revenue: 4500, sales: 28 },
    { name: 'Mai', revenue: 6000, sales: 38 },
    { name: 'Jun', revenue: 7500, sales: 45 },
    { name: 'Jul', revenue: 8000, sales: 52 },
    { name: 'Ago', revenue: 7200, sales: 48 },
    { name: 'Set', revenue: 9000, sales: 58 },
    { name: 'Out', revenue: 8500, sales: 55 },
    { name: 'Nov', revenue: 10500, sales: 68 },
    { name: 'Dez', revenue: 12000, sales: 75 }
  ];

  const trafficSourceData = [
    { name: 'Facebook Ads', value: 35, color: '#1877f2' },
    { name: 'Google Ads', value: 28, color: '#4285f4' },
    { name: 'Instagram', value: 18, color: '#e4405f' },
    { name: 'TikTok Ads', value: 12, color: '#000000' },
    { name: 'Outros', value: 7, color: '#6b7280' }
  ];

  const campaignPerformanceData = [
    { name: 'Black Friday', impressions: 15000, clicks: 850, conversions: 12, revenue: 2400 },
    { name: 'Google Search', impressions: 8500, clicks: 420, conversions: 8, revenue: 1600 },
    { name: 'Promoção Verão', impressions: 6200, clicks: 290, conversions: 5, revenue: 850 },
    { name: 'Natal 2024', impressions: 12000, clicks: 580, conversions: 15, revenue: 3200 },
    { name: 'Ano Novo', impressions: 9800, clicks: 445, conversions: 9, revenue: 1850 }
  ];

  const getMetricIcon = (change: number) => {
    if (change > 0) return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    if (change < 0) return <ArrowDownRight className="h-4 w-4 text-red-600" />;
    return <div className="h-4 w-4" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  if (statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Resumo Geral</h1>
              <p className="text-gray-600">
                Visão completa do desempenho das suas campanhas
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Receita Total</p>
                    <p className="text-2xl font-bold text-gray-900">
                      R$ {stats?.totalRevenue?.toFixed(2) || "1,544.00"}
                    </p>
                    <div className="flex items-center mt-2">
                      {getMetricIcon(stats?.revenueGrowth || 12.5)}
                      <span className={`text-sm font-medium ml-1 ${getChangeColor(stats?.revenueGrowth || 12.5)}`}>
                        +{stats?.revenueGrowth || 12.5}% vs mês anterior
                      </span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Vendas</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats?.totalSales || 3}
                    </p>
                    <div className="flex items-center mt-2">
                      {getMetricIcon(stats?.salesGrowth || 8.3)}
                      <span className={`text-sm font-medium ml-1 ${getChangeColor(stats?.salesGrowth || 8.3)}`}>
                        +{stats?.salesGrowth || 8.3}% vs mês anterior
                      </span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
                    <p className="text-2xl font-bold text-gray-900">
                      R$ {stats?.avgOrderValue?.toFixed(2) || "514.67"}
                    </p>
                    <div className="flex items-center mt-2">
                      {getMetricIcon(stats?.avgOrderGrowth || 4.1)}
                      <span className={`text-sm font-medium ml-1 ${getChangeColor(stats?.avgOrderGrowth || 4.1)}`}>
                        +{stats?.avgOrderGrowth || 4.1}% vs mês anterior
                      </span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats?.conversionRate || 3.2}%
                    </p>
                    <div className="flex items-center mt-2">
                      {getMetricIcon(stats?.conversionRateChange || 0.8)}
                      <span className={`text-sm font-medium ml-1 ${getChangeColor(stats?.conversionRateChange || 0.8)}`}>
                        +{stats?.conversionRateChange || 0.8}% vs mês anterior
                      </span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
              <TabsTrigger value="traffic">Tráfego</TabsTrigger>
              <TabsTrigger value="sales">Vendas</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Receita dos Últimos 12 Meses</CardTitle>
                    <CardDescription>
                      Evolução da receita e número de vendas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => [
                            name === 'revenue' ? `R$ ${value}` : value,
                            name === 'revenue' ? 'Receita' : 'Vendas'
                          ]}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#ef4444" 
                          fill="#ef4444" 
                          fillOpacity={0.1}
                        />
                        <Line type="monotone" dataKey="sales" stroke="#3b82f6" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Traffic Sources */}
                <Card>
                  <CardHeader>
                    <CardTitle>Fontes de Tráfego</CardTitle>
                    <CardDescription>
                      Distribuição do tráfego por canal
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={trafficSourceData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {trafficSourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns">
              <Card>
                <CardHeader>
                  <CardTitle>Performance das Campanhas</CardTitle>
                  <CardDescription>
                    Métricas detalhadas de cada campanha ativa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaignPerformanceData.map((campaign) => (
                      <div key={campaign.name} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-lg">{campaign.name}</h3>
                          <Badge className="bg-green-100 text-green-800">Ativa</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <Eye className="h-4 w-4 text-gray-500 mr-1" />
                              <span className="text-sm text-gray-600">Impressões</span>
                            </div>
                            <p className="text-lg font-bold">{campaign.impressions.toLocaleString()}</p>
                          </div>
                          
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <MousePointer className="h-4 w-4 text-gray-500 mr-1" />
                              <span className="text-sm text-gray-600">Cliques</span>
                            </div>
                            <p className="text-lg font-bold">{campaign.clicks.toLocaleString()}</p>
                          </div>
                          
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <Target className="h-4 w-4 text-gray-500 mr-1" />
                              <span className="text-sm text-gray-600">Conversões</span>
                            </div>
                            <p className="text-lg font-bold">{campaign.conversions}</p>
                          </div>
                          
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                              <span className="text-sm text-gray-600">Receita</span>
                            </div>
                            <p className="text-lg font-bold">R$ {campaign.revenue.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            CTR: {((campaign.clicks / campaign.impressions) * 100).toFixed(2)}% | 
                            CR: {((campaign.conversions / campaign.clicks) * 100).toFixed(2)}% |
                            ROAS: {(campaign.revenue / (campaign.clicks * 1.5)).toFixed(2)}x
                          </div>
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Traffic Tab */}
            <TabsContent value="traffic">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tráfego por Canal</CardTitle>
                    <CardDescription>Volume mensal de visitantes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Qualidade do Tráfego</CardTitle>
                    <CardDescription>Métricas de engajamento</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Taxa de Rejeição</span>
                        <span className="text-lg font-bold">32.5%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Tempo na Página</span>
                        <span className="text-lg font-bold">2m 34s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Páginas por Sessão</span>
                        <span className="text-lg font-bold">3.2</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Sessões Únicas</span>
                        <span className="text-lg font-bold">1,247</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Sales Tab */}
            <TabsContent value="sales">
              <Card>
                <CardHeader>
                  <CardTitle>Vendas Recentes</CardTitle>
                  <CardDescription>
                    Últimas transações realizadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesLoading ? (
                      <div className="flex justify-center py-8">
                        <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
                      </div>
                    ) : (
                      sales?.slice(0, 10)?.map((sale: any) => (
                        <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                              <DollarSign className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-semibold">{sale.productName}</p>
                              <p className="text-sm text-gray-600">{sale.customerEmail}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-bold text-green-600">R$ {parseFloat(sale.amount).toFixed(2)}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {sale.platform}
                              </Badge>
                              <Badge 
                                className={`text-xs ${
                                  sale.status === 'approved' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {sale.status === 'approved' ? 'Aprovada' : 'Reembolsada'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
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