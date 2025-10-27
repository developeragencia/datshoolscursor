import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  Settings, 
  Palette,
  Layout,
  Monitor,
  Eye,
  Save,
  RotateCcw,
  Grid,
  Columns,
  Square,
  BarChart3,
  TrendingUp,
  DollarSign,
  Target,
  Users,
  Zap,
  Plus,
  Trash2,
  Move,
  Menu,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const availableWidgets = [
  { id: "revenue", title: "Receita Total", icon: DollarSign, color: "blue" },
  { id: "conversions", title: "Conversões", icon: Target, color: "green" },
  { id: "visitors", title: "Visitantes", icon: Users, color: "purple" },
  { id: "roi", title: "ROI", icon: TrendingUp, color: "orange" },
  { id: "campaigns", title: "Campanhas Ativas", icon: Zap, color: "red" },
  { id: "sales", title: "Vendas Hoje", icon: DollarSign, color: "emerald" },
  { id: "leads", title: "Leads", icon: Users, color: "indigo" },
  { id: "ctr", title: "Taxa de Cliques", icon: BarChart3, color: "pink" }
];

const themes = [
  { id: "light", name: "Claro", preview: "bg-white" },
  { id: "dark", name: "Escuro", preview: "bg-gray-900" },
  { id: "blue", name: "Azul", preview: "bg-blue-600" },
  { id: "green", name: "Verde", preview: "bg-green-600" }
];

const layouts = [
  { id: "grid-4", name: "4 Colunas", icon: Grid, description: "Layout padrão com 4 colunas" },
  { id: "grid-3", name: "3 Colunas", icon: Columns, description: "Layout compacto com 3 colunas" },
  { id: "grid-2", name: "2 Colunas", icon: Square, description: "Layout amplo com 2 colunas" },
  { id: "single", name: "Coluna Única", icon: Monitor, description: "Layout vertical em coluna única" }
];

export default function PersonalizarDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [dashboardConfig, setDashboardConfig] = useState({
    name: "Dashboard Principal",
    theme: "light",
    layout: "grid-4",
    autoRefresh: true,
    refreshInterval: 30,
    showAnimations: true,
    widgets: ["revenue", "conversions", "visitors", "roi"]
  });

  const updateConfig = (key: string, value: any) => {
    setDashboardConfig(prev => ({ ...prev, [key]: value }));
  };

  const addWidget = (widgetId: string) => {
    if (!dashboardConfig.widgets.includes(widgetId)) {
      updateConfig("widgets", [...dashboardConfig.widgets, widgetId]);
      toast({
        title: "Widget adicionado!",
        description: `Widget ${availableWidgets.find(w => w.id === widgetId)?.title} foi adicionado ao dashboard`
      });
    }
  };

  const removeWidget = (widgetId: string) => {
    updateConfig("widgets", dashboardConfig.widgets.filter(id => id !== widgetId));
    toast({
      title: "Widget removido",
      description: "Widget foi removido do dashboard"
    });
  };

  const saveConfiguration = () => {
    toast({
      title: "Configuração salva!",
      description: "Suas personalizações foram aplicadas com sucesso"
    });
    
    setTimeout(() => {
      setLocation("/dashboard");
    }, 1500);
  };

  const resetToDefault = () => {
    setDashboardConfig({
      name: "Dashboard Principal",
      theme: "light",
      layout: "grid-4",
      autoRefresh: true,
      refreshInterval: 30,
      showAnimations: true,
      widgets: ["revenue", "conversions", "visitors", "roi"]
    });
    
    toast({
      title: "Configuração resetada",
      description: "Dashboard voltou às configurações padrão"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold">Menu</h2>
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

      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-100 px-4 sm:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Botão do menu mobile */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div className="p-2 sm:p-3 bg-purple-100 rounded-xl">
                  <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Personalizar Dashboard</h1>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">Configure a aparência e widgets do seu dashboard</p>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <Button variant="outline" onClick={resetToDefault} size="sm">
                  <RotateCcw className="h-4 w-4 sm:mr-2" />
                  <span>Resetar</span>
                </Button>
                <Button onClick={saveConfiguration} size="sm">
                  <Save className="h-4 w-4 sm:mr-2" />
                  <span>Salvar</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
            {/* Preview Section */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  Pré-visualização
                </CardTitle>
                <CardDescription>Veja como seu dashboard ficará com as configurações atuais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`rounded-lg border-2 border-dashed border-gray-300 p-6 ${dashboardConfig.theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                  <div className={`grid ${
                    dashboardConfig.layout === 'grid-4' ? 'grid-cols-4' :
                    dashboardConfig.layout === 'grid-3' ? 'grid-cols-3' :
                    dashboardConfig.layout === 'grid-2' ? 'grid-cols-2' : 'grid-cols-1'
                  } gap-4`}>
                    {dashboardConfig.widgets.map((widgetId) => {
                      const widget = availableWidgets.find(w => w.id === widgetId);
                      if (!widget) return null;
                      
                      return (
                        <div key={widgetId} className={`p-4 rounded-lg shadow-sm ${dashboardConfig.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <widget.icon className={`h-4 w-4 text-${widget.color}-600`} />
                            <span className="text-sm font-medium">{widget.title}</span>
                          </div>
                          <div className="text-2xl font-bold">0</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Basic Settings */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-600" />
                    Configurações Gerais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="dashboard-name">Nome do Dashboard</Label>
                    <Input 
                      id="dashboard-name"
                      value={dashboardConfig.name}
                      onChange={(e) => updateConfig("name", e.target.value)}
                      placeholder="Nome do seu dashboard"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Atualização Automática</Label>
                      <p className="text-sm text-gray-600">Atualizar dados automaticamente</p>
                    </div>
                    <Switch 
                      checked={dashboardConfig.autoRefresh}
                      onCheckedChange={(checked) => updateConfig("autoRefresh", checked)}
                    />
                  </div>

                  {dashboardConfig.autoRefresh && (
                    <div>
                      <Label htmlFor="refresh-interval">Intervalo de Atualização (segundos)</Label>
                      <Select value={dashboardConfig.refreshInterval.toString()} onValueChange={(value) => updateConfig("refreshInterval", parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 segundos</SelectItem>
                          <SelectItem value="30">30 segundos</SelectItem>
                          <SelectItem value="60">1 minuto</SelectItem>
                          <SelectItem value="300">5 minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Animações</Label>
                      <p className="text-sm text-gray-600">Habilitar animações visuais</p>
                    </div>
                    <Switch 
                      checked={dashboardConfig.showAnimations}
                      onCheckedChange={(checked) => updateConfig("showAnimations", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Theme Settings */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-purple-600" />
                    Tema e Aparência
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Tema</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            dashboardConfig.theme === theme.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => updateConfig("theme", theme.id)}
                        >
                          <div className={`w-full h-8 rounded mb-2 ${theme.preview}`}></div>
                          <span className="text-sm font-medium">{theme.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Layout Settings */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="h-5 w-5 text-green-600" />
                    Layout
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {layouts.map((layout) => (
                    <div
                      key={layout.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        dashboardConfig.layout === layout.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => updateConfig("layout", layout.id)}
                    >
                      <div className="flex items-center gap-3">
                        <layout.icon className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium">{layout.name}</div>
                          <div className="text-sm text-gray-600">{layout.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Widget Management */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Grid className="h-5 w-5 text-orange-600" />
                    Gerenciar Widgets
                  </CardTitle>
                  <CardDescription>Adicione ou remova widgets do seu dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Active Widgets */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Widgets Ativos</Label>
                    <div className="space-y-2">
                      {dashboardConfig.widgets.map((widgetId) => {
                        const widget = availableWidgets.find(w => w.id === widgetId);
                        if (!widget) return null;
                        
                        return (
                          <div key={widgetId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <widget.icon className={`h-4 w-4 text-${widget.color}-600`} />
                              <span className="text-sm font-medium">{widget.title}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeWidget(widgetId)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Available Widgets */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Widgets Disponíveis</Label>
                    <div className="space-y-2">
                      {availableWidgets
                        .filter(widget => !dashboardConfig.widgets.includes(widget.id))
                        .map((widget) => (
                          <div key={widget.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <widget.icon className={`h-4 w-4 text-${widget.color}-600`} />
                              <span className="text-sm font-medium">{widget.title}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => addWidget(widget.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setLocation("/dashboard")} size="lg">
                Cancelar
              </Button>
              <Button onClick={saveConfiguration} size="lg">
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}