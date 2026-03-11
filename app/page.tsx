import Link from 'next/link';
import { Card, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <Card>
        <CardTitle>Nuvic Demo Hub</CardTitle>
        <p className="mt-3 text-zinc-400">Production-ready private Whop app with owner-only dashboard flow.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/discover" className="text-sm text-zinc-200 underline">
            Discover route
          </Link>
        </div>
      </Card>
    </main>
  );
}
