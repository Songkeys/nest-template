# Nestjs Template

This is an opinionated template for Nestjs projects.

I found that there are many Nestjs projects in my career, and they are all similar in structure. So I created this template to make it easier to start a new Nestjs project.

Philosophy:

- Keep it simple and stupid.
- Keep it fast and efficient.
- Keep it scalable and maintainable.
- Keep it secure.

## Features

- Platform: [Fastify](https://fastify.io)
  - CORS [@fastify/cors](https://github.com/fastify/fastify-cors)
  - Compression: [@fastify/compress](https://github.com/fastify/fastify-compress)
- Database:
  - ORM: [Prisma](https://prisma.io)
  - Cache: [Redis](https://redis.io) [@songkeys/nestjs-redis](https://github.com/songkeys/nestjs-redis)
- Logger: [Pino](https://github.com/pinojs/pino)
  - [nestjs-pino](https://github.com/iamolegga/nestjs-pino)
  - [pino-http](https://github.com/pinojs/pino-http)
  - [pino-http-print](https://github.com/pinojs/pino-http-print)
  - [pino-sentry-transport](https://github.com/tomer-yechiel/pino-sentry-transport)
- Swagger: [@nestjs/swagger](https://github.com/nestjs/swagger)
  - with nest-cli plugin enabled
- Throttler: [@nestjs/throttler](https://github.com/nestjs/throttler)
  - with Redis cache: [@nest-lab/throttler-storage-redis](https://github.com/jmcdo29/nest-lab/tree/main/packages/throttler-storage-redis)
- Testing: removed! (Sorry, I don't write tests. 😅)
- Format, Lint: [Biome](https://biomejs.dev)

## Guide

### Development

Init environment variables:

```
cp .env.example .env
```

Install dependencies:

```bash
pnpm install
```

Start DB docker:

```bash
pnpm run docker:db
```

Generate Prisma client:

```bash
pnpm run prisma:generate
```

Migrate database:

```bash
pnpm run prisma:migrate:dev
```

Run the app:

```bash
pnpm run start:dev
```

### Deployment

Docker:

```bash
# building new NestJS docker image
docker-compose build
# or
pnpm run docker:build

# start docker-compose
docker-compose up -d
# or
pnpm run docker
```

In Node.js Environment:

```
pnpm install
pnpm run build
./start_prod.sh
```

### Migrate database

Development:

```bash
pnpm run prisma:migrate:dev
```

Production:

```bash
pnpm run prisma:migrate:deploy
```
