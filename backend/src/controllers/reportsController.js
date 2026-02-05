const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProductionReport = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const where = {};
        if (startDate && endDate) {
            where.dailyProduction = {
                date: { gte: startDate, lte: endDate }
            };
        }

        const entries = await prisma.productionEntry.findMany({
            where,
            include: { dailyProduction: true }
        });

        // Group by Month and Category
        const report = entries.reduce((acc, curr) => {
            if (!curr.dailyProduction) return acc;

            const date = new Date(curr.dailyProduction.date);
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            const key = `${month} ${year}`;

            if (!acc[key]) {
                acc[key] = { month: key, total: 0 };
            }

            const category = curr.category || 'Uncategorized';
            if (!acc[key][category]) {
                acc[key][category] = 0;
            }

            acc[key][category] += curr.qty || 0;
            acc[key].total += curr.qty || 0;
            return acc;
        }, {});

        res.json(Object.values(report));
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

const getProductReport = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const where = {};
        if (startDate && endDate) {
            where.dailyProduction = {
                date: { gte: startDate, lte: endDate }
            };
        }

        const entries = await prisma.productionEntry.findMany({
            where,
            include: { dailyProduction: true }
        });

        const aggregated = entries.reduce((acc, curr) => {
            const key = `${curr.category}|${curr.itemName}`;
            if (!acc[key]) {
                acc[key] = {
                    product: curr.itemName,
                    category: curr.category,
                    quantity: 0,
                    revenue: 0,
                    totalRate: 0,
                    count: 0
                };
            }
            acc[key].quantity += curr.qty;
            acc[key].revenue += curr.amount;
            acc[key].totalRate += curr.rate;
            acc[key].count += 1;
            return acc;
        }, {});

        const items = Object.values(aggregated);
        const totalQty = items.reduce((sum, e) => sum + e.quantity, 0);

        const report = items.map(e => ({
            product: e.product,
            category: e.category,
            quantity: e.quantity,
            revenue: e.revenue,
            avgRate: e.quantity > 0 ? e.revenue / e.quantity : 0,
            percentage: totalQty > 0 ? Math.round((e.quantity / totalQty) * 100) : 0
        }));

        res.json(report);
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

const getWorkerStats = async (req, res) => {
    try {
        const tendors = await prisma.user.count({ where: { role: 'tendor' } });
        const golaMakers = await prisma.user.count({ where: { role: 'gola_maker' } });
        const artisans = await prisma.artisan.count();

        // Mocking productivity since it's not linked in DB yet
        // In a real scenario, we'd join production with workers
        res.json({
            summary: { tendors, golaMakers, artisans },
            recentWorkers: await prisma.user.findMany({
                where: { role: { in: ['tendor', 'gola_maker', 'artisan'] } },
                take: 5,
                orderBy: { createdAt: 'desc' }
            })
        });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

module.exports = {
    getProductionReport,
    getProductReport,
    getWorkerStats
};
