import { describe, expect, it } from 'vitest';
import { mapGuardError } from '@/lib/guards';

describe('mapGuardError', () => {
  it('maps unauthorized errors', () => {
    expect(mapGuardError(new Error('Unauthorized access'))).toBe('unauthorized');
  });

  it('maps all other errors to forbidden', () => {
    expect(mapGuardError(new Error('Forbidden access'))).toBe('forbidden');
  });
});
