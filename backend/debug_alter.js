
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testAlter() {
    console.log("Testing Prisma Client for DailyAlter...");
    try {
        if (!prisma.dailyAlter) {
            console.error("ERROR: prisma.dailyAlter is UNDEFINED. You might need to run 'npx prisma generate'.");
            return;
        }

        const date = '2026-02-05';
        const result = await prisma.dailyAlter.findUnique({
            where: { date },
            include: { entries: true }
        });
        console.log("Result:", result);
    } catch (e) {
        console.error("Exception:", e);
    } finally {
        await prisma.$disconnect();
    }
}

testAlter();
