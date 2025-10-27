import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  Search, 
  Filter,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  ShoppingCart
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Sale {
  id: number;
  orderId: string;
  productName: string;
  customerEmail: string;
  amount: number;
  status: string;
  platform: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: string;
}

interface SalesStats {
  totalSales: number;
  totalRevenue: number;
  avgOrderValue: number;
  conversionRate: number;
}

export default function Sales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("7d");

  // Query para buscar vendas
  const salesQuery = useQuery({
    queryKey: ['/api/sales', { dateFilter }],
    queryFn: () => {
      const params = new URLSearchParams();
      if (dateFilter !== 'all') {
        const endDate = new Date();
        const startDate = new Date();
        switch (dateFilter) {
          case '7d':
            startDate.setDate(endDate.getDate() - 7);
            break;
          case '30d':
            startDate.setDate(endDate.getDate() - 30);
            break;
          case '90d':
            startDate.setDate(endDate.getDate() - 90);
            break;
        }
        params.set('startDate', startDate.toISOString());
        params.set('endDate', endDate.toISOString());
      }
      return apiRequest(`/api/sales?${params.toString()}`);
    },
  });

  // Query para buscar estatísticas
  const statsQuery = useQuery({
    queryKey: ['/api/sales/stats', { dateFilter }],
    queryFn: () => {
      const params = new URLSearchParams();
      if (dateFilter !== 'all') {
        const endDate = new Date();
        const startDate = new Date();
        switch (dateFilter) {
          case '7d':
            startDate.setDate(endDate.getDate() - 7);
            break;
          case '30d':
            startDate.setDate(endDate.getDate() - 30);
            break;
          case '90d':
            startDate.setDate(endDate.getDate() - 90);
            break;
        }
        params.set('startDate', startDate.toISOString());
        params.set('endDate', endDate.toISOString());
      }
      return apiRequest(`/api/sales/stats?${params.toString()}`);
    },
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
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

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'refunded': return 'bg-red-100 text-red-800';
      case 'chargeback': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'approved': return 'Aprovada';
      case 'pending': return 'Pendente';
      case 'refunded': return 'Reembolsada';
      case 'chargeback': return 'Chargeback';
      default: return status;
    }
  };

  const filteredSales = salesQuery.data?.filter((sale: Sale) => {
    const matchesSearch = 
      sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    const matchesPlatform = platformFilter === 'all' || sale.platform.toLowerCase() === platformFilter;
    
    return matchesSearch && matchesStatus && matchesPlatform;
  }) || [];

  const stats: SalesStats = statsQuery.data || {
    totalSales: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    conversionRate: 0
  };

  if (salesQuery.isLoading || statsQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando vendas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Vendas</h1>
                <Badge variant="secondary" className="ml-3">
                  {filteredSales.length} vendas
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros Avançados
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Vendas</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalSales}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12.5% vs período anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Receita Total</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(stats.totalRevenue)}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8.2% vs período anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(stats.avgOrderValue)}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+5.4% vs período anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.conversionRate}%</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+2.1% vs período anterior</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por produto, email ou ID do pedido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-48">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
                <SelectItem value="all">Todos os períodos</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="approved">Aprovadas</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="refunded">Reembolsadas</SelectItem>
                <SelectItem value="chargeback">Chargeback</SelectItem>
              </SelectContent>
            </Select>

            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="hotmart">Hotmart</SelectItem>
                <SelectItem value="kiwify">Kiwify</SelectItem>
                <SelectItem value="eduzz">Eduzz</SelectItem>
                <SelectItem value="monetizze">Monetizze</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Lista de Vendas */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Vendas</CardTitle>
            <CardDescription>
              Todas as suas vendas e conversões registradas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredSales.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhuma venda encontrada
                </h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' || platformFilter !== 'all'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Suas vendas aparecerão aqui quando começarem a ser registradas'
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Pedido
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Produto
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Cliente
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Valor
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Plataforma
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSales.map((sale: Sale) => (
                      <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {sale.orderId}
                          </div>
                          {sale.utmCampaign && (
                            <div className="text-xs text-gray-500">
                              {sale.utmCampaign}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">{sale.productName}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">{sale.customerEmail}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {formatCurrency(sale.amount)}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge className={getStatusColor(sale.status)}>
                            {getStatusText(sale.status)}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">{sale.platform}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">
                            {formatDate(sale.createdAt)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
        </main>
      </div>
    </div>
  );
}