import { z } from "zod";

const serverEnvSchema = z.object({
  ENV_TYPE: z.enum(["dev", "build", "vercel"]).default("dev"),
  GITHUB_OWNER: z.string().optional(),
  GITHUB_REPO: z.string().optional(),
  GITHUB_TOKEN: z.string().optional(),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

export const serverEnv = serverEnvSchema.parse(import.meta.env);
