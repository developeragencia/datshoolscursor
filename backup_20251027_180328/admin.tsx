import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  Users, 
  DollarSign, 
  BarChart3, 
  Settings, 
  Shield, 
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Menu,
  X,
  BookOpen
} from "lucide-react";

// Interfaces para dados reais do admin
interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyGrowth: number;
  totalSales: number;
  activeCampaigns: number;
}

interface AdminUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  currentPlan: string;
  planStatus: string;
  totalRevenue: number;
  campaignsCount: number;
  lastLogin: string | null;
}

interface SystemLog {
  id: number;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

export default function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Buscar dados reais do backend
  const { data: adminStats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ['/api/admin/stats'],
    retry: false
  });

  const { data: adminUsers, isLoading: usersLoading } = useQuery<AdminUser[]>({
    queryKey: ['/api/admin/users'],
    retry: false  
  });

  const { data: systemLogs, isLoading: logsLoading } = useQuery<SystemLog[]>({
    queryKey: ['/api/admin/logs'],
    retry: false
  });

  // Filtrar usuários reais
  const filteredUsers = adminUsers?.filter(user => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === "all" || user.currentPlan.toLowerCase() === selectedPlan;
    return matchesSearch && matchesPlan;
  }) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "inactive": return <XCircle className="h-4 w-4 text-red-500" />;
      case "suspended": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case "error": return <XCircle className="h-4 w-4 text-red-500" />;
      case "info": return <Activity className="h-4 w-4 text-blue-500" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  // Loading states
  if (statsLoading || usersLoading || logsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando painel admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="h-full">
              <Sidebar />
            </div>
          </div>
        </div>
      )}

      {/* Layout */}
      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Header com botão mobile */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex items-center gap-3">
                {/* Botão do menu mobile */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Painel Admin
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                    Bueiro Digital - Controle Total do Sistema
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="border-red-200 text-red-700 self-start sm:self-center">
                Admin Access
              </Badge>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-4 sm:p-6">
            {/* Stats Cards - Mobile optimized */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats?.totalUsers.toLocaleString() || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {adminStats?.activeUsers || 0} ativos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    R$ {(adminStats?.totalRevenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +{adminStats?.monthlyGrowth || 0}% este mês
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(adminStats?.totalSales || 0).toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Todas as plataformas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats?.activeCampaigns || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Em execução
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tutorial Admin Card - Destaque */}
            <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-blue-900 dark:text-blue-100">
                      📚 Tutorial Completo do Painel Admin
                    </CardTitle>
                    <CardDescription className="text-blue-700 dark:text-blue-300">
                      Aprenda a dominar todas as funcionalidades da plataforma com nosso guia interativo
                    </CardDescription>
                  </div>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.location.href = '/admin-tutorial'}
                  >
                    Iniciar Tutorial
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-800 dark:text-blue-200">Tutorial Interativo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-800 dark:text-blue-200">6 Seções Completas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-800 dark:text-blue-200">FAQ Detalhado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs - Mobile responsive */}
            <Tabs defaultValue="users" className="space-y-4 sm:space-y-6">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                <TabsTrigger value="users" className="text-xs sm:text-sm py-2">
                  Usuários
                </TabsTrigger>
                <TabsTrigger value="system" className="text-xs sm:text-sm py-2">
                  Sistema
                </TabsTrigger>
                <TabsTrigger value="integrations" className="text-xs sm:text-sm py-2">
                  Integrações
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-xs sm:text-sm py-2">
                  Config
                </TabsTrigger>
              </TabsList>

              {/* Users Tab - Mobile optimized */}
              <TabsContent value="users" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div>
                        <CardTitle className="text-lg sm:text-xl">Gerenciamento de Usuários</CardTitle>
                        <CardDescription className="text-sm">
                          Controle total sobre contas de usuários e assinaturas
                        </CardDescription>
                      </div>
                      <Button size="sm" className="self-start sm:self-center">
                        <Plus className="h-4 w-4 mr-2" />
                        <span>Novo Usuário</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    {/* Filters - Mobile responsive */}
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:gap-4 mb-4 sm:mb-6">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Buscar usuários..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 text-sm"
                          />
                        </div>
                      </div>
                      <select
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-sm"
                      >
                        <option value="all">Todos os planos</option>
                        <option value="gratuito">Gratuito</option>
                        <option value="premium">Premium</option>
                        <option value="avançado">Avançado</option>
                        <option value="monster">Monster</option>
                      </select>
                    </div>

                    {/* Users Table - Mobile responsive */}
                    <div className="border rounded-lg overflow-hidden">
                      {/* Desktop Table */}
                      <div className="hidden lg:block">
                        <table className="w-full">
                          <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Usuário
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Plano
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Receita
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Campanhas
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Ações
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredUsers.map((user) => (
                              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Usuário'}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <Badge 
                                    variant={user.currentPlan === 'Monster' ? 'default' : 'secondary'}
                                    className={
                                      user.currentPlan === 'Monster' ? 'bg-purple-600' :
                                      user.currentPlan === 'Premium' ? 'bg-blue-600 text-white' :
                                      user.currentPlan === 'Avançado' ? 'bg-green-600 text-white' :
                                      'bg-gray-200 text-gray-800'
                                    }
                                  >
                                    {user.currentPlan}
                                  </Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center gap-2">
                                    {getStatusIcon(user.planStatus)}
                                    <span className="text-sm text-gray-900 dark:text-white capitalize">{user.planStatus}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                  R$ {(user.totalRevenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                  {user.campaignsCount || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Cards */}
                      <div className="lg:hidden space-y-3 p-4">
                        {filteredUsers.map((user) => (
                          <div key={user.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                  {`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Usuário'}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(user.planStatus)}
                                <Badge 
                                  variant={user.currentPlan === 'Monster' ? 'default' : 'secondary'}
                                  className={
                                    user.currentPlan === 'Monster' ? 'bg-purple-600 text-xs' :
                                    user.currentPlan === 'Premium' ? 'bg-blue-600 text-white text-xs' :
                                    user.currentPlan === 'Avançado' ? 'bg-green-600 text-white text-xs' :
                                    'bg-gray-200 text-gray-800 text-xs'
                                  }
                                >
                                  {user.currentPlan}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Receita:</span>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  R$ {(user.totalRevenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Campanhas:</span>
                                <p className="font-medium text-gray-900 dark:text-white">{user.campaignsCount || 0}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4 mr-1" />
                                Excluir
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* System Tab */}
              <TabsContent value="system" className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Logs do Sistema</CardTitle>
                      <CardDescription className="text-sm">
                        Monitoramento em tempo real de eventos do sistema
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(systemLogs || []).map((log) => (
                          <div key={log.id} className="flex items-start gap-3 p-3 border rounded-lg">
                            {getLogIcon(log.type)}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900 dark:text-white break-words">{log.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {new Date(log.timestamp).toLocaleString('pt-BR')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Status do Servidor</CardTitle>
                      <CardDescription className="text-sm">
                        Monitoramento da infraestrutura
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">Banco de Dados</span>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Online
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">API Facebook</span>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Conectado
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">API Google Ads</span>
                          </div>
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            Limite Próximo
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Integrations Tab */}
              <TabsContent value="integrations" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Integrações Ativas</CardTitle>
                    <CardDescription className="text-sm">
                      Conecte e gerencie suas plataformas de pagamento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Facebook Ads</h3>
                          <Badge className="bg-green-100 text-green-800">Conectado</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">125 campanhas ativas</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Google Ads</h3>
                          <Badge className="bg-yellow-100 text-yellow-800">Limite</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">89 campanhas ativas</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Hotmart</h3>
                          <Badge className="bg-green-100 text-green-800">Conectado</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">45 produtos</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Configurações do Sistema</CardTitle>
                    <CardDescription className="text-sm">
                      Configurações globais da plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-medium mb-4">Configurações Gerais</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Manutenção Programada</span>
                            <Button variant="outline" size="sm">Configurar</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Backup Automático</span>
                            <Button variant="outline" size="sm">Gerenciar</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Logs de Auditoria</span>
                            <Button variant="outline" size="sm">Visualizar</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}