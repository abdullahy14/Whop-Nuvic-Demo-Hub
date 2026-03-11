import { getEnv } from '@/lib/env';
import { getActiveMemberships, userHasAnyActiveMembership, userHasPlanAccess, userHasProductAccess } from '@/lib/whop/memberships';
import { requireOwner, requireWhopUser } from '@/lib/whop/auth';

export async function requireCompanyDashboardAccess(headerMap: Headers, companyId: string) {
  const env = getEnv();
  const owner = await requireOwner(headerMap);

  if (companyId !== env.WHOP_COMPANY_ID) {
    throw new Error('Forbidden: company mismatch for dashboard view');
  }

  return owner;
}

export async function requireExperienceAccess(headerMap: Headers, _experienceId: string) {
  const userCtx = await requireWhopUser(headerMap);
  const hasActiveMembership = await userHasAnyActiveMembership(userCtx.user.id);

  if (!hasActiveMembership) {
    throw new Error('Forbidden: no active membership for this experience');
  }

  return userCtx;
}

export async function buildAccessDecision(args: {
  headers: Headers;
  companyId?: string;
  productId?: string;
  planId?: string;
  experienceId?: string;
}) {
  const { user } = await requireWhopUser(args.headers);

  const checks = {
    owner: user.id === getEnv().OWNER_WHOP_USER_ID,
    company: args.companyId ? args.companyId === getEnv().WHOP_COMPANY_ID : true,
    product: args.productId ? await userHasProductAccess(user.id, args.productId) : true,
    plan: args.planId ? await userHasPlanAccess(user.id, args.planId) : true,
    experience: args.experienceId ? (await getActiveMemberships(user.id)).length > 0 : true
  };

  return {
    userId: user.id,
    checks,
    allowed: Object.values(checks).every(Boolean)
  };
}
