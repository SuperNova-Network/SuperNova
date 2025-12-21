# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-slim AS base

WORKDIR /app
ENV NODE_ENV="production"

# ---------- Build Stage ----------
FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install pnpm (build stage)
RUN npm install -g pnpm

COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build
RUN pnpm prune --prod

# ---------- Final Runtime Image ----------
FROM base

# Install pnpm again (THIS FIXES YOUR ERROR)
RUN npm install -g pnpm

WORKDIR /app
COPY --from=build /app/package.json /app/pnpm-lock.yaml ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/index.js ./index.js
COPY --from=build /app/dist ./dist
COPY --from=build /app/docs ./docs
COPY --from=build /app/public ./public

EXPOSE 8080

CMD ["pnpm", "start"]
