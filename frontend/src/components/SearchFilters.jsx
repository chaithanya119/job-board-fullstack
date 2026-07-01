export default function SearchFilters({ filters, setFilters, onSearch }) {
  const change = e => setFilters({ ...filters, [e.target.name]: e.target.value })
  return <div className="filters card">
    <input name="search" placeholder="Search title, skills, keywords" value={filters.search} onChange={change}/>
    <input name="location" placeholder="Location" value={filters.location} onChange={change}/>
    <select name="category" value={filters.category} onChange={change}>
      <option value="">All Categories</option><option>Backend</option><option>Frontend</option><option>Full Stack</option><option>AI/ML</option><option>Data</option>
    </select>
    <select name="job_type" value={filters.job_type} onChange={change}>
      <option value="">All Types</option><option>Full Time</option><option>Internship</option><option>Contract</option>
    </select>
    <button className="btn btn-primary" onClick={onSearch}>Search</button>
  </div>
}
