import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import { Table } from '@/components/ui/table';
import type { NormalizedMembership, WhopUser } from '@/types/whop';

export function DashboardOverview({
  user,
  companyId,
  appId,
  appStatus,
  memberships,
  envChecklist
}: {
  user: WhopUser;
  companyId: string;
  appId: string;
  appStatus: string;
  memberships: NormalizedMembership[];
  envChecklist: Array<{ name: string; ready: boolean }>;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardTitle>Owner</CardTitle>
          <p className="mt-2 text-sm text-zinc-300">{user.name ?? user.username ?? user.id}</p>
          <p className="text-xs text-zinc-500">{user.id}</p>
        </Card>
        <Card>
          <CardTitle>Company</CardTitle>
          <p className="mt-2 text-sm text-zinc-300">{companyId}</p>
        </Card>
        <Card>
          <CardTitle>Whop App</CardTitle>
          <p className="mt-2 text-sm text-zinc-300">{appId}</p>
          <Badge className="mt-2 inline-block">{appStatus}</Badge>
        </Card>
        <Card>
          <CardTitle>Membership Stats</CardTitle>
          <p className="mt-2 text-sm text-zinc-300">Total: {memberships.length}</p>
          <p className="text-xs text-zinc-500">Active/Trialing: {memberships.filter((m) => m.isActive || m.isTrialing).length}</p>
        </Card>
      </div>

      <Card>
        <CardTitle>Recent Memberships</CardTitle>
        {memberships.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-400">No memberships found for this user yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <Table>
              <thead>
                <tr className="text-left text-zinc-500">
                  <th>ID</th><th>Status</th><th>Product</th><th>Plan</th>
                </tr>
              </thead>
              <tbody>
                {memberships.slice(0, 10).map((membership) => (
                  <tr key={membership.id} className="border-t border-border text-zinc-300">
                    <td className="py-2 pr-4">{membership.id}</td>
                    <td className="py-2 pr-4">{membership.status}</td>
                    <td className="py-2 pr-4">{membership.product_id ?? '—'}</td>
                    <td className="py-2">{membership.plan_id ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardTitle>Environment Readiness</CardTitle>
          <ul className="mt-3 space-y-2 text-sm">
            {envChecklist.map((item) => (
              <li key={item.name} className={item.ready ? 'text-emerald-400' : 'text-amber-400'}>
                {item.ready ? '✓' : '•'} {item.name}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardTitle>Quick Actions</CardTitle>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90" href="/discover">Open Discover</a>
            <a className="inline-flex items-center justify-center rounded-md bg-zinc-700 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90" href="/api/internal/health">Health Endpoint</a>
          </div>
        </Card>
      </div>
    </div>
  );
}
