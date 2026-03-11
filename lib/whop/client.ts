import * as WhopSdk from '@whop/sdk';
import { getEnv } from '@/lib/env';

export interface WhopClient {
  get: (path: string, token?: string) => Promise<unknown>;
  patch: (path: string, body: unknown) => Promise<unknown>;
  post: (path: string, body: unknown) => Promise<unknown>;
  sdk?: unknown;
}

function getSdkClient(apiKey: string): unknown {
  const asAny = WhopSdk as Record<string, unknown>;
  const maybeFactory = asAny.createWhopSdk;
  const maybeClient = asAny.WhopClient;

  if (typeof maybeFactory === 'function') {
    return (maybeFactory as (args: { apiKey: string }) => unknown)({ apiKey });
  }

  if (typeof maybeClient === 'function') {
    return new (maybeClient as new (args: { apiKey: string }) => unknown)({ apiKey });
  }

  return undefined;
}

export function createWhopClient(): WhopClient {
  const env = getEnv();
  const sdk = getSdkClient(env.WHOP_API_KEY);

  async function request(method: 'GET' | 'POST' | 'PATCH', path: string, body?: unknown, token?: string) {
    const response = await fetch(`https://api.whop.com/api/v5${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token ?? env.WHOP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      ...(body ? { body: JSON.stringify(body) } : {})
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Whop API request failed (${response.status}): ${message}`);
    }

    return response.json();
  }

  return {
    sdk,
    get: async (path: string, token?: string) => request('GET', path, undefined, token),
    post: async (path: string, body: unknown) => request('POST', path, body),
    patch: async (path: string, body: unknown) => request('PATCH', path, body)
  };
}
