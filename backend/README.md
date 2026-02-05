# Pratham Guru Enterprises - Backend

Node.js + Express + Prisma backend API for Pratham Guru Enterprises management system.

## Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm or yarn

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   PORT=8000
   DATABASE_URL="mysql://user:password@localhost:3306/pratham_guru_db"
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRES_IN=24h
   FRONTEND_URL=http://localhost:5173
   ```

3. **Setup database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # (Optional) Seed database
   npx prisma db seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The API will be available at `http://localhost:8000`

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Run database migrations
- `npx prisma generate` - Generate Prisma Client

## API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /token` - Login and get JWT token
- `GET /users/me` - Get current user info

### Inventory
- `GET /inventory/products` - Get all products
- `POST /inventory/products` - Create product
- `DELETE /inventory/products/:id` - Delete product
- `GET /inventory/production/:date` - Get daily production
- `POST /inventory/production` - Save daily production
- `DELETE /inventory/production/:date` - Delete daily production

### User Management
- `GET /users/role/:role` - Get users by role
- `GET /users/recent` - Get recent users
- `POST /users/with-role` - Create user with role
- `DELETE /users/:id` - Delete user
- `GET /artisans` - Get all artisans
- `POST /artisans` - Create artisan
- `PUT /artisans/:id` - Update artisan
- `DELETE /artisans/:id` - Delete artisan

### Dashboard
- `GET /dashboard/stats` - Get dashboard statistics

### Billing
- `GET /billing` - Get billing data with filters

### Reports
- `GET /reports/production` - Get production report
- `GET /reports/products` - Get product-wise report
- `GET /reports/workers` - Get worker statistics

### Master Configuration
- `PUT /products/:id` - Update product
- `GET /products/:productId/variants` - Get product variants
- `POST /variants` - Create variant
- `DELETE /variants/:id` - Delete variant
- `GET /products/:productId/rate-history` - Get rate history

## Database Schema

The application uses Prisma ORM with MySQL. Main models:

- **User** - System users (admin, tendor, coordinator, gola_maker)
- **Artisan** - Artisan profiles
- **Product** - Product master data
- **Variant** - Product variants
- **DailyProduction** - Daily production records
- **ProductionEntry** - Individual production entries

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `8000` |
| `DATABASE_URL` | MySQL connection string | - |
| `JWT_SECRET` | Secret key for JWT | - |
| `JWT_EXPIRES_IN` | JWT expiration time | `24h` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

## Deployment

### Production Checklist
- [ ] Set strong `JWT_SECRET`
- [ ] Configure production database
- [ ] Set `FRONTEND_URL` to production frontend URL
- [ ] Run `npx prisma migrate deploy`
- [ ] Set `NODE_ENV=production`

### Platforms
- **Render**: Connect repository, set environment variables
- **Railway**: Connect repository, configure database
- **Vercel**: Use serverless functions (requires adaptation)

## Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **Prisma** - ORM
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Support

For issues or questions, please contact the development team.
