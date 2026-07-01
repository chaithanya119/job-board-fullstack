from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine, SessionLocal
from app.api import auth, companies, jobs, applications, admin
from app.seed import seed_data

# Create database tables
Base.metadata.create_all(bind=engine)

# Seed demo data
with SessionLocal() as db:
    seed_data(db)

app = FastAPI(
    title="JobBoard Pro API",
    version="1.0.0"
)

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "https://job-board-fullstack-alpha.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# --------------------------------------

@app.get("/")
def root():
    return {
        "message": "JobBoard Pro API is running",
        "docs": "/docs"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

# API Routes
app.include_router(auth.router, prefix="/api")
app.include_router(companies.router, prefix="/api")
app.include_router(jobs.router, prefix="/api")
app.include_router(applications.router, prefix="/api")
app.include_router(admin.router, prefix="/api")