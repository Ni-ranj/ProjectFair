import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import Spinner from 'react-bootstrap/Spinner';
import { loginAPI, registerAPI } from '../../services/allAPI';
import { use } from 'react';
import { isAuthorizedContext } from '../Context/ContextAPI';



function Authentication({ insideRegister }) {

  const [userData,setUserData]=useState({username:"",email:"",password:""})
  console.log(userData);

  const navigate=useNavigate()
  
  const [isLoggedin,setIsLoggedin]=useState(false)

  const {setIsAuhtorized}=useContext(isAuthorizedContext)




  const handleRegister= async (e)=>{
    e.preventDefault()

    const {username,email,password}=userData

    if(username&& email&& password){
      // api call

      const result = await registerAPI(userData)
      console.log(result);

      if(result.status==200){
        navigate('/login')
        setUserData({username:"",email:"",password:""})
      }
      else{
        if(result.status==404){
          alert(result.response.data)
        }
      }
      

    }
    else{
      alert("please fill the form completely")
    }
  
  
  
  }



  const handleLogin=async(e)=>{
    e.preventDefault()
    if(userData.email && userData.password){
      // api call
      try{
        const result=await loginAPI(userData)
        if (result.status==200){
          // redirect to home page
          setIsLoggedin(true)
          
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          setIsAuhtorized(true)

          setTimeout(() => {
            
          setUserData({username:"",email:"",password:""})
          navigate('/')
          setIsLoggedin(false)
            
          }, 2000);
          
        }
        else{
          if(result.status==404){
            toast.error(result.response.data)

          }
        }
        
      }
      catch(err){
        console.log(err);
        
      }
    }

  }
  return (
    <>

<div className="d-flex justify-content-center align-items-center min-vh-100">
  <div className="row bg-secondary p-5 d-flex justify-content-center align-items-center w-75" style={{ borderRadius: '10px', maxWidth: '900px' }}>
    <div className="col-lg-6 col-md-12 p-4 d-flex justify-content-center">
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgaygB1yC521eBimcIJH2dHnzEUntcKqWKlQ&s" 
        className="img-fluid" 
        alt="Signup"
        style={{ maxWidth: '100%', borderRadius: '10px' }}
      />
    </div>
    
    <div className="col-lg-6 col-md-12 d-flex flex-column p-4">
      <h2 className="text-white"><img  className="rounded-circle"
    style={{ height: '40px', width: '40px', marginRight: '10px', objectFit: 'cover' }}
   src="https://thumbs.dreamstime.com/b/whale-stock-market-graphs-background-crypto-value-illustration-whale-stock-market-graphs-background-crypto-value-illustration-301195168.jpg" alt="" />Project Fair</h2>
      <p className="text-white">Sign {insideRegister ?"Up":"In"} to your Account</p>

      {
        insideRegister &&
      <input type="text" className="w-100 my-2 p-2" value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} style={{ height: '43px', borderRadius: '10px', border: 'none' }} placeholder="User Name" />

      }
      
      <input type="email" className="w-100 my-2 p-2" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})}  style={{ height: '43px', borderRadius: '10px', border: 'none' }} placeholder="Email Address" />

      <input type="password" className="w-100 my-2 p-2" value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})}  style={{ height: '43px', borderRadius: '10px', border: 'none' }} placeholder="Password" />
      
      
      {insideRegister?
      <div
      ><button className="btn btn-light mt-3 w-100" onClick={handleRegister}>Sign Up </button>
      <p className='mt-3 text-center'> Don't have an account Yet?  
      <Link  to={'/login'} className='text-success'> Login</Link></p>
      </div>
      :


      <div>
        <button className="btn btn-light mt-3 w-100" onClick={handleLogin}>Sign In      {
          isLoggedin &&
          <Spinner animation="border" variant="light" />}
        </button>
      <p className='mt-3 text-center'> Don't have an account Yet?  

      <Link  to={'/register'} className='text-success'>Register </Link></p>
      
      </div>
      }
      
      
    </div>
  </div>
</div>







    </>
  )
}

export default Authentication