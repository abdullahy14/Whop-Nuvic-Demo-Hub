import { z } from 'zod';
import { createWhopClient } from '@/lib/whop/client';
import { getEnv } from '@/lib/env';

const appSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  app_status: z.string().optional(),
  base_url: z.string().optional(),
  dashboard_path: z.string().optional(),
  experience_path: z.string().optional(),
  discover_path: z.string().optional()
});

export type WhopApp = z.infer<typeof appSchema>;

export async function retrieveApp(appId?: string): Promise<WhopApp> {
  const client = createWhopClient();
  const env = getEnv();
  const result = await client.get(`/apps/${appId ?? env.WHOP_APP_ID}`);
  return appSchema.parse(result);
}

export async function createApp(input: {
  name: string;
  description: string;
  app_status: string;
  base_url: string;
  dashboard_path: string;
  experience_path: string;
  discover_path: string;
}): Promise<WhopApp> {
  const client = createWhopClient();
  const result = await client.post('/apps', input);
  return appSchema.parse(result);
}

export async function updateApp(appId: string, input: Partial<Omit<WhopApp, 'id'>>): Promise<WhopApp> {
  const client = createWhopClient();
  const result = await client.patch(`/apps/${appId}`, input);
  return appSchema.parse(result);
}
