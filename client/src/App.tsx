import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Public Pages
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Pricing from "@/pages/pricing";
import Integrations from "@/pages/integrations";
import Login from "@/pages/login";
import Register from "@/pages/register";

// Client Dashboard Pages
import Dashboard from "@/pages/dashboard";
import Campanhas from "@/pages/campanhas";
import Vendas from "@/pages/vendas";
import Relatorios from "@/pages/relatorios";
import Resumo from "@/pages/resumo";
import Analise from "@/pages/analise";
import UTMLinks from "@/pages/utm-links";
import Pixels from "@/pages/pixels";
import Funil from "@/pages/funil";
import Atribuicao from "@/pages/atribuicao";
import MetaAds from "@/pages/meta-ads";
import GoogleAds from "@/pages/google-ads";
import TikTokAds from "@/pages/tiktok-ads";
import Configuracoes from "@/pages/configuracoes";
import Webhooks from "@/pages/webhooks";
import RegrasAutomatizadas from "@/pages/regras-automatizadas";

// Admin Pages
import AdminDashboard from "@/pages/admin";
import AdminUsers from "@/pages/admin/users";
import AdminCampaigns from "@/pages/admin/campaigns";
import AdminReports from "@/pages/admin/reports";
import AdminLogs from "@/pages/admin/logs";
import AdminSettings from "@/pages/admin/settings";
import AdminDatabase from "@/pages/admin/database";
import AdminNotifications from "@/pages/admin/notifications";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/precos" component={Pricing} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/integracoes" component={Integrations} />
      
      {/* Auth Routes */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/cadastro" component={Register} />
      
      {/* Client Dashboard Routes */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/campanhas" component={Campanhas} />
      <Route path="/vendas" component={Vendas} />
      <Route path="/relatorios" component={Relatorios} />
      <Route path="/resumo" component={Resumo} />
      <Route path="/analise" component={Analise} />
      <Route path="/utm-links" component={UTMLinks} />
      <Route path="/pixels" component={Pixels} />
      <Route path="/funil" component={Funil} />
      <Route path="/atribuicao" component={Atribuicao} />
      <Route path="/meta-ads" component={MetaAds} />
      <Route path="/google-ads" component={GoogleAds} />
      <Route path="/tiktok-ads" component={TikTokAds} />
      <Route path="/configuracoes" component={Configuracoes} />
      <Route path="/webhooks" component={Webhooks} />
      <Route path="/regras-automatizadas" component={RegrasAutomatizadas} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/campaigns" component={AdminCampaigns} />
      <Route path="/admin/reports" component={AdminReports} />
      <Route path="/admin/logs" component={AdminLogs} />
      <Route path="/admin/settings" component={AdminSettings} />
      <Route path="/admin/database" component={AdminDatabase} />
      <Route path="/admin/notifications" component={AdminNotifications} />
      
      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
      </ThemeProvider>
  );
}

export default App;
