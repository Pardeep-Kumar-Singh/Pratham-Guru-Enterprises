const prisma = require('../prisma');

// Product Master additional operations (if needed beyond what inventoryController does)
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { baseRate, ...rest } = req.body;

    try {
        const result = await prisma.$transaction(async (tx) => {
            const oldProduct = await tx.product.findUnique({ where: { id: parseInt(id) } });

            if (baseRate !== undefined && oldProduct.baseRate !== baseRate) {
                // Log rate change
                await tx.rateHistory.create({
                    data: {
                        productId: parseInt(id),
                        oldRate: oldProduct.baseRate,
                        newRate: baseRate,
                        remark: "Manual update"
                    }
                });
            }

            return await tx.product.update({
                where: { id: parseInt(id) },
                data: { baseRate, ...rest }
            });
        });

        res.json(result);
    } catch (error) {
        res.status(400).json({ detail: error.message });
    }
};

// Variant Master CRUD
const getVariantsByProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const variants = await prisma.variant.findMany({
            where: { productId: parseInt(productId) }
        });
        res.json(variants);
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

const createVariant = async (req, res) => {
    try {
        const variant = await prisma.variant.create({ data: req.body });
        res.status(201).json(variant);
    } catch (error) {
        res.status(400).json({ detail: error.message });
    }
};

const deleteVariant = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.variant.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Variant deleted" });
    } catch (error) {
        res.status(400).json({ detail: error.message });
    }
};

// Rate History
const getRateHistory = async (req, res) => {
    const { productId } = req.params;
    try {
        const history = await prisma.rateHistory.findMany({
            where: { productId: parseInt(productId) },
            orderBy: { createdAt: 'desc' }
        });
        res.json(history);
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

module.exports = {
    updateProduct,
    getVariantsByProduct,
    createVariant,
    deleteVariant,
    getRateHistory
};
