import { NextResponse } from 'next/server';
import { safeEnvSnapshot } from '@/lib/env';
import { retrieveApp } from '@/lib/whop/apps';

export async function GET() {
  const snapshot = safeEnvSnapshot();

  try {
    const app = await retrieveApp();
    return NextResponse.json({
      ok: true,
      env: snapshot,
      app: {
        id: app.id,
        app_status: app.app_status,
        base_url: app.base_url,
        dashboard_path: app.dashboard_path,
        experience_path: app.experience_path,
        discover_path: app.discover_path
      }
    });
  } catch (error) {
    return NextResponse.json({ ok: false, env: snapshot, error: error instanceof Error ? error.message : 'Health check failed' }, { status: 500 });
  }
}
