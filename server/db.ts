import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const getDatabaseUrl = () => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL not set. Available env vars:", Object.keys(process.env));
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }
  return dbUrl;
};

export const pool = new Pool({ connectionString: getDatabaseUrl() });
export const db = drizzle({ client: pool, schema });