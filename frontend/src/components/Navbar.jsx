import { Link, NavLink } from 'react-router-dom'
import { BriefcaseBusiness } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const dash = user?.role === 'admin' ? '/admin' : user?.role === 'recruiter' ? '/recruiter' : '/candidate'
  return <nav className="navbar">
    <Link to="/" className="brand"><BriefcaseBusiness /> JobBoard Pro</Link>
    <div className="navlinks">
      <NavLink to="/jobs">Jobs</NavLink>
      <NavLink to="/docs">Docs</NavLink>
      {user ? <>
        <NavLink to={dash}>Dashboard</NavLink>
        <span className="user-pill">{user.name}</span>
        <button onClick={logout} className="btn btn-outline">Logout</button>
      </> : <>
        <NavLink to="/login">Login</NavLink>
        <Link to="/register" className="btn btn-primary">Register</Link>
      </>}
    </div>
  </nav>
}
