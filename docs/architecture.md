# Nova Architecture

Nova is organized as a production-oriented monorepo with independently deployable apps.

## Apps

- `apps/web`: Next.js marketing and product frontend.
- `apps/api`: Go API for auth, profile, backup, database, Redis, and token logic.

## Packages

- `packages/shared-types`: shared constants and type-like values.
- `packages/shared-utils`: small runtime helpers that can be used across apps.

## Future Admin App

Do not create `apps/admin` until product requirements are ready. When needed, add it as a separate app beside `apps/web` and `apps/api` for user management, project management, deployment monitoring, logs, billing, and system settings.
