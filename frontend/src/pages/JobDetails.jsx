import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext.jsx'

export default function JobDetails(){
  const {id}=useParams(); const {user}=useAuth(); const [job,setJob]=useState(null); const [cover,setCover]=useState(''); const [msg,setMsg]=useState('')
  useEffect(()=>{api.get(`/jobs/${id}`).then(({data})=>setJob(data))},[id])
  const apply=async()=>{try{await api.post('/applications',{job_id:Number(id), cover_letter:cover}); setMsg('Application submitted successfully.')}catch(e){setMsg(e.response?.data?.detail||'Unable to apply')}}
  if(!job) return <div className="page"><p>Loading job...</p></div>
  return <div className="page details"><Link to="/jobs">← Back to jobs</Link><div className="card"><h1>{job.title}</h1><p className="muted">{job.company?.name} · {job.location} · {job.job_type}</p><span className="badge">{job.category}</span><h3>Description</h3><p>{job.description}</p><h3>Requirements</h3><p>{job.requirements}</p><h3>Responsibilities</h3><p>{job.responsibilities}</p><h3>Salary</h3><p>₹{job.salary_min?.toLocaleString()} - ₹{job.salary_max?.toLocaleString()}</p>{user?.role==='candidate'?<div className="apply-box"><h3>Apply Now</h3><textarea placeholder="Write a short cover letter" value={cover} onChange={e=>setCover(e.target.value)} /><button className="btn btn-primary" onClick={apply}>Submit Application</button>{msg&&<p className="message">{msg}</p>}</div>:!user?<p><Link to="/login">Login</Link> as candidate to apply.</p>:null}</div></div>
}
