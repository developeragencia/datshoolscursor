import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function TestFacebook() {
  const [status, setStatus] = useState('');
  const { toast } = useToast();

  const testOAuth = () => {
    setStatus('Iniciando teste OAuth...');
    
    // Open Facebook OAuth in popup
    const popup = window.open(
      '/api/facebook/login',
      'facebook-oauth-test',
      'width=600,height=600,scrollbars=yes,resizable=yes'
    );

    // Monitor popup
    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed);
        setStatus('Popup fechado - verificando resultado...');
        
        // Check URL for success/error
        setTimeout(() => {
          const url = new URL(window.location.href);
          if (url.searchParams.get('success')) {
            setStatus('✅ OAuth concluído com sucesso!');
            toast({
              title: "Sucesso!",
              description: "Facebook OAuth funcionando corretamente",
            });
          } else if (url.searchParams.get('error')) {
            const error = url.searchParams.get('message') || 'Erro desconhecido';
            setStatus(`❌ Erro: ${error}`);
            toast({
              title: "Erro OAuth",
              description: error,
              variant: "destructive",
            });
          }
        }, 1000);
      }
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>🧪 Teste Facebook OAuth</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Instruções:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Esta página deve ser acessada em <code>localhost:5000</code></li>
              <li>Clique no botão "Testar OAuth" abaixo</li>
              <li>Uma janela popup do Facebook será aberta</li>
              <li>Complete o processo de autorização</li>
              <li>A janela fechará automaticamente após sucesso/erro</li>
            </ol>
          </div>
          
          <div className="space-y-2">
            <p><strong>Domínio atual:</strong> {window.location.hostname}:{window.location.port}</p>
            <p><strong>Status:</strong> {status || 'Pronto para teste'}</p>
          </div>

          <Button 
            onClick={testOAuth}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            🧪 Testar Facebook OAuth
          </Button>

          <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
            <strong>URL OAuth gerada:</strong><br />
            <code className="break-all">
              https://www.facebook.com/v18.0/dialog/oauth?client_id=3003010409921497&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Ffacebook%2Fcallback
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}