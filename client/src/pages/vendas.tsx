import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Search,
  Plus,
  RefreshCw,
  ArrowUpRight,
  ArrowDownLeft,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// Temporary removal of auth for demonstration
// import { useAuth } from "@/hooks/useAuth";
// import { isUnauthorizedError } from "@/lib/authUtils";

interface Sale {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  product: string;
  platform: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'refunded';
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  orderId: string;
}

interface SalesMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  periodComparison: {
    revenue: number;
    orders: number;
    averageOrder: number;
    conversion: number;
  };
}

// Schema para validação do formulário de nova venda
const newSaleSchema = z.object({
  customerName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  customerEmail: z.string().email("Email inválido").optional(),
  product: z.string().min(2, "Nome do produto é obrigatório"),
  amount: z.number().min(0.01, "Valor deve ser maior que zero"),
  platform: z.string().min(1, "Plataforma é obrigatória"),
  orderId: z.string().min(1, "ID do pedido é obrigatório"),
  status: z.enum(["confirmed", "pending", "cancelled"]),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

type NewSaleForm = z.infer<typeof newSaleSchema>;

export default function VendasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("30d");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  // Temporary auth bypass for demonstration
  const isAuthenticated = true;
  const authLoading = false;
  const [isAddSaleModalOpen, setIsAddSaleModalOpen] = useState(false);

  // Form para nova venda
  const form = useForm<NewSaleForm>({
    resolver: zodResolver(newSaleSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      product: "",
      amount: 0,
      platform: "",
      orderId: "",
      status: "confirmed",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
    },
  });

  // Buscar dados reais de vendas da API
  const { data: salesData, isLoading: salesLoading, error: salesError } = useQuery<Sale[]>({
    queryKey: ['/api/sales', dateFilter],
    staleTime: 30000, // 30 segundos
    refetchInterval: 60000, // Atualizar a cada minuto
    enabled: isAuthenticated // Só executar se autenticado
  });

  // Buscar métricas de vendas
  const { data: metricsData, isLoading: metricsLoading } = useQuery<SalesMetrics>({
    queryKey: ['/api/sales/metrics', dateFilter],
    staleTime: 30000,
    refetchInterval: 60000,
    enabled: isAuthenticated
  });

  // Dados filtrados baseados na busca
  const filteredSales = useMemo(() => {
    if (!salesData || !Array.isArray(salesData)) return [];
    
    return salesData.filter((sale: Sale) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        sale.customerName.toLowerCase().includes(searchLower) ||
        sale.customerEmail.toLowerCase().includes(searchLower) ||
        sale.product.toLowerCase().includes(searchLower) ||
        sale.platform.toLowerCase().includes(searchLower) ||
        sale.orderId.toLowerCase().includes(searchLower)
      );
    });
  }, [salesData, searchTerm]);

  // Mutation para exportar vendas
  const exportMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/sales/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          dateFilter, 
          searchTerm,
          format: 'excel' 
        }),
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Erro na exportação');
      }
      
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Exportação concluída!",
        description: "Relatório de vendas gerado com sucesso"
      });
      
      // Download do arquivo
      if (data.downloadUrl) {
        window.open(data.downloadUrl, '_blank');
      }
    },
    onError: (error: any) => {
      toast({
        title: "Erro na exportação",
        description: error.message || "Falha ao gerar relatório",
        variant: "destructive"
      });
    }
  });

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/sales"] });
    queryClient.invalidateQueries({ queryKey: ["/api/sales/metrics"] });
    toast({
      title: "Dados atualizados!",
      description: "Informações de vendas sincronizadas"
    });
  };

  // Mutation para adicionar nova venda manualmente
  const addSaleMutation = useMutation({
    mutationFn: async (saleData: NewSaleForm) => {
      const response = await fetch('/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...saleData,
          date: new Date().toISOString()
        }),
        credentials: 'include'
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao registrar venda');
      }
      
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Venda registrada!",
        description: `Venda de R$ ${data.amount.toFixed(2)} adicionada com sucesso`
      });
      queryClient.invalidateQueries({ queryKey: ['/api/sales'] });
      queryClient.invalidateQueries({ queryKey: ['/api/sales/metrics'] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao registrar venda",
        description: error.message || "Falha ao adicionar venda",
        variant: "destructive"
      });
    }
  });

  // Função para submeter nova venda
  const onSubmitNewSale = (formData: NewSaleForm) => {
    addSaleMutation.mutate(formData);
  };

  const addSale = () => {
    setIsAddSaleModalOpen(true);
  };

  // Loading states
  if (authLoading || salesLoading || metricsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">
              {authLoading ? "Verificando autenticação..." : "Carregando dados de vendas..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Auth check
  if (!isAuthenticated) {
    return null; // Will redirect
  }

  // Error state
  if (salesError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto" />
            <p className="mt-4 text-gray-600">Erro ao carregar dados de vendas</p>
            <Button onClick={refreshData} className="mt-4">
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const metrics = metricsData || { 
    totalRevenue: 0, 
    totalOrders: 0, 
    averageOrderValue: 0, 
    conversionRate: 0,
    periodComparison: { revenue: 0, orders: 0, averageOrder: 0, conversion: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Vendas</h1>
                <p className="text-gray-600 mt-1">Acompanhe todas as suas vendas e receitas</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={refreshData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Button 
                variant="outline" 
                onClick={() => exportMutation.mutate()}
                disabled={exportMutation.isPending}
              >
                {exportMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Exportar
              </Button>
              <Button onClick={addSale}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Venda
              </Button>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Sales Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Receita Total</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      R$ {metrics.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {metrics.periodComparison.revenue >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${metrics.periodComparison.revenue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {metrics.periodComparison.revenue >= 0 ? '+' : ''}{metrics.periodComparison.revenue.toFixed(1)}%
                  </span>
                  <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Pedidos</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {metrics.totalOrders.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {metrics.periodComparison.orders >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${metrics.periodComparison.orders >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {metrics.periodComparison.orders >= 0 ? '+' : ''}{metrics.periodComparison.orders.toFixed(1)}%
                  </span>
                  <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      R$ {metrics.averageOrderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {metrics.periodComparison.averageOrder >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${metrics.periodComparison.averageOrder >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {metrics.periodComparison.averageOrder >= 0 ? '+' : ''}{metrics.periodComparison.averageOrder.toFixed(1)}%
                  </span>
                  <span className="text-sm text-gray-500 ml-2">vs período anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {salesData.conversionRate}%
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">+0.8%</span>
                  <span className="text-sm text-gray-500 ml-2">vs mês anterior</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Filtros e Busca</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[300px]">
                  <Label htmlFor="search">Buscar vendas</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Nome do cliente, produto, plataforma..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="min-w-[200px]">
                  <Label htmlFor="date-filter">Período</Label>
                  <select
                    id="date-filter"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="7d">Últimos 7 dias</option>
                    <option value="30d">Últimos 30 dias</option>
                    <option value="90d">Últimos 90 dias</option>
                    <option value="1y">Último ano</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros Avançados
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sales Table */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Vendas Recentes</CardTitle>
              <CardDescription>
                Últimas {filteredSales.length} vendas registradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Cliente</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Produto</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Plataforma</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Valor</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Data</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSales.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-500">
                          <div className="flex flex-col items-center">
                            <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-lg font-medium">Nenhuma venda encontrada</p>
                            <p className="text-sm">Configure suas integrações para começar a rastrear vendas</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredSales.map((sale: Sale) => (
                        <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono text-sm">{sale.orderId}</td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium">{sale.customerName}</div>
                              <div className="text-sm text-gray-500">{sale.customerEmail}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{sale.product}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{sale.platform}</Badge>
                          </td>
                          <td className="py-3 px-4 font-bold text-green-600">
                            R$ {sale.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(sale.date).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={
                              sale.status === 'confirmed' 
                                ? "bg-green-100 text-green-800" 
                                : sale.status === 'pending'
                                ? "bg-yellow-100 text-yellow-800"
                                : sale.status === 'cancelled'
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }>
                              {sale.status === 'confirmed' && 'Confirmada'}
                              {sale.status === 'pending' && 'Pendente'}
                              {sale.status === 'cancelled' && 'Cancelada'}
                              {sale.status === 'refunded' && 'Reembolsada'}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal Nova Venda */}
      <Dialog open={isAddSaleModalOpen} onOpenChange={setIsAddSaleModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>📈 Nova Venda Manual</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitNewSale)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Cliente</FormLabel>
                      <FormControl>
                        <Input placeholder="João Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="customerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email do Cliente</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="joao@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Produto</FormLabel>
                      <FormControl>
                        <Input placeholder="Curso de Marketing Digital" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor (R$)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          placeholder="497.00" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plataforma</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a plataforma" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hotmart">Hotmart</SelectItem>
                          <SelectItem value="kiwify">Kiwify</SelectItem>
                          <SelectItem value="eduzz">Eduzz</SelectItem>
                          <SelectItem value="monetizze">Monetizze</SelectItem>
                          <SelectItem value="braip">Braip</SelectItem>
                          <SelectItem value="ticto">Ticto</SelectItem>
                          <SelectItem value="shopify">Shopify</SelectItem>
                          <SelectItem value="stripe">Stripe</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="orderId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID do Pedido</FormLabel>
                      <FormControl>
                        <Input placeholder="HM-2025001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddSaleModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={addSaleMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {addSaleMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Venda
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}