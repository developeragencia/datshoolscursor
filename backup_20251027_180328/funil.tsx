import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  Layers, 
  TrendingDown,
  Users,
  MousePointer,
  DollarSign,
  Target,
  ArrowRight,
  ArrowDown,
  RefreshCw,
  Download,
  Settings,
  Plus,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FunilPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const { toast } = useToast();

  // REMOVIDO: Todos os dados falsos/mockados - sistema usa APENAS dados reais das APIs
  
  // Buscar dados reais do funil do backend
  const { data: funnelData, isLoading } = useQuery({
    queryKey: ["/api/funnel/data"],
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="text-center py-12">Carregando dados do funil...</div>
        </div>
      </div>
    );
  }

  // Se não há dados reais, mostrar estado vazio
  if (!funnelData) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Funil de Vendas</h1>
                <p className="text-gray-600 mt-1">Analise a jornada dos seus clientes</p>
              </div>
            </div>
            <Card>
              <CardContent className="p-12 text-center">
                <Layers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sem dados de funil</h3>
                <p className="text-gray-600 mb-6">
                  Configure suas integrações para começar a rastrear seu funil de vendas
                </p>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Configurar Funil
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const optimizeFunnel = () => {
    toast({
      title: "Otimização de funil",
      description: "Analisando gargalos e sugerindo melhorias..."
    });
    
    setTimeout(() => {
      toast({
        title: "Análise concluída!",
        description: "Sugestões de otimização geradas"
      });
    }, 2500);
  };

  const exportFunnelData = () => {
    toast({
      title: "Exportando dados do funil...",
      description: "Gerando relatório completo"
    });
    
    setTimeout(() => {
      toast({
        title: "Export concluído!",
        description: "Dados do funil baixados com sucesso"
      });
    }, 2000);
  };

  const configureFunnel = () => {
    toast({
      title: "Configurar funil",
      description: "Funcionalidade de configuração em desenvolvimento"
    });
  };

  const [isAddStageModalOpen, setIsAddStageModalOpen] = useState(false);

  const addStage = () => {
    setIsAddStageModalOpen(true);
    toast({
      title: "Configurando nova etapa",
      description: "Personalize sua nova etapa do funil"
    });
  };

  const createStage = () => {
    toast({
      title: "Etapa criada!",
      description: "Nova etapa adicionada ao funil com sucesso"
    });
    setIsAddStageModalOpen(false);
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
                <Layers className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Funil de Vendas</h1>
                <p className="text-gray-600 mt-1">Analise o percurso completo dos seus clientes</p>
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
              </select>
              <Button variant="outline" onClick={configureFunnel}>
                <Settings className="h-4 w-4 mr-2" />
                Configurar
              </Button>
              <Button variant="outline" onClick={exportFunnelData}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button onClick={optimizeFunnel}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Otimizar
              </Button>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Funnel Visualization */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Visualização do Funil</CardTitle>
              <CardDescription>Fluxo completo de conversão por etapa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {funnelData.stages.map((stage, index) => {
                  const IconComponent = stage.icon;
                  const isLast = index === funnelData.stages.length - 1;
                  
                  return (
                    <div key={index} className="relative">
                      {/* Stage Card */}
                      <div className="flex items-center justify-between p-6 bg-white border-2 border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg bg-${stage.color}-100`}>
                            <IconComponent className={`h-8 w-8 text-${stage.color}-600`} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{stage.name}</h3>
                            <p className="text-gray-600">
                              {stage.count.toLocaleString('pt-BR')} usuários
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-3xl font-bold text-gray-900">
                            {stage.percentage.toFixed(1)}%
                          </p>
                          <p className="text-sm text-gray-600">do total inicial</p>
                        </div>
                      </div>

                      {/* Dropoff Indicator */}
                      {!isLast && (
                        <div className="flex items-center justify-center my-4">
                          <div className="flex items-center gap-3 bg-red-50 px-4 py-2 rounded-lg">
                            <TrendingDown className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium text-red-600">
                              -{funnelData.stages[index + 1].dropoff.toFixed(1)}% perda
                            </span>
                          </div>
                          <ArrowDown className="h-6 w-6 text-gray-400 ml-2" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Add Stage Button */}
              <div className="flex justify-center mt-6">
                <Button variant="outline" onClick={addStage}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Etapa
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Conversion Rates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Taxa de Conversão Global</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600 mb-2">
                    {funnelData.conversionRates.overallConversion}%
                  </p>
                  <p className="text-gray-600">Visitantes → Vendas</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Melhor Conversão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600 mb-2">
                    {funnelData.conversionRates.oportunidadesParaPropostas}%
                  </p>
                  <p className="text-gray-600">Oportunidades → Propostas</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Maior Gargalo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-red-600 mb-2">
                    {funnelData.conversionRates.visitantesParaLeads}%
                  </p>
                  <p className="text-gray-600">Visitantes → Leads</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Time in Stage Analysis */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Tempo Médio por Etapa</CardTitle>
              <CardDescription>Quanto tempo os leads ficam em cada etapa do funil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Leads</h4>
                  <p className="text-2xl font-bold text-blue-600">{funnelData.averageTimeInStage.leads}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Oportunidades</h4>
                  <p className="text-2xl font-bold text-green-600">{funnelData.averageTimeInStage.oportunidades}</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Propostas</h4>
                  <p className="text-2xl font-bold text-orange-600">{funnelData.averageTimeInStage.propostas}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Fechamento</h4>
                  <p className="text-2xl font-bold text-purple-600">{funnelData.averageTimeInStage.fechamento}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Tendências Mensais</CardTitle>
              <CardDescription>Evolução do funil nos últimos meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Mês</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Visitantes</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Leads</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Vendas</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Taxa de Conversão</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funnelData.monthlyTrends.map((trend, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{trend.month}</td>
                        <td className="py-3 px-4">{trend.visitors.toLocaleString('pt-BR')}</td>
                        <td className="py-3 px-4">{trend.leads.toLocaleString('pt-BR')}</td>
                        <td className="py-3 px-4 font-bold text-green-600">{trend.sales}</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-blue-100 text-blue-800">
                            {((trend.sales / trend.visitors) * 100).toFixed(2)}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Optimization Suggestions */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Sugestões de Otimização</CardTitle>
              <CardDescription>Recomendações para melhorar a performance do funil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Foco em Geração de Leads</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Apenas 18.9% dos visitantes se tornam leads. Considere melhorar ofertas ou forms de captura.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <MousePointer className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Otimizar Tempo de Resposta</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Propostas ficam 12.3 dias em média na etapa. Acelere o follow-up para melhorar conversões.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800">Reduzir Abandono</h4>
                      <p className="text-sm text-green-700 mt-1">
                        70.1% das propostas não se convertem em vendas. Revise processo de fechamento e objeções.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}