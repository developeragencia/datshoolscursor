import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { PlanAccess } from "@/components/plan-access";
import { 
  Zap, 
  Plus, 
  Play, 
  Pause, 
  Trash2, 
  Settings, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Target,
  DollarSign,
  Activity
} from "lucide-react";

interface AutomatedRule {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  triggerType: 'roas' | 'cost' | 'conversion_rate' | 'cpc' | 'cpm';
  condition: 'greater_than' | 'less_than' | 'equals';
  threshold: number;
  action: 'pause_campaign' | 'increase_budget' | 'decrease_budget' | 'send_notification';
  actionValue?: number;
  campaignIds: number[];
  executionCount: number;
  lastExecuted?: string;
  createdAt: string;
}

function RegrasAutomatizadasPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<AutomatedRule | null>(null);

  const [newRule, setNewRule] = useState({
    name: "",
    description: "",
    triggerType: "roas" as const,
    condition: "less_than" as const,
    threshold: 0,
    action: "pause_campaign" as const,
    actionValue: 0,
    campaignIds: [] as number[]
  });

  const { data: rules = [], isLoading, refetch } = useQuery<AutomatedRule[]>({
    queryKey: ["/api/automated-rules"],
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const { data: campaigns = [] } = useQuery({
    queryKey: ["/api/campaigns"],
  });

  const createRuleMutation = useMutation({
    mutationFn: async (ruleData: any) => {
      return apiRequest("POST", "/api/automated-rules", ruleData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/automated-rules"] });
      setIsCreateModalOpen(false);
      setNewRule({
        name: "",
        description: "",
        triggerType: "roas",
        condition: "less_than",
        threshold: 0,
        action: "pause_campaign",
        actionValue: 0,
        campaignIds: []
      });
      toast({
        title: "Regra criada",
        description: "A regra automatizada foi criada com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao criar regra automatizada.",
        variant: "destructive",
      });
    },
  });

  const toggleRuleMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string | number; isActive: boolean }) => {
      return apiRequest("PATCH", `/api/automated-rules/${id}/toggle`, { isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/automated-rules"] });
      queryClient.refetchQueries({ queryKey: ["/api/automated-rules"] });
      toast({
        title: "Status atualizado!",
        description: "O status da regra foi alterado com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar",
        description: error.message || "Falha ao alterar status da regra.",
        variant: "destructive",
      });
    },
  });

  const deleteRuleMutation = useMutation({
    mutationFn: async (id: string | number) => {
      return apiRequest("DELETE", `/api/automated-rules/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/automated-rules"] });
      queryClient.refetchQueries({ queryKey: ["/api/automated-rules"] });
      toast({
        title: "Regra excluída!",
        description: "A regra automatizada foi excluída com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao excluir",
        description: error.message || "Falha ao excluir regra.",
        variant: "destructive",
      });
    },
  });

  const handleToggleRule = async (id: string | number, currentStatus: boolean) => {
    try {
      await toggleRuleMutation.mutateAsync({ id, isActive: !currentStatus });
      // Force immediate refetch
      await refetch();
    } catch (error) {
      // Toggle error occurred
    }
  };

  const handleDeleteRule = (id: string | number) => {
    if (window.confirm("Tem certeza que deseja excluir esta regra? Esta ação não pode ser desfeita.")) {
      deleteRuleMutation.mutate(id);
    }
  };

  const handleCreateRule = () => {
    if (!newRule.name || !newRule.triggerType || !newRule.threshold) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    createRuleMutation.mutate(newRule);
  };

  const getTriggerTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      roas: "ROAS",
      cost: "Custo",
      conversion_rate: "Taxa de Conversão",
      cpc: "CPC",
      cpm: "CPM"
    };
    return labels[type] || type;
  };

  const getConditionLabel = (condition: string) => {
    const labels: Record<string, string> = {
      greater_than: "Maior que",
      less_than: "Menor que",
      equals: "Igual a"
    };
    return labels[condition] || condition;
  };

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      pause_campaign: "Pausar Campanha",
      increase_budget: "Aumentar Orçamento",
      decrease_budget: "Diminuir Orçamento",
      send_notification: "Enviar Notificação"
    };
    return labels[action] || action;
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'pause_campaign':
        return <Pause className="h-4 w-4" />;
      case 'increase_budget':
        return <TrendingUp className="h-4 w-4" />;
      case 'decrease_budget':
        return <TrendingDown className="h-4 w-4" />;
      case 'send_notification':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Activity className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Carregando regras...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Regras Automatizadas</h1>
              <p className="text-gray-600">
                Configure regras para automatizar ações baseadas na performance das campanhas
              </p>
            </div>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Regra
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Criar Nova Regra Automatizada</DialogTitle>
                  <DialogDescription>
                    Configure uma regra para automatizar ações baseadas em métricas de performance
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Nome *</Label>
                    <Input
                      id="name"
                      value={newRule.name}
                      onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                      className="col-span-3"
                      placeholder="Nome da regra"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Descrição</Label>
                    <Input
                      id="description"
                      value={newRule.description}
                      onChange={(e) => setNewRule({...newRule, description: e.target.value})}
                      className="col-span-3"
                      placeholder="Descrição da regra"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="trigger" className="text-right">Gatilho *</Label>
                    <Select value={newRule.triggerType} onValueChange={(value: any) => setNewRule({...newRule, triggerType: value})}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="roas">ROAS</SelectItem>
                        <SelectItem value="cost">Custo</SelectItem>
                        <SelectItem value="conversion_rate">Taxa de Conversão</SelectItem>
                        <SelectItem value="cpc">CPC</SelectItem>
                        <SelectItem value="cpm">CPM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="condition" className="text-right">Condição *</Label>
                    <Select value={newRule.condition} onValueChange={(value: any) => setNewRule({...newRule, condition: value})}>
                      <SelectTrigger className="col-span-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="greater_than">Maior que</SelectItem>
                        <SelectItem value="less_than">Menor que</SelectItem>
                        <SelectItem value="equals">Igual a</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={newRule.threshold}
                      onChange={(e) => setNewRule({...newRule, threshold: parseFloat(e.target.value) || 0})}
                      className="col-span-2"
                      placeholder="Valor limite"
                      step="0.01"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="action" className="text-right">Ação *</Label>
                    <Select value={newRule.action} onValueChange={(value: any) => setNewRule({...newRule, action: value})}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pause_campaign">Pausar Campanha</SelectItem>
                        <SelectItem value="increase_budget">Aumentar Orçamento</SelectItem>
                        <SelectItem value="decrease_budget">Diminuir Orçamento</SelectItem>
                        <SelectItem value="send_notification">Enviar Notificação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {(['increase_budget', 'decrease_budget'].includes(newRule.action)) && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="actionValue" className="text-right">Valor (%)</Label>
                      <Input
                        type="number"
                        value={newRule.actionValue}
                        onChange={(e) => setNewRule({...newRule, actionValue: parseFloat(e.target.value) || 0})}
                        className="col-span-3"
                        placeholder="Percentual de ajuste"
                        min="1"
                        max="100"
                      />
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleCreateRule}
                    disabled={createRuleMutation.isPending}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {createRuleMutation.isPending ? "Criando..." : "Criar Regra"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Regras Ativas</p>
                    <p className="text-2xl font-bold text-green-600">
                      {rules.filter(r => r.isActive).length}
                    </p>
                  </div>
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Regras</p>
                    <p className="text-2xl font-bold text-blue-600">{rules.length}</p>
                  </div>
                  <Settings className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Execuções Hoje</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {rules.reduce((sum, r) => sum + r.executionCount, 0)}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pausadas</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {rules.filter(r => !r.isActive).length}
                    </p>
                  </div>
                  <Pause className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rules List */}
          <div className="space-y-6">
            {rules.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma regra criada</h3>
                  <p className="text-gray-600 mb-4">
                    Crie sua primeira regra automatizada para otimizar suas campanhas automaticamente.
                  </p>
                  <Button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeira Regra
                  </Button>
                </CardContent>
              </Card>
            ) : (
              rules.map((rule) => (
                <Card key={rule.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${rule.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                        <div>
                          <CardTitle className="text-lg">{rule.name}</CardTitle>
                          <CardDescription>{rule.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={rule.isActive ? "default" : "secondary"}>
                          {rule.isActive ? "Ativa" : "Pausada"}
                        </Badge>
                        <Switch
                          checked={Boolean(rule.isActive)}
                          onCheckedChange={() => handleToggleRule(rule.id, rule.isActive)}
                          disabled={toggleRuleMutation.isPending}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRule(rule.id)}
                          disabled={deleteRuleMutation.isPending}
                          className="hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">Gatilho</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          {getTriggerTypeLabel(rule.triggerType)} {getConditionLabel(rule.condition)} {rule.threshold}
                        </p>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {getActionIcon(rule.action)}
                          <span className="text-sm font-medium text-purple-900">Ação</span>
                        </div>
                        <p className="text-sm text-purple-700">
                          {getActionLabel(rule.action)}
                          {rule.actionValue && ` (${rule.actionValue}%)`}
                        </p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-900">Execuções</span>
                        </div>
                        <p className="text-sm text-green-700">{rule.executionCount} vezes</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">Última Execução</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {rule.lastExecuted ? new Date(rule.lastExecuted).toLocaleDateString('pt-BR') : 'Nunca'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper com controle de acesso por plano
function RegrasAutomatizadasWithPlanControl() {
  const { data: user } = useQuery({
    queryKey: ["/api/auth/me"],
    retry: false,
  });

  const userPlan = (user as any)?.planType || "gratuito";
  
  // Regras automatizadas requerem plano Premium ou superior
  if (userPlan === "gratuito") {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <PlanAccess 
              feature="Regras Automatizadas"
              requiredPlan="premium"
              description="As regras automatizadas permitem que você configure ações automáticas baseadas em métricas das suas campanhas. Disponível no plano Premium ou superior."
            >
              <RegrasAutomatizadasPage />
            </PlanAccess>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <RegrasAutomatizadasPage />
      </div>
    </div>
  );
}

export default RegrasAutomatizadasWithPlanControl;