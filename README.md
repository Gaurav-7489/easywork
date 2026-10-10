# EasyWork — Deventure Hotel ODC pilot

A React + TypeScript, Vite-powered **interactive product demo** for the EasyWork staffing and managed transport ecosystem. Initially scoped to one Deventure Hotel location; structured for future multi-property, multi-business rollout.

## Run locally
```bash
npm install
npm run dev
# open http://localhost:5173
```
Build: `npm run build` · E2E: `npx playwright install chromium && npm test`

## Demo roles
Use **Demo account** (top right) to switch between:
- **Worker** — discover the Deventure hospitality shift, inspect payout and joining criteria, join a lobby, see assignment, pickup, check in/out, request return transport, track earnings.
- **Business** — Deventure management dashboard, create jobs, view workers, simulate prefunding, confirm the team, verify attendance, see reports.
- **Admin** — EasyWork control tower, dispatch pickup and return, workforce, safety desk, demo next-day settlement, reporting.

The business and operations consoles operate on the **same in-memory demo state** during a session. Refreshing resets data; nothing is sent to a server. Jobs created in Business appear under Worker → ODCs in the same session.

## Canonical operational workflow
```
Hotel creates shift → hotel funds required worker pay → workers apply → hotel approves
→ EasyWork dispatches pickup → worker arrives/checks in → shift worked
→ worker checks out → hotel verifies attendance → EasyWork sends return ride
→ settlement queued → worker payout next day.
```

**Critical:** Funding, proof-of-identity, attendance geolocation, dispatch, return trip, and payouts in this frontend are *simulated*. No real deposits are held and no actual rides or money transfers occur. Neither guaranteed pay nor next-day settlement can be represented as contractually assured until licensed payment partners, availability, refund logic, chargeback handling and legally reviewed agreements are implemented.

## Expandable architecture
Current demo deliberately keeps business logic in React state. Production should extract service adapters with typed contracts and a persistent database. Recommended entities: `organizations`, `properties`, `staff_users`, `workers`, `worker_verifications`, `jobs`, `applications`, `assignments`, `payment_funding_intents`, `wallet_ledger`, `driver_partners`, `ride_requests`, `ride_events`, `attendance_events`, `supervisor_approvals`, `payouts`, `incidents`, `audit_events`.

For production: enforce tenant-level authorization; operate a funding ledger backed by a licensed payments provider; avoid storing sensitive IDs in localStorage; verify webhooks and idempotency keys; use real GPS with opt-in and consent; use dispatch service adapters; perform attendance fraud checks and supervisor approvals; build a legally reviewed payout and refund policy. Source code is a client pitch/demo, not a production transaction platform.

## Pilot acceptance walk-through
1. Business → **Funding & Payments** → Simulate deposit.
2. Business → **Worker Lobby** → Confirm workers.
3. Admin → **Transport Dispatch** → Dispatch pickup.
4. Worker → **Active ODC** → Check in and check out.
5. Worker → **Active ODC** → Request return pickup.
6. Admin → **Payouts** → Simulate next-day payout.
7. Business → **Reports** → Print pilot report.

No actual payment, driver, identity, or GPS service is connected.
