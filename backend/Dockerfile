# Use Node.js 20 Alpine for a lightweight image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the application port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
