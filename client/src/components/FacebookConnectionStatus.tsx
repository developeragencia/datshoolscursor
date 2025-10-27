import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, ExternalLink, User, Key } from "lucide-react";

export function FacebookConnectionStatus() {
  const { data: tokenInfo } = useQuery({
    queryKey: ["/api/facebook/token-info"],
    retry: false,
  });

  if (!tokenInfo?.valid) {
    return null;
  }

  const hasAdPermissions = tokenInfo.tokenInfo?.scopes?.includes('ads_management') || false;
  const user = tokenInfo.user;

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {hasAdPermissions ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            )}
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-semibold text-lg">
                {hasAdPermissions ? "Facebook Conectado ✓" : "Facebook Conectado (Permissões Limitadas)"}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <User className="h-4 w-4" />
                <span className="text-sm text-gray-600">{user.name}</span>
                <Badge variant="secondary">ID: {user.id}</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                <span className="text-sm font-medium">Permissões:</span>
                {tokenInfo.tokenInfo?.scopes?.map((scope: string) => (
                  <Badge 
                    key={scope} 
                    variant={scope === 'public_profile' ? 'secondary' : 'default'}
                  >
                    {scope}
                  </Badge>
                ))}
              </div>

              {!hasAdPermissions && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800 mb-2">
                    <strong>Para acessar contas de anúncios</strong>, você precisa gerar um novo token com as permissões:
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {['ads_management', 'ads_read', 'business_management'].map(perm => (
                      <Badge key={perm} variant="outline" className="text-xs">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open('https://developers.facebook.com/tools/explorer/', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Gerar Novo Token
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}