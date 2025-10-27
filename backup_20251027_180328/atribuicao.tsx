import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  GitBranch, 
  Users, 
  MousePointer, 
  Target, 
  TrendingUp, 
  DollarSign,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  ExternalLink,
  ArrowRight
} from "lucide-react";

export default function AtribuicaoPage() {
  const attributionModels = [
    {
      name: "Último Clique",
      description: "100% do crédito para o último touchpoint",
      percentage: 45.2,
      conversions: 834,
      color: "bg-blue-500"
    },
    {
      name: "Primeiro Clique", 
      description: "100% do crédito para o primeiro touchpoint",
      percentage: 28.1,
      conversions: 519,
      color: "bg-green-500"
    },
    {
      name: "Linear",
      description: "Crédito distribuído igualmente",
      percentage: 15.3,
      conversions: 283,
      color: "bg-purple-500"
    },
    {
      name: "Baseado em Posição",
      description: "40% primeiro, 40% último, 20% meio",
      percentage: 11.4,
      conversions: 211,
      color: "bg-orange-500"
    }
  ];

  const customerJourneys = [
    {
      id: "journey_001",
      customer: "Cliente #12345",
      totalValue: 297.00,
      duration: "7 dias",
      touchpoints: [
        { source: "Google Ads", medium: "cpc", timestamp: "2025-01-20 14:30", contribution: 40 },
        { source: "Facebook", medium: "social", timestamp: "2025-01-22 09:15", contribution: 20 },
        { source: "Email", medium: "email", timestamp: "2025-01-25 16:45", contribution: 15 },
        { source: "Direct", medium: "direct", timestamp: "2025-01-27 11:20", contribution: 25 }
      ]
    },
    {
      id: "journey_002",
      customer: "Cliente #12344",
      totalValue: 197.00,
      duration: "3 dias",
      touchpoints: [
        { source: "TikTok Ads", medium: "cpc", timestamp: "2025-01-24 18:20", contribution: 60 },
        { source: "Instagram", medium: "social", timestamp: "2025-01-26 20:10", contribution: 25 },
        { source: "Direct", medium: "direct", timestamp: "2025-01-27 10:45", contribution: 15 }
      ]
    },
    {
      id: "journey_003",
      customer: "Cliente #12343",
      totalValue: 497.00,
      duration: "12 dias",
      touchpoints: [
        { source: "Organic Search", medium: "organic", timestamp: "2025-01-15 11:30", contribution: 30 },
        { source: "YouTube", medium: "video", timestamp: "2025-01-18 19:45", contribution: 20 },
        { source: "Google Ads", medium: "cpc", timestamp: "2025-01-22 14:20", contribution: 25 },
        { source: "Email", medium: "email", timestamp: "2025-01-25 08:15", contribution: 15 },
        { source: "Direct", medium: "direct", timestamp: "2025-01-27 16:30", contribution: 10 }
      ]
    }
  ];

  const channelAttribution = [
    { channel: "Google Ads", conversions: 523, revenue: 156900, avgValue: 300, contribution: 32.1 },
    { channel: "Facebook Ads", conversions: 387, revenue: 89043, avgValue: 230, contribution: 18.3 },
    { channel: "Email Marketing", conversions: 234, revenue: 72540, avgValue: 310, contribution: 14.9 },
    { channel: "Organic Search", conversions: 312, revenue: 68640, avgValue: 220, contribution: 14.1 },
    { channel: "TikTok Ads", conversions: 198, revenue: 45540, avgValue: 230, contribution: 9.4 },
    { channel: "Direct", conversions: 193, revenue: 54180, avgValue: 281, contribution: 11.2 }
  ];

  const attributionMetrics = [
    { label: "Jornadas Analisadas", value: "3.247", change: "+18%", color: "blue" },
    { label: "Touchpoints Médios", value: "4.2", change: "+0.3", color: "green" },
    { label: "Duração Média", value: "8.5 dias", change: "-1.2", color: "purple" },
    { label: "Valor Atribuído", value: "R$ 486.3K", change: "+24%", color: "orange" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <GitBranch className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Atribuição</h1>
                <p className="text-gray-600 mt-1">
                  Analise a jornada completa do cliente até a conversão
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Período
              </Button>
              <Button>
                <BarChart3 className="h-4 w-4 mr-2" />
                Relatório
              </Button>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Attribution Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {attributionMetrics.map((metric, index) => (
              <Card key={index} className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                    </div>
                    <div className={`p-3 bg-${metric.color}-100 rounded-xl`}>
                      {index === 0 && <GitBranch className={`h-8 w-8 text-${metric.color}-600`} />}
                      {index === 1 && <MousePointer className={`h-8 w-8 text-${metric.color}-600`} />}
                      {index === 2 && <Clock className={`h-8 w-8 text-${metric.color}-600`} />}
                      {index === 3 && <DollarSign className={`h-8 w-8 text-${metric.color}-600`} />}
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">{metric.change} vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Attribution Models */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Modelos de Atribuição
                </CardTitle>
                <CardDescription>
                  Comparação entre diferentes modelos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attributionModels.map((model, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 ${model.color} rounded`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{model.name}</p>
                            <p className="text-xs text-gray-600">{model.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{model.conversions}</p>
                          <p className="text-sm text-gray-600">{model.percentage}%</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${model.color} h-2 rounded-full`}
                          style={{ width: `${model.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Atribuição por Canal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {channelAttribution.slice(0, 5).map((channel, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{channel.channel}</p>
                        <p className="text-sm text-gray-600">
                          {channel.conversions} conversões • Média: R$ {channel.avgValue}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          R$ {(channel.revenue / 1000).toFixed(0)}K
                        </p>
                        <Badge variant="outline">
                          {channel.contribution}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Journeys */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Jornadas do Cliente
              </CardTitle>
              <CardDescription>
                Análise detalhada dos touchpoints até a conversão
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {customerJourneys.map((journey) => (
                  <div key={journey.id} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{journey.customer}</h4>
                          <p className="text-sm text-gray-600">
                            Jornada de {journey.duration} • Valor: R$ {journey.totalValue.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Detalhes
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        {journey.touchpoints.map((touchpoint, index) => (
                          <div key={index} className="flex flex-col items-center relative">
                            {/* Touchpoint Circle */}
                            <div className="w-12 h-12 bg-white rounded-full border-4 border-blue-500 flex items-center justify-center z-10">
                              <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                            </div>
                            
                            {/* Touchpoint Info */}
                            <div className="mt-3 text-center max-w-24">
                              <p className="text-xs font-medium text-gray-900">{touchpoint.source}</p>
                              <p className="text-xs text-gray-600">{touchpoint.medium}</p>
                              <Badge variant="outline" className="text-xs mt-1">
                                {touchpoint.contribution}%
                              </Badge>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(touchpoint.timestamp).toLocaleDateString('pt-BR')}
                              </p>
                            </div>

                            {/* Connecting Arrow */}
                            {index < journey.touchpoints.length - 1 && (
                              <div className="absolute top-6 left-12 w-8 flex justify-center">
                                <ArrowRight className="h-4 w-4 text-gray-400" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {/* Timeline Line */}
                      <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-300 z-0"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attribution Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Análise de Contribuição</CardTitle>
                <CardDescription>
                  Impacto de cada canal na jornada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { role: "Iniciador", channels: ["Google Ads", "Organic Search"], percentage: 67.3 },
                    { role: "Influenciador", channels: ["Social Media", "Email"], percentage: 23.1 },
                    { role: "Finalizador", channels: ["Direct", "Remarketing"], percentage: 45.8 },
                    { role: "Assistente", channels: ["Display", "Video"], percentage: 15.2 }
                  ].map((role, index) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-blue-900">{role.role}</h4>
                        <Badge className="bg-blue-100 text-blue-800">
                          {role.percentage}%
                        </Badge>
                      </div>
                      <p className="text-sm text-blue-700">
                        Principais canais: {role.channels.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Otimizações Recomendadas</CardTitle>
                <CardDescription>
                  Sugestões baseadas na análise de atribuição
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Aumentar investimento em Google Ads",
                      impact: "Potencial aumento de 18% nas conversões",
                      priority: "Alta",
                      color: "green"
                    },
                    {
                      title: "Melhorar retargeting",
                      impact: "Reduzir abandono em 15%",
                      priority: "Média",
                      color: "yellow"
                    },
                    {
                      title: "Otimizar email marketing",
                      impact: "Aumentar contribuição para 20%",
                      priority: "Média",
                      color: "blue"
                    },
                    {
                      title: "Expandir presença orgânica",
                      impact: "Reduzir custo de aquisição",
                      priority: "Baixa",
                      color: "gray"
                    }
                  ].map((rec, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                        <Badge 
                          variant={rec.priority === 'Alta' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{rec.impact}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}