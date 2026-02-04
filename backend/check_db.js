const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const today = new Date().toISOString().split('T')[0];
    const production = await prisma.dailyProduction.findUnique({
        where: { date: today },
        include: { entries: true }
    });

    console.log('Today:', today);
    console.log('Production Record:', production);
    if (production) {
        console.log('Entries Count:', production.entries.length);
        console.log('Entries:', production.entries);
    } else {
        console.log('No production record found for today.');
    }
}

check()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
