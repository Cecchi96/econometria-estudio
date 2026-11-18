-- Econometría I · anotaciones privadas por usuario
-- Proyecto Supabase: guknbhqonmpjtcbjsbni
-- Ejecutar en el SQL Editor del proyecto o con:
--   supabase db query --project-ref guknbhqonmpjtcbjsbni --file supabase/eco_annotations.sql

create table if not exists public.eco_annotations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  class_id text not null,
  block_id text not null,
  start_offset integer not null check (start_offset >= 0),
  end_offset integer not null check (end_offset > start_offset),
  quote text not null,
  note text not null default '',
  color text not null default 'yellow' check (color in ('yellow', 'green')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists eco_annotations_user_class_idx
  on public.eco_annotations (user_id, class_id, created_at desc);

alter table public.eco_annotations enable row level security;
revoke all on public.eco_annotations from anon;
grant select, insert, update, delete on public.eco_annotations to authenticated;

drop policy if exists "eco_annotations_select_own" on public.eco_annotations;
create policy "eco_annotations_select_own"
  on public.eco_annotations for select
  using (auth.uid() = user_id);

drop policy if exists "eco_annotations_insert_own" on public.eco_annotations;
create policy "eco_annotations_insert_own"
  on public.eco_annotations for insert
  with check (auth.uid() = user_id);

drop policy if exists "eco_annotations_update_own" on public.eco_annotations;
create policy "eco_annotations_update_own"
  on public.eco_annotations for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "eco_annotations_delete_own" on public.eco_annotations;
create policy "eco_annotations_delete_own"
  on public.eco_annotations for delete
  using (auth.uid() = user_id);

create or replace function public.eco_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists eco_annotations_touch on public.eco_annotations;
create trigger eco_annotations_touch
  before update on public.eco_annotations
  for each row execute function public.eco_touch_updated_at();
