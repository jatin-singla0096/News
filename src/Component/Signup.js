import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import "./signin.css"

const Signup = () => {
  let host="http://127.0.0.1:300/auth/createUser";
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",Cpassword:""});
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }
  const handleSubmit=async (e)=>{
   e.preventDefault();
   const response = await fetch(host, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
  });
  let json=await response.json();
  if(json.success && credentials.password===credentials.Cpassword){
    localStorage.setItem("auth-token",json.token);
    navigate("/");
  }
  else{
    alert("Invalid credentials")
  }
  }
  return (
    <div className='container my-10' style={{height:"100%",marginTop:"150px"}}>
      <h2 style={{textAlign:"center"}}>Create a new account</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3" style={{width:"100%",display:"flex",justifyContent:"center"}}>
    <input type="name" className="form-control" id="name" style={{width:"500px"}} name="name" placeholder='Name' onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3" style={{width:"100%",display:"flex",justifyContent:"center"}}>
    <input type="email" className="form-control" id="email" style={{width:"500px"}} name="email" placeholder='Email Address' onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3" style={{width:"100%",display:"flex",justifyContent:"center"}}>
    <input type="password" className="form-control" onChange={handleChange} id="password" style={{width:"500px"}} placeholder='Password' name="password"/>
  </div>
  <div className="mb-3" style={{width:"100%",display:"flex",justifyContent:"center"}}>
    <input type="password" className="form-control" onChange={handleChange} id="Cpassword" style={{width:"500px"}} placeholder='Confirm Password' name="Cpassword"/>
  </div>
  <div className="mb-3" style={{width:"100%",display:"flex",justifyContent:"center"}}><button type="submit" className="btn btn-primary">Submit</button></div>
</form>
    </div>
  )
}

export default Signup