import { z } from 'zod';
import { createWhopClient } from '@/lib/whop/client';
import type { NormalizedMembership, WhopMembership } from '@/types/whop';

const membershipSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  company_id: z.string().optional(),
  product_id: z.string().optional(),
  plan_id: z.string().optional(),
  status: z.string(),
  created_at: z.string().optional()
});

const membershipListSchema = z.array(membershipSchema);

function normalizeStatus(raw: string): WhopMembership['status'] {
  if (raw === 'active' || raw === 'trialing' || raw === 'past_due' || raw === 'expired') return raw;
  return 'unknown';
}

export function normalizeMembership(m: z.infer<typeof membershipSchema>): NormalizedMembership {
  const status = normalizeStatus(m.status);
  return {
    ...m,
    status,
    isActive: status === 'active',
    isTrialing: status === 'trialing',
    isPastDue: status === 'past_due',
    isExpired: status === 'expired'
  };
}

export async function listMemberships(userId?: string): Promise<NormalizedMembership[]> {
  const client = createWhopClient();
  const query = userId ? `?user_id=${encodeURIComponent(userId)}` : '';
  const result = await client.get(`/memberships${query}`);
  return membershipListSchema.parse(result).map(normalizeMembership);
}

export async function retrieveMembership(membershipId: string): Promise<NormalizedMembership> {
  const client = createWhopClient();
  const result = await client.get(`/memberships/${membershipId}`);
  return normalizeMembership(membershipSchema.parse(result));
}

export async function getUserMemberships(userId: string): Promise<NormalizedMembership[]> {
  return listMemberships(userId);
}

export async function getActiveMemberships(userId: string): Promise<NormalizedMembership[]> {
  const memberships = await getUserMemberships(userId);
  return memberships.filter((membership) => membership.isActive || membership.isTrialing);
}

export async function userHasAnyActiveMembership(userId: string): Promise<boolean> {
  const activeMemberships = await getActiveMemberships(userId);
  return activeMemberships.length > 0;
}

export async function userHasProductAccess(userId: string, productId: string): Promise<boolean> {
  const activeMemberships = await getActiveMemberships(userId);
  return activeMemberships.some((membership) => membership.product_id === productId);
}

export async function userHasPlanAccess(userId: string, planId: string): Promise<boolean> {
  const activeMemberships = await getActiveMemberships(userId);
  return activeMemberships.some((membership) => membership.plan_id === planId);
}
