import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate=useNavigate();
    const [user, setUser] = useState({});
    const host="http://127.0.0.1:300/auth/userData";
    const profileData=async()=>{
        const response = await fetch(host, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token":localStorage.getItem("auth-token")
            },
          });
          let data =await response.json();
          setUser(data)
    }
    useEffect(() => {
        profileData()
    }, []);
    const handleClick=(e)=>{
      e.preventDefault();
    navigate("/confirm")
    }
    return (
    <div style={{marginTop:"200px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}} className="container">
    <h3 style={{marginBottom:"30px"}}>User Data</h3>
    <div style={{margin:"5px"}}>Name-  {user.name}</div>
    <div style={{margin:"5px"}}>Email- {user.email}</div>
    <button className="btn btn-primary mx-1" style={{width:"100px",margin:"5px"}} onClick={handleClick}>Update Id</button>
    </div>
  )
}
