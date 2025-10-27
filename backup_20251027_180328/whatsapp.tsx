import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/layout/sidebar";
import { 
  MessageCircle, 
  Users, 
  Send, 
  Bot, 
  Settings, 
  Clock,
  CheckCircle,
  Eye,
  BarChart3,
  Phone,
  Calendar,
  Zap,
  Copy,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WhatsAppPage() {
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(true);
  const [businessHours, setBusinessHours] = useState(true);
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Texto copiado para a área de transferência.",
    });
  };

  const whatsappMetrics = [
    { label: "Mensagens Enviadas", value: "2.847", change: "+18%", color: "green" },
    { label: "Taxa de Entrega", value: "98.2%", change: "+1.2%", color: "blue" },
    { label: "Taxa de Leitura", value: "87.5%", change: "+5.3%", color: "purple" },
    { label: "Conversões", value: "234", change: "+23%", color: "orange" }
  ];

  const automationRules = [
    {
      id: "rule_1",
      name: "Boas-vindas Automáticas",
      trigger: "Primeira mensagem",
      response: "Olá! 👋 Obrigado por entrar em contato. Como posso ajudá-lo hoje?",
      status: "active",
      lastTriggered: "Há 15 min"
    },
    {
      id: "rule_2",
      name: "Horário Comercial",
      trigger: "Fora do horário",
      response: "Obrigado pela mensagem! Nosso atendimento funciona de segunda à sexta, das 9h às 18h. Responderemos em breve! 🕐",
      status: "active",
      lastTriggered: "Há 2 horas"
    },
    {
      id: "rule_3",
      name: "Interesse em Produto",
      trigger: "Palavras-chave: preço, comprar, produto",
      response: "Vejo que você tem interesse em nossos produtos! 🛍️ Vou transferir você para nossa equipe de vendas.",
      status: "active",
      lastTriggered: "Há 1 hora"
    },
    {
      id: "rule_4",
      name: "Suporte Técnico",
      trigger: "Palavras-chave: problema, erro, bug",
      response: "Entendo que você está com alguma dificuldade. 🔧 Nossa equipe técnica irá ajudá-lo em breve!",
      status: "inactive",
      lastTriggered: "Há 1 dia"
    }
  ];

  const recentMessages = [
    {
      id: "msg_1",
      contact: "+55 11 99999-8888",
      name: "João Silva",
      message: "Olá, gostaria de saber mais sobre os planos",
      timestamp: "Há 5 min",
      status: "delivered",
      type: "incoming"
    },
    {
      id: "msg_2",
      contact: "+55 21 88888-7777",
      name: "Maria Santos",
      message: "Obrigado pela mensagem! Nosso atendimento...",
      timestamp: "Há 10 min",
      status: "read",
      type: "outgoing"
    },
    {
      id: "msg_3",
      contact: "+55 11 77777-6666",
      name: "Carlos Oliveira",
      message: "Qual o preço do plano Monster?",
      timestamp: "Há 15 min",
      status: "delivered",
      type: "incoming"
    },
    {
      id: "msg_4",
      contact: "+55 85 66666-5555",
      name: "Ana Costa",
      message: "Vejo que você tem interesse em nossos produtos! 🛍️",
      timestamp: "Há 25 min",
      status: "read",
      type: "outgoing"
    }
  ];

  const quickMessages = [
    {
      title: "Informações sobre Planos",
      message: "Olá! 👋 Temos 4 planos disponíveis:\n\n💚 Gratuito - R$ 0/mês\n💙 Premium - R$ 97/mês\n💜 Avançado - R$ 197/mês\n🔥 Monster - R$ 497/mês\n\nQual desperta seu interesse?"
    },
    {
      title: "Suporte Técnico",
      message: "Olá! 🔧 Nossa equipe técnica está aqui para ajudar.\n\nPor favor, descreva o problema que está enfrentando e responderemos o mais rápido possível!"
    },
    {
      title: "Demonstração",
      message: "Que ótimo! 🎉 Adoraríamos mostrar nossa plataforma para você.\n\nPodemos agendar uma demonstração gratuita de 30 minutos. Qual horário funciona melhor?"
    },
    {
      title: "Agradecimento",
      message: "Muito obrigado pelo seu interesse! 🙏\n\nFicamos felizes em ter você como cliente. Se precisar de algo, estamos sempre aqui para ajudar!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">WhatsApp Business</h1>
                <p className="text-gray-600 mt-1">
                  Gerencie conversas e automações do WhatsApp
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Relatórios
              </Button>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Nova Mensagem
              </Button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <Tabs defaultValue="dashboard" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Mensagens
              </TabsTrigger>
              <TabsTrigger value="automation" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                Automação
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <Copy className="h-4 w-4" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configurações
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {whatsappMetrics.map((metric, index) => (
                  <Card key={index} className="shadow-lg border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                        </div>
                        <div className={`p-3 bg-${metric.color}-100 rounded-xl`}>
                          {index === 0 && <Send className={`h-8 w-8 text-${metric.color}-600`} />}
                          {index === 1 && <CheckCircle className={`h-8 w-8 text-${metric.color}-600`} />}
                          {index === 2 && <Eye className={`h-8 w-8 text-${metric.color}-600`} />}
                          {index === 3 && <Users className={`h-8 w-8 text-${metric.color}-600`} />}
                        </div>
                      </div>
                      <div className="flex items-center mt-3">
                        <span className="text-xs text-green-600">{metric.change} vs mês anterior</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Connection Status */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Status da Conexão
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-semibold text-green-900">WhatsApp Conectado</p>
                        <p className="text-sm text-green-700">Dispositivo: +55 11 99999-0000</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Online
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Mensagens Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMessages.map((message) => (
                      <div key={message.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            message.type === 'incoming' ? 'bg-blue-100' : 'bg-green-100'
                          }`}>
                            <MessageCircle className={`h-5 w-5 ${
                              message.type === 'incoming' ? 'text-blue-600' : 'text-green-600'
                            }`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{message.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {message.type === 'incoming' ? 'Recebida' : 'Enviada'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 max-w-md truncate">{message.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{message.contact} • {message.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={message.status === 'read' ? 'default' : 'secondary'}>
                            {message.status === 'read' ? 'Lida' : 'Entregue'}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Automation Tab */}
            <TabsContent value="automation" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Regras de Automação</h2>
                  <p className="text-gray-600">Configure respostas automáticas</p>
                </div>
                <Button onClick={() => {
                  toast({
                    title: "Nova regra de automação",
                    description: "Configurando resposta automática do WhatsApp"
                  });
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Regra
                </Button>
              </div>

              <div className="grid gap-6">
                {automationRules.map((rule) => (
                  <Card key={rule.id} className="shadow-lg border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Bot className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                            <p className="text-sm text-gray-600">Gatilho: {rule.trigger}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                            {rule.status === 'active' ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">Resposta Automática</Label>
                          <Textarea
                            value={rule.response}
                            readOnly
                            className="mt-1 text-sm"
                            rows={3}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">
                            Último disparo: {rule.lastTriggered}
                          </p>
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Mensagens Rápidas</h2>
                  <p className="text-gray-600">Templates para agilizar o atendimento</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Template
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickMessages.map((template, index) => (
                  <Card key={index} className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={template.message}
                        readOnly
                        rows={6}
                        className="text-sm mb-4"
                      />
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(template.message)}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copiar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="h-4 w-4 mr-1" />
                          Usar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Configurações Gerais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Respostas Automáticas</Label>
                      <p className="text-sm text-gray-600">Ativar respostas automáticas para mensagens</p>
                    </div>
                    <Switch 
                      checked={autoReplyEnabled}
                      onCheckedChange={setAutoReplyEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Horário Comercial</Label>
                      <p className="text-sm text-gray-600">Resposta automática fora do horário</p>
                    </div>
                    <Switch 
                      checked={businessHours}
                      onCheckedChange={setBusinessHours}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Horário de Início</Label>
                      <Input type="time" defaultValue="09:00" className="mt-1" />
                    </div>
                    <div>
                      <Label>Horário de Fim</Label>
                      <Input type="time" defaultValue="18:00" className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label>Mensagem de Ausência</Label>
                    <Textarea
                      placeholder="Digite a mensagem para horário de ausência..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Webhook URL</Label>
                    <Input
                      placeholder="https://sua-api.com/webhook/whatsapp"
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      URL para receber notificações de mensagens
                    </p>
                  </div>

                  <Button>
                    Salvar Configurações
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Conexão do Dispositivo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2">Status: Conectado</h4>
                      <p className="text-sm text-green-700 mb-3">
                        Dispositivo conectado: +55 11 99999-0000
                      </p>
                      <Button variant="outline" size="sm" className="text-green-700">
                        <Zap className="h-4 w-4 mr-1" />
                        Desconectar
                      </Button>
                    </div>
                    
                    <div className="text-center py-6">
                      <p className="text-sm text-gray-600 mb-4">
                        Para conectar um novo dispositivo, escaneie o QR Code com o WhatsApp
                      </p>
                      <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <p className="text-gray-500 text-sm">QR Code aparecerá aqui</p>
                      </div>
                      <Button variant="outline">
                        Gerar Novo QR Code
                      </Button>
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