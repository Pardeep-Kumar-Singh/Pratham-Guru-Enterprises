# Pratham Guru Enterprises

Full-stack enterprise management system for Pratham Guru Enterprises.

## Project Structure

```
Pratham-Guru-Enterprises/
├── frontend/          # React + Vite frontend application
├── backend/           # Node.js + Express + Prisma API
└── README.md          # This file
```

## Quick Start

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Pratham-Guru-Enterprises
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   npx prisma migrate dev
   npm run dev
   ```
   Backend will run on `http://localhost:8000`

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # .env should have VITE_API_BASE_URL=http://localhost:8000
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## Features

- **User Management**: Admin, Tendor, Coordinator, Gola Maker roles
- **Inventory Management**: Daily production tracking
- **Billing System**: Invoice generation and billing reports
- **Reports & Analytics**: Production, product-wise, and worker reports
- **Master Configuration**: Product and variant management
- **Authentication**: JWT-based secure authentication

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React Icons

### Backend
- Node.js
- Express
- Prisma ORM
- MySQL
- JWT Authentication
- bcryptjs

## Documentation

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)

## Environment Variables

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Backend (.env)
```env
PORT=8000
DATABASE_URL="mysql://user:password@localhost:3306/pratham_guru_db"
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:5173
```

## Deployment

### Frontend
Deploy to Vercel, Netlify, or any static hosting:
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

### Backend
Deploy to Render, Railway, or any Node.js hosting:
```bash
cd backend
npm install
npx prisma migrate deploy
npm start
```

**Important**: Update `FRONTEND_URL` in backend and `VITE_API_BASE_URL` in frontend to production URLs.

## Development Workflow

1. **Backend Development**
   - Make changes in `backend/src/`
   - Server auto-restarts with nodemon
   - Test API endpoints

2. **Frontend Development**
   - Make changes in `frontend/src/`
   - Hot reload enabled
   - Test UI changes

3. **Database Changes**
   ```bash
   cd backend
   npx prisma migrate dev --name description_of_change
   ```

## Project Scripts

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm run dev      # Start dev server with nodemon
npm start        # Start production server
```

## Support

For issues or questions, please contact the development team.

## License

Proprietary - All rights reserved
