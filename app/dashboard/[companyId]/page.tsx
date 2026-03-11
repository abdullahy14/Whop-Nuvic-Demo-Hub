import { headers } from 'next/headers';
import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { AccessState } from '@/components/shared/access-state';
import { getEnv } from '@/lib/env';
import { mapGuardError } from '@/lib/guards';
import { requireCompanyDashboardAccess } from '@/lib/whop/access';
import { retrieveApp } from '@/lib/whop/apps';
import { getUserMemberships } from '@/lib/whop/memberships';

export default async function DashboardPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;

  try {
    const userContext = await requireCompanyDashboardAccess(await headers(), companyId);
    const [app, memberships] = await Promise.all([retrieveApp(), getUserMemberships(userContext.user.id)]);
    const env = getEnv();

    return (
      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-6 text-3xl font-semibold">Nuvic Demo Hub Dashboard</h1>
        <DashboardOverview
          user={userContext.user}
          companyId={companyId}
          appId={app.id}
          appStatus={app.app_status ?? env.WHOP_APP_STATUS}
          memberships={memberships}
          envChecklist={[
            { name: 'WHOP_API_KEY', ready: !!env.WHOP_API_KEY },
            { name: 'WHOP_APP_ID', ready: !!env.WHOP_APP_ID },
            { name: 'OWNER_WHOP_USER_ID', ready: !!env.OWNER_WHOP_USER_ID },
            { name: 'NEXT_PUBLIC_APP_URL', ready: !!env.NEXT_PUBLIC_APP_URL }
          ]}
        />
      </main>
    );
  } catch (error) {
    const mapped = mapGuardError(error);
    if (mapped === 'unauthorized') {
      return <AccessState title="Unauthorized" message="Missing or invalid embedded Whop token." />;
    }

    return <AccessState title="Forbidden" message="Only the configured owner can access this dashboard/company." />;
  }
}
