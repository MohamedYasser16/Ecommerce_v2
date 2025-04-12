import React, { createContext, useState } from 'react'

export let darkModeContext = createContext(0)

export default function DarkModeContextProvider({children}) {


  let [ dark , setDark ] = useState(false)



  return (
   
   <darkModeContext.Provider value={{ dark , setDark }}>
    {children}
   </darkModeContext.Provider>
   
  )
}
