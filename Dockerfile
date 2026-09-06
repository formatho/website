# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Set Node memory limit to prevent OOM during build
ENV NODE_OPTIONS=--max-old-space-size=4096

# Copy source code
COPY . .

# Build the application
ARG GIT_COMMIT=unknown
ENV VITE_GIT_COMMIT=$GIT_COMMIT
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Add .md to nginx mime types for markdown content negotiation
RUN sed -i 's/}/    text\/markdown  md;\n}/' /etc/nginx/mime.types

# Copy nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
