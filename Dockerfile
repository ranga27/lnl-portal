# This Dockerfile builds the LNL-Portal Next.js app 
# Its based on https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Install dependencies only when needed
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat

# Create working app directory
WORKDIR /app

# Copy all files excluding dockerignore ones to working directory
COPY . ./

# Install dependencies based on yarn, assumes yarn.lock is present
RUN yarn --frozen-lockfile

# Install dependencies for Firebase functions
WORKDIR /app/functions
RUN yarn install

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/functions/node_modules ./functions/node_modules
COPY . ./

# Build the Next.js app
RUN yarn build
# TODO: For development emulators will be needed.

# Production image, copy all the files and run next
FROM node:16-alpine AS runner

# Install firebase tools
RUN yarn global add firebase-tools

WORKDIR /app

ENV NODE_ENV production
COPY --from=builder /app/.next ./.next
COPY functions/ ./functions/
COPY public/ ./public/
COPY firebase.json firebaseFunctions.js package.json ./


