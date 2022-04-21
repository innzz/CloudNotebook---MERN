import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [userCreds,setUserCreds] = useState({name:"",email:"",password:""});
  let navigate = useNavigate();
  const handleSubmit = async (e)=>{
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/api/auth/createUser`,{
          method: "POST",
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({name:userCreds.name,email:userCreds.email,password:userCreds.password})
        });
        const json = await response.json();
        if(json.success){
            //redirect
            localStorage.setItem('token',json.authToken);
            props.showAlertMessage("Account Created Successfully","success");
            navigate("/");
        }
        else{
          props.showAlertMessage("Inavlid Credentials","danger");
        }
  }

  const onChange = (e)=>{
      setUserCreds({...userCreds,[e.target.name]:e.target.value});
  };
  return (
    <div className='container'>
      <h1>Create an Account to use cloudNotebook</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" onChange={onChange} value={userCreds.name} name="name" aria-describedby="emailHelp" min={4} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" onChange={onChange} value={userCreds.email} name="email" aria-describedby="emailHelp" required/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} value={userCreds.password} id="password" name="password" min={4} required/>
        </div>
        <button disabled={userCreds.name.length<4||userCreds.password.length<4} type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    </div>
  )
}

export default Signup
