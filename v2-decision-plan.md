# V2 decision plan and simulated hotel stay

Planning review • 14 September 2026 • Source: [PRD v2](./prd.md)

## Recommendation

The main concerns have been addressed at concept level through the follow-up agreements below. Proceed to detailed planning of the remaining operating procedures and a scripted walkthrough. The user separately authorized an interactive desktop HTML prototype and approved it on 15 September 2026 as a skeletal framework to build upon. See the [prototype approval scope](./prototype/README.md) and [HTML prototype](./prototype/index.html). This is not a final design decision or approval of unresolved operating policies; it does not authorize production deployment. The simulated stay below remains a paper exercise, not a live application test or evidence of customer demand.

The most important next decision is the intended first delivery: a demonstration with labelled sample policies, or a real hotel pilot with approved operating policies. Both preserve the two connected experiences. Neither should quietly become a staff-only dashboard.

## Confirmed follow-up agreements

- **Owner authority:** the owner can perform operational actions delegated to reception and the supervisor. Those remain their normal duties. Both supervisor and owner must personally inspect before approving cleanliness, with actual approver and time recorded. Reception cannot approve cleanliness.
- **Walk-in access:** reception creates the booking, records in-person payment and assigns the room. After entitlement verification, a private invitation lets the guest sign in with Google and claim the booking into a regular persistent account with the same My Stay capabilities for that stay stage as online bookers. The invitation expires on use or after one hour; replacement invalidates the old invitation without cancelling the booking or losing history.
- **Refund responsibility:** for money taken without a confirmed booking, the accountant handles the refund through existing hotel operations. No accountant app role or automated accounting/refund integration is added.
- **Customer care:** visible hotel/reception phone and WhatsApp contact support guests in checking and resolving issues. This does not select an automated notification channel.
- **Remaining details:** entitlement checks, refund verification/timing/tracking/provider mechanics, handling newly unavailable rooms and final-bill procedures remain to specify. Previous suggested procedures are recommendations, not settled rules.

## Skills and planning approach

- **Selected: ECC product-lens.** Use product diagnosis and a scenario-based journey review to identify where the existing promise becomes ambiguous. No installation or live user testing was performed.
- **Reviewed but not used: ECC plan-canvas.** Its live annotation and approval session is unnecessary for delivering this written review.
- **Defer blueprint and contract-first:** choose business rules before prescribing architecture or interface contracts.
- **Defer council and orchestration:** the immediate need is to make operating decisions visible, rather than seek multiple opinions or coordinate implementation.

## Confirmed scope and intended outcomes

“Confirmed” here means stated in the current PRD, not validated by hotel users.

**Goal:** a guest books and manages a stay while hotel staff act on the same reservation, bill, room facts, and verified service events. Guests understand what happens next; each employee can perform their own responsibilities.

**Users:** Guest, Receptionist, Supervisor, Owner / Manager. Cleaners are operational stakeholders who work and report in person, with no app accounts. The shared system distributes information; it is not a substitute for a human inspection.

**Included:** the first-release scope in PRD §12: discovery, Google sign-in, shared availability, online and staff reservations, My Stay, allowed cancellation, payment step or labelled development substitute, room assignment, check-in/out, supervisor cleaning and inspection, requests/contact, bills, staff access, operational visibility, audit history and notification tracking.

**Non-goals:** adding capabilities, changing the four roles, adding cleaner accounts, bypassing mandatory personal inspection, selecting a stack, or building software during this review. Multi-hotel sales, external booking channels, loyalty, advanced pricing, full accounting, digital key hardware and native apps remain later scope as stated in §12.

**Evidence limit:** booking speed, workload savings, guest trust, and commercial demand remain unproven. Do not attach delivery dates until team capacity and the first delivery target are known.

## Simulation: one booking from discovery to departure

### Sample conditions—not approved hotel policy

One guest, Ada, books one Standard room for two nights. There are two Standard rooms: 101 and 102. Room 101 has a departing occupant; 102 is blocked for maintenance across the requested dates. Ada books a room type, with reception assigning a physical room later. This is one of the options left open in §13.

For this walkthrough only: the displayed total is 200 sample currency units, with no extra fees in the example; payment is a clearly labelled simulated full payment. Reception performs identity checks and issues a physical key. Housekeeping is requested during the stay. Checkout is completed with reception assistance. No tax treatment, payment provider, refund rule, or digital-checkout policy is implied.

| Step | Guest experience | Hotel action and shared outcome | What must hold |
| --- | --- | --- | --- |
| 1. Search | Ada enters two nights and one guest; sees an available Standard option and total. | The same date-based inventory is available to reception. Room 102's maintenance block excludes it from fulfilment. | Current cleanliness alone does not decide future availability. |
| 2. Sign in and review | Ada uses Google, reviews dates, price and sample terms. | Her profile is associated with her booking attempt. | Signing in creates no staff privileges; browsing required no login. |
| 3. Confirm | Ada completes the simulated payment step and sees one confirmation and reference. | The same reservation appears in Reservations and Operations without re-entry. | Confirmation and payment retries return the same result; sample payment must never claim real money moved. |
| 4. Prepare | My Stay shows dates, payment state, contact and arrival instructions. | Reception assigns Room 101, subject to its availability for the whole stay. | A reservation is not permission to enter an occupied or unready room. Room-number disclosure remains a policy decision. |
| 5. Previous guest departs | Ada is still awaiting arrival readiness. | Reception checks out the previous guest; Room 101 becomes vacant and needs turnover work. | Recommended explicit rule: previous cleanliness approval cannot remain sufficient after turnover. Checkout-to-turnover details need to be made precise. |
| 6. Cleaning begins | Ada sees an appropriate preparation update. | Supervisor directs a cleaner in person, confirms work started and records it. | A schedule or elapsed time does not prove work started. |
| 7. Inspection fails | Ada is not told the room is ready. If an arrival promise is affected, she receives a suitable delay update. | Cleaner reports finished; supervisor records Awaiting inspection, inspects, finds work needed and records Needs attention. Cleaner reworks it. | Cleaner has used no app. Reception cannot approve cleanliness. The owner may step in and approve only after personally inspecting. |
| 8. Inspection passes | Ada sees Room ready for check-in once all readiness conditions hold. | Supervisor personally inspects and approves. Room is vacant, in service, assigned appropriately and approved clean. | Approval records actor and time. Readiness is more than cleanliness. |
| 9. Arrival | Ada attends reception and receives her key after the configured checks. | Reception completes check-in; Room 101 is occupied by Ada's stay. | “Room ready” did not itself check Ada in. |
| 10. In-stay request | Ada requests housekeeping; sees scheduled, serviced, being checked, then complete as verified events occur. | Reception/supervisor handle the request; cleaner works; supervisor inspects and approves. | Ada remains checked in throughout. This cleaning does not make Room 101 vacant or available for another immediate check-in. |
| 11. Bill review | Ada sees charges 200, simulated payment 200, balance 0. | Reception sees the same totals and their history. Supervisor cannot access the bill. | A payment record, collected cash and provider settlement must not be conflated. |
| 12. Departure | Ada gets reception assistance, a final bill and stay history. | Reception completes checkout once policy conditions hold; occupancy ends and turnover is required. | Retrying checkout produces no second departure or duplicate turnover task. Later cleaning updates must not go to Ada. |
| 13. Return visit | Ada signs in through the same Google account and sees her past stay. | Owner disables a departing receptionist's individual account; earlier actions retain attribution. | Guest history remains private; disabled staff access ends without deleting history. |

**What this demonstrates on paper:** each role has a distinct responsibility, My Stay has a useful purpose after booking, and verified cleaning connects physical work to guest information. It does not demonstrate that staff will record updates promptly or guests will find them useful; those require observation.

## Stress cases: where the script needs a decision

### Additional walkthroughs for the agreed decisions

**Walk-in:** Ada arrives without an online booking. Reception creates her booking, records her in-person payment and assigns a room. After verifying entitlement using the procedure still to be specified, reception gives her the invitation. Ada signs in through Google, claims the existing reservation and opens My Stay. If she misses the one-hour window, reception replaces the invitation; the old one stops working, while her booking remains. Claiming does not create a second reservation or a temporary guest account.

**Refund:** Ada is charged but does not secure the last room. She contacts reception/customer care by phone or WhatsApp. The accountant handles the refund through the hotel hierarchy. The simulation stops short of inventing a refund deadline, provider action or completion status; those require an agreed procedure.

**Owner steps in:** a cleaned room awaits inspection. The owner personally inspects and approves it using their own access. The record names the owner, not the supervisor. The room becomes ready only if the other readiness conditions also hold. The supervisor remains responsible for the normal daily workflow.

### Remaining specification and verification cases

These are edge cases within existing capabilities, not feature proposals. P0/P1 indicate priority for detailed specification or verification, not unresolved objections to the concept. Approved outcomes are distinguished from remaining recommendations.

| Priority | Simulation branch / finding | Existing coverage and remaining decision | Recommended disposition |
| --- | --- | --- | --- |
| P0 detail | Ada is charged but reception wins the final room. | Agreed outcome: the accountant handles the refund through the existing hotel hierarchy, with calls/WhatsApp customer care. | Specify payment verification, refund timing, provider mechanics and tracking. Inventory commitment and pending expiry also remain to define. No accountant app role or automated refund is assumed. |
| P0 | Reception finishes checkout while a payment or charge update is still arriving. | PR-12 and the checkout acceptance scenario require consistent bills and departure. Finalization, unsettled balances and corrections are not explicit. | Define what permits checkout, which total is final, and how late adjustments are recorded and explained. This is an existing billing rule, not another module. |
| P0 | Room 101 becomes blocked after a ready notification, or Ada moves to another room while a cleaning update is queued. | §6 covers corrected statuses and departed-guest exclusion; §7 retains room changes. Routing and readiness invalidation across these cases need explicit outcomes. | Associate updates with the correct stay and applicable assignment; recheck relevance before publishing. Withdraw stale readiness and preserve history. Define which events invalidate prior cleanliness approval. |
| P0 detail | Reception creates Ada's booking and she wants My Stay access. | Agreed: a verified guest claims through Google and a private one-time invitation expiring on claim or after one hour. Replacement invalidates the old invitation; booking and account persist. | Specify reception's entitlement-verification procedure. Matching profile text alone must not authorize access. |
| P1 | Ada requests housekeeping during a Do Not Disturb period, or taps Request twice. | Housekeeping policy and DND are explicitly open in §13. Duplicate active requests are not resolved. | Define DND precedence, request acknowledgement, cancellation and repeated-request handling before that flow is designed. |
| P1 validation | Cleaning is finished but the supervisor is inspecting other rooms. | Agreed: the owner may perform delegated duties and personally inspect and approve; supervisor remains responsible day to day. | Rehearse peak inspection workload. Owner authority does not guarantee availability or remove mandatory inspection. |
| P1 | A notification fails, or the supervisor's phone loses connectivity before an update saves. | PR-14 and PR-15 already require honest failure/stale states. Delivery failure must not reverse saved work. | Walk through “saved, message failed” separately from “update not saved.” No offline approval or offline synchronization capability is assumed. |
| P1 | Adjacent bookings can each fit a room type, but existing physical assignments prevent one room covering the whole stay. | §4 promises fulfilment for the entire stay; §7 separates room types and physical rooms. Sales mode is already open in §13. | Specify whether assignment changes are allowed before arrival and require whole-stay fulfilment. Do not introduce split-room stays by accident. |
| P1 | A guest cannot use Google. | Google is the agreed primary online route; reception serves walk-ins; alternative email access is later scope. | Keep the restriction visible in the demonstration and validate its suitability for the intended hotel. Do not imply all walk-ins automatically have My Stay access. |

## Decision order and dependencies

1. **First-delivery purpose — owner:** demonstration or real hotel pilot. A demonstration can use sample rules; a pilot cannot treat them as approved policy.
2. **Booking commitment — owner with reception:** room-type versus exact-room sales, full-stay availability, pending expiry, pricing and confirmation/payment outcomes. Depends on the intended payment level.
3. **Arrival and departure — owner with reception:** identity/key handoff, disclosure of room numbers, early arrival, outstanding balances, cancellation/no-show, refund and final-bill rules. Pricing, fees and jurisdiction remain explicit dependencies, not assumptions.
4. **Physical work and guest updates — owner with supervisor:** cleaning schedule, inspection criteria, DND/request precedence, invalidation of approval, status recipients and notification promises. Personal inspection by the approving supervisor or owner is already settled.
5. **Account and operating readiness — owner:** booking entitlement checks, account recovery, hosting/outage process, retention, backup/recovery objectives and communication channel. A real pilot also needs configured accounts, provider access where selected, and actual hotel inventory and staff availability.

No technology selection is necessary to understand this simulation. Provider/API feasibility and jurisdiction-specific obligations must be researched after those choices are identified; this review makes no legal or provider capability claims.

## Prioritized delivery plan and verification gates

Milestones describe future work; this document does not authorize implementation. The full first-release scope remains PRD §12. Sequencing does not remove capabilities from it.

| Milestone | Deliverable and accountable role | Acceptance / verification gate |
| --- | --- | --- |
| M1 — Decide the operating rules | Owner records decisions above with reception and supervisor input; labels any demonstration-only assumptions. | Concept agreements below are retained; every P0 operating detail has an agreed procedure before affected implementation. Remaining §13 decisions have an owner and a gate before affected work begins. |
| M2 — Rehearse the current idea | Owner, receptionist and supervisor walk through the scenario; a representative guest reviews the guest steps. Include cleaner-to-supervisor verbal handoff. | Participants can identify who acts next, what each role sees, and why actions are blocked. Record confusion and unresolved decisions. This is proposed validation, not completed research. |
| M3 — Specify the approved behavior | After review, prepare capability/state/permission contracts mapped to PR-01–PR-20 and acceptance scenarios 1–20. | Each state change has an actor, prerequisites, result, failure behavior and guest-visible consequence. Policy choices are traceable. User explicitly requests implementation before build work begins. |
| M4 — Build and verify the connected journey, if authorized | Deliver booking → shared reservation → room preparation → arrival → request → bill → departure, with the rest of §12 tracked to completion. | All 20 current acceptance scenarios pass, plus the P0 branches above. Demonstrate no conflicting booking, duplicate payment action, false clean status or cross-guest disclosure. Verify backend permissions, not only hidden controls. |
| M5 — Establish readiness for intended use | Demonstration: clearly distinguish simulated services. Real pilot: validate actual policies, selected payment behavior, restoration and outage procedures with staff. | Demonstration has no claim of live settlement. Pilot has a successful recovery exercise against agreed objectives, no unresolved critical correctness/privacy defects, and owner sign-off on operating rules. |

**Suggested usability gate:** in the walkthrough, each participant completes their assigned journey without the facilitator supplying a missing business rule. Record time, assistance and confusion as baselines; do not invent performance targets before observing use.

**Risk ownership:** owner owns unsettled policy and delivery purpose; reception validates arrival, booking and financial exceptions; supervisor validates inspection capacity and task accuracy; the eventual technical delivery owner validates consistency, permissions, notification failures and recovery.

## Clear next action

Decide whether the first delivery is a demonstration or a real hotel pilot, then specify the operating procedure for the agreed accountant-led refund outcome, including verification, tracking and timing. Record the remaining operating details before preparing affected technical contracts. No additional feature is needed to make that decision.

The direction is to keep the v2 concept intact and make its existing promises precise. The PRD and this plan now reflect the follow-up agreements. Original source materials remain unchanged.

