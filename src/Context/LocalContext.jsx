
import { createContext, useEffect, useState } from "react";



export const tokenContext = createContext(0)


export default function  TokenContextProvider ({ children }) {

 let [token , setToken] = useState("")

useEffect( ()=>{
  if ( localStorage.getItem('token') !== null  ) {
    setToken( localStorage.getItem("token") )
   }
}  ,[] )
 

 let [ counter , setCounter ] = useState(0)

  return <tokenContext.Provider value={{token , setToken , counter , setCounter }}>
     {children}
  </tokenContext.Provider>
}



