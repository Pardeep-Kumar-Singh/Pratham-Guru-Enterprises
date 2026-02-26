const prisma = require('../prisma');

const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, category, uom, baseRate } = req.body;
    try {
        const product = await prisma.product.create({
            data: {
                name,
                category,
                uom: uom || 'pcs',
                baseRate: parseFloat(baseRate)
            }
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ detail: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.product.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ detail: error.message });
    }
};

const getDailyProduction = async (req, res) => {
    const { date } = req.params;
    try {
        const production = await prisma.dailyProduction.findUnique({
            where: { date },
            include: { entries: true }
        });
        res.json(production || { date, totalQty: 0, totalWeight: 0, totalAmount: 0, entries: [] });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

const saveDailyProduction = async (req, res) => {
    const { date, totalQty, totalWeight, totalAmount, entries } = req.body;

    try {
        const result = await prisma.$transaction(async (tx) => {
            // Delete existing entries for this date if any
            const existing = await tx.dailyProduction.findUnique({
                where: { date }
            });

            if (existing) {
                await tx.productionEntry.deleteMany({
                    where: { dailyProductionId: existing.id }
                });

                return await tx.dailyProduction.update({
                    where: { id: existing.id },
                    data: {
                        totalQty,
                        totalWeight,
                        totalAmount,
                        entries: {
                            create: entries.map(e => ({
                                category: e.category,
                                itemName: e.itemName,
                                uom: e.uom,
                                rate: e.rate,
                                qty: e.qty,
                                weight: e.weight,
                                amount: e.amount
                            }))
                        }
                    },
                    include: { entries: true }
                });
            } else {
                return await tx.dailyProduction.create({
                    data: {
                        date,
                        totalQty,
                        totalWeight,
                        totalAmount,
                        entries: {
                            create: entries.map(e => ({
                                category: e.category,
                                itemName: e.itemName,
                                uom: e.uom,
                                rate: e.rate,
                                qty: e.qty,
                                weight: e.weight,
                                amount: e.amount
                            }))
                        }
                    },
                    include: { entries: true }
                });
            }
        });

        res.json(result);
    } catch (error) {
        console.error("SAVE PRODUCTION ERROR:", error);
        res.status(500).json({ detail: error.message });
    }
};

const deleteDailyProduction = async (req, res) => {
    const { date } = req.params;
    try {
        await prisma.$transaction(async (tx) => {
            const production = await tx.dailyProduction.findUnique({ where: { date } });
            if (production) {
                await tx.productionEntry.deleteMany({ where: { dailyProductionId: production.id } });
                await tx.dailyProduction.delete({ where: { id: production.id } });
            }
        });
        res.json({ message: "Daily production cleared successfully" });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};


const getDailyAlter = async (req, res) => {
    const { date } = req.params;
    try {
        const alter = await prisma.dailyAlter.findUnique({
            where: { date },
            include: { entries: true }
        });
        res.json(alter || { date, totalQty: 0, totalWeight: 0, totalAmount: 0, entries: [] });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

const saveDailyAlter = async (req, res) => {
    const { date, totalQty, totalWeight, totalAmount, entries } = req.body;

    try {
        const result = await prisma.$transaction(async (tx) => {
            // Delete existing entries for this date if any
            const existing = await tx.dailyAlter.findUnique({
                where: { date }
            });

            if (existing) {
                await tx.alterEntry.deleteMany({
                    where: { dailyAlterId: existing.id }
                });

                return await tx.dailyAlter.update({
                    where: { id: existing.id },
                    data: {
                        totalQty,
                        totalWeight,
                        totalAmount,
                        entries: {
                            create: entries.map(e => ({
                                category: e.category,
                                itemName: e.itemName,
                                uom: e.uom,
                                rate: e.rate,
                                qty: e.qty,
                                weight: e.weight,
                                amount: e.amount
                            }))
                        }
                    },
                    include: { entries: true }
                });
            } else {
                return await tx.dailyAlter.create({
                    data: {
                        date,
                        totalQty,
                        totalWeight,
                        totalAmount,
                        entries: {
                            create: entries.map(e => ({
                                category: e.category,
                                itemName: e.itemName,
                                uom: e.uom,
                                rate: e.rate,
                                qty: e.qty,
                                weight: e.weight,
                                amount: e.amount
                            }))
                        }
                    },
                    include: { entries: true }
                });
            }
        });

        res.json(result);
    } catch (error) {
        console.error("SAVE ALTER ERROR:", error);
        res.status(500).json({ detail: error.message });
    }
};

const deleteDailyAlter = async (req, res) => {
    const { date } = req.params;
    try {
        await prisma.$transaction(async (tx) => {
            const alter = await tx.dailyAlter.findUnique({ where: { date } });
            if (alter) {
                await tx.alterEntry.deleteMany({ where: { dailyAlterId: alter.id } });
                await tx.dailyAlter.delete({ where: { id: alter.id } });
            }
        });
        res.json({ message: "Daily alter cleared successfully" });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
    getDailyProduction,
    saveDailyProduction,
    deleteDailyProduction,
    getDailyAlter,
    saveDailyAlter,
    deleteDailyAlter
};
