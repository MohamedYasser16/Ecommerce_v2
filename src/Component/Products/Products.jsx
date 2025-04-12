import React, { useContext, useEffect, useState } from "react";
import { tokenContext } from "../../Context/LocalContext";
import { useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import Productdata from "../Productdata/Productdata";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import toast from "react-hot-toast";
import HeartComp from "../HeartComp/HeartComp";
import HeartComp2 from "../../HeartComp2/HeartComp2";
import { DisplayCartHome } from "../../Context/DisplayCartHome";
import { CartContext } from "../../Context/CartContext";
import { GetSpecificProductById } from "../../Context/GetSpecificProductById";
import useGetProdById from "../../Hooks/useGetProdById";
import { addCartContext } from "../../Context/AddCartContext";

export default function Products() {


  let { id } = useParams();
  console.log(id);


  // let { data, loading, myError, getSpecificProduct } = useContext(GetSpecificProductById)

  
  let {data , error , isLoading , isError} = useGetProdById(id)
  console.log(data);
  

 let {  addCart } = useContext(addCartContext)


  useEffect(() => {
  window.scrollTo(0,0)
  console.log("screen y",window.scrollY);
  
  }, [id]);

  let [src, setSrc] = useState(``)

  let changeImg = (e) => {
    console.log(e.target.src);
    setSrc(e.target.src);

  }

  // add to cart 

  const [Loading2, setLoading2] = useState(false)

  let { token } = useContext(tokenContext)


 


  let { displayCart, ArrCart } = useContext(DisplayCartHome)
  let { number, setNumber } = useContext(CartContext)


  let arrangeFunc3 = async (id) => {

    await addCart(id)
    //  await arrangeFunc()
    await displayCart();
    setNumber(ArrCart.length)
  }

  /////////////////////////////////////
  if ( isLoading || Loading2) {
    return <div className="h-[88vh] flex justify-center items-center mx-auto">

      <ScaleLoader
        color="#08f32c"
        height={29}
        speedMultiplier={1}
        width={4}
      />
    </div>
  }

  if (isError) {
    return <div className="h-[88vh] flex justify-center items-center">
      <div className="bg-white text-red-500"> {error} </div>
    </div>
  }

  ///////////////////////

  return (
    <>

      <div className="w-[85%] mx-auto flex flex-col md:flex-row items-center">
        <div className="w-[60%] lg:w-1/3 p-6">

          <img src={src ? src : data?.imageCover} className="w-[100%] md:w-[70%] mx-auto my-2" alt="" />
          <div className="flex justify-evenly mt-1">
            {data?.images?.map( (x , index ) => <div key={index} className="p-1 w-1/4 mx-1"> <img src={x} className={`w-full hover:cursor-pointer ${src == x ? " opacity-100  border-2 border-gray-500 " : " opacity-60 "}`} alt="product" key={x} onClick={changeImg} /> </div>)}
          </div>

        </div>
        <div className="w-full mt-1 md:mt-0 md:w-2/3 md:p-5 p-9">
        
          <h1 className="text-black font-bold dark:text-slate-200">{data?.title}</h1>
          <p className="text-gray-400 my-3 font-semibold dark:text-green-400">{data?.description.split(" ").slice(0,15).join(" ")}</p>
          <span className=" text-green-500 font-bold dark:text-slate-200 ">{data?.category?.name}</span>

          <h3 className={`mt-2 font-bold text-gray-400 ${data?.priceAfterDiscount ? " line-through" : ''} `}  > {data?.price} EGP </h3> 
         {data?.priceAfterDiscount && <h3 className="text-green-500 font-extrabold"> {data?.priceAfterDiscount} EGP </h3>} 

          <div className="flex items-center py-2">
            <div className="w-[90%]">
              <button onClick={() => {
                arrangeFunc3(id)
              }} className="bg-green-400 w-full p-2 rounded-md mt-2 text-white font-bold  hover:bg-green-500">
                + add to cart
              </button>
            </div>

            <div className="w-[10%]">
              <HeartComp2 id={id} />
            </div> 


          </div>


        </div>
      </div>

<div className="w-[84%] mx-auto mt-5">

<h2 className="capitalize text-slate-800 dark:text-slate-300 font-bold text-xl">related products</h2>
      <div className=" flex flex-wrap p-2 ">
        <RelatedProducts id={id} category={data?.category._id} />

      </div>
</div>


    </>
  );
}
