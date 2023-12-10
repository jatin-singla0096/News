import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const UpdateData = () => {
  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({name:"",password:"",Cpassword:""});
    const handleSubmit=async (e)=>{
        e.preventDefault();
        localStorage.removeItem("success")
        const response = await fetch(`http://127.0.0.1:300/auth/updateUserData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({name:credentials.name,password:credentials.password,Cpassword:credentials.Cpassword}),
    });
    let item4 = await response.json();
    if(item4.name===credentials.name){
     navigate("/profile");
    }
    else{
      alert("Data not updated due to which wrong password")
    }
    }
    const handleChange=(e)=>{
     setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    useEffect(() => {
      if(!localStorage.getItem("success")){
        navigate("/")
      }
    }, []);
  return (
    <div className='container my-10' style={{height:"100%",marginTop:"150px"}}>
      <h2 style={{textAlign:"center"}}>Create a new account</h2>
      <form style={{height:"100%",margin:"50px"}} onSubmit={handleSubmit}>
      <div className="mb-3" style={{width:"100%",display:"flex",justifyContent:"center"}}>
    <input type="name" className="form-control" placeholder='Name' style={{width:"500px"}} id="name" name="name" onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3" style={{width:"100%",display:"flex",justifyContent:"center"}}>
    <input type="password" className="form-control" style={{width:"500px"}} placeholder='Password' onChange={handleChange} id="password" name="password"/>
  </div>
  <div className="mb-3" style={{width:"100%",display:"flex",justifyContent:"center"}}>
    <input type="password" className="form-control" placeholder='Confirm Password' style={{width:"500px"}} onChange={handleChange} id="Cpassword" name="Cpassword"/>
  </div>
  <div className="mb-3" style={{width:"100%",display:"flex",justifyContent:"center"}}><button type="submit" className="btn btn-primary">Submit</button></div>
</form>
    </div>
  )
}

export default UpdateData