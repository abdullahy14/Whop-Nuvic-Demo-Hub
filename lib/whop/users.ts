import { z } from 'zod';
import { createWhopClient } from '@/lib/whop/client';
import type { WhopUser } from '@/types/whop';

const userSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional()
});

export async function retrieveUser(userId: string): Promise<WhopUser> {
  const client = createWhopClient();
  const result = await client.get(`/users/${userId}`);
  return userSchema.parse(result);
}

export async function getCurrentWhopUser(token: string): Promise<WhopUser> {
  const client = createWhopClient();
  const result = await client.get('/me', token);
  return userSchema.parse(result);
}
