# Nova Monorepo

Nova is a deployment platform project with a Next.js web app and a Go API.

## Structure

```text
apps/web                 Next.js App Router frontend
apps/api                 Go Gin API
packages/shared-types    Shared frontend/runtime constants
packages/shared-utils    Shared utility helpers
docs                     Architecture and product notes
infra                    Infrastructure notes and future IaC
```

## Local Setup

```bash
npm install
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

Run the web app:

```bash
npm run dev:web
```

Run the API:

```bash
npm run dev:api
```

Run local services:

```bash
docker compose up mysql redis
```

## Deployment

`apps/web` and `apps/api` are independently deployable. Each app includes its own Dockerfile and README.

## Admin App

No admin app is included yet. A future `apps/admin` can be added for user management, project management, deployment monitoring, logs, billing, and system settings.
