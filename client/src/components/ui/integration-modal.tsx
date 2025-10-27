import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, ExternalLink, Shield, Key, Globe } from "lucide-react";

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  integration: {
    id: string;
    name: string;
    description: string;
    logo: string;
    category: string;
    isConnected: boolean;
    setupDifficulty: string;
    features: string[];
  } | null;
}

export function IntegrationModal({ isOpen, onClose, integration }: IntegrationModalProps) {
  const [credentials, setCredentials] = useState({
    apiKey: "",
    apiSecret: "",
    webhookUrl: "",
    accessToken: "",
    customField1: "",
    customField2: "",
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const connectMutation = useMutation({
    mutationFn: async (data: typeof credentials) => {
      return apiRequest(`/api/integrations/${integration?.id}/connect`, "POST", {
        platform: integration?.id,
        credentials: data,
      });
    },
    onSuccess: () => {
      toast({
        title: "Integração conectada!",
        description: `${integration?.name} foi conectado com sucesso.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/integrations"] });
      onClose();
      setCredentials({
        apiKey: "",
        apiSecret: "",
        webhookUrl: "",
        accessToken: "",
        customField1: "",
        customField2: "",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro na conexão",
        description: error.message || "Não foi possível conectar a integração.",
        variant: "destructive",
      });
    },
  });

  const disconnectMutation = useMutation({
    mutationFn: async () => {
      return apiRequest(`/api/integrations/${integration?.id}/disconnect`, "DELETE");
    },
    onSuccess: () => {
      toast({
        title: "Integração desconectada",
        description: `${integration?.name} foi desconectado com sucesso.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/integrations"] });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao desconectar",
        description: error.message || "Não foi possível desconectar a integração.",
        variant: "destructive",
      });
    },
  });

  const handleConnect = () => {
    if (!integration) return;
    
    if (!credentials.apiKey && !credentials.accessToken) {
      toast({
        title: "Credenciais obrigatórias",
        description: "Por favor, preencha pelo menos uma credencial de acesso.",
        variant: "destructive",
      });
      return;
    }

    connectMutation.mutate(credentials);
  };

  const handleDisconnect = () => {
    disconnectMutation.mutate();
  };

  const getCredentialFields = () => {
    if (!integration) return [];

    const platformConfig = {
      hotmart: [
        { key: "apiKey", label: "API Key", placeholder: "Sua API Key do Hotmart", required: true },
        { key: "apiSecret", label: "API Secret", placeholder: "Seu API Secret do Hotmart", required: true },
      ],
      kiwify: [
        { key: "apiKey", label: "API Token", placeholder: "Seu token de API do Kiwify", required: true },
        { key: "webhookUrl", label: "Webhook URL", placeholder: "URL para receber notificações", required: false },
      ],
      shopify: [
        { key: "apiKey", label: "API Key", placeholder: "Sua API Key do Shopify", required: true },
        { key: "apiSecret", label: "API Secret Key", placeholder: "Sua API Secret Key", required: true },
        { key: "customField1", label: "Store URL", placeholder: "exemplo.myshopify.com", required: true },
      ],
      stripe: [
        { key: "apiKey", label: "Publishable Key", placeholder: "pk_live_...", required: true },
        { key: "apiSecret", label: "Secret Key", placeholder: "sk_live_...", required: true },
        { key: "webhookUrl", label: "Webhook Endpoint", placeholder: "URL do seu webhook", required: false },
      ],
      default: [
        { key: "apiKey", label: "API Key", placeholder: "Sua chave de API", required: true },
        { key: "apiSecret", label: "API Secret", placeholder: "Seu segredo de API", required: false },
        { key: "webhookUrl", label: "Webhook URL", placeholder: "URL para notificações", required: false },
      ]
    };

    return platformConfig[integration.id as keyof typeof platformConfig] || platformConfig.default;
  };

  if (!integration) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-center">
              <img 
                src={integration.logo} 
                alt={`${integration.name} logo`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs font-medium hidden">
                {integration.name.charAt(0)}
              </div>
            </div>
            <div>
              <DialogTitle className="text-xl">
                {integration.isConnected ? "Configurar" : "Conectar"} {integration.name}
              </DialogTitle>
              <DialogDescription>
                {integration.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Integration Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Informações da Integração</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <Badge variant={integration.isConnected ? "default" : "secondary"} className={integration.isConnected ? "bg-green-100 text-green-800" : ""}>
                  {integration.isConnected ? "Conectado" : "Desconectado"}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Categoria:</span>
                <span className="capitalize">{integration.category}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Dificuldade:</span>
                <Badge 
                  variant="outline"
                  className={
                    integration.setupDifficulty === "Fácil" ? "text-green-700 border-green-200" :
                    integration.setupDifficulty === "Médio" ? "text-yellow-700 border-yellow-200" :
                    "text-red-700 border-red-200"
                  }
                >
                  {integration.setupDifficulty}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Recursos Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {integration.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Credentials Form */}
          {!integration.isConnected && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Credenciais de Acesso
                </CardTitle>
                <CardDescription>
                  Insira suas credenciais para conectar com {integration.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {getCredentialFields().map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={field.key} className="flex items-center gap-2">
                      {field.label}
                      {field.required && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      id={field.key}
                      type={field.key.includes('secret') || field.key.includes('key') ? "password" : "text"}
                      placeholder={field.placeholder}
                      value={credentials[field.key as keyof typeof credentials]}
                      onChange={(e) => setCredentials(prev => ({
                        ...prev,
                        [field.key]: e.target.value
                      }))}
                      className="w-full"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Security Info */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Segurança</p>
                  <p className="text-blue-700">
                    Suas credenciais são criptografadas e armazenadas com segurança. 
                    Nunca compartilhamos suas informações com terceiros.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentation Link */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Documentação</p>
                    <p className="text-sm text-gray-600">
                      Precisa de ajuda? Consulte nosso guia de integração
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver Guia
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          
          {integration.isConnected ? (
            <Button 
              variant="destructive" 
              onClick={handleDisconnect}
              disabled={disconnectMutation.isPending}
            >
              {disconnectMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Desconectar
            </Button>
          ) : (
            <Button 
              onClick={handleConnect}
              disabled={connectMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {connectMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Conectar Integração
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}