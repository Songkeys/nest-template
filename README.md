# Nestjs Template

This is an opinionated template for Nestjs projects.

I found that there are many Nestjs projects in my career, and they are all similar in structure. So I created this template to make it easier to start a new Nestjs project.

## Features

- Platform: [Fastify](https://fastify.io)
  - CORS [@fastify/cors](https://github.com/fastify/fastify-cors)
  - Compression: [@fastify/compress](https://github.com/fastify/fastify-compress)
- Database:
  - ORM: [Prisma](https://prisma.io)
  - Cache: [Redis](https://redis.io) [@songkeys/nestjs-redis](https://github.com/songkeys/nestjs-redis)
- Logger: [Pino](https://github.com/pinojs/pino)
  - [nestjs-pino](https://github.com/iamolegga/nestjs-pino)
  - [pino-pretty](https://github.com/pinojs/pino-pretty) in development
  - [pino-sentry-transport](https://github.com/tomer-yechiel/pino-sentry-transport)
- Swagger: [@nestjs/swagger](https://github.com/nestjs/swagger)
  - with nest-cli plugin enabled
- Throttler: [@nestjs/throttler](https://github.com/nestjs/throttler)
  - with Redis cache: [nestjs-throttler-storage-redis](https://github.com/kkoomen/nestjs-throttler-storage-redis)
- Testing: removed! (Sorry, I don't write tests. 😅)

## Guide

### Development

Init environment variables:

```
cp .env.example .env
```

Install dependencies:

```bash
npm install
```

Start DB docker:

```bash
npm run docker:db
```

Generate Prisma client:

```bash
npm run prisma:generate
```

Migrate database:

```bash
npm run prisma:migrate:dev
```

Run the app:

```bash
npm run start:dev
```

### Deployment

Docker:

```bash
# building new NestJS docker image
docker-compose build
# or
npm run docker:build

# start docker-compose
docker-compose up -d
# or
npm run docker
```

In Node.js Environment:

```
npm install
npm run build
./start_prod.sh
```

### Migrate database

Development:

```bash
npm run prisma:migrate:dev
```

Production:

```bash
npm run prisma:migrate:deploy
```
