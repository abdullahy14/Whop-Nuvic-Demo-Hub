import { NextResponse } from 'next/server';
import { requireWhopUser } from '@/lib/whop/auth';

export async function GET(request: Request) {
  try {
    const context = await requireWhopUser(request.headers);
    return NextResponse.json({ ok: true, user: context.user });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unauthorized' }, { status: 401 });
  }
}
