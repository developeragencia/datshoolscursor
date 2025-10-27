import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/layout/sidebar";
import { useToast } from "@/hooks/use-toast";
import { IntegrationModal } from "@/components/ui/integration-modal";
import { 
  Zap,
  Search,
  CheckCircle,
  ExternalLink,
  Plus
} from "lucide-react";

export default function IntegrationsPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);

  // Buscar integrações reais do backend - REMOVIDO todos os dados mockados
  const { data: integrations = [], isLoading } = useQuery({
    queryKey: ["/api/integrations"],
  });

  const handleConnect = (integration: any) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  const handleDisconnect = (integrationId: string) => {
    toast({
      title: "Desconectando integração...",
      description: "Removendo conexão com a plataforma"
    });
  };

  const suggestNewPlatform = () => {
    toast({
      title: "Sugerir nova plataforma",
      description: "Entre em contato via WhatsApp para solicitar nova integração"
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="text-center py-12">Carregando integrações...</div>
        </div>
      </div>
    );
  }

  const filteredIntegrations = integrations.filter((integration: any) => {
    const matchesSearch = integration.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", label: "Todas as Categorias" },
    { id: "infoproducts", label: "Infoprodutos" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "payments", label: "Pagamentos" },
    { id: "analytics", label: "Analytics" }
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Integrações</h1>
              <p className="text-gray-600 mt-1">
                Conecte suas plataformas favoritas e centralize tudo em um só lugar
              </p>
            </div>
            <Button onClick={suggestNewPlatform} className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Sugerir Plataforma
            </Button>
          </div>

          {/* Filtros */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar integrações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap lg:flex-nowrap">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Lista de Integrações - Estado Vazio quando não há dados reais */}
          {filteredIntegrations.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma integração encontrada</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? "Tente ajustar os filtros de busca" : "Configure suas primeiras integrações"}
                </p>
                <Button onClick={suggestNewPlatform} className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Sugerir Nova Plataforma
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration: any) => (
                <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Zap className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <CardDescription className="text-sm">{integration.category}</CardDescription>
                        </div>
                      </div>
                      {integration.isConnected && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Conectado
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                    <div className="flex items-center justify-between">
                      {integration.isConnected ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDisconnect(integration.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Desconectar
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleConnect(integration)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Conectar
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Integração */}
      <IntegrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        integration={selectedIntegration}
      />
    </div>
  );
}