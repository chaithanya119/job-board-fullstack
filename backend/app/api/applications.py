from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List
from app.core.database import get_db
from app.models.models import Application, Job, User, UserRole
from app.schemas.schemas import ApplicationCreate, ApplicationUpdate, ApplicationOut
from app.api.deps import get_current_user, require_recruiter_or_admin

router = APIRouter(prefix="/applications", tags=["Applications"])

@router.post("", response_model=ApplicationOut)
def apply_job(payload: ApplicationCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != UserRole.candidate:
        raise HTTPException(status_code=403, detail="Only candidates can apply")
    job = db.query(Job).filter(Job.id == payload.job_id, Job.is_active == True).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    exists = db.query(Application).filter(Application.job_id == payload.job_id, Application.candidate_id == current_user.id).first()
    if exists:
        raise HTTPException(status_code=400, detail="You already applied for this job")
    app = Application(**payload.model_dump(), candidate_id=current_user.id)
    db.add(app)
    db.commit()
    db.refresh(app)
    return db.query(Application).options(joinedload(Application.job).joinedload(Job.company), joinedload(Application.candidate)).filter(Application.id == app.id).first()

@router.get("/mine", response_model=List[ApplicationOut])
def my_applications(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    query = db.query(Application).options(joinedload(Application.job).joinedload(Job.company), joinedload(Application.candidate))
    if current_user.role == UserRole.candidate:
        query = query.filter(Application.candidate_id == current_user.id)
    elif current_user.role == UserRole.recruiter:
        query = query.join(Job).filter(Job.recruiter_id == current_user.id)
    return query.order_by(Application.created_at.desc()).all()

@router.get("", response_model=List[ApplicationOut])
def all_applications(current_user: User = Depends(require_recruiter_or_admin), db: Session = Depends(get_db)):
    query = db.query(Application).options(joinedload(Application.job).joinedload(Job.company), joinedload(Application.candidate))
    if current_user.role == UserRole.recruiter:
        query = query.join(Job).filter(Job.recruiter_id == current_user.id)
    return query.order_by(Application.created_at.desc()).all()

@router.put("/{application_id}", response_model=ApplicationOut)
def update_application(application_id: int, payload: ApplicationUpdate, current_user: User = Depends(require_recruiter_or_admin), db: Session = Depends(get_db)):
    app = db.query(Application).options(joinedload(Application.job)).filter(Application.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    if current_user.role == UserRole.recruiter and app.job.recruiter_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only update applications for your jobs")
    app.status = payload.status
    db.commit()
    db.refresh(app)
    return db.query(Application).options(joinedload(Application.job).joinedload(Job.company), joinedload(Application.candidate)).filter(Application.id == app.id).first()
