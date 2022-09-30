#This Dockerfile builds the LNL-Portal Next.js app based on Node.js best practices.

# Pull deterministic base image for stability and security
# 16.17.0-bullseye is current stable Debain 11 with LTS
# Slim for smaller footprint
FROM node:16.17.0-bullseye-slim

# Optimise for production
ENV NODE_ENV production

# Create working app directory
WORKDIR /app

# Copy all files excluding dockerignore ones to working directory
COPY . ./

# Only install prod specific node modules
RUN yarn install --prod

# Install dependencies for Firebase functions
WORKDIR /app/functions
RUN yarn install --prod

# Install firebase tools
RUN yarn global add firebase-tools

# TODO: For development emulators will be needed.
