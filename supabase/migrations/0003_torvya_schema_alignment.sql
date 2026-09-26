-- Alinha instalações criadas pelas migrations 0001/0002 ao schema efetivo da Torvya.

insert into public.product_templates (code, name, activation_flow, description, is_active)
select 'torvya_page', 'Torvya Page', 'torvya_page', 'Página Torvya com múltiplos links e blocos.', false
where not exists (
  select 1 from public.product_templates where code = 'torvya_page'
);

update public.batches set product_type = 'torvya_page' where product_type = 'nooli_page';
update public.plates set product_type = 'torvya_page' where product_type = 'nooli_page';
update public.media_tokens set product_type = 'torvya_page' where product_type = 'nooli_page';
delete from public.product_templates where code = 'nooli_page';

alter table public.plate_claims alter column business_name drop not null;

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

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

drop policy if exists "members can read organizations" on public.organizations;
create policy "members can read organizations"
on public.organizations for select to authenticated
using (private.is_org_member(id));

drop policy if exists "members can read memberships" on public.organization_members;
create policy "members can read memberships"
on public.organization_members for select to authenticated
using (private.is_org_member(organization_id));

drop policy if exists "members can read own plates" on public.plates;
create policy "members can read own plates"
on public.plates for select to authenticated
using (organization_id is not null and private.is_org_member(organization_id));

drop policy if exists "members can read destination history" on public.destination_history;
create policy "members can read destination history"
on public.destination_history for select to authenticated
using (
  exists (
    select 1 from public.plates p
    where p.id = destination_history.plate_id
      and p.organization_id is not null
      and private.is_org_member(p.organization_id)
  )
);

drop function if exists public.is_org_member(uuid);

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

drop policy if exists "no client access to batches" on public.batches;
create policy "no client access to batches"
on public.batches for all to anon, authenticated
using (false) with check (false);

drop policy if exists "no client access to media tokens" on public.media_tokens;
create policy "no client access to media tokens"
on public.media_tokens for all to anon, authenticated
using (false) with check (false);

drop policy if exists "no client access to pairing sessions" on public.pairing_sessions;
create policy "no client access to pairing sessions"
on public.pairing_sessions for all to anon, authenticated
using (false) with check (false);

drop policy if exists "no client access to plate claims" on public.plate_claims;
create policy "no client access to plate claims"
on public.plate_claims for all to anon, authenticated
using (false) with check (false);

create index if not exists batches_created_by_idx on public.batches(created_by);
create index if not exists batches_product_type_idx on public.batches(product_type);
create index if not exists destination_history_changed_by_idx on public.destination_history(changed_by);
create index if not exists destination_history_plate_id_idx on public.destination_history(plate_id);
create index if not exists media_tokens_product_type_idx on public.media_tokens(product_type);
create index if not exists organization_members_user_id_idx on public.organization_members(user_id);
create index if not exists pairing_sessions_plate_id_idx on public.pairing_sessions(plate_id);
create index if not exists pairing_sessions_second_media_idx on public.pairing_sessions(second_media_id);
create index if not exists plates_claimed_by_idx on public.plates(claimed_by);
