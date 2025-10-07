#!/bin/sh
set -e

# Run migrations
npx prisma migrate deploy --schema=./prisma/schema.prisma

# Generate client
npx prisma generate --schema=./prisma/schema.prisma

# Start dev server
npm run dev
