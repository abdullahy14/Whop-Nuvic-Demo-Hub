import { describe, expect, it } from 'vitest';
import { parseWhopTokenFromHeaders } from '@/lib/whop/auth';

describe('parseWhopTokenFromHeaders', () => {
  it('reads x-whop-user-token first', () => {
    const headers = new Headers({ 'x-whop-user-token': 'abc123' });
    expect(parseWhopTokenFromHeaders(headers)).toBe('abc123');
  });

  it('supports bearer authorization fallback', () => {
    const headers = new Headers({ authorization: 'Bearer test-token' });
    expect(parseWhopTokenFromHeaders(headers)).toBe('test-token');
  });
});
