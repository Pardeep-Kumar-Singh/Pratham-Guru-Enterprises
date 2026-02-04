const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const products = [
    // Bootie
    { name: "Normal Bootie", category: "Bootie", baseRate: 20, uom: "pcs" },
    { name: "Pig Bootie", category: "Bootie", baseRate: 22, uom: "pcs" },
    { name: "Boots", category: "Bootie", baseRate: 25, uom: "pcs" },

    // Cap
    { name: "Normal Cap", category: "Cap", baseRate: 25, uom: "pcs" },
    { name: "Fancy Cap", category: "Cap", baseRate: 30, uom: "pcs" },
    { name: "Silai Cap", category: "Cap", baseRate: 35, uom: "pcs" },
    { name: "Giraffe Cap", category: "Cap", baseRate: 40, uom: "pcs" },

    // Mitten
    { name: "CMB-1 Mitten", category: "Mitten", baseRate: 55, uom: "pcs" },
    { name: "CMB-2 Mitten", category: "Mitten", baseRate: 65, uom: "pcs" },

    // Dyper Set
    { name: "2PC Dyper Set", category: "Dyper Set", baseRate: 55, uom: "set" },
    { name: "3PC Dyper Set", category: "Dyper Set", baseRate: 70, uom: "set" },

    // Others
    { name: "Helmet", category: "Helmet", baseRate: 80, uom: "pcs" },
    { name: "Moti Mermaid", category: "Mermaid", baseRate: 80, uom: "pcs" },
    { name: "Fancy Mermaid", category: "Mermaid", baseRate: 70, uom: "pcs" },
    { name: "Skirt", category: "Skirt", baseRate: 80, uom: "pcs" },
    { name: "Muffler", category: "Muffler", baseRate: 120, uom: "pcs" },
    { name: "Purse", category: "Purse", baseRate: 25, uom: "pcs" },
    { name: "Patch", category: "Purse", baseRate: 80, uom: "pcs" },
    { name: "Normal Bra", category: "Bra", baseRate: 65, uom: "pcs" },
    { name: "Fancy Bra", category: "Bra", baseRate: 75, uom: "pcs" },
    { name: "Silai Band", category: "Band", baseRate: 25, uom: "pcs" },
    { name: "Hair Band Boot", category: "Band", baseRate: 35, uom: "pcs" },
];

async function main() {
    console.log("Seeding full product list...");
    for (const product of products) {
        await prisma.product.upsert({
            where: { name: product.name },
            update: product,
            create: product,
        });
    }
    console.log("Seeding finished successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
