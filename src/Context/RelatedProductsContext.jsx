import axios from 'axios'
import React, { createContext, useState } from 'react'

export let RelatedProductsContext = createContext(0)

export default function RelatedProductsContextProvider({children}) {

    let [ dataArray , setDataArray ] = useState([])
    let [ loading , setLoading ] = useState(false)
    let [ error , setError ] = useState(false)

    let getRelatedProduct = async (category) => {
        try {
            setLoading(true)
          let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${category}`)
       
          console.log("related products", data);
          setDataArray(data.data)
          setLoading(false)
          setError(false)
        } catch (er) {
          console.log(er);
          setError(true)
          setLoading(false)
        }
        };
      



  return (
    <>
    <RelatedProductsContext.Provider value={{dataArray , loading , error , getRelatedProduct}} >
        {children}
    </RelatedProductsContext.Provider>
    </>
  )
}
