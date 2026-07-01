import { useEffect, useState } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext.jsx'

export default function CandidateDashboard(){
 const {user}=useAuth(); const [apps,setApps]=useState([])
 useEffect(()=>{api.get('/applications/mine').then(({data})=>setApps(data))},[])
 return <div className="page"><h1>Candidate Dashboard</h1><p className="muted">Welcome, {user?.name}</p><div className="stats"><div className="card"><b>{apps.length}</b><span>Total Applications</span></div><div className="card"><b>{apps.filter(a=>a.status==='shortlisted').length}</b><span>Shortlisted</span></div><div className="card"><b>{apps.filter(a=>a.status==='pending').length}</b><span>Pending</span></div></div><div className="card"><h2>My Applications</h2><table><tbody>{apps.map(a=><tr key={a.id}><td>{a.job?.title}</td><td>{a.job?.company?.name}</td><td><span className="badge">{a.status}</span></td></tr>)}</tbody></table>{!apps.length&&<p>No applications yet.</p>}</div></div>
}
