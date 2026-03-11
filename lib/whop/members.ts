import { z } from 'zod';
import { createWhopClient } from '@/lib/whop/client';

const memberSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  company_id: z.string().optional(),
  status: z.string().optional()
});

const listSchema = z.array(memberSchema);

export type WhopMember = z.infer<typeof memberSchema>;

export async function listMembers(companyId: string): Promise<WhopMember[]> {
  const client = createWhopClient();
  const result = await client.get(`/companies/${companyId}/members`);
  return listSchema.parse(result);
}

export async function retrieveMember(companyId: string, memberId: string): Promise<WhopMember> {
  const client = createWhopClient();
  const result = await client.get(`/companies/${companyId}/members/${memberId}`);
  return memberSchema.parse(result);
}
