import React, {  createContext, useState } from 'react'

export const loginResponceContext = createContext()
export const editResponseContext = createContext({})
export const cartResponceContext = createContext({})
export default function ContextShare({children}) {

    const [loginResponce, setloginResponce] = useState(true)
    const [editResponse, setEditResponse] = useState([])
    const [cartResponce, setCartResponce] = useState([])
  return ( 
   <>
   
    <loginResponceContext.Provider value ={{loginResponce, setloginResponce}}>
      <editResponseContext.Provider value={{editResponse, setEditResponse}}>
        <cartResponceContext.Provider value={{cartResponce, setCartResponce}}>
        {children}
        </cartResponceContext.Provider>
     
        </editResponseContext.Provider> 
         </loginResponceContext.Provider> 
   </>
  )
}
