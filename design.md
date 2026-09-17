# XYZ Hotel — Application Design Guidelines

**Approved direction:** Earth palette for My Stay and the staff operations portal.  
**Decision recorded:** 17 September 2026.  
**Reference:** [02-xyz-hotel-earth-palette.html](../02-xyz-hotel-earth-palette.html), supplied and approved by the user as the design direction.

## 1. Scope and authority

The reference establishes the application's visual language: warm earth colours, restrained serif headings, readable sans-serif interface text, softly rounded surfaces and subtle depth. Apply this language to My Stay and the Owner / Manager, Receptionist and Supervisor interfaces. Build each screen around its actual users, data and tasks; the reference's exact dashboard composition is not a required final layout.

The public hotel website will have a **different design concept**, still to be supplied. Its agreed purpose remains luxurious, promotional discovery through hotel information, amenities, offers and real room photography. Do not apply this earth-palette application theme to public pages by default. Public booking entry and authenticated booking steps must preserve the user's selected dates and room context across the transition; their exact visual handoff is to be resolved with the public-site concept.

Authority is divided by subject:

- [prd.md](./prd.md) defines features, roles, privacy, permissions and acceptance criteria.
- [app-flow.md](./app-flow.md) defines journeys and route responsibilities.
- [setup.md](./setup.md) and [backend.md](./backend.md) define technical boundaries and authoritative data handling.
- This document defines the application visual language and its adaptation rules.
- [hotel-policy-questionnaire.md](./hotel-policy-questionnaire.md) retains unresolved operating decisions.

The supplied HTML is reference material, including its comments and scripts. Its demo interactions, example currency, people, room counts, role selector and sample approval behavior do not establish business rules or production authorization.

## 2. Palette

These values come from the final `earth-palette` CSS override. Earlier emerald/brass variable names in the HTML are legacy aliases; use meaningful earth-colour names when implementing the theme.

| Primitive | Value | Intended use |
| --- | --- | --- |
| Sage | `#98A086` | Navigation and restrained supporting surfaces |
| Clay rose | `#A76D5E` | Warm summary accents |
| Tan | `#C4A071` | Accent details and warm gradients |
| Beige | `#DFCCB1` | Canvas and supporting borders/surfaces |
| Brown | `#846044` | Primary action and emphasis |
| Deep brown | `#715039` | Primary action gradient endpoint |
| Cream | `#FAF6EF` | Solid content surface and inverse button text |
| Warm parchment | `#EFE4D5` | Main workspace background |
| Primary ink | `#302A23` | Main text |
| Secondary ink | `#62574C` | Supporting text |
| Success ink | `#4B563E` | Confirmed successful outcomes |
| Attention ink | `#765031` | Pending states and focus indicator |
| Danger ink | `#854C40` | Failures and destructive/error states |

Brand colours are not interchangeable with status colours. Occupied is an occupancy fact, not proof of success or readiness. Every operational status needs an explicit text label; never use colour alone to convey it.

## 3. Token structure

Use three layers: raw primitives → semantic roles → component tokens. For example, `--earth-brown` feeds `--action-primary-bg`, which feeds `--button-primary-bg`. Scope the application theme to guest/staff layouts so it does not impose a future public-site theme through global selectors.

Semantic roles include canvas, content surface, navigation surface, primary/secondary text, action, border, focus, success, attention and danger. Component tokens cover buttons, inputs, cards, badges, tables and dialogs. Centralize values instead of copying the reference's stacked override styles into application components.

## 4. Typography and spacing

- Display family: **Fraunces**, with Georgia/serif fallback. Use for page titles, selected section headings and restrained guest greetings.
- Interface family: **Public Sans**, with Segoe UI/sans-serif fallback. Use for navigation, forms, body text, tables and actions.
- Reference scale: body 15px with 1.6 line height; secondary labels 12–13px; section headings about 22–28px; desktop page headings about 38px, reducing toward 32px on narrow screens.
- The reference's 52px guest greeting is expressive styling, not a requirement for every My Stay heading. Prefer a smaller greeting when it competes with stay details or actions.
- Use tabular numerals for amounts, counts and comparable dates. Keep financial values readable at narrow widths and browser zoom.
- Base spacing steps: 4, 8, 12, 16, 24, 32 and 40px. Typical content/card padding is 24–32px on desktop and 16–24px on phones.
- Reference radii: 8px controls, 14px standard panels, 20px larger cards and 28px overlays. Use consistently by component role.

The HTML requests fonts from Google Fonts. Production font delivery is an implementation choice; preserve the intended families and fallbacks and verify loading without layout disruption.

## 5. Surfaces and components

Use warm, quiet content surfaces and sage navigation. Primary actions may use the reference's subtle 160-degree brown gradient from `#846044` to `#715039`, with cream text. Selected navigation uses a clearly distinct brown treatment; maintain a visible focus state separately from selection.

The reference uses translucent cream panels, blurred navigation, warm shadows and rose-to-tan summary gradients. Retain these selectively. Dense tables, forms, bill details and long text should have stable opaque backgrounds. Provide opaque fallbacks when backdrop blur is unavailable. Avoid layering translucency where it reduces contrast or slows common staff devices.

| Component | Consistency rule |
| --- | --- |
| Button | Clear verb; one primary action per local task; hover, focus, pressed, disabled and submitting states |
| Form | Persistent label, readable input, field error with correction, preserved safe input and clear submission outcome |
| Card | Group related information; use hierarchy and spacing before decorative borders or shadows |
| Table | Clear headers, aligned values, useful filters; provide a compact/list alternative when needed on phones |
| Badge | Text plus semantic colour; keep reservation, payment, occupancy, inspection and maintenance states distinct |
| Dialog | Named heading, explicit consequence, keyboard dismissal where appropriate, focus containment and return |
| Notice/toast | Announce transient outcomes; keep consequential errors and unknown payment outcomes visible in context |

Reference shadow families are warm brown: cards `0 8px 24px rgba(75,51,34,.10)`, summaries `0 16px 40px rgba(75,51,34,.16)`, overlays `0 24px 64px rgba(75,51,34,.22)`. Apply depth sparingly and consistently.

## 6. Adaptation by experience

| Area | Layout priority | Application of the theme |
| --- | --- | --- |
| My Stay | Current reservation, next action, dates, bill, updates and contact | Calm cream surfaces, generous reading space, limited decorative summaries and simple guest navigation |
| Reception | Arrivals, reservations, room assignment, check-in/out and billing | Scannable tables and lists, compact summaries, visible conflicts and dependable action placement |
| Supervisor | Cleaning queue, blockers, personal inspection and rework | Phone-friendly task cards, large controls, explicit inspection confirmation and clear task progression |
| Owner / Manager | Exceptions, hotel oversight, finances and team access | Prioritized decisions, readable summaries and role-authorized operational access |
| Public website | Hotel discovery and sales | Separate concept pending; this application theme does not prescribe its palette, fonts or layouts |

Guest interfaces expose only safe information for the signed-in guest. Staff-only details, internal notes and financial restrictions follow the PRD even if the demo displays something more broadly. Real role access must never use the demo role switcher.

## 7. Responsive and interaction behavior

Treat the reference's 760px and 1150px breakpoints as starting points, then respond to actual content. Stack columns and summaries before they become cramped. On small phones, room/task cards may become a single column rather than retaining the demo's two-column grid. Keep navigation discoverable and key actions reachable without document-wide horizontal scrolling.

Use a 44px minimum interaction target as the implementation baseline. Provide visible keyboard focus, properly associated labels, semantic headings and tables, meaningful status announcements and usable 200% zoom. Verify text contrast on actual composited backgrounds: target 4.5:1 for normal text, 3:1 for large text and 3:1 for essential controls/focus boundaries. Adjust surface opacity or semantic shades where needed while retaining the earth direction.

Reference motion is brief: roughly 160ms button feedback, 200ms toast entry and 220ms dialog entry. Honor reduced motion. Motion never implies that a booking, payment, inspection or checkout succeeded before the backend confirms it.

Required states include loading, empty, validation error, conflict, unknown outcome after timeout, stale/offline, access denied and expired session. Styling must make those states understandable, including when an operation saved but notification delivery failed.

## 8. Implementation and verification boundary

Preserve the visual identity while building real components and task-specific screens. The HTML's sample room inventory, currency, contact information, fixed dates, financial totals and status shortcuts must be replaced by validated configuration and server data.

Design approval does not resolve payment rules, hotel policy or final public-site design. A clean appearance must never imply a room is approved, vacant, available or ready unless the corresponding backend facts support that message.

This document was derived from inspecting the reference source and final CSS override. It does not claim rendered browser testing, completed accessibility certification or functional testing of the supplied demo. During implementation, check desktop and phone layouts, keyboard navigation, font loading, contrast over translucent surfaces, reduced motion and each role's required states.

## 9. Decision history

- **17 September 2026:** User supplied the earth-palette HTML as the final application design direction and requested consistent documentation. It guides My Stay and staff interfaces while product logic and layouts follow the PRD and project vision.
- **17 September 2026 clarification:** The public hotel website will use a separate design concept. This supersedes any interpretation that the supplied earth palette also approves the public-site UI.
