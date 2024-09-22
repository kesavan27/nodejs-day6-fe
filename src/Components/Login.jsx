import { useRef, useState } from 'react'
import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link, navigate, useNavigate} from "react-router-dom"
import axios from 'axios';

export const Login = () => {
  const navigate=useNavigate();
  const email=useRef(null);
  const password=useRef(null);
  const [unauthorized,setUnauthorized]=useState(false);
  localStorage.clear()

  //function to verify the login user
  async function verifyLogin(e){
    e.preventDefault();
    setUnauthorized(false);
    const data={
      email:email.current.value,
      password:password.current.value
    }
    //api call to check the user in database
    await axios.post("https://nodejs-day6-be-tqxl.onrender.com/authenticate",data).then(async(res)=>{
      const token={
        token:res.data.token
      }
      //api to verify the token
      await axios.post("https://nodejs-day6-be-tqxl.onrender.com/authenticate/verifytoken",token).then((restoken)=>{
       if(restoken.data.message){
        setUnauthorized(true);
       }else{
        //if the role is teacher we are setting the role teacher in localstorage and also setting the authentication to authorize to acces the home router
        if(restoken.data.result.role=="Teacher"){
          localStorage.setItem("authentication","authorize");
          localStorage.setItem("role","Teacher");
        }
        //if the role is teacher we are setting the role student in localstorage and also setting the authentication to authorize to acces the home router
        else{
          localStorage.setItem("authentication","authorize");
          localStorage.setItem("role","Student");
        }
        navigate("/Home");
       }
      })
    })
    
  }

  return (
    <div id="logincontent" className='row'>
        <div id="inputForm" className='row col-4 m-auto h-50'>
            <div className="m-auto col-md-8 text-center">
            <form method="post" onSubmit={verifyLogin}>
             <div className='mb-3'>  
            <input className="form-control" type="text" placeholder="username eg:email" ref={email}></input>
            </div> 

            <div className='mb-3'>
            <input className="form-control" type="Password" placeholder="password" ref={password}></input>
            </div>
            <button type="submit" className="btn text-white border-0 mb-3">Submit</button>
            </form>
            {unauthorized&&<p className='text-danger'>Unauthorized</p>}
            <span>New User ?</span> <Link to='/Register' className='btn text-success'>Click to register</Link>
            </div>
        </div>

    </div>
  )
}