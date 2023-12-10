import React from 'react'
import {Link, useNavigate} from "react-router-dom";

export default function Navbar() {
  const navigate=useNavigate();
  const handleClick=()=>{
    localStorage.removeItem("auth-token");
    navigate("/signup")
  }
  const handleClick1=()=>{
    navigate("/profile")
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">NewsMonkey</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {localStorage.getItem("auth-token") && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/Business">Bussiness</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/Entertainment">Entertainment</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/General">General</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/Health">Health</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/Science">Science</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/Sports">Sports</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/Technology">Technology</Link></li>
      </ul>}
      {!localStorage.getItem("auth-token")?<div style={{display:"flex",width:"100%",justifyContent:"end"}}>
        <Link className="btn btn-primary mx-2" to="/signup" type="submit">Sign Up</Link>
        <Link className="btn btn-primary mx-1" to="/login" type="submit">Log In</Link>
      </div>:
      <><button className="btn btn-primary mx-1" onClick={handleClick1}>Profile</button>
      <button className="btn btn-primary mx-1" onClick={handleClick}>Log out</button></>}
    </div>
  </div>
</nav>
      </div>
  )
}
