const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const products = await prisma.product.findMany();
    console.log('Total Products:', products.length);
    console.log('Products:', products.map(p => p.name));
}

check()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
