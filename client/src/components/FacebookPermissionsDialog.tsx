import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, ExternalLink, CheckCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FacebookPermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hasPermissions: boolean;
  userInfo?: any;
}

export function FacebookPermissionsDialog({ 
  open, 
  onOpenChange, 
  hasPermissions,
  userInfo 
}: FacebookPermissionsDialogProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Texto copiado para a área de transferência",
    });
  };

  const requiredPermissions = [
    "ads_management", 
    "ads_read", 
    "business_management", 
    "pages_read_engagement",
    "read_insights"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {hasPermissions ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            )}
            Status das Permissões do Facebook
          </DialogTitle>
          <DialogDescription>
            {hasPermissions 
              ? "Sua conta está configurada corretamente!"
              : "Para acessar contas de anúncios, você precisa de permissões adicionais"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {userInfo && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Conectado como:</strong> {userInfo.name} (ID: {userInfo.id})
              </AlertDescription>
            </Alert>
          )}

          {!hasPermissions && (
            <>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Permissões necessárias:</strong><br />
                  Seu token atual só tem permissão "public_profile". Para acessar contas de anúncios 
                  e campanhas, você precisa gerar um novo token com as permissões abaixo.
                </AlertDescription>
              </Alert>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Permissões necessárias:</h4>
                <div className="space-y-2">
                  {requiredPermissions.map(permission => (
                    <div key={permission} className="flex items-center justify-between">
                      <code className="bg-gray-200 px-2 py-1 rounded text-sm">{permission}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(permission)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Como gerar novo token:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Acesse o Graph API Explorer do Facebook</li>
                  <li>Selecione seu App ID: <code>799858769030868</code></li>
                  <li>Marque as permissões listadas acima</li>
                  <li>Clique em "Generate Access Token"</li>
                  <li>Copie o novo token e cole no sistema</li>
                </ol>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="gap-2">
          {!hasPermissions && (
            <Button
              variant="outline"
              onClick={() => window.open('https://developers.facebook.com/tools/explorer/', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Abrir Graph API Explorer
            </Button>
          )}
          <Button onClick={() => onOpenChange(false)}>
            {hasPermissions ? "Entendi" : "Fechar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}