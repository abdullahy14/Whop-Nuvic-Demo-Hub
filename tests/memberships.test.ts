import { describe, expect, it } from 'vitest';
import { normalizeMembership } from '@/lib/whop/memberships';

describe('normalizeMembership', () => {
  it('maps active status booleans', () => {
    const membership = normalizeMembership({ id: 'm1', user_id: 'u1', status: 'active' });
    expect(membership.isActive).toBe(true);
    expect(membership.isTrialing).toBe(false);
    expect(membership.isPastDue).toBe(false);
    expect(membership.isExpired).toBe(false);
  });

  it('maps unknown status safely', () => {
    const membership = normalizeMembership({ id: 'm1', user_id: 'u1', status: 'mystery' });
    expect(membership.status).toBe('unknown');
  });
});
