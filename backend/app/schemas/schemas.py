from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr
from app.models.models import UserRole, ApplicationStatus

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserOut"

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: UserRole = UserRole.candidate
    phone: Optional[str] = None
    location: Optional[str] = None
    skills: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: UserRole
    phone: Optional[str] = None
    location: Optional[str] = None
    skills: Optional[str] = None
    is_active: bool
    created_at: datetime
    class Config:
        from_attributes = True

class CompanyCreate(BaseModel):
    name: str
    description: Optional[str] = None
    website: Optional[str] = None
    location: str
    industry: Optional[str] = None
    logo_url: Optional[str] = None

class CompanyOut(CompanyCreate):
    id: int
    owner_id: Optional[int]
    created_at: datetime
    class Config:
        from_attributes = True

class JobCreate(BaseModel):
    title: str
    description: str
    requirements: str
    responsibilities: Optional[str] = None
    location: str
    job_type: str = "Full Time"
    experience_level: str = "Fresher"
    category: str
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    is_remote: bool = False
    company_id: int

class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    responsibilities: Optional[str] = None
    location: Optional[str] = None
    job_type: Optional[str] = None
    experience_level: Optional[str] = None
    category: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    is_remote: Optional[bool] = None
    is_active: Optional[bool] = None
    company_id: Optional[int] = None

class JobOut(BaseModel):
    id: int
    title: str
    description: str
    requirements: str
    responsibilities: Optional[str]
    location: str
    job_type: str
    experience_level: str
    category: str
    salary_min: Optional[int]
    salary_max: Optional[int]
    is_remote: bool
    is_active: bool
    company_id: int
    recruiter_id: int
    created_at: datetime
    company: Optional[CompanyOut] = None
    class Config:
        from_attributes = True

class ApplicationCreate(BaseModel):
    job_id: int
    cover_letter: Optional[str] = None
    resume_url: Optional[str] = None

class ApplicationUpdate(BaseModel):
    status: ApplicationStatus

class ApplicationOut(BaseModel):
    id: int
    job_id: int
    candidate_id: int
    cover_letter: Optional[str]
    resume_url: Optional[str]
    status: ApplicationStatus
    created_at: datetime
    job: Optional[JobOut] = None
    candidate: Optional[UserOut] = None
    class Config:
        from_attributes = True

class DashboardStats(BaseModel):
    total_users: int
    total_jobs: int
    total_companies: int
    total_applications: int

Token.model_rebuild()
