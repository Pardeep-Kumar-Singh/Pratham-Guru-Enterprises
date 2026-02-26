# Pratham Guru Enterprises — Management System

A full-stack business management system for tracking production, inventory, billing, wool transactions, and artisans.

---

## 🗂️ Project Structure

```
Pratham-Guru-Enterprises/
├── backend/          # Node.js + Express + Prisma API
├── frontend/         # React + Vite + Tailwind CSS UI
├── sql/              # Initial database seed SQL
├── docker-compose.yml
└── .env              # Root-level env vars (Docker Compose)
```

---

## ⚙️ Technology Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | v24+ | Runtime |
| Express.js | v5 | HTTP framework |
| Prisma ORM | v7 | Database ORM & migrations |
| `@prisma/adapter-mariadb` | v7 | MySQL/MariaDB driver adapter |
| MySQL | 8.0 | Relational database |
| bcryptjs | v3 | Password hashing |
| jsonwebtoken | v9 | JWT authentication |
| dotenv | v17 | Environment variable loading |
| Puppeteer | v24 | PDF generation |
| nodemon | v3 | Dev auto-restart |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | v19 | UI framework |
| Vite | v7 | Build tool & dev server |
| React Router DOM | v7 | Client-side routing |
| Tailwind CSS | v4 | Utility-first styling |
| Axios | v1 | HTTP client |
| Lucide React | v0.5 | Icon library |
| html2pdf.js | v0.14 | Client-side PDF export |

### Infrastructure
| Technology | Purpose |
|---|---|
| Docker & Docker Compose | Containerised deployment |
| Nginx | Serves frontend in production container |

---

## 🚀 Running Locally (Without Docker)

### Prerequisites
- [Node.js](https://nodejs.org/) v20+
- MySQL 8.0 running on `localhost:3306`
- A database named `pratham_guru_db` created in MySQL

### 1. Create the database
```sql
CREATE DATABASE pratham_guru_db;
```

### 2. Set up Backend
```bash
cd backend

# Install dependencies
npm install

# Apply database migrations
node node_modules/prisma/build/index.js migrate deploy

# Start development server (with auto-restart)
npm run dev
```

Backend runs at → **http://localhost:8000**

### 3. Set up Frontend
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at → **http://localhost:5173**

### 4. Backend `.env` (already exists at `backend/.env`)
```env
PORT=8000
DATABASE_URL="mysql://root:1234@localhost:3306/pratham_guru_db"
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:5173
```

### 5. Open Prisma Studio (DB Browser)
```bash
cd backend
npm run prisma:studio
```
Prisma Studio opens at → **http://localhost:5555**

---

## 🐳 Running with Docker

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### 1. Configure environment variables
```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` at the **project root** (not inside backend/frontend):
```env
# Database
MYSQL_ROOT_PASSWORD=your-strong-password
MYSQL_DATABASE=pratham_guru_db

# Backend
JWT_SECRET=your-random-256-bit-secret
JWT_EXPIRES_IN=24h

# URLs
FRONTEND_URL=http://localhost:3000
VITE_API_BASE_URL=http://localhost:8000
```

### 2. Build & Start all services
```bash
# From the project root
docker-compose up --build
```

### 3. Start without rebuilding (subsequent runs)
```bash
docker-compose up
```

### 4. Stop all services
```bash
docker-compose down
```

### 5. Stop and remove all data (full reset)
```bash
docker-compose down -v
```

### Service URLs (Docker)
| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| MySQL (host access) | localhost:**3307** |

> **Note:** MySQL is exposed on port `3307` in Docker to avoid conflicts with a local MySQL running on `3306`.

---

## 📦 Docker Services Overview

| Container | Image | Role |
|---|---|---|
| `pratham_backend` | Custom (Node.js) | REST API |
| `pratham_frontend` | Custom (Nginx + React) | Static UI |
| `pratham_db` | `mysql:8.0` | Database |

The database is auto-initialised using `sql/pratham_guru_db.sql` on first run.

---

## 🔑 Available Backend Scripts

Run these from the `backend/` directory:

| Command | Description |
|---|---|
| `npm run dev` | Start backend with hot-reload (development) |
| `npm start` | Start backend (production) |
| `npm run prisma:studio` | Open Prisma Studio database browser |

---

## 🗄️ Database Migrations

Run from the `backend/` directory:

```bash
# Apply all pending migrations
node node_modules/prisma/build/index.js migrate deploy

# Sync schema without migrations (dev only)
node node_modules/prisma/build/index.js db push

# Regenerate Prisma Client after schema changes
node node_modules/prisma/build/index.js generate
```

---

## 🌐 API Base URL

| Environment | URL |
|---|---|
| Local | `http://localhost:8000` |
| Docker | `http://localhost:8000` |

---

## 📁 Key Files

| File | Purpose |
|---|---|
| `backend/prisma/schema.prisma` | Database schema definition |
| `backend/prisma.config.mjs` | Prisma 7 configuration (env loading, datasource) |
| `backend/src/prisma.js` | Shared Prisma Client instance |
| `docker-compose.yml` | Multi-container Docker setup |
| `.env.example` | Template for environment variables |
| `sql/pratham_guru_db.sql` | Initial database seed for Docker |
