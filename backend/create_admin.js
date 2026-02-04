const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createAdmin() {
    const adminEmail = 'admin@example.com';
    const adminPassword = 'adminpassword123'; // CHANGE THIS IMMEDIATELY AFTER LOGIN

    console.log(`Checking for admin user: ${adminEmail}...`);

    const existing = await prisma.user.findFirst({
        where: { email: adminEmail }
    });

    if (existing) {
        console.log('Admin already exists.');
        return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
        data: {
            username: 'admin',
            email: adminEmail,
            hashed_password: hashedPassword,
            role: 'admin'
        }
    });

    console.log('-----------------------------------');
    console.log('Admin User Created Successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('-----------------------------------');
}

createAdmin()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
