import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (_client) return _client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error(
      'Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    )
  }
  _client = createClient(url, key)
  return _client
}

// Convenience alias — evaluated lazily at call time, not import time
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

/*
SQL to create the proposals table in Supabase:

create table proposals (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  client_name text not null,
  client_company text not null,
  products text[] not null,
  form_data jsonb not null,
  content jsonb not null,
  edited_content jsonb,
  slug text unique not null
);

create index proposals_slug_idx on proposals(slug);

-- Row Level Security
alter table proposals enable row level security;
create policy "Public read"   on proposals for select using (true);
create policy "Insert any"    on proposals for insert with check (true);
create policy "Update any"    on proposals for update using (true);
*/
