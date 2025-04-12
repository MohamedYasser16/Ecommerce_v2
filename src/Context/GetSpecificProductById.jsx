import axios from 'axios';
import React, { createContext, useState } from 'react'

 export let GetSpecificProductById = createContext(0)

export default function GetSpecificProductByIdProvider({children}) {


      let [data, setData] = useState({});
      let [loading , setLoading] = useState(true)
      let [myError , setError] = useState(false)
    
      let getSpecificProduct = async (productId) => {
      try {
        let { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products/${productId}`
        );
        console.log(data.data);
        setData(data.data);
    
        setLoading(false)
        setError(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
      };

     
    

  return (
    <>
    <GetSpecificProductById.Provider  value={{data , loading , myError , getSpecificProduct}}  >
     {children}
    </GetSpecificProductById.Provider>
    </> 
  )
}
