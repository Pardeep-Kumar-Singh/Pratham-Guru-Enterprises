const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

// Parse DATABASE_URL into adapter config
const dbUrl = new URL(process.env.DATABASE_URL);
const adapter = new PrismaMariaDb({
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port) || 3306,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1),
});

const prisma = new PrismaClient({ adapter });

module.exports = prisma;

