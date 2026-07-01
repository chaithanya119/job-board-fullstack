import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register(){
 const {register}=useAuth(); const nav=useNavigate(); const [form,setForm]=useState({name:'',email:'',password:'',role:'candidate',location:'Hyderabad',skills:''}); const [err,setErr]=useState('')
 const change=e=>setForm({...form,[e.target.name]:e.target.value})
 const submit=async(e)=>{e.preventDefault(); try{const u=await register(form); nav(u.role==='admin'?'/admin':u.role==='recruiter'?'/recruiter':'/candidate')}catch(e){setErr(e.response?.data?.detail||'Registration failed')}}
 return <div className="auth-page"><form className="card auth-card" onSubmit={submit}><h1>Create Account</h1><input name="name" value={form.name} onChange={change} placeholder="Full Name" required/><input name="email" value={form.email} onChange={change} placeholder="Email" required/><input name="password" type="password" value={form.password} onChange={change} placeholder="Password" required/><select name="role" value={form.role} onChange={change}><option value="candidate">Candidate</option><option value="recruiter">Recruiter</option></select><input name="location" value={form.location} onChange={change} placeholder="Location"/><input name="skills" value={form.skills} onChange={change} placeholder="Skills"/><button className="btn btn-primary">Register</button>{err&&<p className="error">{err}</p>}<p>Already have account? <Link to="/login">Login</Link></p></form></div>
}
