FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY apps/api/go.mod apps/api/go.sum ./
RUN go mod download
COPY apps/api ./
RUN go build -o /nova-api ./main.go

FROM alpine:3.21
WORKDIR /app
COPY --from=builder /nova-api /usr/local/bin/nova-api
EXPOSE 8080
CMD ["nova-api"]
