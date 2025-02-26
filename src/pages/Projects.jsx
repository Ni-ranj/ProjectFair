import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { allProjectAPI } from '../../services/allAPI'
import { toast } from 'react-toastify'


function Projects() {
const [searchKey,setSearchKey]=useState("")
  const [allProjects,setAllProjects]=useState([])

  console.log(allProjects);
 

  useEffect(() => {
    getallProjects()
  }, [searchKey])
  
  



  const getallProjects=async()=>{

    const token=sessionStorage.getItem("token")
    console.log(token);
    

    if (token) {
      const reqheader = {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
      
      try{

        const result=await allProjectAPI(searchKey,reqheader)
        console.log(result);
        
        setAllProjects(result.data)

      }catch(err){
        console.log(err);
        
      }
    
    
    }


  }


  return (
    <>


    <div className='d-flex flex-column justify-content-center'>

      <div className='d-flex justify-content-between container p-5'>
        <h2 className='text-danger'>All projects</h2>
        <input type="search"  placeholder='    search project by language ' onChange={(e)=>{setSearchKey(e.target.value)}} className='w-25' style={{borderRadius:'5px'}}/>
      </div>
      <div className='row container mt-3 ms-5'>

       { 
       allProjects?.length>0?

       allProjects?.map(item=>(        <div className='col-lg-4 col-md-6 col-12 d-flex gap-2  my-3'>

       <ProjectCard  displayData={item}/>

       </div>  
       ))
       :
       <div>Projects not found</div>
       }
       
            

        
      </div>


    </div>
    
    
    
    
    </>
  )
}

export default Projects