# XYZ Hotel — Technical Setup and System Architecture

**Date:** 17 September 2026  
**Status:** Recommended implementation baseline; initial scaffold present  
**First delivery:** Real hotel pilot, confirmed by the user on 14 September 2026  
**Product authority:** [PRD v2](./prd.md) and [V2 decision plan](./v2-decision-plan.md)  
**Companions:** [Backend architecture](./backend.md) · [Application flow](./app-flow.md)

## 1. Readiness and scope

The product is ready for technical foundation planning. It is not yet ready for unrestricted implementation of every business workflow or for a real hotel launch. The guest experience and staff portal are agreed; several operating policies remain open. This document selects a recommended engineering baseline without representing those policies as approved.

The technical foundation has now been initiated with web and API scaffolds. [design.md](./design.md) records the approved earth-palette direction for My Stay and staff operations. The luxurious, promotional public hotel website has a separate visual concept still to be supplied. Build task-specific layouts using the PRD and application design guidelines.

The repository now contains planning material plus initial Next.js and NestJS scaffolds. This does not prove that the workspace, planned dependencies, database, authentication, worker, generated client, tests or deployment are correctly configured. Verify current files and commands before relying on the intended setup below.

### Source review and precedence

Reviewed all seven supplied source files: `prd.md`, `v2-decision-plan.md`, the OOD transcript, and the four screenshots linked in PRD §18. Current PRD decisions override the older OOD diagrams: there are four app roles, cleaners have no login, inspection is mandatory, and the owner can step in personally. The old screenshots' generic payment methods and housekeeper account are not implementation requirements.

Use the PRD for product scope, this file for overall engineering choices, `backend.md` for domain enforcement, and `app-flow.md` for journeys. A recommendation in these new files does not override an unresolved PRD policy. Record later policy decisions with a date and owner before changing affected contracts.

## 2. Recommended stack

| Layer | Selection | Purpose and boundary |
| --- | --- | --- |
| Language/runtime | TypeScript in strict mode; Node.js active LTS | One language across web, API and background work; use one verified runtime in development and deployment. |
| Workspace | pnpm workspaces, one repository and lockfile | Share API types and development tooling without mixing business logic into the browser. |
| Frontend | Next.js App Router + React | Public hotel pages and two authenticated route areas in one responsive web application. |
| UI foundation | Tailwind CSS + selected shadcn/ui primitives | Adaptable accessible building blocks styled using `design.md` for My Stay/staff; separate public-site concept pending. |
| Forms | React Hook Form + Zod | Form state and early field feedback; backend validation remains authoritative. |
| Server data | TanStack Query | Client fetching, invalidation, retries and stale-state handling for authenticated workflows. |
| Backend | NestJS with Express adapter, ESM project | Explicit modules, authorization guards and application services for the shared hotel system. |
| Database | PostgreSQL 18, maintained patch | Transactional hotel records, relational constraints and durable events. |
| Database access | Prisma ORM 7 + PostgreSQL driver adapter + reviewed SQL migrations | Typed persistence with explicit SQL for constraints and locks not represented by the schema DSL. This is a deliberate major-version baseline, not an instruction to install unqualified latest. |
| Authentication | Better Auth, hosted inside the backend | Google guest identity; invite-only staff password accounts and database sessions. Hotel permissions remain application code. |
| HTTP contract | REST `/api/v1`, Nest OpenAPI, generated TypeScript client | One versioned contract consumed by both interfaces. Auth retains its own `/api/auth` routes. |
| Live updates | Nest server-sent events (SSE), REST refetch | Notify relevant screens that data changed; the database and REST response remain authoritative. |
| Background work | Separate worker process from the same backend codebase; PostgreSQL outbox | Durable notifications, expiry and reconciliation without introducing microservices. |
| Quality | Vitest, Testing Library, Supertest, Playwright, axe-core | Domain tests, real-database API tests, connected browser journeys and accessibility checks. |
| Tooling | ESLint, Prettier, TypeScript checks | Consistent code and explicit CI checks. |
| Local infrastructure | Docker Compose | PostgreSQL and a development email capture service; optional full-stack containers. |
| Deployment | Containers behind Caddy HTTPS; managed PostgreSQL preferred | Portable initial topology; hosting vendor and region remain open. |
| Operations | Structured Pino logs, request IDs, readiness checks and alerting | Diagnose exceptions without logging private guest details or credentials. |

Next.js documents App Router setup and supported environments; Nest documents its runtime and CLI requirements. Select a compatible active LTS patch and pin it when scaffolding rather than treating a minimum version as a recommendation. [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [Nest setup](https://docs.nestjs.com/first-steps), [Node release policy](https://nodejs.org/en/about/previous-releases).

TanStack Query supplies server-state tools, while shadcn/ui supplies editable component code. Neither decides hotel business rules or the final appearance. [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview), [shadcn/ui](https://ui.shadcn.com/docs).

### Why this shape

One modular backend keeps a booking, its inventory commitment, bill and audit record inside database transactions. One web application may use distinct public, guest and staff route groups and layouts: the public side sells the hotel experience, My Stay presents protected guest operations, and the staff portal supports hotel work. They do not need separate repositories merely to look different. Private data remains protected by server-side authentication, authorization and caching rules. A worker handles failures and retries independently of HTTP response time. A single hotel does not currently justify microservices, Kubernetes, a separate search engine or an event-streaming platform.

Authentication deserves an early integration check. Better Auth's documented Nest wrapper is community maintained. The baseline uses its documented Node/Express handler mounted in Nest's Express server, with application-owned guards. Verify ESM, body parsing, cookies and the chosen Prisma adapter together before building guest and staff journeys. [Express integration](https://better-auth.com/docs/integrations/express), [Nest integration caveat](https://better-auth.com/docs/integrations/nestjs).

### Version policy

During scaffolding, record exact package versions in `package.json`, commit `pnpm-lock.yaml`, pin pnpm using `packageManager`, and pin Node and container image versions. Validate Prisma 7 and its matching client/adapter versions as a set. Do not mix another Prisma major's transaction APIs into this baseline. Resolve any compatibility failure through an explicit update to this document. Documentation research is not an executed compatibility test.

## 3. System boundaries

```text
Browser: public pages / My Stay / private staff portal
                         |
                 HTTPS same origin
                         |
                   Caddy gateway
                 /               \
         Next.js web          NestJS API
                             /api/auth
                             /api/v1
                             /api/v1/events
                                  |
                              PostgreSQL
                                  |
                         Backend worker
                                  |
                   Selected external providers
```

Public content may be cached. Availability, personal stay data, bills and staff responses must not enter a shared public cache. No database credentials or provider secrets are available to the Next.js client. Server-rendered authenticated reads forward only the current request's session and use non-shared caching.

Next.js owns rendering and interaction. Nest owns permission checks, prices, availability, state transitions and writes. Next route handlers or server actions must not become a second business backend. The worker uses the same domain services and constraints as HTTP handlers.

The gateway routes `/api/*` to Nest and everything else to Next. Preserve SSE streaming, disable buffering for event responses, and use appropriate timeouts. Use HTTPS, secure cookies and narrowly configured trusted origins. Session-bound mutations need CSRF protection and Origin validation, including hotel API endpoints outside the auth library.

## 4. Frontend structure and behavior

```text
apps/web/src/
  app/
    (public)/                 # Home, rooms, amenities, offers, gallery and search
    (guest)/                  # Booking, My Stay, requests, bill, history
    staff/                    # Login plus protected operations routes
    layout.tsx
    error.tsx
    not-found.tsx
  features/
    discovery/ booking/ my-stay/ reservations/ rooms/
    housekeeping/ billing/ messages/ team/ reports/ settings/
  components/ui/              # Adaptable primitives; design comes later
  components/shared/          # Loading, errors, empty and stale notices
  lib/api/                    # Generated client integration
  lib/auth/                   # Auth client; no permission authority
  lib/query/                  # Query keys, provider, invalidation
  lib/events/                 # SSE connection and reconnect handling
  lib/forms/
  test/
```

Route groups in parentheses organize code without adding URL segments. Public pages use an image-led, luxurious promotional shell. Guest pages use a cleaner, practical My Stay shell; staff pages use a separate role-aware operations shell. These layouts may share brand foundations without sharing the same density or navigation. The owner opens the management overview, reception opens daily guest operations, and the supervisor opens cleaning and inspections. A server guard verifies access; hiding a link or changing the visual shell is only a presentation concern.

Keep search dates and filters in URL parameters, temporary form input in form state, and fetched records in the query cache. Do not add a global state library unless a concrete cross-screen need emerges. Generate API types rather than hand-copying persistence models. Guest responses use an explicit safe field list.

After consequential mutations, render the server's result and refetch affected records. Do not optimistically mark a booking confirmed, a payment successful, a room clean or a checkout complete. Keep the same idempotency key when retrying the same action. A changed payload is a new action after the user reviews it.

SSE events carry a scoped record identifier/version and trigger REST refetch. Reconnect and window focus also refetch; a proposed 30-second fallback poll keeps active views usable if streaming fails. Show last-updated and offline/stale states. Sensitive actions require connectivity; no offline approval queue is included. Clear personal caches and close streams on logout or account changes.

Keyboard access, focus handling, labelled form errors, text status labels, meaningful announcements and mobile list alternatives are implementation acceptance criteria. Test supervisor tasks on phone widths and reception calendars on smaller screens. These are usability requirements, not a visual theme.

## 5. Repository and setup contract

```text
hotel-platform/
  apps/
    web/
    api/                       # Nest HTTP and worker entry points
  packages/
    api-client/                # Generated from OpenAPI
    tooling/                   # Shared lint and TypeScript configuration
  infrastructure/
    compose.yaml
    Caddyfile
  tests/e2e/
  pnpm-workspace.yaml
  package.json
  pnpm-lock.yaml
  .env.example
  prd.md
  v2-decision-plan.md
  setup.md
  backend.md
  app-flow.md
  diagrams/
```

Use the existing project directory; do not create a nested duplicate repository or relocate the supplied source documents. The top-level name above is illustrative.

### Intended local setup sequence

1. Install a verified compatible Node LTS, pinned pnpm, Git and Docker Desktop with Linux containers available.
2. Scaffold web and API workspaces, configure ESM, strict TypeScript, linting and exact dependency versions. Complete the authentication/database integration smoke check.
3. Create `.env.example` containing names and harmless placeholders; copy to ignored local environment files and enter actual secrets locally.
4. Start local PostgreSQL and email capture. Apply migrations and seed fictional hotel data and individually provisioned test users.
5. Start the web, API and worker. Test both guest and staff sessions through the same local origin or verified development proxy.
6. Generate the API client and run the checks below. A successful local start is not a deployment or policy approval.

Planned root scripts to implement, **not currently runnable commands in this repository**:

```powershell
pnpm install --frozen-lockfile
pnpm infra:up
pnpm db:migrate
pnpm db:seed
pnpm api:generate
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm test:integration
pnpm test:e2e
pnpm build
```

`db:seed` must refuse production. Root `dev` starts the web, API and worker; keep the API on a different internal port from Next. The local proxy must forward auth cookies and SSE correctly.

### Environment contract

| Configuration | Scope | Required handling |
| --- | --- | --- |
| `APP_ENV`, `PUBLIC_APP_URL` | Server/deployment | Explicit local, test, staging or production mode; no guessed public origin. |
| `DATABASE_URL` | API/worker only | Separate least-privilege runtime user; migration credentials separate. |
| `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` | API only | Strong secret and externally reachable auth base origin. |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | API only | Configure exact registered callback URI; do not put secrets into chat or source control. |
| `PAYMENT_MODE` | API/worker | Simulation is development/test only. Pilot and production reject simulated mode; use the approved real provider or explicitly approved pay-at-hotel policy. |
| `NOTIFICATION_MODE`, email transport values | API/worker | Local capture during development; real delivery requires a selected channel and sender. |
| Media storage credentials | API/worker | Only if needed for managed room images/receipts; public images and private financial files have separate access rules. |

Hotel timezone, currency, rates and contact numbers belong in validated hotel configuration, not hardcoded from the developer's locale. Secrets never use `NEXT_PUBLIC_` names. Startup validates required settings and reports missing variable names without printing values.

## 6. Deployment and recovery

Use separate web, API and worker containers on an initial host behind HTTPS, with PostgreSQL reachable privately. Prefer managed PostgreSQL where the selected region and budget permit. This initial topology has a host failure risk; it is not a high-availability claim. Keep local, staging and production data and credentials separate.

Run migrations as a single deployment job, never independently from every API replica. Prefer additive schema changes, deploy compatible application code, then remove obsolete schema later. Take verified backups before risky migrations; rollback code only when the schema remains compatible.

Store durable room images in object storage when production content management requires it; store private receipts with authorized retrieval. Do not depend on a container's local filesystem for durable data. No vendor, account or paid subscription is selected here.

Before a pilot, agree recovery point and recovery time objectives, backup schedule, retention and hosting location. Restore a backup into an isolated environment, verify bills/reservations and record the result. Provide a hotel outage procedure for arrivals, payments and later reconciliation; offline application synchronization is outside this baseline.

Monitor API failures and latency, database connections, worker heartbeat, oldest pending outbox event, payment exceptions and notification failures. Business actions that succeed while delivery fails remain successful. Logs exclude tokens, passwords, invitation URLs, private messages and unnecessary guest data.

## 7. Delivery gates

| Gate | Work that can proceed | Decision needed before dependent work |
| --- | --- | --- |
| Foundation | Workspace, API skeleton, database, auth integration, permission tests | Implementation instruction and dependency compatibility verification. |
| Inventory and booking | Domain contracts and concurrency experiments | Room type vs exact-room sales, whole-stay fulfilment, hold expiry, rate snapshots and payment confirmation rule. |
| Guest linking | Secure token mechanics and entitlement test cases | Reception's exact entitlement verification procedure. |
| Billing and checkout | Immutable ledger model and reconciliation contracts | Currency, fees/tax rules, provider, refunds, outstanding balances, final-bill and late-charge procedures. |
| Cleaning and readiness | Mandatory inspection state machine | DND precedence, inspection checklist, approval invalidation and handling newly unavailable rooms. |
| Presentation | Implement My Stay/staff using the approved earth-palette guidelines in `design.md`; maintain accessible task-specific layouts | Separate public website concept and actual brand/media assets remain pending. |
| Pilot | Deployment plan and recovery rehearsal | Approved hotel policies, provider setup, notification channel, retention, backup objectives and outage procedure. |

The user confirmed a **real hotel pilot** as the first delivery. This resolves the delivery-purpose question in the earlier decision plan; its other unresolved operating decisions remain open. Simulators and sample policies are development/test fixtures only. Pilot users must receive actual configured hotel terms, real payment outcomes and supported service promises. Missing policy must not silently activate a permissive default.

### Pilot decision register

| Decision | Accountable input | Required before |
| --- | --- | --- |
| Actual property, room inventory, timezone, currency and jurisdiction | Owner | Production configuration and pricing/billing contracts. |
| Room-type vs exact-room sales, disclosure, hold duration and reassignment | Owner + reception | Booking/availability implementation beyond experiments. |
| Payment provider or approved pay-at-hotel option; pricing, deposits, fees and taxes | Owner + accountant + reception | Real booking confirmation and money handling. Do not assume a provider from the developer's location. |
| Charged-but-unconfirmed refund verification, handoff, tracking and timing | Accountant + owner + reception | Payment integration and pilot acceptance of failure paths. |
| Walk-in entitlement proof and staff recovery procedure | Owner + reception | Guest invitation and account-recovery release. |
| Arrival checks, keys, cancellation/no-show and final-bill/late-charge rules | Owner + reception | Affected lifecycle implementation. |
| Inspection checklist, invalidation, DND precedence, newly unavailable rooms | Owner + supervisor + reception | Readiness and service workflow release. |
| Notification channel, sender, quiet hours, consent and delivery promises | Owner | Live notifications; phone/WhatsApp contact is already agreed. Staff setup/recovery also needs a working delivery process. |
| Hosting vendor/region/budget, retention, recovery objectives and outage ownership | Owner + technical operator | Pilot deployment. |

No other document is silently rewritten by this decision register. Resolve each row with a dated operating decision and corresponding acceptance case; the technical skeleton can proceed separately once implementation is requested.

## 8. Verification and completion criteria

CI should run frozen installation, lint, type checks, unit tests, migrations against a clean PostgreSQL database, integration tests, API-client generation drift checks, production builds and critical Playwright journeys. Use real PostgreSQL for concurrency and constraints; SQLite cannot substitute for these tests. [Playwright documentation](https://playwright.dev/docs/intro).

Track all PRD §14 scenarios 1–20 and the V2 stress cases. The first slice must connect guest booking to reception, inspection to the correct guest, and checkout to the bill and turnover. Required negative tests cover unauthorized billing access, parallel last-room attempts, repeated payments, used/replaced invitations, stale approval, room changes and delayed messages after departure. No such application tests have run yet: this is the plan to implement and verify.

## 9. Skills and tools used

The supplied Excalidraw skill informs the editable app-flow diagrams. ECC `backend-patterns` informs service/data boundaries, durable work and error handling; ECC `api-design` informs HTTP contracts, pagination and authorization. Official framework documentation was checked on 14 September 2026. These sources support engineering choices, not approval of hotel policy.

The available tools were reviewed. A website-deployment plugin would provision infrastructure prematurely, and visual-reference tools should wait for the user's design direction. No additional plugin or paid integration is required for these documents. The Excalidraw CLI is diagram tooling, not a runtime dependency of the hotel application.
