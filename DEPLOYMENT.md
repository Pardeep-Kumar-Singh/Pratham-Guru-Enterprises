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

---

## Technical Details (Already Configured)
I have already made the following changes to make this possible:
1.  **Dynamic API URL**: Updated `src/api/axios.js` to use environment variables.
2.  **Serverless Support**: Modified `backend/src/server.js` to export the app for Vercel.
3.  **Vercel Config**: Created `backend/vercel.json` to handle backend routing.
4.  **Prisma Automation**: Added a `postinstall` script to `backend/package.json` so the database client is generated automatically during deployment.

## Troubleshooting
*   **CORS Issues**: Ensure your Backend's `server.js` allows your Frontend's domain in the CORS settings.
*   **Database Connection**: If the backend fails, double-check that your `DATABASE_URL` is accessible from the internet (Vercel's IP addresses).
