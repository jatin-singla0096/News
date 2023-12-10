import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const ConfirmP = () => {
  const navigate=useNavigate();
    const [credentials, setCredentials] = useState({password:""});
    const handleSubmit=async (e)=>{
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:300/auth/confirmPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({password:credentials.password}),
    });
    let item4 = await response.json();
    if(item4.success){
      localStorage.setItem("success","true")
     navigate("/updateUser");
    }
    else{
      alert("Password didnot Match")
    }
    
    }
const handleChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
}

  return (
    <div className='container my-10' style={{height:"100%",marginTop:"150px"}}>
      <h2 style={{textAlign:"center"}}>Confirm Password</h2>
      <form style={{height:"100%",margin:"50px"}} onSubmit={handleSubmit}>
  <div className="mb-3" style={{width:"100%",display:"flex",justifyContent:"center"}}>
    <input type="password" style={{width:"500px"}} className="form-control" placeholder='Password' id="password" onChange={handleChange} name="password"/>
  </div>
  <div className="mb-3" style={{width:"100%",display:"flex",justifyContent:"center"}}><button type="submit" className="btn btn-primary">Submit</button></div>
</form>
    </div>
  )
}

export default ConfirmP