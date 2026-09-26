-- Torvya: QR Code e NFC passam a ter identificadores independentes.
-- A migration é compatível com placas existentes e adiciona o novo fluxo sem removê-las.

alter table public.plates alter column batch_id drop not null;
alter table public.plates alter column sequence_number drop not null;

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

create index media_tokens_code_idx on public.media_tokens(code);
create index media_tokens_plate_id_idx on public.media_tokens(plate_id);

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

create index pairing_sessions_first_media_idx on public.pairing_sessions(first_media_id);
create index pairing_sessions_state_expires_idx on public.pairing_sessions(state, expires_at);

alter table public.media_tokens enable row level security;
alter table public.pairing_sessions enable row level security;

-- As duas tabelas são acessadas somente pelo backend com service role.
-- Nenhuma policy pública é criada intencionalmente.
