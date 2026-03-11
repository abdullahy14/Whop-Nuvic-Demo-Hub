# Nuvic Demo Hub

Private, production-ready Whop web app built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui primitives, Zod, and the official Whop SDK package.

## Features
- Embedded Whop auth verification from request headers (no traditional login screen).
- Single-owner lock via `OWNER_WHOP_USER_ID`.
- Whop service wrappers isolated in `lib/whop/*`.
- Dashboard-focused route architecture with discover/experience paths ready for Whop config.
- Internal app metadata sync script with dry-run safety.

## Tech Stack
- Next.js + TypeScript + App Router
- Tailwind CSS + shadcn/ui-style components
- `@whop/sdk`
- Zod
- Vitest
- ESLint + Prettier

## Local Setup
1. Clone repo
   ```bash
   git clone <your-repo-url>
   cd Whop-Nuvic-Demo-Hub
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Create environment file
   ```bash
   cp .env.example .env.local
   ```
4. Fill `.env.local` with values from Whop Developer Dashboard.
5. Run locally
   ```bash
   npm run dev
   ```
6. Open `http://localhost:3000`.

## Required Environment Variables
- `WHOP_API_KEY`
- `WHOP_APP_ID`
- `NEXT_PUBLIC_WHOP_APP_ID`
- `WHOP_COMPANY_ID`
- `OWNER_WHOP_USER_ID`
- `NEXT_PUBLIC_APP_URL`

Optional:
- `WHOP_APP_STATUS=hidden`
- `WHOP_ENABLE_DISCOVER=false`
- `WHOP_ENABLE_EXPERIENCE=true`
- `WHOP_ENABLE_DASHBOARD=true`

## Whop Developer Dashboard Configuration
After deploying to Vercel, set:
- **Base URL** = your Vercel production URL
- **Dashboard path** = `/dashboard/[companyId]`
- **Experience path** = `/experiences/[experienceId]`
- **Discover path** = `/discover` (optional)

## Deployment (Vercel)
1. Push repo to GitHub.
2. Import project in Vercel.
3. Add all environment variables in Vercel project settings.
4. Deploy.
5. Copy Vercel production URL into Whop app `base_url`.

## Scripts
- `npm run print:whop-config` — prints non-secret config with API key redacted.
- `npm run sync:whop-app -- --dry-run` — show intended app metadata changes only.
- `npm run sync:whop-app -- --apply` — update/create app metadata on Whop.

## How to Publish
1. Verify production env vars in Vercel.
2. Deploy and confirm `/api/internal/health` returns `ok: true`.
3. Configure Whop app paths exactly.
4. Keep app hidden/unlisted for private owner-only usage.

## Security Notes
- Protected data is verified server-side via embedded Whop token headers.
- Client-provided user IDs are never trusted for authorization decisions.
- Guard helpers are centralized in `lib/whop/auth.ts` and `lib/whop/access.ts`.
