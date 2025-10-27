import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function FacebookOAuthHelper() {
  const { toast } = useToast();

  useEffect(() => {
    // Listen for messages from popup window
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'FACEBOOK_OAUTH_SUCCESS') {
        toast({
          title: "✅ Facebook Conectado!",
          description: "Sua conta foi conectada com sucesso.",
        });
        window.location.reload();
      } else if (event.data.type === 'FACEBOOK_OAUTH_ERROR') {
        toast({
          title: "❌ Erro na Conexão",
          description: event.data.message || "Erro ao conectar com Facebook",
          variant: "destructive",
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [toast]);

  return null;
}

// Helper function to open Facebook OAuth in popup
export function openFacebookOAuth() {
  const popup = window.open(
    '/api/facebook/login',
    'facebook-oauth',
    'width=600,height=600,scrollbars=yes,resizable=yes'
  );

  // Check if popup was closed manually
  const checkClosed = setInterval(() => {
    if (popup?.closed) {
      clearInterval(checkClosed);
    }
  }, 1000);

  return popup;
}