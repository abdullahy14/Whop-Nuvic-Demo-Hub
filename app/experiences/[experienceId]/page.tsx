import { headers } from 'next/headers';
import { AccessState } from '@/components/shared/access-state';
import { Card, CardTitle } from '@/components/ui/card';
import { mapGuardError } from '@/lib/guards';
import { requireExperienceAccess } from '@/lib/whop/access';

export default async function ExperiencePage({ params }: { params: Promise<{ experienceId: string }> }) {
  const { experienceId } = await params;

  try {
    const ctx = await requireExperienceAccess(await headers(), experienceId);

    return (
      <main className="mx-auto max-w-4xl px-6 py-20">
        <Card>
          <CardTitle>Experience Access Granted</CardTitle>
          <p className="mt-2 text-zinc-400">Experience ID: {experienceId}</p>
          <p className="mt-2 text-zinc-400">User ID: {ctx.user.id}</p>
          <p className="mt-6 text-sm text-zinc-500">This is a gated placeholder for future member experience content.</p>
        </Card>
      </main>
    );
  } catch (error) {
    const mapped = mapGuardError(error);
    if (mapped === 'unauthorized') {
      return <AccessState title="Unauthorized" message="Missing or invalid embedded Whop token." />;
    }

    return <AccessState title="Forbidden" message="Your membership does not currently grant access to this experience." />;
  }
}
