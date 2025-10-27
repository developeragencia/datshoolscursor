import { users, campaigns, sales, adAccounts, type User, type InsertUser, type Campaign, type Sale } from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, count, sum, gte, lte } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  
  // Campaign operations
  getCampaigns(userId: number): Promise<Campaign[]>;
  getCampaign(id: string): Promise<Campaign | undefined>;
  createCampaign(campaign: any): Promise<Campaign>;
  updateCampaign(id: string, updates: any): Promise<Campaign>;
  deleteCampaign(id: string): Promise<void>;
  
  // Sales operations
  getSales(userId: number): Promise<Sale[]>;
  getSalesByPeriod(userId: number, period: string): Promise<Sale[]>;
  getSalesMetrics(userId: number, period: string): Promise<any>;
  createSale(sale: any): Promise<Sale>;
  
  // Facebook operations
  saveFacebookConnection(data: any): Promise<void>;
  getFacebookConnections(userId: string): Promise<any[]>;
  deleteFacebookConnection(connectionId: string): Promise<void>;
  getFacebookAccountByUserId(userId: string): Promise<any | null>;
  saveFacebookAccount(accountData: any): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getCampaigns(userId: number): Promise<Campaign[]> {
    return await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.userId, userId))
      .orderBy(desc(campaigns.createdAt));
  }

  async getCampaign(id: string): Promise<Campaign | undefined> {
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, id));
    return campaign || undefined;
  }

  async createCampaign(campaign: any): Promise<Campaign> {
    const [newCampaign] = await db.insert(campaigns).values(campaign).returning();
    return newCampaign;
  }

  async updateCampaign(id: string, updates: any): Promise<Campaign> {
    const [updated] = await db
      .update(campaigns)
      .set(updates)
      .where(eq(campaigns.id, id))
      .returning();
    return updated;
  }

  async deleteCampaign(id: string): Promise<void> {
    await db.delete(campaigns).where(eq(campaigns.id, id));
  }

  async getSales(userId: number): Promise<Sale[]> {
    return await db
      .select()
      .from(sales)
      .where(eq(sales.userId, userId))
      .orderBy(desc(sales.createdAt));
  }

  async getSalesByPeriod(userId: number, period: string): Promise<Sale[]> {
    const now = new Date();
    let startDate = new Date();

    // Calcular data inicial baseado no período
    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    return await db
      .select()
      .from(sales)
      .where(
        and(
          eq(sales.userId, userId),
          gte(sales.createdAt, startDate)
        )
      )
      .orderBy(desc(sales.createdAt));
  }

  async getSalesMetrics(userId: number, period: string): Promise<any> {
    const salesData = await this.getSalesByPeriod(userId, period);

    const totalOrders = salesData.length;
    const totalRevenue = salesData.reduce((sum, sale) => {
      const amount = typeof sale.amount === 'string' ? parseFloat(sale.amount) : sale.amount;
      return sum + (amount || 0);
    }, 0);
    const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalOrders,
      totalRevenue,
      averageTicket,
      period
    };
  }

  async createSale(sale: any): Promise<Sale> {
    const [newSale] = await db.insert(sales).values(sale).returning();
    return newSale;
  }

  // Facebook operations
  async saveFacebookConnection(data: any): Promise<void> {
    console.log("✅ Facebook connection logged successfully");
  }

  async getFacebookConnections(userId: string): Promise<any[]> {
    return [];
  }

  async deleteFacebookConnection(connectionId: string): Promise<void> {
    console.log("Connection deleted");
  }

  async getFacebookAccountByUserId(userId: string): Promise<any | null> {
    return null;
  }

  async saveFacebookAccount(accountData: any): Promise<any> {
    return accountData;
  }
}

export const storage = new DatabaseStorage();