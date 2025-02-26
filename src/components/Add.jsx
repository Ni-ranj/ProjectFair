import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import image from '../assets/img.png'
import { ToastContainer, toast } from 'react-toastify';
import { addProjectAPI } from '../../services/allAPI';
import { addResponseContext } from '../Context/ContextAPI';



function Add() {

  const { setAddResponse } = useContext(addResponseContext)

  const [projectdetials, setProjectdetials] = useState({ title: "", language: "", github: "", website: "", overview: "", projectIMG: "" })

  const [imgFileStatus, setImgFileStatus] = useState(false)
  const [preview, setPreview] = useState("")
  const [show, setShow] = useState(false);


  console.log(projectdetials);

  useEffect(() => {

    if (projectdetials.projectIMG.type == "image/png" || projectdetials.projectIMG.type == "image/jpg" || projectdetials.projectIMG.type == "image/jpeg") {
      setImgFileStatus(true)

      // URL.createObjectURL() , this is used to temporarily convert a image to url if it is uploaded from the system
      setPreview(URL.createObjectURL(projectdetials.projectIMG))
    } else {
      setImgFileStatus(false)
      setProjectdetials({ ...projectdetials, projectIMG: "" })
      setPreview(image)
    }

  }, [projectdetials.projectIMG])






  const handleClose = () => {
    setShow(false);
    setProjectdetials({ title: "", language: "", github: "", website: "", overview: "", projectIMG: "" })

  }
  const handleShow = () => setShow(true);



  ///handleAddProject

  const handleAddProject = async () => {
    const { title, language, github, website, overview, projectIMG } = projectdetials
    if (title && language && github && website && overview && projectIMG) {
      //api call

      //reqbody

      const reqbody = new FormData()
      reqbody.append("title", title)
      reqbody.append("languages", language)
      reqbody.append("github", github)
      reqbody.append("website", website)
      reqbody.append("overview", overview)
      reqbody.append("projectIMG", projectIMG)

      //reqheader

      const token = sessionStorage.getItem('token')

      if (token) {
        const reqheader = {
          "content-type": "multipart/form-data",
          "authorization": `Bearer ${token}`
        }

        try {
          const result = await addProjectAPI(reqbody, reqheader)
          if (result.status == 200) {
            setAddResponse(result.data)
            toast.success("project added successfully")
            handleClose()

          }
          else {
            toast.error(result.response.data)
          }

        }
        catch (err) {
          console.log(err);

        }

        // api call
      }
    }
    else {
      toast.warning("enter the fields completly")

    }
  }



  return (
    <>
      <div>


        <button className='btn ' onClick={handleShow} style={{ borderRadius: '10px', backgroundColor: 'darkorange' }}>+ New Project</button>
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
                      <img src={preview} alt="" className="img-fluid mb-2" />
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
                    placeholder="Project Overview"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleAddProject} variant="primary">Add</Button>
            </Modal.Footer>
          </Modal>
        </div>





      </div>


    </>
  )
}

export default Add