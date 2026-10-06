import { z } from "zod";

const serverEnvSchema = z.object({
  ADMIN_AUTH_SECRET: z.string().optional(),
  ADMIN_ID: z.string().optional(),
  ADMIN_PASSWORD: z.string().optional(),
  ENV_TYPE: z.enum(["dev", "build", "vercel"]).default("dev"),
  GITHUB_OWNER: z.string().optional(),
  GITHUB_REPO: z.string().optional(),
  GITHUB_TOKEN: z.string().optional(),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

export const serverEnv = serverEnvSchema.parse(import.meta.env);

const publicEnvSchema = z.object({
  PUBLIC_FRONTEND_URL: z.string().default("http://localhost:4321"),
});

export const publicEnv = publicEnvSchema.parse(import.meta.env);
