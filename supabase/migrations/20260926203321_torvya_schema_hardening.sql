create index if not exists batches_created_by_idx on public.batches(created_by);
create index if not exists batches_product_type_idx on public.batches(product_type);
create index if not exists destination_history_changed_by_idx on public.destination_history(changed_by);
create index if not exists destination_history_plate_id_idx on public.destination_history(plate_id);
create index if not exists media_tokens_product_type_idx on public.media_tokens(product_type);
create index if not exists organization_members_user_id_idx on public.organization_members(user_id);
create index if not exists pairing_sessions_plate_id_idx on public.pairing_sessions(plate_id);
create index if not exists pairing_sessions_second_media_idx on public.pairing_sessions(second_media_id);
create index if not exists plates_claimed_by_idx on public.plates(claimed_by);

create policy "no client access to batches"
on public.batches for all to anon, authenticated
using (false) with check (false);

create policy "no client access to media tokens"
on public.media_tokens for all to anon, authenticated
using (false) with check (false);

create policy "no client access to pairing sessions"
on public.pairing_sessions for all to anon, authenticated
using (false) with check (false);

create policy "no client access to plate claims"
on public.plate_claims for all to anon, authenticated
using (false) with check (false);
