import { createContext, useState } from "react"

export let CartContext = createContext(0)


export default function CartContextProvider({ children }) {

  let [number, setNumber] = useState(0)
  let [cartId, setCartId] = useState('');


  return (
    <CartContext.Provider value={{ number, setNumber, cartId, setCartId }}>
      {children}
    </CartContext.Provider>
  )
}
