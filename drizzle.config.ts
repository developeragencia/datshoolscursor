import { defineConfig } from "drizzle-kit";

const getDatabaseUrl = () => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL not set in drizzle.config. Available env vars:", Object.keys(process.env));
    throw new Error("DATABASE_URL, ensure the database is provisioned");
  }
  return dbUrl;
};

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
});
