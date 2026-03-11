import { Card, CardTitle } from '@/components/ui/card';

export function AccessState({ title, message }: { title: string; message: string }) {
  return (
    <div className="mx-auto mt-16 max-w-2xl px-6">
      <Card>
        <CardTitle>{title}</CardTitle>
        <p className="mt-2 text-zinc-400">{message}</p>
      </Card>
    </div>
  );
}
