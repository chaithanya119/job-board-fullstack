import { Link } from 'react-router-dom'
import { Search, ShieldCheck, Rocket, Users } from 'lucide-react'

export default function Home() {
  return <div>
    <section className="hero">
      <div className="hero-content">
        <span className="eyebrow">Onsite Hyderabad · Night Shift Ready Project</span>
        <h1>Find, apply, and manage jobs from one modern platform.</h1>
        <p>A polished job board with candidate, recruiter, and admin workflows built using React, FastAPI, and PostgreSQL.</p>
        <div className="hero-actions"><Link to="/jobs" className="btn btn-primary"><Search size={18}/> Browse Jobs</Link><Link to="/register" className="btn btn-outline">Create Account</Link></div>
      </div>
      <div className="hero-card card"><h3>Live Platform Metrics</h3><div className="metric"><b>5+</b><span>Seed Jobs</span></div><div className="metric"><b>3</b><span>User Roles</span></div><div className="metric"><b>100%</b><span>API Driven</span></div></div>
    </section>
    <section className="features">
      <div className="card"><Rocket/><h3>Fast Application Flow</h3><p>Search jobs, view details, apply, and track status.</p></div>
      <div className="card"><Users/><h3>Recruiter Dashboard</h3><p>Create jobs and manage candidate applications.</p></div>
      <div className="card"><ShieldCheck/><h3>Admin Control</h3><p>View users, companies, jobs, and platform analytics.</p></div>
    </section>
  </div>
}
