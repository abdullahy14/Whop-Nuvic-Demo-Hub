import { z } from 'zod';
import { getEnv } from '@/lib/env';
import { createApp, retrieveApp, updateApp } from '@/lib/whop/apps';

const argSchema = z.object({
  dryRun: z.boolean()
});

const args = argSchema.parse({ dryRun: process.argv.includes('--dry-run') || !process.argv.includes('--apply') });

async function main() {
  const env = getEnv();
  const desired = {
    name: 'Nuvic Demo Hub',
    description: 'Private owner-only Whop dashboard app.',
    app_status: env.WHOP_APP_STATUS,
    base_url: env.NEXT_PUBLIC_APP_URL,
    dashboard_path: '/dashboard/[companyId]',
    experience_path: '/experiences/[experienceId]',
    discover_path: '/discover'
  };

  console.log(`[sync-whop-app] mode=${args.dryRun ? 'dry-run' : 'apply'}`);

  try {
    const current = await retrieveApp(env.WHOP_APP_ID);
    console.log('[sync-whop-app] current app:', current);

    if (args.dryRun) {
      console.log('[sync-whop-app] desired patch:', desired);
      return;
    }

    const updated = await updateApp(env.WHOP_APP_ID, desired);
    console.log('[sync-whop-app] updated app:', updated);
  } catch (error) {
    if (args.dryRun) {
      console.log('[sync-whop-app] app not found; would create with:', desired);
      return;
    }

    const created = await createApp(desired);
    console.log('[sync-whop-app] created app:', created);
  }
}

void main();
