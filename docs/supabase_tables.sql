-- Supabase tables including admins table

create extension if not exists pgcrypto;

-- profiles
create table profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  nickname text,
  school text,
  bio text,
  profile_image text,
  location text,
  updated_at timestamptz default now()
);

-- projects
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image text,
  technologies text[],
  demo_url text,
  github_url text,
  created_at timestamptz default now()
);

-- certificates
create table certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  date date,
  image text,
  certificate_url text,
  description text,
  created_at timestamptz default now()
);

-- skills
create table skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text,
  created_at timestamptz default now()
);

-- social_links
create table social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  icon text
);

-- messages (contact form)
create table messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- admins table: store admin user ids (from supabase auth)
create table admins (
  user_id uuid primary key,
  created_at timestamptz default now()
);

-- Example: after you create an auth user, insert into admins
-- insert into admins (user_id) values ('00000000-0000-0000-0000-000000000000');
