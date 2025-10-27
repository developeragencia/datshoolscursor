import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { useToast } from "@/hooks/use-toast";
import { 
  Receipt, 
  Plus, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  CreditCard,
  Calendar,
  Target,
  Edit,
  Trash2
} from "lucide-react";

export default function DespesasPage() {
  const { toast } = useToast();
  const expenses = [
    { id: 1, description: "Google Ads - Campanha Verão", category: "Mídia Paga", amount: 2500.00, date: "2025-01-15", status: "Pago" },
    { id: 2, description: "Facebook Ads - Retargeting", category: "Mídia Paga", amount: 1800.00, date: "2025-01-14", status: "Pago" },
    { id: 3, description: "Hotmart - Taxa de afiliação", category: "Plataforma", amount: 350.00, date: "2025-01-13", status: "Pendente" },
    { id: 4, description: "Kiwify - Comissão de vendas", category: "Plataforma", amount: 750.00, date: "2025-01-12", status: "Pago" },
    { id: 5, description: "TikTok Ads - Campanha Mobile", category: "Mídia Paga", amount: 1200.00, date: "2025-01-11", status: "Pago" },
  ];

  const categories = [
    { name: "Mídia Paga", total: 5500.00, color: "bg-blue-500" },
    { name: "Plataforma", total: 1100.00, color: "bg-green-500" },
    { name: "Ferramentas", total: 450.00, color: "bg-purple-500" },
    { name: "Outros", total: 200.00, color: "bg-orange-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Receipt className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Controle de Despesas</h1>
                <p className="text-gray-600 mt-1">
                  Gerencie seus custos e acompanhe o ROI das campanhas
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Nova despesa",
                  description: "Registrando nova despesa de campanha"
                });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Despesa
              </Button>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-700">Total Gastos</p>
                    <p className="text-3xl font-bold text-red-900 mt-2">R$ 7.250</p>
                  </div>
                  <div className="p-3 bg-red-200 rounded-xl">
                    <DollarSign className="h-8 w-8 text-red-600" />
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <TrendingUp className="h-4 w-4 text-red-600 mr-1" />
                  <span className="text-xs text-red-600">+12% vs mês anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">Receita</p>
                    <p className="text-3xl font-bold text-green-900 mt-2">R$ 28.450</p>
                  </div>
                  <div className="p-3 bg-green-200 rounded-xl">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+18% vs mês anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700">ROI</p>
                    <p className="text-3xl font-bold text-blue-900 mt-2">292%</p>
                  </div>
                  <div className="p-3 bg-blue-200 rounded-xl">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="text-xs text-blue-600">+5% vs mês anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">Lucro Líquido</p>
                    <p className="text-3xl font-bold text-purple-900 mt-2">R$ 21.200</p>
                  </div>
                  <div className="p-3 bg-purple-200 rounded-xl">
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <TrendingUp className="h-4 w-4 text-purple-600 mr-1" />
                  <span className="text-xs text-purple-600">+20% vs mês anterior</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Categories Overview */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Despesas por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 ${category.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                      <Receipt className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      R$ {category.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {((category.total / 7250) * 100).toFixed(1)}% do total
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expenses List */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Últimas Despesas</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Este Mês
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Receipt className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{expense.description}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {expense.category}
                          </Badge>
                          <span className="text-sm text-gray-600">{expense.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          R$ {expense.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <Badge variant={expense.status === 'Pago' ? 'default' : 'secondary'} className="text-xs">
                          {expense.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Comparison */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Comparativo Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Dezembro 2024", "Janeiro 2025", "Fevereiro 2025"].map((month, index) => (
                  <div key={month} className="text-center p-6 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">{month}</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Despesas</p>
                        <p className="text-xl font-bold text-red-600">
                          R$ {(6500 + (index * 375)).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Receita</p>
                        <p className="text-xl font-bold text-green-600">
                          R$ {(24000 + (index * 2225)).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">ROI</p>
                        <p className="text-xl font-bold text-blue-600">
                          {(269 + (index * 11.5)).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}