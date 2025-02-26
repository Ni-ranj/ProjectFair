import React, { useContext, useEffect, useState } from 'react'
import Add from '../components/Add'
import Edit from '../components/Edit'
import { deleteProjectAPI, userProjectAPI } from '../../services/allAPI'
import { addResponseContext, editResponseContext } from '../Context/ContextAPI'
import { toast } from 'react-toastify'




function View() {

  const { editResponse } = useContext(editResponseContext)
  const { addResponse } = useContext(addResponseContext)
  const [userProjects, setUserProjects] = useState([])
  console.log(userProjects);


  useEffect(() => {
    getUserProjects()
  }, [addResponse, editResponse])


  const getUserProjects = async () => {

    const token = sessionStorage.getItem("token")
    console.log(token);


    if (token) {
      const reqheader = {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }

      try {

        const result = await userProjectAPI(reqheader)
        console.log(result);

        setUserProjects(result.data)

      } catch (err) {
        console.log(err);

      }


    }


  }


  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token")

    const reqheader = {
      "content-type": "application/json",
      "authorization": `Bearer ${token}`
    }

    try {
      const result = await deleteProjectAPI(id, reqheader)
      console.log(result);
      if(result.status==200){
        getUserProjects()
        toast.success("Project deleted Successfully")
      }
      
    }
    catch (err) {
      console.log(err);

    }

  }




  return (
    <>

      <div>
        <div className='d-flex justify-content-between container ms-3'>

          <h3 className='text-danger'>All Projects</h3>
          <Add />



        </div>

        {
          userProjects?.length > 0 ?

            userProjects?.map(item => (
              <div className='my-5 border border-white  p-3 pt-4 ms-3' style={{ borderRadius: '10px' }}>
                <div className='d-flex justify-content-between container'>

                  <p>{item.title} </p>

                  <div className='d-flex justify-content-center align-items-center pb-2'>

                    <Edit projects={item} />
                    <a href={item.github}><i className="fa-brands fa-github text-success mx-3 mt-1 "></i></a>
                    <button onClick={() => handleDelete(item._id)} className='btn text-decoration-none p-0 border border-none border-0 '><i class="fa-solid fa-trash mx-2 mt-1 text-danger"></i></button>
                  </div>

                </div>



              </div>
            ))

            :
            <div>No projects added yet</div>
        }



      </div>





    </>
  )
}

export default View