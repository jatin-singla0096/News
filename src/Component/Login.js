import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate=useNavigate();
  const host="http://127.0.0.1:300/auth/login";
  const [credentials, setCredentials] = useState({email:"",password:""});
  const handleChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const response = await fetch(host, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({email:credentials.email,password:credentials.password})
   });
   let json =await response.json();
   if(!json.success){
    alert("Invalid Credentials");
   }
   else{
    localStorage.setItem('auth-token',json.token);
    navigate("/");
   }
  }
  return (
    <div className='container my-10' style={{height:"100%",marginTop:"150px"}}>
      <h2 style={{textAlign:"center"}}>Login to your account</h2>
      <form style={{height:"100%",margin:"50px"}} onSubmit={handleSubmit}>
  <div className="mb-3" style={{width:"100%",display:"flex",justifyContent:"center"}}>
    <input type="email" className="form-control" style={{width:"500px"}} placeholder='Email Address' id="email" name="email" onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3" style={{width:"100%",display:"flex",justifyContent:"center"}}>
    <input type="password" className="form-control" id="password" placeholder='Password' style={{width:"500px"}} onChange={handleChange} name="password"/>
  </div>
  <div className="mb-3" style={{width:"100%",display:"flex",justifyContent:"center"}}><button type="submit" className="btn btn-primary">Submit</button></div>
</form>
    </div>
  )
}

export default Login