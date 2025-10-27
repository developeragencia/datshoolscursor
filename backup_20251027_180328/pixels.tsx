import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/layout/sidebar";
import { useToast } from "@/hooks/use-toast";
import { 
  Eye,
  Target,
  Copy,
  Plus,
  Edit,
  Trash2,
  Code,
  BarChart3,
  Settings,
  TrendingUp,
  Activity,
  Zap,
  Globe,
  Search,
  Filter,
  RefreshCw,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";

export default function Pixels() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [selectedPixel, setSelectedPixel] = useState<any>(null);
  const [newPixel, setNewPixel] = useState({
    name: "",
    platform: "",
    pixelId: "",
    domain: "",
    events: [],
    description: "",
    isActive: true
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch pixels data
  const { data: pixels = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/pixels"],
  });

  const { data: pixelStats = {} } = useQuery<{
    eventsTracked?: number;
    conversionRate?: number;
    activePixels?: number;
  }>({
    queryKey: ["/api/pixels/stats"],
  });

  const filteredPixels = pixels.filter((pixel: any) => {
    const matchesSearch = 
      pixel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pixel.platform?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pixel.pixelId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && pixel.isActive) ||
      (statusFilter === "inactive" && !pixel.isActive);
    
    const matchesPlatform = platformFilter === "all" || pixel.platform === platformFilter;
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  // Mutations
  const createPixelMutation = useMutation({
    mutationFn: async (pixelData: any) => {
      const response = await fetch('/api/pixels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(pixelData)
      });
      if (!response.ok) throw new Error('Erro ao criar pixel');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Pixel criado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/pixels'] });
      setIsCreateModalOpen(false);
      setNewPixel({
        name: "",
        platform: "",
        pixelId: "",
        domain: "",
        events: [],
        description: "",
        isActive: true
      });
    },
    onError: () => {
      toast({ title: "Erro ao criar pixel", variant: "destructive" });
    }
  });

  const updatePixelMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const response = await fetch(`/api/pixels/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erro ao atualizar pixel');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Pixel atualizado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/pixels'] });
      setIsEditModalOpen(false);
    },
    onError: () => {
      toast({ title: "Erro ao atualizar pixel", variant: "destructive" });
    }
  });

  const deletePixelMutation = useMutation({
    mutationFn: async (pixelId: string) => {
      const response = await fetch(`/api/pixels/${pixelId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Erro ao excluir pixel');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Pixel excluído com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/pixels'] });
      setIsDeleteModalOpen(false);
    },
    onError: () => {
      toast({ title: "Erro ao excluir pixel", variant: "destructive" });
    }
  });

  const handleCreatePixel = () => {
    createPixelMutation.mutate(newPixel);
  };

  const handleUpdatePixel = () => {
    if (selectedPixel) {
      updatePixelMutation.mutate({ id: selectedPixel.id, data: selectedPixel });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
        <CheckCircle className="h-3 w-3 mr-1" />
        Ativo
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
        <XCircle className="h-3 w-3 mr-1" />
        Inativo
      </Badge>
    );
  };

  const getPlatformBadge = (platform: string) => {
    const platformColors: { [key: string]: string } = {
      'facebook': 'bg-blue-100 text-blue-800',
      'google': 'bg-red-100 text-red-800',
      'tiktok': 'bg-black text-white',
      'twitter': 'bg-sky-100 text-sky-800',
      'linkedin': 'bg-blue-100 text-blue-800',
      'pinterest': 'bg-red-100 text-red-800',
    };

    return (
      <Badge className={`${platformColors[platform] || 'bg-gray-100 text-gray-800'} hover:opacity-80`}>
        {platform.charAt(0).toUpperCase() + platform.slice(1)}
      </Badge>
    );
  };

  const generatePixelCode = (pixel: any) => {
    switch (pixel.platform) {
      case 'facebook':
        return `<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixel.pixelId}');
fbq('track', 'PageView');
</script>
<noscript>
<img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=${pixel.pixelId}&ev=PageView&noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->`;
      case 'google':
        return `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${pixel.pixelId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${pixel.pixelId}');
</script>`;
      default:
        return `<!-- ${pixel.platform} Pixel Code -->
<script>
// Código do pixel para ${pixel.platform}
// ID: ${pixel.pixelId}
</script>`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pixels de Rastreamento</h1>
              <p className="text-gray-600">
                Configure pixels do Facebook, Google Analytics e outras plataformas
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Pixel
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Pixel</DialogTitle>
                    <DialogDescription>
                      Configure um novo pixel de rastreamento para suas campanhas
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome do Pixel</Label>
                        <Input
                          id="name"
                          value={newPixel.name}
                          onChange={(e) => setNewPixel({...newPixel, name: e.target.value})}
                          placeholder="Ex: Facebook Pixel Principal"
                        />
                      </div>
                      <div>
                        <Label htmlFor="platform">Plataforma</Label>
                        <Select value={newPixel.platform} onValueChange={(value) => setNewPixel({...newPixel, platform: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a plataforma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="facebook">Facebook Pixel</SelectItem>
                            <SelectItem value="google">Google Analytics</SelectItem>
                            <SelectItem value="tiktok">TikTok Pixel</SelectItem>
                            <SelectItem value="twitter">Twitter Pixel</SelectItem>
                            <SelectItem value="linkedin">LinkedIn Insight Tag</SelectItem>
                            <SelectItem value="pinterest">Pinterest Tag</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pixelId">ID do Pixel</Label>
                        <Input
                          id="pixelId"
                          value={newPixel.pixelId}
                          onChange={(e) => setNewPixel({...newPixel, pixelId: e.target.value})}
                          placeholder="Ex: 123456789012345"
                        />
                      </div>
                      <div>
                        <Label htmlFor="domain">Domínio</Label>
                        <Input
                          id="domain"
                          value={newPixel.domain}
                          onChange={(e) => setNewPixel({...newPixel, domain: e.target.value})}
                          placeholder="Ex: meusite.com"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={newPixel.description}
                        onChange={(e) => setNewPixel({...newPixel, description: e.target.value})}
                        placeholder="Descrição do pixel e sua finalidade..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleCreatePixel}
                      disabled={createPixelMutation.isPending}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {createPixelMutation.isPending ? "Criando..." : "Criar Pixel"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Pixels</p>
                    <p className="text-2xl font-bold text-blue-600">{pixels.length}</p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pixels Ativos</p>
                    <p className="text-2xl font-bold text-green-600">
                      {pixels.filter((p: any) => p.isActive).length}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Eventos Rastreados</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {pixelStats?.eventsTracked || 0}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {pixelStats?.conversionRate || 0}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pixels Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pixels Configurados</CardTitle>
                  <CardDescription>
                    Gerencie todos os pixels de rastreamento das suas campanhas
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar pixels..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="inactive">Inativos</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por plataforma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as plataformas</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Plataforma</TableHead>
                      <TableHead>ID do Pixel</TableHead>
                      <TableHead>Domínio</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Criado em</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPixels.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pixel encontrado</h3>
                          <p className="text-gray-500">
                            {searchTerm || statusFilter !== "all" || platformFilter !== "all"
                              ? "Tente ajustar os filtros ou fazer uma nova busca."
                              : "Configure seu primeiro pixel de rastreamento para começar."
                            }
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPixels.map((pixel: any) => (
                        <TableRow key={pixel.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-yellow-500" />
                              {pixel.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getPlatformBadge(pixel.platform)}
                          </TableCell>
                          <TableCell>
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {pixel.pixelId}
                            </code>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Globe className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">{pixel.domain}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(pixel.isActive)}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {formatDate(pixel.createdAt)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedPixel(pixel);
                                  setIsCodeModalOpen(true);
                                }}
                              >
                                <Code className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(generatePixelCode(pixel));
                                  toast({ title: "Código copiado!" });
                                }}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedPixel(pixel);
                                  setIsEditModalOpen(true);
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedPixel(pixel);
                                  setIsDeleteModalOpen(true);
                                }}
                              >
                                <Trash2 className="h-3 w-3 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Code Modal */}
        <Dialog open={isCodeModalOpen} onOpenChange={setIsCodeModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Código do Pixel</DialogTitle>
              <DialogDescription>
                Copie e cole este código no cabeçalho do seu site
              </DialogDescription>
            </DialogHeader>
            {selectedPixel && (
              <div className="space-y-4">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{generatePixelCode(selectedPixel)}</code>
                  </pre>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Como instalar:</h4>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Copie o código acima</li>
                    <li>2. Cole no cabeçalho (&lt;head&gt;) do seu site</li>
                    <li>3. Salve e publique as alterações</li>
                    <li>4. Teste se o pixel está funcionando</li>
                  </ol>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                onClick={() => {
                  if (selectedPixel) {
                    navigator.clipboard.writeText(generatePixelCode(selectedPixel));
                    toast({ title: "Código copiado para a área de transferência!" });
                  }
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copiar Código
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Pixel Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Pixel</DialogTitle>
              <DialogDescription>
                Altere as configurações do pixel selecionado
              </DialogDescription>
            </DialogHeader>
            {selectedPixel && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Nome do Pixel</Label>
                    <Input
                      id="edit-name"
                      value={selectedPixel.name}
                      onChange={(e) => setSelectedPixel({...selectedPixel, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-platform">Plataforma</Label>
                    <Select value={selectedPixel.platform} onValueChange={(value) => setSelectedPixel({...selectedPixel, platform: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facebook">Facebook Pixel</SelectItem>
                        <SelectItem value="google">Google Analytics</SelectItem>
                        <SelectItem value="tiktok">TikTok Pixel</SelectItem>
                        <SelectItem value="twitter">Twitter Pixel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-pixelId">ID do Pixel</Label>
                    <Input
                      id="edit-pixelId"
                      value={selectedPixel.pixelId}
                      onChange={(e) => setSelectedPixel({...selectedPixel, pixelId: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-domain">Domínio</Label>
                    <Input
                      id="edit-domain"
                      value={selectedPixel.domain}
                      onChange={(e) => setSelectedPixel({...selectedPixel, domain: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleUpdatePixel}
                disabled={updatePixelMutation.isPending}
                className="bg-red-600 hover:bg-red-700"
              >
                {updatePixelMutation.isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Pixel Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Esta ação não pode ser desfeita. O pixel será permanentemente removido.
              </DialogDescription>
            </DialogHeader>
            {selectedPixel && (
              <div className="py-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <h4 className="font-semibold text-red-900">Você está prestes a excluir:</h4>
                      <p className="text-red-700">{selectedPixel.name}</p>
                      <p className="text-sm text-red-600 mt-1">
                        {selectedPixel.platform} • {selectedPixel.pixelId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                Cancelar
              </Button>
              <Button 
                variant="destructive"
                onClick={() => selectedPixel && deletePixelMutation.mutate(selectedPixel.id)}
                disabled={deletePixelMutation.isPending}
              >
                {deletePixelMutation.isPending ? "Excluindo..." : "Confirmar Exclusão"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}