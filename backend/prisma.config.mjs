import { defineConfig } from 'prisma/config';
import * as dotenv from 'dotenv';

// Load .env for local dev; Docker Compose injects env vars directly
dotenv.config();

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    datasource: {
        // Uses DATABASE_URL from Docker Compose env (host: db) in Docker
        // or from backend/.env (host: localhost) in local dev
        url: process.env.DATABASE_URL ?? 'mysql://root:1234@localhost:3306/pratham_guru_db',
    },
});
