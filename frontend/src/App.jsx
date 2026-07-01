import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Jobs from './pages/Jobs.jsx'
import JobDetails from './pages/JobDetails.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import CandidateDashboard from './pages/CandidateDashboard.jsx'
import RecruiterDashboard from './pages/RecruiterDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Documentation from './pages/Documentation.jsx'
import { useAuth } from './context/AuthContext.jsx'

function Protected({ children, roles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />
  return children
}

export default function App() {
  return <>
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/candidate" element={<Protected roles={['candidate']}><CandidateDashboard /></Protected>} />
        <Route path="/recruiter" element={<Protected roles={['recruiter','admin']}><RecruiterDashboard /></Protected>} />
        <Route path="/admin" element={<Protected roles={['admin']}><AdminDashboard /></Protected>} />
      </Routes>
    </main>
    <Footer />
  </>
}
