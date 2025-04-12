import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Productdata from '../Productdata/Productdata';
import { RelatedProductsContext } from '../../Context/RelatedProductsContext';

export default function RelatedProducts({category , id}) {
 
  console.log(id);
  

  let {dataArray , loading , error , getRelatedProduct } = useContext(RelatedProductsContext)
  console.log(dataArray);
  

    // let [ dataArray , setDataArray ] = useState([])

    // let getRelatedProduct = async (category) => {
    //     try {
     
    //       let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${category}`)
       
    //       console.log("related products", data);
    //       setDataArray(data.data)
    //       // setLoading(false)
    //       // setError(false)
    //     } catch (error) {
    //       // setError(true)
    //       // setLoading(false)
    //     }
    //     };
    
    // let isFirstUpdate = useRef(false); // Tracks if it's an update
    
    useEffect(() => {
      // if (isFirstUpdate.current) {
        getRelatedProduct(category); // Call function only on update
      // } else {
      //   isFirstUpdate.current = true; // Prevent initial mount from triggering
      // }
    }, [category]); // Runs only when 'category' updates


  return (
    <>
  
    {
      dataArray?.map( ( x , index ) => <Productdata id={id} key={index} prod={x} />   )  
    }
    </>
  )
}
