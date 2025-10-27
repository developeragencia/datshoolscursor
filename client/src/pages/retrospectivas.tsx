import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { Calendar, TrendingUp, TrendingDown, DollarSign, Target, Users, Download, Filter } from "lucide-react";

export default function RetrospectivePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Retrospectivas</h1>
                <p className="text-gray-600 mt-1">
                  Análise detalhada dos resultados por período
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Period Selection */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Selecionar Período</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Última Semana", "Último Mês", "Últimos 3 Meses", "Último Ano"].map((period) => (
                  <Button key={period} variant="outline" className="h-12">
                    {period}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Retrospectives */}
          <div className="space-y-6">
            {["Janeiro 2025", "Dezembro 2024", "Novembro 2024"].map((month, index) => (
              <Card key={month} className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{month}</CardTitle>
                    <Badge variant={index === 0 ? "default" : "outline"}>
                      {index === 0 ? "Atual" : "Concluído"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-900">
                        R$ {(Math.random() * 50000 + 10000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </p>
                      <p className="text-sm text-green-700">Faturamento</p>
                      <div className="flex items-center justify-center mt-1">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">+{(Math.random() * 30 + 5).toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-900">
                        {(Math.random() * 5000 + 1000).toFixed(0)}
                      </p>
                      <p className="text-sm text-blue-700">Conversões</p>
                      <div className="flex items-center justify-center mt-1">
                        <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                        <span className="text-xs text-blue-600">+{(Math.random() * 20 + 3).toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-900">
                        {(Math.random() * 50000 + 10000).toFixed(0)}
                      </p>
                      <p className="text-sm text-purple-700">Visitantes</p>
                      <div className="flex items-center justify-center mt-1">
                        <TrendingUp className="h-4 w-4 text-purple-600 mr-1" />
                        <span className="text-xs text-purple-600">+{(Math.random() * 15 + 2).toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-orange-900">
                        {(Math.random() * 10 + 2).toFixed(1)}%
                      </p>
                      <p className="text-sm text-orange-700">Taxa Conversão</p>
                      <div className="flex items-center justify-center mt-1">
                        <TrendingUp className="h-4 w-4 text-orange-600 mr-1" />
                        <span className="text-xs text-orange-600">+{(Math.random() * 5 + 0.5).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">🎯 Principais Conquistas</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium text-green-900">Meta de faturamento superada</p>
                            <p className="text-sm text-green-700">115% da meta mensal atingida</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium text-blue-900">Melhor campanha do trimestre</p>
                            <p className="text-sm text-blue-700">Campaign XYZ com ROI de 340%</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium text-purple-900">Novo recorde de tráfego</p>
                            <p className="text-sm text-purple-700">45% mais visitantes que o mês anterior</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">🔍 Pontos de Atenção</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium text-yellow-900">CPC aumentou 12%</p>
                            <p className="text-sm text-yellow-700">Revisar estratégia de lances no Google Ads</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium text-orange-900">Taxa de abandono alta</p>
                            <p className="text-sm text-orange-700">Otimizar checkout para reduzir abandono</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium text-red-900">Campanhas mobile com baixo ROI</p>
                            <p className="text-sm text-red-700">Ajustar targeting para dispositivos móveis</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Items */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">📋 Próximos Passos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm">✅ Implementar teste A/B na landing page</p>
                        <p className="text-sm">✅ Configurar automação de follow-up</p>
                        <p className="text-sm">🔄 Otimizar campanhas de baixo ROI</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm">🔄 Expandir para novos públicos</p>
                        <p className="text-sm">📅 Planejar campanhas sazonais</p>
                        <p className="text-sm">📊 Implementar tracking avançado</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}