# Vercel Deployment Guide

To deploy this project successfully, you will need to set up two separate deployments in Vercel (one for the Backend and one for the Frontend) because they have different project roots and configurations.

## Prerequisites
1.  **Hosted MySQL Database**: You cannot use a local MySQL. You must have a cloud database (e.g., [PlanetScale](https://planetscale.com/), [Aiven](https://aiven.io/), [Tidb Cloud](https://www.pingcap.com/tidb-cloud/), or any MySQL host).
2.  **GitHub Repository**: Push your code to a GitHub repository.

---

## Step 1: Deploy the Backend
The backend must be deployed first so we can get its URL.

1.  Go to [Vercel](https://vercel.com/) and click **"Add New" -> "Project"**.
2.  Import your GitHub repository.
3.  In the **"Configure Project"** screen:
    *   **Root Directory**: Click "Edit" and select the `backend` folder.
    *   **Framework Preset**: Select "Other".
    *   **Environment Variables**: Add the following:
        *   `DATABASE_URL`: Your cloud MySQL connection string.
        *   `JWT_SECRET`: A random string for token security.
        *   `FRONTEND_URL`: (Optional for first deploy) Your frontend URL. You can add this after deploying the frontend.
4.  Click **Deploy**.
5.  **Copy the newly created URL** (e.g., `https://pratham-backend.vercel.app`).

---

## Step 2: Deploy the Frontend
Now we deploy the user interface and link it to the backend.

1.  Go back to the Vercel Dashboard and click **"Add New" -> "Project"** again for the same repository.
2.  In the **"Configure Project"** screen:
    *   **Root Directory**: Leave it as the root (`/`).
    *   **Framework Preset**: Vite.
    *   **Environment Variables**: Add the following:
        *   `VITE_API_BASE_URL`: Paste the Backend URL you copied in Step 1.
3.  Click **Deploy**.
4.  **Copy the newly created URL** (e.g., `https://pratham-frontend.vercel.app`).

---

## Step 3: Connect Frontend to Backend (CORS)
**Critical Step**: Now that you have the Frontend URL, you must tell the Backend to allow requests from it.

1.  Go back to your **Backend Project** in Vercel.
2.  Go to **Settings** -> **Environment Variables**.
3.  Add a new variable:
    *   **Key**: `FRONTEND_URL`
    *   **Value**: Paste your Frontend URL (e.g., `https://pratham-frontend.vercel.app`). **Do not add a trailing slash**.
4.  Go to the **Deployments** tab.
5.  Click the **three dots** on the latest deployment and select **"Redeploy"**.
6.  This enables the backend to accept requests from your specific frontend domain.

## Technical Details (Already Configured)
I have already made the following changes to make this possible:
1.  **Dynamic API URL**: Updated `src/api/axios.js` to use environment variables.
2.  **Serverless Support**: Modified `backend/src/server.js` to export the app for Vercel.
3.  **Vercel Config**: Created `backend/vercel.json` to handle backend routing.
4.  **Prisma Automation**: Added a `postinstall` script to `backend/package.json` so the database client is generated automatically during deployment.

## Troubleshooting
*   **CORS Issues**: Ensure your Backend's `server.js` allows your Frontend's domain in the CORS settings.
*   **Database Connection**: If the backend fails, double-check that your `DATABASE_URL` is accessible from the internet (Vercel's IP addresses).

---

## Local Docker Deployment (Client Side)

If you want to run the application locally or on a client's machine using Docker, follow these steps.

### Prerequisites
1.  **Docker Desktop**: Ensure Docker and Docker Compose are installed and running.
    *   [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Build and Start Services
Run the following command in the root directory (where `docker-compose.yml` is located):

```bash
docker-compose up --build -d
```

### 2. Verify Deployment
*   **Frontend**: Open [http://localhost:3000](http://localhost:3000)
*   **Backend**: Accessible at [http://localhost:8000](http://localhost:8000)
*   **Database**: MySQL running on port `3307` (mapped from 3306).

### 3. Management
*   **Stop services**: `docker-compose down`
*   **View logs**: `docker-compose logs -f`

