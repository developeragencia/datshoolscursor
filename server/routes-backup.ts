import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { Router } from "express";
import { 
  insertUserSchema, 
  insertAdAccountSchema, 
  insertCampaignSchema, 
  insertSaleSchema, 
  insertDashboardSchema, 
  insertWebhookSchema, 
  insertAutomatedRuleSchema 
} from "@shared/schema";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import { AuthenticatedRequest } from "./types";

const router = Router();

// Middleware para verificar autenticação
const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Autenticação obrigatória" });
  }
  next();
};

// Authentication routes
router.post("/api/auth/register", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userData = insertUserSchema.parse(req.body);
    
    // Verificar se usuário já existe
    const existingUser = await storage.getUserByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }
    
    // Verificar se username já existe
    const existingUsername = await storage.getUserByUsername(userData.username);
    if (existingUsername) {
      return res.status(400).json({ error: "Nome de usuário já existe" });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Create user
    const user = await storage.createUser({
      ...userData,
      password: hashedPassword,
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ error: "Falha no cadastro" });
  }
});

router.post("/api/auth/login", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await storage.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    req.session.userId = user.id;
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Falha no login" });
  }
});

router.post("/api/auth/logout", (req: AuthenticatedRequest, res: Response) => {
  req.session.destroy((err: any) => {
    if (err) {
      return res.status(500).json({ error: "Falha no logout" });
    }
    res.json({ message: "Logout realizado com sucesso" });
  });
});

router.get("/api/auth/me", async (req: AuthenticatedRequest, res: Response) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  try {
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Falha ao buscar usuário" });
  }
});

// User routes
router.put("/api/users/profile", requireAuth, async (req, res) => {
  try {
    const updates = req.body;
    const user = await storage.updateUser(req.session.userId, updates);
    
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Falha ao atualizar perfil" });
  }
});

// AdAccount routes
router.get("/api/ad-accounts", requireAuth, async (req, res) => {
  try {
    const adAccounts = await storage.getAdAccounts(req.session.userId);
    res.json(adAccounts);
  } catch (error) {
    console.error("Get ad accounts error:", error);
    res.status(500).json({ error: "Falha ao buscar contas de anúncios" });
  }
});

router.post("/api/ad-accounts", requireAuth, async (req, res) => {
  try {
    const adAccountData = insertAdAccountSchema.parse({
      ...req.body,
      userId: req.session.userId
    });
    
    const adAccount = await storage.createAdAccount(adAccountData);
    res.json(adAccount);
  } catch (error) {
    console.error("Create ad account error:", error);
    res.status(400).json({ error: "Falha ao criar conta de anúncios" });
  }
});

router.put("/api/ad-accounts/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;
    
    const adAccount = await storage.updateAdAccount(id, updates);
    if (!adAccount) {
      return res.status(404).json({ error: "Conta de anúncios não encontrada" });
    }
    
    res.json(adAccount);
  } catch (error) {
    console.error("Update ad account error:", error);
    res.status(500).json({ error: "Falha ao atualizar conta de anúncios" });
  }
});

router.delete("/api/ad-accounts/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const success = await storage.deleteAdAccount(id);
    
    if (!success) {
      return res.status(404).json({ error: "Conta de anúncios não encontrada" });
    }
    
    res.json({ message: "Conta de anúncios removida com sucesso" });
  } catch (error) {
    console.error("Delete ad account error:", error);
    res.status(500).json({ error: "Falha ao remover conta de anúncios" });
  }
});

// Campaign routes
router.get("/api/campaigns", requireAuth, async (req, res) => {
  try {
    const campaigns = await storage.getCampaigns(req.session.userId);
    res.json(campaigns);
  } catch (error) {
    console.error("Get campaigns error:", error);
    res.status(500).json({ error: "Falha ao buscar campanhas" });
  }
});

router.post("/api/campaigns", requireAuth, async (req, res) => {
  try {
    const campaignData = insertCampaignSchema.parse({
      ...req.body,
      userId: req.session.userId
    });
    
    const campaign = await storage.createCampaign(campaignData);
    res.json(campaign);
  } catch (error) {
    console.error("Create campaign error:", error);
    res.status(400).json({ error: "Falha ao criar campanha" });
  }
});

router.put("/api/campaigns/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;
    
    const campaign = await storage.updateCampaign(id, updates);
    if (!campaign) {
      return res.status(404).json({ error: "Campanha não encontrada" });
    }
    
    res.json(campaign);
  } catch (error) {
    console.error("Update campaign error:", error);
    res.status(500).json({ error: "Falha ao atualizar campanha" });
  }
});

router.delete("/api/campaigns/:id", requireAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const success = await storage.deleteCampaign(id);
    
    if (!success) {
      return res.status(404).json({ error: "Campanha não encontrada" });
    }
    
    res.json({ message: "Campanha removida com sucesso" });
  } catch (error) {
    console.error("Delete campaign error:", error);
    res.status(500).json({ error: "Falha ao remover campanha" });
  }
});

// Sales routes
router.get("/api/sales", requireAuth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = startDate ? new Date(startDate as string) : undefined;
    const end = endDate ? new Date(endDate as string) : undefined;
    
    const sales = await storage.getSales(req.session.userId, start, end);
    res.json(sales);
  } catch (error) {
    console.error("Get sales error:", error);
    res.status(500).json({ error: "Falha ao buscar vendas" });
  }
});

router.get("/api/sales/stats", requireAuth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = startDate ? new Date(startDate as string) : undefined;
    const end = endDate ? new Date(endDate as string) : undefined;
    
    const stats = await storage.getSalesStats(req.session.userId, start, end);
    res.json(stats);
  } catch (error) {
    console.error("Get sales stats error:", error);
    res.status(500).json({ error: "Falha ao buscar estatísticas de vendas" });
  }
});

router.post("/api/sales", requireAuth, async (req, res) => {
  try {
    const saleData = insertSaleSchema.parse({
      ...req.body,
      userId: req.session.userId
    });
    
    const sale = await storage.createSale(saleData);
    res.json(sale);
  } catch (error) {
    console.error("Create sale error:", error);
    res.status(400).json({ error: "Falha ao criar venda" });
  }
});

// Dashboard routes
router.get("/api/dashboards", requireAuth, async (req, res) => {
  try {
    const dashboards = await storage.getDashboards(req.session.userId);
    res.json(dashboards);
  } catch (error) {
    console.error("Get dashboards error:", error);
    res.status(500).json({ error: "Falha ao buscar dashboards" });
  }
});

router.post("/api/dashboards", requireAuth, async (req, res) => {
  try {
    const dashboardData = insertDashboardSchema.parse({
      ...req.body,
      userId: req.session.userId
    });
    
    const dashboard = await storage.createDashboard(dashboardData);
    res.json(dashboard);
  } catch (error) {
    console.error("Create dashboard error:", error);
    res.status(400).json({ error: "Falha ao criar dashboard" });
  }
});

// Webhook routes
router.get("/api/webhooks", requireAuth, async (req, res) => {
  try {
    const webhooks = await storage.getWebhooks(req.session.userId);
    res.json(webhooks);
  } catch (error) {
    console.error("Get webhooks error:", error);
    res.status(500).json({ error: "Falha ao buscar webhooks" });
  }
});

router.post("/api/webhooks", requireAuth, async (req, res) => {
  try {
    const webhookData = insertWebhookSchema.parse({
      ...req.body,
      userId: req.session.userId
    });
    
    const webhook = await storage.createWebhook(webhookData);
    res.json(webhook);
  } catch (error) {
    console.error("Create webhook error:", error);
    res.status(400).json({ error: "Falha ao criar webhook" });
  }
});

// Automated Rules routes
router.get("/api/automated-rules", requireAuth, async (req, res) => {
  try {
    const rules = await storage.getAutomatedRules(req.session.userId);
    res.json(rules);
  } catch (error) {
    console.error("Get automated rules error:", error);
    res.status(500).json({ error: "Falha ao buscar regras automatizadas" });
  }
});

router.post("/api/automated-rules", requireAuth, async (req, res) => {
  try {
    const ruleData = insertAutomatedRuleSchema.parse({
      ...req.body,
      userId: req.session.userId
    });
    
    const rule = await storage.createAutomatedRule(ruleData);
    res.json(rule);
  } catch (error) {
    console.error("Create automated rule error:", error);
    res.status(400).json({ error: "Falha ao criar regra automatizada" });
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Registrar todas as rotas
  app.use(router);

  const httpServer = createServer(app);
  return httpServer;
}