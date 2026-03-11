import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  WHOP_API_KEY: z.string().min(1),
  WHOP_APP_ID: z.string().min(1),
  NEXT_PUBLIC_WHOP_APP_ID: z.string().min(1),
  WHOP_COMPANY_ID: z.string().min(1),
  OWNER_WHOP_USER_ID: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  WHOP_APP_STATUS: z.string().default('hidden'),
  WHOP_ENABLE_DISCOVER: z.string().default('false'),
  WHOP_ENABLE_EXPERIENCE: z.string().default('true'),
  WHOP_ENABLE_DASHBOARD: z.string().default('true')
});

export type AppEnv = z.infer<typeof envSchema>;

export function getEnv(): AppEnv {
  return envSchema.parse(process.env);
}

export function safeEnvSnapshot() {
  const env = getEnv();
  return {
    NODE_ENV: env.NODE_ENV,
    WHOP_APP_ID: env.WHOP_APP_ID,
    NEXT_PUBLIC_WHOP_APP_ID: env.NEXT_PUBLIC_WHOP_APP_ID,
    WHOP_COMPANY_ID: env.WHOP_COMPANY_ID,
    OWNER_WHOP_USER_ID: env.OWNER_WHOP_USER_ID,
    NEXT_PUBLIC_APP_URL: env.NEXT_PUBLIC_APP_URL,
    WHOP_APP_STATUS: env.WHOP_APP_STATUS,
    WHOP_ENABLE_DISCOVER: env.WHOP_ENABLE_DISCOVER,
    WHOP_ENABLE_EXPERIENCE: env.WHOP_ENABLE_EXPERIENCE,
    WHOP_ENABLE_DASHBOARD: env.WHOP_ENABLE_DASHBOARD
  };
}
