import { useEffect, useState } from 'react'
import api from '../services/api'
import SearchFilters from '../components/SearchFilters.jsx'
import JobCard from '../components/JobCard.jsx'

export default function Jobs(){
  const [jobs,setJobs]=useState([]); const [loading,setLoading]=useState(false)
  const [filters,setFilters]=useState({search:'',location:'',category:'',job_type:''})
  const load=async()=>{setLoading(true); const params=Object.fromEntries(Object.entries(filters).filter(([,v])=>v)); const {data}=await api.get('/jobs',{params}); setJobs(data); setLoading(false)}
  useEffect(()=>{load()},[])
  return <div className="page"><h1>Browse Jobs</h1><p className="muted">Find relevant opportunities using search and filters.</p><SearchFilters filters={filters} setFilters={setFilters} onSearch={load}/>{loading?<p>Loading...</p>:<div className="grid jobs-grid">{jobs.map(j=><JobCard job={j} key={j.id}/>)}</div>}</div>
}
