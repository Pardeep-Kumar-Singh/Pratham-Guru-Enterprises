const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDashboardStats = async (req, res) => {
    try {
        // 1. User Counts by Role
        const tenderCount = await prisma.user.count({ where: { role: 'tendor' } });
        const golaMakerCount = await prisma.user.count({ where: { role: 'gola_maker' } });
        const coordinatorCount = await prisma.user.count({ where: { role: 'coordinator' } });

        // 2. Artisan Stats
        const artisanCount = await prisma.artisan.count();
        const activeArtisans = await prisma.artisan.count({ where: { status: 'Active' } });

        // 3. Production Stats
        const totalProduction = await prisma.dailyProduction.aggregate({
            _sum: {
                totalQty: true,
                totalAmount: true
            }
        });

        // Today's Production
        const todayStr = new Date().toISOString().split('T')[0];
        const todayProduction = await prisma.dailyProduction.findUnique({
            where: { date: todayStr }
        });

        res.json({
            stats: {
                tendors: tenderCount,
                workers: golaMakerCount,
                artisans: artisanCount,
                activeArtisans: activeArtisans,
                coordinators: coordinatorCount
            },
            production: {
                today: todayProduction?.totalQty || 0,
                total: totalProduction._sum.totalQty || 0,
                totalAmount: totalProduction._sum.totalAmount || 0
            },
            system: {
                lastUpdated: new Date()
            }
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ detail: error.message });
    }
};

module.exports = {
    getDashboardStats
};
