# JobBoard Pro - Full Stack Job Board

A complete full-stack job board built with React.js, FastAPI, and PostgreSQL.

## Features

- Candidate, Recruiter, and Admin roles
- JWT authentication
- Job listing, search, category, location, experience, and job type filters
- Job details page
- Candidate job applications
- Recruiter job create/update/delete
- Recruiter application review with status update
- Admin dashboard for users, jobs, companies, and applications
- PostgreSQL database with seed data
- FastAPI Swagger documentation
- GitHub Actions CI
- Vercel frontend configuration
- Render/Railway-ready backend configuration

## Project Structure

```text
job-board-fullstack/
├── backend/
├── frontend/
├── database/
├── docs/
├── screenshots/
└── .github/workflows/
```

## Prerequisites

Install these before running:

- Python 3.11+
- Node.js 18+
- PostgreSQL 14+
- Git

## 1. Create PostgreSQL Database

Open pgAdmin or SQL Shell and run:

```sql
CREATE DATABASE jobboard_db;
```

## 2. Run Backend

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Open `.env` and update your PostgreSQL password:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/jobboard_db
```

Start backend:

```powershell
python -m uvicorn app.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

API Docs:

```text
http://127.0.0.1:8000/docs
```

## 3. Run Frontend

Open a new terminal:

```powershell
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Demo Login Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@jobboard.com | password123 |
| Recruiter | recruiter@jobboard.com | password123 |
| Candidate | candidate@jobboard.com | password123 |

Seed data is automatically created when the backend starts.

## GitHub Push

```powershell
git init
git add .
git commit -m "Initial full stack job board project"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

## Deployment

Frontend: Vercel
Backend: Render or Railway
Database: Supabase, Neon, Render PostgreSQL, or Railway PostgreSQL

For production, update frontend environment variable:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```
