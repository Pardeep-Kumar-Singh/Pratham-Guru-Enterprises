# Frontend-Backend Separation - Migration Guide

## ✅ Completed Steps

### 1. Directory Structure Created
- ✅ Created `frontend/` directory
- ✅ Moved all frontend files to `frontend/`
- ✅ Backend remains in `backend/` directory

### 2. Files Moved to Frontend
- ✅ `src/` → `frontend/src/`
- ✅ `public/` → `frontend/public/`
- ✅ `index.html` → `frontend/index.html`
- ✅ `vite.config.js` → `frontend/vite.config.js`
- ✅ `eslint.config.js` → `frontend/eslint.config.js`
- ✅ `package.json` → `frontend/package.json`
- ✅ `package-lock.json` → `frontend/package-lock.json`

### 3. Configuration Files Created
- ✅ `frontend/.env` - Environment variables
- ✅ `frontend/.env.example` - Environment template
- ✅ `frontend/.gitignore` - Git ignore rules
- ✅ `frontend/README.md` - Frontend documentation

### 4. Backend Configuration Updated
- ✅ `backend/.env` - Added `FRONTEND_URL=http://localhost:5173`
- ✅ `backend/.env.example` - Environment template
- ✅ `backend/src/server.js` - Updated CORS to use `FRONTEND_URL`
- ✅ `backend/README.md` - Backend documentation

### 5. Root Configuration
- ✅ `README.md` - Main project documentation
- ✅ `.gitignore` - Updated for new structure

---

## 🔧 Next Steps (Manual)

### Step 1: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 2: Install Backend Dependencies (if needed)
```bash
cd backend
npm install
```

### Step 3: Verify Environment Variables

**Frontend** (`frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:8000
```

**Backend** (`backend/.env`):
```env
PORT=8000
DATABASE_URL="mysql://root:1234@localhost:3306/pratham_guru_db"
JWT_SECRET=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:5173
```

### Step 4: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server will start on `http://localhost:8000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Application will start on `http://localhost:5173`

### Step 5: Test the Connection
1. Open browser to `http://localhost:5173`
2. Try logging in
3. Verify API calls are working (check browser console)

---

## 📁 New Project Structure

```
Pratham-Guru-Enterprises/
│
├── frontend/                    # React Frontend
│   ├── src/
│   │   ├── admin/              # Admin components
│   │   ├── auth/               # Authentication
│   │   ├── coordinator/        # Coordinator dashboard
│   │   ├── tendor/             # Tendor dashboard
│   │   ├── api/                # Axios configuration
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
│
├── backend/                     # Node.js Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── server.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   └── README.md
│
├── .gitignore
└── README.md
```

---

## 🔗 API Connection

### How It Works

1. **Frontend** makes API calls using axios:
   ```javascript
   // frontend/src/api/axios.js
   baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
   ```

2. **Backend** accepts requests from frontend:
   ```javascript
   // backend/src/server.js
   const allowedOrigins = process.env.FRONTEND_URL.split(',')
   app.use(cors({ origin: allowedOrigins }))
   ```

3. **Environment Variables** control the connection:
   - Frontend: `VITE_API_BASE_URL` → Backend URL
   - Backend: `FRONTEND_URL` → Frontend URL (for CORS)

---

## 🚀 Deployment Guide

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy `dist/` folder**

3. **Set environment variable:**
   ```
   VITE_API_BASE_URL=https://your-backend-url.com
   ```

### Backend Deployment (Render/Railway)

1. **Deploy backend code**

2. **Set environment variables:**
   ```
   DATABASE_URL=your-production-database-url
   JWT_SECRET=your-production-secret
   FRONTEND_URL=https://your-frontend-url.com
   ```

3. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

---

## ✨ Benefits of This Structure

✅ **Independent Deployment** - Deploy frontend and backend separately  
✅ **Clear Separation** - Better code organization  
✅ **Team Collaboration** - Different teams can work independently  
✅ **Flexible Hosting** - Host on different platforms  
✅ **Easier Maintenance** - Isolated dependencies  
✅ **Better CI/CD** - Separate build pipelines  

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
- ✅ Check `VITE_API_BASE_URL` in `frontend/.env`
- ✅ Verify backend is running on correct port
- ✅ Check browser console for CORS errors

### CORS errors
- ✅ Verify `FRONTEND_URL` in `backend/.env`
- ✅ Check `backend/src/server.js` CORS configuration
- ✅ Restart backend server after changing `.env`

### 401 Unauthorized errors
- ✅ Check if JWT token is being sent
- ✅ Verify `JWT_SECRET` is same as when token was created
- ✅ Check token expiration time

---

## 📝 Important Notes

1. **Environment Variables**: 
   - Frontend env vars must start with `VITE_`
   - Restart dev servers after changing `.env` files

2. **CORS Configuration**:
   - Backend must allow frontend URL
   - For multiple URLs, use comma-separated: `http://localhost:5173,https://production-url.com`

3. **API Base URL**:
   - Always use environment variable
   - Never hardcode URLs in components

---

## ✅ Migration Checklist

- [x] Create frontend directory
- [x] Move frontend files
- [x] Create frontend .env
- [x] Create frontend README
- [x] Update backend .env
- [x] Update backend CORS config
- [x] Create backend README
- [x] Update root README
- [x] Update .gitignore files
- [ ] Install frontend dependencies
- [ ] Install backend dependencies
- [ ] Test local development
- [ ] Test API connectivity
- [ ] Update deployment configs

---

## 🎉 You're All Set!

Your frontend and backend are now properly separated while maintaining seamless connectivity through environment variables.

**Next Steps:**
1. Install dependencies in both folders
2. Start both dev servers
3. Test the application
4. Commit changes to Git
