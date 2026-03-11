import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireWhopUser } from '@/lib/whop/auth';
import { getUserMemberships } from '@/lib/whop/memberships';

const querySchema = z.object({
  status: z.string().optional(),
  productId: z.string().optional(),
  planId: z.string().optional()
});

export async function GET(request: Request) {
  try {
    const context = await requireWhopUser(request.headers);
    const query = querySchema.parse(Object.fromEntries(new URL(request.url).searchParams.entries()));

    let memberships = await getUserMemberships(context.user.id);

    if (query.status) memberships = memberships.filter((m) => m.status === query.status);
    if (query.productId) memberships = memberships.filter((m) => m.product_id === query.productId);
    if (query.planId) memberships = memberships.filter((m) => m.plan_id === query.planId);

    return NextResponse.json({ ok: true, memberships });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unauthorized' }, { status: 401 });
  }
}
