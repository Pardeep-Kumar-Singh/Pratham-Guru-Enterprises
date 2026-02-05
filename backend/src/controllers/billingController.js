const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getBillingData = async (req, res) => {
    const { startDate, endDate, category } = req.query;

    try {
        let whereClause = {};

        if (startDate && startDate !== '' && endDate && endDate !== '') {
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

        // Fetch Alter Entries
        let alterWhereClause = {};
        if (startDate && startDate !== '' && endDate && endDate !== '') {
            alterWhereClause.dailyAlter = {
                date: { gte: startDate, lte: endDate }
            };
        }
        if (category && category !== 'All') {
            alterWhereClause.category = category;
        }

        const alterEntries = await prisma.alterEntry.findMany({
            where: alterWhereClause,
            include: { dailyAlter: true }
        });

        // Grouping by item to provide a summarized view for the invoice
        const summary = {};

        // 1. Add Production
        entries.forEach(curr => {
            const key = `${curr.category}-${curr.itemName}`;
            if (!summary[key]) {
                summary[key] = {
                    category: curr.category,
                    item: curr.itemName,
                    quantity: 0,
                    baseRate: curr.rate,
                    uom: curr.uom,
                    amount: 0
                };
            }
            summary[key].quantity += curr.qty;
            summary[key].amount += curr.amount;
        });

        // 2. Subtract Alter (Deductions)
        alterEntries.forEach(curr => {
            const key = `${curr.category}-${curr.itemName}`;
            if (summary[key]) {
                summary[key].quantity -= curr.qty;
                summary[key].amount -= curr.amount;
            }
        });

        const summarizedEntries = Object.values(summary);

        // Fetch recent activity - Grouped by Month for the last 6 months
        // Get DailyProduction and DailyAlter
        const productions = await prisma.dailyProduction.findMany({
            orderBy: { date: 'desc' }
        });
        const alters = await prisma.dailyAlter.findMany({
            orderBy: { date: 'desc' }
        });

        const activitySummary = {};

        // Add Production Totals
        productions.forEach(curr => {
            if (!curr.date) return;
            const date = new Date(curr.date);
            if (isNaN(date.getTime())) return; // Skip invalid dates

            const monthYear = date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
            if (!activitySummary[monthYear]) {
                activitySummary[monthYear] = {
                    name: `${monthYear} Batch`,
                    date: monthYear,
                    amount: 0,
                    status: "Processed"
                };
            }
            activitySummary[monthYear].amount += curr.totalAmount;
        });

        // Subtract Alter Totals
        alters.forEach(curr => {
            if (!curr.date) return;
            const date = new Date(curr.date);
            if (isNaN(date.getTime())) return;

            const monthYear = date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
            if (activitySummary[monthYear]) {
                activitySummary[monthYear].amount -= curr.totalAmount;
            }
        });

        res.json({
            entries: entries.map(e => ({
                id: e.id,
                date: e.dailyProduction.date,
                category: e.category,
                itemName: e.itemName,
                qty: e.qty,
                rate: e.rate,
                amount: e.amount,
                type: 'Production'
            })).concat(alterEntries.map(e => ({
                id: e.id,
                date: e.dailyAlter.date,
                category: e.category,
                itemName: e.itemName,
                qty: -e.qty, // Negative for display if needed
                rate: e.rate,
                amount: -e.amount,
                type: 'Alter'
            }))),
            summarizedEntries, // This is NET
            recentActivity: Object.values(activitySummary),
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


const generateInvoice = async (req, res) => {
    const { month, year, totalProducts, totalWeight, totalAmount } = req.body;
    try {
        const invoiceCount = await prisma.invoice.count({
            where: { year: parseInt(year) }
        });

        const invoiceNumber = `INV-${year}-${(invoiceCount + 1).toString().padStart(3, '0')}`;

        const invoice = await prisma.invoice.create({
            data: {
                invoiceNumber,
                month,
                year: parseInt(year),
                totalProducts: parseInt(totalProducts),
                totalWeight: parseFloat(totalWeight),
                totalAmount: parseFloat(totalAmount),
                status: 'Pending'
            }
        });

        res.status(201).json(invoice);
    } catch (error) {
        res.status(400).json({ detail: error.message });
    }
};

const getAllInvoices = async (req, res) => {
    try {
        const invoices = await prisma.invoice.findMany({
            orderBy: { generatedAt: 'desc' }
        });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

const updateInvoiceStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const invoice = await prisma.invoice.update({
            where: { id: parseInt(id) },
            data: { status }
        });
        res.json(invoice);
    } catch (error) {
        res.status(400).json({ detail: error.message });
    }



};

module.exports = {

    getBillingData,
    generateInvoice,
    getAllInvoices,
    updateInvoiceStatus
};
