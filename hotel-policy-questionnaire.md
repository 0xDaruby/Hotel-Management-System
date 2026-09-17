# XYZ Hotel — Operating Policy Questionnaire

**Purpose:** Answer the unresolved business and operating questions that currently block policy-dependent implementation and pilot readiness.

**How to complete it:** For each numbered question, place an `x` beside one option or write a short answer after **Answer**. If the hotel has not decided, write **Undecided** rather than guessing. Questions marked **Pilot blocker** must be resolved before the affected feature handles real guests or money.

This questionnaire does not replace the PRD. After it is completed, its answers should be reviewed for contradictions and converted into dated operating decisions, application rules, and acceptance tests.

## Decisions already confirmed — do not answer again

- The first delivery is intended to be a real single-hotel pilot.
- The product has connected Guest and Staff experiences using one shared system.
- The public hotel website is a luxurious, promotional discovery and sales experience featuring the hotel, amenities, offers and real room imagery.
- My Stay is a distinct, cleaner and more practical authenticated interface. My Stay and staff operations use the approved earth-palette direction in [design.md](./design.md); their actual screens follow the PRD. The public website will have a separate visual concept, still pending.
- Public discovery, My Stay and the staff portal may use different layouts in the same web application; private data is protected by authentication and backend authorization, not by visual separation alone.
- App roles are Guest, Receptionist, Supervisor, and Owner / Manager.
- Cleaners do not have app accounts.
- The supervisor normally coordinates cleaning and must personally inspect before approving cleanliness.
- The owner may perform delegated reception or supervisor work, but must also personally inspect before approving cleanliness.
- Reception cannot approve cleanliness.
- Guests primarily use Google sign-in; browsing does not require sign-in.
- A verified walk-in guest may claim an existing booking through a private, one-time invitation that expires after one hour or on use. Replacement invalidates the old invitation.
- The accountant handles charged-but-unconfirmed refunds through the hotel's existing process. There is no accountant app role and no automatic refund feature in V1.
- Phone and WhatsApp customer-care contact must be visible. This does not mean WhatsApp automation has been selected.
- A timer, schedule, or cleaner report never proves that cleaning started or finished.
- Availability, occupancy, cleanliness approval, and maintenance condition remain separate facts.

---

## A. Hotel identity and pilot configuration

### A1. Which real property will use the pilot? **Pilot blocker**

**Answer:**

### A2. What is the property's public name, physical address, and main contact number? **Pilot blocker**

**Answer:**

### A3. What timezone must the hotel use for operational times and guest messages? **Pilot blocker**

**Answer:**

### A4. What is the hotel's operating currency? **Pilot blocker**

**Answer:**

### A5. Which country/state jurisdiction governs the hotel's prices, taxes, invoices, privacy duties, and refunds? **Pilot blocker**

**Answer:**

### A6. What is the real room inventory?

For every room, provide room number/name, room type, maximum occupancy, bed arrangement, floor/location, amenities, and whether it can currently be sold.

**Answer or source document:**

### A7. Which people will participate in the pilot, and which role will each person receive?

Do not place passwords or secrets in this document.

**Answer:**

---

## B. Room sales, availability, and assignment

### B1. What does a guest buy? **Pilot blocker**

- [ ] A room type; the hotel assigns the physical room.
- [ ] A specific physical room selected by the guest.
- [ ] The hotel supports both, under clearly defined conditions.

**Answer:**

### B2. If guests buy a room type, may the system internally reserve a feasible physical room for the whole stay to prevent conflicts?

- [ ] Yes.
- [ ] No; availability should be managed only as a room-type count.
- [ ] Another rule:

**Answer:**

### B3. When may the assigned room number be shown to the guest?

- [ ] Immediately after assignment.
- [ ] On the day of arrival.
- [ ] Only after reception completes check-in.
- [ ] Another time/condition:

**Answer:**

### B4. May reception reassign a guest before check-in?

- [ ] Yes, within the same room type without guest approval.
- [ ] Yes, but the guest must be notified.
- [ ] Only with owner approval.
- [ ] No.

**Answer:**

### B5. May reception move an already checked-in guest to another room?

Define who authorizes it, whether guest consent is required, how price differences are handled, and which room receives future housekeeping updates.

**Answer:**

### B6. Must one physical room fulfil the entire stay?

- [ ] Yes; never offer an automatic split-room stay.
- [ ] No; split-room stays may be offered with explicit guest agreement.

**Answer:**

### B7. How long should an unconfirmed booking hold inventory while payment or confirmation is pending? **Pilot blocker**

**Answer in minutes:**

### B8. What happens when a booking hold expires but a payment confirmation arrives later? **Pilot blocker**

**Answer:**

### B9. What should happen when a committed or assigned room becomes unavailable because of maintenance? **Pilot blocker**

Cover same-type reassignment, upgrade, downgrade, contacting the guest, owner approval, cancellation, and refund responsibility.

**Answer:**

### B10. Is overbooking ever permitted?

- [ ] No.
- [ ] Yes, under this exact rule:

**Answer:**

---

## C. Rates, quotes, promotions, and changes

### C1. How is the nightly rate determined? **Pilot blocker**

Describe room-type base rates, weekday/weekend differences, seasons, event dates, and who may change rates.

**Answer:**

### C2. How long is a displayed quote valid before the guest must review a refreshed price?

**Answer:**

### C3. Are prices charged per room, per guest, or using both rules?

**Answer:**

### C4. What are the adult, child, and infant occupancy rules, including ages and extra-person charges?

**Answer:**

### C5. Are promotions or discount codes included in V1?

- [ ] No.
- [ ] Yes. Describe eligibility, dates, limits, and who creates them:

**Answer:**

### C6. How are stay extensions priced?

- [ ] Preserve the original nightly rate.
- [ ] Use the current rate for added nights.
- [ ] Reception/owner selects an approved rate with a recorded reason.
- [ ] Another rule:

**Answer:**

### C7. How are room upgrades and downgrades priced and approved?

**Answer:**

### C8. May staff manually override a price?

If yes, state which role, limits, required reason, and whether owner approval is needed.

**Answer:**

---

## D. Taxes, fees, invoices, and rounding

### D1. Which taxes and mandatory fees apply? **Pilot blocker**

For each, provide name, rate or fixed amount, calculation basis, and whether it is included in the displayed price.

**Answer:**

### D2. Are there optional fees, deposits, or service charges?

**Answer:**

### D3. What exact total must guests see before confirming a booking?

- [ ] Full stay total including all mandatory taxes and fees.
- [ ] Another presentation permitted by the hotel's jurisdiction:

**Answer:**

### D4. What invoice/receipt information is legally and operationally required?

**Answer:**

### D5. What rounding rule applies to rates, taxes, discounts, and refunds?

**Answer:**

---

## E. Payments and payment confirmation

### E1. Which payment model will the real pilot use? **Pilot blocker**

- [ ] Full online payment at booking.
- [ ] Deposit online; remaining balance at the hotel.
- [ ] Card authorization/guarantee; charge later.
- [ ] Pay entirely at the hotel.
- [ ] Multiple options. Describe when each is allowed:

**Answer:**

### E2. Which real payment provider will process online payments? **Pilot blocker if online payment is enabled**

**Answer:**

### E3. Which payment methods may reception record?

- [ ] Cash
- [ ] Card terminal
- [ ] Bank transfer
- [ ] Cheque
- [ ] Online provider payment
- [ ] Other:

**Answer:**

### E4. What event proves that an online payment succeeded?

The browser returning to a success page must not be the only proof.

**Answer:**

### E5. When does payment confirm a reservation? **Pilot blocker**

Define whether inventory is held first, which payment state is sufficient, and what happens during an unknown provider outcome.

**Answer:**

### E6. May reception confirm a booking before full payment?

If yes, define the required deposit or approved outstanding-balance condition.

**Answer:**

### E7. Who may record, correct, or reverse a manually recorded payment?

**Answer:**

### E8. What evidence or reference is required for cash, terminal, and transfer payments?

**Answer:**

### E9. What should staff and guests see while a payment result is unknown?

**Answer:**

### E10. After what period and through which process should an unknown payment be escalated?

**Answer:**

---

## F. Refunds and financial exceptions

### F1. How does reception verify that money was taken without a confirmed booking? **Pilot blocker**

**Answer:**

### F2. What information is handed to the accountant for a refund?

**Answer:**

### F3. What is the promised refund processing time? **Pilot blocker**

Differentiate hotel processing time from the provider/bank's settlement time.

**Answer:**

### F4. How is refund progress tracked without an accountant app account?

- [ ] Reception records updates after receiving evidence from the accountant.
- [ ] Owner records updates after receiving evidence from the accountant.
- [ ] Another process:

**Answer:**

### F5. What evidence proves that a refund is completed?

**Answer:**

### F6. Who may tell the guest that a refund is complete?

**Answer:**

### F7. Are partial refunds allowed? If yes, who approves them and how is the reason recorded?

**Answer:**

### F8. What happens when the refund provider rejects or delays a refund?

**Answer:**

---

## G. Cancellation, amendments, and no-shows

### G1. What is the guest cancellation policy? **Pilot blocker**

Define deadlines, penalties, non-refundable periods, credits, and refund treatment.

**Answer:**

### G2. May reception cancel a booking? Under which conditions?

**Answer:**

### G3. Which cancellation exceptions require owner approval?

**Answer:**

### G4. When is a guest officially a no-show? **Pilot blocker**

Provide the hotel-local time and required attempts to contact the guest.

**Answer:**

### G5. What happens to the room, payment, deposit, and booking history after a no-show?

**Answer:**

### G6. May guests modify dates, party size, or room type themselves?

For each allowed change, define the deadline and price consequence.

**Answer:**

### G7. What happens when an amendment cannot be fulfilled for the complete stay?

**Answer:**

---

## H. Arrival, identity, check-in, and keys

### H1. What are the official check-in and checkout times? **Pilot blocker**

**Answer:**

### H2. What identification must reception inspect at arrival? **Pilot blocker**

**Answer:**

### H3. Must the booking name match the ID exactly? Define allowed corrections and who approves them.

**Answer:**

### H4. Are additional occupants required to provide identification or be recorded?

**Answer:**

### H5. What other conditions must be satisfied before reception can complete check-in?

Consider balance/deposit, signed terms, age, room readiness, and registration requirements.

**Answer:**

### H6. Is pre-arrival or digital check-in included in V1?

- [ ] No; all check-ins complete at reception.
- [ ] Guests may submit details early, but reception completes check-in.
- [ ] Full digital check-in is allowed under these conditions:

**Answer:**

### H7. Is early check-in allowed?

Define availability conditions, fees, approval role, and whether a ready notification is an invitation to arrive early.

**Answer:**

### H8. What key system is used in the pilot?

- [ ] Physical key
- [ ] Key card
- [ ] Digital key
- [ ] Other:

**Answer:**

### H9. What is the procedure for lost, replaced, or unreturned keys?

**Answer:**

---

## I. Walk-in booking claim and account recovery

### I1. What exact evidence must reception check before issuing a stay invitation? **Pilot blocker**

A name, email address, or booking reference alone is not sufficient under the current specification.

**Answer:**

### I2. Must the guest be physically present when the invitation is issued?

**Answer:**

### I3. Where may reception deliver the private invitation?

- [ ] Show as a QR code in person.
- [ ] Send to a verified email address.
- [ ] Send to a verified phone number.
- [ ] Another approved method:

**Answer:**

### I4. What should reception do if the booking is already linked to a different Google identity?

**Answer:**

### I5. What should happen if the guest cannot or will not use Google?

- [ ] Reception serves the stay without online My Stay access.
- [ ] Another approved identity route exists:

**Answer:**

### I6. What proof is required before staff help a guest recover access to an existing stay/account?

**Answer:**

### I7. What is the staff password-recovery procedure and delivery channel? **Pilot blocker**

**Answer:**

---

## J. Housekeeping, inspection, and room readiness

### J1. What is the normal housekeeping schedule for occupied rooms?

**Answer:**

### J2. Is occupied-room housekeeping opt-in, opt-out, or mandatory?

- [ ] Guest requests it when needed.
- [ ] Scheduled automatically unless declined.
- [ ] Mandatory under defined conditions.
- [ ] Another policy:

**Answer:**

### J3. What are the Do Not Disturb rules? **Pilot blocker for in-stay housekeeping**

Define maximum duration, emergency/safety exceptions, repeated contact, and what wins when housekeeping was previously requested.

**Answer:**

### J4. Which housekeeping and service requests are offered in V1?

**Answer:**

### J5. May a guest have more than one active request of the same type?

- [ ] No; repeated submissions return the existing request.
- [ ] Yes; intentional repeat requests remain separate.
- [ ] Merge only within this time window:

**Answer:**

### J6. May a guest cancel a scheduled request? Until which state?

**Answer:**

### J7. What response and completion times should the hotel promise for each request type?

**Answer:**

### J8. What makes a task delayed, and who is alerted?

**Answer:**

### J9. What inspection checklist must the supervisor or owner personally complete? **Pilot blocker**

List required checks and which failures prevent approval.

**Answer:**

### J10. Which inspection comments/rework reasons should be standardized?

**Answer:**

### J11. What events invalidate an existing cleanliness approval? **Pilot blocker**

Consider checkout, room use, maintenance entry, a new guest stay, failed inspection, contamination, and room reassignment.

**Answer:**

### J12. Does checkout always mark the room as requiring turnover cleaning?

- [ ] Yes.
- [ ] No. Define exceptions:

**Answer:**

### J13. What exact conditions allow the system to show “Room ready for check-in”? **Pilot blocker**

The current minimum is: correct assignment, vacant, in service, no applicable maintenance block, current personal inspection approval, and arrival eligibility. Add or change conditions here.

**Answer:**

### J14. What happens if a room becomes blocked after a ready notification was sent?

Define guest message, reassignment responsibility, escalation, and preserved history.

**Answer:**

### J15. Which internal housekeeping details may be translated into guest-facing updates?

**Answer:**

---

## K. Bills, checkout, and late financial changes

### K1. Who may add a charge to a guest's bill, and which charge types are permitted in V1?

**Answer:**

### K2. Who may correct or void a charge, and what approval/reason is required?

**Answer:**

### K3. What conditions must be satisfied before checkout may complete? **Pilot blocker**

Cover open charges, unknown payments, outstanding balance, room keys, and unresolved exceptions.

**Answer:**

### K4. May a guest check out with an outstanding balance?

If yes, define limit, approver, evidence, and follow-up process.

**Answer:**

### K5. Who finalizes the bill, and at what moment does it become the final bill?

**Answer:**

### K6. Is self-service digital checkout included in V1?

- [ ] No; the guest requests assistance and reception completes checkout.
- [ ] Yes, under these eligibility conditions:

**Answer:**

### K7. How should a late charge discovered after checkout be recorded and communicated?

**Answer:**

### K8. How should a late payment received after checkout be reconciled and communicated?

**Answer:**

### K9. May an issued final receipt be replaced, or must corrections produce a separate document?

**Answer:**

---

## L. Guest messages and automated notifications

### L1. Which automated delivery channels will the pilot use? **Pilot blocker**

- [ ] Email
- [ ] SMS
- [ ] Automated WhatsApp
- [ ] In-app only
- [ ] No automation initially; staff contact guests manually
- [ ] Other:

**Answer:**

### L2. Which events should automatically notify a guest?

Consider booking confirmation, payment state, room ready, delays, request progress, messages, cancellation, checkout, receipt, and refund progress.

**Answer:**

### L3. Which notifications are mandatory service messages, and which require opt-in consent?

**Answer:**

### L4. What are the quiet hours in hotel-local time, and which urgent messages may bypass them?

**Answer:**

### L5. How many times should failed deliveries retry, over what period, and when should staff be alerted?

**Answer:**

### L6. What may staff do when a message fails but the underlying booking/payment/housekeeping action succeeded?

**Answer:**

### L7. Which staff roles may view and reply to guest conversations?

Clarify the supervisor's access to service requests versus general guest messages.

**Answer:**

### L8. What are the hotel's official phone and WhatsApp customer-care numbers and supported hours? **Pilot blocker**

**Answer:**

---

## M. Data, privacy, audit, and media

### M1. How long should the hotel retain guest profiles, reservations, messages, bills, receipts, payment references, and audit history? **Pilot blocker**

Provide a retention period for each category.

**Answer:**

### M2. What privacy notice and guest consent are legally required?

**Answer:**

### M3. How may a guest request correction, export, or deletion of personal information?

Define records that must remain for legal/accounting/audit reasons.

**Answer:**

### M4. Which staff may view guest contact details, identity information, stay history, messages, and receipts?

**Answer:**

### M5. Will the hotel upload room images through the app in V1? Who may manage them?

**Answer:**

### M6. Will receipt or payment-evidence files be uploaded? Define permitted formats, size limit, access, and retention.

**Answer:**

### M7. Which important actions require an audit reason in addition to actor and time?

Consider price overrides, cancellations, room moves, financial corrections, role changes, inspection revocation, and data access.

**Answer:**

---

## N. Hosting, backup, recovery, and outages

### N1. Where may hotel and guest data be hosted? **Pilot blocker**

State allowed country/region and any prohibited locations.

**Answer:**

### N2. What monthly hosting budget is available?

**Answer:**

### N3. What maximum amount of recent data loss is acceptable after a serious failure? **Pilot blocker**

This is the recovery point objective (for example, 15 minutes or 24 hours).

**Answer:**

### N4. How quickly must service be restored after a serious failure? **Pilot blocker**

This is the recovery time objective.

**Answer:**

### N5. How often should backups run, and how long should they be kept?

**Answer:**

### N6. Who is responsible for checking backups and performing restore tests?

**Answer:**

### N7. What manual procedure will staff use when the application or internet is unavailable? **Pilot blocker**

Cover arrivals, new bookings, room status, payments, receipts, checkout, and later reconciliation.

**Answer:**

### N8. Who may declare an outage, communicate it, and approve restored operation?

**Answer:**

### N9. Which failures require an immediate alert?

Consider database unavailability, worker stoppage, old pending events, payment exceptions, backup failure, and repeated notification failure.

**Answer:**

---

## O. Pilot operation and acceptance

### O1. What exact guest journey must work on the first pilot day?

**Answer:**

### O2. Which features may remain disabled during the first pilot?

**Answer:**

### O3. Who has authority to approve the configured hotel policies before launch?

**Answer:**

### O4. Who will train reception, the supervisor, and the owner?

**Answer:**

### O5. What fictional test data and test accounts may be used before real data is entered?

**Answer:**

### O6. What evidence is required before the pilot is considered ready?

At minimum, consider completed end-to-end journeys, permission tests, concurrent last-room booking, payment/refund failure paths, stale inspection protection, backup restore, and outage rehearsal.

**Answer:**

### O7. Who makes the final go/no-go decision for the real pilot?

**Answer:**

### O8. What conditions require pausing the pilot after launch?

Consider incorrect availability, duplicate charges, exposed guest data, incorrect bills, false room-ready messages, and unavailable recovery.

**Answer:**

---

## Completion sign-off

**Hotel owner / policy approver:**

**Reception representative:**

**Supervisor representative:**

**Accountant consulted for payment/refund sections:** Yes / No

**Technical reviewer:**

**Date reviewed:**

**Unresolved questions accepted for later:**

**Sections approved for implementation:**
