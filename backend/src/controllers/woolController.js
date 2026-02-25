const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDailyWool = async (req, res) => {
    const { date } = req.params;
    try {
        const wool = await prisma.dailyWool.findUnique({
            where: { date },
            include: { entries: true }
        });
        res.json(wool || { date, totalQty: 0, totalWeight: 0, entries: [] });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

const saveDailyWool = async (req, res) => {
    const { date, totalQty, totalWeight, entries } = req.body;

    try {
        const result = await prisma.$transaction(async (tx) => {
            // Delete existing entries for this date if any
            const existing = await tx.dailyWool.findUnique({
                where: { date }
            });

            if (existing) {
                await tx.woolEntry.deleteMany({
                    where: { dailyWoolId: existing.id }
                });

                return await tx.dailyWool.update({
                    where: { id: existing.id },
                    data: {
                        totalQty,
                        totalWeight,
                        entries: {
                            create: entries.map(e => ({
                                category: e.category,
                                itemName: e.itemName,
                                uom: e.uom,
                                qty: e.qty,
                                weight: e.weight
                            }))
                        }
                    },
                    include: { entries: true }
                });
            } else {
                return await tx.dailyWool.create({
                    data: {
                        date,
                        totalQty,
                        totalWeight,
                        entries: {
                            create: entries.map(e => ({
                                category: e.category,
                                itemName: e.itemName,
                                uom: e.uom,
                                qty: e.qty,
                                weight: e.weight
                            }))
                        }
                    },
                    include: { entries: true }
                });
            }
        });

        res.json(result);
    } catch (error) {
        console.error("SAVE WOOL ERROR:", error);
        res.status(500).json({ detail: error.message });
    }
};

const deleteDailyWool = async (req, res) => {
    const { date } = req.params;
    try {
        await prisma.$transaction(async (tx) => {
            const wool = await tx.dailyWool.findUnique({ where: { date } });
            if (wool) {
                await tx.woolEntry.deleteMany({ where: { dailyWoolId: wool.id } });
                await tx.dailyWool.delete({ where: { id: wool.id } });
            }
        });
        res.json({ message: "Daily wool entry cleared successfully" });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

module.exports = {
    getDailyWool,
    saveDailyWool,
    deleteDailyWool
};
