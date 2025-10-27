import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Plus, 
  Play, 
  Pause, 
  TrendingUp, 
  TrendingDown,
  ExternalLink,
  Settings,
  Target,
  DollarSign,
  Eye,
  MousePointer,
  Activity
} from "lucide-react";

export default function MetaAds() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: metaCampaigns = [], isLoading } = useQuery({
    queryKey: ["/api/campaigns", "meta"],
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  // REMOVIDO: Todos os dados falsos/mockados - sistema usa APENAS dados reais das APIs

  // Apenas dados reais do banco de dados - sem dados mock
  const campaigns = Array.isArray(metaCampaigns) ? metaCampaigns : [];
  
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Ativa</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-100 text-yellow-800">Pausada</Badge>;
      case 'ended':
        return <Badge className="bg-gray-100 text-gray-800">Finalizada</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  const getPerformanceColor = (roas: number) => {
    if (roas >= 4) return "text-green-600";
    if (roas >= 2) return "text-yellow-600";
    return "text-red-600";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Activity className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Carregando campanhas do Meta Ads...</p>
          </div>
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
              <h1 className="text-2xl font-bold text-gray-900">Meta Ads</h1>
              <p className="text-gray-600">
                Gerencie suas campanhas do Facebook e Instagram
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar campanhas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os status</option>
                <option value="active">Ativas</option>
                <option value="paused">Pausadas</option>
                <option value="ended">Finalizadas</option>
              </select>
              <Button 
                onClick={() => window.open("https://business.facebook.com/adsmanager", "_blank")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Abrir Meta Ads
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Campanhas Ativas</p>
                    <p className="text-2xl font-bold text-green-600">
                      {filteredCampaigns.filter(c => c.status === 'active').length}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Gasto Total</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(filteredCampaigns.reduce((sum, c) => sum + c.spent, 0))}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Receita Total</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(filteredCampaigns.reduce((sum, c) => sum + c.revenue, 0))}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">ROAS Médio</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatPercent(filteredCampaigns.reduce((sum, c) => sum + c.roas, 0) / filteredCampaigns.length || 0)}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaigns List */}
          <div className="space-y-6">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${campaign.status === 'active' ? 'bg-green-500' : campaign.status === 'paused' ? 'bg-yellow-500' : 'bg-gray-400'}`} />
                      <div>
                        <CardTitle className="text-lg">{campaign.name}</CardTitle>
                        <CardDescription>
                          {campaign.accountName} • {campaign.adSetName}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(campaign.status)}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open("https://business.facebook.com/adsmanager", "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ver no Meta
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-xl font-bold text-green-600">{campaign.sales}</div>
                      <div className="text-xs text-green-700 font-medium mt-1">Vendas</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-xl font-bold text-blue-600 break-words">{formatCurrency(campaign.revenue)}</div>
                      <div className="text-xs text-blue-700 font-medium mt-1">Receita</div>
                    </div>
                    <div className={`text-center p-4 rounded-lg border ${campaign.roas >= 4 ? 'bg-green-50 border-green-200' : campaign.roas >= 2 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
                      <div className={`text-xl font-bold ${getPerformanceColor(campaign.roas)}`}>
                        {formatPercent(campaign.roas)}
                      </div>
                      <div className={`text-xs font-medium mt-1 ${getPerformanceColor(campaign.roas)}`}>ROAS</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-xl font-bold text-orange-600 break-words">{formatCurrency(campaign.spent)}</div>
                      <div className="text-xs text-orange-700 font-medium mt-1">Gasto</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-xl font-bold text-purple-600 break-words">{formatCurrency(campaign.cpm)}</div>
                      <div className="text-xs text-purple-700 font-medium mt-1">CPM</div>
                    </div>
                    <div className="text-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <div className="text-xl font-bold text-indigo-600">{formatPercent(campaign.ctr)}</div>
                      <div className="text-xs text-indigo-700 font-medium mt-1">CTR</div>
                    </div>
                  </div>

                  {/* Meta-specific metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Performance Meta</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Impressões:</span>
                          <span className="text-sm font-medium">{formatNumber(campaign.impressions)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Cliques:</span>
                          <span className="text-sm font-medium">{formatNumber(campaign.clicks)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Alcance:</span>
                          <span className="text-sm font-medium">{formatNumber(campaign.reach)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Frequência:</span>
                          <span className="text-sm font-medium">{campaign.frequency}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Pontuação de Relevância:</span>
                          <span className="text-sm font-medium">{campaign.relevanceScore}/10</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Conversões</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Taxa de Conversão:</span>
                          <span className="text-sm font-medium">{formatPercent(campaign.conversionRate)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Custo por Venda:</span>
                          <span className="text-sm font-medium">{formatCurrency(campaign.costPerSale)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Orçamento:</span>
                          <span className="text-sm font-medium">
                            {formatCurrency(campaign.budget)} 
                            <span className="text-xs text-gray-500 ml-1">/{campaign.budgetType === 'daily' ? 'dia' : 'total'}</span>
                          </span>
                        </div>
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