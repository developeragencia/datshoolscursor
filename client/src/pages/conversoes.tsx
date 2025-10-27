import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  Target, 
  TrendingUp, 
  Users,
  MousePointer,
  Eye,
  Calendar,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownLeft,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ConversoesPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const { toast } = useToast();

  // Mock conversion data
  const conversionData = {
    totalConversions: 2847,
    conversionRate: 3.24,
    totalVisitors: 87890,
    totalClicks: 12450,
    conversionsToday: 42,
    conversionsByPlatform: [
      { platform: "Facebook Ads", conversions: 1235, rate: 4.2, visitors: 29405 },
      { platform: "Google Ads", conversions: 892, rate: 2.8, visitors: 31857 },
      { platform: "TikTok Ads", conversions: 456, rate: 5.1, visitors: 8942 },
      { platform: "Orgânico", conversions: 264, rate: 1.5, visitors: 17686 }
    ],
    recentConversions: [
      {
        id: "CONV-001",
        visitorId: "visitor_123",
        source: "Facebook Ads",
        campaign: "Campanha Black Friday",
        product: "Curso Marketing Digital",
        value: 497.00,
        timestamp: "2025-01-28 14:32:15",
        utmSource: "facebook",
        utmMedium: "cpc",
        utmCampaign: "black_friday_2025"
      },
      {
        id: "CONV-002",
        visitorId: "visitor_456", 
        source: "Google Ads",
        campaign: "Palavras-chave Premium",
        product: "Consultoria 1:1",
        value: 297.00,
        timestamp: "2025-01-28 13:15:42",
        utmSource: "google",
        utmMedium: "cpc",
        utmCampaign: "consultoria_premium"
      }
    ]
  };

  const exportConversions = () => {
    toast({
      title: "Exportando conversões...",
      description: "Gerando relatório detalhado"
    });
    
    setTimeout(() => {
      toast({
        title: "Exportação concluída!",
        description: "Relatório de conversões baixado"
      });
    }, 2000);
  };

  const refreshData = () => {
    toast({
      title: "Dados atualizados!",
      description: "Conversões sincronizadas com sucesso"
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
              <div className="p-3 bg-blue-100 rounded-xl">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Conversões</h1>
                <p className="text-gray-600 mt-1">Acompanhe todas as conversões e taxas de sucesso</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={refreshData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Button variant="outline" onClick={exportConversions}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Conversion Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Conversões</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {conversionData.totalConversions.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">+15.3%</span>
                  <span className="text-sm text-gray-500 ml-2">vs mês anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {conversionData.conversionRate}%
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">+0.8%</span>
                  <span className="text-sm text-gray-500 ml-2">vs mês anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Visitantes Únicos</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {conversionData.totalVisitors.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">+7.2%</span>
                  <span className="text-sm text-gray-500 ml-2">vs mês anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversões Hoje</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {conversionData.conversionsToday}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">+12%</span>
                  <span className="text-sm text-gray-500 ml-2">vs ontem</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conversions by Platform */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Conversões por Plataforma</CardTitle>
              <CardDescription>Performance de conversão por fonte de tráfego</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionData.conversionsByPlatform.map((platform, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        platform.platform.includes('Facebook') ? 'bg-blue-100' :
                        platform.platform.includes('Google') ? 'bg-red-100' :
                        platform.platform.includes('TikTok') ? 'bg-purple-100' : 'bg-gray-100'
                      }`}>
                        {platform.platform.includes('Facebook') ? <Users className="h-5 w-5 text-blue-600" /> :
                         platform.platform.includes('Google') ? <MousePointer className="h-5 w-5 text-red-600" /> :
                         platform.platform.includes('TikTok') ? <Eye className="h-5 w-5 text-purple-600" /> :
                         <Target className="h-5 w-5 text-gray-600" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{platform.platform}</h4>
                        <p className="text-sm text-gray-600">{platform.visitors.toLocaleString('pt-BR')} visitantes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {platform.conversions.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-sm text-gray-600">
                        Taxa: <span className="font-semibold text-green-600">{platform.rate}%</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Conversions */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Conversões Recentes</CardTitle>
              <CardDescription>Últimas conversões registradas no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Fonte</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Campanha</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Produto</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Valor</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">UTM</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Data/Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conversionData.recentConversions.map((conversion) => (
                      <tr key={conversion.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-sm">{conversion.id}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{conversion.source}</Badge>
                        </td>
                        <td className="py-3 px-4">{conversion.campaign}</td>
                        <td className="py-3 px-4">{conversion.product}</td>
                        <td className="py-3 px-4 font-bold text-green-600">
                          R$ {conversion.value.toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-xs space-y-1">
                            <div>Source: <span className="font-mono">{conversion.utmSource}</span></div>
                            <div>Medium: <span className="font-mono">{conversion.utmMedium}</span></div>
                            <div>Campaign: <span className="font-mono">{conversion.utmCampaign}</span></div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {new Date(conversion.timestamp).toLocaleString('pt-BR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}