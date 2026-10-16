-- WebCraft Creations - guest reviews with immediate publication.
-- Run in Supabase SQL Editor for the SAME project configured in .env.local.
-- This does NOT auto-publish existing pending reviews.
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  name text not null check (char_length(name) between 2 and 80),
  rating integer not null check (rating between 1 and 5),
  message text not null check (char_length(message) between 10 and 1000),
  is_approved boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.reviews alter column user_id drop not null;
alter table public.reviews alter column is_approved set default true;
alter table public.reviews enable row level security;
drop policy if exists "Everyone can read approved reviews" on public.reviews;
drop policy if exists "Users can submit own reviews" on public.reviews;
drop policy if exists "Public can view approved reviews" on public.reviews;
drop policy if exists "Public can submit reviews" on public.reviews;
create policy "Public can view approved reviews" on public.reviews
for select to anon, authenticated using (is_approved = true);
create policy "Public can submit reviews" on public.reviews
for insert to anon, authenticated with check (user_id is null and is_approved = true);
revoke all on public.reviews from anon, authenticated;
grant select (id,name,rating,message,created_at) on public.reviews to anon, authenticated;
grant insert (name,rating,message) on public.reviews to anon, authenticated;
create index if not exists reviews_approved_created_idx
on public.reviews (created_at desc) where is_approved = true;
-- Do not expose service-role credentials in frontend or disable RLS.
-- Strongly recommended before production: edge-function/Turnstile + rate limits to curb spam.
