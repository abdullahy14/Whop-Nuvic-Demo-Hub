import { headers } from 'next/headers';
import { getEnv } from '@/lib/env';
import { getCurrentWhopUser } from '@/lib/whop/users';
import type { WhopAuthContext } from '@/types/whop';

const TOKEN_HEADERS = ['x-whop-user-token', 'x-whop-token', 'authorization'] as const;

export function parseWhopTokenFromHeaders(headerMap: Headers): string | null {
  for (const key of TOKEN_HEADERS) {
    const value = headerMap.get(key);
    if (!value) continue;
    if (key === 'authorization') {
      return value.replace(/^Bearer\s+/i, '').trim();
    }
    return value.trim();
  }
  return null;
}

export async function requireWhopUser(headerMap?: Headers): Promise<WhopAuthContext> {
  const sourceHeaders = headerMap ?? (await headers());
  const token = parseWhopTokenFromHeaders(sourceHeaders);

  if (!token) {
    throw new Error('Unauthorized: missing Whop embedded user token header');
  }

  const user = await getCurrentWhopUser(token);
  return { user, token };
}

export async function requireOwner(headerMap?: Headers): Promise<WhopAuthContext> {
  const env = getEnv();
  const ctx = await requireWhopUser(headerMap);

  if (ctx.user.id !== env.OWNER_WHOP_USER_ID) {
    throw new Error('Forbidden: this app is restricted to the configured owner account');
  }

  return ctx;
}
