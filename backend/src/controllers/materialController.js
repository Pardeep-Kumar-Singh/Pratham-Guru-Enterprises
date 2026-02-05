const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const issueWool = async (req, res) => {
    const { date, batchId, qty, issuedTo, remarks } = req.body;
    try {
        const transaction = await prisma.woolTransaction.create({
            data: {
                date,
                batchId,
                qty: parseFloat(qty),
                issuedTo,
                remarks,
                issuedBy: req.user ? req.user.username : 'Admin' // Assuming auth middleware adds user
            }
        });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ detail: error.message });
    }
};

const getWoolHistory = async (req, res) => {
    try {
        const history = await prisma.woolTransaction.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(history);
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

module.exports = {
    issueWool,
    getWoolHistory
};
