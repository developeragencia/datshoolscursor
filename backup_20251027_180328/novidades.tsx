import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  Star, 
  TrendingUp, 
  Zap,
  ChevronRight,
  Filter,
  Search,
  Bell,
  ExternalLink,
  Tag,
  Users,
  MessageCircle,
  ThumbsUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const updates = [
  {
    id: "update-1",
    title: "Nova Integração com TikTok Ads Manager",
    description: "Agora você pode conectar e monitorar suas campanhas do TikTok diretamente no dashboard do Bueiro Digital.",
    category: "Integração",
    type: "feature",
    date: "2025-01-27",
    version: "v2.8.0",
    status: "new",
    impact: "high",
    likes: 234,
    comments: 45,
    details: [
      "Sincronização automática de campanhas",
      "Métricas em tempo real",
      "Relatórios detalhados de performance",
      "Configuração simplificada em 3 passos"
    ]
  },
  {
    id: "update-2", 
    title: "Dashboard Multi-Visualização",
    description: "Crie múltiplos dashboards personalizados para diferentes projetos e clientes.",
    category: "Dashboard",
    type: "feature",
    date: "2025-01-25",
    version: "v2.7.5",
    status: "featured",
    impact: "high",
    likes: 189,
    comments: 32,
    details: [
      "Dashboards ilimitados (planos pagos)",
      "Templates pré-configurados",
      "Compartilhamento público/privado",
      "Widgets personalizáveis"
    ]
  },
  {
    id: "update-3",
    title: "Melhorias na API de Webhooks",
    description: "Performance aprimorada e novos endpoints para integração mais robusta com plataformas externas.",
    category: "API",
    type: "improvement",
    date: "2025-01-22",
    version: "v2.7.2",
    status: "stable",
    impact: "medium",
    likes: 98,
    comments: 18,
    details: [
      "Redução de 40% no tempo de resposta",
      "Novos endpoints de validação",
      "Logs melhorados para debug",
      "Rate limiting inteligente"
    ]
  },
  {
    id: "update-4",
    title: "Correção de Bug: Filtros de Relatório",
    description: "Resolvido problema que causava travamento ao aplicar múltiplos filtros nos relatórios de vendas.",
    category: "Bug Fix",
    type: "bugfix",
    date: "2025-01-20",
    version: "v2.7.1",
    status: "fixed",
    impact: "medium",
    likes: 67,
    comments: 12,
    details: [
      "Filtros agora funcionam corretamente",
      "Performance otimizada",
      "Interface mais responsiva",
      "Correção na exportação CSV"
    ]
  },
  {
    id: "update-5",
    title: "Sistema de Alertas Inteligentes",
    description: "Configure alertas automáticos baseados em métricas e seja notificado quando metas forem atingidas.",
    category: "Automação",
    type: "feature",
    date: "2025-01-18",
    version: "v2.7.0",
    status: "stable",
    impact: "high",
    likes: 156,
    comments: 28,
    details: [
      "Alertas por email e webhook",
      "Condições personalizáveis",
      "Histórico de alertas",
      "Integração com Slack/Discord"
    ]
  },
  {
    id: "update-6",
    title: "Nova Interface Mobile",
    description: "Aplicativo mobile reformulado com design moderno e funcionalidades completas.",
    category: "Mobile",
    type: "feature",
    date: "2025-01-15",
    version: "v2.6.0",
    status: "stable",
    impact: "high",
    likes: 312,
    comments: 67,
    details: [
      "Design responsivo aprimorado",
      "Navegação otimizada",
      "Push notifications",
      "Modo offline"
    ]
  }
];

const categories = ["Todos", "Integração", "Dashboard", "API", "Bug Fix", "Automação", "Mobile"];
const types = ["feature", "improvement", "bugfix"];

export default function NovidadesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredUpdates = updates.filter(update => {
    const matchesCategory = selectedCategory === "Todos" || update.category === selectedCategory;
    const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (updateId: string) => {
    toast({
      title: "Obrigado pelo feedback!",
      description: "Sua opinião nos ajuda a melhorar"
    });
  };

  const handleComment = (updateId: string) => {
    toast({
      title: "Redirecionando...",
      description: "Abrindo seção de comentários"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-green-100 text-green-800";
      case "featured": return "bg-blue-100 text-blue-800";
      case "stable": return "bg-gray-100 text-gray-800";
      case "fixed": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feature": return <Sparkles className="h-4 w-4" />;
      case "improvement": return <TrendingUp className="h-4 w-4" />;
      case "bugfix": return <Zap className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600"; 
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Sparkles className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Novidades</h1>
                <p className="text-gray-600 mt-1">
                  Acompanhe as últimas atualizações, melhorias e correções da plataforma
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notificações
              </Button>
              <Button variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                Roadmap
              </Button>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Filters */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                
                <div className="relative w-full lg:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar novidades..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="shadow-lg border-0">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">Este Mês</div>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-gray-600">Novas Features</div>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">15</div>
                <div className="text-sm text-gray-600">Melhorias</div>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">7</div>
                <div className="text-sm text-gray-600">Bugs Corrigidos</div>
              </CardContent>
            </Card>
          </div>

          {/* Updates List */}
          <div className="space-y-4">
            {filteredUpdates.map((update) => (
              <Card key={update.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(update.type)}
                          <h3 className="text-xl font-semibold text-gray-900">{update.title}</h3>
                        </div>
                        <Badge className={getStatusColor(update.status)}>
                          {update.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {update.version}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{update.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Principais melhorias:</h4>
                          <ul className="space-y-1">
                            {update.details.map((detail, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">
                              {new Date(update.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Tag className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{update.category}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <TrendingUp className="h-4 w-4 text-gray-400" />
                            <span className={`${getImpactColor(update.impact)} font-medium`}>
                              Impacto {update.impact}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleLike(update.id)}
                          className="flex items-center gap-2"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          {update.likes}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleComment(update.id)}
                          className="flex items-center gap-2"
                        >
                          <MessageCircle className="h-4 w-4" />
                          {update.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          Ver Detalhes
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-2">Mantenha-se Atualizado</h3>
              <p className="text-blue-100 mb-6">
                Receba notificações sobre novas funcionalidades e atualizações importantes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button variant="secondary" size="lg">
                  <Bell className="h-4 w-4 mr-2" />
                  Ativar Notificações
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver Roadmap
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}