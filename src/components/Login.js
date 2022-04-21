import React ,{useState} from 'react'
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [userCreds,setUserCreds] = useState({email:"",password:""});
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`,{
            method: "POST",
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({email:userCreds.email,password:userCreds.password})
          });
          const json = await response.json();
          if(json.success){
              //redirect
              localStorage.setItem('token',json.authToken);
              props.showAlertMessage("Login Successfully","success");
              navigate("/");
          }
          else if(!json.success){
            props.showAlertMessage("Inavlid Credentials","danger");
          }
    }

    const onChange = (e)=>{
        setUserCreds({...userCreds,[e.target.name]:e.target.value});
    };
  return (
    <div className='container'>
      <h1>Login to continue with cloudNotebook</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" onChange={onChange} value={userCreds.email} name="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} value={userCreds.password} id="password" name="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
  )
}

export default Login
