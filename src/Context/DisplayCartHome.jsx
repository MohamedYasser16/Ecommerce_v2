import React, { createContext, useContext, useEffect, useState } from 'react'
import { CartContext } from './CartContext';
import { tokenContext } from './LocalContext';
import axios from 'axios';

export let DisplayCartHome = createContext(0)

export default function DisplayCartHomeProvider({ children }) {

  let [loading, setLoading] = useState(false);

  let { token } = useContext(tokenContext)
  // console.log('token in home',token);

  let [ArrCart, setArrCart] = useState([]);
  let { number, setNumber } = useContext(CartContext)

  let displayCart = async () => {
    try {
      setLoading(true)

      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token
          }
        }
      );

      // console.log( 'display data  ' , data.data);
      // console.log(data.data);

      setArrCart(data.data.products);


      // setNumber(ArrCart.length)
      // console.log(number);



      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false)

    }
  };

  useEffect(() => {
    if (token) {  // ✅ Run only when token is available
      // setNumber(ArrCart.length)
      displayCart();
    }
  }, [token]);


  useEffect(() => {
    if (token) {  // ✅ Run only when token is available
      setNumber(ArrCart.length)
    }
  }, [ArrCart.length]);  // ✅ Depend on `token`


  return (
    <>
      <DisplayCartHome.Provider value={{ displayCart, ArrCart }}   >
        {children}
      </DisplayCartHome.Provider>
    </>
  )
}
