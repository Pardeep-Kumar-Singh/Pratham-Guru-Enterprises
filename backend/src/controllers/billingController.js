const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getBillingData = async (req, res) => {
    const { startDate, endDate, category } = req.query;

    try {
        let whereClause = {};

        if (startDate && endDate) {
            whereClause.dailyProduction = {
                date: {
                    gte: startDate,
                    lte: endDate
                }
            };
        }

        if (category && category !== 'All') {
            whereClause.category = category;
        }

        const entries = await prisma.productionEntry.findMany({
            where: whereClause,
            include: {
                dailyProduction: true
            },
            orderBy: {
                dailyProduction: {
                    date: 'desc'
                }
            }
        });

        // Grouping by item to provide a summarized view for the invoice
        const summary = entries.reduce((acc, curr) => {
            const key = `${curr.category}-${curr.itemName}`;
            if (!acc[key]) {
                acc[key] = {
                    category: curr.category,
                    item: curr.itemName,
                    quantity: 0,
                    baseRate: curr.rate,
                    uom: curr.uom,
                    amount: 0
                };
            }
            acc[key].quantity += curr.qty;
            acc[key].amount += curr.amount;
            return acc;
        }, {});

        const summarizedEntries = Object.values(summary);

        // Fetch recent activity - Grouped by Month for the last 6 months
        const productions = await prisma.dailyProduction.findMany({
            orderBy: { date: 'desc' },
            take: 30 // Last 30 days or so to aggregate
        });

        const activitySummary = productions.reduce((acc, curr) => {
            const date = new Date(curr.date);
            const monthYear = date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
            if (!acc[monthYear]) {
                acc[monthYear] = {
                    name: `${monthYear} Batch`,
                    date: monthYear,
                    amount: 0,
                    status: "Processed"
                };
            }
            acc[monthYear].amount += curr.totalAmount;
            return acc;
        }, {});

        res.json({
            entries: entries.map(e => ({
                id: e.id,
                date: e.dailyProduction.date,
                category: e.category,
                itemName: e.itemName,
                qty: e.qty,
                rate: e.rate,
                amount: e.amount
            })),
            summarizedEntries,
            recentActivity: Object.values(activitySummary).slice(0, 3), // Show last 3 monthly batches
            totals: {
                qty: summarizedEntries.reduce((sum, e) => sum + e.quantity, 0),
                amount: summarizedEntries.reduce((sum, e) => sum + e.amount, 0)
            }
        });
    } catch (error) {
        console.error('Billing data error:', error);
        res.status(500).json({ detail: error.message });
    }
};

module.exports = {
    getBillingData
};
