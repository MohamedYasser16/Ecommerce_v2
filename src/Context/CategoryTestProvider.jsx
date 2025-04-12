import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


export  let categoryTestContext = createContext()

export default function CategoryTestContextProvider({children}) {

  let [ myError , setMyError ] = useState('')
  let [ loading , setLoading ] = useState(false)
  let [categoryTestData, setCategoryTestData] = useState([]);

  async function getData() {
  
    try {
      setLoading(true)
      var { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategoryTestData(data.data);

      // console.log(data.data);
      // console.log(categoryTestData);
      

      setMyError(false);
    } catch (err) {
      setMyError(true)
      setMyError(err.message);
     
    }
    finally{
  
      setLoading(false);
    }
  }

    useEffect( ()=>{
        getData()
        console.log("loading at category test provider " , loading);
        
    } , []  )
   
  return (
    <>
    <categoryTestContext.Provider   value={ { categoryTestData , setCategoryTestData , loading , setLoading ,myError }} >
     {children}
    </categoryTestContext.Provider>
    </>
  )
}
