import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import image from '../assets/img.png'
import server_url from '../../services/server_URL';
import { toast } from 'react-toastify';
import { updateProjectAPI } from '../../services/allAPI';
import { editResponseContext } from '../Context/ContextAPI';


function Edit({ projects }) {
  console.log(projects);
  

  const {setEditResponse}=useContext(editResponseContext)

  const [projectdetials, setProjectdetials] = useState({id:projects?._id, title: projects?.title, language: projects?.languages, github: projects?.github, website: projects?.website, overview: projects?.overview, projectIMG: "" })

  const [imgFileStatus, setImgFileStatus] = useState(false)
  const [preview, setPreview] = useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectdetials({id:projects?._id, title: projects?.title, language: projects?.languages, github: projects?.github, website: projects?.website, overview: projects?.overview, projectIMG: ""})

  }
    const handleShow = () => {
      setProjectdetials({id:projects?._id, title: projects?.title, language: projects?.languages, github: projects?.github, website: projects?.website, overview: projects?.overview, projectIMG: ""})

      
      setShow(true);}



  useEffect(() => {

    if (projectdetials.projectIMG.type == "image/png" || projectdetials.projectIMG.type == "image/jpg" || projectdetials.projectIMG.type == "image/jpeg") {
      setImgFileStatus(true)

      // URL.createObjectURL() , this is used to temporarily convert a image to url if it is uploaded from the system
      setPreview(URL.createObjectURL(projectdetials.projectIMG))
    } else {
      setImgFileStatus(false)
      setProjectdetials({ ...projectdetials, projectIMG: "" })
      setPreview("")
    }

  }, [projectdetials.projectIMG])

  const handleUpdate=async(e)=>{
    e.preventDefault()
    const {id,title, language, github, website, overview }=projectdetials
    if(id&& title&& language&&github&&website&&overview){

      // api call

      const reqbody=new FormData()

      reqbody.append("title",title)
      reqbody.append("languages",language)
      reqbody.append("github",github)
      reqbody.append("website",website)
      reqbody.append("overview",overview)
      preview? reqbody.append("projectIMG",projectdetials.projectIMG):reqbody.append("projectIMG",projects.projectIMG)
      const token = sessionStorage.getItem('token')

      if (token) {
        const reqheader = {
          "content-type":preview? "multipart/form-data":"application/json",
          "authorization": `Bearer ${token}`
        }
        try{
          const result=await updateProjectAPI(id,reqbody,reqheader)
          console.log(result);
          if(result.status==200){

            setEditResponse(result.data)
            handleClose()
          }
          
         }
         catch(err){
          console.log(err);
          
         }

      }

      


    }
    else{
      toast.warning("Please fill the form completely")

    }

  }


  return (
    <>
      <div>


        <button className='btn text-decoration-none p-0 border border-none  border-0' onClick={handleShow} ><i className="fa-solid fa-pen-to-square"></i></button>

        <div>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>New Project Details!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container-fluid">
                <div className="row">
                  {/* Left Column (Image Upload) */}
                  <div className="col-md-6 col-12 d-flex flex-column align-items-center">
                    <label>
                      <img src={preview ? preview : `${server_url}/Uploads/${projects.projectIMG}`} alt="" className="img-fluid mb-2" />
                      <input
                        type="file"
                        onChange={e =>
                          setProjectdetials({
                            ...projectdetials,
                            projectIMG: e.target.files[0],
                          })
                        }
                        style={{ display: "none" }}
                      />
                    </label>
                    {!imgFileStatus && (
                      <p className="text-warning text-center">
                        Upload only jpg, png, jpeg files
                      </p>
                    )}
                  </div>

                  {/* Right Column (Inputs) */}
                  <div className="col-md-6 col-12">
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        onChange={e =>
                          setProjectdetials({ ...projectdetials, title: e.target.value })
                        }
                        value={projectdetials?.title}
                        placeholder="Project Title"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        onChange={e =>
                          setProjectdetials({
                            ...projectdetials,
                            language: e.target.value,
                          })
                        }
                        value={projectdetials?.language}
                        placeholder="Languages Used"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        onChange={e =>
                          setProjectdetials({ ...projectdetials, github: e.target.value })
                        }
                        value={projectdetials?.github}

                        placeholder="GitHub Link"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        onChange={e =>
                          setProjectdetials({ ...projectdetials, website: e.target.value })
                        }
                        value={projectdetials?.website}

                        placeholder="Website Link"
                      />
                    </div>
                  </div>
                </div>

                {/* Overview Field */}
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    onChange={e =>
                      setProjectdetials({ ...projectdetials, overview: e.target.value })
                    }
                    value={projectdetials?.overview}

                    placeholder="Project Overview"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleUpdate} variant="primary">Update</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>



    </>
  )
}

export default Edit