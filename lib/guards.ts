export type GuardErrorType = 'unauthorized' | 'forbidden';

export function mapGuardError(error: unknown): GuardErrorType {
  if (error instanceof Error && error.message.toLowerCase().includes('unauthorized')) {
    return 'unauthorized';
  }
  return 'forbidden';
}
