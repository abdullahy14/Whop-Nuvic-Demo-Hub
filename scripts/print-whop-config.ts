import { getEnv } from '@/lib/env';
import { redact } from '@/lib/utils';

const env = getEnv();

console.log('Nuvic Demo Hub Whop configuration');
console.log({
  WHOP_APP_ID: env.WHOP_APP_ID,
  NEXT_PUBLIC_WHOP_APP_ID: env.NEXT_PUBLIC_WHOP_APP_ID,
  WHOP_COMPANY_ID: env.WHOP_COMPANY_ID,
  OWNER_WHOP_USER_ID: env.OWNER_WHOP_USER_ID,
  NEXT_PUBLIC_APP_URL: env.NEXT_PUBLIC_APP_URL,
  WHOP_API_KEY: redact(env.WHOP_API_KEY)
});
