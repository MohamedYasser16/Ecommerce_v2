import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectCart({children}) {

    let token = localStorage.getItem("token")
    if ( !token ) {
    return  <Navigate to={"/login"} ></Navigate>  
    } else {
        return children
    }

  return (
    <>
    </>
  )
}
