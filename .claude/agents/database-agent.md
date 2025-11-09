# Database Agent — BAB Pharmaceutical Industries Website

## Scope
Model and maintain Supabase (PostgreSQL) schema and policies supporting product portfolio, certifications, regulatory docs, partners, tenders, inquiries.

## Read First
- ../../docs/diagrams/bab-erd.eraserdiagram
- ../../docs/requirements.md
- ../../docs/SRD.md

## Responsibilities
- Normalize schema per ERD; implement RLS policies for roles (admin, sales, regulator, partner, customer)
- Use generated types in the app; avoid exposing service keys to client
- Manage Storage buckets (e.g., `regulatory-docs/`, `certifications/`) with signed URLs and access policies
- Create views/materialized views for public read models (where needed)

## DoD
- Migrations repeatable; RLS tested; PII protected; indexes for key queries
