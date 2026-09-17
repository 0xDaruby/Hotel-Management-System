# XYZ Hotel desktop prototype

**Status:** Approved skeletal framework — not a final design decision.  
**Approved by:** Project owner, in the project conversation.  
**Approval recorded:** 15 September 2026.

This prototype is the agreed starting framework for further design and implementation discussions. Build on its role structure, navigation hierarchy and demonstrated interactions. Visual styling, detailed workflows and product policies remain open to refinement; this approval does not establish production readiness or authorize deployment.

### Approved starting framework

- Four distinct views: Guest, Receptionist, Supervisor and Owner / Manager.
- Owner navigation prioritizes Management Overview, Financial Overview and Team, with Hotel Operations in a secondary group. The owner retains delegated operational capabilities.
- Reception and supervisor navigation retain their respective task-focused arrangements.
- Reception's room cards show the complete sample inventory in numeric order, category tags, a distinct occupied colour, and combined category/availability filters.
- Owner and supervisor service updates offer In progress and Completed directly.
- Inspection comments use selectable cards, with a secondary Other / add a note option and personal-inspection confirmation.

Sample room numbers, names, amounts and comment wording are illustrative, not approved real hotel configuration. The prototype is incomplete by design and will be built upon; the PRD and decision plan continue to govern product requirements and unresolved policies.

Open `index.html` directly in a browser. The entire prototype is one self-contained HTML file with inline CSS and JavaScript, with no external dependencies or build step.

## Current visual direction

Warm ivory surfaces, deep forest green, a serif heading voice and compact sans-serif operational data. Color is reserved for actions and named statuses. The working hotel name is retained; this is a design proposal, not approved branding.

Each role has its own starting screen. The receptionist's Daily Overview prioritizes arrivals, room inspections, payment verification and departure coordination. The guest preview has a separate layout and exposes only the sample guest's stay. The prototype currently opens on the owner's Management Overview. Source context: `../prd.md`, `../app-flow.md`, `../v2-decision-plan.md`.

## Explore

- Navigate Daily Overview, Reservations, Rooms and Housekeeping.
- Search reservations; switch arrivals, departures and in-house lists.
- Open Teni's reservation to see the inspection blocker; Sarah's to see pending payment.
- Open Daniel's reservation, confirm arrival checks, then check him in. Occupancy, arrivals, in-house counts and available room list update together.
- Create and review a reservation draft; missing names and invalid date ranges show errors. A draft does not confirm availability or create a reservation.
- Switch to Guest experience and preview a message without sending it.
- Use Preview data state to inspect loading, empty and connection-error views. Try again restores the sample data.

All data is illustrative and resets on reload. No real authentication, payment, messaging, approval, refund or booking is performed. The housekeeping view is intentionally read-only for reception. Final-bill and real booking procedures remain product-policy decisions.

## Verification

Browser checks at 1440 × 1000 and 1280 × 900: no document horizontal overflow; overview composition inspected. Guest view also inspected. Browser console reported no errors in the checked flow.

Verified search/no-results recovery, draft validation and review, inspection/payment restrictions, checkbox-gated check-in, synchronized room counts, loading/empty/error views, retry, separate guest navigation and message preview. Escape dismisses the dialog and restores focus to its trigger. After check-in replaces its table row, focus moves to search.

Accessibility provisions: native buttons and dialog; explicit form labels; named table headers; text status labels alongside color; visible focus indicators; skip link; live status/error regions; reduced-motion support. Main text, secondary text, primary actions and status badge color pairs were contrast-calculated against their backgrounds. No screen-reader session or full WCAG conformance audit was performed. Mobile has fallback layout rules but was not the requested verification target.

Visual evidence: `desktop-overview.png`, `guest-stay.png`.

## Owner and supervisor demos

The prototype now opens on Owner / Manager. Use **Demo view** in the header to switch between all four roles. This is a design-review control, not authentication or an authorization boundary.

- **Owner:** management overview, financial exceptions, team access previews, invitation drafts, operational history, reception operations and personal inspection actions. Collections are explicitly distinguished from revenue. Refund execution remains outside the app demo.
- **Supervisor:** room preparation, personal inspection, failed inspection/rework, reported completion, blockers, service requests and operational history. The view does not expose financial pages or team controls; owner team-access events are filtered from its history.
- Inspection outcomes update the shared sample room and reservation data. The history records the actual demo actor and WAT time. Guest updates exclude internal inspection notes.
- Team changes only update sample records; invitations are never sent. The selector remains available even when a sample staff record is disabled.

Verified at 1440 × 1000 and 1280 × 900 with no document horizontal overflow. Tested supervisor approval and reception synchronization, owner approval attribution, required inspection confirmation, failed inspection and rework, service progress, team-access preview, private history filtering, invitation preview and refund-process explanation. No browser console errors were reported in the tested flows. These checks are not a full accessibility or security audit.

New screenshots: `owner-view.png` and `supervisor-view.png`. `role-views.js` is the readable authoring copy of the role extension; it is also embedded in `index.html`, so the HTML still runs on its own.

## Room inventory and quick inspection comments

Reception's Rooms page now shows all 24 sample rooms, ordered numerically, with category tags. Occupied cards use a blue surface and an explicit Occupied label. Category and availability filters combine; clearing them restores the full inventory. Numbering comes from the existing sample records, not a confirmed real hotel room list.

Owner and supervisor inspections offer selectable comment cards instead of mandatory typing. Approval and rework have different options. A collapsed Other / add a note section supports custom notes alone or alongside selected comments. Changing the outcome clears previous selections and confirmation. Personal inspection confirmation remains required. Progress updates outside inspections retain their existing note field.

Verified: 24 unique sorted room cards, 16 occupied cards, combined filters, no-results recovery, no horizontal overflow at 1280px, supervisor approval without typing, owner rework without typing, and custom-note-only submission. Screenshots: `rooms-view.png`, `inspection-comments.png`. `room-ui.js` is embedded after `role-views.js` in the standalone HTML; preserve both sections when updating either authoring copy.
