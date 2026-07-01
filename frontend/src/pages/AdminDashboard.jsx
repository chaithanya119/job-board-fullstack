import { useEffect, useState } from 'react'
import api from '../services/api'

export default function AdminDashboard(){
 const [stats,setStats]=useState(null), [users,setUsers]=useState([]), [jobs,setJobs]=useState([]), [apps,setApps]=useState([])
 useEffect(()=>{Promise.all([api.get('/admin/stats'),api.get('/admin/users'),api.get('/admin/jobs'),api.get('/admin/applications')]).then(([s,u,j,a])=>{setStats(s.data);setUsers(u.data);setJobs(j.data);setApps(a.data)})},[])
 return <div className="page"><h1>Admin Dashboard</h1>{stats&&<div className="stats"><div className="card"><b>{stats.total_users}</b><span>Users</span></div><div className="card"><b>{stats.total_jobs}</b><span>Jobs</span></div><div className="card"><b>{stats.total_companies}</b><span>Companies</span></div><div className="card"><b>{stats.total_applications}</b><span>Applications</span></div></div>}<div className="card"><h2>Users</h2><table><tbody>{users.map(u=><tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td><span className="badge">{u.role}</span></td></tr>)}</tbody></table></div><div className="card"><h2>Jobs</h2><table><tbody>{jobs.map(j=><tr key={j.id}><td>{j.title}</td><td>{j.company?.name}</td><td>{j.location}</td></tr>)}</tbody></table></div><div className="card"><h2>Applications</h2><table><tbody>{apps.map(a=><tr key={a.id}><td>{a.candidate?.name}</td><td>{a.job?.title}</td><td>{a.status}</td></tr>)}</tbody></table></div></div>
}
