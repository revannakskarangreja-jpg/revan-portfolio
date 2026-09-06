# Revan Portfolio

Starter fullstack portfolio for Rizki Revandita Pratama (Vann).

This repository contains a Next.js frontend scaffold integrated with Supabase for Auth, Database and Storage. It includes example components for Hero, Navbar, ThemeToggle, and starter API routes that use a server-side Supabase service role key.

IMPORTANT
- This is a starter scaffold. You must create a Supabase project and set environment variables before running.
- Set SUPABASE_SERVICE_ROLE_KEY in your hosting provider (Vercel) as a secret — do NOT expose it in the browser.

Quick start
1. cd frontend
2. cp .env.example .env.local and set values
3. npm install
4. npm run dev

Supabase setup
1. Create a Supabase project
2. Run the SQL in docs/supabase_tables.sql in Supabase SQL editor
3. Create a bucket named `images` in Storage
4. Create an admin user (email/password) via Supabase Auth or the Dashboard
5. In the `admins` table insert the user_id of the admin (see docs)

Deploy
- Frontend: Vercel (set env vars from .env.example)
- Database & Storage: Supabase
