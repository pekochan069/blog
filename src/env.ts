import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    ENV_TYPE: z.enum(["dev", "build", "vercel"]).default("dev"),
  },
  runtimeEnv: import.meta.env,
});
