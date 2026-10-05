# Project Architecture Rules

- Route all visitor-facing WhatsApp actions through `WhatsAppProvider`; it preserves lead capture, storage, conversion tracking, and delayed redirect in one flow.
- Emit named marketing events through the shared tracking helper so Google Ads and the data layer stay consistent across pages.
- Preserve the existing `natalia` submission contract for required lead fields; optional qualification fields are folded into existing storage columns until the database schema is expanded.