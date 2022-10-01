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

# Install firebase tools
RUN yarn global add firebase-tools

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./

# Build the Next.js app
RUN yarn build
# TODO: For development emulators will be needed.

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]