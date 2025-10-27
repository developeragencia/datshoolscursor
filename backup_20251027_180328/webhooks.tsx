import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sidebar } from "@/components/layout/sidebar";
import { useToast } from "@/hooks/use-toast";
import { 
  Webhook,
  Link,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  Copy,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  RefreshCw,
  Code,
  Zap,
  Shield,
  Activity
} from "lucide-react";

export default function Webhooks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<any>(null);
  const [newWebhook, setNewWebhook] = useState({
    name: "",
    platform: "",
    url: "",
    secretKey: "",
    events: [],
    description: "",
    isActive: true
  });
  
  const [customPlatformSuggestion, setCustomPlatformSuggestion] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch webhooks data
  const { data: webhooks = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/webhooks"],
  });

  const filteredWebhooks = webhooks.filter((webhook: any) => {
    const matchesSearch = 
      webhook.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webhook.platform?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webhook.url?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && webhook.isActive) ||
      (statusFilter === "inactive" && !webhook.isActive);
    
    const matchesPlatform = platformFilter === "all" || webhook.platform === platformFilter;
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  // Lista expandida de plataformas disponíveis
  const availablePlatforms = [
    // Infoprodutos Brasileiros
    { value: "hotmart", label: "Hotmart", category: "Infoprodutos" },
    { value: "kiwify", label: "Kiwify", category: "Infoprodutos" },
    { value: "eduzz", label: "Eduzz", category: "Infoprodutos" },
    { value: "monetizze", label: "Monetizze", category: "Infoprodutos" },
    { value: "braip", label: "Braip", category: "Infoprodutos" },
    { value: "guru", label: "Guru", category: "Infoprodutos" },
    { value: "hubla", label: "Hubla", category: "Infoprodutos" },
    
    // Pagamentos Brasileiros
    { value: "perfectpay", label: "PerfectPay", category: "Pagamento" },
    { value: "ironpay", label: "IronPay", category: "Pagamento" },
    { value: "fortpay", label: "FortPay", category: "Pagamento" },
    { value: "bearpay", label: "BearPay", category: "Pagamento" },
    { value: "klivopay", label: "KlivoPay", category: "Pagamento" },
    { value: "kirvano", label: "Kirvano", category: "Pagamento" },
    { value: "ticto", label: "Ticto", category: "Pagamento" },
    { value: "logzz", label: "Logzz", category: "Pagamento" },
    { value: "pantherfy", label: "Pantherfy", category: "Pagamento" },
    { value: "lastlink", label: "Lastlink", category: "Pagamento" },
    { value: "mundpay", label: "MundPay", category: "Pagamento" },
    { value: "sigmapagamentos", label: "SigmaPagamentos", category: "Pagamento" },
    { value: "frendz", label: "Frendz", category: "Pagamento" },
    { value: "pagtrust", label: "PagTrust", category: "Pagamento" },
    { value: "paradise", label: "Paradise", category: "Pagamento" },
    { value: "orbita", label: "Orbita", category: "Pagamento" },
    { value: "soutpay", label: "SoutPay", category: "Pagamento" },
    { value: "vittapay", label: "VittaPay", category: "Pagamento" },
    
    // E-commerce
    { value: "shopify", label: "Shopify", category: "E-commerce" },
    { value: "woocommerce", label: "WooCommerce", category: "E-commerce" },
    { value: "yampi", label: "Yampi", category: "E-commerce" },
    { value: "tray", label: "Tray", category: "E-commerce" },
    { value: "loja_integrada", label: "Loja Integrada", category: "E-commerce" },
    
    // Internacionais
    { value: "clickbank", label: "ClickBank", category: "Internacional" },
    { value: "digistore24", label: "Digistore24", category: "Internacional" },
    { value: "stripe", label: "Stripe", category: "Internacional" },
    { value: "paypal", label: "PayPal", category: "Internacional" },
    
    // Redes Sociais/Ads
    { value: "facebook_ads", label: "Facebook Ads", category: "Anúncios" },
    { value: "google_ads", label: "Google Ads", category: "Anúncios" },
    { value: "tiktok_ads", label: "TikTok Ads", category: "Anúncios" },
    { value: "kwai_ads", label: "Kwai Ads", category: "Anúncios" },
    
    // CRMs e Automação
    { value: "rd_station", label: "RD Station", category: "CRM" },
    { value: "hubspot", label: "HubSpot", category: "CRM" },
    { value: "mailchimp", label: "Mailchimp", category: "E-mail Marketing" },
    { value: "activecampaign", label: "ActiveCampaign", category: "E-mail Marketing" },
  ];

  // Mutations
  const createWebhookMutation = useMutation({
    mutationFn: async (webhookData: any) => {
      const response = await fetch('/api/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(webhookData)
      });
      if (!response.ok) throw new Error('Erro ao criar webhook');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Webhook criado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/webhooks'] });
      setIsCreateModalOpen(false);
      setNewWebhook({
        name: "",
        platform: "",
        url: "",
        secretKey: "",
        events: [],
        description: "",
        isActive: true
      });
    },
    onError: () => {
      toast({ title: "Erro ao criar webhook", variant: "destructive" });
    }
  });

  const updateWebhookMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const response = await fetch(`/api/webhooks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erro ao atualizar webhook');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Webhook atualizado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/webhooks'] });
      setIsEditModalOpen(false);
    },
    onError: () => {
      toast({ title: "Erro ao atualizar webhook", variant: "destructive" });
    }
  });

  const deleteWebhookMutation = useMutation({
    mutationFn: async (webhookId: string) => {
      const response = await fetch(`/api/webhooks/${webhookId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Erro ao excluir webhook');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Webhook excluído com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/webhooks'] });
      setIsDeleteModalOpen(false);
    },
    onError: () => {
      toast({ title: "Erro ao excluir webhook", variant: "destructive" });
    }
  });

  const toggleWebhookMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string, isActive: boolean }) => {
      const response = await fetch(`/api/webhooks/${id}/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isActive })
      });
      if (!response.ok) throw new Error('Erro ao alterar status do webhook');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Status do webhook alterado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/webhooks'] });
    },
    onError: () => {
      toast({ title: "Erro ao alterar status do webhook", variant: "destructive" });
    }
  });

  const testWebhookMutation = useMutation({
    mutationFn: async (webhookId: string) => {
      const response = await fetch(`/api/webhooks/${webhookId}/test`, {
        method: 'POST',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Erro ao testar webhook');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Teste do webhook enviado com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao testar webhook", variant: "destructive" });
    }
  });

  const handleCreateWebhook = () => {
    createWebhookMutation.mutate(newWebhook);
  };

  const handleUpdateWebhook = () => {
    if (selectedWebhook) {
      updateWebhookMutation.mutate({ id: selectedWebhook.id, data: selectedWebhook });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
        <CheckCircle className="h-3 w-3 mr-1" />
        Ativo
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
        <XCircle className="h-3 w-3 mr-1" />
        Inativo
      </Badge>
    );
  };

  const getPlatformBadge = (platform: string) => {
    const platformColors: { [key: string]: string } = {
      'hotmart': 'bg-blue-100 text-blue-800',
      'kiwify': 'bg-green-100 text-green-800',
      'eduzz': 'bg-purple-100 text-purple-800',
      'braip': 'bg-pink-100 text-pink-800',
      'monetizze': 'bg-indigo-100 text-indigo-800',
    };

    return (
      <Badge className={`${platformColors[platform] || 'bg-gray-100 text-gray-800'} hover:opacity-80`}>
        {platform.charAt(0).toUpperCase() + platform.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Webhooks</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Configure integrações automáticas com suas plataformas de venda
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Webhook
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Webhook</DialogTitle>
                    <DialogDescription>
                      Configure um novo webhook para receber dados de vendas automaticamente
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="webhook-name">Nome do Webhook</Label>
                        <Input
                          id="webhook-name"
                          placeholder="Ex: Hotmart - Vendas"
                          value={newWebhook.name}
                          onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="webhook-platform">Plataforma</Label>
                        <Select
                          value={newWebhook.platform}
                          onValueChange={(value) => setNewWebhook({ ...newWebhook, platform: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a plataforma" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {/* Agrupar por categoria */}
                            {["Infoprodutos", "Pagamento", "E-commerce", "Internacional", "Anúncios", "CRM", "E-mail Marketing"].map((category) => {
                              const platformsInCategory = availablePlatforms.filter(p => p.category === category);
                              if (platformsInCategory.length === 0) return null;
                              
                              return (
                                <div key={category}>
                                  {/* <SelectItem disabled className="font-semibold text-xs text-gray-500 bg-gray-50">
                                    {category}
                                  </SelectItem> */}
                                  {platformsInCategory.map((platform) => (
                                    <SelectItem key={platform.value} value={platform.value}>
                                      {platform.label}
                                    </SelectItem>
                                  ))}
                                </div>
                              );
                            })}
                            
                            {/* Opção para sugerir nova plataforma */}
                            <SelectItem value="custom">
                              <div className="flex items-center gap-2">
                                <Plus className="h-3 w-3" />
                                Sugerir nova plataforma
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Campo para sugestão de nova plataforma */}
                    {newWebhook.platform === "custom" && (
                      <div className="space-y-2 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                        <Label htmlFor="custom-platform">Sugerir Nova Plataforma</Label>
                        <Input
                          id="custom-platform"
                          placeholder="Nome da plataforma que você gostaria de integrar"
                          value={customPlatformSuggestion}
                          onChange={(e) => setCustomPlatformSuggestion(e.target.value)}
                        />
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          Nossa equipe avaliará sua sugestão e tentará implementar a integração.
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">URL do Webhook</Label>
                      <Input
                        id="webhook-url"
                        placeholder="https://sua-plataforma.com/webhook-endpoint"
                        value={newWebhook.url}
                        onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                      />
                      <p className="text-sm text-gray-500">
                        URL fornecida pela sua plataforma para receber notificações
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="webhook-secret">Chave Secreta (Opcional)</Label>
                      <Input
                        id="webhook-secret"
                        type="password"
                        placeholder="Chave para validar autenticidade dos dados"
                        value={newWebhook.secretKey}
                        onChange={(e) => setNewWebhook({ ...newWebhook, secretKey: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="webhook-description">Descrição</Label>
                      <Textarea
                        id="webhook-description"
                        placeholder="Descreva o propósito deste webhook..."
                        value={newWebhook.description}
                        onChange={(e) => setNewWebhook({ ...newWebhook, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleCreateWebhook}
                      disabled={!newWebhook.name || !newWebhook.platform || !newWebhook.url}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {createWebhookMutation.isPending ? "Criando..." : "Criar Webhook"}
                    </Button>
                  </DialogFooter>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome do Webhook</Label>
                        <Input
                          id="name"
                          value={newWebhook.name}
                          onChange={(e) => setNewWebhook({...newWebhook, name: e.target.value})}
                          placeholder="Ex: Hotmart Vendas"
                        />
                      </div>
                      <div>
                        <Label htmlFor="platform">Plataforma</Label>
                        <Select value={newWebhook.platform} onValueChange={(value) => setNewWebhook({...newWebhook, platform: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a plataforma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hotmart">Hotmart</SelectItem>
                            <SelectItem value="kiwify">Kiwify</SelectItem>
                            <SelectItem value="eduzz">Eduzz</SelectItem>
                            <SelectItem value="braip">Braip</SelectItem>
                            <SelectItem value="monetizze">Monetizze</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="url">URL do Webhook</Label>
                      <Input
                        id="url"
                        value={newWebhook.url}
                        onChange={(e) => setNewWebhook({...newWebhook, url: e.target.value})}
                        placeholder="https://api.bueirodigital.com/webhook/hotmart"
                      />
                    </div>
                    <div>
                      <Label htmlFor="secretKey">Chave Secreta</Label>
                      <Input
                        id="secretKey"
                        type="password"
                        value={newWebhook.secretKey}
                        onChange={(e) => setNewWebhook({...newWebhook, secretKey: e.target.value})}
                        placeholder="Chave de segurança fornecida pela plataforma"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={newWebhook.description}
                        onChange={(e) => setNewWebhook({...newWebhook, description: e.target.value})}
                        placeholder="Descrição do webhook..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleCreateWebhook}
                      disabled={createWebhookMutation.isPending}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {createWebhookMutation.isPending ? "Criando..." : "Criar Webhook"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Webhooks</p>
                    <p className="text-2xl font-bold text-blue-600">{webhooks.length}</p>
                  </div>
                  <Webhook className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Webhooks Ativos</p>
                    <p className="text-2xl font-bold text-green-600">
                      {webhooks.filter((w: any) => w.isActive).length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Eventos Processados</p>
                    <p className="text-2xl font-bold text-purple-600">1,234</p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taxa de Sucesso</p>
                    <p className="text-2xl font-bold text-orange-600">98.5%</p>
                  </div>
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Webhooks Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Webhooks Configurados</CardTitle>
                  <CardDescription>
                    Gerencie suas integrações automáticas com plataformas de venda
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Input
                    placeholder="Buscar webhooks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="inactive">Inativos</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por plataforma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as plataformas</SelectItem>
                    <SelectItem value="hotmart">Hotmart</SelectItem>
                    <SelectItem value="kiwify">Kiwify</SelectItem>
                    <SelectItem value="eduzz">Eduzz</SelectItem>
                    <SelectItem value="braip">Braip</SelectItem>
                    <SelectItem value="monetizze">Monetizze</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Plataforma</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Criado em</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredWebhooks.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <Webhook className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum webhook encontrado</h3>
                          <p className="text-gray-500">
                            {searchTerm || statusFilter !== "all" || platformFilter !== "all"
                              ? "Tente ajustar os filtros ou fazer uma nova busca."
                              : "Configure seu primeiro webhook para automatizar o recebimento de dados."
                            }
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredWebhooks.map((webhook: any) => (
                        <TableRow key={webhook.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-yellow-500" />
                              {webhook.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getPlatformBadge(webhook.platform)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {(webhook.webhookUrl || webhook.url || '').length > 40 ? 
                                  `${(webhook.webhookUrl || webhook.url || '').substring(0, 40)}...` : 
                                  (webhook.webhookUrl || webhook.url || 'N/A')}
                              </code>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(webhook.webhookUrl || webhook.url || '');
                                  toast({ title: "URL copiada!" });
                                }}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(webhook.isActive || webhook.status === 'active')}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {formatDate(webhook.createdAt)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => testWebhookMutation.mutate(webhook.id)}
                                disabled={testWebhookMutation.isPending}
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleWebhookMutation.mutate({ id: webhook.id, isActive: !(webhook.isActive || webhook.status === 'active') })}
                                disabled={toggleWebhookMutation.isPending}
                              >
                                {(webhook.isActive || webhook.status === 'active') ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedWebhook(webhook);
                                  setIsEditModalOpen(true);
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedWebhook(webhook);
                                  setIsDeleteModalOpen(true);
                                }}
                              >
                                <Trash2 className="h-3 w-3 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Edit Webhook Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Webhook</DialogTitle>
              <DialogDescription>
                Altere as configurações do webhook selecionado
              </DialogDescription>
            </DialogHeader>
            {selectedWebhook && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Nome do Webhook</Label>
                    <Input
                      id="edit-name"
                      value={selectedWebhook.name}
                      onChange={(e) => setSelectedWebhook({...selectedWebhook, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-platform">Plataforma</Label>
                    <Select value={selectedWebhook.platform} onValueChange={(value) => setSelectedWebhook({...selectedWebhook, platform: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hotmart">Hotmart</SelectItem>
                        <SelectItem value="kiwify">Kiwify</SelectItem>
                        <SelectItem value="eduzz">Eduzz</SelectItem>
                        <SelectItem value="braip">Braip</SelectItem>
                        <SelectItem value="monetizze">Monetizze</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-url">URL do Webhook</Label>
                  <Input
                    id="edit-url"
                    value={selectedWebhook.url}
                    onChange={(e) => setSelectedWebhook({...selectedWebhook, url: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-secretKey">Chave Secreta</Label>
                  <Input
                    id="edit-secretKey"
                    type="password"
                    value={selectedWebhook.secretKey || ''}
                    onChange={(e) => setSelectedWebhook({...selectedWebhook, secretKey: e.target.value})}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleUpdateWebhook}
                disabled={updateWebhookMutation.isPending}
                className="bg-red-600 hover:bg-red-700"
              >
                {updateWebhookMutation.isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Webhook Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Esta ação não pode ser desfeita. O webhook será permanentemente removido.
              </DialogDescription>
            </DialogHeader>
            {selectedWebhook && (
              <div className="py-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <h4 className="font-semibold text-red-900">Você está prestes a excluir:</h4>
                      <p className="text-red-700">{selectedWebhook.name}</p>
                      <p className="text-sm text-red-600 mt-1">
                        {selectedWebhook.platform} • {selectedWebhook.url}
                      </p>
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
                onClick={() => selectedWebhook && deleteWebhookMutation.mutate(selectedWebhook.id)}
                disabled={deleteWebhookMutation.isPending}
              >
                {deleteWebhookMutation.isPending ? "Excluindo..." : "Confirmar Exclusão"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}