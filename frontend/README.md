# Pratham Guru Enterprises - Frontend

React + Vite frontend application for Pratham Guru Enterprises management system.

## Prerequisites

- Node.js 18+ 
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
   
   Update `.env` with your backend API URL:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

### Vercel
1. Connect your repository to Vercel
2. Set environment variable: `VITE_API_BASE_URL=<your-backend-url>`
3. Deploy

### Netlify
1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variable: `VITE_API_BASE_URL=<your-backend-url>`

## Project Structure

```
frontend/
├── src/
│   ├── admin/          # Admin dashboard components
│   ├── auth/           # Authentication pages
│   ├── coordinator/    # Coordinator dashboard
│   ├── tendor/         # Tendor dashboard
│   ├── api/            # API configuration (axios)
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── public/             # Static assets
├── index.html          # HTML template
└── vite.config.js      # Vite configuration
```

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:8000` |

## Support

For issues or questions, please contact the development team.
