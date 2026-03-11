export type MembershipStatus = 'active' | 'trialing' | 'past_due' | 'expired' | 'unknown';

export interface WhopUser {
  id: string;
  username?: string;
  name?: string;
  email?: string;
}

export interface WhopMembership {
  id: string;
  user_id: string;
  company_id?: string;
  product_id?: string;
  plan_id?: string;
  status: MembershipStatus;
  created_at?: string;
}

export interface NormalizedMembership extends WhopMembership {
  isActive: boolean;
  isTrialing: boolean;
  isPastDue: boolean;
  isExpired: boolean;
}

export interface WhopAuthContext {
  user: WhopUser;
  token: string;
}
