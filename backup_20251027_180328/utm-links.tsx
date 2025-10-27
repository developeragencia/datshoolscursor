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
  Link,
  ExternalLink,
  Copy,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Eye,
  QrCode,
  Settings,
  TrendingUp,
  MousePointer,
  Target,
  Globe,
  Search,
  Filter,
  RefreshCw,
  Download
} from "lucide-react";

export default function UtmLinks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<any>(null);
  const [newLink, setNewLink] = useState({
    name: "",
    originalUrl: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmTerm: "",
    utmContent: "",
    description: "",
    isActive: true
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch UTM links data
  const { data: links = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/utm-links"],
  });

  const { data: linkStats = {} } = useQuery<{
    totalClicks?: number;
    conversionRate?: number;
    activeLinks?: number;
  }>({
    queryKey: ["/api/utm-links/stats"],
  });

  const filteredLinks = links.filter((link: any) => {
    const matchesSearch = 
      link.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.utmCampaign?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.utmSource?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && link.isActive) ||
      (statusFilter === "inactive" && !link.isActive);
    
    const matchesCampaign = campaignFilter === "all" || link.utmCampaign === campaignFilter;
    
    return matchesSearch && matchesStatus && matchesCampaign;
  });

  // Mutations
  const createLinkMutation = useMutation({
    mutationFn: async (linkData: any) => {
      const response = await fetch('/api/utm-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(linkData)
      });
      if (!response.ok) throw new Error('Erro ao criar link UTM');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Link UTM criado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/utm-links'] });
      setIsCreateModalOpen(false);
      setNewLink({
        name: "",
        originalUrl: "",
        utmSource: "",
        utmMedium: "",
        utmCampaign: "",
        utmTerm: "",
        utmContent: "",
        description: "",
        isActive: true
      });
    },
    onError: () => {
      toast({ title: "Erro ao criar link UTM", variant: "destructive" });
    }
  });

  const updateLinkMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const response = await fetch(`/api/utm-links/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erro ao atualizar link UTM');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Link UTM atualizado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/utm-links'] });
      setIsEditModalOpen(false);
    },
    onError: () => {
      toast({ title: "Erro ao atualizar link UTM", variant: "destructive" });
    }
  });

  const deleteLinkMutation = useMutation({
    mutationFn: async (linkId: string) => {
      const response = await fetch(`/api/utm-links/${linkId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Erro ao excluir link UTM');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Link UTM excluído com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['/api/utm-links'] });
      setIsDeleteModalOpen(false);
    },
    onError: () => {
      toast({ title: "Erro ao excluir link UTM", variant: "destructive" });
    }
  });

  const handleCreateLink = () => {
    createLinkMutation.mutate(newLink);
  };

  const handleUpdateLink = () => {
    if (selectedLink) {
      updateLinkMutation.mutate({ id: selectedLink.id, data: selectedLink });
    }
  };

  const generateUtmUrl = (link: any) => {
    const url = new URL(link.originalUrl);
    if (link.utmSource) url.searchParams.set('utm_source', link.utmSource);
    if (link.utmMedium) url.searchParams.set('utm_medium', link.utmMedium);
    if (link.utmCampaign) url.searchParams.set('utm_campaign', link.utmCampaign);
    if (link.utmTerm) url.searchParams.set('utm_term', link.utmTerm);
    if (link.utmContent) url.searchParams.set('utm_content', link.utmContent);
    return url.toString();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Link copiado para a área de transferência!" });
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
      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Ativo</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Inativo</Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Links UTM</h1>
              <p className="text-gray-600">
                Crie e gerencie links com parâmetros UTM para rastreamento preciso
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
                    Novo Link UTM
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Link UTM</DialogTitle>
                    <DialogDescription>
                      Configure um novo link com parâmetros UTM para rastreamento de campanhas
                    </DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
                      <TabsTrigger value="utm">Parâmetros UTM</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basic" className="space-y-4">
                      <div className="grid gap-4 py-4">
                        <div>
                          <Label htmlFor="name">Nome do Link</Label>
                          <Input
                            id="name"
                            value={newLink.name}
                            onChange={(e) => setNewLink({...newLink, name: e.target.value})}
                            placeholder="Ex: Campanha Black Friday - Facebook"
                          />
                        </div>
                        <div>
                          <Label htmlFor="originalUrl">URL Original</Label>
                          <Input
                            id="originalUrl"
                            value={newLink.originalUrl}
                            onChange={(e) => setNewLink({...newLink, originalUrl: e.target.value})}
                            placeholder="https://meusite.com/produto"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Descrição</Label>
                          <Textarea
                            id="description"
                            value={newLink.description}
                            onChange={(e) => setNewLink({...newLink, description: e.target.value})}
                            placeholder="Descrição da campanha ou objetivo do link..."
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="utm" className="space-y-4">
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="utmSource">UTM Source *</Label>
                            <Input
                              id="utmSource"
                              value={newLink.utmSource}
                              onChange={(e) => setNewLink({...newLink, utmSource: e.target.value})}
                              placeholder="facebook, google, email"
                            />
                            <p className="text-xs text-gray-500 mt-1">Identifica a fonte do tráfego</p>
                          </div>
                          <div>
                            <Label htmlFor="utmMedium">UTM Medium *</Label>
                            <Input
                              id="utmMedium"
                              value={newLink.utmMedium}
                              onChange={(e) => setNewLink({...newLink, utmMedium: e.target.value})}
                              placeholder="cpc, social, email"
                            />
                            <p className="text-xs text-gray-500 mt-1">Identifica o meio de marketing</p>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="utmCampaign">UTM Campaign *</Label>
                          <Input
                            id="utmCampaign"
                            value={newLink.utmCampaign}
                            onChange={(e) => setNewLink({...newLink, utmCampaign: e.target.value})}
                            placeholder="black-friday-2024, lancamento-produto"
                          />
                          <p className="text-xs text-gray-500 mt-1">Nome da campanha específica</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="utmTerm">UTM Term</Label>
                            <Input
                              id="utmTerm"
                              value={newLink.utmTerm}
                              onChange={(e) => setNewLink({...newLink, utmTerm: e.target.value})}
                              placeholder="palavra-chave-paga"
                            />
                            <p className="text-xs text-gray-500 mt-1">Para campanhas de busca paga</p>
                          </div>
                          <div>
                            <Label htmlFor="utmContent">UTM Content</Label>
                            <Input
                              id="utmContent"
                              value={newLink.utmContent}
                              onChange={(e) => setNewLink({...newLink, utmContent: e.target.value})}
                              placeholder="banner-azul, texto-call-to-action"
                            />
                            <p className="text-xs text-gray-500 mt-1">Diferencia conteúdos similares</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleCreateLink}
                      disabled={createLinkMutation.isPending}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {createLinkMutation.isPending ? "Criando..." : "Criar Link UTM"}
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
                    <p className="text-sm font-medium text-gray-600">Total de Links</p>
                    <p className="text-2xl font-bold text-blue-600">{links.length}</p>
                  </div>
                  <Link className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Links Ativos</p>
                    <p className="text-2xl font-bold text-green-600">
                      {links.filter((l: any) => l.isActive).length}
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
                    <p className="text-sm font-medium text-gray-600">Cliques Totais</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {linkStats?.totalClicks || 0}
                    </p>
                  </div>
                  <MousePointer className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {linkStats?.conversionRate || 0}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Links Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Links UTM Gerenciados</CardTitle>
                  <CardDescription>
                    Todos os seus links com parâmetros UTM para rastreamento de campanhas
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar links..."
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
                      <TableHead>UTM Campaign</TableHead>
                      <TableHead>Source/Medium</TableHead>
                      <TableHead>Cliques</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Criado em</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLinks.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <Link className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum link encontrado</h3>
                          <p className="text-gray-500">
                            {searchTerm || statusFilter !== "all"
                              ? "Tente ajustar os filtros ou fazer uma nova busca."
                              : "Crie seu primeiro link UTM para começar o rastreamento."
                            }
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLinks.map((link: any) => (
                        <TableRow key={link.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-blue-500" />
                              <div>
                                <p className="font-medium">{link.name}</p>
                                <p className="text-sm text-gray-500 truncate max-w-xs">
                                  {link.originalUrl}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              {link.utmCampaign}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{link.utmSource}</p>
                              <p className="text-xs text-gray-500">{link.utmMedium}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <BarChart3 className="h-4 w-4 text-green-500" />
                              <span className="font-medium">{link.clicks || 0}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(link.isActive)}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {formatDate(link.createdAt)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(generateUtmUrl(link))}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedLink(link);
                                  setIsQrCodeModalOpen(true);
                                }}
                              >
                                <QrCode className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedLink(link);
                                  setIsEditModalOpen(true);
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedLink(link);
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

        {/* Edit Link Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Editar Link UTM</DialogTitle>
              <DialogDescription>
                Altere as configurações do link UTM selecionado
              </DialogDescription>
            </DialogHeader>
            {selectedLink && (
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="edit-name">Nome do Link</Label>
                  <Input
                    id="edit-name"
                    value={selectedLink.name}
                    onChange={(e) => setSelectedLink({...selectedLink, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-originalUrl">URL Original</Label>
                  <Input
                    id="edit-originalUrl"
                    value={selectedLink.originalUrl}
                    onChange={(e) => setSelectedLink({...selectedLink, originalUrl: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-utmSource">UTM Source</Label>
                    <Input
                      id="edit-utmSource"
                      value={selectedLink.utmSource}
                      onChange={(e) => setSelectedLink({...selectedLink, utmSource: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-utmMedium">UTM Medium</Label>
                    <Input
                      id="edit-utmMedium"
                      value={selectedLink.utmMedium}
                      onChange={(e) => setSelectedLink({...selectedLink, utmMedium: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-utmCampaign">UTM Campaign</Label>
                  <Input
                    id="edit-utmCampaign"
                    value={selectedLink.utmCampaign}
                    onChange={(e) => setSelectedLink({...selectedLink, utmCampaign: e.target.value})}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleUpdateLink}
                disabled={updateLinkMutation.isPending}
                className="bg-red-600 hover:bg-red-700"
              >
                {updateLinkMutation.isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Link Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Esta ação não pode ser desfeita. O link UTM será permanentemente removido.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                Cancelar
              </Button>
              <Button 
                variant="destructive"
                onClick={() => selectedLink && deleteLinkMutation.mutate(selectedLink.id)}
                disabled={deleteLinkMutation.isPending}
              >
                {deleteLinkMutation.isPending ? "Excluindo..." : "Confirmar Exclusão"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}