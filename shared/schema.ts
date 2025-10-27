import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  decimal,
  boolean,
  uuid,
  serial,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username").unique(),
  email: varchar("email").unique(),
  password: varchar("password").notNull(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  planType: varchar("plan_type").default("gratuito"), // gratuito, premium, avancado, monster
  planStatus: varchar("plan_status").default("active"), // active, cancelled, expired
  planStartDate: timestamp("plan_start_date").defaultNow(),
  planEndDate: timestamp("plan_end_date"),
  maxCampaigns: integer("max_campaigns").default(3), // Limite baseado no plano
  maxVisitors: integer("max_visitors").default(1000), // Visitantes mensais permitidos
  hasAdvancedReports: boolean("has_advanced_reports").default(false),
  hasUTMTracking: boolean("has_utm_tracking").default(false),
  hasAutomation: boolean("has_automation").default(false),
  hasAPIAccess: boolean("has_api_access").default(false),
  hasPrioritySupport: boolean("has_priority_support").default(false),
  hasMultipleDashboards: boolean("has_multiple_dashboards").default(false),
  hasAllIntegrations: boolean("has_all_integrations").default(false),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Ad Accounts table - Facebook, Google, TikTok accounts
export const adAccounts = pgTable("ad_accounts", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: integer("user_id").references(() => users.id).notNull(),
  platform: varchar("platform").notNull(), // meta_ads, google_ads, tiktok_ads
  accountId: varchar("account_id").notNull(),
  accountName: varchar("account_name").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  status: varchar("status").default("active"), // active, inactive, error
  lastSync: timestamp("last_sync"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Platform Integrations table - Store user platform connections
export const platformIntegrations = pgTable("platform_integrations", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: integer("user_id").references(() => users.id).notNull(),
  platform: varchar("platform").notNull(), // hotmart, kiwify, eduzz, shopify, etc
  platformId: varchar("platform_id"), // Platform-specific identifier
  credentials: jsonb("credentials"), // Encrypted credentials (API keys, tokens, etc.)
  isConnected: boolean("is_connected").default(false),
  status: varchar("status").default("active"), // active, inactive, error
  lastSync: timestamp("last_sync"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Campaigns table
export const campaigns = pgTable("campaigns", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: integer("user_id").references(() => users.id).notNull(),
  adAccountId: uuid("ad_account_id").references(() => adAccounts.id).notNull(),
  campaignId: varchar("campaign_id").notNull(), // External platform campaign ID
  name: varchar("name").notNull(),
  platform: varchar("platform").notNull(), // meta_ads, google_ads, tiktok_ads
  status: varchar("status").default("active"), // active, paused, ended
  campaignType: varchar("campaign_type"), // search, display, video, shopping
  budget: decimal("budget", { precision: 10, scale: 2 }),
  budgetType: varchar("budget_type").default("daily"), // daily, lifetime
  spent: decimal("spent", { precision: 10, scale: 2 }).default("0"),
  impressions: integer("impressions").default(0),
  clicks: integer("clicks").default(0),
  ctr: decimal("ctr", { precision: 5, scale: 2 }).default("0"),
  cpm: decimal("cpm", { precision: 10, scale: 2 }).default("0"),
  cpc: decimal("cpc", { precision: 10, scale: 2 }).default("0"),
  conversions: integer("conversions").default(0),
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 2 }).default("0"),
  revenue: decimal("revenue", { precision: 10, scale: 2 }).default("0"),
  roas: decimal("roas", { precision: 10, scale: 2 }).default("0"),
  utmCampaign: varchar("utm_campaign"),
  utmSource: varchar("utm_source"),
  utmMedium: varchar("utm_medium"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Sales table
export const sales = pgTable("sales", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: integer("user_id").references(() => users.id).notNull(),
  campaignId: uuid("campaign_id").references(() => campaigns.id),
  orderId: varchar("order_id").notNull(),
  productName: varchar("product_name").notNull(),
  customerEmail: varchar("customer_email"),
  customerName: varchar("customer_name"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  platform: varchar("platform").notNull(), // hotmart, kiwify, eduzz, shopify, stripe
  status: varchar("status").default("approved"), // approved, cancelled, refunded, pending
  utmSource: varchar("utm_source"),
  utmMedium: varchar("utm_medium"),
  utmCampaign: varchar("utm_campaign"),
  utmContent: varchar("utm_content"),
  utmTerm: varchar("utm_term"),
  conversionDate: timestamp("conversion_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Dashboards table - Multiple dashboard configurations
export const dashboards = pgTable("dashboards", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: varchar("name").notNull(),
  description: text("description"),
  config: jsonb("config").notNull(), // Dashboard configuration
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Webhooks table - Integration webhooks
export const webhooks = pgTable("webhooks", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: integer("user_id").references(() => users.id).notNull(),
  platform: varchar("platform").notNull(), // hotmart, kiwify, eduzz, shopify
  webhookUrl: text("webhook_url").notNull(),
  secret: varchar("secret"),
  events: text("events").array(), // Array of event types
  status: varchar("status").default("active"), // active, inactive, error
  lastTriggered: timestamp("last_triggered"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Automated Rules table
export const automatedRules = pgTable("automated_rules", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: integer("user_id").references(() => users.id).notNull(),
  campaignId: uuid("campaign_id").references(() => campaigns.id),
  name: varchar("name").notNull(),
  description: text("description"),
  conditions: jsonb("conditions").notNull(), // Rule conditions
  actions: jsonb("actions").notNull(), // Actions to take
  isActive: boolean("is_active").default(true),
  lastExecuted: timestamp("last_executed"),
  executionCount: integer("execution_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// UTM Links table
export const utmLinks = pgTable("utm_links", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: integer("user_id").references(() => users.id).notNull(),
  campaignId: uuid("campaign_id").references(() => campaigns.id),
  name: varchar("name").notNull(),
  originalUrl: text("original_url").notNull(),
  shortUrl: varchar("short_url").unique(),
  utmSource: varchar("utm_source").notNull(),
  utmMedium: varchar("utm_medium").notNull(),
  utmCampaign: varchar("utm_campaign").notNull(),
  utmContent: varchar("utm_content"),
  utmTerm: varchar("utm_term"),
  clicks: integer("clicks").default(0),
  conversions: integer("conversions").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Pixels table
export const pixels = pgTable("pixels", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: varchar("name").notNull(),
  platform: varchar("platform").notNull(), // facebook, google, tiktok, custom
  pixelId: varchar("pixel_id").notNull(),
  domain: varchar("domain"),
  events: text("events").array().default([]), // Array of event types
  description: text("description"),
  isActive: boolean("is_active").default(true),
  eventsTracked: integer("events_tracked").default(0),
  lastEvent: timestamp("last_event"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  adAccounts: many(adAccounts),
  campaigns: many(campaigns),
  sales: many(sales),
  dashboards: many(dashboards),
  webhooks: many(webhooks),
  automatedRules: many(automatedRules),
  utmLinks: many(utmLinks),
  pixels: many(pixels),
  platformIntegrations: many(platformIntegrations),
}));

export const adAccountsRelations = relations(adAccounts, ({ one, many }) => ({
  user: one(users, {
    fields: [adAccounts.userId],
    references: [users.id],
  }),
  campaigns: many(campaigns),
}));

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  user: one(users, {
    fields: [campaigns.userId],
    references: [users.id],
  }),
  adAccount: one(adAccounts, {
    fields: [campaigns.adAccountId],
    references: [adAccounts.id],
  }),
  sales: many(sales),
  automatedRules: many(automatedRules),
  utmLinks: many(utmLinks),
}));

export const salesRelations = relations(sales, ({ one }) => ({
  user: one(users, {
    fields: [sales.userId],
    references: [users.id],
  }),
  campaign: one(campaigns, {
    fields: [sales.campaignId],
    references: [campaigns.id],
  }),
}));

export const dashboardsRelations = relations(dashboards, ({ one }) => ({
  user: one(users, {
    fields: [dashboards.userId],
    references: [users.id],
  }),
}));

export const webhooksRelations = relations(webhooks, ({ one }) => ({
  user: one(users, {
    fields: [webhooks.userId],
    references: [users.id],
  }),
}));

export const automatedRulesRelations = relations(automatedRules, ({ one }) => ({
  user: one(users, {
    fields: [automatedRules.userId],
    references: [users.id],
  }),
  campaign: one(campaigns, {
    fields: [automatedRules.campaignId],
    references: [campaigns.id],
  }),
}));

export const utmLinksRelations = relations(utmLinks, ({ one }) => ({
  user: one(users, {
    fields: [utmLinks.userId],
    references: [users.id],
  }),
  campaign: one(campaigns, {
    fields: [utmLinks.campaignId],
    references: [campaigns.id],
  }),
}));

export const pixelsRelations = relations(pixels, ({ one }) => ({
  user: one(users, {
    fields: [pixels.userId],
    references: [users.id],
  }),
}));

export const platformIntegrationsRelations = relations(platformIntegrations, ({ one }) => ({
  user: one(users, {
    fields: [platformIntegrations.userId],
    references: [users.id],
  }),
}));

// Zod Schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAdAccountSchema = createInsertSchema(adAccounts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastSync: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSaleSchema = createInsertSchema(sales).omit({
  id: true,
  createdAt: true,
});

export const insertDashboardSchema = createInsertSchema(dashboards).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWebhookSchema = createInsertSchema(webhooks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastTriggered: true,
});

export const insertAutomatedRuleSchema = createInsertSchema(automatedRules).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastExecuted: true,
  executionCount: true,
});

export const insertUtmLinkSchema = createInsertSchema(utmLinks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  clicks: true,
  conversions: true,
  shortUrl: true,
});

export const insertPlatformIntegrationSchema = createInsertSchema(platformIntegrations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastSync: true,
});

export const insertPixelSchema = createInsertSchema(pixels).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  eventsTracked: true,
  lastEvent: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Referrals table - Sistema de indicações
export const referrals = pgTable("referrals", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  referrerUserId: integer("referrer_user_id").references(() => users.id).notNull(),
  referredUserId: integer("referred_user_id").references(() => users.id),
  referralCode: varchar("referral_code").notNull().unique(),
  email: varchar("email"), // Email do indicado antes de se registrar
  status: varchar("status").default("pending"), // pending, registered, converted, cancelled
  conversionValue: decimal("conversion_value", { precision: 10, scale: 2 }).default("0"),
  commissionRate: decimal("commission_rate", { precision: 5, scale: 2 }).default("30.00"), // 30% padrão
  commissionPaid: decimal("commission_paid", { precision: 10, scale: 2 }).default("0"),
  registeredAt: timestamp("registered_at"),
  convertedAt: timestamp("converted_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type InsertReferral = typeof referrals.$inferInsert;
export type Referral = typeof referrals.$inferSelect;
export type AdAccount = typeof adAccounts.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
export type Sale = typeof sales.$inferSelect;
export type Dashboard = typeof dashboards.$inferSelect;
export type PlatformIntegration = typeof platformIntegrations.$inferSelect;
export type InsertPlatformIntegration = typeof platformIntegrations.$inferInsert;
export type Webhook = typeof webhooks.$inferSelect;
export type AutomatedRule = typeof automatedRules.$inferSelect;
export type UtmLink = typeof utmLinks.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertAdAccount = z.infer<typeof insertAdAccountSchema>;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type InsertSale = z.infer<typeof insertSaleSchema>;
export type InsertDashboard = z.infer<typeof insertDashboardSchema>;
export type InsertWebhook = z.infer<typeof insertWebhookSchema>;
export type InsertAutomatedRule = z.infer<typeof insertAutomatedRuleSchema>;
export type InsertUtmLink = z.infer<typeof insertUtmLinkSchema>;// Nova tabela Facebook
export const facebookAccounts = pgTable("facebook_accounts", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  accountId: varchar("account_id").notNull().unique(),
  accessToken: text("access_token").notNull(),
  appId: varchar("app_id"),
  status: varchar("status").notNull().default("connected"),
  lastSync: timestamp("last_sync"),
  adAccounts: jsonb("ad_accounts").default([]),
  permissions: jsonb("permissions").default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type InsertFacebookAccount = typeof facebookAccounts.$inferInsert;
export type FacebookAccount = typeof facebookAccounts.$inferSelect;
