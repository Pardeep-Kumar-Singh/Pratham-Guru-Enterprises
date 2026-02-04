const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const register = async (req, res) => {
    const { username, email, password, role, mobile, area } = req.body;

    try {
        // Check if user exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ username }, { email }],
            },
        });

        if (existingUser) {
            return res.status(400).json({ detail: "Username or email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                hashed_password: hashedPassword,
                role: role || 'tendor',
                mobile,
                area,
            },
        });

        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            mobile: user.mobile,
            area: user.area,
            createdAt: user.createdAt,
        });
    } catch (error) {
        console.error("REGISTRATION ERROR DETAILS:", {
            message: error.message,
            stack: error.stack,
            code: error.code,
            meta: error.meta
        });
        res.status(500).json({ detail: `Internal server error during registration: ${error.message}` });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt for username: ${username}`);
    console.log(`Body keys received: ${Object.keys(req.body)}`);

    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            console.log(`User not found: ${username}`);
            return res.status(401).json({ detail: "Incorrect username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.hashed_password);
        console.log(`Password match for ${username}: ${isMatch}`);

        if (!isMatch) {
            return res.status(401).json({ detail: "Incorrect username or password" });
        }

        const token = jwt.sign(
            { sub: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '30m' }
        );

        res.json({
            access_token: token,
            token_type: "bearer",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ detail: "Internal server error during login" });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username: req.user.sub },
            select: { id: true, username: true, email: true, role: true, mobile: true, area: true, createdAt: true }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ detail: "Error fetching user details" });
    }
};

module.exports = { register, login, getMe };
