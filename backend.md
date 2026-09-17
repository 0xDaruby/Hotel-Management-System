# XYZ Hotel — Backend Stack and Structure

**Date:** 14 September 2026  
**Status:** Recommended technical specification; not implemented  
**First delivery:** Real hotel pilot; simulation permitted only in development/test  
**Authority:** [PRD v2](./prd.md) · [Decision plan](./v2-decision-plan.md)  
**Related:** [System setup](./setup.md) · [App flow](./app-flow.md)

## 1. Responsibility and stack

The backend is the single authority for reservations, room fulfilment, occupancy, inspection, permissions, bills and guest-visible events. Guest and staff interfaces call the same domain services. Implement one modular NestJS application with two entry points: HTTP API and durable background worker.

Use strict TypeScript, ESM, Node active LTS, NestJS with Express, PostgreSQL 18, Prisma ORM 7 and its matching PostgreSQL adapter. Better Auth supplies identity/session mechanics; the hotel application supplies staff membership and resource permissions. REST/OpenAPI is the contract; SSE invalidates client views. Vitest and Supertest cover services and HTTP behavior, with actual PostgreSQL integration tests. See [setup.md](./setup.md) for package pinning, deployment and frontend choices.

No separate database per module, microservice network, accounting integration, cleaner account or accountant account is introduced. Modules represent ownership inside the same application, allowing a single transaction to span a consequential workflow.

The pilot must use approved live payment behavior, actual hotel configuration and a functioning notification/recovery process. The provider and operating procedures remain to be selected; a simulator cannot satisfy the pilot gate. See the decision register in [setup.md](./setup.md).

## 2. Backend directory structure

```text
apps/api/
  src/
    main.ts                         # HTTP bootstrap, auth, parsing, API
    worker.ts                       # Outbox, expiry, reconciliation
    app.module.ts
    config/                         # Startup environment validation
    database/
      prisma.service.ts
      transaction.ts                # Shared transaction client/retry helper
    common/
      auth/                         # Session, staff and ownership guards
      http/                         # Error filter, pagination, request IDs
      idempotency/
      observability/
    modules/
      identity/                     # Better Auth setup, staff invitations
      hotel/                        # Property, policies, contact, services
      inventory/                    # Room types, rooms, commitments, blocks
      guests/                       # Profiles, reservation entitlement
      reservations/                 # Quotes, booking lifecycle, amendments
      stays/                        # Assignments, check-in/out, room moves
      housekeeping/                 # Task transitions and inspections
      requests/                     # Guest requests and DND evaluation
      billing/                      # Folios, entries, payment/refund records
      messaging/                    # Reservation conversations
      notifications/                # Safe projections and channel adapters
      reporting/                    # Read-only operational aggregates
      audit/                        # Attributable append-only history
    infrastructure/
      outbox/                       # Leases, retries, deduplication
      payments/                     # Selected real adapter + test simulator
      email/                        # Development capture/selected provider
      storage/                      # Media and authorized receipt retrieval
  prisma/
    schema.prisma
    migrations/                     # Include reviewed custom PostgreSQL SQL
    seed.ts                         # Fictional data only
  test/
    integration/
    contracts/
    fixtures/
  package.json
```

Within a module, use `*.controller.ts` for HTTP, `*.service.ts` for use cases, `*.repository.ts` for persistence, `dto/` for input/output contracts, and `domain/` for transitions and policies. Small modules need not create empty layers. Controllers do not calculate bills or directly update ORM records. Repositories accept the active transaction client; nested services must not accidentally open independent transactions.

Cross-module work goes through application services. A check-in service coordinates reservation, assignment, occupancy and audit updates. Reporting reads bounded projections and cannot mutate operational state. Notifications consume committed events rather than calling controllers.

## 3. Data model and constraints

| Records | Key relationships and constraints |
| --- | --- |
| Hotel, PolicyVersion | One property; version operating rules and retain the policy version accepted with a booking. |
| AuthUser, AuthAccount, AuthSession | Library-managed identity records; Google provider subject is stable identity, not display name. |
| StaffMembership, StaffInvite | Named active membership with owner/supervisor/reception role; roles assigned by owner only. |
| GuestProfile | May exist before online claim; online identity link is unique when present. Avoid merging people solely by email/name. |
| RoomType, Room | Type describes sales category; Room is the physical room with separately stored condition facts. |
| InventoryCommitment | Physical room and date range for a hold or confirmed booking; one active commitment cannot overlap another for that room. |
| MaintenanceBlock | Room, effective interval, reason and actor; reduces usable inventory and invalidates readiness. |
| Quote, Reservation | Owner/guest, source, dates, party, type, state, immutable pricing/policy snapshot and version. |
| RoomAssignment, Stay | Historical assignment intervals; actual arrival/departure and current occupancy are separate from booking dates. |
| StayInvitation | Reservation, hashed random token, expiry, used/revoked time, issuer and entitlement-check audit reference. |
| HousekeepingTask, Inspection | Task type and work cycle; transitions, inspector, outcome and time. Approval applies to a specific room/work revision. |
| ServiceRequest, HousekeepingPreference | Associated reservation/stay, request kind, state and configured DND period. |
| Folio, FolioEntry | One primary folio per reservation; immutable entries and corrective entries. Preserve the original. |
| PaymentAttempt, PaymentRecord, RefundCase | Separate intent, verified collection/manual record and refund evidence; unique provider references where applicable. |
| Message | Reservation-linked author and content; staff-private notes are separate from guest messages. |
| OutboxEvent, NotificationDelivery | Durable event plus channel/recipient attempts; unique event-recipient-channel key. |
| AuditEvent, IdempotencyRecord | Actor/time/reason and result deduplication; scope keys to actor and operation. |

Use opaque IDs and foreign keys. Validate positive party size, capacity, departure after arrival, allowed transitions, supported currency and monetary bounds. Use UTC instants for events and hotel-local calendar dates for nights. Date commitments use half-open ranges `[arrival, departure)`, so adjacent reservations can share a departure/arrival date without implying the room is physically ready.

Store money as integer minor units with currency metadata, serialized as decimal strings when necessary to avoid JavaScript precision loss. Do not assume every currency has two decimal places. Taxes and pricing rounding need approved rules; record rate, tax and policy snapshots rather than recalculating old bookings from current settings.

Recommended indexes: reservations by guest/date and status/arrival, assignments and blocks by room/range, tasks by room/state/due time, folio entries by folio/time, messages by reservation/time, outbox by status/next attempt, and audit by target/time. Paginate histories; do not fetch every guest or ledger entry for dashboards.

## 4. Inventory and booking transaction

**Proposed implementation rule, pending sales-policy approval:** sell a room type but internally commit one feasible physical room across the entire stay. This internal allocation is not the disclosed room number. Reception can reassign it transactionally before arrival. Exact-room sales could use the same commitment mechanism with a fixed candidate.

This deliberately conservative approach prevents a nightly room-type count from promising a stay that only fits by moving rooms mid-stay. It may reject bookings that would become possible after rearranging existing commitments; do not silently implement a room-repacking or split-stay policy.

Use a PostgreSQL exclusion constraint on active `room_id` plus overlapping date range, with `btree_gist` where required. Prisma migrations must include the custom SQL and tests that prove it survives migration/recreation. PostgreSQL documents range exclusion for non-overlapping reservations. [PostgreSQL range constraints](https://www.postgresql.org/docs/current/rangetypes.html).

All inventory writers, including maintenance and room moves, acquire the affected room rows in stable ID order and use the same overlap checks. Exclusion alone does not protect against conflicts in a separate maintenance table. Blocks imposed on already committed rooms create an explicit operational exception; retain the reservation and payment history, suppress readiness, and require an approved reassignment/resolution procedure.

### Suggested confirmation sequence

1. Accept a server quote identifier and idempotency key; validate guest/staff authority and policy configuration.
2. In a short transaction, lock candidate room records, recheck full-stay availability and quote validity, create a pending reservation and inventory hold, and record audit/outbox entries.
3. Commit before calling any payment provider. Store a durable payment attempt with a stable external idempotency identifier. A simulator clearly reports that no money moved.
4. Verify provider result server-side. In a new transaction, lock the reservation/hold, check amount/currency and confirmation conditions, and confirm exactly once.
5. If the hold expired, re-evaluate inventory under the same locks. Never resurrect a conflicting hold. Verified money without a confirmable reservation enters an exception/refund case, with phone/WhatsApp support.
6. The worker releases expired holds using database time. Confirmation and expiry lock the same rows, so one wins. Hold duration is a configurable policy decision; it is not the one-hour walk-in invitation period.

Use serializable transactions where a multi-record predicate requires them, with bounded retries on serialization/deadlock failure. Keep external calls outside retried transactions. Prisma 7 documents isolation settings and `P2034` retries. [Prisma 7 transactions](https://docs.prisma.io/docs/orm/v7/prisma-client/queries/transactions).

Search is an advisory snapshot, never a guarantee. Confirmation must rerun the checks. On conflict return `409 INVENTORY_CONFLICT` with a safe explanation; refetch alternatives without substituting a room or price automatically.

Reservation state remains `Pending → Confirmed → Checked in → Checked out`, with Pending → Expired and Confirmed → Cancelled/No-show. Do not use reservation state as payment state. Amendments, extensions and room changes acquire old/new resources in stable order, validate the full new interval and update commitments atomically. Financial consequences depend on approved policy.

## 5. Identity, permissions and invitations

Better Auth handles Google and password/session mechanics. Mount its Express handler before JSON body parsing, preserve raw bodies on future webhook routes, and apply normal JSON parsing to hotel APIs afterward. Prefer the documented direct handler integration over assuming a community wrapper's compatibility. [Better Auth Express](https://better-auth.com/docs/integrations/express).

Use server-managed sessions with Secure, HttpOnly cookies in production, trusted-origin validation and CSRF protection. No bearer tokens in browser local storage. Validate guest ownership on every resource read/write, SSE subscription, message and receipt download. Explicit guest response DTOs omit staff names, private notes and unrelated rooms.

Google sign-in creates a guest identity, never staff membership. Staff password registration is invite-only: owner provisioning produces a single-use setup invitation, and the employee sets their password. Block public password sign-up from becoming a staff route. Bootstrap the first owner through a controlled one-time operator procedure, with no default password. Password recovery preserves role and revokes sessions when required.

Where an identity can access both guest and staff areas, staff operations must require an active staff membership and a password-authenticated staff session; Google login must not silently unlock staff access. Do not automatically link privileged password identities solely because a social account has matching email. Validate this behavior in the initial auth integration test.

Each privileged request checks current membership/active state rather than trusting stale cookie role claims. Disabling staff revokes sessions and terminates event streams while preserving historical attribution. Use database-backed rate-limit counters for login, recovery, invitation claim and booking attempts initially; do not depend on independent per-process counters. Reassess a shared limiter service only if measured load warrants it.

### Walk-in invitation transaction

Reception or owner verifies entitlement using the later-approved procedure. Store the verification reference without unnecessary identity-document copies. Generate a cryptographically random token and store only its hash, issuer, reservation, expiry and status. Never log the raw token; protect claim pages against referrer leakage and analytics capture.

Claim requires a signed-in Google guest. In one transaction lock the reservation and invitation, verify unused/unrevoked/unexpired state using server time, check that no conflicting guest link exists, associate the existing booking and consume the token. Replacement locks the same reservation and revokes any active invitation before creating another. Exactly one claim may succeed; expiry is one hour from issue or earlier on use/replacement. Repeated claims must not make new reservations. A booking already owned by another guest requires staff resolution, not automatic reassignment.

### Authorization rules

| Action | Required authority |
| --- | --- |
| Public discovery | Anonymous allowed; no private reservation data. |
| My Stay, own bill, own messages | Linked guest only; actions further constrained by lifecycle/policy. |
| Booking, assignment, check-in/out, allowed charges | Reception or owner; guest steps only when explicitly enabled. |
| Cleaning progress and inspection | Supervisor or owner; actual actor recorded. |
| Cleanliness approval | Supervisor/owner attests personal inspection; valid current work cycle. |
| Team, hotel configuration, full reports | Owner only. |
| Supervisor operational reads | Minimal room/task/stay context; no guest financial records. |

The application records an inspection attestation; it cannot independently prove a person physically inspected the room. Accountability and hotel procedure remain necessary.

## 6. Readiness and verified status events

Keep availability, occupancy, cleaning approval and operational condition separate. Immediate readiness requires the correct assignment, vacant occupancy, current valid cleanliness approval, in-service condition and configured arrival eligibility. Neither a timer nor the owner role bypasses these checks.

Housekeeping transitions follow the PRD: Scheduled → In progress → Awaiting inspection → Approved clean; failed inspection → Needs attention → In progress. Delayed and Blocked retain their explicit return paths. Timers may mark scheduling delays or remind staff; only a recorded human action starts work or approves cleanliness.

**Proposed invalidation rule:** increment the room's work/readiness revision on checkout/turnover, new dirty condition, failed/revoked inspection and relevant maintenance changes. An approval for an older revision cannot authorize check-in. Maintenance resolution alone never creates an inspection approval. Confirm exact invalidation triggers with the hotel before implementation.

Commit task transition, inspection, room revision, audit event and outbox event in the same transaction. Events include event ID, reservation/stay/assignment references, aggregate version and timestamp. Use a separate safe projection for guests. Before publishing, recheck the guest link, current assignment, lifecycle and current readiness. Room changes, cancellation and departure suppress irrelevant queued updates. A correction retains history and updates the current projection.

Distinguish in-stay housekeeping completion from arrival readiness: cleaning an occupied room does not end the stay or make it available for immediate check-in. An incoming guest may receive a preparation update, but no information about the departing occupant or cleaner.

## 7. Billing, payments, refunds and checkout

Use immutable folio entries with explicit signs and types. Proposed convention: charges and refunds increase the amount due; payments and credit adjustments reduce it; reversals offset the original entry. A refund normally accompanies the applicable charge reversal/credit so cancellation does not incorrectly leave an amount due. Preserve links to original entries and expose a comprehensible itemized bill. Owner-approved pricing/refund rules determine which entries are valid.

Payment attempts track provider interaction separately from recorded money. Distinguish simulated payment, staff-recorded cash/external collection, verified provider collection and settlement information. Browser redirects are not proof of payment. Validate signed provider callbacks, amount, currency, merchant context and unique transaction ID before crediting a folio. Duplicate/out-of-order callbacks must converge without duplicate entries. Unknown results require reconciliation, not a new charge attempt.

For charged-but-unconfirmed bookings, the accountant handles the actual refund outside the app. Proposed tracking states are `Needs review → Requested externally → Verified completed`, with a failed/disputed path and supporting reference. Reception/owner may record communication and verified evidence under the approved procedure; no automatic refund call or accountant login is added. Timing, evidence standard, who verifies and provider mechanics remain gates. Display “refund requested” until completion is verified.

### Checkout boundary

**Proposed safe baseline:** staff-assisted checkout; any digital departure option remains disabled until approved. Lock reservation, stay and folio; every charge/payment writer locks the same folio. Reject finalization while payment outcome is unknown or configured balance conditions fail. Append a bill snapshot, end occupancy, invalidate cleanliness and create exactly one turnover task with audit/outbox entries in one transaction.

After finalization, retain the bill snapshot and record late adjustments as linked corrections. A delayed verified payment must be recorded and reconciled against the closed folio without silently rewriting the issued bill or repeating checkout. Hotel-approved final-bill and outstanding-balance procedures are required before this workflow is implemented.

## 8. HTTP and event contract

These are proposed resource contracts, not working endpoints. All domain routes start `/api/v1`; Better Auth owns `/api/auth`.

| Resource routes | Purpose |
| --- | --- |
| `GET /hotel`, `/room-types`, `/availability` | Public discovery and advisory search. |
| `POST /quotes`, `/reservations` | Server pricing snapshot and pending booking creation. |
| `POST /reservations/:id/confirmations` | Idempotent policy-controlled confirmation. |
| `GET /me/reservations`, `/me/reservations/:id` | Guest-safe stay views. |
| `GET /reservations`, `PATCH /reservations/:id` | Staff list and validated amendments. |
| `POST /reservations/:id/cancellations`, `/no-shows` | Authorized policy transitions; preserve history. |
| `POST /reservations/:id/assignments`, `/check-ins`, `/check-outs` | Coordinated stay transitions. |
| `POST /reservations/:id/stay-invitations` | Staff issue/replace invitation after entitlement check. |
| `POST /stay-invitation-claims` | Google guest consumes invitation. Token in request body. |
| `GET /rooms`, `POST /rooms/:id/maintenance-blocks` | Condition visibility and guarded inventory changes. |
| `GET /housekeeping-tasks`, `POST /housekeeping-tasks/:id/transitions` | Supervisor/owner work progress. |
| `POST /housekeeping-tasks/:id/inspections` | Inspection outcome and actual actor/time. |
| `GET, POST /reservations/:id/requests`, `/messages` | Scoped services and hotel conversations. |
| `GET /reservations/:id/folio`, `POST /reservations/:id/charges`, `/payments` | Authorized bill and financial records. |
| `POST /payment-attempts`, `/payment-webhooks/:provider` | Payment adapter interaction; webhook signature authority. |
| `GET, POST /refund-cases` | Scoped exception tracking; not a transfer of money. |
| `GET, POST /staff`, `PATCH /staff/:id` | Owner membership administration; bounded fields only. |
| `GET /reports/operations`, `/reports/collections`, `/audit-events` | Permission-limited aggregates and history. |
| `GET /events` | Session-authenticated SSE stream scoped to current permissions. |

Validate inputs, reject unknown mutable fields, and apply explicit response DTOs. Use `201` with Location on creation, `200` for reads/results, `401` for missing session, `403` for denied staff capabilities, privacy-preserving `404` for another guest's resource, `409` for stale versions/state/inventory conflicts, `422` for semantic validation and `429` with Retry-After for limits. Unexpected errors return a request ID without SQL or stack traces.

```json
{
  "error": {
    "code": "ROOM_NOT_READY",
    "message": "This room cannot be checked in yet.",
    "requestId": "opaque-request-id",
    "details": [{ "field": "roomId", "code": "INSPECTION_REQUIRED" }]
  }
}
```

Staff-only reasons must not leak through guest endpoints. Lists use bounded `limit` (maximum 100) and stable cursor ordering `(createdAt, id)`; whitelist filters and sort fields. Use expected record versions on amendments/transitions; return a conflict rather than overwrite another person's work.

Consequential POSTs require `Idempotency-Key`. Store actor, operation, key, request hash and outcome under a unique constraint. Same key/payload returns the original result; same key/different payload returns a conflict. Concurrent duplicates wait for or report the existing in-progress operation. Retention must cover supported retry/provider windows, and permanent financial uniqueness constraints remain after cache expiry.

## 9. Worker, messaging and operational safeguards

An outbox row is committed with each relevant domain change. Workers claim rows using short database leases and `FOR UPDATE SKIP LOCKED`, commit the claim, perform external work, then record the result. Expired leases allow crash recovery. Use bounded retries with backoff and an exhausted state visible to staff. Never hold a database transaction open while sending email.

Delivery is at least once. Unique delivery keys and provider idempotency reduce duplicates; exactly-once external delivery must not be promised where a provider cannot guarantee it. A notification retry cannot invoke the original booking/payment/task command. Partition/order event handling by aggregate version and discard obsolete projections.

SSE is a convenience transport, not a queue. Replay only retained authorized events using a cursor, or instruct clients to refetch a snapshot when the cursor is too old. Recheck account disablement on active streams. Initial deployment uses one API instance; before adding replicas, implement database-backed fan-out/cursors rather than assuming in-memory broadcasts reach all clients. [Nest SSE](https://docs.nestjs.com/techniques/server-sent-events).

In-app reservation messages are stored durably and permission scoped. Phone and WhatsApp are visible contact links, not automated WhatsApp integrations. External notifications use a development capture adapter until the delivery channel and consent rules are selected.

Database outage must fail closed on confirmation and financial writes. A worker outage delays messages without undoing committed operations. Health endpoints distinguish liveness from database readiness; alerts track oldest event age, worker heartbeat and financial exceptions. Apply backups, restore exercises and secret handling from [setup.md](./setup.md).

## 10. Verification map

| Test group | Required evidence | PRD requirements |
| --- | --- | --- |
| Shared booking | Guest/reception see same record; last-room parallel requests produce one commitment; expiry/payment races remain consistent. | PR-01–PR-03 |
| Guest data | Own stay/bill/history only; safe DTOs, receipts, messages and SSE; stale/offline behavior. | PR-04, PR-05, PR-15, PR-16 |
| Physical work | Every transition, failed inspection, owner approval, occupied/blocked room and stale approval rejection. | PR-06–PR-08, PR-11, PR-18 |
| Hotel operations | Role-scoped dashboard, assignment, extension, cancellation/no-show, checkout and turnover. | PR-09, PR-10 |
| Financial/audit | Immutable corrections, duplicate callbacks, unknown outcomes, late payment after checkout and refund evidence. | PR-12, PR-13, PR-20 |
| Delivery | Crash/retry, stale assignment, departure suppression and notification failure independent from domain action. | PR-14 |
| Staff access | Owner-only invitation, password setup, recovery, role changes and immediate disablement. | PR-17 |
| Walk-in claim | One-hour/use/replacement expiry, simultaneous claims, identity conflict and persistent history. | PR-19 |

Execute all PRD acceptance scenarios 1–20 as connected journeys, plus the decision-plan stress cases. Test constraints with real concurrent PostgreSQL connections. Use provider simulators for failure sequences and the selected provider's sandbox before claiming integration readiness. This document specifies those tests; no application behavior has been built or verified yet.
