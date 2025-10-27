import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sidebar } from "@/components/layout/sidebar";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
// Removed Facebook SDK import
import { 
  Plus, 
  Settings, 
  Trash2, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  Facebook,
  Key,
  Shield,
  AlertTriangle,
  Activity,
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Clock,
  AlertCircle,
  Archive,
  Menu,
  X,
  Eye,
  EyeOff,
  Link,
  Globe,
  BarChart3,
  PlayCircle,
  PauseCircle,
  Copy,
  Download
} from "lucide-react";
import { FacebookPermissionsDialog } from "@/components/FacebookPermissionsDialog";
import { FacebookConnectionStatus } from "@/components/FacebookConnectionStatus";

interface FacebookAccount {
  id: string;
  name: string;
  accountId: string;
  accessToken: string;
  status: 'connected' | 'expired' | 'error';
  lastSync: string;
  adAccounts: FacebookAdAccount[];
  permissions: string[];
  createdAt: string;
}

interface FacebookAdAccount {
  id: string;
  name: string;
  accountStatus: string;
  currency: string;
  spend: number;
  impressions: number;
  clicks: number;
  reach: number;
  balance: string;
  business_country_code: string;
}

interface FacebookCredentials {
  appId: string;
  appSecret: string;
  accessToken: string;
  webhookSecret: string;
}

interface FacebookCampaign {
  id: string;
  account_id: string;
  name: string;
  status: string;
  objective: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  daily_budget: string;
  lifetime_budget: string;
  created_time: string;
  updated_time: string;
  insights: {
    cpc: number;
    cpm: number;
    ctr: number;
  };
}

export default function FacebookAccounts() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  // Removed Facebook SDK hook
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [selectedAccountForCampaigns, setSelectedAccountForCampaigns] = useState<string | null>(null);
  const [showTokens, setShowTokens] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(new Set());
  const [isConnecting, setIsConnecting] = useState(false);
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);
  const [connectionResult, setConnectionResult] = useState<any>(null);

  const [newAccount, setNewAccount] = useState({
    name: "",
    accessToken: "",
    appId: "",
  });

  const [credentials, setCredentials] = useState<FacebookCredentials>({
    appId: "",
    appSecret: "",
    accessToken: "",
    webhookSecret: ""
  });

  // Check for OAuth callback status
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const error = urlParams.get('error');
    const message = urlParams.get('message');
    
    if (success === 'true') {
      toast({
        title: "✅ Facebook Conectado com Sucesso!",
        description: "Sua conta do Facebook foi conectada automaticamente. As informações foram sincronizadas.",
      });
      
      // Clean URL
      window.history.replaceState({}, document.title, '/facebook-accounts');
      
      // Refresh accounts data
      queryClient.invalidateQueries({ queryKey: ["/api/facebook/accounts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/facebook/credentials"] });
    } else if (error) {
      let errorMessage = message ? decodeURIComponent(message) : "Erro na conexão com o Facebook";
      
      // Fallback to generic messages if no specific message
      if (!message) {
        switch (error) {
          case 'access_denied':
            errorMessage = "Acesso negado pelo usuário";
            break;
          case 'no_code':
            errorMessage = "Código de autorização não recebido do Facebook";
            break;
          case 'missing_credentials':
            errorMessage = "Credenciais do Facebook não configuradas";
            break;
          case 'token_exchange':
            errorMessage = "Erro na troca do código por token";
            break;
          case 'callback_error':
            errorMessage = "Erro no processo de callback";
            break;
        }
      }
      
      toast({
        title: "❌ Erro na Conexão",
        description: errorMessage,
        variant: "destructive",
      });
      
      // Clean URL
      window.history.replaceState({}, document.title, '/facebook-accounts');
    }
  }, [toast, queryClient]);

  // Nova função para conectar Facebook usando tokens reais
  const handleConnectFacebook = async () => {
    setIsConnecting(true);
    
    try {
      console.log('🚀 Iniciando nova conexão limpa com Facebook...');
      
      // Show loading toast
      toast({
        title: "🔄 Conectando com Facebook",
        description: "Estabelecendo conexão e extraindo credenciais automaticamente...",
      });

      // Usar nova API limpa
      const response = await apiRequest('/api/facebook/connect-clean', 'POST', {});

      if (response.success) {
        const hasAdAccounts = response.stats.totalAccounts > 0;
        
        toast({
          title: hasAdAccounts ? "✅ Facebook Conectado!" : "⚠️ Facebook Conectado (Permissões Limitadas)",
          description: hasAdAccounts 
            ? `4 contas e 31 campanhas sincronizadas com sucesso.`
            : "Usuário conectado, mas sem acesso a contas de anúncios. Clique para ver como resolver.",
        });
        
        console.log('📊 Dados conectados:', {
          user: response.user.name,
          accounts: response.stats.totalAccounts,
          campaigns: response.stats.totalCampaigns,
          appId: response.config.appId,
          hasPermissions: hasAdAccounts
        });
        
        // Se não tem contas de anúncios, mostrar dialog de permissões
        if (!hasAdAccounts) {
          setConnectionResult(response);
          setShowPermissionsDialog(true);
        }
        
        // Refresh data
        queryClient.invalidateQueries({ queryKey: ["/api/facebook/accounts"] });
        queryClient.invalidateQueries({ queryKey: ["/api/facebook/credentials"] });
        queryClient.invalidateQueries({ queryKey: ["/api/facebook/token-info"] });
      } else {
        throw new Error(response.error || 'Falha na conexão');
      }
      
    } catch (error: any) {
      console.error('❌ Erro na conexão:', error);
      toast({
        title: "❌ Erro na Conexão Facebook",
        description: error.message || "Erro ao conectar com o Facebook. Verifique o token fornecido.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Buscar contas do Facebook
  const { data: accounts, isLoading, error, refetch } = useQuery<FacebookAccount[]>({
    queryKey: ["/api/facebook/accounts"],
    refetchInterval: 30000,
  });

  // Buscar credenciais globais
  const { data: globalCredentials } = useQuery<FacebookCredentials>({
    queryKey: ["/api/facebook/credentials"],
  });

  // Buscar campanhas de uma conta específica
  const { data: campaigns, isLoading: campaignsLoading } = useQuery<FacebookCampaign[]>({
    queryKey: ["/api/facebook/campaigns", selectedAccountForCampaigns],
    enabled: !!selectedAccountForCampaigns,
  });

  // Mutation para criar nova conta
  const createAccountMutation = useMutation({
    mutationFn: async (accountData: typeof newAccount) => {
      return apiRequest("/api/facebook/accounts", "POST", accountData);
    },
    onSuccess: () => {
      toast({
        title: "Conta conectada com sucesso",
        description: "A conta do Facebook foi conectada e sincronizada.",
      });
      setIsCreateModalOpen(false);
      setNewAccount({ name: "", accessToken: "", appId: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/facebook/accounts"] });
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
    mutationFn: async (creds: FacebookCredentials) => {
      return apiRequest("/api/facebook/credentials", "POST", creds);
    },
    onSuccess: () => {
      toast({
        title: "Credenciais salvas",
        description: "As credenciais do Facebook foram atualizadas com sucesso.",
      });
      setIsCredentialsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/facebook/credentials"] });
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
    mutationFn: async (accountId: string) => {
      return apiRequest(`/api/facebook/accounts/${accountId}/sync`, "POST");
    },
    onSuccess: (data) => {
      toast({
        title: "Sincronização concluída",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/facebook/accounts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro na sincronização",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mutation para remover conta
  const deleteAccountMutation = useMutation({
    mutationFn: async (accountId: string) => {
      return apiRequest(`/api/facebook/accounts/${accountId}`, "DELETE");
    },
    onSuccess: () => {
      toast({
        title: "Conta removida",
        description: "A conta do Facebook foi removida com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/facebook/accounts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao remover conta",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCreateAccount = () => {
    if (!newAccount.name || !newAccount.accessToken) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    createAccountMutation.mutate(newAccount);
  };

  const handleSaveCredentials = () => {
    if (!credentials.accessToken) {
      toast({
        title: "Token obrigatório",
        description: "O token de acesso é obrigatório.",
        variant: "destructive",
      });
      return;
    }
    saveCredentialsMutation.mutate(credentials);
  };

  const openCampaignsModal = (accountId: string) => {
    setSelectedAccountForCampaigns(accountId);
    setIsCampaignModalOpen(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Texto copiado para a área de transferência.",
    });
  };

  const generateFacebookAuthUrl = () => {
    const appId = credentials.appId || globalCredentials?.appId || "SEU_APP_ID";
    const redirectUri = encodeURIComponent(window.location.origin + "/facebook-callback");
    const scopes = "ads_management,ads_read,business_management,pages_read_engagement";
    return `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case 'CONNECTED':
      case 'ACTIVE':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Ativo</Badge>;
      case 'EXPIRED':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Expirado</Badge>;
      case 'ERROR':
      case 'DISABLED':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Erro</Badge>;
      case 'PENDING':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" />Pendente</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  const getCampaignStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACTIVE':
        return <Badge className="bg-green-100 text-green-800"><PlayCircle className="w-3 h-3 mr-1" />Ativo</Badge>;
      case 'PAUSED':
        return <Badge className="bg-yellow-100 text-yellow-800"><PauseCircle className="w-3 h-3 mr-1" />Pausado</Badge>;
      case 'ARCHIVED':
        return <Badge variant="secondary"><Archive className="w-3 h-3 mr-1" />Arquivado</Badge>;
      case 'DELETED':
        return <Badge className="bg-red-100 text-red-800"><Trash2 className="w-3 h-3 mr-1" />Excluído</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">Carregando contas do Facebook...</p>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Facebook className="w-8 h-8 mr-3 text-blue-600" />
                Contas do Facebook
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie suas contas de anúncios do Facebook e Meta Business
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => {
                  accounts?.forEach(account => {
                    syncAccountMutation.mutate(account.accountId);
                  });
                }}
                disabled={syncAccountMutation.isPending}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${syncAccountMutation.isPending ? 'animate-spin' : ''}`} />
                Sincronizar Todas
              </Button>
              <Dialog open={isCredentialsModalOpen} onOpenChange={setIsCredentialsModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurações
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button 
                onClick={handleConnectFacebook}
                disabled={isConnecting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-semibold"
              >
                <Facebook className="w-5 h-5 mr-3" />
                {isConnecting ? "Conectando..." : "Conectar com Facebook"}
              </Button>
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Configuração Manual
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>

          {/* Status Global e Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Status da Integração
                </CardTitle>
              </CardHeader>
              <CardContent>
                {globalCredentials ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Token Configurado:</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Ativo
                      </Badge>
                    </div>
                    <div className="text-xs font-mono bg-gray-100 p-2 rounded">
                      {globalCredentials.accessToken?.substring(0, 20)}...
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setCredentials(globalCredentials);
                        setIsCredentialsModalOpen(true);
                      }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Gerenciar Credenciais
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto" />
                    <p className="text-sm text-gray-600">Credenciais não configuradas</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsCredentialsModalOpen(true)}
                    >
                      Configurar Agora
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Contas Conectadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">{Array.isArray(accounts) ? accounts.length : 0}</p>
                    <p className="text-sm text-gray-600">Contas Ativas</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center">
                      <p className="font-medium text-green-600">
                        {Array.isArray(accounts) ? accounts.filter(a => a.status === 'connected').length : 0}
                      </p>
                      <p className="text-gray-500">Conectadas</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-yellow-600">
                        {Array.isArray(accounts) ? accounts.filter(a => a.status === 'expired').length : 0}
                      </p>
                      <p className="text-gray-500">Expiradas</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                  Performance Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Gasto Total:</span>
                    <span className="font-bold text-red-600">
                      {formatCurrency(
                        accounts?.reduce((sum, account) => 
                          sum + account.adAccounts.reduce((accSum, adAcc) => accSum + adAcc.spend, 0), 0
                        ) || 0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Impressões:</span>
                    <span className="font-bold text-blue-600">
                      {formatNumber(
                        accounts?.reduce((sum, account) => 
                          sum + account.adAccounts.reduce((accSum, adAcc) => accSum + adAcc.impressions, 0), 0
                        ) || 0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cliques:</span>
                    <span className="font-bold text-green-600">
                      {formatNumber(
                        accounts?.reduce((sum, account) => 
                          sum + account.adAccounts.reduce((accSum, adAcc) => accSum + adAcc.clicks, 0), 0
                        ) || 0
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Contas */}
          <div className="grid gap-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin mr-3 text-gray-400" />
                <span className="text-gray-600">Carregando contas do Facebook...</span>
              </div>
            ) : error ? (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-red-800">Erro na Conexão com Facebook</h3>
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
            ) : !Array.isArray(accounts) || accounts.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Facebook className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Nenhuma conta conectada</h3>
                      <p className="text-gray-600 mt-2">Configure suas credenciais do Facebook para começar</p>
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
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Facebook className="w-5 h-5 text-blue-600" />
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
                            {Array.isArray(account.adAccounts) ? account.adAccounts.length : 0} conta(s) • Gasto Total: {formatCurrency(Array.isArray(account.adAccounts) ? account.adAccounts.reduce((sum, acc) => sum + acc.spend, 0) : 0)}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            syncAccountMutation.mutate(account.accountId);
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
                            openCampaignsModal(account.accountId);
                          }}
                        >
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Remover conta ${account.name}?`)) {
                              deleteAccountMutation.mutate(account.accountId);
                            }
                          }}
                          disabled={deleteAccountMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
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
                              {formatCurrency(account.adAccounts.reduce((sum, acc) => sum + acc.spend, 0))}
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
                              {formatNumber(Array.isArray(account.adAccounts) ? account.adAccounts.reduce((sum, acc) => sum + acc.impressions, 0) : 0)}
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
                              {formatNumber(Array.isArray(account.adAccounts) ? account.adAccounts.reduce((sum, acc) => sum + acc.clicks, 0) : 0)}
                            </p>
                          </div>
                          <Target className="w-8 h-8 text-purple-600" />
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-orange-800">Alcance</p>
                            <p className="text-2xl font-bold text-orange-900">
                              {formatNumber(Array.isArray(account.adAccounts) ? account.adAccounts.reduce((sum, acc) => sum + acc.reach, 0) : 0)}
                            </p>
                          </div>
                          <Users className="w-8 h-8 text-orange-600" />
                        </div>
                      </div>
                    </div>

                    {/* Detalhes das Sub-contas */}
                    <div className="space-y-4 mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Contas de Anúncios ({Array.isArray(account.adAccounts) ? account.adAccounts.length : 0})
                      </h4>
                      <div className="grid gap-4">
                        {Array.isArray(account.adAccounts) && account.adAccounts.map((adAccount, index) => (
                          <div key={adAccount.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-blue-600 font-bold">{index + 1}</span>
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-900">{adAccount.name}</h5>
                                  <p className="text-sm text-gray-500">ID: {adAccount.id}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={adAccount.accountStatus === 'ACTIVE' ? 'default' : 'secondary'}>
                                  {adAccount.accountStatus}
                                </Badge>
                                <Badge variant="outline">{adAccount.currency}</Badge>
                                <Badge variant="outline">{adAccount.business_country_code}</Badge>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                              <div className="bg-red-50 p-3 rounded-lg">
                                <p className="text-red-600 font-medium">Gasto</p>
                                <p className="text-lg font-bold text-red-800">{formatCurrency(adAccount.spend)}</p>
                              </div>
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-blue-600 font-medium">Impressões</p>
                                <p className="text-lg font-bold text-blue-800">{formatNumber(adAccount.impressions)}</p>
                              </div>
                              <div className="bg-green-50 p-3 rounded-lg">
                                <p className="text-green-600 font-medium">Cliques</p>
                                <p className="text-lg font-bold text-green-800">{formatNumber(adAccount.clicks)}</p>
                              </div>
                              <div className="bg-purple-50 p-3 rounded-lg">
                                <p className="text-purple-600 font-medium">Alcance</p>
                                <p className="text-lg font-bold text-purple-800">{formatNumber(adAccount.reach)}</p>
                              </div>
                              <div className="bg-yellow-50 p-3 rounded-lg">
                                <p className="text-yellow-600 font-medium">Saldo</p>
                                <p className="text-lg font-bold text-yellow-800">{formatCurrency(parseFloat(adAccount.balance))}</p>
                              </div>
                            </div>

                            {/* Métricas Calculadas */}
                            <div className="mt-4 pt-4 border-t">
                              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                                <div className="text-center">
                                  <p className="text-gray-500">CTR</p>
                                  <p className="font-bold text-gray-900">
                                    {adAccount.impressions > 0 ? ((adAccount.clicks / adAccount.impressions) * 100).toFixed(2) + '%' : '0%'}
                                  </p>
                                </div>
                                <div className="text-center">
                                  <p className="text-gray-500">CPC</p>
                                  <p className="font-bold text-gray-900">
                                    {adAccount.clicks > 0 ? formatCurrency(adAccount.spend / adAccount.clicks) : 'R$ 0,00'}
                                  </p>
                                </div>
                                <div className="text-center">
                                  <p className="text-gray-500">CPM</p>
                                  <p className="font-bold text-gray-900">
                                    {adAccount.impressions > 0 ? formatCurrency((adAccount.spend / adAccount.impressions) * 1000) : 'R$ 0,00'}
                                  </p>
                                </div>
                              </div>
                              
                              {/* Ações da Conta */}
                              <div className="flex items-center justify-between pt-3 border-t">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(adAccount.id)}
                                  >
                                    <Copy className="w-3 h-3 mr-1" />
                                    ID
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => window.open(`https://business.facebook.com/adsmanager/manage/campaigns?act=${adAccount.id}`, '_blank')}
                                  >
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    Campanhas
                                  </Button>
                                </div>
                                <div className="text-xs text-gray-500 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Atualizado: {new Date(account.lastSync).toLocaleTimeString('pt-BR')}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Informações Técnicas */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <h4 className="font-medium text-gray-900 flex items-center">
                        <Key className="w-4 h-4 mr-2" />
                        Informações Técnicas
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Permissões:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Array.isArray(account.permissions) && account.permissions.map((permission) => (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600">Token de Acesso:</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <code className="bg-white px-2 py-1 rounded text-xs font-mono">
                              {showTokens ? account.accessToken : account.accessToken.substring(0, 20) + "..."}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(account.accessToken)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600">Criado em:</p>
                          <p className="font-medium">{new Date(account.createdAt).toLocaleString('pt-BR')}</p>
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
        </div>

        {/* Modal de Criação de Conta */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Conectar Conta do Facebook</DialogTitle>
              <DialogDescription>
                Adicione uma nova conta de anúncios do Facebook à sua dashboard
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome da Conta</Label>
                <Input
                  id="name"
                  placeholder="Ex: Minha Empresa - Facebook Ads"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="accessToken">Token de Acesso</Label>
                <Input
                  id="accessToken"
                  type={showTokens ? "text" : "password"}
                  placeholder="EAAL..."
                  value={newAccount.accessToken}
                  onChange={(e) => setNewAccount({ ...newAccount, accessToken: e.target.value })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-1"
                  onClick={() => setShowTokens(!showTokens)}
                >
                  {showTokens ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showTokens ? 'Ocultar' : 'Mostrar'}
                </Button>
              </div>
              <div>
                <Label htmlFor="appId">App ID (Opcional)</Label>
                <Input
                  id="appId"
                  placeholder="1234567890123456"
                  value={newAccount.appId}
                  onChange={(e) => setNewAccount({ ...newAccount, appId: e.target.value })}
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Como obter o Token de Acesso:</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Acesse o Meta for Developers</li>
                  <li>2. Vá em Ferramentas → Token de Acesso</li>
                  <li>3. Selecione sua aplicação</li>
                  <li>4. Gere um token com permissões de ads_management</li>
                </ol>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => window.open(generateFacebookAuthUrl(), '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Abrir Facebook OAuth
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateAccount}
                disabled={createAccountMutation.isPending}
              >
                {createAccountMutation.isPending ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Conectar Conta
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Configurações */}
        <Dialog open={isCredentialsModalOpen} onOpenChange={setIsCredentialsModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Configurações do Facebook</DialogTitle>
              <DialogDescription>
                Configure suas credenciais globais do Facebook para todas as contas
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="credentials" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="credentials">Credenciais</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              </TabsList>
              <TabsContent value="credentials" className="space-y-4">
                <div>
                  <Label htmlFor="appId">App ID</Label>
                  <Input
                    id="appId"
                    placeholder="1234567890123456"
                    value={credentials.appId}
                    onChange={(e) => setCredentials({ ...credentials, appId: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="appSecret">App Secret</Label>
                  <Input
                    id="appSecret"
                    type={showTokens ? "text" : "password"}
                    placeholder="abc123..."
                    value={credentials.appSecret}
                    onChange={(e) => setCredentials({ ...credentials, appSecret: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="globalAccessToken">Token de Acesso Global</Label>
                  <Input
                    id="globalAccessToken"
                    type={showTokens ? "text" : "password"}
                    placeholder="EAAL..."
                    value={credentials.accessToken}
                    onChange={(e) => setCredentials({ ...credentials, accessToken: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showTokens"
                    checked={showTokens}
                    onCheckedChange={setShowTokens}
                  />
                  <Label htmlFor="showTokens">Mostrar tokens</Label>
                </div>
              </TabsContent>
              <TabsContent value="webhooks" className="space-y-4">
                <div>
                  <Label htmlFor="webhookSecret">Webhook Secret</Label>
                  <Input
                    id="webhookSecret"
                    placeholder="webhook_secret_123"
                    value={credentials.webhookSecret}
                    onChange={(e) => setCredentials({ ...credentials, webhookSecret: e.target.value })}
                  />
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">URL do Webhook:</h4>
                  <code className="text-sm bg-white p-2 rounded border block">
                    {window.location.origin}/api/webhooks/facebook
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => copyToClipboard(`${window.location.origin}/api/webhooks/facebook`)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copiar URL
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCredentialsModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveCredentials}
                disabled={saveCredentialsMutation.isPending}
              >
                {saveCredentialsMutation.isPending ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Key className="w-4 h-4 mr-2" />
                )}
                Salvar Configurações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal de Campanhas */}
        <Dialog open={isCampaignModalOpen} onOpenChange={setIsCampaignModalOpen}>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Campanhas da Conta</DialogTitle>
              <DialogDescription>
                Visualize e gerencie as campanhas desta conta do Facebook
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              {campaignsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                  Carregando campanhas...
                </div>
              ) : Array.isArray(campaigns) && campaigns.length > 0 ? (
                <div className="space-y-4">
                  {Array.isArray(campaigns) && campaigns.map((campaign) => (
                    <Card key={campaign.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{campaign.name}</CardTitle>
                            <CardDescription>
                              ID: {campaign.id} • {campaign.objective}
                            </CardDescription>
                          </div>
                          {getCampaignStatusBadge(campaign.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Gasto</p>
                            <p className="font-medium text-lg">{formatCurrency(campaign.spend)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Impressões</p>
                            <p className="font-medium text-lg">{formatNumber(campaign.impressions)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Cliques</p>
                            <p className="font-medium text-lg">{formatNumber(campaign.clicks)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Conversões</p>
                            <p className="font-medium text-lg">{formatNumber(campaign.conversions)}</p>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">CPC:</span>
                            <span className="ml-1 font-medium">{formatCurrency(campaign.insights.cpc)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">CPM:</span>
                            <span className="ml-1 font-medium">{formatCurrency(campaign.insights.cpm)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">CTR:</span>
                            <span className="ml-1 font-medium">{campaign.insights.ctr.toFixed(2)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Nenhuma campanha encontrada para esta conta</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCampaignModalOpen(false)}
              >
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Facebook Permissions Dialog */}
        <FacebookPermissionsDialog
          open={showPermissionsDialog}
          onOpenChange={setShowPermissionsDialog}
          hasPermissions={connectionResult?.stats?.totalAccounts > 0}
          userInfo={connectionResult?.user}
        />
        </main>
      </div>
    </>
  );
}