import { NextResponse } from 'next/server';
import { z } from 'zod';
import { buildAccessDecision } from '@/lib/whop/access';

const querySchema = z.object({
  companyId: z.string().optional(),
  productId: z.string().optional(),
  planId: z.string().optional(),
  experienceId: z.string().optional()
});

export async function GET(request: Request) {
  try {
    const query = querySchema.parse(Object.fromEntries(new URL(request.url).searchParams.entries()));
    const decision = await buildAccessDecision({ headers: request.headers, ...query });
    return NextResponse.json({ ok: true, decision });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unauthorized' }, { status: 401 });
  }
}
