create extension if not exists pgcrypto;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create table public.product_templates (
  code text primary key,
  name text not null,
  activation_flow text not null,
  description text,
  is_active boolean not null default false,
  created_at timestamptz not null default now()
);

insert into public.product_templates (code, name, activation_flow, description, is_active)
values
  ('google_review', 'Torvya Review', 'google_review', 'Placa focada em avaliações do Google.', true),
  ('direct_link', 'Torvya Link', 'direct_link', 'Placa personalizada com redirecionamento único.', false),
  ('torvya_page', 'Torvya Page', 'torvya_page', 'Página Torvya com múltiplos links e blocos.', false);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','admin','member')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.batches (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  product_type text not null default 'google_review'
    references public.product_templates(code),
  quantity integer not null check (quantity > 0),
  redirect_base_url text not null,
  status text not null default 'draft'
    check (status in ('draft','generated','production','completed','cancelled')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.plates (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid references public.batches(id) on delete restrict,
  sequence_number integer,
  public_code varchar(16) not null unique,
  product_type text not null default 'google_review'
    references public.product_templates(code),
  organization_id uuid references public.organizations(id) on delete set null,
  destination_type text,
  destination_url text,
  status text not null default 'manufactured'
    check (status in ('manufactured','available','claiming','activated','suspended','retired')),
  kv_sync_status text not null default 'pending'
    check (kv_sync_status in ('pending','synced','error')),
  kv_synced_at timestamptz,
  activated_at timestamptz,
  claimed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (batch_id, sequence_number)
);

create table public.media_tokens (
  id uuid primary key default gen_random_uuid(),
  code varchar(16) not null unique,
  medium text not null check (medium in ('qr','nfc')),
  product_type text not null default 'google_review'
    references public.product_templates(code),
  batch_id uuid references public.batches(id) on delete set null,
  sequence_number integer,
  plate_id uuid references public.plates(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (batch_id, sequence_number, medium)
);

create table public.pairing_sessions (
  id uuid primary key default gen_random_uuid(),
  first_media_id uuid not null references public.media_tokens(id) on delete cascade,
  second_media_id uuid references public.media_tokens(id) on delete set null,
  plate_id uuid references public.plates(id) on delete set null,
  email text not null,
  destination_type text not null default 'google_review',
  destination_url text not null,
  state text not null default 'pending'
    check (state in ('pending','paired','expired','consumed','cancelled')),
  expires_at timestamptz not null,
  paired_at timestamptz,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.plate_claims (
  id uuid primary key default gen_random_uuid(),
  plate_id uuid not null references public.plates(id) on delete cascade,
  email text not null,
  business_name text,
  destination_type text not null,
  destination_url text not null,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index one_open_claim_per_plate
  on public.plate_claims(plate_id)
  where consumed_at is null;

create index plates_organization_id_idx on public.plates(organization_id);
create index plates_batch_id_idx on public.plates(batch_id);
create index plates_status_idx on public.plates(status);
create index plates_product_type_idx on public.plates(product_type);
create index media_tokens_code_idx on public.media_tokens(code);
create index media_tokens_plate_id_idx on public.media_tokens(plate_id);
create index media_tokens_batch_sequence_idx on public.media_tokens(batch_id, sequence_number);
create index pairing_sessions_first_media_idx on public.pairing_sessions(first_media_id);
create index pairing_sessions_state_expires_idx on public.pairing_sessions(state, expires_at);

create table public.destination_history (
  id bigint generated always as identity primary key,
  plate_id uuid not null references public.plates(id) on delete cascade,
  previous_url text,
  new_url text,
  changed_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger plates_set_updated_at
before update on public.plates
for each row execute function public.set_updated_at();

create or replace function private.is_org_member(target_org uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.organization_members m
    where m.organization_id = target_org
      and m.user_id = (select auth.uid())
  );
$$;

revoke all on function private.is_org_member(uuid) from public;
grant execute on function private.is_org_member(uuid) to authenticated;

alter table public.product_templates enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.batches enable row level security;
alter table public.plates enable row level security;
alter table public.media_tokens enable row level security;
alter table public.pairing_sessions enable row level security;
alter table public.plate_claims enable row level security;
alter table public.destination_history enable row level security;

revoke all on table public.product_templates from anon, authenticated;
revoke all on table public.organizations from anon, authenticated;
revoke all on table public.organization_members from anon, authenticated;
revoke all on table public.batches from anon, authenticated;
revoke all on table public.plates from anon, authenticated;
revoke all on table public.media_tokens from anon, authenticated;
revoke all on table public.pairing_sessions from anon, authenticated;
revoke all on table public.plate_claims from anon, authenticated;
revoke all on table public.destination_history from anon, authenticated;

grant select on table public.product_templates to authenticated;
grant select on table public.organizations to authenticated;
grant select on table public.organization_members to authenticated;
grant select on table public.plates to authenticated;
grant select on table public.destination_history to authenticated;

create policy "authenticated can read active product templates"
on public.product_templates
for select
to authenticated
using (is_active = true);

create policy "members can read organizations"
on public.organizations
for select
to authenticated
using (private.is_org_member(id));

create policy "members can read memberships"
on public.organization_members
for select
to authenticated
using (private.is_org_member(organization_id));

create policy "members can read own plates"
on public.plates
for select
to authenticated
using (
  organization_id is not null
  and private.is_org_member(organization_id)
);

create policy "members can read destination history"
on public.destination_history
for select
to authenticated
using (
  exists (
    select 1
    from public.plates p
    where p.id = destination_history.plate_id
      and p.organization_id is not null
      and private.is_org_member(p.organization_id)
  )
);
