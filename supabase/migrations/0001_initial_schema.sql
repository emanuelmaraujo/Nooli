create extension if not exists pgcrypto;

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
  quantity integer not null check (quantity > 0),
  redirect_base_url text not null,
  status text not null default 'draft' check (status in ('draft','generated','production','completed','cancelled')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.plates (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid not null references public.batches(id) on delete restrict,
  sequence_number integer not null,
  public_code varchar(16) not null unique,
  organization_id uuid references public.organizations(id) on delete set null,
  destination_type text check (destination_type in ('google','whatsapp','instagram','url')),
  destination_url text,
  status text not null default 'manufactured' check (status in ('manufactured','available','claiming','activated','suspended','retired')),
  kv_sync_status text not null default 'pending' check (kv_sync_status in ('pending','synced','error')),
  kv_synced_at timestamptz,
  activated_at timestamptz,
  claimed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (batch_id, sequence_number)
);

create table public.plate_claims (
  id uuid primary key default gen_random_uuid(),
  plate_id uuid not null references public.plates(id) on delete cascade,
  email text not null,
  business_name text not null,
  destination_type text not null check (destination_type in ('google','whatsapp','instagram','url')),
  destination_url text not null,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index one_open_claim_per_plate on public.plate_claims(plate_id) where consumed_at is null;
create index plates_organization_id_idx on public.plates(organization_id);
create index plates_batch_id_idx on public.plates(batch_id);
create index plates_status_idx on public.plates(status);

create table public.destination_history (
  id bigint generated always as identity primary key,
  plate_id uuid not null references public.plates(id) on delete cascade,
  previous_url text,
  new_url text,
  changed_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger plates_set_updated_at before update on public.plates
for each row execute function public.set_updated_at();

create or replace function public.is_org_member(target_org uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.organization_members m where m.organization_id = target_org and m.user_id = auth.uid());
$$;

revoke all on function public.is_org_member(uuid) from public;
grant execute on function public.is_org_member(uuid) to authenticated;

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.batches enable row level security;
alter table public.plates enable row level security;
alter table public.plate_claims enable row level security;
alter table public.destination_history enable row level security;

create policy "members can read organizations" on public.organizations for select to authenticated using (public.is_org_member(id));
create policy "members can read memberships" on public.organization_members for select to authenticated using (public.is_org_member(organization_id));
create policy "members can read own plates" on public.plates for select to authenticated using (organization_id is not null and public.is_org_member(organization_id));
create policy "members can read destination history" on public.destination_history for select to authenticated using (exists (select 1 from public.plates p where p.id = destination_history.plate_id and p.organization_id is not null and public.is_org_member(p.organization_id)));
