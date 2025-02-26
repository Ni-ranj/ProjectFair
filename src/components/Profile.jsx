import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import imag from '../assets/imag1.png'
import server_url from '../../services/server_URL';
import { updateUserProfileAPI } from '../../services/allAPI';

function Profile() {
  const [open, setOpen] = useState(false);
  console.log(open);
  
  const [userInfo, setUserInfo] = useState({ username: "", email: "", password: "", github: "", linkidin: "", profilePic: "" })
  const [existingIMG, setExistingIMG] = useState("")
  const [preview, setPreview] = useState("")
  console.log(userInfo, "infooo");


  useEffect(() => {

    if (sessionStorage.getItem("user")) {
      console.log(sessionStorage, "sesss");

      let existingUser = JSON.parse(sessionStorage.getItem("user"))
      setUserInfo({ ...userInfo, username: existingUser?.username, email: existingUser?.email, password: existingUser?.password, github: existingUser?.github, linkidin: existingUser?.linkidin })
      setExistingIMG(existingUser?.profilePic)
    }


  }, [open])

  useEffect(() => {
    if (userInfo?.profilePic) {
      setPreview(URL.createObjectURL(userInfo.profilePic))

    }
  }, [userInfo.profilePic])

  // handleUpdateProfile

  const handleUpdateProfile =async () => {
    const { username, email, password, github, linkidin, profilePic } = userInfo
    if (github && linkidin) {
     
      const reqbody = new FormData()
      reqbody.append("username", username)
      reqbody.append("email", email)
      reqbody.append("password", password)
      reqbody.append("github", github)
      reqbody.append("linkidin", linkidin)
      preview ? reqbody.append("profilePic", profilePic) : reqbody.append("profilePic", existingIMG)

      const token = sessionStorage.getItem('token')

      if(token){
        const reqheader = {
          "content-type": "multipart/form-data",
          "authorization": `Bearer ${token}`
        }

        try{

          // api

          const result=await updateUserProfileAPI(reqbody,reqheader)
          console.log(result,"resultt");
          if(result.status==200){

            sessionStorage.setItem("user",JSON.stringify(result.data))
            if(open){
              setOpen(false)
            }
            
            
            

          }
          

        }catch(err){
          console.log(err);
          
        }
      }

    }
    else {
      toast.warning("enter the field completely")
    }
  }


  return (
    <>


      <div className='d-flex justify-content-between p-5'>
        <h3>Profile</h3>

       


        <button className='btn'
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
         <i className='fa-solid fa-chevron-down'></i>
      </button>
      <Collapse in={open}>
        <div id="example-collapse-text">
        <div className='d-flex justify-content-center'>
              <label style={{ cursor: 'pointer' }}>
                <input onChange={(e) => setUserInfo({ ...userInfo, profilePic: e.target.files[0] })} type='file' style={{ display: 'none' }} />
                <div style={{ width: '150px', height: '150px', overflow: 'hidden', borderRadius: '50%' }}>
                  {existingIMG ?
                    <img
                      src={preview ? preview : `${server_url}/Uploads/${existingIMG}`}
                      alt='Profile'
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    :
                    <img
                      src={preview ? preview : imag}
                      alt='Profile'
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />}
                </div>
              </label>
            </div>

            <div className='d-flex justify-content-center flex-column align-items-center ps-4 mt-3'>
              <input type='text' onChange={(e) => setUserInfo({ ...userInfo, github: e.target.value })} value={userInfo?.github} className='mb-3 w-75' style={{ borderRadius: '5px' }} placeholder='GitHub Link' />
              <input type='text' onChange={(e) => setUserInfo({ ...userInfo, linkidin: e.target.value })} value={userInfo?.linkidin} className='mb-3 w-75' style={{ borderRadius: '5px' }} placeholder='LinkedIn Link' />
              <button onClick={handleUpdateProfile} className='btn btn-warning w-75' style={{ borderRadius: '5px' }}>Update Profile</button>
            </div>
        </div>
      </Collapse>
      </div>


    </>
  )
}

export default Profile