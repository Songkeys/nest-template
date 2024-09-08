FROM node:22 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY . .

# Install app dependencies
RUN corepack enable
RUN pnpm install
RUN pnpm run build

FROM node:22

ENV NODE_ENV production
RUN corepack enable
RUN corepack prepare pnpm@latest --activate
COPY --from=builder /app /app
WORKDIR /app

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]
