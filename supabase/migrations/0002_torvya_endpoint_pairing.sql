-- Torvya: endpoints físicos independentes para QR Code e NFC.
-- Mantém plates.public_code como código canônico/legado da placa.

create table if not exists public.plate_endpoints (
  id uuid primary key default gen_random_uuid(),
  public_code varchar(16) not null unique,
  kind text not null check (kind in ('qr','nfc')),
  plate_id uuid references public.plates(id) on delete cascade,
  batch_id uuid references public.batches(id) on delete set null,
  status text not null default 'available'
    check (status in ('available','paired','suspended','retired')),
  paired_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists one_endpoint_kind_per_plate
  on public.plate_endpoints(plate_id, kind)
  where plate_id is not null;

create index if not exists plate_endpoints_plate_id_idx
  on public.plate_endpoints(plate_id);

create index if not exists plate_endpoints_kind_status_idx
  on public.plate_endpoints(kind, status);

-- Registra placas legadas como endpoint QR canônico.
insert into public.plate_endpoints (public_code, kind, plate_id, batch_id, status, paired_at)
select p.public_code, 'qr', p.id, p.batch_id,
  case when p.status in ('suspended','retired') then p.status else 'available' end,
  case when p.status = 'activated' then p.activated_at else null end
from public.plates p
on conflict (public_code) do nothing;

alter table public.plate_endpoints enable row level security;

create policy "members can read own endpoints"
on public.plate_endpoints
for select
to authenticated
using (
  plate_id is not null
  and exists (
    select 1
    from public.plates p
    where p.id = plate_endpoints.plate_id
      and p.organization_id is not null
      and public.is_org_member(p.organization_id)
  )
);

-- Projetos Supabase novos não expõem mais tabelas public automaticamente.
-- O backend administrativo usa service_role; usuários autenticados precisam
-- apenas de leitura dos endpoints pertencentes às próprias organizações.
grant select on public.plate_endpoints to authenticated;
grant all on public.plate_endpoints to service_role;

update public.product_templates
set name = case code
  when 'google_review' then 'Torvya Review'
  when 'direct_link' then 'Torvya Link'
  when 'nooli_page' then 'Torvya Page'
  else name
end;
