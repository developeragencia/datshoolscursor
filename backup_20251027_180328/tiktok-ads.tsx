import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  Search, 
  ExternalLink,
  Target,
  DollarSign,
  TrendingUp,
  Activity
} from "lucide-react";

export default function TiktokAds() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Define interface para campaigns
  interface TikTokCampaign {
    id: string;
    name: string;
    status: string;
    spend: number;
    revenue: number;
    roas: number;
    clicks: number;
    impressions: number;
    ctr: number;
    cpm: number;
    platform?: string;
    conversions?: number;
    budget?: number;
    spent?: number;
    createdAt?: string;
    utmSource?: string;
    utmCampaign?: string;
  }

  const { data: tiktokCampaigns = [], isLoading } = useQuery({
    queryKey: ["/api/campaigns", "tiktok"],
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

  // Apenas dados reais do banco de dados - SEM DADOS FALSOS
  const campaigns: TikTokCampaign[] = Array.isArray(tiktokCampaigns) ? tiktokCampaigns : [];
  
  const filteredCampaigns = campaigns.filter((campaign: TikTokCampaign) => {
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
            <p className="text-gray-500">Carregando campanhas do TikTok Ads...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">TikTok Ads</h1>
              <p className="text-gray-600">
                Gerencie suas campanhas do TikTok for Business
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
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 w-64"
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="all">Todos os status</option>
                <option value="active">Ativas</option>
                <option value="paused">Pausadas</option>
                <option value="ended">Finalizadas</option>
              </select>
              <Button 
                onClick={() => window.open("https://ads.tiktok.com", "_blank")}
                className="bg-pink-600 hover:bg-pink-700"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Abrir TikTok Ads
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Estado Vazio - Sem Campanhas */}
          {campaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhuma campanha TikTok encontrada
                </h3>
                <p className="text-gray-600 mb-6">
                  Conecte sua conta do TikTok Ads para visualizar suas campanhas e métricas de performance.
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={() => window.open("https://ads.tiktok.com", "_blank")}
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Acessar TikTok Ads
                  </Button>
                  <p className="text-xs text-gray-500">
                    Após conectar sua conta, suas campanhas aparecerão aqui automaticamente
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Quick Stats - Apenas com dados reais */}
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
                          {formatCurrency(filteredCampaigns.reduce((sum: number, c: TikTokCampaign) => sum + (c.spend || 0), 0))}
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
                        <p className="text-sm font-medium text-gray-600">Visualizações</p>
                        <p className="text-2xl font-bold text-pink-600">
                          {formatNumber(filteredCampaigns.reduce((sum: number, c: TikTokCampaign) => sum + (c.impressions || 0), 0))}
                        </p>
                      </div>
                      <Target className="h-8 w-8 text-pink-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">ROAS Médio</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {filteredCampaigns.length > 0 
                            ? formatPercent(filteredCampaigns.reduce((sum: number, c: TikTokCampaign) => sum + (c.roas || 0), 0) / filteredCampaigns.length)
                            : "0.0%"
                          }
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lista de Campanhas Reais */}
              <div className="space-y-6">
                {filteredCampaigns.map((campaign: TikTokCampaign) => (
                  <Card key={campaign.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${
                            campaign.status === 'active' ? 'bg-green-500' : 
                            campaign.status === 'paused' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`} />
                          <div>
                            <CardTitle className="text-lg">{campaign.name}</CardTitle>
                            <CardDescription>
                              TikTok • Platform: {campaign.platform}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(campaign.status)}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open("https://ads.tiktok.com", "_blank")}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Ver no TikTok
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-xl font-bold text-green-600">{campaign.conversions || 0}</div>
                          <div className="text-xs text-green-700 font-medium mt-1">Conversões</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="text-xl font-bold text-blue-600">
                            {formatCurrency(campaign.budget || 0)}
                          </div>
                          <div className="text-xs text-blue-700 font-medium mt-1">Orçamento</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="text-xl font-bold text-orange-600">
                            {formatCurrency(campaign.spent || 0)}
                          </div>
                          <div className="text-xs text-orange-700 font-medium mt-1">Gasto</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="text-xl font-bold text-purple-600">
                            {campaign.roas ? formatPercent(campaign.roas) : "0.0%"}
                          </div>
                          <div className="text-xs text-purple-700 font-medium mt-1">ROAS</div>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                        <p><strong>Status:</strong> {campaign.status}</p>
                        <p><strong>Criada em:</strong> {campaign.createdAt ? new Date(campaign.createdAt).toLocaleDateString('pt-BR') : 'Data não disponível'}</p>
                        <p><strong>UTM Source:</strong> {campaign.utmSource}</p>
                        <p><strong>UTM Campaign:</strong> {campaign.utmCampaign}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}