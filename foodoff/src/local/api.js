
import { commonAPI } from "./commonApi"
import { serverURL } from "./serverUrl"

// register
export const registerAPI = async (reqBody)=>{
    return await commonAPI('POST',`${serverURL}/register`, reqBody,"")
}
// login
export const loginAPI = async (reqBody)=>{
    return await commonAPI('POST',`${serverURL}/login`, reqBody,"")
}

// add-item 
export const addItemAPI = async (reqBody, reqHeader)=>{
    return await commonAPI('POST', `${serverURL}/all-items`, reqBody, reqHeader)
}

//delete item

export const removeItemApi = async (id, reqHeader)=>{
    return await commonAPI("DELETE", `${serverURL}/remove-useritem/${id}`, {}, reqHeader)
}

//update 
export const updateItemAPI = async (id, reqBody) => {
    return await commonAPI("PUT", `${serverURL}/update-useritem/${id}`, reqBody);
  }
 // get all user 
export const getAllUserAPI = async()=>{
    return await commonAPI("GET", `${serverURL}/all-user`)
}

// create order
export const orderAPI = async (reqBody)=>{
    return await commonAPI('POST',`${serverURL}/order`, reqBody,"")
}

//get all order
export const getAllOrderAPI = async()=>{
    return await commonAPI("GET", `${serverURL}/all-order`)
}
