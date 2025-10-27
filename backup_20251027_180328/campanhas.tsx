import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  Target,
  PlayCircle,
  PauseCircle,
  Copy,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  Zap,
  BarChart3
} from "lucide-react";

// Dados das campanhas vêm da API real - sem dados mockados

// Removido - usar apenas dados reais das APIs

export default function Campanhas() {
  const [activeTab, setActiveTab] = useState("meta");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    platform: "Meta Ads",
    budget: "",
    budgetType: "daily",
    targetAudience: "",
    adObjective: "",
    bidStrategy: "",
    description: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Buscar campanhas reais das APIs
  const { data: realCampaigns = [], isLoading: campaignsLoading } = useQuery({
    queryKey: ['/api/campaigns'],
    retry: false,
  });

  const allCampaigns = Array.isArray(realCampaigns) ? realCampaigns : [];
  
  const filteredCampaigns = allCampaigns.filter((campaign: any) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    const matchesPlatform = activeTab === "all" || 
      (activeTab === "meta" && campaign.platform === "Meta Ads") ||
      (activeTab === "google" && campaign.platform === "Google Ads");
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  // Mutations for campaign actions
  const pauseCampaignMutation = useMutation({
    mutationFn: async (campaignId: number) => {
      const response = await fetch(`/api/campaigns/${campaignId}/pause`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Erro ao pausar campanha');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Campanha pausada com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns'] });
    },
    onError: () => {
      toast({ title: "Erro ao pausar campanha", variant: "destructive" });
    }
  });

  const activateCampaignMutation = useMutation({
    mutationFn: async (campaignId: number) => {
      const response = await fetch(`/api/campaigns/${campaignId}/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Erro ao ativar campanha');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Campanha ativada com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns'] });
    },
    onError: () => {
      toast({ title: "Erro ao ativar campanha", variant: "destructive" });
    }
  });

  const duplicateCampaignMutation = useMutation({
    mutationFn: async (campaignId: number) => {
      const response = await fetch(`/api/campaigns/${campaignId}/duplicate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Erro ao duplicar campanha');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Campanha duplicada com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns'] });
    },
    onError: () => {
      toast({ title: "Erro ao duplicar campanha", variant: "destructive" });
    }
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: async (campaignId: number) => {
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Erro ao excluir campanha');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Campanha excluída com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns'] });
      setIsDeleteModalOpen(false);
    },
    onError: () => {
      toast({ title: "Erro ao excluir campanha", variant: "destructive" });
    }
  });

  const createCampaignMutation = useMutation({
    mutationFn: async (campaignData: any) => {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(campaignData)
      });
      if (!response.ok) throw new Error('Erro ao criar campanha');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Campanha criada com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns'] });
      setIsCreateModalOpen(false);
      setNewCampaign({
        name: "",
        platform: "Meta Ads",
        budget: "",
        budgetType: "daily",
        targetAudience: "",
        adObjective: "",
        bidStrategy: "",
        description: ""
      });
    },
    onError: () => {
      toast({ title: "Erro ao criar campanha", variant: "destructive" });
    }
  });

  const updateCampaignMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: any }) => {
      const response = await fetch(`/api/campaigns/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erro ao atualizar campanha');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Campanha atualizada com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/campaigns'] });
      setIsEditModalOpen(false);
    },
    onError: () => {
      toast({ title: "Erro ao atualizar campanha", variant: "destructive" });
    }
  });

  const handleCampaignAction = (campaignId: number, action: string) => {
    switch (action) {
      case 'pause':
        pauseCampaignMutation.mutate(campaignId);
        break;
      case 'play':
        activateCampaignMutation.mutate(campaignId);
        break;
      case 'duplicate':
        duplicateCampaignMutation.mutate(campaignId);
        break;
      case 'delete':
        setSelectedCampaign(allCampaigns.find((c: any) => c.id === campaignId));
        setIsDeleteModalOpen(true);
        break;
      case 'edit':
        setSelectedCampaign(allCampaigns.find((c: any) => c.id === campaignId));
        setIsEditModalOpen(true);
        break;
      default:
        // Action executed: ${action} campanha ${campaignId}
    }
  };

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.budget) {
      toast({ title: "Preencha todos os campos obrigatórios", variant: "destructive" });
      return;
    }
    createCampaignMutation.mutate({
      ...newCampaign,
      budget: parseFloat(newCampaign.budget),
      userId: 3 // Current user ID
    });
  };

  const handleUpdateCampaign = () => {
    if (!selectedCampaign) return;
    updateCampaignMutation.mutate({
      id: selectedCampaign.id,
      data: selectedCampaign
    });
  };

  const openExternalPlatform = (campaign: any) => {
    const urls = {
      "Meta Ads": "https://business.facebook.com/adsmanager",
      "Google Ads": "https://ads.google.com"
    };
    window.open(urls[campaign.platform as keyof typeof urls], '_blank');
  };

  const formatCurrency = (value: number | string | undefined) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : (value || 0);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue);
  };

  const formatPercent = (value: number | string | undefined) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : (value || 0);
    return `${numValue.toFixed(1)}%`;
  };

  const formatNumber = (value: number | string | undefined) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : (value || 0);
    return new Intl.NumberFormat('pt-BR').format(numValue);
  };

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

  const getPerformanceColor = (roas: number | string | undefined) => {
    const numRoas = typeof roas === 'string' ? parseFloat(roas) : (roas || 0);
    if (numRoas >= 4) return "text-green-600";
    if (numRoas >= 2) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gerenciar Campanhas</h1>
              <p className="text-gray-600">
                Escale ou desative suas campanhas direto pelo relatório, sem precisar abrir o Facebook Manager
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
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">Todos os status</option>
                <option value="active">Ativas</option>
                <option value="paused">Pausadas</option>
                <option value="ended">Finalizadas</option>
              </select>
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Campanha
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Criar Nova Campanha</DialogTitle>
                    <DialogDescription>
                      Configure sua nova campanha publicitária
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Nome *</Label>
                      <Input
                        id="name"
                        value={newCampaign.name}
                        onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                        className="col-span-3"
                        placeholder="Nome da campanha"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="platform" className="text-right">Plataforma *</Label>
                      <Select value={newCampaign.platform} onValueChange={(value) => setNewCampaign({...newCampaign, platform: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Meta Ads">Meta Ads</SelectItem>
                          <SelectItem value="Google Ads">Google Ads</SelectItem>
                          <SelectItem value="TikTok Ads">TikTok Ads</SelectItem>
                          <SelectItem value="LinkedIn Ads">LinkedIn Ads</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="budget" className="text-right">Orçamento *</Label>
                      <div className="col-span-3 flex gap-2">
                        <Input
                          id="budget"
                          type="number"
                          value={newCampaign.budget}
                          onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})}
                          placeholder="0.00"
                          className="flex-1"
                        />
                        <Select value={newCampaign.budgetType} onValueChange={(value) => setNewCampaign({...newCampaign, budgetType: value})}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Diário</SelectItem>
                            <SelectItem value="lifetime">Vitalício</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="objective" className="text-right">Objetivo</Label>
                      <Select value={newCampaign.adObjective} onValueChange={(value) => setNewCampaign({...newCampaign, adObjective: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione o objetivo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conversions">Conversões</SelectItem>
                          <SelectItem value="traffic">Tráfego</SelectItem>
                          <SelectItem value="awareness">Reconhecimento</SelectItem>
                          <SelectItem value="engagement">Engajamento</SelectItem>
                          <SelectItem value="leads">Geração de Leads</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="audience" className="text-right">Público-alvo</Label>
                      <Input
                        id="audience"
                        value={newCampaign.targetAudience}
                        onChange={(e) => setNewCampaign({...newCampaign, targetAudience: e.target.value})}
                        className="col-span-3"
                        placeholder="Ex: Interessados em marketing digital"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="bidStrategy" className="text-right">Estratégia de Lance</Label>
                      <Select value={newCampaign.bidStrategy} onValueChange={(value) => setNewCampaign({...newCampaign, bidStrategy: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione a estratégia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lowest_cost">Menor custo</SelectItem>
                          <SelectItem value="target_cost">Custo-alvo</SelectItem>
                          <SelectItem value="bid_cap">Limite de lance</SelectItem>
                          <SelectItem value="target_roas">ROAS alvo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="description" className="text-right pt-2">Descrição</Label>
                      <Textarea
                        id="description"
                        value={newCampaign.description}
                        onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                        className="col-span-3"
                        placeholder="Descrição da campanha (opcional)"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleCreateCampaign}
                      disabled={createCampaignMutation.isPending}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {createCampaignMutation.isPending ? "Criando..." : "Criar Campanha"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                      {filteredCampaigns.filter((c: any) => c.status === 'active').length}
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
                      {formatCurrency(filteredCampaigns.reduce((sum: number, c: any) => sum + (c.spent || 0), 0))}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Receita Total</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(filteredCampaigns.reduce((sum: number, c: any) => sum + (c.revenue || 0), 0))}
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
                      {formatPercent(filteredCampaigns.reduce((sum: number, c: any) => sum + (c.roas || 0), 0) / (filteredCampaigns.length || 1))}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs por Plataforma */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">Todas as Campanhas</TabsTrigger>
              <TabsTrigger value="meta">Meta Ads</TabsTrigger>
              <TabsTrigger value="google">Google Ads</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              <div className="space-y-6">
                {campaignsLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                    <p className="mt-4 text-gray-600">Carregando campanhas...</p>
                  </div>
                ) : filteredCampaigns.length === 0 ? (
                  <div className="text-center py-16">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma campanha encontrada</h3>
                    <p className="text-gray-600 mb-6">
                      {allCampaigns.length === 0 
                        ? "Conecte suas contas Meta Ads e Google Ads para ver suas campanhas aqui" 
                        : "Nenhuma campanha corresponde aos filtros aplicados"}
                    </p>
                    <Button 
                      onClick={() => setIsCreateModalOpen(true)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeira Campanha
                    </Button>
                  </div>
                ) : (
                  filteredCampaigns.map((campaign) => (
                  <Card key={campaign.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${campaign.status === 'active' ? 'bg-green-500' : campaign.status === 'paused' ? 'bg-yellow-500' : 'bg-gray-400'}`} />
                          <div>
                            <CardTitle className="text-lg">{campaign.name}</CardTitle>
                            <CardDescription>
                              {campaign.platform} • {campaign.accountName}
                              {campaign.platform === "Meta Ads" && ` • ${(campaign as any).adSetName}`}
                              {campaign.platform === "Google Ads" && ` • ${(campaign as any).campaignType}`}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(campaign.status)}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCampaignAction(campaign.id, 'duplicate')}
                            disabled={duplicateCampaignMutation.isPending}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            {duplicateCampaignMutation.isPending ? "Duplicando..." : "Duplicar"}
                          </Button>
                          <Button
                            variant={campaign.status === 'active' ? 'destructive' : 'default'}
                            size="sm"
                            onClick={() => handleCampaignAction(campaign.id, campaign.status === 'active' ? 'pause' : 'play')}
                            disabled={pauseCampaignMutation.isPending || activateCampaignMutation.isPending}
                          >
                            {campaign.status === 'active' ? 
                              <>
                                <PauseCircle className="h-4 w-4 mr-2" />
                                {pauseCampaignMutation.isPending ? "Pausando..." : "Pausar"}
                              </> : 
                              <>
                                <PlayCircle className="h-4 w-4 mr-2" />
                                {activateCampaignMutation.isPending ? "Ativando..." : "Ativar"}
                              </>
                            }
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
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
                          <div className="text-xl font-bold text-purple-600 break-words">
                            {campaign.platform === "Meta Ads" ? formatCurrency((campaign as any).cpm) : formatCurrency((campaign as any).cpc)}
                          </div>
                          <div className="text-xs text-purple-700 font-medium mt-1">
                            {campaign.platform === "Meta Ads" ? "CPM" : "CPC"}
                          </div>
                        </div>
                        <div className="text-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                          <div className="text-xl font-bold text-indigo-600">{formatPercent(campaign.ctr)}</div>
                          <div className="text-xs text-indigo-700 font-medium mt-1">CTR</div>
                        </div>
                      </div>

                      {/* Métricas Detalhadas */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Performance</h4>
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
                              <span className="text-sm text-gray-600">Taxa de Conversão:</span>
                              <span className="text-sm font-medium">{formatPercent(campaign.conversionRate)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Custo por Venda:</span>
                              <span className="text-sm font-medium">{formatCurrency(campaign.costPerSale)}</span>
                            </div>
                            {campaign.platform === "Meta Ads" && (
                              <>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">Frequência:</span>
                                  <span className="text-sm font-medium">{(campaign as any).frequency}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">Pontuação de Relevância:</span>
                                  <span className="text-sm font-medium">{(campaign as any).relevanceScore}/10</span>
                                </div>
                              </>
                            )}
                            {campaign.platform === "Google Ads" && (
                              <>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">Quality Score:</span>
                                  <span className="text-sm font-medium">{(campaign as any).qualityScore}/10</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">Impression Share:</span>
                                  <span className="text-sm font-medium">{formatPercent((campaign as any).impressionShare)}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Orçamento</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Orçamento:</span>
                              <span className="text-sm font-medium">
                                {formatCurrency(campaign.budget)} 
                                <span className="text-xs text-gray-500 ml-1">/{campaign.budgetType === 'daily' ? 'dia' : 'total'}</span>
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Gasto:</span>
                              <span className="text-sm font-medium">{formatCurrency(campaign.spent)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">% Utilizado:</span>
                              <span className="text-sm font-medium">
                                {((campaign.spent / campaign.budget) * 100).toFixed(1)}%
                              </span>
                            </div>
                            <Progress 
                              value={(campaign.spent / campaign.budget) * 100} 
                              className="h-2 mt-2"
                            />
                            <div className="pt-2 border-t">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Criada em:</span>
                                <span className="text-sm font-medium">
                                  {new Date(campaign.createdAt).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Última modificação:</span>
                                <span className="text-sm font-medium">
                                  {new Date(campaign.lastModified).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCampaignAction(campaign.id, 'edit')}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openExternalPlatform(campaign)}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Ver no {campaign.platform === "Meta Ads" ? "Facebook" : "Google"}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(`/analise?campaign=${campaign.id}`, '_blank')}
                          >
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Relatório Completo
                          </Button>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleCampaignAction(campaign.id, 'delete')}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Edit Campaign Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Campanha</DialogTitle>
              <DialogDescription>
                Altere as configurações da campanha selecionada
              </DialogDescription>
            </DialogHeader>
            {selectedCampaign && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">Nome</Label>
                  <Input
                    id="edit-name"
                    value={selectedCampaign.name}
                    onChange={(e) => setSelectedCampaign({...selectedCampaign, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-budget" className="text-right">Orçamento</Label>
                  <div className="col-span-3 flex gap-2">
                    <Input
                      id="edit-budget"
                      type="number"
                      value={selectedCampaign.budget}
                      onChange={(e) => setSelectedCampaign({...selectedCampaign, budget: parseFloat(e.target.value) || 0})}
                      className="flex-1"
                    />
                    <Select 
                      value={selectedCampaign.budgetType} 
                      onValueChange={(value) => setSelectedCampaign({...selectedCampaign, budgetType: value})}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diário</SelectItem>
                        <SelectItem value="lifetime">Vitalício</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">Status</Label>
                  <Select 
                    value={selectedCampaign.status} 
                    onValueChange={(value) => setSelectedCampaign({...selectedCampaign, status: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativa</SelectItem>
                      <SelectItem value="paused">Pausada</SelectItem>
                      <SelectItem value="ended">Finalizada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {selectedCampaign.platform === "Meta Ads" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-adset" className="text-right">AdSet</Label>
                    <Input
                      id="edit-adset"
                      value={selectedCampaign.adSetName || ''}
                      onChange={(e) => setSelectedCampaign({...selectedCampaign, adSetName: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Plataforma</Label>
                  <div className="col-span-3">
                    <Badge>{selectedCampaign.platform}</Badge>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleUpdateCampaign}
                disabled={updateCampaignMutation.isPending}
                className="bg-red-600 hover:bg-red-700"
              >
                {updateCampaignMutation.isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Campaign Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Esta ação não pode ser desfeita. A campanha será permanentemente removida.
              </DialogDescription>
            </DialogHeader>
            {selectedCampaign && (
              <div className="py-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <h4 className="font-semibold text-red-900">Você está prestes a excluir:</h4>
                      <p className="text-red-700">{selectedCampaign.name}</p>
                      <p className="text-sm text-red-600 mt-1">
                        {selectedCampaign.platform} • {selectedCampaign.accountName}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-red-800">{selectedCampaign.sales}</div>
                      <div className="text-red-600">Vendas</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-red-800">{formatCurrency(selectedCampaign.revenue)}</div>
                      <div className="text-red-600">Receita</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-red-800">{formatCurrency(selectedCampaign.spent)}</div>
                      <div className="text-red-600">Gasto</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                Cancelar
              </Button>
              <Button 
                variant="destructive"
                onClick={() => selectedCampaign && deleteCampaignMutation.mutate(selectedCampaign.id)}
                disabled={deleteCampaignMutation.isPending}
              >
                {deleteCampaignMutation.isPending ? "Excluindo..." : "Confirmar Exclusão"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}