from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from typing import List
from app.core.database import get_db
from app.models.models import User, Job, Company, Application
from app.schemas.schemas import UserOut, JobOut, CompanyOut, ApplicationOut, DashboardStats
from app.api.deps import require_admin

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/stats", response_model=DashboardStats)
def stats(_: User = Depends(require_admin), db: Session = Depends(get_db)):
    return {
        "total_users": db.query(User).count(),
        "total_jobs": db.query(Job).count(),
        "total_companies": db.query(Company).count(),
        "total_applications": db.query(Application).count(),
    }

@router.get("/users", response_model=List[UserOut])
def users(_: User = Depends(require_admin), db: Session = Depends(get_db)):
    return db.query(User).order_by(User.created_at.desc()).all()

@router.get("/jobs", response_model=List[JobOut])
def jobs(_: User = Depends(require_admin), db: Session = Depends(get_db)):
    return db.query(Job).options(joinedload(Job.company)).order_by(Job.created_at.desc()).all()

@router.get("/companies", response_model=List[CompanyOut])
def companies(_: User = Depends(require_admin), db: Session = Depends(get_db)):
    return db.query(Company).order_by(Company.created_at.desc()).all()

@router.get("/applications", response_model=List[ApplicationOut])
def applications(_: User = Depends(require_admin), db: Session = Depends(get_db)):
    return db.query(Application).options(joinedload(Application.job).joinedload(Job.company), joinedload(Application.candidate)).order_by(Application.created_at.desc()).all()
