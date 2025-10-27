import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

// Metrics cards data
const metricsData = [
  {
    title: 'Faturamento',
    value: 'R$ 45.827,50',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Conversões',
    value: '187',
    change: '+8.2%',
    trend: 'up',
    icon: Target,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Impressões',
    value: '524.892',
    change: '-2.1%',
    trend: 'down',
    icon: Eye,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'ROAS',
    value: '4.8x',
    change: '+15.3%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
];

const campaignData = [
  {
    id: '1',
    name: 'Campanha Black Friday - Produto A',
    platform: 'Meta Ads',
    spent: 2350.00,
    revenue: 11250.00,
    roas: 4.8,
    conversions: 45,
    status: 'active',
  },
  {
    id: '2',
    name: 'Google Search - Infoproduto B',
    platform: 'Google Ads',
    spent: 1890.00,
    revenue: 8920.00,
    roas: 4.7,
    conversions: 32,
    status: 'active',
  },
  {
    id: '3',
    name: 'TikTok Viral - Curso Online',
    platform: 'TikTok Ads',
    spent: 1200.00,
    revenue: 5400.00,
    roas: 4.5,
    conversions: 28,
    status: 'paused',
  },
];

export default function ClientOverview() {
  const [dateRange, setDateRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['/api/dashboard/overview', dateRange],
    enabled: true,
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const MetricCard = ({ metric }: { metric: typeof metricsData[0] }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {metric.title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {metric.value}
          </p>
          <div className="flex items-center mt-2">
            {metric.trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${
              metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.change}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs período anterior</span>
          </div>
        </div>
        <div className={`${metric.bgColor} p-3 rounded-lg`}>
          <metric.icon className={`h-6 w-6 ${metric.color}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Visão Geral
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Acompanhe suas métricas e performance em tempo real
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="1d">Hoje</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
          </select>
          
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
          
          <button className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Performance das Campanhas
          </h3>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">Filtros</span>
          </div>
        </div>
        
        {/* Chart placeholder - seria um gráfico real */}
        <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-500">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">Gráfico de Performance</p>
            <p className="text-sm text-gray-400">Faturamento vs Gastos - Últimos 30 dias</p>
          </div>
        </div>
      </div>

      {/* Top Campaigns */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Principais Campanhas
          </h3>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            Ver todas
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Campanha</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Plataforma</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Gasto</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Faturamento</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">ROAS</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Conversões</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {campaignData.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {campaign.name}
                      </p>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {campaign.platform}
                    </span>
                  </td>
                  <td className="py-4 text-gray-900 dark:text-white">
                    R$ {campaign.spent.toLocaleString('pt-BR')}
                  </td>
                  <td className="py-4 text-gray-900 dark:text-white">
                    R$ {campaign.revenue.toLocaleString('pt-BR')}
                  </td>
                  <td className="py-4">
                    <span className="font-medium text-green-600">
                      {campaign.roas}x
                    </span>
                  </td>
                  <td className="py-4 text-gray-900 dark:text-white">
                    {campaign.conversions}
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campaign.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {campaign.status === 'active' ? 'Ativa' : 'Pausada'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Criar Nova Campanha</h4>
          <p className="text-green-100 mb-4 text-sm">Configure uma nova campanha em poucos cliques</p>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50">
            Começar
          </button>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Relatórios Detalhados</h4>
          <p className="text-blue-100 mb-4 text-sm">Análise completa das suas métricas</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50">
            Ver Relatórios
          </button>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Automação</h4>
          <p className="text-purple-100 mb-4 text-sm">Configure regras de otimização automática</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50">
            Configurar
          </button>
        </div>
      </div>
    </div>
  );
}