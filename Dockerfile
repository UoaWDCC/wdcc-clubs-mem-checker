# syntax = docker/dockerfile:1

# First stage to install dependencies for both client and API
ARG NODE_VERSION=19.6.0
FROM node:${NODE_VERSION}-slim as install-dependencies

# Install dependencies for both client and API
WORKDIR /app/client
COPY ./client/package*.json ./
COPY ./client/yarn.lock ./
RUN yarn install

WORKDIR /app/api
COPY ./api/package*.json ./
COPY ./api/yarn.lock ./
RUN yarn install

# Second stage for building the client
FROM node:${NODE_VERSION}-slim as client-build

COPY --from=install-dependencies /app/client/node_modules /app/client/node_modules
COPY ./api /app/api

WORKDIR /app/client
COPY ./client ./

# Build the client application
RUN yarn vite build

# Third stage for building the API
FROM node:${NODE_VERSION}-slim as api-build
COPY --from=install-dependencies /app/api/node_modules /app/api/node_modules
COPY ./api /app/api
COPY ./client /app/client

LABEL fly_launch_runtime="Node.js/Prisma"

WORKDIR /app/api
# Set production environment
ENV NODE_ENV="production"

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential openssl pkg-config python-is-python3

# Generate Prisma Client
RUN yarn prisma generate

# Compile TypeScript code
RUN yarn tsc 

# Final stage for the app image
FROM node:${NODE_VERSION}-slim as api-final

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy the built client and API applications
COPY --from=client-build /app/client/dist /app/client/dist
COPY --from=api-build /app/api/dist /app/api/dist
COPY --from=api-build /app/api/node_modules /app/api/node_modules

# Expose the required ports
EXPOSE 443 

# Set the default command to start the API
CMD [ "node", "./app/api/dist/api/index.js" ]