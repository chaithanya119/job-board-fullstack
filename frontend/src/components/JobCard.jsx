import { Link } from 'react-router-dom'
import { MapPin, IndianRupee, Clock, Building2 } from 'lucide-react'

export default function JobCard({ job }) {
  return <div className="card job-card">
    <div className="job-header">
      <div>
        <h3>{job.title}</h3>
        <p className="muted"><Building2 size={16}/> {job.company?.name || 'Company'}</p>
      </div>
      <span className="badge">{job.category}</span>
    </div>
    <p className="job-desc">{job.description}</p>
    <div className="job-meta">
      <span><MapPin size={16}/> {job.location}</span>
      <span><Clock size={16}/> {job.job_type}</span>
      <span><IndianRupee size={16}/> {(job.salary_min || 0).toLocaleString()} - {(job.salary_max || 0).toLocaleString()}</span>
    </div>
    <div className="job-actions">
      <span className={job.is_remote ? 'remote yes' : 'remote'}>{job.is_remote ? 'Remote' : 'Onsite'}</span>
      <Link className="btn btn-primary" to={`/jobs/${job.id}`}>View Details</Link>
    </div>
  </div>
}
