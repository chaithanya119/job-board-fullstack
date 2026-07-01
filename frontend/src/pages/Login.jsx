import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login(){
 const {login}=useAuth(); const nav=useNavigate(); const [email,setEmail]=useState('candidate@jobboard.com'); const [password,setPassword]=useState('password123'); const [err,setErr]=useState('')
 const submit=async(e)=>{e.preventDefault(); try{const u=await login(email,password); nav(u.role==='admin'?'/admin':u.role==='recruiter'?'/recruiter':'/candidate')}catch{setErr('Invalid login details')}}
 return <div className="auth-page"><form className="card auth-card" onSubmit={submit}><h1>Login</h1><p className="muted">Use demo accounts or your registered account.</p><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/><button className="btn btn-primary">Login</button>{err&&<p className="error">{err}</p>}<p>No account? <Link to="/register">Register</Link></p><div className="demo"><b>Demo:</b><br/>admin@jobboard.com<br/>recruiter@jobboard.com<br/>candidate@jobboard.com<br/>Password: password123</div></form></div>
}
