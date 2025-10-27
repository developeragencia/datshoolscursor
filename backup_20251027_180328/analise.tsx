import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  Activity, 
  TrendingUp, 
  Eye,
  MousePointer,
  Clock,
  Users,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AnalisePage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const { toast } = useToast();

  // Mock analytics data
  const analyticsData = {
    totalImpressions: 485670,
    totalClicks: 18392,
    ctr: 3.78,
    averagePosition: 2.3,
    topPerformingPages: [
      { url: "/produto-digital", impressions: 45670, clicks: 2340, ctr: 5.12 },
      { url: "/curso-marketing", impressions: 38920, clicks: 1890, ctr: 4.86 },
      { url: "/consultoria", impressions: 32150, clicks: 1560, ctr: 4.85 }
    ],
    trafficSources: [
      { source: "Orgânico", visitors: 34560, percentage: 42.3 },
      { source: "Pago", visitors: 28940, percentage: 35.4 },
      { source: "Direto", visitors: 12870, percentage: 15.7 },
      { source: "Referral", visitors: 5380, percentage: 6.6 }
    ],
    deviceData: [
      { device: "Desktop", users: 45230, percentage: 55.2 },
      { device: "Mobile", users: 28940, percentage: 35.3 },
      { device: "Tablet", users: 7580, percentage: 9.5 }
    ],
    hourlyTraffic: [
      { hour: "00:00", visitors: 120 },
      { hour: "03:00", visitors: 85 },
      { hour: "06:00", visitors: 280 },
      { hour: "09:00", visitors: 450 },
      { hour: "12:00", visitors: 520 },
      { hour: "15:00", visitors: 480 },
      { hour: "18:00", visitors: 620 },
      { hour: "21:00", visitors: 380 }
    ]
  };

  const exportAnalytics = () => {
    toast({
      title: "Exportando análises...",
      description: "Gerando relatório completo"
    });
    
    setTimeout(() => {
      toast({
        title: "Export concluído!",
        description: "Relatório de análise baixado"
      });
    }, 2000);
  };

  const refreshAnalytics = () => {
    toast({
      title: "Dados atualizados!",
      description: "Análises sincronizadas com sucesso"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Análise</h1>
                <p className="text-gray-600 mt-1">Insights detalhados sobre performance e tráfego</p>
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
              </select>
              <Button variant="outline" onClick={refreshAnalytics}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Button variant="outline" onClick={exportAnalytics}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Analytics Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Impressões</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {analyticsData.totalImpressions.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">+18.5%</span>
                  <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cliques</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {analyticsData.totalClicks.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <MousePointer className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">+12.3%</span>
                  <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">CTR</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {analyticsData.ctr}%
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowDownLeft className="h-4 w-4 text-red-600 mr-1" />
                  <span className="text-sm font-medium text-red-600">-0.5%</span>
                  <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Posição Média</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {analyticsData.averagePosition}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <BarChart3 className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">Melhorou 0.3</span>
                  <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Traffic Sources */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Fontes de Tráfego</CardTitle>
                <CardDescription>Origem dos visitantes por canal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${
                          source.source === 'Orgânico' ? 'bg-green-500' :
                          source.source === 'Pago' ? 'bg-blue-500' :
                          source.source === 'Direto' ? 'bg-purple-500' : 'bg-orange-500'
                        }`}></div>
                        <span className="font-medium text-gray-900">{source.source}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {source.visitors.toLocaleString('pt-BR')}
                        </p>
                        <p className="text-sm text-gray-600">{source.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Dispositivos</CardTitle>
                <CardDescription>Distribuição por tipo de dispositivo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.deviceData.map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          device.device === 'Desktop' ? 'bg-blue-100' :
                          device.device === 'Mobile' ? 'bg-green-100' : 'bg-purple-100'
                        }`}>
                          {device.device === 'Desktop' ? <BarChart3 className="h-4 w-4 text-blue-600" /> :
                           device.device === 'Mobile' ? <MousePointer className="h-4 w-4 text-green-600" /> :
                           <Activity className="h-4 w-4 text-purple-600" />}
                        </div>
                        <span className="font-medium text-gray-900">{device.device}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {device.users.toLocaleString('pt-BR')}
                        </p>
                        <p className="text-sm text-gray-600">{device.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Pages */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Páginas com Melhor Performance</CardTitle>
              <CardDescription>Páginas que mais recebem tráfego e engajamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Página</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Impressões</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Cliques</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">CTR</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.topPerformingPages.map((page, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className="font-mono text-sm text-blue-600">{page.url}</span>
                        </td>
                        <td className="py-3 px-4 font-medium">
                          {page.impressions.toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 font-medium">
                          {page.clicks.toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-100 text-green-800">
                            {page.ctr.toFixed(2)}%
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="outline">
                            Ver Detalhes
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Hourly Traffic Pattern */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Padrão de Tráfego por Hora</CardTitle>
              <CardDescription>Distribuição de visitantes ao longo do dia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {analyticsData.hourlyTraffic.map((traffic, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gray-100 rounded-lg p-3 mb-2">
                      <Clock className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">{traffic.hour}</p>
                    </div>
                    <p className="font-bold text-gray-900">{traffic.visitors}</p>
                    <p className="text-xs text-gray-500">visitantes</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}