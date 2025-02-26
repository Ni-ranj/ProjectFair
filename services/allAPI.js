import commonAPI from "./commonAPI";
import server_url from "./server_URL";

// register

export const registerAPI=async(reqbody)=>{
   return await commonAPI("POST",`${server_url}/register`,reqbody)
}

//login

export const loginAPI=async(reqbody)=>{
    return await commonAPI("POST",`${server_url}/login`,reqbody)
 }

 //project Upload

 export const addProjectAPI=async(reqbody,reqheader)=>{
   return await commonAPI("POST",`${server_url}/add-project`,reqbody,reqheader)
 }

 // get home projects

 export const homeProjectAPI=async()=>{
   return await commonAPI("GET",`${server_url}/get-home-projects`,"")
 }

 // get all projects

 export const allProjectAPI=async(searchkey,reqheader)=>{
   return await commonAPI("GET",`${server_url}/get-all-projects?search=${searchkey}`,"",reqheader)
 }

 // get user projects
 export const userProjectAPI=async(reqheader)=>{
   return await commonAPI("GET",`${server_url}/get-user-projects`,"",reqheader)
 }

 //update project

 export const updateProjectAPI=async(p_id,reqbody,reqheader)=>{
  return await commonAPI("PUT",`${server_url}/edit/project/${p_id}`,reqbody,reqheader)
 }

//  delete project

export const deleteProjectAPI=async(p_id,reqheader)=>{
  return await commonAPI("DELETE",`${server_url}/delete/project/${p_id}`,{},reqheader)
}

//  update user

export const updateUserProfileAPI=async(reqbody,reqheader)=>{
  return await commonAPI("PUT",`${server_url}/update/profile`,reqbody,reqheader)
}