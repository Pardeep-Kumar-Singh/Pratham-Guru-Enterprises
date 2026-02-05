# Docker Deployment Instructions

This project is now fully configured to run with Docker. This allows you to run the Backend, Frontend, and a MySQL Database in isolated containers with a single command.

## Prerequisites

- **Docker Desktop**: Ensure Docker Desktop is installed and running on your machine.

## Quick Start

1.  **Start the Application**:
    Open your terminal in the project root (`Pratham-Guru-Enterprises`) and run:
    ```powershell
    docker-compose up --build -d
    ```
    - `--build`: Forces a rebuild of the images (important if you changed code).
    - `-d`: Detached mode (runs in the background).

2.  **Verify Status**:
    Check if all containers are running:
    ```powershell
    docker-compose ps
    ```
    You should see `pratham_backend`, `pratham_frontend`, and `pratham_db` all with status "Up".

3.  **Access the Application**:
    - **Frontend**: [http://localhost:3000](http://localhost:3000)
    - **Backend API**: [http://localhost:8000](http://localhost:8000)

4.  **Stop the Application**:
    ```powershell
    docker-compose down
    ```
    To stop and **remove database data** (start fresh), add the `-v` flag:
    ```powershell
    docker-compose down -v
    ```

## Notes

- **Database**: The MySQL database runs on port `3307` (mapped from 3306 inside the container) to avoid conflicts with any local MySQL you might have running.
    - **Host**: `localhost` (from your machine) or `db` (from inside docker)
    - **Port**: `3307` (from your machine)
    - **User**: `root`
    - **Password**: `1234`
    - **Database**: `pratham_guru_db`

- **Environment Variables**:
    - The backend uses `DATABASE_URL` configured in `docker-compose.yml` to talk to the inner `db` container.
    - The frontend uses `VITE_API_BASE_URL` baked in at build time via `docker-compose.yml`.

## Troubleshooting

- **Container crashes**: View logs with `docker-compose logs backend` or `docker-compose logs frontend`.
- **Database Connection Error**: Ensure the backend waits for the DB to be ready. If it fails immediately on first start, it might restart automatically (thanks to `restart: always`) and connect once the DB is up.
