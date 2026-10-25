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
docker compose up postgres redis
```

## Validation and Current Readiness

```bash
npm ci
npm run lint:web
npm run build:web
cd apps/api
ACCESS_TOKEN_SECRET=local-test-access-secret REFRESH_TOKEN_SECRET=local-test-refresh-secret go test -race ./...
ACCESS_TOKEN_SECRET=local-test-access-secret REFRESH_TOKEN_SECRET=local-test-refresh-secret go vet ./...
```

The secrets above are only for tests. The API requires PostgreSQL at runtime.
Local PostgreSQL uses port `5433`; Compose containers use `postgres:5432` and
wait for PostgreSQL and Redis health checks before starting the API.
`/auth/refresh` accepts a refresh token in its Bearer header, even after the
access token has expired.

New projects are currently browser-local drafts, not provisioned deployments.
The dashboard uses sample projects. Persistent project APIs, build workers,
and deployment orchestration are still needed for a complete deployment platform.

Keep active development checkouts on local disk. Cloud storage optimization can
turn source files and Git metadata into placeholders and block builds or Git
operations until the files download again.

## Deployment

`apps/web` and `apps/api` are independently deployable. Each app includes its own Dockerfile and README.

## Admin App

No admin app is included yet. A future `apps/admin` can be added for user management, project management, deployment monitoring, logs, billing, and system settings.
