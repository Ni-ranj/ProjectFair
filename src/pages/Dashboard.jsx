import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import View from '../components/View'
import Profile from '../components/Profile'

function Dashboard() {
  const [username,setUsername]=useState("")
  console.log(username);
  
  

  useEffect(() => {
    if(sessionStorage.getItem("user")){
      setUsername(JSON.parse(sessionStorage.getItem("user")).username)
    }
    else{
      setUsername(" ")
    }
  }, [])
  
  return (
    <>
    <Header/>
    <div className='row'>
      <div className='col-lg-8 col-md-4'>
        <h2>Welcome <span>{username.split(" ")[0]}</span></h2>
        <div>
          <View/>


        </div>


      </div>
      <div className='col-lg-4'>
        <Profile/>

      </div>




    </div>


    
    </>
  )
}

export default Dashboard