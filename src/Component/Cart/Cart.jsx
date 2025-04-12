import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { tokenContext } from "../../Context/LocalContext";
import Loading from "../Loading/Loading";
// import emptyCart from "../../assets/empty.png"
// import emptyCart1 from "../../assets/empty-cart.png"
import emptyCart2 from "../../assets/commercial.png"
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
// import emptyCart3 from "../../assets/cart-shopping.png"

export default function Cart() {


  let { number, setNumber } = useContext(CartContext)


  let [ArrCart, setArrCart] = useState([]);

  let [cart, setCart] = useState([]);

  // let { token } = useContext(tokenContext);
  let token = localStorage.getItem("token")
  console.log(token);


  let [loading, setLoading] = useState(true)
  let [arbetary, setArbetary] = useState(false)

  let [ cartId , setCartId ] = useState("")

  let increaseCart = async (id, mycount) => {
    try {
      setLoading(true)
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: `${mycount + 1}`,
        },
        {
          headers: {
            token,
          },
        }
      );
      // console.log(data.data.products);
      setArrCart(data.data.products);
      console.log("done sucesfully increase ");
      setLoading(false)
    } catch (error) {

      console.log(error);
      setLoading(false)
    }
  };

  let decreaseCart = async (id, mycount) => {
    //  console.log(  id , mycount);
    try {
      setLoading(true)

      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: mycount - 1,
        },
        {
          headers: {
            token,
          },
        }
      );
      // console.log(data.data.products);
      setArrCart(data.data.products);
      console.log("done sucesfully increase ");

      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false)

    }
  };

  let clearCart = async () => {
    try {
      setLoading(true)
      let x = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token,
          },
        }
      );
      console.log("clear", x);

      // console.log(data.data.products);
      setArrCart([]);
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false)

    }
  };


  let deleteCart = async (id) => {
    try {
      setLoading(true)


      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token,
          },
        }
      );
      // console.log(data.data.products);
      setArrCart(data.data.products);
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false)

    }
  };

  let displayCart = async () => {
    try {

      setLoading(true)
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token,
          },
        }
      );
      // console.log("token inside display cart ", token);

      console.log('display data cart -------> cart id ', data.cartId      );
      setCartId(data.cartId)

      setCart(data.data);
      console.log("arr cart : ", cart);
      // console.log(cart);
      //  console.log(data.data.products);
      setArrCart(data.data.products);
      setNumber(ArrCart.length)
      //  console.log(data.data.products[0].price);
      //  console.log(data.data.products[0].count);
      //  console.log(data.data.products[0].product.imageCover);
      //  console.log(data.data.products[0].product.title);
      //  console.log(data.data.totalCartPrice , "EGP");
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false)

    }
  };

  let arrange = async () => {
    console.log("display done !!");
    await displayCart();
    console.log(ArrCart);
    setArbetary(false)
  }

  useEffect(() => {
    arrange()
  }, [arbetary]);


  useEffect(() => {
    setNumber(ArrCart?.length)
  }, [ArrCart?.length])

  if (!ArrCart.length && loading == false) {
    return <div className="h-[88vh] flex flex-col items-center justify-center  mx-auto">

      <img className="w-[75%]" src={emptyCart2} alt="" />
      <h2 className="text-3xl text-green-400 capitalize text-center font-bold">empty cart</h2>

    </div>
  }

  if (loading) {
    return <Loading />
  }


  // setNumber(ArrCart?.length)
  return (
    <>
      <div className="w-[80%] mx-auto my-3">
     <div className="flex justify-between items-center">
     <div className="p-5 font-bold container my-2 mx-auto">
          <h1 className="dark:text-slate-100" > Count of products : <span className="text-green-500">{ArrCart?.length} </span></h1>
          <h2 className="dark:text-slate-100" > Total salary : <span className="text-green-500">{cart?.totalCartPrice}</span> EGP</h2>
        </div>
        <div className="w-[150px]">
        <Link to={`/onlinePayment/${cartId}`} className="p-3 text-center bg-green-400 text-white font-bold rounded-lg block hover:bg-green-500 hover:text-white">buy online</Link>
        </div>
     </div>

        <div className="container  mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {ArrCart?.map((prod, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 h-[100px]"
                >
                  <td className="p-4">
                    <img
                      src={prod?.product?.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={prod?.product?.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {prod.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          decreaseCart(prod?.product?.id, prod?.count);
                          setArbetary(true)
                          // setArbetary(!arbetary)
                        }}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <input
                          type="text"
                          id="first_product"
                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                          placeholder={prod?.count}
                          required
                        />
                      </div>
                      <button
                        onClick={() => {
                          increaseCart(prod?.product?.id, prod?.count);
                          console.log(arbetary)

                          setArbetary(true)
                          // setArbetary(!arbetary)
                        }}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <span className="text-green-500">{prod?.price}</span> EGP
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        deleteCart(prod?.product?.id);
                        setArbetary(true)
                        // setArbetary(!arbetary)
                      }}
                      className="font-bold px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={clearCart} className="mt-6 mb-8 bg-red-600 hover:bg-red-700 transition-all duration-500 text-white px-2 py-2 rounded-md container mx-auto font-bold capitalize text-lg"> clear All  <i className="fa-solid fa-trash-can text-lg font-normal" style={{ color: '#ffffff' }} /></button>

      </div>
    </>
  );
}
