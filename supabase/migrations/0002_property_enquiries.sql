-- 0002: property enquiries for the /properties contact form.
--
-- RLS policy per spec: anyone (anon included) may INSERT an enquiry;
-- only admins may SELECT. Admin status is determined by a `profiles.role`
-- row for the signed-in user (auth.uid()); if you already have an admin
-- flag elsewhere, swap the USING clause to match.
--
-- Run after 0001 (init schema with `profiles` table + auth setup).

create table if not exists public.property_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null, -- normalised to +254… before insert
  email text,
  property_slug text, -- references the mock-data slug today; FK once a properties table exists
  message text,
  source text not null default 'properties-page'
);

comment on table public.property_enquiries is
  'Enquiries submitted from the /properties contact form. Insert-only for the public; readable by admins only.';

-- Reasonable index for the admin inbox (newest first).
create index if not exists property_enquiries_created_at_idx
  on public.property_enquiries (created_at desc);

-- Enable RLS: no access unless a policy below grants it.
alter table public.property_enquiries enable row level security;

-- Helper: is the current user an admin? (profiles.role = 'admin')
-- Adjust to your own admin check if 0001 defines one differently.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Anyone (anon + authenticated) can INSERT an enquiry.
create policy "Anyone can insert property enquiries"
  on public.property_enquiries
  for insert
  to anon, authenticated
  with check (true);

-- Only admins can read enquiries.
create policy "Admins can select property enquiries"
  on public.property_enquiries
  for select
  to authenticated
  using (public.is_admin());
