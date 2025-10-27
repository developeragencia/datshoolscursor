import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sidebar } from "@/components/layout/sidebar";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Search, 
  ExternalLink,
  Target,
  DollarSign,
  TrendingUp,
  Activity,
  Plus,
  Settings,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  X,
  Copy
} from "lucide-react";

interface GoogleAccount {
  id: string;
  name: string;
  customerId: string;
  status: string;
  currency: string;
  timeZone: string;
  lastSync: string;
  campaigns: number;
  totalSpend: number;
  totalImpressions: number;
  totalClicks: number;
  accessToken: string;
  refreshToken: string;
  permissions: string[];
}

interface GoogleCredentials {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  developerToken: string;
}

export default function GoogleAds() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(new Set());
  
  const [newAccount, setNewAccount] = useState({
    name: "",
    customerId: "",
    refreshToken: "",
  });

  const [credentials, setCredentials] = useState<GoogleCredentials>({
    clientId: "",
    clientSecret: "",
    refreshToken: "",
    developerToken: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Buscar contas do Google Ads
  const { data: accounts, isLoading, error, refetch } = useQuery<GoogleAccount[]>({
    queryKey: ["/api/google/accounts"],
    refetchInterval: 30000,
  });

  // Buscar credenciais globais
  const { data: globalCredentials } = useQuery<GoogleCredentials>({
    queryKey: ["/api/google/credentials"],
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

  // Mutation para conectar nova conta
  const createAccountMutation = useMutation({
    mutationFn: async (accountData: typeof newAccount) => {
      return apiRequest("/api/google/accounts", "POST", accountData);
    },
    onSuccess: () => {
      toast({
        title: "Conta conectada com sucesso",
        description: "A conta do Google Ads foi conectada e sincronizada.",
      });
      setIsCreateModalOpen(false);
      setNewAccount({ name: "", customerId: "", refreshToken: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/google/accounts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao conectar conta",
        description: error.message || "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    },
  });

  // Mutation para salvar credenciais
  const saveCredentialsMutation = useMutation({
    mutationFn: async (creds: GoogleCredentials) => {
      return apiRequest("/api/google/credentials", "POST", creds);
    },
    onSuccess: () => {
      toast({
        title: "Credenciais salvas",
        description: "As credenciais do Google Ads foram atualizadas com sucesso.",
      });
      setIsCredentialsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/google/credentials"] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao salvar credenciais",
        description: error.message || "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    },
  });

  // Mutation para sincronizar conta
  const syncAccountMutation = useMutation({
    mutationFn: async (customerId: string) => {
      return apiRequest(`/api/google/accounts/${customerId}/sync`, "POST");
    },
    onSuccess: () => {
      toast({
        title: "Conta sincronizada",
        description: "Os dados da conta foram atualizados com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/google/accounts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro na sincronização",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACTIVE':
      case 'ENABLED':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Ativo</Badge>;
      case 'SUSPENDED':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Suspenso</Badge>;
      case 'CANCELLED':
      case 'CLOSED':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Cancelado</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Texto copiado para a área de transferência.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Carregando contas do Google Ads...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded-lg mr-3">
                  <Search className="h-6 w-6" />
                </div>
                Contas do Google Ads
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie suas contas de anúncios do Google Ads e campanhas
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsCredentialsModalOpen(true)}
                variant="outline"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configurar Credenciais
              </Button>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Conectar Conta
              </Button>
            </div>
          </div>

          {/* Estatísticas Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Contas Conectadas</p>
                    <p className="text-2xl font-bold text-gray-900">{accounts?.length || 0}</p>
                  </div>
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Gasto Total</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(
                        accounts?.reduce((sum, account) => sum + account.totalSpend, 0) || 0
                      )}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Impressões</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(
                        accounts?.reduce((sum, account) => sum + account.totalImpressions, 0) || 0
                      )}
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cliques</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(
                        accounts?.reduce((sum, account) => sum + account.totalClicks, 0) || 0
                      )}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Contas */}
          <div className="grid gap-6">
            {error ? (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-red-800">Erro na Conexão com Google Ads</h3>
                      <p className="text-red-600 mt-2">{error.message}</p>
                    </div>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsCredentialsModalOpen(true)}
                        className="mr-2"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Configurar Credenciais
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => refetch()}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Tentar Novamente
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : !accounts || accounts.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Search className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Nenhuma conta conectada</h3>
                      <p className="text-gray-600 mt-2">Configure suas credenciais do Google Ads para começar</p>
                    </div>
                    <Button onClick={() => setIsCredentialsModalOpen(true)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Configurar Agora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              accounts.map((account) => (
                <Card key={account.id} className="border border-gray-200 hover:border-blue-300 transition-colors">
                  <CardHeader className="cursor-pointer" onClick={() => {
                    const newExpanded = new Set(expandedAccounts);
                    if (newExpanded.has(account.id)) {
                      newExpanded.delete(account.id);
                    } else {
                      newExpanded.add(account.id);
                    }
                    setExpandedAccounts(newExpanded);
                  }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Search className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <CardTitle className="text-lg">{account.name}</CardTitle>
                            {getStatusBadge(account.status)}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation();
                                const newExpanded = new Set(expandedAccounts);
                                if (newExpanded.has(account.id)) {
                                  newExpanded.delete(account.id);
                                } else {
                                  newExpanded.add(account.id);
                                }
                                setExpandedAccounts(newExpanded);
                              }}
                            >
                              {expandedAccounts.has(account.id) ? (
                                <X className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          <CardDescription className="mt-1">
                            {account.campaigns} campanha(s) • Gasto: {formatCurrency(account.totalSpend)}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            syncAccountMutation.mutate(account.customerId);
                          }}
                          disabled={syncAccountMutation.isPending}
                        >
                          <RefreshCw className={`w-4 h-4 ${syncAccountMutation.isPending ? 'animate-spin' : ''}`} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://ads.google.com/aw/accounts?account=${account.customerId}`, '_blank');
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {expandedAccounts.has(account.id) && (
                    <CardContent className="pt-0">
                      {/* Resumo de Performance */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-blue-800">Gasto Total</p>
                              <p className="text-2xl font-bold text-blue-900">
                                {formatCurrency(account.totalSpend)}
                              </p>
                            </div>
                            <DollarSign className="w-8 h-8 text-blue-600" />
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-green-800">Impressões</p>
                              <p className="text-2xl font-bold text-green-900">
                                {formatNumber(account.totalImpressions)}
                              </p>
                            </div>
                            <Activity className="w-8 h-8 text-green-600" />
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-purple-800">Cliques</p>
                              <p className="text-2xl font-bold text-purple-900">
                                {formatNumber(account.totalClicks)}
                              </p>
                            </div>
                            <Target className="w-8 h-8 text-purple-600" />
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-orange-800">CTR</p>
                              <p className="text-2xl font-bold text-orange-900">
                                {account.totalImpressions > 0 ? formatPercent((account.totalClicks / account.totalImpressions) * 100) : '0%'}
                              </p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-orange-600" />
                          </div>
                        </div>
                      </div>

                      {/* Informações Técnicas */}
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <h4 className="font-medium text-gray-900 flex items-center">
                          <Settings className="w-4 h-4 mr-2" />
                          Informações da Conta
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Customer ID:</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <code className="bg-white px-2 py-1 rounded text-xs font-mono">
                                {account.customerId}
                              </code>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(account.customerId)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600">Moeda:</p>
                            <p className="font-medium">{account.currency}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Fuso Horário:</p>
                            <p className="font-medium">{account.timeZone}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Última Sincronização:</p>
                            <p className="font-medium">{new Date(account.lastSync).toLocaleString('pt-BR')}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))
            )}
          </div>

          {/* Modal de Credenciais */}
          <Dialog open={isCredentialsModalOpen} onOpenChange={setIsCredentialsModalOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Configurar Credenciais do Google Ads</DialogTitle>
                <DialogDescription>
                  Configure suas credenciais para conectar com a API do Google Ads
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="clientId">Client ID</Label>
                    <Input
                      id="clientId"
                      value={credentials.clientId}
                      onChange={(e) => setCredentials(prev => ({ ...prev, clientId: e.target.value }))}
                      placeholder="123456789.apps.googleusercontent.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientSecret">Client Secret</Label>
                    <Input
                      id="clientSecret"
                      type="password"
                      value={credentials.clientSecret}
                      onChange={(e) => setCredentials(prev => ({ ...prev, clientSecret: e.target.value }))}
                      placeholder="GOCSPX-xxxxxxxxxx"
                    />
                  </div>
                  <div>
                    <Label htmlFor="developerToken">Developer Token</Label>
                    <Input
                      id="developerToken"
                      type="password"
                      value={credentials.developerToken}
                      onChange={(e) => setCredentials(prev => ({ ...prev, developerToken: e.target.value }))}
                      placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxx"
                    />
                  </div>
                  <div>
                    <Label htmlFor="refreshToken">Refresh Token</Label>
                    <Input
                      id="refreshToken"
                      type="password"
                      value={credentials.refreshToken}
                      onChange={(e) => setCredentials(prev => ({ ...prev, refreshToken: e.target.value }))}
                      placeholder="1//04xxxxxxxxxxxxxxxxxxxxxxxxx"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCredentialsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={() => saveCredentialsMutation.mutate(credentials)}
                  disabled={saveCredentialsMutation.isPending}
                >
                  {saveCredentialsMutation.isPending ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  Salvar Credenciais
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Modal de Nova Conta */}
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Conectar Conta do Google Ads</DialogTitle>
                <DialogDescription>
                  Conecte uma nova conta do Google Ads
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="accountName">Nome da Conta</Label>
                  <Input
                    id="accountName"
                    value={newAccount.name}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Minha Conta Principal"
                  />
                </div>
                <div>
                  <Label htmlFor="customerId">Customer ID</Label>
                  <Input
                    id="customerId"
                    value={newAccount.customerId}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, customerId: e.target.value }))}
                    placeholder="123-456-7890"
                  />
                </div>
                <div>
                  <Label htmlFor="accountRefreshToken">Refresh Token (Opcional)</Label>
                  <Input
                    id="accountRefreshToken"
                    type="password"
                    value={newAccount.refreshToken}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, refreshToken: e.target.value }))}
                    placeholder="Token específico para esta conta"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={() => createAccountMutation.mutate(newAccount)}
                  disabled={createAccountMutation.isPending || !newAccount.name || !newAccount.customerId}
                >
                  {createAccountMutation.isPending ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  Conectar Conta
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}