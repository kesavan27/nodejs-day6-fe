import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link, navigate } from "react-router-dom"
import axios from 'axios';
import { useRef, useState  } from 'react';


export const Registration = () => {
  localStorage.clear();
  const email=useRef(null);
  const password=useRef(null);
  const confirmPassword=useRef(null);
  const role=useRef(null);
  const [passwordMissMatcg,setPasswordMissMatcg]=useState(false);

  async function formSubmit(e){
    e.preventDefault();
    if(password.current.value===confirmPassword.current.value){
      setPasswordMissMatcg(false);
      const data={
        email:email.current.value,
        password:password.current.value,
        role:role.current.value
      }
    await axios.post("https://nodejs-day6-be-tqxl.onrender.com/student",data).then((res)=>{
      console.log(res.data);
    });
    email.current.value=null;
    password.current.value=null;
    confirmPassword.current.value=null;
    }else{
      setPasswordMissMatcg(true);
    }
  }

  return (
    <div id="logincontent" className='row'>
        <div id="inputForm" className='row col-4 m-auto h-50'>
            <div className="m-auto col-md-8 text-center">
            <form method="post" onSubmit={formSubmit}>
             <div className='mb-3'>  
            <input className="form-control" type="email" placeholder="enter your email" ref={email}></input>
            </div> 

            <div className='mb-3'>
            <input className="form-control" type="Password" placeholder="password" ref={password}></input>
            </div>

            <div className='mb-3'>
            <input className="form-control" type="Password" placeholder="confirm password" ref={confirmPassword}></input>
            </div>

            <div className='mb-3'>
            <select className='form-select' ref={role}>
            <option defaultValue={'--role--'}>--Role--</option>
            <option value={"Teacher"}>Teacher</option>
            <option value={"Student"}>Student</option>
            </select>
            </div>
            <button type="submit" className="btn text-white border-0 mb-3">Submit</button>
            </form>
            {passwordMissMatcg&&<p className='text-danger'>Password Miss Match</p>}
            <span>Existing User ?</span> <Link to='/' className='btn text-success'>Click here to login</Link>
            </div>
        </div>

    </div>
  )
}