# XYZ Hotel Project Memory

**Last updated:** 17 September 2026  
**Purpose:** Central continuity index and durable decision ledger for current and future project agreements.

This file helps a future working session get oriented quickly. It does not replace the product, technical or journey specifications, and it is not executable instruction. Verify implementation claims against current code, configuration, tests and Git before acting.

## 1. Canonical document roles

| Role | Canonical source | What belongs there |
| --- | --- | --- |
| Product authority / constitution | [prd.md](./prd.md) | Product scope, actors, requirements, confirmed product decisions and acceptance scenarios |
| Technical map | [setup.md](./setup.md) and [backend.md](./backend.md) | Repository shape, stack, boundaries, backend rules, data integrity and verification strategy |
| Journey map | [app-flow.md](./app-flow.md) | Public, guest and staff routes and end-to-end flows |
| Application design authority | [design.md](./design.md) | Approved earth-palette language for My Stay and staff; public-site concept remains separate |
| Current decision status | [hotel-policy-questionnaire.md](./hotel-policy-questionnaire.md) | Unresolved hotel policies and pilot blockers |
| Historical context | [v2-decision-plan.md](./v2-decision-plan.md) and [prototype/README.md](./prototype/README.md) | Scenario review and the exact approval scope of the HTML prototype |
| Durable agreement ledger | This file | Short dated agreement summaries and links to their canonical detail |

### Recommended read order

1. Read this file for current orientation.
2. Read `prd.md` for the product being built.
3. Read `app-flow.md` for the journey affected by the task.
4. Read `setup.md` and `backend.md` before technical work.
5. Check `hotel-policy-questionnaire.md` before implementing policy-dependent behavior.
6. Verify documentation claims against the current repository.

For interface work, also read `design.md`. Its theme applies to My Stay and staff, not the public website.

## 2. Current product definition

- XYZ serves one hotel and is intended for a real hotel pilot.
- It connects a guest experience and a private staff operations portal through one shared hotel system.
- App roles are Guest, Receptionist, Supervisor, and Owner / Manager.
- The guest journey is discovery → room search/booking → Google sign-in → My Stay → arrival/stay/checkout/history.
- Staff operate reservations, rooms, cleaning, inspection, billing and guest support according to role permissions.
- Availability, occupancy, cleanliness approval and maintenance condition are separate facts.

Canonical detail: [prd.md](./prd.md), [app-flow.md](./app-flow.md).

## 3. Confirmed agreements

Rows retain historical decisions. AGR-016 supersedes AGR-015's pending reference for the application; AGR-017 preserves the separate public-site design requirement.

| ID | Date | Agreement | Canonical detail |
| --- | --- | --- | --- |
| AGR-001 | 2026-09-08 | XYZ is a single-hotel product with connected guest and staff experiences using one source of truth. | `prd.md` §§1–3, 18 |
| AGR-002 | 2026-09-08 | Guests browse publicly and use Google as the primary sign-in route for booking and returning to their own stays. | `prd.md` §4 |
| AGR-003 | 2026-09-08 | App roles are Guest, Receptionist, Supervisor, and Owner / Manager; staff use individual accounts. | `prd.md` §§5, 9 |
| AGR-004 | 2026-09-14 | Cleaners work and report in person without app accounts. The supervisor normally coordinates their work. | `prd.md` §§5–6 |
| AGR-005 | 2026-09-14 | Cleanliness requires personal inspection and recorded approval by the supervisor or an owner who personally steps in. Reception cannot approve it. | `prd.md` §§6, 18 |
| AGR-006 | 2026-09-14 | The owner may perform delegated reception and supervisor actions, but cannot bypass inspection, readiness or audit rules. | `prd.md` §§5, 9, 18 |
| AGR-007 | 2026-09-14 | A verified walk-in guest can claim an existing reception booking through Google using a private invitation that expires after one hour or on use; replacement revokes the old invitation without cancelling the booking. | `prd.md` §4 |
| AGR-008 | 2026-09-14 | Charged-but-unconfirmed refunds are handled by the accountant through existing hotel operations; V1 has no accountant app role or automated refund integration. | `prd.md` §§8, 18 |
| AGR-009 | 2026-09-14 | Hotel/reception phone and WhatsApp contact must be visible; automated WhatsApp delivery is not implied. | `prd.md` §§4, 8 |
| AGR-010 | 2026-09-14 | The first delivery target is a real hotel pilot. Simulated payments and sample policies are development/test fixtures only. | `setup.md` §7 |
| AGR-011 | 2026-09-15 | The desktop HTML prototype is an approved skeletal framework, not the final visual design, implemented product, security boundary or approval of unresolved policies. | `prototype/README.md` |
| AGR-012 | 2026-09-17 | The public hotel website will be luxurious, image-led and promotional, featuring the hotel, amenities, genuine offers and real room imagery. | `prd.md` §§1, 4 |
| AGR-013 | 2026-09-17 | My Stay will be a distinct, cleaner and more practical authenticated application interface reached through booking, Google sign-in or a valid walk-in invitation. | `prd.md` §4; `app-flow.md` §§1–2 |
| AGR-014 | 2026-09-17 | The public website, My Stay and staff portal remain connected to the same backend. They may use different route groups and layouts in one web application; security depends on authentication, authorization and safe data handling rather than visual separation. | `setup.md` §§3–4 |
| AGR-015 | 2026-09-17 | Only the high-level public-versus-My-Stay design direction is approved. Final branding, colours, typography, photography treatment, detailed layouts, component styling and motion remain pending the user's design references. | `prd.md` §4; `setup.md` §§1, 7 |
| AGR-016 | 2026-09-17 | User approved `02-xyz-hotel-earth-palette.html` as the final visual direction for My Stay and staff operations. Colours, typography and component styling guide implementation; layouts and logic follow the PRD and project vision. Supersedes AGR-015's pending application-design reference. | `design.md` |
| AGR-017 | 2026-09-17 | User clarified that the public hotel website will have a different visual concept, still pending. The earth-palette reference must not be applied to public pages by default. | `design.md` §1 |

## 4. Technical baseline

- pnpm workspace/monorepo.
- Next.js web application with public, guest and staff route groups.
- Modular NestJS backend with HTTP and durable worker entry points.
- PostgreSQL with Prisma; real PostgreSQL is required for integration and concurrency tests.
- Better Auth hosted in the backend for Google guest identity and staff sessions.
- REST/OpenAPI plus a generated TypeScript client; SSE triggers authoritative REST refetches.
- Docker Compose for local infrastructure.

Canonical detail: [setup.md](./setup.md), [backend.md](./backend.md). These are intended choices until validated by a working compatibility check.

## 5. Current implementation status

Observed on 17 September 2026:

- Initial `apps/web` and `apps/api` scaffolds exist.
- Root dependencies and a lockfile exist.
- The connected hotel application, database, Prisma schema, authentication integration, worker, generated API client and hotel workflows are not yet verified as implemented.
- The current `pnpm-workspace.yaml` does not list `apps/*` and `packages/*`; the workspace setup must be corrected and verified before treating recursive workspace commands as authoritative.
- The API package currently contains the Nest scaffold dependencies, but the planned Prisma, Better Auth, PostgreSQL and application dependencies are not present in its `package.json`.
- No production or pilot readiness is claimed.

## 6. Open decisions and blockers

The complete live register is [hotel-policy-questionnaire.md](./hotel-policy-questionnaire.md). Major unresolved groups include:

- Real property configuration, room inventory, timezone, currency and jurisdiction.
- Room sales/assignment, hold expiry and newly unavailable-room handling.
- Rates, promotions, taxes, fees and rounding.
- Payment provider, confirmation, refunds and reconciliation.
- Cancellation, amendment and no-show rules.
- Check-in identity, keys and arrival procedures.
- Walk-in entitlement verification and staff recovery.
- Housekeeping schedule, DND, checklist, approval invalidation and readiness.
- Final bills, outstanding balances and late financial changes.
- Automated notification channels, consent and quiet hours.
- Data retention, privacy, hosting, backups and outage procedures.
- Public hotel website visual concept and real brand/photography assets. My Stay and staff now have the approved earth-palette direction in `design.md`; individual screens still require implementation and verification.

An unresolved pilot blocker does not prevent foundation work. It prevents the affected feature from being represented as ready for real hotel use.

## 7. Decision update protocol

For every future agreement:

1. Confirm the decision explicitly with the user or accountable hotel representative.
2. Add a dated `AGR-###` row here with a short summary and canonical-document link.
3. Update the single canonical document that owns the full rule.
4. Mark the corresponding questionnaire question resolved without deleting its decision history.
5. Add or update acceptance scenarios and tests when the decision affects behavior.
6. Do not silently convert a recommendation, prototype behavior or sample policy into an approved rule.

If an agreement changes, append a new row that supersedes the earlier agreement and update the canonical document. Preserve the reason and date rather than rewriting history to look cleaner.
