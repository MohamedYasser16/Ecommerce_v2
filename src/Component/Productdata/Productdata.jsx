import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { tokenContext } from "../../Context/LocalContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import HeartComp from "../HeartComp/HeartComp";
import { addCartContext } from "../../Context/AddCartContext";
import { DisplayCartHome } from "../../Context/DisplayCartHome";
import { CartContext } from "../../Context/CartContext";





export default function Productdata({ prod , empty , id }) {

  // console.log(id);
  
   let { token , addCart } = useContext(addCartContext)

  let { _id, imageCover, title, price, ratingsAverage, description, category } = prod;
 


  // let { token } = useContext(tokenContext)
  // console.log(token);
  
  
  
  //  let addCart = async (_id) => {
  
  //   try {
  
  
  //     let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: _id }, {
  //       headers: {
  
  //         token
  
  //       }
  
  //     })
  
  //     console.log(data.message);
  //     toast.success(data.message)
  
  //   } catch (error) {
  
  //     console.log(error?.response?.data.message);
  //     toast.error(error?.response?.data.message)
  
  
  //   }
  
  // }
  
    let {displayCart , ArrCart} = useContext(DisplayCartHome)
    let { number , setNumber } = useContext(CartContext)
  

let arrangeFunc2 = async ()=>{

 await addCart(_id)
//  await arrangeFunc()
 await displayCart();
 setNumber(ArrCart.length)
}
 
if( id == prod.id) {
  return null 
  
}

  return (
    <>
      <div className={` my-5 p-3 group ${ empty ? "w-[80%] md:w-[70%] lg-[60%] xl:w-[50%] mx-auto " : "w-full  md:w-1/3  lg:w-1/4 xl:w-1/6" }`}>
        <div className="p-3 hover:shadow-lg hover:border-r-green-500  border-green-400 border-[1px] hover:border-solid rounded-md  hover:cursor-pointer dark:border-green-400 dark:border-[1px] dark:bg-slate-200/[0.06]">


          <Link to={`/products/${_id}`}>
            <div className=" ">
              <img
                src={imageCover}
                alt=""
                className="w-[80%] mx-auto object-cover rounded-md"
              />
              {/* <div className={`p-2 flex flex-col justify-between ${ empty ? " h-auto " : "h-[120px] " } `}> */}
              <div className={`p-2 flex flex-col justify-between ${empty ? " h-auto " : "h-[120px] "  } `}>
                <span className="text-green-500 pt-1 font-bold text-xl mt-2 md:text-base hover:text-green-400">{category.name}</span>
                <h1 className=" dark:text-slate-200 my-2">{title.split(" ").splice(0, 2).join(" ")}</h1>
                <div className=" pt-2 flex justify-between flex-row ">
                  <span className="text-gray-700 dark:text-slate-400 font-bold"><span className="dark:text-green-400 font-bold">{price}</span> EGP</span>
                  <span className="dark:text-green-400">
                    {ratingsAverage}
                    <i
                      className="fa-solid fa-star mx-1"
                      style={{ color: "#FFD43B" }}
                    />
                  </span>
                </div>
              </div>

            </div>
          </Link>
          <div className="flex justify-between p-2">
            {/* <i className="fa-regular fa-heart " style="color: #FFD43B;"></i> */}

            <div className="product  w-[90%] ">
              <button onClick={() => {
               arrangeFunc2()
              }} className="opacity-0 w-full mx-auto rounded-md  p-2 text-white bg-green-500 translate-y-12 hover:bg-green-600  transition-all duration-300 btn group-hover:opacity-100 group-hover:translate-y-0 group-hover:cursor-pointer">
                Add
              </button>

            </div>
            <HeartComp id={_id} />
          </div>
        </div>
      </div>
    </>
  );
}


