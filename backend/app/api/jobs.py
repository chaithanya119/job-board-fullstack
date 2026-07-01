from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from app.core.database import get_db
from app.models.models import Job, Company, User, UserRole
from app.schemas.schemas import JobCreate, JobUpdate, JobOut
from app.api.deps import get_current_user, require_recruiter_or_admin

router = APIRouter(prefix="/jobs", tags=["Jobs"])

@router.get("", response_model=List[JobOut])
def list_jobs(
    search: Optional[str] = Query(None),
    location: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    job_type: Optional[str] = Query(None),
    experience_level: Optional[str] = Query(None),
    remote: Optional[bool] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Job).options(joinedload(Job.company)).filter(Job.is_active == True)
    if search:
        like = f"%{search}%"
        query = query.filter((Job.title.ilike(like)) | (Job.description.ilike(like)) | (Job.requirements.ilike(like)))
    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))
    if category:
        query = query.filter(Job.category == category)
    if job_type:
        query = query.filter(Job.job_type == job_type)
    if experience_level:
        query = query.filter(Job.experience_level == experience_level)
    if remote is not None:
        query = query.filter(Job.is_remote == remote)
    return query.order_by(Job.created_at.desc()).all()

@router.get("/mine", response_model=List[JobOut])
def my_jobs(current_user: User = Depends(require_recruiter_or_admin), db: Session = Depends(get_db)):
    query = db.query(Job).options(joinedload(Job.company))
    if current_user.role == UserRole.recruiter:
        query = query.filter(Job.recruiter_id == current_user.id)
    return query.order_by(Job.created_at.desc()).all()

@router.post("", response_model=JobOut)
def create_job(payload: JobCreate, current_user: User = Depends(require_recruiter_or_admin), db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.id == payload.company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    job = Job(**payload.model_dump(), recruiter_id=current_user.id)
    db.add(job)
    db.commit()
    db.refresh(job)
    return db.query(Job).options(joinedload(Job.company)).filter(Job.id == job.id).first()

@router.get("/{job_id}", response_model=JobOut)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).options(joinedload(Job.company)).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.put("/{job_id}", response_model=JobOut)
def update_job(job_id: int, payload: JobUpdate, current_user: User = Depends(require_recruiter_or_admin), db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if current_user.role == UserRole.recruiter and job.recruiter_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only edit your jobs")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(job, key, value)
    db.commit()
    db.refresh(job)
    return db.query(Job).options(joinedload(Job.company)).filter(Job.id == job.id).first()

@router.delete("/{job_id}")
def delete_job(job_id: int, current_user: User = Depends(require_recruiter_or_admin), db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if current_user.role == UserRole.recruiter and job.recruiter_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only delete your jobs")
    db.delete(job)
    db.commit()
    return {"message": "Job deleted successfully"}
