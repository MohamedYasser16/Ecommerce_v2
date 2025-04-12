import React, { createContext, useState } from 'react'


export  let categoryContext = createContext()

export default function CategoryContextProvider({children}) {


  let [categoryData, setCategoryData] = useState([]);
  let [loadingCat , setLoadingCat] = useState(false);


  return (
    <>
    <categoryContext.Provider   value={ { categoryData , setCategoryData , loadingCat , setLoadingCat}} >
     {children}
    </categoryContext.Provider>
    </>
  )
}
