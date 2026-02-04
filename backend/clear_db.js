const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clear() {
    const today = new Date().toISOString().split('T')[0];
    const production = await prisma.dailyProduction.findUnique({
        where: { date: today }
    });

    if (production) {
        await prisma.productionEntry.deleteMany({
            where: { dailyProductionId: production.id }
        });
        await prisma.dailyProduction.delete({
            where: { id: production.id }
        });
        console.log('Cleared today\'s production data.');
    } else {
        console.log('No production data found for today.');
    }
}

clear()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
