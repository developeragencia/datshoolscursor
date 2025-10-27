import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useQueryClient } from "@tanstack/react-query";
import { Facebook } from "lucide-react";

interface FacebookConnectButtonProps {
  onSuccess?: (data: any) => void;
  className?: string;
  disabled?: boolean;
}

export function FacebookConnectButton({ onSuccess, className, disabled }: FacebookConnectButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleConnect = async () => {
    if (disabled || isConnecting) return;
    
    setIsConnecting(true);
    
    try {
      console.log('🚀 Conectando com Facebook - Sistema Limpo...');
      
      toast({
        title: "🔄 Conectando com Facebook",
        description: "Estabelecendo conexão automática e extraindo dados da conta...",
      });

      // Chamada para nova API limpa
      const response = await apiRequest('/api/facebook/connect-clean', {
        method: 'POST',
        body: {}
      });

      if (response.success) {
        const successMessage = `Facebook conectado! ${response.stats.totalAccounts} contas e ${response.stats.totalCampaigns} campanhas sincronizadas.`;
        
        toast({
          title: "✅ Facebook Conectado com Sucesso!",
          description: successMessage,
        });
        
        console.log('📊 Conexão realizada:', {
          user: response.user.name,
          email: response.user.email,
          accounts: response.stats.totalAccounts,
          campaigns: response.stats.totalCampaigns,
          appId: response.config.appId,
          app: response.config.applicationName
        });
        
        // Refresh queries
        queryClient.invalidateQueries({ queryKey: ["/api/facebook/accounts"] });
        queryClient.invalidateQueries({ queryKey: ["/api/facebook/credentials"] });
        queryClient.invalidateQueries({ queryKey: ["/api/facebook/token-info"] });
        
        // Call success callback
        if (onSuccess) {
          onSuccess(response);
        }
        
      } else {
        throw new Error(response.error || 'Falha na conexão');
      }
      
    } catch (error: any) {
      console.error('❌ Erro na conexão Facebook:', error);
      
      let errorMessage = "Erro ao conectar com o Facebook.";
      if (error.message?.includes('Token')) {
        errorMessage = "Token do Facebook inválido ou expirado.";
      } else if (error.message?.includes('permissions')) {
        errorMessage = "Permissões insuficientes no Facebook.";
      } else if (error.message?.includes('network')) {
        errorMessage = "Erro de conexão. Verifique sua internet.";
      }
      
      toast({
        title: "❌ Erro na Conexão",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Button
      onClick={handleConnect}
      disabled={disabled || isConnecting}
      className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-semibold transition-all ${className}`}
    >
      <Facebook className="w-5 h-5 mr-3" />
      {isConnecting ? "Conectando..." : "Conectar com Facebook"}
    </Button>
  );
}