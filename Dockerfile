#This Dockerfile builds the LNL-Portal Next.js app based on Node.js best practices.

# Pull deterministic base image for stability and security
# 16.17.0-bullseyes is current stable Debain 11 with LTS
# Slim for smaller footprint
FROM node:16.17.0-bullseye-slim

# Create working app directory
WORKDIR /app

# Ensure both package.json AND yarn.lock are copied
COPY package.json yarn.lock ./

# Only install prod specific node modules
RUN yarn install --prod

# install firebase tools
RUN yarn global add firebase-tools

# Bundle app source
COPY . .

# Build assets & deploy app
# CMD ["yarn", "hosting:deploy"]

# In Gatsby development, gatsby-cli is required.
# RUN yarn global add gatsby-cli && yarn cache clean