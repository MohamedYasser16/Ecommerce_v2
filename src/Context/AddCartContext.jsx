import React, { createContext, useContext } from 'react'
import { tokenContext } from './LocalContext';
import axios from 'axios';
import toast from 'react-hot-toast';


export let addCartContext = createContext(0)

export default function AddCartContextProvider({ children }) {


    let { token } = useContext(tokenContext)
    console.log(token);
    
    
    
     let addCart = async (_id) => {
    
      try {
    
    
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: _id }, {
          headers: {
    
            token
    
          }
    
        })
    
        console.log(data.message);
        toast.success(data.message)
    
      } catch (error) {
    
        console.log(error?.response?.data.message);
        toast.error(error?.response?.data.message)
    
    
      }
    
    }
    
  



    return (

        <addCartContext.Provider value={ { token , addCart } } >
            {children}
        </addCartContext.Provider>


    )
}
