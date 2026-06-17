# Nova API

Go API for Nova using Gin, Gorm, MySQL, Redis, and JWT authentication.

## Commands

```bash
go run main.go
go test ./...
```

## Architecture

```text
internal/config                    Database and Redis configuration
internal/domain/models             Gorm entities and response models
internal/interfaces/http/routes    Gin route registration
internal/interfaces/http/controllers HTTP handlers
internal/interfaces/http/middleware Request middleware
internal/usecases/auth             Password and token use cases
```

The API preserves the original auth/profile/token and backup endpoints.
