import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  Database, 
  Key, 
  Copy, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle, 
  XCircle,
  Code,
  Globe,
  Shield,
  Zap,
  Activity,
  Clock,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ApisPage() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Chave API copiada para a área de transferência.",
    });
  };

  const apiKeys = [
    {
      id: "1",
      name: "Chave Principal",
      key: "bd_live_sk_1a2b3c4d5e6f7g8h9i0j",
      created: "15 Jan 2025",
      lastUsed: "Há 2 horas",
      status: "active",
      permissions: ["read", "write", "delete"]
    },
    {
      id: "2", 
      name: "Chave Dashboard",
      key: "bd_live_sk_9z8y7x6w5v4u3t2s1r0q",
      created: "10 Jan 2025",
      lastUsed: "Há 1 dia",
      status: "active",
      permissions: ["read"]
    },
    {
      id: "3",
      name: "Chave Teste",
      key: "bd_test_sk_abcdef123456789ghijk",
      created: "5 Jan 2025", 
      lastUsed: "Nunca",
      status: "inactive",
      permissions: ["read", "write"]
    }
  ];

  const endpoints = [
    {
      method: "GET",
      path: "/api/campaigns",
      description: "Listar todas as campanhas",
      auth: "required"
    },
    {
      method: "POST",
      path: "/api/campaigns",
      description: "Criar nova campanha",
      auth: "required"
    },
    {
      method: "GET",
      path: "/api/campaigns/{id}",
      description: "Obter detalhes de uma campanha",
      auth: "required"
    },
    {
      method: "PUT",
      path: "/api/campaigns/{id}",
      description: "Atualizar campanha",
      auth: "required"
    },
    {
      method: "DELETE",
      path: "/api/campaigns/{id}",
      description: "Deletar campanha",
      auth: "required"
    },
    {
      method: "GET",
      path: "/api/sales",
      description: "Listar vendas",
      auth: "required"
    },
    {
      method: "POST",
      path: "/api/sales",
      description: "Registrar nova venda",
      auth: "required"
    },
    {
      method: "GET",
      path: "/api/analytics",
      description: "Obter dados de analytics",
      auth: "required"
    },
    {
      method: "GET",
      path: "/api/webhooks",
      description: "Listar webhooks",
      auth: "required"
    },
    {
      method: "POST",
      path: "/api/webhooks",
      description: "Criar webhook",
      auth: "required"
    }
  ];

  const webhookEvents = [
    { event: "sale.created", description: "Nova venda realizada" },
    { event: "sale.updated", description: "Venda atualizada" },
    { event: "campaign.started", description: "Campanha iniciada" },
    { event: "campaign.stopped", description: "Campanha pausada" },
    { event: "lead.created", description: "Novo lead capturado" },
    { event: "conversion.tracked", description: "Conversão rastreada" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Database className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">APIs e Integrações</h1>
              <p className="text-gray-600 mt-1">
                Gerencie chaves de API, endpoints e webhooks
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <Tabs defaultValue="keys" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="keys" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                Chaves API
              </TabsTrigger>
              <TabsTrigger value="endpoints" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Endpoints
              </TabsTrigger>
              <TabsTrigger value="webhooks" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Webhooks
              </TabsTrigger>
              <TabsTrigger value="docs" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Documentação
              </TabsTrigger>
            </TabsList>

            {/* API Keys Tab */}
            <TabsContent value="keys" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Chaves de API</h2>
                  <p className="text-gray-600">Gerencie suas chaves de acesso à API</p>
                </div>
                <Button onClick={() => {
                  toast({
                    title: "Criando nova chave API",
                    description: "Gerando chave de acesso com permissões definidas"
                  });
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Chave
                </Button>
              </div>

              <div className="grid gap-6">
                {apiKeys.map((apiKey) => (
                  <Card key={apiKey.id} className="shadow-lg border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Key className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{apiKey.name}</h3>
                            <p className="text-sm text-gray-600">Criada em {apiKey.created}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                            {apiKey.status === 'active' ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Ativa
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3 mr-1" />
                                Inativa
                              </>
                            )}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">Chave da API</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              type={showKeys[apiKey.id] ? "text" : "password"}
                              value={apiKey.key}
                              readOnly
                              className="font-mono"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleKeyVisibility(apiKey.id)}
                            >
                              {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(apiKey.key)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Último Uso</Label>
                            <p className="text-sm text-gray-600 mt-1">{apiKey.lastUsed}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Permissões</Label>
                            <div className="flex gap-1 mt-1">
                              {apiKey.permissions.map((perm) => (
                                <Badge key={perm} variant="outline" className="text-xs">
                                  {perm}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Revogar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Endpoints Tab */}
            <TabsContent value="endpoints" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Endpoints da API</h2>
                <p className="text-gray-600">Explore todos os endpoints disponíveis</p>
              </div>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Base URL</CardTitle>
                  <CardDescription>
                    Todas as requisições devem usar esta URL base
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Input
                      value="https://api.bueirodigital.com.br/v1"
                      readOnly
                      className="font-mono"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard("https://api.bueirodigital.com.br/v1")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Endpoints Disponíveis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {endpoints.map((endpoint, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Badge 
                            variant={endpoint.method === 'GET' ? 'secondary' : 
                                   endpoint.method === 'POST' ? 'default' :
                                   endpoint.method === 'PUT' ? 'outline' : 'destructive'}
                            className="font-mono"
                          >
                            {endpoint.method}
                          </Badge>
                          <div>
                            <p className="font-mono text-sm">{endpoint.path}</p>
                            <p className="text-sm text-gray-600">{endpoint.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {endpoint.auth === 'required' && (
                            <Badge variant="outline" className="text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              Auth Required
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Webhooks Tab */}
            <TabsContent value="webhooks" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Webhooks</h2>
                  <p className="text-gray-600">Configure webhooks para receber eventos em tempo real</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Webhook
                </Button>
              </div>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Webhooks Configurados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { 
                        url: "https://minhaapi.com/webhook/vendas", 
                        events: ["sale.created", "sale.updated"], 
                        status: "active",
                        lastTriggered: "Há 5 minutos"
                      },
                      { 
                        url: "https://automation.com/bueiro", 
                        events: ["lead.created"], 
                        status: "active",
                        lastTriggered: "Há 2 horas"
                      },
                      { 
                        url: "https://analytics.app/hooks", 
                        events: ["conversion.tracked"], 
                        status: "error",
                        lastTriggered: "Há 1 dia"
                      }
                    ].map((webhook, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Zap className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-mono text-sm">{webhook.url}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={webhook.status === 'active' ? 'default' : 'destructive'}>
                                {webhook.status === 'active' ? (
                                  <>
                                    <Activity className="h-3 w-3 mr-1" />
                                    Ativo
                                  </>
                                ) : (
                                  <>
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Erro
                                  </>
                                )}
                              </Badge>
                              <span className="text-xs text-gray-600">
                                <Clock className="h-3 w-3 inline mr-1" />
                                {webhook.lastTriggered}
                              </span>
                            </div>
                            <div className="flex gap-1 mt-2">
                              {webhook.events.map((event) => (
                                <Badge key={event} variant="outline" className="text-xs">
                                  {event}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remover
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Eventos Disponíveis</CardTitle>
                  <CardDescription>
                    Lista de eventos que podem ser enviados via webhook
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {webhookEvents.map((event, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-blue-100 rounded">
                          <Code className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-mono text-sm font-medium">{event.event}</p>
                          <p className="text-xs text-gray-600">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documentation Tab */}
            <TabsContent value="docs" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Documentação</h2>
                <p className="text-gray-600">Guias e exemplos para integração</p>
              </div>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Autenticação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Todas as requisições devem incluir sua chave API no header Authorization:
                  </p>
                  <div className="bg-gray-900 text-white p-4 rounded-lg">
                    <code className="text-sm">
                      Authorization: Bearer bd_live_sk_your_api_key_here
                    </code>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Exemplo de Requisição</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Listar campanhas:</p>
                  <div className="bg-gray-900 text-white p-4 rounded-lg">
                    <pre className="text-sm">
{`curl -X GET \\
  https://api.bueirodigital.com.br/v1/campaigns \\
  -H "Authorization: Bearer bd_live_sk_your_api_key" \\
  -H "Content-Type: application/json"`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Exemplo de Resposta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-900 text-white p-4 rounded-lg">
                    <pre className="text-sm">
{`{
  "data": [
    {
      "id": "camp_123456789",
      "name": "Campanha Verão 2025",
      "status": "active",
      "budget": 5000.00,
      "spent": 1250.50,
      "conversions": 42,
      "created_at": "2025-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "per_page": 10
  }
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Rate Limits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Plano Gratuito</span>
                      <span className="text-sm text-gray-600">100 req/hora</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Plano Premium</span>
                      <span className="text-sm text-gray-600">1.000 req/hora</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Plano Avançado</span>
                      <span className="text-sm text-gray-600">5.000 req/hora</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Plano Monster</span>
                      <span className="text-sm text-gray-600">Ilimitado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}