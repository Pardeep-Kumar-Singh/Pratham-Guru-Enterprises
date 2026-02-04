const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

// Generic function to get users by role
const getUsersByRole = async (req, res) => {
    const { role } = req.params;
    try {
        const users = await prisma.user.findMany({
            where: { role },
            select: { id: true, username: true, email: true, role: true, mobile: true, area: true, createdAt: true }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

const getRecentUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                role: {
                    in: ['tendor', 'coordinator']
                }
            },
            take: 5,
            orderBy: {
                createdAt: 'desc'
            },
            select: { id: true, username: true, role: true, createdAt: true }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

// Create a new user with a specific role
const createUserWithRole = async (req, res) => {
    const { username, email, password, role, mobile, area } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                email,
                hashed_password: hashedPassword,
                role,
                mobile,
                area
            }
        });
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            mobile: user.mobile,
            area: user.area,
            createdAt: user.createdAt
        });
    } catch (error) {
        res.status(400).json({ detail: error.message });
    }
};

// Artisan specific CRUD
const getAllArtisans = async (req, res) => {
    try {
        const artisans = await prisma.artisan.findMany();
        res.json(artisans);
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

const createArtisan = async (req, res) => {
    try {
        const artisan = await prisma.artisan.create({ data: req.body });
        res.status(201).json(artisan);
    } catch (error) {
        res.status(400).json({ detail: error.message });
    }
};

const updateArtisan = async (req, res) => {
    const { id } = req.params;
    try {
        const artisan = await prisma.artisan.update({
            where: { id: parseInt(id) },
            data: req.body
        });
        res.json(artisan);
    } catch (error) {
        res.status(400).json({ detail: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({ where: { id: parseInt(id) } });
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(400).json({ detail: error.message });
    }
};

const deleteArtisan = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.artisan.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Artisan deleted" });
    } catch (error) {
        res.status(400).json({ detail: error.message });
    }
};

module.exports = {
    getUsersByRole,
    getRecentUsers,
    createUserWithRole,
    deleteUser,
    getAllArtisans,
    createArtisan,
    updateArtisan,
    deleteArtisan
};
