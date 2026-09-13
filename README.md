# EasyWork

EasyWork is an ODC operating platform for verified workers and businesses. It is intentionally **not** a job portal or freelancer marketplace.

## Product demo
The frontend is a polished, self-contained React + TypeScript pitch environment featuring:

- Worker ODC discovery, lobby, confirmation, secured payment, transport, check-in/out, earnings, safety and certified profile.
- Devanture Technologies business console with ODC/lobby worker review and operational metrics.
- EasyWork admin command center with transport dispatch, live operations, safety and verification surfaces.
- Responsive mobile worker UX and desktop operations UX.
- Motion for interaction polish, Lenis smooth scrolling, accessible controls and reduced-motion support.
- PWA manifest and Playwright E2E smoke tests.

## Demo roles
Use the **Demo account** menu in the top bar to switch between Worker, Business and Admin. There is intentionally no driver login.

Business demo identity: `demo@devanture.easywork.test`
Business demo password: `EasyWorkDemo2026!`

These are frontend-only demo credentials and are not production secrets.

## Local development

```bash
npm install
npm run dev
```

Build with:

```bash
npm run build
```

Run E2E tests:

```bash
npm test
```

## Architecture notes
The current repo is a greenfield demonstration and keeps all domain/demo state behind typed interfaces in `src/main.tsx` so the service boundaries can later be extracted into `services/` and backed by Supabase. Production authentication, payments, maps and dispatch APIs are intentionally not claimed as implemented.

## Next backend seams
Suggested Supabase domains: auth, workers, businesses, odcs, lobbies, lobby_workers, payments, drivers, trips, attendance, incidents and verification.
