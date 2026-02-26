# Use Node.js 20 Alpine for a lightweight image
FROM node:20-alpine

# Install Chromium and required system libraries for Puppeteer + OpenSSL for Prisma
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    openssl \
    netcat-openbsd

# Tell Puppeteer to skip downloading Chromium (use system one instead)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package*.json ./

# Install dependencies (--ignore-scripts prevents puppeteer from downloading Chrome)
RUN npm install --ignore-scripts

# Copy the rest of the application code
COPY . .

# Generate Prisma Client manually (since --ignore-scripts skips postinstall)
RUN npx prisma generate

# Make the startup script executable
RUN chmod +x /app/start.sh

# Expose the application port
EXPOSE 8000

# Use startup script that pushes DB schema then starts server
CMD ["/bin/sh", "/app/start.sh"]
