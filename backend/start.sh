#!/bin/sh
set -e

echo "Waiting for database to be ready..."

# Wait until MySQL port 3306 is open inside the network
until nc -z db 3306 2>/dev/null; do
  echo "Database not ready yet, retrying in 3 seconds..."
  sleep 3
done

# Extra wait to ensure MySQL is fully initialized (not just port open)
sleep 5

echo "Database is ready! Syncing Prisma schema..."
npx prisma db push --accept-data-loss

echo "Starting server..."
exec node src/server.js
