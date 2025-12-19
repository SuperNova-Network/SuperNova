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

# ---------- Final Runtime Image ----------
FROM base

# Install pnpm again (THIS FIXES YOUR ERROR)
RUN npm install -g pnpm

# Copy everything from build
COPY --from=build /app /app

WORKDIR /app

EXPOSE 8080

CMD ["pnpm", "start"]