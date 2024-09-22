import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

export const Home = () => {
   const auth=localStorage.getItem("authentication");
   const role=localStorage.getItem("role");
   const [teacher,setTeacher]=useState(false);
   const [studData,setStudData]=useState(null);
   const[tecData,setTecData]=useState(null);

   const navigate=useNavigate();

   useEffect(()=>{
    //if authentication is unauthorize it will navigate to login
    if(auth=="unauthorize"){
        navigate("/");
       }
     if(role=="Teacher") {
        setTeacher(true);
     }else{
        setTeacher(false);
     } 
   },[])

   const sty={
    textAlign:"center",
   }

   //function to call student api get the student data
   function studentData(){
    try{
    axios.get('https://nodejs-day6-be-tqxl.onrender.com/student').then((res)=>{
        console.log(res.data.data)
       setStudData(res.data.data);
    })
        
    }catch(e){
        console.log({e});
    }
   }

    //function to call teacher api get the teacher data
   function teacherData(){
    try{
        axios.get("https://nodejs-day6-be-tqxl.onrender.com/student/teacher").then((res)=>{
            setTecData(res.data.data);
        })
    }catch(e){
        console.log(e);
    }
   }

  return (
    <div style={sty}>
        <h1>Home Page</h1>
        <button className='btn btn-primary w-25' onClick={studentData}>Student Details</button>
        <br></br>
        <br></br>
        {/* if the teacher state is true then it will show the teacher button */}
        {teacher&& <button className='btn btn-primary w-25' onClick={teacherData}>Teachers Details</button>}
        <br></br>

        {studData!=null&&<table className='table' border={2}>
            <thead className='thead-dark'>
        <tr>
            <th>Email</th>
            <th>Role</th>
        </tr>
        </thead>
        {studData.map((val)=>{
            return(<tr key={val.email}>
                <td>{val.email}</td>
                <td>{val.role}</td>
                </tr>)
        })}    
        </table>}

        {tecData!=null&&<table className='table' border={2}>
            <thead className='thead-dark'>
        <tr>
            <th>Email</th>
            <th>Role</th>
        </tr>
        </thead>
        {tecData.map((val)=>{
            return(<tr key={val.email}>
                <td>{val.email}</td>
                <td>{val.role}</td>
                </tr>)
        })}    
        </table>}
    </div>
  )
}