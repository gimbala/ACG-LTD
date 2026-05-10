-- ACG LTD — run in Supabase SQL Editor after creating a project.
-- Enables consultation capture, Auth profiles, service packages, and client cases.

-- Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'client' check (role in ('client', 'admin')),
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_select_admin"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Consultation requests (public marketing form)
create table if not exists public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  current_location text not null,
  destination_country text not null,
  timeline text not null,
  relocation_type text not null,
  message text
);

alter table public.consultation_requests enable row level security;

create policy "consultation_insert_anon"
  on public.consultation_requests for insert
  with check (true);

create policy "consultation_select_admin"
  on public.consultation_requests for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Service packages (JSON mirrors app Package type: services[], documents[])
create table if not exists public.service_packages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  name text not null,
  description text default '',
  price_usd numeric not null default 0,
  services jsonb not null default '[]'::jsonb,
  documents jsonb not null default '[]'::jsonb
);

alter table public.service_packages enable row level security;

create policy "packages_select_authenticated"
  on public.service_packages for select
  using (auth.role() = 'authenticated');

create policy "packages_all_admin"
  on public.service_packages for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Client relocation cases
create table if not exists public.client_cases (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  user_id uuid references auth.users (id) on delete set null,
  package_id uuid references public.service_packages (id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  current_location text,
  destination text,
  status text not null default 'pending' check (status in ('active', 'pending', 'completed')),
  start_date date,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  case_manager text,
  milestones jsonb not null default '[]'::jsonb,
  documents jsonb not null default '[]'::jsonb
);

alter table public.client_cases enable row level security;

create policy "cases_select_own"
  on public.client_cases for select
  using (auth.uid() is not null and user_id = auth.uid());

create policy "cases_select_admin"
  on public.client_cases for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "cases_insert_admin"
  on public.client_cases for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "cases_update_admin"
  on public.client_cases for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "cases_delete_admin"
  on public.client_cases for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- New user → profile row (default role client; set admin in Dashboard or SQL)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(coalesce(new.email, ''), '@', 1)),
    'client'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Storage bucket for client documents (optional; create bucket "client-docs" in UI if needed)
-- Policies can be added once the bucket exists.

-- Booking confirmation emails: deploy Edge Function `send-booking-confirmation`
-- (see /supabase/functions/send-booking-confirmation/) and set Resend secrets in Dashboard.
