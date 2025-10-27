import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/layout/sidebar";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  Globe, 
  Palette, 
  Database,
  Key,
  Monitor,
  Smartphone,
  Mail,
  Save,
  Edit,
  Trash2,
  Plus,
  Code,
  ExternalLink
} from "lucide-react";

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState("perfil");
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "João Silva",
    email: "joao@empresa.com", 
    telefone: "(11) 99999-9999",
    empresa: "Minha Empresa LTDA",
    bio: ""
  });

  const handleSaveProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso!"
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notificações atualizadas", 
      description: "Suas preferências de notificação foram salvas!"
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Segurança atualizada",
      description: "Configurações de segurança foram atualizadas!"
    });
  };

  const handleSaveIntegrations = () => {
    toast({
      title: "Integrações salvas",
      description: "Configurações de API atualizadas com sucesso!"
    });
  };

  const handleSaveSite = () => {
    toast({
      title: "Configurações do site salvas",
      description: "Configurações de domínio e site atualizadas!"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-xl">
              <Settings className="h-8 w-8 text-gray-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
              <p className="text-gray-600 mt-1">
                Gerencie sua conta, preferências e configurações do sistema
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
              <TabsTrigger value="perfil" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="seguranca" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Segurança
              </TabsTrigger>
              <TabsTrigger value="notificacoes" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notificações
              </TabsTrigger>
              <TabsTrigger value="plano" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Plano
              </TabsTrigger>
              <TabsTrigger value="integracao" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Integrações
              </TabsTrigger>
              <TabsTrigger value="site" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Site
              </TabsTrigger>
            </TabsList>

            {/* Perfil Tab */}
            <TabsContent value="perfil" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informações Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      JD
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline">Alterar Foto</Button>
                      <p className="text-sm text-gray-600">JPG, PNG ou GIF. Máximo 2MB.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input 
                        id="nome" 
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input 
                        id="telefone" 
                        value={formData.telefone}
                        onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="empresa">Empresa</Label>
                      <Input 
                        id="empresa" 
                        value={formData.empresa}
                        onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Conte um pouco sobre você..." 
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    />
                  </div>
                  
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Segurança Tab */}
            <TabsContent value="seguranca" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Segurança da Conta
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="senha-atual">Senha Atual</Label>
                      <Input id="senha-atual" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="nova-senha">Nova Senha</Label>
                      <Input id="nova-senha" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                      <Input id="confirmar-senha" type="password" />
                    </div>
                    <Button onClick={handleSaveSecurity}>Alterar Senha</Button>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">Autenticação de Dois Fatores</h4>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">2FA via SMS</p>
                        <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">Sessões Ativas</h4>
                    <div className="space-y-3">
                      {[
                        { device: "Chrome - Windows", location: "São Paulo, BR", time: "Agora" },
                        { device: "Safari - iPhone", location: "São Paulo, BR", time: "2 horas atrás" },
                        { device: "Firefox - macOS", location: "Rio de Janeiro, BR", time: "1 dia atrás" }
                      ].map((session, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Monitor className="h-5 w-5 text-gray-600" />
                            <div>
                              <p className="font-medium">{session.device}</p>
                              <p className="text-sm text-gray-600">{session.location} • {session.time}</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Sessão revogada",
                                description: "A sessão foi desconectada com sucesso"
                              });
                            }}
                          >
                            Revogar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notificações Tab */}
            <TabsContent value="notificacoes" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Preferências de Notificação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { title: "Novas vendas", desc: "Notificação quando uma venda for realizada", enabled: true },
                    { title: "Alertas de campanha", desc: "Alertas sobre performance de campanhas", enabled: true },
                    { title: "Relatórios semanais", desc: "Resumo semanal por e-mail", enabled: false },
                    { title: "Atualizações do sistema", desc: "Novidades e atualizações da plataforma", enabled: true },
                    { title: "Notificações push", desc: "Notificações no navegador", enabled: false }
                  ].map((notif, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{notif.title}</p>
                        <p className="text-sm text-gray-600">{notif.desc}</p>
                      </div>
                      <Switch 
                        defaultChecked={notif.enabled}
                        onCheckedChange={() => handleSaveNotifications()}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Plano Tab */}
            <TabsContent value="plano" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Plano Atual
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg text-white">
                    <div>
                      <h3 className="text-2xl font-bold">Monster Plan</h3>
                      <p className="opacity-90">Funcionalidades completas</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">R$ 497</p>
                      <p className="opacity-90">/mês</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-green-600">Ilimitado</p>
                      <p className="text-sm text-gray-600">Campanhas</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">Todas</p>
                      <p className="text-sm text-gray-600">Integrações</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">24/7</p>
                      <p className="text-sm text-gray-600">Suporte</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Redirecionando...",
                          description: "Você será direcionado para alterar o plano"
                        });
                      }}
                    >
                      Alterar Plano
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Histórico carregado",
                          description: "Visualizando histórico de pagamentos"
                        });
                      }}
                    >
                      Histórico de Pagamentos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Integrações Tab */}
            <TabsContent value="integracao" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    APIs e Integrações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: "Facebook Ads", status: "Conectado", icon: "📘" },
                      { name: "Google Ads", status: "Desconectado", icon: "🔍" },
                      { name: "Hotmart", status: "Conectado", icon: "🔥" },
                      { name: "Kiwify", status: "Conectado", icon: "🥝" }
                    ].map((integration, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{integration.icon}</span>
                          <div>
                            <p className="font-medium">{integration.name}</p>
                            <Badge variant={integration.status === "Conectado" ? "default" : "secondary"}>
                              {integration.status}
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            toast({
                              title: integration.status === "Conectado" ? "Configuração salva" : "Integração conectada",
                              description: `${integration.name} foi ${integration.status === "Conectado" ? "configurado" : "conectado"} com sucesso`
                            });
                          }}
                        >
                          {integration.status === "Conectado" ? "Configurar" : "Conectar"}
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">Chaves de API</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Key className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="font-medium">API Principal</p>
                            <p className="text-sm text-gray-600 font-mono">bd_***************8a3f</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Editando chave API",
                                description: "Modal de edição aberto"
                              });
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Chave API removida",
                                description: "A chave foi deletada com sucesso"
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => {
                        toast({
                          title: "Nova chave API",
                          description: "Gerando nova chave de acesso para API"
                        });
                      }}>
                        <Plus className="h-4 w-4 mr-2" />
                        Nova Chave API
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Site Tab */}
            <TabsContent value="site" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Configurações do Site
                  </CardTitle>
                  <CardDescription>
                    Configure a aparência e comportamento do seu site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Brand Settings */}
                  <div>
                    <h4 className="font-semibold mb-4">Identidade Visual</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="site-name">Nome do Site</Label>
                        <Input id="site-name" defaultValue="Bueiro Digital" />
                      </div>
                      <div>
                        <Label htmlFor="site-tagline">Slogan</Label>
                        <Input id="site-tagline" defaultValue="Sua plataforma de marketing digital" />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Label htmlFor="site-desc">Descrição</Label>
                      <Textarea 
                        id="site-desc" 
                        defaultValue="Plataforma completa para tracking de campanhas e análise de vendas"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Logo and Colors */}
                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">Logo e Cores</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Logo do Site</Label>
                        <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg">
                            <Globe className="w-8 h-8 text-white" />
                          </div>
                          <Button variant="outline" size="sm">Alterar Logo</Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Paleta de Cores</Label>
                        <div className="mt-2 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-500 rounded border"></div>
                            <span className="text-sm">Cor Principal</span>
                            <Input className="w-20 h-8 text-xs" defaultValue="#EF4444" />
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded border"></div>
                            <span className="text-sm">Cor Secundária</span>
                            <Input className="w-20 h-8 text-xs" defaultValue="#3B82F6" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SEO Settings */}
                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">SEO e Meta Tags</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="meta-title">Título SEO</Label>
                        <Input id="meta-title" defaultValue="Bueiro Digital - Plataforma de Marketing Digital" />
                      </div>
                      <div>
                        <Label htmlFor="meta-desc">Meta Descrição</Label>
                        <Textarea 
                          id="meta-desc" 
                          defaultValue="Plataforma completa para tracking de campanhas, análise de vendas e otimização de ROI. Integre suas ferramentas e monitore resultados em tempo real."
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="meta-keywords">Palavras-chave</Label>
                        <Input id="meta-keywords" defaultValue="marketing digital, tracking, campanhas, ROI, vendas" />
                      </div>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">Analytics e Tracking</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="google-analytics">Google Analytics ID</Label>
                        <Input id="google-analytics" placeholder="G-XXXXXXXXXX" />
                      </div>
                      <div>
                        <Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
                        <Input id="facebook-pixel" placeholder="123456789012345" />
                      </div>
                      <div>
                        <Label htmlFor="gtm">Google Tag Manager ID</Label>
                        <Input id="gtm" placeholder="GTM-XXXXXXX" />
                      </div>
                    </div>
                  </div>

                  {/* Custom Scripts */}
                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">Scripts Personalizados</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="header-scripts">Scripts no &lt;head&gt;</Label>
                        <Textarea 
                          id="header-scripts" 
                          placeholder="<!-- Scripts que devem ser carregados no head -->"
                          rows={4}
                          className="font-mono text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="footer-scripts">Scripts antes do &lt;/body&gt;</Label>
                        <Textarea 
                          id="footer-scripts" 
                          placeholder="<!-- Scripts que devem ser carregados no final da página -->"
                          rows={4}
                          className="font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Advanced Settings */}
                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">Configurações Avançadas</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Modo de Manutenção</p>
                          <p className="text-sm text-gray-600">Exibir página de manutenção para visitantes</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Cache de Páginas</p>
                          <p className="text-sm text-gray-600">Habilitar cache para melhor performance</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">HTTPS Obrigatório</p>
                          <p className="text-sm text-gray-600">Redirecionar HTTP para HTTPS</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Configurações
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visualizar Site
                    </Button>
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