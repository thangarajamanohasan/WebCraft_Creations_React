# WebCraft Creations - fixed light-theme animated website

## Setup
1. `npm.cmd install`
2. Copy `.env.example` to `.env.local` and enter your existing Supabase project URL and publishable key.
3. In the **same** Supabase project, run `supabase/reviews.sql` once in SQL Editor.
4. `npm.cmd run dev` for local preview; `npm.cmd run build` for production test.

## Notes
- Guest reviews publish immediately. No Google login and no manual approval.
- Previously pending reviews are left pending; change them explicitly if desired.
- Every visitor/device reads the same database. List/stats refresh via Realtime and periodic polling.
- Existing project/logo and contact details preserved; no projects or people profiles.
- Motion respects reduced-motion OS settings.
- Do not commit `.env.local` or use Supabase secret/service-role keys in the browser.
- Public submissions attract spam; set up server-side bot checks and throttling before advertising the website widely.
- Contact form opens WhatsApp; it does not send email or store enquiries.
